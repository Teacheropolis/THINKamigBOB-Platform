import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PILOT_TEACHER_EVIDENCE } from "../../platform/scripts/evidence-foundation.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");

test("teacher evidence preview uses a bounded fictional classroom set", () => {
  assert.equal(PILOT_TEACHER_EVIDENCE.length, 4);
  for (const item of PILOT_TEACHER_EVIDENCE) {
    assert.ok(item.student && item.type && item.title && item.activity && item.detail);
  }
  assert.match(app, /Fictional classroom preview/);
  assert.match(app, /id="teacher-evidence-review-title">Student Evidence/);
  assert.match(app, /data-teacher-evidence-filter/);
  assert.match(app, /data-action="teacher-evidence-open"/);
});

test("preview explicitly excludes authority and external connections", () => {
  assert.match(app, /No real student accounts, files, Google Drive, grades, comments, automated messages, or teacher-review history are connected/);
  assert.match(app, /without assigning grades, leaving comments, or recording whether a teacher viewed it/);
  assert.doesNotMatch(app, /data-action="teacher-evidence-(?:grade|comment|approve|return|notify)"/);
});

test("teacher evidence preview is responsive and keyboard operable", () => {
  assert.match(css, /\.platform-teacher-evidence-card \{[^}]*grid-column:\s*1 \/ -1/);
  assert.match(css, /@media \(max-width: 520px\)[\s\S]*\.platform-teacher-evidence-layout \{ grid-template-columns: 1fr; \}/);
  assert.match(app, /class="platform-teacher-evidence-detail"[^>]*tabindex="-1"/);
});
