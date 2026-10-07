import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  createTeacherMemoStore,
  TEACHER_MEMO_COLORS,
  TEACHER_MEMO_MAX_CHARACTERS,
  TEACHER_MEMO_SIZES,
  TEACHER_MEMO_STYLES,
  TEACHER_MEMO_SESSION_KEY,
} from "../../platform/scripts/teacher-memo.mjs";

const appSource = readFileSync(
  new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const cssSource = readFileSync(
  new URL("../../platform/styles/platform.css", import.meta.url), "utf8");
const EMPTY_MEMO = { version: 3, text: "", color: "white", size: "extra-large", style: "bold", segments: [], image: "" };

function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) { data.set(key, String(value)); },
    removeItem(key) { data.delete(key); },
  };
}

test("memo starts empty and stores one bounded plain-text value", () => {
  const memo = createTeacherMemoStore({ storage: createMemoryStorage() });
  assert.deepEqual(memo.read(), EMPTY_MEMO);
  assert.equal(TEACHER_MEMO_MAX_CHARACTERS, 240);
  const saved = memo.save("  Bring your design notebook.  ");
  assert.equal(saved.ok, true);
  assert.equal(saved.state.text, "Bring your design notebook.");
  assert.equal(memo.save("x".repeat(240)).ok, true);
  assert.equal(memo.save("x".repeat(241)).ok, false);
  assert.equal(memo.read().text.length, 240);
});

test("memo preserves internal spacing and line breaks", () => {
  const memo = createTeacherMemoStore({ storage: createMemoryStorage() });
  const text = "Agenda:\n  1. Build\n  2. Test";
  assert.equal(memo.save(`\n${text}\n`).state.text, text);
});

test("empty, whitespace-only, and non-string saves fail safely", () => {
  const memo = createTeacherMemoStore({ storage: createMemoryStorage() });
  for (const value of ["", "   ", null, undefined, 42]) {
    const result = memo.save(value);
    assert.equal(result.ok, false);
    assert.equal(result.state.text, "");
  }
});

test("update replaces the single memo and clear is stable", () => {
  const storage = createMemoryStorage();
  const memo = createTeacherMemoStore({ storage });
  memo.save("First message");
  memo.save("Updated message");
  assert.equal(memo.read().text, "Updated message");
  assert.deepEqual(memo.clear(), EMPTY_MEMO);
  assert.deepEqual(memo.clear(), EMPTY_MEMO);
  assert.equal(storage.getItem(TEACHER_MEMO_SESSION_KEY), null);
});

test("memo restores after refresh and cleared memo does not return", () => {
  const storage = createMemoryStorage();
  createTeacherMemoStore({ storage }).save("Today's agenda");
  assert.equal(createTeacherMemoStore({ storage }).read().text, "Today's agenda");
  createTeacherMemoStore({ storage }).clear();
  assert.equal(createTeacherMemoStore({ storage }).read().text, "");
});

test("malformed, incompatible, non-string, and oversized data fail closed", () => {
  const storage = createMemoryStorage();
  for (const value of [
    "not json",
    JSON.stringify({ version: 4, text: "Message" }),
    JSON.stringify({ version: 1, text: 42 }),
    JSON.stringify({ version: 1, text: "x".repeat(241) }),
  ]) {
    storage.setItem(TEACHER_MEMO_SESSION_KEY, value);
    assert.deepEqual(createTeacherMemoStore({ storage }).read(), EMPTY_MEMO);
  }
});

test("memo stores only approved full-screen formatting", () => {
  const memo = createTeacherMemoStore({ storage: createMemoryStorage() });
  assert.deepEqual(TEACHER_MEMO_COLORS, ["white", "yellow", "light-blue", "green", "pink"]);
  assert.deepEqual(TEACHER_MEMO_SIZES, ["large", "extra-large", "huge"]);
  assert.deepEqual(TEACHER_MEMO_STYLES, ["regular", "bold", "underline", "bold-underline"]);
  const saved = memo.save("Cleanup in five minutes", { color: "yellow", size: "huge", style: "bold-underline" });
  assert.equal(saved.state.version, 3);
  assert.deepEqual(saved.state.segments, [{ text: "Cleanup in five minutes", color: "yellow", size: "huge", style: "bold-underline" }]);
  assert.deepEqual(memo.save("Safe defaults", { color: "javascript:red", size: "giant", style: "blink" }).state.segments,
    [{ text: "Safe defaults", color: "white", size: "extra-large", style: "bold" }]);
});

test("teacher editor and Student Display follow the approved separation", () => {
  for (const text of [
    "Class-wide message or agenda", "Save Memo", "Clear Memo",
    "Current class message", "Apply to Selected Text", "Selected text color", "Selected text size", "Selected text style", "Optional image",
  ]) assert.ok(appSource.includes(text), `expected ${text}`);
  assert.match(appSource, /contenteditable="true"/);
  assert.match(appSource, /memoFormatRevision \+= 1/);
  assert.match(appSource, /wrapper\.dataset\.memoPriority/);
  assert.match(appSource, /priority >= winningPriority/);
  assert.match(appSource, /document\.addEventListener\("selectionchange"/);
  assert.match(appSource, /memoSelectionRange\?\.cloneRange\(\)/);
  assert.match(appSource, /querySelectorAll\("\[data-student-memo\]"\)/);
  assert.doesNotMatch(appSource, /querySelectorAll\("\[data-memo-color\]"\)/);
  assert.match(appSource, /root\.addEventListener\("beforeinput"/);
  assert.match(appSource, /event\.inputType !== "insertText"/);
  assert.match(appSource, /New typing will use/);
  assert.match(appSource,
    /session\.signOut\(\);\s*teacherMemo\.clear\(\);\s*todaysMission\.clear\(\);\s*studentDisplayMode\.clear\(\);\s*navigate\(ROUTES\.WELCOME/);
  assert.match(cssSource,
    /\.platform-teacher-memo-actions button \{ min-height: 2\.75rem/);
  assert.match(cssSource, /data-memo-size="huge"/);
  assert.match(cssSource, /data-memo-style="bold-underline"/);
  assert.match(cssSource, /\.platform-teacher-memo-toolbar \{ display: grid; grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(cssSource, /\.platform-teacher-memo-toolbar button \{ grid-column: 1 \/ -1; width: 100%; \}/);
  assert.match(cssSource, /\.platform-teacher-memo-editor \{[^}]*background: var\(--platform-navy\)/);
  assert.match(cssSource, /\.platform-teacher-memo-saved \{[^}]*background: var\(--platform-navy\)/);

  const displayStart = appSource.indexOf(
    '<section id="platform-student-timer-display"');
  const displayEnd = appSource.indexOf("</section>", displayStart);
  const displaySource = appSource.slice(displayStart, displayEnd);
  assert.match(displaySource, /data-student-memo/);
  assert.match(displaySource, /data-student-memo-text/);
  assert.doesNotMatch(displaySource,
    /<textarea|Save Memo|Clear Memo|teacher-memo-count|teacher-memo-error/);
});

test("memo save state and Student Display access are clear and persistent", () => {
  assert.match(appSource, /Saved for refresh and Student Display\./);
  assert.match(appSource, /Unsaved changes\. Save before refreshing or opening Student Display\./);
  assert.match(appSource, /Choose what students see without clearing the saved memo\./);

  const memoCardStart = appSource.indexOf(
    '<section class="platform-command-card platform-command-card-memo">');
  const memoCardEnd = appSource.indexOf("</section>", memoCardStart);
  const memoCardSource = appSource.slice(memoCardStart, memoCardEnd);
  assert.doesNotMatch(memoCardSource, /data-action="open-timer-display"|data-presentation-mode/);
  assert.match(appSource, /platform-timer-display-actions/);
  assert.match(cssSource,
    /\.platform-teacher-memo-status\[data-state="saved"\]/);
  assert.match(cssSource,
    /\.platform-teacher-memo-status\[data-state="unsaved"\]/);
});

test("memo remains isolated from timer, analytics, integrations, and networking", () => {
  const source = readFileSync(
    new URL("../../platform/scripts/teacher-memo.mjs", import.meta.url), "utf8");
  assert.match(source, /sessionStorage|SESSION_KEY/i);
  assert.doesNotMatch(source,
    /lesson|timer|student|mission|grade|analytics|localStorage|fetch\s*\(|WebSocket|Google/i);
});
