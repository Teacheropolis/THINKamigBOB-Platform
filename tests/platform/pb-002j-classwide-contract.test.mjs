import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  PB002J_ACTIVITY_ID, PB002J_DIRECTIONS_URL, PB002J_SOURCE_SHA256,
  publicProjection, validateCatalog, validateConfiguration,
} from "../../platform/scripts/pb-002j-classwide-contract.mjs";

const catalog = JSON.parse(readFileSync(new URL("../../platform/data/pb-002j-single-activity-catalog.v1.json", import.meta.url), "utf8"));
const base = {
  classContextId: "class_context_2026_A",
  activityId: PB002J_ACTIVITY_ID,
  activityVersion: 2,
  weekIds: ["week-1"],
  goalIds: ["pb002j-goal-g05-001"],
  availabilityMode: "student-choice",
  selectedActivityId: null,
  directionsUrl: PB002J_DIRECTIONS_URL,
  evidenceDestination: "Student Engineering Notebook / Evidence Portfolio",
  builderAvailable: false,
  workshopAvailable: false,
};

test("catalog contains exactly the approved activity and source identity", () => {
  assert.equal(validateCatalog(catalog).ok, true);
  assert.equal(catalog.activities.length, 1);
  assert.equal(catalog.activities[0].directions.approvedSourceSha256, PB002J_SOURCE_SHA256);
});

test("configuration fails closed for missing instructional choices or protected tool changes", () => {
  assert.equal(validateConfiguration(base, catalog, base.classContextId).ok, true);
  assert.equal(validateConfiguration({ ...base, builderAvailable: true }, catalog, base.classContextId).ok, false);
  assert.equal(validateConfiguration({ ...base, weekIds: [] }, catalog, base.classContextId).ok, false);
  assert.equal(validateConfiguration({ ...base, goalIds: [] }, catalog, base.classContextId).ok, false);
  assert.equal(validateConfiguration({ ...base, availabilityMode: null }, catalog, base.classContextId).ok, false);
});

test("public projection exposes one Start choice and no Side Paths or student data", () => {
  const projection = publicProjection({ revision: 1, configuration: base, catalog });
  assert.equal(projection.primaryStartChoices.length, 1);
  assert.deepEqual(projection.sidePaths, []);
  assert.equal(projection.primaryStartChoices[0].builderAvailable, false);
  assert.equal(projection.primaryStartChoices[0].workshopAvailable, false);
  assert.doesNotMatch(JSON.stringify(projection), /studentId|studentName|classContextId/);
});
