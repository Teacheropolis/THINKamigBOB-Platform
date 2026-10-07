#!/usr/bin/env node
import { access, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { validateDisabledStagingBundle, STAGING_REVIEW_ORDER } from "../platform/integrations/cloudflare/staging-bundle-validator.mjs";

const root = resolve(import.meta.dirname, "..");
const bundleDir = resolve(root, "platform/integrations/cloudflare/.generated/staging");
const names = { auth: "platform-auth.wrangler.jsonc", identity: "platform-identity.wrangler.jsonc", evidence: "evidence-api.wrangler.jsonc" };

async function config(name) {
  try { return JSON.parse(await readFile(resolve(bundleDir, name), "utf8")); }
  catch { return null; }
}
async function fileExists(path) { try { await access(path); return true; } catch { return false; } }
async function migrationsExist(path) { try { return (await readdir(path)).some((name) => name.endsWith(".sql")); } catch { return false; } }

const auth = await config(names.auth);
const identity = await config(names.identity);
const evidence = await config(names.evidence);
if (!auth || !identity || !evidence) {
  console.error("Staging bundle is not available. Run node scripts/generate-staging-configs.mjs after creating the private activation file.");
  process.exitCode = 1;
} else {
  const resolveFrom = (filename, relative) => resolve(dirname(resolve(bundleDir, filename)), relative);
  const resolvedPaths = {
    authMain: await fileExists(resolveFrom(names.auth, auth.main)),
    identityMain: await fileExists(resolveFrom(names.identity, identity.main)),
    evidenceMain: await fileExists(resolveFrom(names.evidence, evidence.main)),
    authMigrations: await migrationsExist(resolveFrom(names.auth, auth.d1_databases?.[0]?.migrations_dir || "")),
    evidenceMigrations: await migrationsExist(resolveFrom(names.evidence, evidence.d1_databases?.[0]?.migrations_dir || "")),
    auditMigration: await fileExists(resolve(resolveFrom(names.auth, auth.d1_databases?.[0]?.migrations_dir || ""), "0003_platform_audit.sql")),
    auditMaintenanceMigration: await fileExists(resolve(resolveFrom(names.auth, auth.d1_databases?.[0]?.migrations_dir || ""), "0004_audit_retention_status.sql")),
  };
  const report = validateDisabledStagingBundle({ auth, identity, evidence, resolvedPaths });
  console.log("THINKamigBOB disabled staging bundle gate\n");
  for (const item of report.checks) console.log(`[${item.status === "pass" ? "PASS " : "BLOCK"}] ${item.detail}`);
  console.log(`\nBundle: ${report.ready ? "READY FOR WRANGLER DRY-RUN REVIEW" : "BLOCKED"}`);
  console.log("\nRequired review order:");
  STAGING_REVIEW_ORDER.forEach((step, index) => console.log(`${index + 1}. ${step}`));
  console.log("\nNo Wrangler command, deployment, migration, secret change, or network request was performed.");
  if (report.ready && process.argv.includes("--write-evidence")) {
    await writeFile(resolve(bundleDir, "bundle-gate-evidence.json"), `${JSON.stringify({ ...report, recordedAt: new Date().toISOString() }, null, 2)}\n`, { mode: 0o600 });
    console.log("Recorded non-secret bundle-gate evidence for the local activation gate.");
  }
  process.exitCode = report.ready ? 0 : 1;
}
