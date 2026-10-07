import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createEvidenceFoundation, EVIDENCE_TYPES, PILOT_EVIDENCE } from "../../platform/scripts/evidence-foundation.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");

test("foundation exposes all pilot evidence choices and an evidence log", () => {
  for (const label of ["Photo", "Screenshot", "Video", "Reflection", "More Evidence", "Open Evidence Log"]) {
    assert.match(app, new RegExp(label));
  }
  assert.match(app, /Current activity/);
  assert.match(app, /data-evidence-preview/);
  assert.match(app, /Retake/);
  assert.match(app, /Evidence saved to your pilot timeline/);
});

test("fictional timeline and local-only boundary are explicit", () => {
  assert.ok(PILOT_EVIDENCE.length >= 3);
  assert.match(app, /Fictional pilot data/);
  assert.match(app, /Photo and Screenshot use the teacher-owned Drive when the local pilot service is running/);
  assert.match(app, /all other evidence remains in this browser session/);
  assert.match(app, /Launch Evidence to Students/);
});

test("store validates evidence and prepends session saves", () => {
  const store = createEvidenceFoundation();
  assert.equal(store.save({ type: EVIDENCE_TYPES.PHOTO, detail: "" }).ok, false);
  const result = store.save({ type: EVIDENCE_TYPES.REFLECTION, title: "Test", activity: "Bridge", detail: "I changed the base." });
  assert.equal(result.ok, true);
  assert.equal(store.timeline()[0].activity, "Bridge");
});
