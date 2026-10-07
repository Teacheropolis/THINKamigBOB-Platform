#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runStagingSmokeTest } from "../platform/integrations/cloudflare/staging-smoke-test.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceArg = process.argv.find((argument) => argument.startsWith("--config="))?.slice(9) || "platform/integrations/cloudflare/production-activation.json";
const expectEnabled = process.argv.includes("--expect-enabled");
let activation;
try { activation = JSON.parse(await readFile(resolve(root, sourceArg), "utf8")); }
catch { console.error(`Staging smoke test did not run. Create ${sourceArg} from the example first.`); process.exitCode = 1; }

if (activation) {
  console.log(`Running read-only ${expectEnabled ? "enabled" : "disabled"} staging health checks. No sign-in, classroom, Drive, or write request will be made.`);
  const report = await runStagingSmokeTest({ origin: activation.stagingOrigin, expectEnabled });
  for (const item of report.checks) console.log(`[${item.ok ? "PASS" : "FAIL"}] ${item.service} health — HTTP ${item.status || "unavailable"}; productionReady=${String(item.reportedReady)}`);
  console.log(`Staging smoke test: ${report.ok ? "PASS" : `FAIL (${report.reason || "health-contract-mismatch"})`}`);
  if (report.ok && !expectEnabled && process.argv.includes("--write-evidence")) {
    const evidenceDir = resolve(root, "platform/integrations/cloudflare/.generated/staging");
    await mkdir(evidenceDir, { recursive: true });
    await writeFile(resolve(evidenceDir, "disabled-smoke-evidence.json"), `${JSON.stringify({ ...report, recordedAt: new Date().toISOString() }, null, 2)}\n`, { mode: 0o600 });
    console.log("Recorded non-secret disabled smoke evidence for the local activation gate.");
  }
  process.exitCode = report.ok ? 0 : 1;
}
