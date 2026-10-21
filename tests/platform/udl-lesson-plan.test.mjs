import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createUdlLessonPlanStore, lessonPlanSuggestions, OHIO_STANDARDS_3_6 } from "../../platform/scripts/udl-lesson-plan.mjs";

const memoryStorage = () => { const values = new Map(); return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }; };

test("UDL plans save grade 3-6 standards and teacher choices", () => {
  const store = createUdlLessonPlanStore(memoryStorage());
  const saved = store.save("class-a", { grade: "4", description: "Build a shelter", standardIds: ["4-PS-Energy", "not-real"], objective: "Explain the test result", assessmentType: "formative", representation: "Model", engagement: "Choice", expression: "Build" });
  assert.equal(saved.grade, "4");
  assert.deepEqual(saved.standardIds, ["4-PS-Energy"]);
  assert.equal(saved.assessmentType, "formative");
  assert.equal(OHIO_STANDARDS_3_6.some((item) => item.grade === 6), true);
});

test("rule-based plan check identifies missing lesson pieces without AI", () => {
  const suggestions = lessonPlanSuggestions({ standardIds: [] }, { hasDoNow: false, hasSteps: false, hasExitTicket: false });
  assert.match(suggestions.join(" "), /Do Now/);
  assert.match(suggestions.join(" "), /Captain's Log/);
  assert.match(suggestions.join(" "), /Ohio standard/);
});

test("teacher UI connects standards, UDL, lesson arc, and assessments", () => {
  const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
  for (const text of ["UDL Lesson Plan and Ohio Standards", "Starter catalog", "Beginning · Do Now", "Middle · Activities", "End · Captain’s Log", "Formative — guides next instruction", "Summative — evaluates learning", "I understand this is a"]) assert.match(app, new RegExp(text));
});
