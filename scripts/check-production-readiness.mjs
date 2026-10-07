#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { evaluateProductionPreflight } from "../platform/integrations/cloudflare/production-preflight.mjs";

const root = resolve(import.meta.dirname, "..");
const cloudflare = resolve(root, "platform/integrations/cloudflare");
const requestedConfig = process.argv.find((argument) => argument.startsWith("--config="))?.slice("--config=".length);
const configPath = resolve(root, requestedConfig || "platform/integrations/cloudflare/production-activation.example.json");

async function text(path) {
  try { return await readFile(path, "utf8"); } catch { return ""; }
}

const [activationSource, authMigration1, authMigration2, authMigration3, authMigration4] = await Promise.all([
  text(configPath),
  text(resolve(cloudflare, "auth-migrations/0001_platform_auth.sql")),
  text(resolve(cloudflare, "auth-migrations/0002_identity_entry.sql")),
  text(resolve(cloudflare, "auth-migrations/0003_platform_audit.sql")),
  text(resolve(cloudflare, "auth-migrations/0004_audit_retention_status.sql")),
]);
let activation = {};
try { activation = JSON.parse(activationSource); } catch { activation = {}; }

const files = {
  authWorker: await text(resolve(cloudflare, "platform-auth-worker.mjs")),
  authRepository: await text(resolve(cloudflare, "platform-auth-d1-repository.mjs")),
  identityWorker: await text(resolve(cloudflare, "platform-identity-worker.mjs")),
  evidenceWorker: await text(resolve(cloudflare, "evidence-worker.mjs")),
  authMigration: `${authMigration1}\n${authMigration2}\n${authMigration3}\n${authMigration4}`,
  evidenceMigration: await text(resolve(cloudflare, "migrations/0001_evidence_runtime_store.sql")),
  platformHtml: await text(resolve(root, "platform/index.html")),
  authConfig: await text(resolve(cloudflare, "platform-auth-wrangler.example.jsonc")),
  identityConfig: await text(resolve(cloudflare, "platform-identity-wrangler.example.jsonc")),
  evidenceConfig: await text(resolve(cloudflare, "wrangler.example.jsonc")),
};

// Values are intentionally never read. Only the presence of each environment name is passed on.
const secretNames = ["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"].filter((name) => Object.hasOwn(process.env, name));
const report = evaluateProductionPreflight({ files, activation, secretNames });

console.log("THINKamigBOB production activation preflight\n");
for (const check of report.checks) {
  const mark = check.status === "pass" ? "PASS " : check.status === "setup" ? "SETUP" : "BLOCK";
  console.log(`[${mark}] ${check.label} — ${check.detail}`);
}
console.log(`\nFoundation: ${report.foundationReady ? "PASS" : "BLOCKED"}`);
console.log(`Production activation: ${report.activationReady ? "READY" : "NOT READY (no deployment attempted)"}`);
process.exitCode = report.foundationReady ? 0 : 1;
