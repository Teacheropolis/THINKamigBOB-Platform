#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createStagingRollbackCandidate, STAGING_ROLLBACK_CONFIRMATION } from "../platform/integrations/cloudflare/staging-rollback.mjs";

const root = resolve(import.meta.dirname, "..");
const activatedDir = resolve(root, "platform/integrations/cloudflare/.generated/staging-activated");
const outputDir = resolve(root, "platform/integrations/cloudflare/.generated/staging-rollback");
const confirmation = process.argv.find((argument) => argument.startsWith("--confirm="))?.slice(10) || "";
async function json(name) { try { return JSON.parse(await readFile(resolve(activatedDir, name), "utf8")); } catch { return null; } }
async function text(name) { try { return await readFile(resolve(activatedDir, name), "utf8"); } catch { return ""; } }

const candidate = createStagingRollbackCandidate({
  configs: {
    auth: await json("platform-auth.wrangler.jsonc"),
    identity: await json("platform-identity.wrangler.jsonc"),
    evidence: await json("evidence-api.wrangler.jsonc"),
  },
  platformHtml: await text("platform.index.activated.html"),
  confirmation,
});

if (!candidate.ok) {
  console.error("Staging rollback candidate was not created:");
  candidate.reasons.forEach((reason) => console.error(`- ${reason}`));
  console.error(`Required confirmation: --confirm="${STAGING_ROLLBACK_CONFIRMATION}"`);
  console.error("No deployment, data deletion, migration, secret change, or network request occurred.");
  process.exitCode = 1;
} else {
  await mkdir(outputDir, { recursive: true });
  for (const [name, config] of [["platform-auth.wrangler.jsonc", candidate.configs.auth], ["platform-identity.wrangler.jsonc", candidate.configs.identity], ["evidence-api.wrangler.jsonc", candidate.configs.evidence]]) {
    await writeFile(resolve(outputDir, name), `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
  }
  await writeFile(resolve(outputDir, "platform.index.disabled.html"), candidate.platformHtml, { mode: 0o600 });
  await writeFile(resolve(outputDir, "ROLLBACK-ORDER.txt"), `${candidate.order.map((step, index) => `${index + 1}. ${step}`).join("\n")}\n`, { mode: 0o600 });
  console.log("Created an ignored private-staging rollback candidate. Nothing was deployed and no data was changed.");
  console.log(`Review: ${outputDir}`);
}

