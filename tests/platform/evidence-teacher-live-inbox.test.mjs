import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const client = readFileSync(new URL("../../platform/scripts/evidence-upload-client.mjs", import.meta.url), "utf8");
const broker = readFileSync(new URL("../../platform/scripts/evidence-upload-broker.mjs", import.meta.url), "utf8");

test("teacher live inbox lists and previews protected visual evidence", () => {
  assert.match(app, /Live Evidence Inbox/);
  assert.match(app, /Refresh Live Evidence/);
  assert.match(app, /Fictional student visual evidence preview/);
  assert.match(app, /data-live-evidence-filter/);
  assert.match(client, /listEvidence/);
  assert.match(client, /loadEvidencePreview/);
  assert.match(broker, /teacher-key-required/);
  assert.match(broker, /evidenceRecords\.map\(\(\{ bytes, \.\.\.record \}\) => record\)/);
});

test("persistent inbox remains protected and bounded", () => {
  assert.match(broker, /evidenceRecords\.length > 50/);
  assert.match(app, /teacher-owned Drive/);
  assert.match(app, /Drive file:/);
  assert.doesNotMatch(client, /localStorage|sessionStorage/);
});
