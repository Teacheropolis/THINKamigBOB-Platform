#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createStagingActivationCandidate, REQUIRED_STAGING_SECRETS, STAGING_ACTIVATION_CONFIRMATION } from "../platform/integrations/cloudflare/staging-activation-gate.mjs";

const root = resolve(import.meta.dirname, "..");
const disabledDir = resolve(root, "platform/integrations/cloudflare/.generated/staging");
const outputDir = resolve(root, "platform/integrations/cloudflare/.generated/staging-activated");
const activationPath = resolve(root, "platform/integrations/cloudflare/production-activation.json");
const confirmation = process.argv.find((argument) => argument.startsWith("--confirm="))?.slice(10) || "";

async function json(path) { try { return JSON.parse(await readFile(path, "utf8")); } catch { return null; } }
const configs = {
  auth: await json(resolve(disabledDir, "platform-auth.wrangler.jsonc")),
  identity: await json(resolve(disabledDir, "platform-identity.wrangler.jsonc")),
  evidence: await json(resolve(disabledDir, "evidence-api.wrangler.jsonc")),
};
const smoke = await json(resolve(disabledDir, "disabled-smoke-evidence.json"));
const bundleEvidence = await json(resolve(disabledDir, "bundle-gate-evidence.json"));
const activation = await json(activationPath);
const platformHtml = await readFile(resolve(root, "platform/index.html"), "utf8");
const secretNames = REQUIRED_STAGING_SECRETS.filter((name) => Object.hasOwn(process.env, name));
const candidate = createStagingActivationCandidate({ configs, bundleReady: bundleEvidence?.ready === true && bundleEvidence?.checks?.every((check) => check.status === "pass"), disabledSmokeReport: smoke, secretNames, confirmation, platformHtml, googleSignInClientId: activation?.googleSignInClientId });

if (!candidate.ok) {
  console.error("Staging activation candidate was not created:");
  candidate.reasons.forEach((reason) => console.error(`- ${reason}`));
  console.error(`Required confirmation: --confirm="${STAGING_ACTIVATION_CONFIRMATION}"`);
  console.error("No deployment, migration, secret change, network request, or source-file activation occurred.");
  process.exitCode = 1;
} else {
  await mkdir(outputDir, { recursive: true });
  for (const [name, config] of [["platform-auth.wrangler.jsonc", candidate.configs.auth], ["platform-identity.wrangler.jsonc", candidate.configs.identity], ["evidence-api.wrangler.jsonc", candidate.configs.evidence]]) {
    await writeFile(resolve(outputDir, name), `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
  }
  await writeFile(resolve(outputDir, "platform.index.activated.html"), candidate.platformHtml, { mode: 0o600 });
  console.log("Created an ignored private-staging activation candidate. Nothing was deployed or activated in source.");
  console.log(`Review: ${outputDir}`);
}
