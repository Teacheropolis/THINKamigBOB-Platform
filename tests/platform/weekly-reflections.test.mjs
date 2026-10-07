import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createWeeklyReflections,
  REFLECTION_ACTIVITY_RATING_OPTIONS,
  REFLECTION_BADGE_OPTIONS,
  REFLECTION_HELP_OPTIONS,
  REFLECTION_HELP_OTHER_OPTIONS,
  REFLECTION_IMPROVEMENT_OPTIONS,
  REFLECTION_PROGRESS_OPTIONS,
  reflectionActivityWindowStart,
  weekKey,
} from "../../platform/scripts/weekly-reflections.mjs";

function memoryStorage() { const values = new Map(); return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }; }

test("weekly requirements and student progress are class and student specific", () => {
  const store = createWeeklyReflections({ storage: memoryStorage(), now: () => new Date("2026-09-23T12:00:00Z") });
  assert.equal(weekKey(new Date("2026-09-23T12:00:00Z")), "2026-09-21");
  assert.equal(store.setRequirement("class-a", 3).ok, true);
  assert.equal(store.status("class-a", "student-a").state, "multiple");
  store.submit("class-a", "student-a", "I learned how triangles strengthen a bridge.");
  assert.equal(store.status("class-a", "student-a").remaining, 2);
  store.submit("class-a", "student-a", "I learned that testing helps improve a design.");
  assert.equal(store.status("class-a", "student-a").state, "one");
  store.submit("class-a", "student-a", "I learned how to explain evidence from a test.");
  assert.equal(store.status("class-a", "student-a").state, "complete");
  assert.equal(store.status("class-a", "student-b").remaining, 3);
});

test("requirements and reflections are bounded", () => {
  const store = createWeeklyReflections({ storage: memoryStorage() });
  assert.equal(store.setRequirement("class-a", 6).ok, false);
  assert.equal(store.submit("class-a", "student-a", "short").ok, false);
});

test("Google Form prompt responses are stored as one validated reflection", () => {
  const store = createWeeklyReflections({ storage: memoryStorage() });
  const response = {
    activity: "Bridge Design Builder",
    progress: REFLECTION_PROGRESS_OPTIONS[1],
    explanation: "I tested the bridge and added stronger triangle supports.",
    improved: REFLECTION_IMPROVEMENT_OPTIONS[0],
    badge: REFLECTION_BADGE_OPTIONS[0],
    help: REFLECTION_HELP_OPTIONS[0],
    helpOther: REFLECTION_HELP_OTHER_OPTIONS[0],
    rating: REFLECTION_ACTIVITY_RATING_OPTIONS[1],
  };
  assert.equal(store.submit("class-a", "student-a", response).ok, true);
  assert.deepEqual(store.responses("class-a", "student-a")[0].activity, response.activity);
  assert.equal(store.submit("class-a", "student-b", { ...response, progress: "invented" }).ok, false);
});

test("reflection activity choices include this week and the preceding Friday", () => {
  let current = new Date(2026, 8, 18, 10);
  const store = createWeeklyReflections({ storage: memoryStorage(), now: () => current });
  assert.equal(reflectionActivityWindowStart(new Date(2026, 8, 23, 12)), new Date(2026, 8, 18).getTime());
  store.recordActivity("class-a", "Friday Bridge Test");
  current = new Date(2026, 8, 21, 10);
  store.recordActivity("class-a", "Monday Robot Route");
  current = new Date(2026, 8, 23, 12);
  assert.deepEqual(store.activities("class-a").map((entry) => entry.title), ["Monday Robot Route", "Friday Bridge Test"]);
});

test("teacher requirement and student traffic-light states are available", () => {
  const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
  const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");
  assert.match(app, /Responses required this week/);
  assert.match(app, /data-form="weekly-reflection"/);
  for (const prompt of ["Activity Worked On Today", "Mission Progress", "Tell what you built, tested, created, discovered, or improved.", "Which Badge Did You Earn Today", "Do You Need Help Next Class", "Could You Help Another Student With Today's Activity", "How Did This Activity Go Today"]) assert.match(app, new RegExp(prompt.replace(/[?]/g, "\\?")));
  assert.match(app, /Other activity — type my own/);
  assert.match(app, /Choose an activity/);
  assert.match(app, /reflectionActivityWindowStart/);
  assert.match(app, /sharedResourceActivities/);
  assert.match(app, /data-action="reflection-dictate"/);
  assert.match(app, /data-action="reflection-dictate-stop" hidden>■ Stop Speaking/);
  assert.match(app, /Start speaking now — listening\./);
  assert.match(app, /reflectionRecognition\?\.stop\(\)/);
  assert.match(app, /navigator\.mediaDevices\.getUserMedia\(\{ audio: true \}\)/);
  assert.match(app, /Microphone permission is blocked/);
  assert.match(app, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(app, /const answerBeforeListening = field\.value\.trim\(\)/);
  assert.match(app, /field\.value = `\$\{answerBeforeListening\}/);
  assert.match(app, /data-reflection-state="\$\{reflectionStatus\.state\}"/);
  assert.match(css, /data-reflection-state="multiple"[^}]*animation: platform-reflection-yellow-pulse/);
  assert.match(css, /data-reflection-state="one"[^}]*animation: platform-reflection-red-pulse/);
  assert.match(css, /data-reflection-state="complete"[^}]*background: #e7f5ed/);
  assert.match(css, /platform-reflection-yellow-pulse \{ from \{ background: #ffe27a;/);
  assert.match(css, /platform-reflection-red-pulse \{ from \{ background: #f69a94;/);
  assert.match(css, /\.platform-student-reflection \{ grid-column: span 4;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
