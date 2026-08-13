import {
  DEVELOPMENT_FIXTURE_ACCESS,
  DEVELOPMENT_FIXTURE_NOTICE,
  findClassByCode,
  getClassById,
  getClassForTeacher,
  getDevelopmentIdentifier,
  getRosterForClass,
  getStudentById,
  getTeacherById,
  validateStudentIdentifier,
  validateTeacherCredentials,
} from "./platform-fixtures.mjs";
import { createSessionStore, PLATFORM_ROLES } from "./platform-session.mjs";
import {
  createLessonTimer,
  formatLessonTime,
  LESSON_TIMER_STATES,
  MAX_LESSON_MINUTES,
  MIN_LESSON_MINUTES,
} from "./lesson-timer.mjs";
import {
  createTeacherMemoStore,
  TEACHER_MEMO_MAX_CHARACTERS,
} from "./teacher-memo.mjs";
import {
  createStudentDisplayModeStore,
  STUDENT_DISPLAY_MODES,
} from "./student-display-mode.mjs";
import {
  createTodaysMissionStore,
  TODAYS_MISSION_AVAILABILITY,
  TODAYS_MISSION_FOCUS_MAX_CHARACTERS,
  TODAYS_MISSION_TITLE_MAX_CHARACTERS,
} from "./todays-mission.mjs";

export const ROUTES = Object.freeze({
  WELCOME: "/welcome",
  TEACHER_LOGIN: "/teacher/login",
  TEACHER_CREATE: "/teacher/create",
  TEACHER_RECOVERY: "/teacher/recovery",
  TEACHER_DASHBOARD: "/teacher/dashboard",
  STUDENT_ENTRY: "/student/entry",
  STUDENT_ROSTER: "/student/roster",
  STUDENT_IDENTIFIER: "/student/identifier",
  STUDENT_DASHBOARD: "/student/dashboard",
});

const root = document.querySelector("#platform-root");
const session = createSessionStore(window.sessionStorage);
const lessonTimer = createLessonTimer({ storage: window.sessionStorage });
const teacherMemo = createTeacherMemoStore({ storage: window.sessionStorage });
const todaysMission = createTodaysMissionStore({ storage: window.sessionStorage });
const studentDisplayMode = createStudentDisplayModeStore({ storage: window.sessionStorage });
const MISSIONS_FIRST_REMINDER = "Missions First! Read your directions before opening Builder or Workshop.";
const MISSION_FOCUS_OPTIONS = Object.freeze([
  "Learn what today's mission is asking us to do.",
  "Build, test, and make one thoughtful improvement.",
  "Use evidence to explain what worked and what changed.",
  "Work together, solve problems, and share our thinking.",
  "Reflect on what we learned and what we would try next.",
]);
const CUSTOM_MISSION_FOCUS = "custom";
const LESSON_TIMER_DISPLAY_SESSION_KEY = "thinkamigbob.pb002b.lesson-timer-display.v1";
const knownRoutes = new Set(Object.values(ROUTES));
let lessonTimerPresentationInterval = null;
let lessonTimerDisplayTrigger = null;

function lessonTimerDisplayIsStoredOpen() {
  try {
    return window.sessionStorage.getItem(LESSON_TIMER_DISPLAY_SESSION_KEY) === "open";
  } catch {
    return false;
  }
}

function storeLessonTimerDisplayOpen(isOpen) {
  try {
    if (isOpen) {
      window.sessionStorage.setItem(LESSON_TIMER_DISPLAY_SESSION_KEY, "open");
    } else {
      window.sessionStorage.removeItem(LESSON_TIMER_DISPLAY_SESSION_KEY);
    }
  } catch {
    // The current page can still open and close the display without persistence.
  }
}

function currentRoute() {
  return window.location.hash.replace(/^#/, "").replace(/\/$/, "") || ROUTES.WELCOME;
}

function navigate(route, { replace = false } = {}) {
  const nextHash = `#${route}`;
  if (replace) {
    window.location.replace(nextHash);
  } else if (window.location.hash === nextHash) {
    render();
  } else {
    window.location.hash = route;
  }
}

function guardRoute(route, state) {
  const isTeacherRoute = route.startsWith("/teacher/");
  const isStudentRoute = route.startsWith("/student/");

  if (state.role === PLATFORM_ROLES.TEACHER && isStudentRoute) return ROUTES.TEACHER_DASHBOARD;
  if (state.role === PLATFORM_ROLES.STUDENT && isTeacherRoute) return ROUTES.STUDENT_DASHBOARD;
  if (route === ROUTES.TEACHER_DASHBOARD && state.role !== PLATFORM_ROLES.TEACHER) return ROUTES.TEACHER_LOGIN;
  if (route === ROUTES.STUDENT_DASHBOARD && state.role !== PLATFORM_ROLES.STUDENT) return ROUTES.STUDENT_ENTRY;
  if (route === ROUTES.STUDENT_ROSTER && !state.pendingClassId) return ROUTES.STUDENT_ENTRY;
  if (route === ROUTES.STUDENT_IDENTIFIER && (!state.pendingClassId || !state.pendingStudentId)) {
    return state.pendingClassId ? ROUTES.STUDENT_ROSTER : ROUTES.STUDENT_ENTRY;
  }
  return route;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shell(content, { title, eyebrow = "Platform Foundation", subtitle = "", signedIn = false, teacherContext = null } = {}) {
  document.title = `${title} | THINKamigBOB`;
  return `
    <header class="platform-header">
      <a class="platform-brand" href="#${ROUTES.WELCOME}" aria-label="THINKamigBOB Platform home">
        <span class="platform-brand-mark" aria-hidden="true">BOB</span>
        <span><strong>THINKamigBOB</strong><small>STEM Learning Platform</small></span>
      </a>
      ${teacherContext ? `
        <div class="platform-teacher-orientation" aria-label="Current teacher and class">
          <span><small>Teacher</small><strong>${escapeHtml(teacherContext.teacherName)}</strong></span>
          <span><small>Current class</small><strong>${escapeHtml(teacherContext.className)}</strong></span>
          <span><small>Current period</small><strong>${escapeHtml(teacherContext.periodLabel)}</strong></span>
        </div>
        <div class="platform-header-actions">
          <button class="platform-button platform-button-quiet" type="button" data-action="reserved-nav" data-label="Settings">Settings</button>
          <button class="platform-button platform-button-quiet" type="button" data-action="sign-out">Sign out</button>
        </div>
      ` : signedIn ? '<button class="platform-button platform-button-quiet" type="button" data-action="sign-out">Sign out</button>' : ""}
    </header>
    <main id="platform-main" class="platform-main" tabindex="-1">
      <div class="platform-page-heading">
        <p class="platform-eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
        ${subtitle ? `<p class="platform-page-subtitle">${escapeHtml(subtitle)}</p>` : ""}
      </div>
      ${content}
    </main>
    <footer class="platform-footer">PB-001 development preview • Production accounts and persistent identity are not yet connected.</footer>
  `;
}

function fixtureNotice(details = "") {
  return `
    <aside class="platform-dev-notice" aria-label="Development fixture notice">
      <strong>Development preview</strong>
      <p>${escapeHtml(DEVELOPMENT_FIXTURE_NOTICE)}</p>
      ${details}
    </aside>
  `;
}

function welcomeView() {
  return shell(`
    <section class="platform-hero">
      <p class="platform-lead">A clear starting point for teachers and students.</p>
      <div class="platform-entry-grid">
        <article class="platform-entry-card">
          <span class="platform-card-icon" aria-hidden="true">T</span>
          <h2>Teachers</h2>
          <p>Open the development login or review the future account-creation path.</p>
          <div class="platform-actions">
            <a class="platform-button platform-button-primary" href="#${ROUTES.TEACHER_LOGIN}">Teacher Login</a>
            <a class="platform-button platform-button-secondary" href="#${ROUTES.TEACHER_CREATE}">Create Teacher Account</a>
          </div>
        </article>
        <article class="platform-entry-card">
          <span class="platform-card-icon" aria-hidden="true">S</span>
          <h2>Students</h2>
          <p>Enter with a class code, select your roster name, and use your private identifier.</p>
          <a class="platform-button platform-button-primary" href="#${ROUTES.STUDENT_ENTRY}">Student Entry</a>
        </article>
      </div>
    </section>
  `, { title: "Welcome" });
}

function teacherLoginView() {
  const access = `<details><summary>Show development test access</summary><dl><dt>Email</dt><dd><code>${escapeHtml(DEVELOPMENT_FIXTURE_ACCESS.teacherEmail)}</code></dd><dt>Password</dt><dd><code>${escapeHtml(DEVELOPMENT_FIXTURE_ACCESS.teacherPassword)}</code></dd></dl></details>`;
  return shell(`
    <div class="platform-form-layout">
      <form class="platform-panel platform-form" data-form="teacher-login" novalidate>
        <div class="platform-field">
          <label for="teacher-email">Email</label>
          <input id="teacher-email" name="email" type="email" autocomplete="username" required>
        </div>
        <div class="platform-field">
          <label for="teacher-password">Password</label>
          <input id="teacher-password" name="password" type="password" autocomplete="current-password" required>
        </div>
        <p class="platform-error" data-error role="alert" hidden></p>
        <button class="platform-button platform-button-primary" type="submit">Continue to Teacher Dashboard</button>
        <div class="platform-text-links">
          <a href="#${ROUTES.TEACHER_RECOVERY}">Forgot password?</a>
          <a href="#${ROUTES.WELCOME}">Back to Welcome</a>
        </div>
      </form>
      ${fixtureNotice(access)}
    </div>
  `, { title: "Teacher Login", eyebrow: "Teacher entry" });
}

function teacherCreateView() {
  return shell(`
    <section class="platform-panel platform-shell-message">
      <h2>Teacher account creation is reserved</h2>
      <p>Production registration requires an approved authentication service. No account will be created in PB-001.</p>
      <div class="platform-actions">
        <a class="platform-button platform-button-primary" href="#${ROUTES.TEACHER_LOGIN}">Go to Teacher Login</a>
        <a class="platform-button platform-button-secondary" href="#${ROUTES.WELCOME}">Back to Welcome</a>
      </div>
    </section>
  `, { title: "Create Teacher Account", eyebrow: "Future account service" });
}

function teacherRecoveryView() {
  return shell(`
    <section class="platform-panel platform-shell-message">
      <h2>Password recovery is reserved</h2>
      <p>Email verification and password recovery require an approved authentication service. No recovery message will be sent in PB-001.</p>
      <div class="platform-actions">
        <a class="platform-button platform-button-primary" href="#${ROUTES.TEACHER_LOGIN}">Return to Teacher Login</a>
        <a class="platform-button platform-button-secondary" href="#${ROUTES.WELCOME}">Back to Welcome</a>
      </div>
    </section>
  `, { title: "Password Recovery", eyebrow: "Future account service" });
}

function studentEntryView() {
  const access = `<details><summary>Show development class code</summary><p><code>${escapeHtml(DEVELOPMENT_FIXTURE_ACCESS.classCode)}</code></p></details>`;
  return shell(`
    <div class="platform-form-layout">
      <form class="platform-panel platform-form" data-form="student-entry" novalidate>
        <p>Ask your teacher for your class code.</p>
        <div class="platform-field">
          <label for="class-code">Class Code</label>
          <input id="class-code" name="classCode" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" maxlength="24" required>
        </div>
        <p class="platform-error" data-error role="alert" hidden></p>
        <button class="platform-button platform-button-primary" type="submit">Find My Class</button>
        <a class="platform-back-link" href="#${ROUTES.WELCOME}">Back to Welcome</a>
      </form>
      ${fixtureNotice(access)}
    </div>
  `, { title: "Student Entry", eyebrow: "Step 1 of 3" });
}

function studentRosterView(state) {
  const classRecord = getClassById(state.pendingClassId);
  const roster = classRecord ? getRosterForClass(classRecord.id) : [];
  const rosterButtons = roster.map((student) => `
    <button class="platform-roster-button" type="button" data-action="select-student" data-student-id="${escapeHtml(student.id)}">
      ${escapeHtml(student.displayName)}
    </button>
  `).join("");
  return shell(`
    <section class="platform-panel">
      <p class="platform-context-label">${escapeHtml(classRecord?.displayName ?? "Preview class")}</p>
      <h2>Select your name</h2>
      <p>Choose only your own roster name.</p>
      <div class="platform-roster-grid">${rosterButtons}</div>
      <a class="platform-back-link" href="#${ROUTES.STUDENT_ENTRY}">Use a different class code</a>
    </section>
  `, { title: "Roster Selection", eyebrow: "Step 2 of 3" });
}

function studentIdentifierView(state) {
  const student = getStudentById(state.pendingStudentId);
  const identifier = getDevelopmentIdentifier(state.pendingStudentId);
  const access = `<details><summary>Show this fictional student’s test identifier</summary><p><code>${escapeHtml(identifier)}</code></p></details>`;
  return shell(`
    <div class="platform-form-layout">
      <form class="platform-panel platform-form" data-form="student-identifier" novalidate>
        <p class="platform-context-label">Selected student</p>
        <h2>${escapeHtml(student?.displayName ?? "Student")}</h2>
        <div class="platform-field">
          <label for="private-identifier">Private Identifier</label>
          <input id="private-identifier" name="identifier" type="password" inputmode="numeric" autocomplete="off" maxlength="20" required aria-describedby="identifier-help">
          <small id="identifier-help">Enter the private identifier provided by your teacher.</small>
        </div>
        <p class="platform-error" data-error role="alert" hidden></p>
        <button class="platform-button platform-button-primary" type="submit">Open Student Dashboard</button>
        <a class="platform-back-link" href="#${ROUTES.STUDENT_ROSTER}">Choose a different name</a>
      </form>
      ${fixtureNotice(access)}
    </div>
  `, { title: "Private Identifier", eyebrow: "Step 3 of 3" });
}

function teacherDashboardView(state) {
  const teacher = getTeacherById(state.teacherId);
  const classRecord = getClassForTeacher(state.teacherId);
  const teacherName = teacher?.displayName ?? "Preview Teacher";
  const className = classRecord?.displayName ?? "Class not selected";
  const periodLabel = classRecord?.periodLabel ?? "Period not selected";
  const timerState = lessonTimer.read();
  const timerMinutes = Math.max(1, Math.round(timerState.durationSeconds / 60));
  const memoState = teacherMemo.read();
  const memoText = escapeHtml(memoState.text);
  const hasMemo = Boolean(memoState.text);
  const missionState = todaysMission.read();
  const hasMission = Boolean(missionState.title);
  const hasMessageContent = hasMemo || hasMission;
  const selectedDisplayMode = studentDisplayMode.read({ hasMemo: hasMessageContent });
  const showStudentTimer = selectedDisplayMode !== STUDENT_DISPLAY_MODES.MESSAGE;
  const showStudentMemo = hasMemo && selectedDisplayMode !== STUDENT_DISPLAY_MODES.TIMER;
  const showStudentMission = hasMission && selectedDisplayMode !== STUDENT_DISPLAY_MODES.TIMER;
  const showStudentMessage = showStudentMission || showStudentMemo;
  const studentDisplayClass = showStudentTimer && showStudentMessage
    ? "platform-student-display-combined"
    : showStudentMessage ? "platform-student-display-message-only" : "platform-student-display-timer-only";
  const builderAvailable = missionState.builder === TODAYS_MISSION_AVAILABILITY.AVAILABLE;
  const workshopAvailable = missionState.workshop === TODAYS_MISSION_AVAILABILITY.AVAILABLE;
  const selectedFocusOption = MISSION_FOCUS_OPTIONS.includes(missionState.focus)
    ? missionState.focus
    : missionState.focus ? CUSTOM_MISSION_FOCUS : "";
  const customFocusVisible = selectedFocusOption === CUSTOM_MISSION_FOCUS;
  return shell(`
    <div class="platform-command-layout">
      <nav class="platform-teacher-nav" aria-label="Teacher navigation">
        <a href="#${ROUTES.TEACHER_DASHBOARD}" aria-current="page">Today</a>
        ${["Classes", "Students", "Missions", "Reports", "Settings"].map((item) => `
          <button type="button" data-action="reserved-nav" data-label="${item}">${item}<small>Future build</small></button>
        `).join("")}
        <p id="teacher-nav-status" class="platform-nav-status" role="status" aria-live="polite">Reserved areas are labeled for future builds.</p>
      </nav>

      <section class="platform-today-board" aria-label="Today">
        <div class="platform-today-primary-grid">
          <section class="platform-command-card platform-command-card-mission">
            <p class="platform-command-label">Class focus</p>
            <h3>Today's Mission</h3>
            <form class="platform-todays-mission-form" data-form="todays-mission" novalidate>
              <label for="todays-mission-title">Mission title or Goal</label>
              <input id="todays-mission-title" name="title" type="text" maxlength="${TODAYS_MISSION_TITLE_MAX_CHARACTERS}" value="${escapeHtml(missionState.title)}" aria-describedby="todays-mission-title-count">
              <small id="todays-mission-title-count"><span data-todays-mission-title-count>${missionState.title.length}</span>/${TODAYS_MISSION_TITLE_MAX_CHARACTERS}</small>
              <label for="todays-mission-focus-choice">Short classroom focus</label>
              <select id="todays-mission-focus-choice" name="focusChoice" data-mission-focus-choice>
                <option value=""${selectedFocusOption ? "" : " selected"}>Choose a classroom focus</option>
                ${MISSION_FOCUS_OPTIONS.map((option) => `<option value="${escapeHtml(option)}"${selectedFocusOption === option ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}
                <option value="${CUSTOM_MISSION_FOCUS}"${customFocusVisible ? " selected" : ""}>Customize your own</option>
              </select>
              <div class="platform-todays-mission-custom-focus" data-mission-custom-focus${customFocusVisible ? "" : " hidden"}>
                <label for="todays-mission-focus">Customize your classroom focus</label>
                <textarea id="todays-mission-focus" name="focus" maxlength="${TODAYS_MISSION_FOCUS_MAX_CHARACTERS}" aria-describedby="todays-mission-focus-count">${customFocusVisible ? escapeHtml(missionState.focus) : ""}</textarea>
                <small id="todays-mission-focus-count"><span data-todays-mission-focus-count>${customFocusVisible ? missionState.focus.length : 0}</span>/${TODAYS_MISSION_FOCUS_MAX_CHARACTERS}</small>
              </div>
              <fieldset>
                <legend>Builder today</legend>
                <label><input type="radio" name="builder" value="${TODAYS_MISSION_AVAILABILITY.AVAILABLE}"${builderAvailable ? " checked" : ""}> Available today</label>
                <label><input type="radio" name="builder" value="${TODAYS_MISSION_AVAILABILITY.NOT_PART}"${hasMission && !builderAvailable ? " checked" : ""}> Not part of today's mission</label>
              </fieldset>
              <fieldset>
                <legend>Workshop today</legend>
                <label><input type="radio" name="workshop" value="${TODAYS_MISSION_AVAILABILITY.AVAILABLE}"${workshopAvailable ? " checked" : ""}> Available today</label>
                <label><input type="radio" name="workshop" value="${TODAYS_MISSION_AVAILABILITY.NOT_PART}"${hasMission && !workshopAvailable ? " checked" : ""}> Not part of today's mission</label>
              </fieldset>
              <p class="platform-missions-first-reminder">${MISSIONS_FIRST_REMINDER}</p>
              <div class="platform-todays-mission-actions">
                <button type="submit">Save Today's Mission</button>
                <button type="button" data-action="clear-todays-mission"${hasMission ? "" : " disabled"}>Clear Today's Mission</button>
              </div>
              <p class="platform-error platform-todays-mission-error" data-todays-mission-error role="alert" hidden></p>
              <p class="platform-todays-mission-status" data-todays-mission-status data-state="${hasMission ? "saved" : "empty"}" role="status" aria-live="polite">${hasMission ? "Today's Mission saved for refresh and Student Display." : "No Today's Mission has been prepared for this browser session."}</p>
            </form>
            <div class="platform-todays-mission-confirmation" data-todays-mission-confirmation role="alertdialog" aria-modal="true" aria-labelledby="todays-mission-clear-title" aria-describedby="todays-mission-clear-description" hidden>
              <div class="platform-todays-mission-confirmation-panel">
                <h4 id="todays-mission-clear-title">Clear Today’s Mission?</h4>
                <p id="todays-mission-clear-description">This will remove the saved current-session mission announcement.</p>
                <div class="platform-todays-mission-confirmation-actions">
                  <button type="button" data-action="keep-todays-mission">Keep Mission</button>
                  <button type="button" data-action="confirm-clear-todays-mission">Clear Mission</button>
                </div>
              </div>
            </div>
            <div class="platform-todays-mission-saved"${hasMission ? "" : " hidden"} data-todays-mission-saved>
              <p class="platform-command-label">Current mission announcement</p>
              <h4 data-todays-mission-saved-title>${escapeHtml(missionState.title)}</h4>
              <p data-todays-mission-saved-focus>${escapeHtml(missionState.focus)}</p>
              <ul>
                <li data-todays-mission-saved-builder>Builder: ${builderAvailable ? "Available today" : "Not part of today's mission"}</li>
                <li data-todays-mission-saved-workshop>Workshop: ${workshopAvailable ? "Available today" : "Not part of today's mission"}</li>
              </ul>
            </div>
          </section>
          <section class="platform-command-card platform-command-card-timer">
            <p class="platform-command-label">Class timing</p>
            <h3>Today's Engineering Time</h3>
            <div class="platform-lesson-timer" aria-label="Lesson Timer">
              <output class="platform-timer-remaining" data-timer-remaining aria-live="off">${formatLessonTime(timerState.remainingSeconds)}</output>
              <p class="platform-timer-state">Timer state: <strong data-timer-state>${escapeHtml(timerState.status)}</strong></p>
              <form class="platform-timer-duration" data-form="lesson-timer-duration" novalidate>
                <label for="lesson-duration">Lesson duration in minutes</label>
                <div>
                  <input id="lesson-duration" name="duration" type="number" inputmode="numeric" min="${MIN_LESSON_MINUTES}" max="${MAX_LESSON_MINUTES}" step="1" value="${timerMinutes}" data-timer-duration>
                  <button type="submit" data-timer-set>Set duration</button>
                </div>
                <p class="platform-error platform-timer-error" data-timer-error role="alert" hidden></p>
              </form>
              <div class="platform-timer-controls" aria-label="Teacher Lesson Timer controls">
                <button type="button" data-action="timer-start">Start</button>
                <button type="button" data-action="timer-pause">Pause</button>
                <button type="button" data-action="timer-resume">Resume</button>
                <button type="button" data-action="timer-reset">Reset</button>
                <button type="button" data-action="timer-end">End</button>
              </div>
              <div class="platform-timer-adjustments" aria-label="Teacher Timer Adjustment controls">
                <button type="button" data-action="timer-subtract-minute">Subtract 1 minute</button>
                <button type="button" data-action="timer-add-minute">Add 1 minute</button>
              </div>
            </div>
          </section>
          <section class="platform-command-card platform-command-card-memo">
            <p class="platform-command-label">Class communication</p>
            <h3>Teacher Memo</h3>
            <form class="platform-teacher-memo-form" data-form="teacher-memo" novalidate>
              <label for="teacher-memo">Class-wide message or agenda</label>
              <textarea id="teacher-memo" name="memo" maxlength="${TEACHER_MEMO_MAX_CHARACTERS}" aria-describedby="teacher-memo-guidance teacher-memo-count" data-teacher-memo>${memoText}</textarea>
              <div class="platform-teacher-memo-meta">
                <small id="teacher-memo-guidance">Plain text for the whole class.</small>
                <small id="teacher-memo-count"><span data-teacher-memo-count>${memoState.text.length}</span>/${TEACHER_MEMO_MAX_CHARACTERS}</small>
              </div>
              <div class="platform-teacher-memo-actions">
                <button type="submit">Save Memo</button>
                <button type="button" data-action="clear-teacher-memo"${memoState.text ? "" : " disabled"}>Clear Memo</button>
              </div>
              <p class="platform-error platform-teacher-memo-error" data-teacher-memo-error role="alert" hidden></p>
              <p class="platform-teacher-memo-status" data-teacher-memo-status data-state="${memoState.text ? "saved" : "empty"}" role="status" aria-live="polite">${memoState.text ? "Saved for refresh and Student Display." : "No memo saved yet."}</p>
            </form>
            <div class="platform-teacher-memo-saved">
              <p class="platform-command-label">Current class message</p>
              <p data-teacher-memo-saved>${memoText || "No class message saved."}</p>
            </div>
          </section>
          <section class="platform-command-card platform-student-display-controls" aria-labelledby="student-display-controls-title">
            <p class="platform-command-label">Classroom presentation</p>
            <h3 id="student-display-controls-title">Student Display</h3>
            <p class="platform-student-display-guidance">Choose what students see without clearing the saved memo.</p>
            <div class="platform-student-display-mode-controls" role="group" aria-label="Student Display content">
              <p>Student Display content</p>
              <button type="button" data-action="select-presentation-mode" data-presentation-mode="${STUDENT_DISPLAY_MODES.COMBINED}" aria-pressed="${selectedDisplayMode === STUDENT_DISPLAY_MODES.COMBINED}">Timer + Message</button>
              <button type="button" data-action="select-presentation-mode" data-presentation-mode="${STUDENT_DISPLAY_MODES.MESSAGE}" aria-pressed="${selectedDisplayMode === STUDENT_DISPLAY_MODES.MESSAGE}"${hasMessageContent ? "" : " disabled"}>Message only</button>
              <button type="button" data-action="select-presentation-mode" data-presentation-mode="${STUDENT_DISPLAY_MODES.TIMER}" aria-pressed="${selectedDisplayMode === STUDENT_DISPLAY_MODES.TIMER}">Timer only</button>
            </div>
            <button class="platform-student-display-button" type="button" data-action="open-timer-display">Open Student Display</button>
          </section>
        </div>

        <p class="platform-rhythm-title">Wins • Blockers • Next Steps</p>
        <div class="platform-class-rhythm" aria-label="Wins, Blockers, and Next Steps">
          <section class="platform-rhythm-card platform-rhythm-wins">
            <h3><span aria-hidden="true">🏆</span> Wins</h3>
            <p>Future classroom accomplishments will appear here.</p>
          </section>
          <section class="platform-rhythm-card platform-rhythm-blockers">
            <h3><span aria-hidden="true">🚧</span> Blockers</h3>
            <p>Future classroom challenges will appear here.</p>
          </section>
          <section class="platform-rhythm-card platform-rhythm-next">
            <h3><span aria-hidden="true">➡️</span> Next Steps</h3>
            <p>Future class direction will appear here.</p>
          </section>
        </div>

        <section class="platform-teacher-feed" aria-labelledby="teacher-feed-title">
          <div>
            <p class="platform-command-label">Reserved event area</p>
            <h3 id="teacher-feed-title">Teacher Feed</h3>
          </div>
          <p>Future classroom events will appear here.</p>
        </section>
      </section>
    </div>
    <section id="platform-student-timer-display" class="platform-student-timer-display ${studentDisplayClass}" role="dialog" aria-modal="true" aria-labelledby="${showStudentTimer ? "student-timer-title" : "student-message-title"}" tabindex="-1" hidden>
      <p class="platform-student-display-brand">THINKamigBOB</p>
      <div class="platform-student-engineering-time" data-student-engineering-time${showStudentTimer ? "" : " hidden"}>
        <h2 id="student-timer-title">Today's Engineering Time</h2>
        <output data-timer-remaining>${formatLessonTime(timerState.remainingSeconds)}</output>
      </div>
      <div class="platform-student-memo" data-student-memo${showStudentMemo ? "" : " hidden"}>
        <h3 id="student-message-title">Class Message</h3>
        <p data-student-memo-text>${memoText}</p>
      </div>
      <div class="platform-student-mission" data-student-mission${showStudentMission ? "" : " hidden"}>
        <h3 id="student-mission-title">Today's Mission</h3>
        <h4 data-student-mission-title>${escapeHtml(missionState.title)}</h4>
        <p data-student-mission-focus>${escapeHtml(missionState.focus)}</p>
        <p data-student-mission-builder>Builder: ${builderAvailable ? "Available today" : "Not part of today's mission"}</p>
        <p data-student-mission-workshop>Workshop: ${workshopAvailable ? "Available today" : "Not part of today's mission"}</p>
        <p class="platform-missions-first-reminder">${MISSIONS_FIRST_REMINDER}</p>
      </div>
    </section>
  `, {
    title: "Teacher Command Center",
    eyebrow: "TODAY view",
    subtitle: "Class focus, organization, and readiness at a glance.",
    signedIn: true,
    teacherContext: { teacherName, className, periodLabel },
  });
}

function studentDashboardView(state) {
  const student = getStudentById(state.studentId);
  const classRecord = getClassById(state.classId);
  const studentName = escapeHtml(student?.displayName ?? "Student");
  const className = escapeHtml(classRecord?.displayName ?? "Class not selected");
  return shell(`
    <div class="platform-student-home">
      <section class="platform-student-orientation" aria-labelledby="student-orientation-title">
        <p class="platform-eyebrow">Private student dashboard</p>
        <h2 id="student-orientation-title">${studentName}</h2>
        <p class="platform-student-class">${className}</p>
        <p>Your private place to see what matters and choose what comes next.</p>
      </section>

      <section class="platform-bob-welcome" aria-labelledby="bob-welcome-title">
        <p class="platform-student-section-label">Getting started</p>
        <h2 id="bob-welcome-title">BOB Welcome</h2>
        <p>Welcome, ${studentName}. Your goals and paths will appear here when they are ready. Start by checking Current Goal, then review Choose Your Path.</p>
      </section>

      <section class="platform-student-goal" aria-labelledby="current-goal-title">
        <p class="platform-student-section-label">Today</p>
        <h2 id="current-goal-title">Current Goal</h2>
        <p class="platform-student-empty-state">No current goal is available yet.</p>
        <p>A classroom goal will appear when an approved goal source is connected.</p>
      </section>

      <section class="platform-school-start-launcher" aria-labelledby="school-start-launcher-title">
        <p class="platform-student-section-label">Start here</p>
        <h2 id="school-start-launcher-title">Classroom Launches</h2>
        <div class="platform-school-start-launch-grid">
          <a class="platform-school-start-launch-link platform-school-start-launch-link-missions" href="https://sites.google.com/ravennaschools.us/steminbobwarts/home-start" target="_blank" rel="noopener noreferrer">GO TO MY STEM MISSIONS</a>
          <a class="platform-school-start-launch-link platform-school-start-launch-link-builder" href="../index.html" target="_blank" rel="noopener noreferrer">STEM BUILDER</a>
          <a class="platform-school-start-launch-link platform-school-start-launch-link-workshop" href="http://192.168.1.252:8000" target="_blank" rel="noopener noreferrer">STEM WORKSHOP</a>
        </div>
      </section>

      <section class="platform-yesterday" aria-labelledby="yesterday-title">
        <div class="platform-student-section-heading">
          <p class="platform-student-section-label">Looking back</p>
          <h2 id="yesterday-title">Yesterday</h2>
        </div>
        <div class="platform-yesterday-grid">
          <article class="platform-student-home-card platform-student-win" aria-labelledby="yesterday-wins-title">
            <h3 id="yesterday-wins-title">Yesterday's Wins</h3>
            <p class="platform-student-empty-state">No verified Win is available yet.</p>
            <p>Only verified activity will appear here in a future approved build.</p>
          </article>
          <article class="platform-student-home-card platform-student-challenge" aria-labelledby="yesterday-challenge-title">
            <h3 id="yesterday-challenge-title">Yesterday's Challenge</h3>
            <p class="platform-student-empty-state">No Challenge is available yet.</p>
            <p>Private, approved work reminders may appear here in a future build.</p>
          </article>
        </div>
      </section>

      <section class="platform-student-reflection" aria-labelledby="reflection-check-title">
        <p class="platform-student-section-label">Reflection</p>
        <h2 id="reflection-check-title">What I Learned Today</h2>
        <p class="platform-student-status">Check unavailable.</p>
        <p>Submission status is not connected in PB-003A.</p>
      </section>

      <section class="platform-student-paths" aria-labelledby="choose-path-title">
        <div class="platform-student-section-heading">
          <p class="platform-student-section-label">Next actions</p>
          <h2 id="choose-path-title">Choose Your Path</h2>
          <p><strong>Continue</strong> returns to work already started. <strong>Start</strong> begins a mission made available to you. Mission availability is not connected in PB-003B.</p>
        </div>
        <div class="platform-mission-choice-layout">
          <section class="platform-mission-choice-section platform-mission-choice-continue" aria-labelledby="mission-continue-title">
            <p class="platform-mission-choice-label">Continue first</p>
            <h3 id="mission-continue-title">Continue</h3>
            <p class="platform-student-empty-state">No mission is ready to continue yet.</p>
            <p>Existing mission work will appear here when an approved current-work source is connected.</p>
          </section>
          <section class="platform-mission-choice-section platform-mission-choice-available" aria-labelledby="available-missions-title">
            <p class="platform-mission-choice-label">Start something available</p>
            <h3 id="available-missions-title">Available Missions</h3>
            <div class="platform-mission-card-container" aria-labelledby="available-missions-title">
              <p class="platform-student-empty-state">No new missions are available right now.</p>
              <p>Teacher-authorized missions will appear when an approved assignment source is connected.</p>
            </div>
          </section>
          <section class="platform-mission-choice-section platform-mission-choice-side-paths" aria-labelledby="side-paths-title">
            <p class="platform-mission-choice-label">Coming Later</p>
            <h3 id="side-paths-title">Side Paths</h3>
            <p class="platform-student-empty-state">Optional Side Paths are not available yet.</p>
            <p>Side Paths will be optional ways to explore a related idea in a future approved build.</p>
          </section>
        </div>
      </section>

      <section class="platform-stem-work" aria-labelledby="stem-work-title">
        <div class="platform-student-section-heading">
          <p class="platform-student-section-label">Your engineering journey</p>
          <h2 id="stem-work-title">My STEM Work</h2>
          <p>Engineering work grows through ideas, plans, builds, tests, revisions, and explanations. Current, Recent, and Previous organize one journey without judging the work. Project and evidence information is not connected in PB-003C.</p>
        </div>
        <div class="platform-stem-work-layout">
          <section class="platform-stem-work-section platform-stem-work-current" aria-labelledby="current-work-title">
            <p class="platform-stem-work-label">Continue Current Work</p>
            <h3 id="current-work-title">Current Work</h3>
            <div class="platform-project-card-container" aria-labelledby="current-work-title">
              <p class="platform-student-empty-state">You do not have current work to continue yet.</p>
              <p>When a project is ready, you can return to it here.</p>
            </div>
          </section>
          <section class="platform-stem-work-section platform-stem-work-future-path" aria-labelledby="future-path-title">
            <p class="platform-stem-work-label">Your next choice</p>
            <h3 id="future-path-title">Choose a Future Path</h3>
            <p class="platform-student-empty-state">Available mission choices will appear in Mission Choice.</p>
          </section>
          <section class="platform-stem-work-history" aria-labelledby="work-history-title">
            <div class="platform-stem-work-history-heading">
              <p class="platform-stem-work-label">Your engineering journey</p>
              <h3 id="work-history-title">Look Back at Your Work</h3>
            </div>
            <div class="platform-stem-work-history-layout">
              <section class="platform-stem-work-section platform-stem-work-recent" aria-labelledby="recent-work-title">
                <p class="platform-stem-work-label">Recently active</p>
                <h4 id="recent-work-title">Recent Work</h4>
                <div class="platform-project-card-container" aria-labelledby="recent-work-title">
                  <p class="platform-student-empty-state">Your recent engineering work will appear here when it is available.</p>
                </div>
              </section>
              <section class="platform-stem-work-section platform-stem-work-previous" aria-labelledby="previous-work-title">
                <p class="platform-stem-work-label">Earlier projects</p>
                <h4 id="previous-work-title">Previous Work</h4>
                <div class="platform-project-card-container" aria-labelledby="previous-work-title">
                  <p class="platform-student-empty-state">Your earlier engineering work will appear here when it is available.</p>
                </div>
              </section>
            </div>
          </section>
          <section class="platform-stem-work-section platform-evidence-connections" aria-labelledby="evidence-connections-title">
            <p class="platform-stem-work-label">Project evidence</p>
            <h3 id="evidence-connections-title">Evidence Connections</h3>
            <p class="platform-student-empty-state">Evidence cannot be checked right now.</p>
            <p>Evidence may eventually show that engineering work exists or changed. It is not automatically reflection, proof of learning, a grade, teacher-reviewed, public, or complete.</p>
            <ul class="platform-evidence-source-list" aria-label="Future evidence sources">
              <li><span>Builder</span><strong>Coming Later</strong></li>
              <li><span>Workshop</span><strong>Coming Later</strong></li>
              <li><span>Google Slides</span><strong>Coming Later</strong></li>
              <li><span>Google Vids</span><strong>Coming Later</strong></li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  `, { title: "Student Home", eyebrow: "Student Dashboard", signedIn: true });
}

function viewForRoute(route, state) {
  switch (route) {
    case ROUTES.TEACHER_LOGIN: return teacherLoginView();
    case ROUTES.TEACHER_CREATE: return teacherCreateView();
    case ROUTES.TEACHER_RECOVERY: return teacherRecoveryView();
    case ROUTES.TEACHER_DASHBOARD: return teacherDashboardView(state);
    case ROUTES.STUDENT_ENTRY: return studentEntryView();
    case ROUTES.STUDENT_ROSTER: return studentRosterView(state);
    case ROUTES.STUDENT_IDENTIFIER: return studentIdentifierView(state);
    case ROUTES.STUDENT_DASHBOARD: return studentDashboardView(state);
    default: return welcomeView();
  }
}

function showFormError(form, message) {
  const error = form.querySelector("[data-error]");
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
  error.focus?.();
}

function syncLessonTimerPresentation() {
  const state = lessonTimer.read();
  document.querySelectorAll("[data-timer-remaining]").forEach((element) => {
    element.textContent = formatLessonTime(state.remainingSeconds);
  });
  document.querySelectorAll("[data-timer-state]").forEach((element) => {
    element.textContent = state.status;
  });

  const controlRules = {
    "timer-start": state.status === LESSON_TIMER_STATES.READY,
    "timer-pause": state.status === LESSON_TIMER_STATES.RUNNING,
    "timer-resume": state.status === LESSON_TIMER_STATES.PAUSED,
    "timer-reset": state.status !== LESSON_TIMER_STATES.READY,
    "timer-end": state.status === LESSON_TIMER_STATES.RUNNING || state.status === LESSON_TIMER_STATES.PAUSED,
    "timer-subtract-minute": state.status === LESSON_TIMER_STATES.RUNNING || state.status === LESSON_TIMER_STATES.PAUSED,
    "timer-add-minute": (state.status === LESSON_TIMER_STATES.RUNNING || state.status === LESSON_TIMER_STATES.PAUSED) &&
      state.remainingSeconds <= MAX_LESSON_MINUTES * 60 - 60,
  };
  Object.entries(controlRules).forEach(([action, enabled]) => {
    const button = document.querySelector(`[data-action="${action}"]`);
    if (button) button.disabled = !enabled;
  });

  const durationInput = document.querySelector("[data-timer-duration]");
  const durationButton = document.querySelector("[data-timer-set]");
  const durationLocked = state.status === LESSON_TIMER_STATES.RUNNING || state.status === LESSON_TIMER_STATES.PAUSED;
  if (durationInput) durationInput.disabled = durationLocked;
  if (durationButton) durationButton.disabled = durationLocked;
}

function syncTeacherMemoPresentation() {
  const state = teacherMemo.read();
  const field = document.querySelector("[data-teacher-memo]");
  const count = document.querySelector("[data-teacher-memo-count]");
  const clearButton = document.querySelector('[data-action="clear-teacher-memo"]');
  const saved = document.querySelector("[data-teacher-memo-saved]");
  const studentMemoText = document.querySelector("[data-student-memo-text]");
  if (field) field.value = state.text;
  if (count) count.textContent = String(state.text.length);
  if (clearButton) clearButton.disabled = !state.text;
  if (saved) saved.textContent = state.text || "No class message saved.";
  if (studentMemoText) studentMemoText.textContent = state.text;
  syncStudentDisplayPresentation();
}

function missionAvailabilityText(value) {
  return value === TODAYS_MISSION_AVAILABILITY.AVAILABLE
    ? "Available today"
    : "Not part of today's mission";
}

function missionFocusValue(form) {
  const choice = form.elements.focusChoice?.value ?? "";
  return choice === CUSTOM_MISSION_FOCUS ? (form.elements.focus?.value ?? "") : choice;
}

function syncMissionFocusChoice(form) {
  const choice = form.elements.focusChoice?.value ?? "";
  const custom = form.querySelector("[data-mission-custom-focus]");
  if (custom) custom.hidden = choice !== CUSTOM_MISSION_FOCUS;
}

function syncTodaysMissionPresentation() {
  const state = todaysMission.read();
  const hasMission = Boolean(state.title);
  const clearButton = document.querySelector('[data-action="clear-todays-mission"]');
  const saved = document.querySelector("[data-todays-mission-saved]");
  const values = {
    "[data-todays-mission-saved-title]": state.title,
    "[data-todays-mission-saved-focus]": state.focus,
    "[data-todays-mission-saved-builder]": `Builder: ${missionAvailabilityText(state.builder)}`,
    "[data-todays-mission-saved-workshop]": `Workshop: ${missionAvailabilityText(state.workshop)}`,
    "[data-student-mission-title]": state.title,
    "[data-student-mission-focus]": state.focus,
    "[data-student-mission-builder]": `Builder: ${missionAvailabilityText(state.builder)}`,
    "[data-student-mission-workshop]": `Workshop: ${missionAvailabilityText(state.workshop)}`,
  };
  if (clearButton) clearButton.disabled = !hasMission;
  if (saved) saved.hidden = !hasMission;
  Object.entries(values).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = hasMission ? text : "";
  });
  syncStudentDisplayPresentation();
}

function syncStudentDisplayPresentation() {
  const hasMemo = Boolean(teacherMemo.read().text);
  const hasMission = Boolean(todaysMission.read().title);
  const hasMessageContent = hasMemo || hasMission;
  const selectedMode = studentDisplayMode.read({ hasMemo: hasMessageContent });
  const showTimer = selectedMode !== STUDENT_DISPLAY_MODES.MESSAGE;
  const showMemo = hasMemo && selectedMode !== STUDENT_DISPLAY_MODES.TIMER;
  const showMission = hasMission && selectedMode !== STUDENT_DISPLAY_MODES.TIMER;
  const showMessage = showMemo || showMission;
  const display = document.querySelector("#platform-student-timer-display");
  const timer = document.querySelector("[data-student-engineering-time]");
  const memo = document.querySelector("[data-student-memo]");
  const mission = document.querySelector("[data-student-mission]");
  if (timer) timer.hidden = !showTimer;
  if (memo) memo.hidden = !showMemo;
  if (mission) mission.hidden = !showMission;
  if (display) {
    display.classList.toggle("platform-student-display-combined", showTimer && showMessage);
    display.classList.toggle("platform-student-display-message-only", !showTimer && showMessage);
    display.classList.toggle("platform-student-display-timer-only", showTimer && !showMessage);
    display.setAttribute("aria-labelledby", showTimer
      ? "student-timer-title"
      : showMission ? "student-mission-title" : "student-message-title");
  }
  document.querySelectorAll("[data-presentation-mode]").forEach((control) => {
    control.setAttribute("aria-pressed", String(control.dataset.presentationMode === selectedMode));
    if (control.dataset.presentationMode === STUDENT_DISPLAY_MODES.MESSAGE) {
      control.disabled = !hasMessageContent;
    }
  });
}

function manageLessonTimerPresentation(route) {
  if (lessonTimerPresentationInterval !== null) {
    window.clearInterval(lessonTimerPresentationInterval);
    lessonTimerPresentationInterval = null;
  }
  if (route !== ROUTES.TEACHER_DASHBOARD) return;
  syncLessonTimerPresentation();
  lessonTimerPresentationInterval = window.setInterval(syncLessonTimerPresentation, 250);
}

function restoreLessonTimerDisplay(route, state) {
  const isAuthorizedTeacherDashboard = route === ROUTES.TEACHER_DASHBOARD
    && state.role === PLATFORM_ROLES.TEACHER;
  if (!isAuthorizedTeacherDashboard) {
    if (state.role !== PLATFORM_ROLES.TEACHER) storeLessonTimerDisplayOpen(false);
    return false;
  }
  if (!lessonTimerDisplayIsStoredOpen()) return false;
  const display = document.querySelector("#platform-student-timer-display");
  if (!display) return false;
  display.hidden = false;
  return true;
}

function handleSubmit(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = new FormData(form);

  if (form.dataset.form === "teacher-login") {
    const teacher = validateTeacherCredentials(data.get("email"), data.get("password"));
    if (!teacher) return showFormError(form, "The email or password is not valid for this development preview.");
    session.signInTeacher(teacher.id);
    return navigate(ROUTES.TEACHER_DASHBOARD);
  }

  if (form.dataset.form === "student-entry") {
    const classCode = String(data.get("classCode") ?? "").trim();
    if (!classCode) return showFormError(form, "Enter your class code to continue.");
    const classRecord = findClassByCode(classCode);
    if (!classRecord) return showFormError(form, "That class code could not be found. Check the code and try again.");
    session.beginStudentEntry(classRecord.id);
    return navigate(ROUTES.STUDENT_ROSTER);
  }

  if (form.dataset.form === "student-identifier") {
    const state = session.read();
    const identifier = String(data.get("identifier") ?? "").trim();
    if (!identifier) return showFormError(form, "Enter your private identifier to continue.");
    const student = validateStudentIdentifier(state.pendingClassId, state.pendingStudentId, identifier);
    if (!student) return showFormError(form, "That private identifier is not valid. Check it and try again.");
    session.signInStudent(state.pendingClassId, student.id);
    return navigate(ROUTES.STUDENT_DASHBOARD);
  }

  if (form.dataset.form === "lesson-timer-duration") {
    const result = lessonTimer.setDuration(data.get("duration"));
    const error = form.querySelector("[data-timer-error]");
    if (!result.ok) {
      if (error) {
        error.textContent = `Enter a whole number from ${MIN_LESSON_MINUTES} to ${MAX_LESSON_MINUTES} minutes.`;
        error.hidden = false;
      }
      return;
    }
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    syncLessonTimerPresentation();
  }

  if (form.dataset.form === "teacher-memo") {
    const result = teacherMemo.save(data.get("memo"));
    const error = form.querySelector("[data-teacher-memo-error]");
    const status = form.querySelector("[data-teacher-memo-status]");
    if (!result.ok) {
      if (status) status.textContent = "";
      if (error) {
        error.textContent = result.reason === "too-long"
          ? `Keep the class message to ${TEACHER_MEMO_MAX_CHARACTERS} characters or fewer.`
          : "Enter a class message before saving.";
        error.hidden = false;
      }
      return;
    }
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    syncTeacherMemoPresentation();
    if (status) {
      status.dataset.state = "saved";
      status.textContent = "Saved for refresh and Student Display.";
    }
  }

  if (form.dataset.form === "todays-mission") {
    const result = todaysMission.save({
      title: data.get("title"),
      focus: missionFocusValue(form),
      builder: data.get("builder"),
      workshop: data.get("workshop"),
    });
    const error = form.querySelector("[data-todays-mission-error]");
    const status = form.querySelector("[data-todays-mission-status]");
    const messages = {
      "missing-title": "Enter a mission title before saving.",
      "title-too-long": "Keep the mission title to 80 characters or fewer.",
      "missing-focus": "Enter a short classroom focus before saving.",
      "focus-too-long": "Keep the classroom focus to 180 characters or fewer.",
      "missing-builder": "Choose whether Builder is part of today's mission.",
      "missing-workshop": "Choose whether Workshop is part of today's mission.",
    };
    if (!result.ok) {
      if (status) status.textContent = "";
      if (error) {
        error.textContent = messages[result.reason] ?? "Today's Mission could not be saved.";
        error.hidden = false;
      }
      return;
    }
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    syncTodaysMissionPresentation();
    if (status) {
      status.dataset.state = "saved";
      status.textContent = "Today's Mission saved for refresh and Student Display.";
    }
  }
}

function handleClick(event) {
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "sign-out") {
    storeLessonTimerDisplayOpen(false);
    lessonTimer.clear();
    session.signOut();
    teacherMemo.clear();
    todaysMission.clear();
    studentDisplayMode.clear();
    navigate(ROUTES.WELCOME, { replace: true });
  }
  if (action.dataset.action === "reserved-nav") {
    const status = document.querySelector("#teacher-nav-status");
    if (status) status.textContent = `${action.dataset.label}: Coming in future build.`;
  }
  if (action.dataset.action === "select-student") {
    const state = session.read();
    const student = getStudentById(action.dataset.studentId);
    if (!student || student.classId !== state.pendingClassId) return navigate(ROUTES.STUDENT_ENTRY, { replace: true });
    session.selectStudent(student.id);
    navigate(ROUTES.STUDENT_IDENTIFIER);
  }
  const timerActions = {
    "timer-start": () => lessonTimer.start(),
    "timer-pause": () => lessonTimer.pause(),
    "timer-resume": () => lessonTimer.resume(),
    "timer-reset": () => lessonTimer.reset(),
    "timer-end": () => lessonTimer.end(),
    "timer-subtract-minute": () => lessonTimer.subtractMinute(),
    "timer-add-minute": () => lessonTimer.addMinute(),
  };
  if (timerActions[action.dataset.action]) {
    timerActions[action.dataset.action]();
    syncLessonTimerPresentation();
  }
  if (action.dataset.action === "clear-teacher-memo") {
    teacherMemo.clear();
    syncTeacherMemoPresentation();
    const error = document.querySelector("[data-teacher-memo-error]");
    const status = document.querySelector("[data-teacher-memo-status]");
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    if (status) {
      status.dataset.state = "empty";
      status.textContent = "Memo cleared. No memo is currently saved.";
    }
  }
  if (action.dataset.action === "clear-todays-mission") {
    const confirmation = document.querySelector("[data-todays-mission-confirmation]");
    if (confirmation && confirmation.hidden) {
      confirmation.hidden = false;
      confirmation.querySelector('[data-action="keep-todays-mission"]')?.focus();
    }
  }
  if (action.dataset.action === "keep-todays-mission") {
    closeTodaysMissionClearConfirmation();
  }
  if (action.dataset.action === "confirm-clear-todays-mission") {
    if (action.disabled) return;
    action.disabled = true;
    todaysMission.clear();
    syncTodaysMissionPresentation();
    const form = document.querySelector('[data-form="todays-mission"]');
    if (form) {
      form.elements.title.value = "";
      form.elements.focusChoice.value = "";
      form.elements.focus.value = "";
      syncMissionFocusChoice(form);
      form.querySelectorAll('input[type="radio"]').forEach((control) => {
        control.checked = false;
      });
    }
    const titleCount = document.querySelector("[data-todays-mission-title-count]");
    const focusCount = document.querySelector("[data-todays-mission-focus-count]");
    const error = document.querySelector("[data-todays-mission-error]");
    const status = document.querySelector("[data-todays-mission-status]");
    if (titleCount) titleCount.textContent = "0";
    if (focusCount) focusCount.textContent = "0";
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    if (status) {
      status.dataset.state = "empty";
      status.textContent = "Today's Mission cleared. No mission announcement is currently saved.";
    }
    closeTodaysMissionClearConfirmation({ restoreFocus: false });
  }
  if (action.dataset.action === "select-presentation-mode") {
    const hasMessageContent = Boolean(teacherMemo.read().text || todaysMission.read().title);
    const result = studentDisplayMode.select(action.dataset.presentationMode, { hasMemo: hasMessageContent });
    if (result.ok) syncStudentDisplayPresentation();
  }
  if (action.dataset.action === "open-timer-display") {
    const display = document.querySelector("#platform-student-timer-display");
    if (display) {
      lessonTimerDisplayTrigger = action;
      storeLessonTimerDisplayOpen(true);
      display.hidden = false;
      display.focus();
    }
  }
}

function render() {
  const requestedRoute = currentRoute();
  if (!knownRoutes.has(requestedRoute)) return navigate(ROUTES.WELCOME, { replace: true });
  const state = session.read();
  const allowedRoute = guardRoute(requestedRoute, state);
  if (allowedRoute !== requestedRoute) return navigate(allowedRoute, { replace: true });
  root.innerHTML = viewForRoute(allowedRoute, state);
  manageLessonTimerPresentation(allowedRoute);
  const studentDisplayRestored = restoreLessonTimerDisplay(allowedRoute, state);
  window.requestAnimationFrame(() => {
    if (studentDisplayRestored) {
      document.querySelector("#platform-student-timer-display")?.focus({ preventScroll: true });
    } else {
      document.querySelector("#platform-main")?.focus({ preventScroll: true });
    }
  });
}

root.addEventListener("submit", handleSubmit);
root.addEventListener("click", handleClick);
function closeTodaysMissionClearConfirmation({ restoreFocus = true } = {}) {
  const confirmation = document.querySelector("[data-todays-mission-confirmation]");
  if (!confirmation || confirmation.hidden) return;
  confirmation.hidden = true;
  const confirmButton = confirmation.querySelector('[data-action="confirm-clear-todays-mission"]');
  if (confirmButton) confirmButton.disabled = false;
  if (restoreFocus) document.querySelector('[data-action="clear-todays-mission"]')?.focus();
}

function handleTodaysMissionEdit(event) {
  const missionForm = event.target.closest('[data-form="todays-mission"]');
  if (missionForm) {
    syncMissionFocusChoice(missionForm);
    const title = missionForm.elements.title?.value ?? "";
    const focus = missionFocusValue(missionForm);
    const builder = new FormData(missionForm).get("builder") ?? "";
    const workshop = new FormData(missionForm).get("workshop") ?? "";
    const saved = todaysMission.read();
    const titleCount = missionForm.querySelector("[data-todays-mission-title-count]");
    const focusCount = missionForm.querySelector("[data-todays-mission-focus-count]");
    const error = missionForm.querySelector("[data-todays-mission-error]");
    const status = missionForm.querySelector("[data-todays-mission-status]");
    if (titleCount) titleCount.textContent = String(title.length);
    if (focusCount) focusCount.textContent = String(focus.length);
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    if (status) {
      const hasUnsavedChanges = title.trim() !== saved.title || focus.trim() !== saved.focus ||
        builder !== saved.builder || workshop !== saved.workshop;
      status.dataset.state = hasUnsavedChanges ? "unsaved" : (saved.title ? "saved" : "empty");
      status.textContent = hasUnsavedChanges
        ? "Unsaved changes. Save before refreshing or opening Student Display."
        : (saved.title
            ? "Today's Mission saved for refresh and Student Display."
            : "No Today's Mission has been prepared for this browser session.");
    }
    return true;
  }
  return false;
}

root.addEventListener("change", (event) => {
  handleTodaysMissionEdit(event);
});

root.addEventListener("input", (event) => {
  if (handleTodaysMissionEdit(event)) return;
  const field = event.target.closest("[data-teacher-memo]");
  if (!field) return;
  const count = document.querySelector("[data-teacher-memo-count]");
  const error = document.querySelector("[data-teacher-memo-error]");
  const status = document.querySelector("[data-teacher-memo-status]");
  if (count) count.textContent = String(field.value.length);
  if (error) {
    error.textContent = "";
    error.hidden = true;
  }
  if (status) {
    const savedText = teacherMemo.read().text;
    const hasUnsavedChanges = field.value.trim() !== savedText;
    status.dataset.state = hasUnsavedChanges ? "unsaved" : (savedText ? "saved" : "empty");
    status.textContent = hasUnsavedChanges
      ? "Unsaved changes. Save before refreshing or opening Student Display."
      : (savedText ? "Saved for refresh and Student Display." : "No memo saved yet.");
  }
});
window.addEventListener("hashchange", render);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const missionConfirmation = document.querySelector("[data-todays-mission-confirmation]:not([hidden])");
  if (missionConfirmation) {
    event.preventDefault();
    closeTodaysMissionClearConfirmation();
    return;
  }
  const display = document.querySelector("#platform-student-timer-display:not([hidden])");
  if (!display) return;
  storeLessonTimerDisplayOpen(false);
  display.hidden = true;
  const focusTarget = lessonTimerDisplayTrigger?.isConnected
    ? lessonTimerDisplayTrigger
    : document.querySelector('[data-action="open-timer-display"]');
  lessonTimerDisplayTrigger = null;
  focusTarget?.focus();
});
render();
