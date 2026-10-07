# PB-002I — Teacher Command Center Today’s Mission — Classroom Pilot Build Specification v1.0

**Document Status:** Approved specification authority; inspection reconciliation pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Official Build Identifier:** PB-002I  
**Reconciliation Status:** Reconciled with the approved pre-implementation repository inspection  
**Parent System:** PB-002 — Teacher Command Center  
**Protected Baseline:** PB-001; PB-002A through PB-002E; PB-002H-FIX-01; PB-003; Builder; Workshop

## Purpose

Define the smallest classroom-pilot implementation that replaces the existing static Today’s Mission placeholder with one teacher-controlled, class-wide presentation announcement.

The announcement helps the teacher communicate:

- a mission title;
- a short classroom focus;
- whether Builder is available for the current class period;
- whether Workshop is available for the current class period; and
- the permanent classroom reminder: **“Missions First! Read your directions before opening Builder or Workshop.”**

This feature is classroom communication only. It is not an authoritative mission record, mission assignment, access-control system, or Mission Distribution implementation.

## Build Objective

Allow the signed-in teacher to prepare, save, update, present, and clear one bounded Today’s Mission announcement for the current browser session without introducing cloud persistence, student-specific state, analytics, automation, or integration with Builder, Workshop, Google Sites, or other external systems.

The saved announcement must be readable on the Teacher Command Center and may be shown read-only through the existing Student Display relationship defined in this specification.

## Classroom-Pilot Meaning

For this build, “Today’s Mission” means a teacher-authored classroom presentation announcement.

It does not establish or change:

- mission identity or version;
- mission ownership;
- student eligibility or assignment;
- class membership;
- current Goal ownership;
- Activity Library assignment;
- Builder or Workshop authorization;
- evidence or reflection state; or
- any authoritative Platform, Google, Builder, or Workshop record.

The teacher remains responsible for ensuring that the announcement matches the classroom directions and destinations already approved for use.

## Included Scope

### Today’s Mission Editor

Replace only the existing static content inside the Today’s Mission card.

Provide:

- one visible Mission title field;
- one visible Short classroom focus field;
- one teacher-controlled Builder availability choice;
- one teacher-controlled Workshop availability choice;
- the fixed Missions First reminder;
- Save Today’s Mission;
- Update through the same fields and Save action;
- Clear Today’s Mission;
- visible saved, unsaved, empty, validation, and clear status; and
- a read-only summary of the currently saved announcement.

The editor must remain available only on the protected Teacher Dashboard route.

### Field Boundaries

#### Mission Title

The title must:

- be plain text;
- be required before Save;
- be trimmed before saving;
- preserve safe internal spaces;
- contain no more than 80 characters; and
- render as text rather than executable markup.

#### Short Classroom Focus

The focus must:

- be plain text;
- be required before Save;
- be trimmed before saving;
- preserve intentional internal spaces and line breaks;
- contain no more than 180 characters; and
- render as text rather than executable markup.

Do not support rich text, HTML, Markdown rendering, attachments, embedded media, link previews, or executable content.

### Builder and Workshop Availability

The teacher may communicate one class-wide availability value for Builder and one for Workshop.

Each value is limited to:

- Available today; or
- Not part of today’s mission.

No Builder or Workshop availability option is preselected for a new announcement. The teacher must explicitly choose one value for Builder and one value for Workshop before Save can succeed.

After a saved announcement is restored following refresh, its saved Builder and Workshop choices may repopulate the corresponding controls. Restoration must not create or infer a choice that is absent from valid saved state.

These values are instructional communication only.

They must not:

- hide, disable, add, remove, or reroute Student Dashboard launcher controls;
- grant or revoke technical access;
- change authentication or authorization;
- open Builder or Workshop from the Teacher Command Center;
- alter Builder or Workshop behavior;
- create a mission or activity assignment; or
- imply that the Platform enforces the teacher’s instruction.

The interface must not use language such as “locked,” “blocked,” “permission granted,” or “access denied.”

### Missions First Reminder

The following reminder is fixed product copy and is not teacher-editable:

> Missions First! Read your directions before opening Builder or Workshop.

The reminder must appear:

- in the Today’s Mission card while editing or reviewing the announcement; and
- whenever the saved announcement is presented on Student Display.

The reminder creates no route, enforcement, tracking, or automatic workflow.

### Save and Update Behavior

Save Today’s Mission validates and stores the current announcement.

- Saving when no announcement exists creates the current announcement.
- Saving when one exists replaces it atomically.
- Only one announcement may exist at a time.
- A failed Save leaves the previously saved announcement unchanged.
- Save fails when either Builder or Workshop availability has not been explicitly selected.
- A missing availability choice must not replace, partially update, or clear the previously saved announcement.
- Saved content updates the Teacher Command Center immediately.
- Saved content must be the only Today’s Mission content eligible for Student Display.
- Unsaved edits must never appear on Student Display.

Save must not create history, versions, events, notifications, analytics, Teacher Feed entries, assignments, or synchronization.

### Clear Behavior

Clear Today’s Mission removes the saved announcement from the bounded session record.

- Clear must be unavailable when no saved announcement exists.
- Clearing must return the card to an honest empty state.
- Clearing must remove the announcement from Student Display immediately.
- Clear must not affect Teacher Memo, Lesson Timer, presentation mode, Student Display open state, routes, or authentication.
- Clear must not create delete history, recovery state, undo, or an archive.

For this browser-session-only pilot, Clear does not require a confirmation step. This matches the currently implemented Teacher Memo clear pattern and does not implement PB-002G confirmation work.

Clear must act only after direct activation of the explicitly labeled **Clear Today’s Mission** control. It must immediately provide the cleared status specified below. This decision does not establish the confirmation rule for production persistence or future recoverable records.

## Honest Empty and Unsaved States

When no announcement is saved, the card must clearly state that Today’s Mission has not been prepared for this browser session.

It must not fabricate:

- a mission title;
- a classroom focus;
- tool availability;
- a Goal;
- an activity; or
- student progress.

When the fields differ from the saved announcement, the card must identify them as unsaved. Opening Student Display must not silently publish unsaved edits.

### Final Interface Copy

The PB-002I classroom-pilot implementation must use the following teacher-facing copy:

- Card label: **Class focus**
- Card heading: **Today’s Mission**
- Title field label: **Mission title**
- Focus field label: **Short classroom focus**
- Builder choice label: **Builder today**
- Workshop choice label: **Workshop today**
- Availability choices: **Available today** and **Not part of today’s mission**
- Primary action: **Save Today’s Mission**
- Clear action: **Clear Today’s Mission**
- Empty state: **No Today’s Mission has been prepared for this browser session.**
- Saved status: **Today’s Mission saved for refresh and Student Display.**
- Unsaved status: **Unsaved changes. Save before refreshing or opening Student Display.**
- Cleared status: **Today’s Mission cleared. No mission announcement is currently saved.**
- Missing-title error: **Enter a mission title before saving.**
- Missing-focus error: **Enter a short classroom focus before saving.**
- Title-length error: **Keep the mission title to 80 characters or fewer.**
- Focus-length error: **Keep the classroom focus to 180 characters or fewer.**
- Missing-Builder-choice error: **Choose whether Builder is part of today’s mission.**
- Missing-Workshop-choice error: **Choose whether Workshop is part of today’s mission.**
- Saved availability summary: **Builder: Available today**, **Builder: Not part of today’s mission**, **Workshop: Available today**, or **Workshop: Not part of today’s mission**, according to the saved choices.

The fixed Missions First reminder remains exactly as specified and is not included in editable input.

## Student Display Relationship

### Presentation Boundary

Student Display may present the saved announcement as read-only classroom content.

The presentation may contain only:

- Mission title;
- Short classroom focus;
- Builder availability wording;
- Workshop availability wording; and
- the fixed Missions First reminder.

Student Display must not expose:

- editor fields;
- Save or Clear controls;
- validation or character counts;
- storage details;
- teacher-only controls;
- authoritative assignment language; or
- student-specific content.

### Presentation-Mode Contract

This specification does not add or authorize a fourth Student Display mode.

When a Today’s Mission announcement is saved:

- Message only presents the saved Today’s Mission and, when present, the independently saved Teacher Memo;
- Timer + Message presents the Timer, the saved Today’s Mission, and, when present, the independently saved Teacher Memo; and
- Timer only does not present Today’s Mission or Teacher Memo content.

When no Today’s Mission announcement is saved, no empty Today’s Mission panel appears on Student Display. The existing mode selector, its three choices, and its owner remain unchanged.

For mode availability, application code must derive one message-content condition from either saved source:

- message-bearing content exists when a saved Today’s Mission or a saved Teacher Memo exists;
- Message only is enabled when message-bearing content exists;
- clearing Today’s Mission while a Teacher Memo remains must preserve the selected message-bearing mode;
- clearing Teacher Memo while Today’s Mission remains must preserve the selected message-bearing mode; and
- when neither source remains, the existing mode owner must normalize Message only to Timer only through its current safe behavior.

The `student-display-mode.mjs` owner, its three stored values, and its storage record must not change. PB-002I may pass the derived message-content condition through the existing owner API without moving content into the mode record.

Adding a new presentation mode requires a separate explicit design decision and test reconciliation.

### Protected Student Display Behavior

The implementation must preserve:

- existing Timer-only, Message-only, and Timer + Message ownership;
- existing Teacher Memo content and lifecycle;
- the currently implemented control-free Student Display presentation;
- the currently implemented Escape close behavior;
- deterministic focus return;
- refresh restoration; and
- sign-out cleanup.

Today’s Mission must not replace Teacher Memo or change the meaning of Class Message.

PB-002G visible-dismissal, native-dialog, and modal focus-containment work is not part of this build. Today’s Mission must remain compatible with that separately governed future work without implementing it, requiring it, or representing it as part of the current PB-002E baseline.

## Session and Data Rules

Use one dedicated, versioned, Today’s Mission-namespaced `sessionStorage` record.

The record may contain only:

- schema version;
- mission title;
- short classroom focus;
- Builder availability value; and
- Workshop availability value.

The state is:

- class-wide within the current signed-in teacher browser session;
- teacher-controlled;
- restored after refresh;
- replaced atomically on successful Save; and
- cleared on teacher sign-out.

Invalid, malformed, oversized, incompatible, incomplete, or unrecognized stored state must fail closed to the honest empty state.

Do not store:

- teacher or student identifiers in the announcement record;
- class rosters;
- mission IDs, Goal IDs, activity IDs, or versions;
- timestamps, history, analytics, or audit events;
- grades, evidence, reflection, or progress;
- external URLs;
- Builder or Workshop state; or
- Teacher Memo or Timer state.

Do not add `localStorage`, IndexedDB, cookies, a backend, database, Cloudflare storage, Google storage, network requests, or cross-device synchronization.

## Architecture Requirements

The implementation must:

- use the existing PB-001 teacher role and protected Teacher Dashboard route;
- modify only the existing Today’s Mission card presentation;
- keep announcement state isolated from Teacher Memo, Timer, and Student Display mode ownership;
- use existing escaping and safe text-rendering practices;
- preserve existing hash routing;
- use namespaced Platform CSS and JavaScript;
- add no framework or external dependency;
- create no new route, fixture, provider, API, adapter, or synchronization mechanism; and
- stop if implementation requires authoritative mission, class-assignment, or external-resource data.

A small isolated state module is permitted and preferred over embedding storage logic in the view.

## Authorized Future Implementation Surface

Subject to separate approval, application changes must be limited to:

- `platform/scripts/platform-app.mjs`;
- `platform/styles/platform.css`; and
- `platform/scripts/todays-mission.mjs`.

Testing changes must be limited to:

- `tests/platform/pb-002i-todays-mission.test.mjs`;
- narrow reconciliation of `tests/platform/pb-002a-command-board-layout.test.mjs`;
- narrow reconciliation of `tests/platform/pb-002e-fix-01-presentation-controls.test.mjs`;
- narrow reconciliation of `tests/platform/pb-002e-fix-02-control-layout.test.mjs`;
- narrow reconciliation of `tests/platform/pb-002e-smart-board-presentation.test.mjs`; and
- no weakening or deletion of unrelated protected assertions.

`tests/platform/pb-002b-lesson-timer.test.mjs`, `tests/platform/pb-002c-timer-adjustment.test.mjs`, `tests/platform/pb-002d-teacher-memo.test.mjs`, and `tests/platform/pb-002h-fix-01-school-start-launcher.test.mjs` remain regression-only and must not be modified by PB-002I unless a later inspection proves an unavoidable protected-test conflict.

Any additional application or test file requires a new read-only inspection and approval.

## Existing `platform.css` Mixed-File Boundary

At inspection time, `platform/styles/platform.css` already contains an uncommitted Teacher Platform background-calming change unrelated to PB-002I.

Before PB-002I implementation begins, that existing CSS work must complete its own validation and bounded commit workflow. PB-002I must not absorb, overwrite, restore, discard, or claim that change.

If the prior CSS work is not independently closed, PB-002I implementation must stop. Selective staging after mixing the two scopes is not the preferred resolution because it weakens change attribution and final physical-validation evidence.

## Explicit Exclusions

Do not implement:

- Mission Distribution;
- mission catalog, identity, versioning, assignment, availability, or lifecycle ownership;
- Activity Registry or Activity Library assignment;
- Goals, Side Paths, or activity selection;
- student-specific or small-group assignments;
- student-specific tool availability;
- Builder or Workshop access control;
- launcher changes;
- analytics, automation, recommendations, AI, or notifications;
- Teacher Coaching logic;
- evidence, reflection, Engineering Credits, or My STEM Work integration;
- Google Sites, Drive, Forms, Slides, Vids, or API integration;
- cloud persistence or synchronization;
- production authentication changes;
- new routes, session ownership, or fixtures;
- Builder or Workshop modification; or
- production/commercial governance resolution.

## Protected Systems

Do not change or break:

- PB-001 authentication, roles, routing, entry, sign-out, and session boundaries;
- PB-002A Teacher Command Center layout outside the Today’s Mission card;
- PB-002B and PB-002C Lesson Timer behavior;
- PB-002D Teacher Memo behavior and storage;
- PB-002E Student Display modes, focus, restoration, and presentation protections;
- PB-002H-FIX-01 School-Start Launcher;
- PB-003 Student Dashboard, Mission Choice, and My STEM Work;
- Platform routes, fixtures, and existing session owners;
- Builder internals and entry behavior;
- Workshop internals and classroom destination;
- Google Sites and external classroom resources; and
- unrelated files and working-tree changes.

## Accessibility Requirements

The Today’s Mission workflow must provide:

- persistent visible labels for every field and availability control;
- semantic native controls;
- logical keyboard order;
- visible focus indicators;
- at least 44 CSS pixels in the primary interactive dimension;
- programmatically associated guidance and limits;
- accessible validation and save/clear status that does not steal focus;
- understandable availability language that does not rely on color alone;
- readable contrast in the authenticated Teacher Command Center; and
- safe wrapping with no horizontal scrolling.

Student Display presentation must:

- preserve classroom-distance readability;
- expose a logical heading structure;
- avoid animation and flashing;
- preserve the currently implemented PB-002E presentation and focus behavior; and
- remain understandable without icons or color.

## Chromebook Requirements

At 1204 × 695 CSS pixels and DPR 1.25:

- the Today’s Mission editor and saved summary must remain readable;
- fields and actions must remain reachable with keyboard and touchpad;
- no horizontal scrolling may be introduced;
- the fixed reminder must remain visible without obscuring operational tools;
- Timer, Memo, and Student Display controls must retain clear visual priority;
- the industrial teacher background must not reduce card readability; and
- Student Display content must fit without clipping or unreadable scaling.

## Testing Requirements

### Focused State Tests

Verify:

- initial honest empty state;
- valid Save and atomic replacement;
- required title and focus validation;
- title and focus length boundaries;
- trimming and safe internal line-break preservation;
- valid availability values only;
- no availability option is selected in new empty state;
- Builder and Workshop each require an explicit teacher choice;
- either missing choice fails without replacing saved state;
- valid restored choices repopulate the controls;
- malformed, incomplete, incompatible, and oversized data fail closed;
- failed Save leaves the prior announcement unchanged;
- Clear is stable and isolated;
- refresh restoration; and
- sign-out cleanup.

### Focused Presentation Tests

Verify:

- the PB-002A placeholder is replaced only inside the mission card;
- the fixed Missions First reminder is present and not editable;
- saved and unsaved states are distinct;
- availability language is presentation-only;
- no launcher, route, Builder, or Workshop control is created;
- only saved content reaches Student Display;
- saved Today’s Mission appears in Message-only and Timer + Message, but not Timer-only;
- Message only is available when either Today’s Mission or Teacher Memo is saved;
- clearing either saved source preserves a message-bearing mode while the other source remains;
- clearing both sources normalizes Message only safely to Timer only;
- the existing three-mode selector and mode owner remain unchanged;
- Student Display contains no mission editing controls; and
- empty state does not fabricate content.

### Regression Requirements

Run:

- all focused Today’s Mission tests;
- PB-002A Teacher Command Center tests;
- PB-002B/PB-002C Timer tests;
- PB-002D Teacher Memo tests;
- PB-002E Student Display tests;
- PB-002H-FIX-01 School-Start Launcher tests;
- full Platform regression;
- full Workshop regression;
- inline JavaScript validation;
- Platform module syntax validation; and
- `git diff --check`.

### Browser and Physical Validation

Validate in Chrome and on the physical student/teacher Chromebook environment:

- create, save, update, refresh, and clear;
- keyboard and touchpad operation;
- 44-pixel targets;
- no horizontal scrolling;
- readable saved summary;
- Student Display presentation and currently implemented Escape close behavior;
- focus return;
- sign-out cleanup;
- no change to Student Dashboard launchers; and
- no change to Builder or Workshop access or behavior.

## Stop Conditions

Stop implementation immediately if it requires:

- mission identity, assignment, catalog, or distribution ownership;
- student-specific data or routing;
- class-assignment fixtures;
- external URLs or Google data;
- new routes or authentication;
- cloud, backend, cross-device, or persistent account storage;
- changes to Student Dashboard launcher availability;
- Builder or Workshop modification;
- a new Student Display mode without prior approval; or
- a file outside the approved implementation surface.

## Definition of Done

This classroom-pilot build is complete only when:

- one authorized teacher can prepare one class-wide Today’s Mission announcement;
- the announcement contains a bounded title, focus, and two presentation-only availability values;
- the Missions First reminder is fixed and visible;
- Save, update, refresh restoration, and clear behave predictably;
- malformed state fails closed;
- sign-out clears the announcement;
- only saved content appears in both existing message-bearing Student Display modes and not in Timer-only;
- the workflow creates no mission assignment or access enforcement;
- Teacher Memo, Timer, Student Display, Student Dashboard, Builder, and Workshop remain protected;
- all focused and regression tests pass;
- browser and physical Chromebook validation pass; and
- no file outside the approved boundary changes.

## Inspection Decisions Resolved

The inspection reconciliation resolves:

1. Official build identifier: **PB-002I**.
2. Message-bearing availability derives from either a saved Today’s Mission or saved Teacher Memo without changing the existing mode owner.
3. Exact PB-002A and PB-002E focused-test reconciliation files are named above.
4. Final classroom-pilot interface copy is locked above.
5. Clear is immediate and does not add PB-002G confirmation behavior.
6. The existing unrelated `platform.css` change must be closed independently before PB-002I implementation.

## Remaining Gates Before Implementation

1. Complete and commit the existing Teacher Platform background-calming CSS work through its separate approved workflow.
2. Review and approve this inspection reconciliation.
3. Provide separate PB-002I implementation authorization.

## Approval Meaning

Approval of this inspection reconciliation would accept the exact PB-002I implementation and focused-test boundary. It would not authorize implementation.

Approval would not authorize:

- implementation;
- application or test changes;
- Mission Distribution;
- authority assignment;
- staging, committing, tagging, pushing, publishing, or deployment; or
- modification of Builder, Workshop, Google resources, Cloudflare configuration, or production authentication.
