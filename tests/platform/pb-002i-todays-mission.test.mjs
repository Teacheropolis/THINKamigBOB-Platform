import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const appSource = fs.readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const cssSource = fs.readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");

async function loadMissionModule() {
  const source = fs.readFileSync(new URL("../../platform/scripts/todays-mission.mjs", import.meta.url), "utf8")
    .replaceAll("export const ", "const ")
    .replace("export function createTodaysMissionStore", "function createTodaysMissionStore")
    .concat("\nglobalThis.moduleExports = { createTodaysMissionStore, TODAYS_MISSION_SESSION_KEY, TODAYS_MISSION_AVAILABILITY };\n");
  const context = vm.createContext({});
  new vm.Script(source).runInContext(context);
  return context.moduleExports;
}

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

test("Today’s Mission stores one validated session-only announcement atomically", async () => {
  const { createTodaysMissionStore, TODAYS_MISSION_AVAILABILITY: availability } = await loadMissionModule();
  const store = createTodaysMissionStore({ storage: memoryStorage() });
  assert.equal(store.read().title, "");
  const saved = store.save({ title: "  Bridge Test  ", focus: "Test, improve, and explain.", builder: availability.AVAILABLE, workshop: availability.NOT_PART });
  assert.equal(saved.ok, true);
  assert.deepEqual(JSON.parse(JSON.stringify(store.read())), {
    version: 1,
    title: "Bridge Test",
    focus: "Test, improve, and explain.",
    builder: "available",
    workshop: "not-part",
  });
  const failed = store.save({ title: "Replacement", focus: "New focus", builder: "", workshop: availability.AVAILABLE });
  assert.equal(failed.reason, "missing-builder");
  assert.equal(store.read().title, "Bridge Test");
});

test("Today’s Mission rejects incomplete, oversized, and invalid stored values", async () => {
  const { createTodaysMissionStore, TODAYS_MISSION_SESSION_KEY, TODAYS_MISSION_AVAILABILITY: availability } = await loadMissionModule();
  const storage = memoryStorage();
  const store = createTodaysMissionStore({ storage });
  assert.equal(store.save({ title: "", focus: "Focus", builder: availability.AVAILABLE, workshop: availability.AVAILABLE }).reason, "missing-title");
  assert.equal(store.save({ title: "Title", focus: "", builder: availability.AVAILABLE, workshop: availability.AVAILABLE }).reason, "missing-focus");
  assert.equal(store.save({ title: "x".repeat(81), focus: "Focus", builder: availability.AVAILABLE, workshop: availability.AVAILABLE }).reason, "title-too-long");
  assert.equal(store.save({ title: "Title", focus: "x".repeat(181), builder: availability.AVAILABLE, workshop: availability.AVAILABLE }).reason, "focus-too-long");
  storage.setItem(TODAYS_MISSION_SESSION_KEY, JSON.stringify({ version: 1, title: "Bad", focus: "Bad", builder: "unknown", workshop: "available" }));
  assert.equal(store.read().title, "");
});

test("teacher editor uses approved copy, explicit choices, and honest states", () => {
  for (const text of [
    "Mission title or Goal", "Short classroom focus", "Choose a classroom focus",
    "Customize your own", "Builder today", "Workshop today",
    "Available today", "Not part of today's mission", "Save Today's Mission",
    "Clear Today's Mission", "Missions First! Read your directions before opening Builder or Workshop.",
    "No Today's Mission has been prepared for this browser session.",
    "Unsaved changes. Save before refreshing or opening Student Display.",
  ]) assert.ok(appSource.includes(text), `expected ${text}`);
  assert.match(appSource, /name="builder"[\s\S]*builderAvailable \? " checked" : ""/);
  assert.match(appSource, /name="workshop"[\s\S]*workshopAvailable \? " checked" : ""/);
  assert.match(appSource, /function missionFocusValue\(form\)/);
  assert.match(appSource, /data-mission-custom-focus\$\{customFocusVisible \? "" : " hidden"\}/);
});

test("Student Display presents saved mission only in message-bearing modes", () => {
  assert.match(appSource, /showStudentMission = hasMission && selectedDisplayMode !== STUDENT_DISPLAY_MODES\.TIMER/);
  assert.match(appSource, /hasMessageContent = hasMemo \|\| hasMission/);
  assert.match(appSource, /data-student-mission/);
  assert.match(appSource, /data-student-mission-title/);
  assert.match(appSource, /data-student-mission-focus/);
  assert.doesNotMatch(appSource.match(/<div class="platform-student-mission"[\s\S]*?<\/div>/)?.[0] ?? "", /<button|<input|<textarea|Save Today's Mission|Clear Today's Mission/);
});

test("PB-002I remains isolated and Chromebook responsive", () => {
  assert.match(appSource, /todaysMission\.clear\(\);[\s\S]*studentDisplayMode\.clear\(\)/);
  assert.doesNotMatch(appSource, /fetch\(|XMLHttpRequest|localStorage|indexedDB/);
  assert.match(cssSource, /\.platform-todays-mission-form/);
  assert.match(cssSource, /min-height: 2\.75rem/);
  assert.match(cssSource, /@media \(max-width: 520px\)[\s\S]*\.platform-todays-mission-actions/);
});

test("Today’s Mission Clear requires an accessible safe confirmation", () => {
  assert.match(appSource, /data-todays-mission-confirmation role="alertdialog" aria-modal="true"/);
  assert.match(appSource, /saved current-session mission announcement/);
  assert.match(appSource, /data-action="keep-todays-mission">Keep Mission/);
  assert.match(appSource, /data-action="confirm-clear-todays-mission">Clear Mission/);
  assert.match(appSource, /confirmation\.querySelector\('\[data-action="keep-todays-mission"\]'\)\?\.focus\(\)/);
});

test("Today’s Mission Clear cancellation and Escape preserve saved state", () => {
  assert.match(appSource, /action\.dataset\.action === "keep-todays-mission"[\s\S]*closeTodaysMissionClearConfirmation\(\)/);
  assert.match(appSource, /missionConfirmation[\s\S]*event\.preventDefault\(\);[\s\S]*closeTodaysMissionClearConfirmation\(\);[\s\S]*return;/);
  assert.doesNotMatch(appSource, /action\.dataset\.action === "clear-todays-mission"\) \{\s*todaysMission\.clear\(\)/);
});

test("Today’s Mission clears only after explicit confirmation and guards double activation", () => {
  assert.match(appSource, /action\.dataset\.action === "confirm-clear-todays-mission"[\s\S]*if \(action\.disabled\) return;[\s\S]*action\.disabled = true;[\s\S]*todaysMission\.clear\(\)/);
  assert.match(appSource, /closeTodaysMissionClearConfirmation\(\{ restoreFocus: false \}\)/);
  assert.match(cssSource, /\.platform-todays-mission-confirmation\[hidden\] \{ display: none; \}/);
});
