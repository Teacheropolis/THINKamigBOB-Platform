import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const controller = readFileSync(new URL("../../platform/scripts/pb-002j-classwide-controller.mjs", import.meta.url), "utf8");
const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");

test("teacher configuration is separate from PB-002I and class-wide only", () => {
  assert.match(app, /data-pb002j-teacher/);
  assert.match(app, /does not change the session-only Today’s Mission announcement/);
  assert.match(controller, /Save Class Availability/);
  assert.doesNotMatch(controller, /student-specific|small-group|cross-grade|Grade 6/i);
});

test("teacher selects weeks, goals, and the class activity-choice approach", () => {
  assert.match(controller, /Week or weeks/);
  assert.match(controller, /Goal or goals/);
  assert.match(controller, /Students may choose an activity/);
  assert.match(controller, /Assign a specific activity/);
  assert.doesNotMatch(controller, /Preparation confirmation|engineering level|creation route/i);
  assert.match(controller, /Builder: Unavailable for this activity/);
  assert.match(controller, /Workshop: Unavailable for this activity/);
});

test("teacher controls are accessible, responsive, and use memory-only key handling", () => {
  assert.match(controller, /type="password" autocomplete="off" required/);
  assert.match(controller, /role="status" aria-live="polite"/);
  assert.match(css, /\.platform-pb002j-form[^}]*display: grid/);
  assert.match(css, /min-height: 2\.75rem/);
  assert.doesNotMatch(controller, /sessionStorage|localStorage|cookie/);
});
