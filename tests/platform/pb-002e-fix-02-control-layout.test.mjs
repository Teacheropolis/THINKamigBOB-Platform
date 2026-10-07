import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(
  new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const cssSource = readFileSync(
  new URL("../../platform/styles/platform.css", import.meta.url), "utf8");

function sectionSource(className) {
  const start = appSource.indexOf(`<section class="${className}`);
  assert.ok(start >= 0, `expected ${className}`);
  return appSource.slice(start, appSource.indexOf("</section>", start));
}

test("Class Timing owns Student Display controls while Teacher Memo stays focused", () => {
  const timerCard = sectionSource("platform-command-card platform-command-card-timer");
  const memoCard = sectionSource("platform-command-card platform-command-card-memo");
  assert.match(timerCard, /open-timer-popout/);
  assert.match(timerCard, /open-timer-display/);
  assert.equal((timerCard.match(/data-action="select-presentation-mode"/g) ?? []).length, 3);
  assert.doesNotMatch(memoCard, /open-timer-display|open-timer-popout|select-presentation-mode|data-presentation-mode/);
  assert.match(timerCard, /timer-start/);
  assert.match(timerCard, /timer-subtract-minute/);
  assert.match(memoCard, /Save Memo/);
  assert.match(memoCard, /data-teacher-memo-status/);
});

test("timer display controls offer a floating timer and optional full-screen modes", () => {
  const controls = sectionSource("platform-command-card platform-command-card-timer");
  assert.match(controls, /id="timer-display-actions-title">Show students the timer/);
  assert.equal((controls.match(/data-action="select-presentation-mode"/g) ?? []).length, 3);
  assert.equal((controls.match(/data-action="open-timer-display"/g) ?? []).length, 1);
  assert.equal((controls.match(/data-action="open-timer-popout"/g) ?? []).length, 1);
  for (const label of ["Timer + Message", "Message only", "Timer only"]) {
    assert.ok(controls.includes(label), `expected ${label}`);
  }
  assert.match(controls, /aria-label="Student Display content"/);
  assert.match(controls,
    /data-presentation-mode="\$\{STUDENT_DISPLAY_MODES\.MESSAGE\}"[^>]*\$\{hasMessageContent \? "" : " disabled"\}/);
});

test("timer-owned controls remain accessible and use existing ownership", () => {
  assert.equal((appSource.match(/<button[^>]+data-action="open-timer-display"/g) ?? []).length, 1);
  assert.match(appSource, /lessonTimerDisplayTrigger = action/);
  assert.match(appSource, /lessonTimerDisplayTrigger = null;\s*focusTarget\?\.focus\(\)/);
  assert.match(cssSource, /\.platform-timer-display-actions \{ display: grid;/);
  assert.match(cssSource, /\.platform-student-display-mode-controls button \{ min-height: 2\.75rem/);
  assert.match(cssSource, /\.platform-student-display-button \{ width: 100%;/);
  assert.match(appSource, /window\.open\("", "thinkamigbob-student-timer"/);
  assert.match(appSource, /popup=yes,width=460,height=540,resizable=yes/);
  assert.match(appSource, /html\{color-scheme:dark;background:#142936\}/);
  assert.match(appSource, /width:min\(84vw,66vh\)/);
  assert.match(appSource, /Drag any corner of this window to resize the timer\./);
  assert.match(appSource, /syncStudentTimerPopout\(\)/);
  assert.doesNotMatch(appSource, /PB-002E-FIX-02|pb002e-fix-02|pb002e\.fix02/);
});
