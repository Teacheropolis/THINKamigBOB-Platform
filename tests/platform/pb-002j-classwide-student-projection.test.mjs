import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const controller = readFileSync(new URL("../../platform/scripts/pb-002j-classwide-controller.mjs", import.meta.url), "utf8");

test("student projection consumes Current Goal and Available Missions only", () => {
  assert.match(app, /data-pb002j-current-goal/);
  assert.match(app, /data-pb002j-available-missions/);
  assert.match(controller, /YOUR MISSION:/);
  assert.match(controller, /Open Activity Directions/);
  assert.match(controller, /target="_blank" rel="noopener noreferrer"/);
});

test("projection fails closed and protects Continue and Side Paths", () => {
  assert.match(controller, /Available Missions cannot be checked right now/);
  assert.match(controller, /No new missions are available right now/);
  assert.match(app, /No mission is ready to continue yet/);
  assert.match(app, /Optional Side Paths are not available yet/);
  assert.doesNotMatch(controller, /Continue Current Work|Side Path activity|Grade 6/);
});

test("only Design a Space Bedroom is projected with Builder and Workshop unavailable", () => {
  assert.match(controller, /Design a Space Bedroom/);
  assert.match(controller, /Builder and Workshop are not available for this activity/);
  assert.doesNotMatch(controller, /Draw Your Dream Playground|Playground Safety Inspector/);
});
