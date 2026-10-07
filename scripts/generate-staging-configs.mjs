#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateDisabledStagingConfigs } from "../platform/integrations/cloudflare/staging-config-generator.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceArg = process.argv.find((argument) => argument.startsWith("--config="))?.slice(9) || "platform/integrations/cloudflare/production-activation.json";
const sourcePath = resolve(root, sourceArg);
const outputDir = resolve(root, "platform/integrations/cloudflare/.generated/staging");

let input;
try { input = JSON.parse(await readFile(sourcePath, "utf8")); }
catch { console.error(`Staging configuration was not generated. Create ${sourceArg} from the example first.`); process.exitCode = 1; }

if (input) {
  try {
    const configs = generateDisabledStagingConfigs(input);
    await mkdir(outputDir, { recursive: true });
    const targets = [
      ["platform-auth.wrangler.jsonc", configs.auth],
      ["platform-identity.wrangler.jsonc", configs.identity],
      ["evidence-api.wrangler.jsonc", configs.evidence],
    ];
    for (const [name, config] of targets) await writeFile(resolve(outputDir, name), `${JSON.stringify(config, null, 2)}\n`, { flag: "w", mode: 0o600 });
    console.log("Generated three private staging configs with production features disabled.");
    console.log("No deployment, migration, secret change, network request, or billing action was performed.");
    console.log(`Review: ${outputDir}`);
  } catch (error) {
    console.error(`Staging configuration was not generated: ${error.message}`);
    process.exitCode = 1;
  }
}

