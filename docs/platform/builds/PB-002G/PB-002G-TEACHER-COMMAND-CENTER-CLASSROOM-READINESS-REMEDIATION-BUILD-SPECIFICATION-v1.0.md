# PB-002G — Teacher Command Center Classroom Readiness Remediation Build Specification v1.0

**Document Status:** Approved implementation-contract authority; inspection reconciliation pending post-reconciliation review  
**Controlling Blueprint:** PB-002G Teacher Command Center Classroom Readiness Remediation Blueprint v1.0 — approved architecture authority  
**Controlling Design Decisions:** PB-002G Teacher Command Center Classroom Readiness Remediation Design Decisions v1.0 — approved architecture authority  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only
**Reconciliation Provenance:** Reconciled with the approved PB-002G Pre-Implementation Repository Inspection; implementation remains unauthorized

## Purpose

Define the smallest implementation contract for classroom-readiness remediation of the existing Teacher Command Center without implementing it.

PB-002G corrects bounded usability, focus, feedback, hierarchy, readability, and destructive-action risks. It does not create a new Command Center, live classroom data, coaching automation, production Smart Board integration, persistence architecture, or governance authority.

## Authority and References

- Approved PB-002G Teacher Command Center Classroom Readiness Remediation Blueprint v1.0
- Approved PB-002G Teacher Command Center Classroom Readiness Remediation Design Decisions v1.0
- Classroom Readiness Audit — Teacher Command Center
- Platform Blueprint v1.0
- Development Standards v1.0
- PB-001 Platform Foundation architecture, implementation, and tests
- PB-002 Teacher Command Center architecture
- PB-002A through PB-002E architecture, implementation, approved corrections, and tests
- PB-002F Teacher Coaching Workspace boundaries
- PB-003 Student Dashboard foundations
- Applicable approved PI-000 ownership, privacy, accessibility, lifecycle, persistence, recovery, and authority contracts
- Approved PB-002G Pre-Implementation Repository Inspection

## Approval Meaning

Approval of the underlying Build Specification authorized the now-completed read-only pre-implementation repository inspection. That inspection has been completed and reconciled in this document. Approval of this reconciliation does not authorize implementation.

Approval would not:

- authorize implementation or application/test changes;
- make candidate files or selectors final;
- select an unapproved owner, authority, provider, API, model, storage mechanism, adapter, dependency, or technology;
- approve final student- or teacher-facing copy without the required content authority;
- resolve PB-002F or PI-000 blockers;
- establish browser, classroom, or physical Chromebook acceptance;
- authorize staging, committing, tagging, pushing, publishing, or deployment.

## Build Objective

Improve the existing Teacher Command Center so a teacher can locate operational tools, understand unavailable navigation, safely manage a class memo, receive clear Timer-duration confirmation, and open and close Student Display without losing focus or interacting with obscured controls.

The implementation must preserve existing Timer, Memo, presentation-mode, refresh, route, role, and sign-out ownership.

## Included Scope

PB-002G includes only:

- One visible Student Display dismissal action.
- PB-002E control-free-contract and focused-test reconciliation for that one exception.
- Escape-equivalent close behavior.
- Modal focus containment and background interaction blocking.
- Deterministic focus return after visible dismissal and Escape.
- Refresh restoration and sign-out regression protection.
- Honest reserved-navigation feedback at Chromebook widths.
- Presentation hierarchy favoring operational Timer, Memo, and Student Display tools.
- Classroom-critical label and status readability.
- Confirmation before destructive Memo clearing.
- Safe preservation of a simultaneous unsaved Memo draft.
- Bounded confirmation of an accepted Timer duration.
- Honest unavailable and empty-state presentation.
- Accessibility, responsive, browser, and physical Chromebook validation.
- Focused and regression testing.

## Explicit Exclusions

PB-002G does not authorize:

- Analytics, reports, event tracking, or usage history.
- Teacher Coaching automation or coaching logic.
- Mission Distribution.
- New persistence, Timer history, Memo history, undo history, recovery storage, archives, or cross-session recovery.
- Backend, cloud, Google, or external integration.
- Student data systems or live classroom data.
- Grading, ranking, scoring, prediction, diagnosis, surveillance, or personalization.
- AI recommendations or automated interventions.
- New routes, providers, APIs, models, storage systems, adapters, synchronization, libraries, frameworks, or dependencies.
- Builder or Workshop changes.
- Production Smart Board integration.
- Live Classroom Snapshot or PB-002F coaching workspace.
- Timer-control simplification.
- New presentation modes or additional classroom-facing content.
- Owner or authority assignment.
- Changes to PB-003 Student Dashboard foundations.

## Remediation Priority and Sequencing

Implementation and verification must proceed in this order:

1. Visible Student Display dismissal and modal focus containment.
2. Reserved-navigation availability feedback at Chromebook widths.
3. Operational-tool hierarchy.
4. Classroom-critical label readability.
5. Memo destructive-clear confirmation and draft preservation.
6. Timer-duration success feedback.

Each step must preserve all previously verified behavior before the next begins. A lower-priority change may not broaden or delay the higher-priority correction.

## Student Display Visible Dismissal Action

An open Student Display must expose exactly one visible presentation-dismissal action.

The action must:

- be available in Timer-only, Message-only, and Timer + Message modes;
- communicate presentation dismissal through approved visible text and an accessible name;
- remain class-safe and visually subordinate to the Timer and Class Message;
- meet the approved minimum target size;
- be operable by keyboard, touchpad, and pointer;
- close only Student Display;
- clear only the existing display-open presentation record through its existing owner;
- preserve Timer state and continuity;
- preserve saved Memo content and any unsaved Memo draft;
- preserve selected presentation mode;
- preserve teacher session and route;
- preserve the displayed Timer and Memo content models;
- invoke close at most once per activation;
- return focus according to the deterministic focus contract.

The bounded implementation mechanism is a native HTML `<dialog>` opened with modal presentation. The visible dismissal action is the dialog's sole Student Display control. The final label, visual placement, styling, icon decision, action name, and selector remain content/accessibility and implementation-review decisions.

The implementation must use the native dialog `cancel` event for Escape. Visible dismissal and the native cancel path must invoke the same close operation, existing open-state cleanup, protected-state preservation, and deterministic focus-return outcome. A custom focus trap or new dependency is not authorized unless a later approved exception demonstrates that the native modal contract cannot satisfy browser and physical Chromebook validation.

## PB-002E Control-Free-Contract Reconciliation

PB-002E’s control-free Student Display contract is revised only to permit one presentation-dismissal action.

The reconciled contract is:

- Exactly one dismissal action is permitted inside an open Student Display.
- No Timer controls may appear.
- No Memo editing, save, clear, or confirmation controls may appear.
- No presentation-mode controls may appear.
- No navigation, Settings, sign-out, student, data, or application controls may appear.
- No input, textarea, selector, editable region, or additional action may appear.
- Presentation content, mode ownership, Timer synchronization, Memo preservation, and session ownership remain unchanged.

Existing tests that broadly reject every button must receive explicit paired test reconciliation during an authorized build. Replacement assertions must prove the exact one-action allowance and retain explicit rejection of every prohibited control category. This reconciliation is limited to narrow replacement assertions in:

- `tests/platform/pb-002b-lesson-timer.test.mjs`;
- `tests/platform/pb-002c-timer-adjustment.test.mjs`;
- `tests/platform/pb-002e-smart-board-presentation.test.mjs`;
- `tests/platform/pb-002e-fix-01-presentation-controls.test.mjs`.

Those replacements must continue protecting Timer, Memo, presentation-mode, navigation, editing, route, session, refresh, sign-out, content, and all other student-facing boundaries.

No protected test may be removed or weakened without an approved replacement assertion.

## Dismissal and Escape Semantic Equivalence

Visible dismissal and Escape are equivalent close paths.

Both must:

1. Detect that Student Display is open.
2. clear the existing open-display state exactly once;
3. hide or close the current presentation;
4. preserve Timer, Memo, presentation mode, session, route, and content ownership;
5. return focus through the same deterministic rule.

Escape remains active after this change and after refresh restoration. When Student Display is closed, Escape must not mutate PB-002G-protected systems.

The implementation must use one close outcome rather than allowing the two paths to drift semantically. Exact function factoring remains subject to inspection and must not cause unrelated refactoring.

## Modal Focus Containment

When Student Display opens or restores after refresh:

- focus must enter the modal presentation;
- the visible dismissal action must be the primary interactive focus destination;
- keyboard traversal must remain within the open modal;
- focus must remain visible and unobscured;
- the teacher must always be able to use dismissal or Escape;
- focus must not reach the obscured Command Center, header, navigation, footer, or route controls;
- assistive technology must not represent background controls as currently operable;
- containment must not create an inescapable loop.

The approved browser mechanism is native HTML `<dialog>` modal presentation. Browser-managed modality must contain focus and make background controls unavailable while open. Exact element placement, selector, styling, and function names remain deferred. A custom Tab loop, custom focus-trap library, or new dependency is not approved.

## Background Interaction Blocking

While Student Display is open, underlying Teacher Command Center interaction must be unavailable.

The implementation must prevent:

- pointer or touchpad activation behind the presentation;
- keyboard focus behind the presentation;
- accidental Timer, Memo, presentation-mode, navigation, Settings, or sign-out actions;
- assistive-technology interaction with obscured controls.

Closing Student Display must restore the Command Center’s prior operability without resetting protected state.

## Deterministic Focus Return

Visible dismissal and Escape must use this focus-return order:

1. The exact shared Open Student Display control that initiated the presentation, when it remains connected, visible, and valid.
2. The currently rendered shared Open Student Display control after refresh restoration or opener loss.
3. The authorized Teacher Command Center main region if neither control is available.

Focus must never return to the document body, a hidden or disabled element, a reserved navigation item, another route, or browser chrome. Focus return must not cause an unexpected page-level scroll jump.

## Refresh Restoration and Sign-Out Cleanup Preservation

### Refresh

An authorized refresh while Student Display is open must continue restoring through existing owners:

- teacher session and Teacher Command Center route;
- Student Display open state;
- selected presentation mode;
- Timer state and authoritative running endpoint;
- saved Memo content.

After restoration, the focus-containment contract applies immediately. Refresh must not repeat Timer adjustments, duration changes, Memo save/clear operations, mode changes, confirmation actions, or dismissal.

Unauthorized, missing, or stale teacher authority must fail closed through existing route/session boundaries and must not restore Student Display.

### Sign-out

The existing sign-out cleanup order and results remain protected for:

- Student Display open state;
- Lesson Timer state;
- teacher session;
- Teacher Memo state;
- presentation-mode state.

Visible dismissal is not sign-out and must never invoke broader cleanup.

## Chromebook Reserved-Navigation Feedback

Reserved destinations remain unavailable.

At every supported viewport:

- the active Today destination must remain distinct;
- every reserved destination must communicate unavailability;
- interactive reserved items, if retained, must provide visible and programmatic feedback;
- feedback must remain perceivable when navigation reflows or scrolls horizontally;
- feedback must remain associated with the selected or focused reserved item;
- keyboard and touchpad users must receive equivalent feedback;
- repeated interaction must create no route, history, session state, persistence, analytics, or feature behavior;
- no unavailable destination may appear broken or implemented.

At Chromebook widths, reserved navigation items may remain in a horizontally scrolling navigation row, but the associated status or unavailable feedback must be placed outside that scrolling row so it remains perceivable and programmatically available. This presentation creates no route, feature, history, state, session record, or persistence.

The final feedback copy, styling, markup details, and selector remain content/accessibility and implementation-review decisions. If honest perceivable feedback cannot be provided within this boundary, implementation stops.

## Operational-Tool Visual Priority

The responsive Command Center must prioritize:

1. Lesson Timer.
2. Teacher Memo.
3. Student Display mode controls and opening action.

Today’s Mission, Wins, Blockers, Next Steps, Teacher Feed, and other approved placeholders must remain visible, honest, and discoverable but visually subordinate.

Allowed presentation outcomes include approved changes to grouping, whitespace, card emphasis, heading hierarchy, and responsive placement. They must not:

- delete or hide approved placeholders;
- fabricate placeholder content;
- imply that unavailable capabilities are active;
- alter operational-tool behavior or ownership;
- create student or classroom status, urgency, coaching, or intelligence;
- create a new route, workspace, navigation system, or dashboard owner.

Exact DOM order, grid placement, CSS values, breakpoints, and selectors remain bounded presentation details pending reconciliation approval, separate implementation authorization, implementation review, and required validation. No additional repository inspection is required by this workflow statement.

## Classroom-Critical Readability

The implementation must improve readable presentation for:

- Timer state and duration feedback;
- Memo saved, unsaved, empty, confirmation, and error feedback;
- Student Display mode and opening action;
- visible dismissal;
- active Today navigation;
- reserved-navigation unavailable feedback;
- current teacher, class, and period orientation.

Required outcomes:

- no critical meaning relies on uppercase, color, icon, placement, or hover alone;
- text wraps without clipping, overlap, or unintended loss;
- normal, selected, disabled, saved, unsaved, confirmation, error, and unavailable states remain distinguishable;
- long approved content does not cause page-level horizontal scrolling;
- text remains readable at default and approved enlarged zoom/reflow conditions.

Exact typography, color, width, line-height, truncation, spacing, and token values remain deferred.

## Teacher Memo Destructive-Clear Confirmation

The first Clear Memo activation must not immediately invoke the Memo owner’s clear operation.

It must open or reveal a bounded teacher-only confirmation state that provides two outcomes:

- **Confirm:** clear the currently saved class Memo exactly once.
- **Cancel:** preserve the saved Memo and editor contents unchanged.

Only explicit confirmation may call the existing clear owner.

The confirmation state must:

- remain local and transient;
- create no session key, persistence, history, undo record, archive, or second Memo owner;
- be absent from Student Display;
- be operable with keyboard and touchpad;
- use deterministic focus on entry, cancellation, and confirmation;
- close safely on route loss, refresh, or sign-out without executing clear;
- not alter Timer or presentation-mode state;
- prevent repeated confirmation from clearing more than once.

Final confirmation copy, visual presentation, markup, and exact focus sequence remain approval-dependent.

## Simultaneous Unsaved Memo Draft Contract

This specification resolves the unsaved-draft blocker as follows.

### Definitions

- **Saved Memo:** the value owned by the existing session-scoped Teacher Memo store and eligible for Student Display.
- **Unsaved draft:** the current editor value when it differs from the Saved Memo. It remains transient presentation input and is not authoritative or persisted.

### Opening confirmation

When an unsaved draft exists and the teacher initiates Clear Memo:

- the confirmation must identify semantically that the operation concerns the Saved Memo currently shown or eligible for Student Display;
- the unsaved draft must remain unchanged in the editor;
- the confirmation must not save, replace, trim, normalize, or discard the draft;
- final wording remains content-approval dependent but must not imply that the draft will be deleted.

While confirmation is open, the Memo textarea and Save Memo and Clear Memo controls must be unavailable. This freezes the editor presentation so the draft cannot change during the pending destructive decision. The confirmation remains ephemeral UI state and introduces no synchronization rule or authoritative state.

### Cancel

Cancel must:

- preserve the Saved Memo;
- preserve the unsaved draft exactly as entered;
- preserve its character count and unsaved status;
- return focus to the Clear Memo control or another explicitly approved originating control;
- perform no storage mutation.
- restore availability of the textarea and Save/Clear controls.

### Confirm

Confirm must:

- clear only the Saved Memo through the existing Memo owner;
- remove the saved class message from Student Display through existing synchronization behavior;
- preserve the unsaved draft exactly as entered in the editor;
- preserve its character count;
- mark or continue presenting the draft as unsaved;
- prevent the draft from appearing on Student Display until explicitly saved;
- preserve existing warning behavior that unsaved changes will not survive refresh;
- apply existing presentation-mode normalization when the saved Memo becomes unavailable;
- invoke no automatic save;
- create no undo/history/recovery state.
- restore availability of the textarea and Save/Clear controls after the clear outcome settles.

Editor synchronization must not overwrite a preserved distinct draft with the newly cleared Saved Memo value. Saved-Memo and Student Display presentation may synchronize through existing ownership, but the editor value must remain unchanged until the teacher explicitly saves or edits it. The existing `teacher-memo.mjs` storage contract requires no modification.

If the editor value equals the Saved Memo when confirmation occurs, confirming clear may leave the editor empty because no distinct unsaved draft exists.

### Refresh, route loss, and sign-out

- Refresh or route loss while confirmation is pending cancels the confirmation without performing clear.
- Existing refresh behavior continues restoring only the Saved Memo; an unsaved draft remains nonpersistent.
- Sign-out cancels pending confirmation and then performs the existing locked sign-out cleanup.

This contract resolves silent draft loss and confirmation-open concurrent editing without adding synchronization, persistence, history, undo, or a second owner. If implementation cannot make the editor and Save/Clear controls unavailable while confirmation is open or cannot preserve the draft without changing the Memo storage contract, implementation is blocked and must return for reconciliation.

## Explicit Rejection of Undo, History, and New Persistence

PB-002G must not add:

- a recoverable cleared-value record;
- a Memo or Timer history list;
- an undo stack;
- versioning or archive behavior;
- a new session key or local-storage key;
- cross-session or cross-device recovery;
- backend or cloud persistence;
- event logs or analytics.

The pending confirmation may exist only as ephemeral UI state while the current rendered Teacher Command Center remains active. It must not become an authoritative data record.

## Lesson Timer Duration-Success Feedback

After a valid duration is accepted, provide bounded feedback that confirms only the accepted duration already owned by the existing Timer.

The feedback must:

- occur only after successful validation;
- be visually perceivable and programmatically exposed;
- remain distinct from validation errors and Timer state;
- avoid moving focus unnecessarily;
- avoid interruptive repeated announcements;
- avoid creating a Timer state, notification system, history, analytics, event record, or persistence record;
- avoid repeating after refresh;
- preserve Ready, Running, Paused, and Complete semantics;
- preserve duration locking while Running or Paused.

Final copy, placement, announcement behavior, and visual treatment require content/accessibility approval.

## Honest Unavailable and Empty States

Unavailable and reserved surfaces must:

- identify their current unavailability truthfully;
- avoid delivery-date promises;
- avoid fabricated counts, examples, activity, students, missions, evidence, progress, recognition, reflection, coaching, or classroom status;
- avoid appearing broken or implemented;
- remain understandable without color or icons;
- remain visually subordinate to operational tools;
- create no route, state, persistence, tracking, or integration;
- avoid language implying grading, ranking, prediction, surveillance, personalization, urgency, or automated decisions.

Final copy remains separately approval-dependent.

## Accessibility and Keyboard Requirements

- Retained and approved new controls must use appropriate native or equivalent semantics.
- Every control must have a clear accessible name and programmatic state.
- Applicable controls must meet the existing 44-by-44 CSS-pixel minimum target.
- Focus indicators must remain visible, unobscured, and sufficiently distinct.
- Keyboard order must match approved responsive reading order.
- Student Display must contain focus while open.
- Background interaction must remain unavailable while the modal is open.
- Dismissal, Escape, Memo confirmation, cancellation, and Timer feedback must have deterministic focus and announcement behavior.
- Status and error feedback must be associated correctly without excessive live announcements.
- Meaning must not depend on color, icon, hover, or position alone.
- Text must wrap and reflow without clipping, overlap, or unnecessary horizontal scrolling.
- Reduced-motion preferences must remain respected.
- Keyboard, touchpad, pointer, and assistive-technology users must receive equivalent meaning and outcomes.
- Static placeholders must not add unnecessary focus stops.

## Chromebook Requirements

Physical Chromebook validation is mandatory and must cover:

- supported viewport sizes;
- no page-level horizontal scrolling;
- discoverable intentional navigation scrolling, if retained;
- default zoom and approved enlarged zoom/reflow;
- keyboard and touchpad operation;
- visible focus and logical focus order;
- operational-tool hierarchy after responsive collapse;
- Student Display opening, visible dismissal, Escape, containment, refresh restoration, and focus return;
- reserved-navigation feedback at each responsive state;
- Memo save, unsaved state, confirmation, cancellation, clear, draft preservation, refresh, and sign-out;
- Timer duration validation, accepted feedback, controls, refresh, and Student Display synchronization;
- all three Student Display modes and classroom-distance readability;
- no clipping, overlap, hidden feedback, unexpected scroll jump, stale state, slowdown, or horizontal overflow.

Desktop or automated validation must not be reported as a physical Chromebook PASS.

## Privacy Boundaries

- Add no student or classroom data.
- Add no analytics, event logs, monitoring, interaction history, or usage profiles.
- Do not log or persist navigation attempts, dismissal, confirmation, cancellation, Timer feedback, or unsaved drafts.
- Keep teacher editing and confirmation controls out of Student Display.
- Permit only the reconciled dismissal action inside Student Display.
- Do not expose Memo drafts, identifiers, credentials, internal Timer state, or teacher-only dashboard information.
- Preserve current teacher route authorization and sign-out cleanup.
- Preserve all applicable PI-000 purpose, ownership, retention, deletion, restoration, recovery, and authority blocks.

## Student Display and Smart Board Boundary

Student Display remains the local teacher-authorized, full-screen classroom presentation foundation. It may be externally mirrored or projected to a Smart Board through existing classroom arrangements.

PB-002G creates no:

- device discovery, pairing, casting, remote control, or synchronization;
- Smart Board route, application, setting, persistence, or owner;
- production Smart Board integration;
- PB-002F coaching or teacher-private content flow.

Visible dismissal is local presentation safety only.

## Classroom Snapshot and PB-002F Deferral

Classroom Snapshot remains unavailable and governed by PB-002F and PI-000.

PB-002G must not add or imply:

- a live or example Snapshot;
- student counts, status, progress, evidence, reflection, recognition, coaching, or priorities;
- analytics, scoring, ranking, prediction, surveillance, or personalization;
- an owner-ready placeholder containing fabricated data.

PB-002F coaching workspace, live data, and authority-dependent behavior remain deferred and non-authorizing.

## Inspected Candidate Implementation Boundary — Subject to Build Authorization

The approved read-only inspection identified this bounded candidate surface:

- `platform/scripts/platform-app.mjs` for existing Teacher Command Center rendering and bounded event/focus behavior.
- `platform/styles/platform.css` for namespaced presentation, responsive hierarchy, readability, modal dismissal, confirmation, focus, and feedback styles.
- One new focused PB-002G test under `tests/platform/`.
- Narrow assertion reconciliation in `tests/platform/pb-002b-lesson-timer.test.mjs`, `tests/platform/pb-002c-timer-adjustment.test.mjs`, `tests/platform/pb-002e-smart-board-presentation.test.mjs`, and `tests/platform/pb-002e-fix-01-presentation-controls.test.mjs`.
- PB-002G implementation notes created only during an authorized build.

The inspection found no need to modify `lesson-timer.mjs`, the `teacher-memo.mjs` storage contract, `student-display-mode.mjs`, session modules, fixtures, routing modules, assets, dependencies, Builder, or Workshop. This candidate list records inspection evidence but is not build authorization. Exact functions, selectors, markup details, and focused-test filename remain bounded implementation details requiring later authorization.

The implementation must stop if it requires changes to:

- Timer or Memo owner modules merely to support presentation behavior;
- route, session, fixture, data, asset, dependency, Builder, Workshop, or PB-003 files;
- a new storage or state owner.

### Inspection Validation Baseline

The read-only inspection recorded this clean baseline:

- Platform PB-001 through PB-002E focused regression: 57 of 57 tests passed.
- Full Workshop regression: 290 of 290 tests passed.
- No Builder-specific automated test directory was found; Builder therefore retains its required browser smoke validation.

These results are an inspection baseline only. They do not satisfy post-implementation regression, browser, Builder smoke, or physical Chromebook validation requirements.

## Focused Testing Requirements

Focused automated tests must verify:

### Student Display dismissal

- Exactly one dismissal action appears in each mode.
- No other Student Display control appears.
- Visible dismissal and Escape clear open state once and close equivalently.
- Timer, Memo, mode, route, session, and content remain unchanged.
- Focus enters the modal and remains contained.
- Background controls are unavailable to keyboard, pointer, and assistive interaction.
- Direct and refresh-restored dismissal return focus deterministically.

### Reserved navigation and hierarchy

- Reserved destinations create no routes or state.
- Feedback remains visible and programmatically exposed at Chromebook breakpoints.
- Today remains active.
- Timer, Memo, and Student Display are visually prioritized.
- Every approved placeholder remains present and honest.

### Memo clear safety

- First Clear activation does not clear.
- Cancel preserves Saved Memo and editor contents.
- Confirm clears the Saved Memo exactly once.
- A distinct unsaved draft survives opening, cancellation, and confirmed clearing unchanged.
- The preserved draft remains unsaved and absent from Student Display.
- No draft is automatically saved.
- No undo, history, recovery record, session key, persistence, or second owner is created.
- Refresh or route loss cancels pending confirmation without clearing.
- Sign-out cancels confirmation and preserves existing cleanup.

### Timer duration feedback

- Accepted duration receives bounded success feedback.
- Invalid duration retains existing error behavior.
- Feedback creates no Timer state or persistent record.
- Feedback does not repeat after refresh.
- Existing Timer controls and state semantics remain unchanged.

### Accessibility and exclusions

- Accessible names, states, focus order, focus visibility, target sizing, wrapping, reduced motion, and non-color meaning.
- No analytics, live data, integration, new route, storage, dependency, provider, model, adapter, Builder, Workshop, or PB-003 change.

## Full Platform Regression Requirements

Run and pass the full Platform test suite, including:

- PB-001 authentication, roles, routes, guards, refresh, and sign-out.
- PB-002A Command Center route, class orientation, TODAY layout, reserved areas, and placeholders.
- PB-002B Timer state, controls, refresh, display restoration, Escape, and cleanup.
- PB-002C adjustments, maximum, zero completion, Reset, and refresh.
- PB-002D Memo validation, length, save/update/clear owner, feedback, refresh, Student Display, and cleanup.
- PB-002E all presentation modes, timer continuity, memo preservation, content separation, refresh, focus return, readability, and cleanup, with only the explicitly reconciled dismissal exception.
- PB-003 Student Dashboard routing and presentation foundations.

Existing tests may change only when explicit protected assertions conflict with approved PB-002G behavior. Reconciled tests must strengthen the new exact contract rather than weaken coverage.

## Builder and Workshop Protection

PB-002G requires:

- Builder smoke testing with no Builder file changes.
- Full Workshop regression testing and smoke testing with no Workshop file changes.
- No changes to Builder or Workshop runtime, routes, data, navigation, persistence, assets, missions, rendering, geometry, camera, measurements, Smart Board launcher, restoration, or tests except execution of existing regression tests.

Any required Builder or Workshop modification stops PB-002G.

## Browser Validation

Browser validation must verify:

- authorized Teacher Command Center access and wrong-role protection;
- Student Display visible dismissal in all modes;
- Escape equivalence;
- modal focus containment and blocked background interaction;
- deterministic focus return after direct open and refresh restoration;
- Timer continuity, Memo preservation, mode preservation, and sign-out cleanup;
- reserved-navigation feedback across responsive states;
- operational-tool hierarchy and honest placeholders;
- Memo confirmation, cancellation, distinct-draft preservation, clear, refresh, and sign-out;
- Timer duration success and existing validation errors;
- keyboard order, focus visibility, zoom, reflow, wrapping, contrast, reduced motion, and target sizing;
- no console errors, stale UI, unexpected focus movement, scroll jump, or page-level horizontal scrolling.

## Physical Chromebook Validation

Physical validation must verify:

- visible dismissal discoverability and usability;
- Escape behavior;
- focus containment and deterministic focus return;
- no interaction with obscured background controls;
- reserved-navigation feedback at Chromebook widths;
- operational-tool visual priority;
- classroom-critical label readability;
- Memo confirmation and cancellation;
- unsaved draft preservation after confirmed clearing;
- Timer duration success feedback;
- keyboard and touchpad usability;
- default zoom and approved enlarged zoom/reflow;
- no page-level horizontal scrolling, clipping, overlap, hidden feedback, stale state, or slowdown;
- all three Student Display modes and classroom-distance readability;
- refresh and sign-out behavior;
- PB-001 and PB-002A through PB-002E regressions;
- Builder and Workshop smoke tests.

Any failure remains unresolved until separately inspected and approved. Physical validation results must not be inferred from automated or desktop testing.

## Protected Systems

PB-002G must preserve:

- PB-001 authentication, roles, routing, refresh, and sign-out.
- PB-002A Teacher Command Center orientation, TODAY foundation, reserved areas, and placeholders.
- PB-002B Lesson Timer, session boundary, Student Display restoration, Escape, and cleanup.
- PB-002C Timer adjustment behavior.
- PB-002D Memo ownership, validation, plain-text and length boundaries, save/update/clear meaning, refresh, presentation separation, and cleanup, subject only to confirmation-before-clear and distinct-draft preservation.
- PB-002E presentation modes, Timer continuity, Memo preservation, content, refresh, focus return, and control separation, subject only to the one dismissal exception.
- PB-002F Classroom Snapshot, coaching, ownership, privacy, lifecycle, persistence, and authority blocks.
- PB-003 Student Dashboard foundations.
- Platform routes, fixtures, session keys, storage, data boundaries, dependencies, assets, and namespaces unless exact existing presentation code is separately authorized after inspection.
- Builder and Workshop systems and assets.
- Applicable PI-000 contracts and authority blocks.

## Deferred Decisions and Blockers

The following remain unresolved:

- Final dismissal label, copy, placement, styling, icon policy, markup, action name, and selector.
- Exact native-dialog element placement, styling, action name, selectors, and shared close-function structure.
- Exact PB-002E replacement-assertion wording within the four inspected test files.
- Reserved-navigation copy, styling, live-region details, and exact responsive markup within the approved outside-scroll-row boundary.
- Exact operational-tool DOM order, layout, grouping, breakpoints, and CSS values.
- Exact typography, spacing, contrast, width, and truncation rules.
- Memo confirmation copy, markup, visual pattern, and exact focus sequence.
- Timer feedback copy, placement, announcement behavior, and styling.
- Final unavailable-state wording.
- Exact functions and helpers where not already bounded, selectors, final markup details, the focused PB-002G test filename, styling, copy, placement, responsive values, and implementation notes.
- Required product/content, privacy, accessibility, technical, operational, and other accountable authority assignments and concurrence.
- Browser and physical Chromebook acceptance results.

The unsaved-draft ownership, preservation, and confirmation-open concurrency contracts are resolved: the editor and Save/Clear controls are unavailable while confirmation is open, and no synchronization rule is introduced. Required PI-000G-A owner and accountable-authority assignments remain `UNASSIGNED` and implementation-blocking.

## Stop Conditions

Stop before implementation if:

- this Build Specification has not passed review and explicit approval;
- the read-only pre-implementation inspection has not confirmed an exact bounded surface;
- a required owner or accountable authority remains unavailable or `UNASSIGNED`;
- final content, layout, focus, confirmation, or status behavior would need to be invented;
- the editor or Save/Clear controls cannot be made unavailable during confirmation, or a preserved draft would be overwritten;
- PB-002E cannot be reconciled while allowing only one dismissal action;
- modal containment cannot block background interaction and preserve deterministic exit;
- a new route, state owner, session key, persistence record, data source, fixture, asset, provider, API, model, adapter, library, framework, dependency, or integration is required;
- Timer, Memo, presentation-mode, route, refresh, or sign-out ownership would change;
- Memo safety requires undo, history, recovery storage, or a second Memo owner;
- Timer feedback requires new Timer state, history, analytics, notifications, or persistence;
- Classroom Snapshot, PB-002F coaching, live data, automation, or another excluded feature enters scope;
- Student Display would expose any control beyond one approved dismissal action;
- Builder, Workshop, PB-003, or another protected system would require modification;
- honest unavailable states or physical Chromebook requirements cannot be satisfied.

When stopped, report the exact authority, decision, conflict, test reconciliation, inspection, or approval required. Classroom schedule pressure does not override a stop condition.

## Definition of Done

PB-002G is complete only when:

- the Blueprint, Design Decisions, and Build Specification have passed review and explicit approval;
- the approved read-only inspection and this reconciliation confirm the bounded candidate implementation and test surface;
- required authorities, content, accessibility, focus, confirmation, responsive, and concurrent-draft decisions are approved;
- a separate explicit build instruction authorizes exact files and tests;
- exactly one visible Student Display dismissal action is implemented;
- PB-002E tests are safely reconciled and prohibit every other display control;
- modal focus and background interaction are correct;
- visible dismissal and Escape are equivalent and return focus deterministically;
- refresh and sign-out behavior remain correct;
- reserved-navigation feedback remains perceivable at Chromebook widths;
- operational tools receive approved priority without hiding placeholders;
- Memo clear requires confirmation and preserves a distinct unsaved draft;
- Timer duration success feedback remains bounded;
- focused and full Platform tests pass;
- Builder and Workshop regressions pass;
- browser validation passes;
- physical Chromebook and classroom validation pass;
- no excluded feature, state, data, integration, dependency, or authority is introduced;
- final user approval is recorded;
- commit, tag, push, and publication remain separately authorized.

Approval of this specification alone does not satisfy the Definition of Done or authorize implementation.

## Exact Next Gate

`/REVIEW` — **PB-002G Teacher Command Center Classroom Readiness Remediation Build Specification v1.0**
