# PB-002G — Teacher Command Center Classroom Readiness Remediation Blueprint v1.0

**Document Status:** Proposed blueprint pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only

## Purpose

Define the smallest classroom-readiness remediation architecture for the existing Teacher Command Center before first-week classroom use.

PB-002G is a bounded usability and presentation-remediation milestone. It does not create a new Command Center, replace PB-002A through PB-002E, introduce live classroom intelligence, or bypass PI-000 ownership and authority requirements.

## References

- Classroom Readiness Audit — Teacher Command Center
- Platform Blueprint v1.0
- Development Standards v1.0
- PB-002 Teacher Command Center architecture
- PB-002A Teacher Classroom Command Board implementation and tests
- PB-002B Lesson Timer, PB-002B-FIX-01, and approved implementation behavior
- PB-002C Timer Adjustment implementation and tests
- PB-002D Teacher Memo and bounded usability correction
- PB-002E Student Display / Smart Board presentation foundation and approved corrections
- PB-002F Teacher Coaching Workspace boundaries
- PB-003 Student Dashboard foundations
- Applicable approved PI-000 ownership, privacy, accessibility, lifecycle, persistence, recovery, and authority contracts

## Approval Meaning

Approval of this blueprint would approve only the remediation architecture and its boundaries for a subsequent design-decisions stage.

Blueprint approval would not:

- authorize implementation or application/test changes;
- select final labels, controls, recovery behavior, layout values, selectors, files, assets, or technologies;
- resolve a conflict with an existing PB-002A through PB-002E contract;
- assign an owner or accountable authority;
- resolve any PI-000 prerequisite;
- establish physical Chromebook acceptance;
- authorize new classroom or student data.

## Classroom-Readiness Objective

Reduce avoidable teacher attention, confusion, and classroom interruption while preserving the implemented Lesson Timer, Teacher Memo, Student Display, presentation modes, refresh restoration, and sign-out cleanup.

The remediated experience should let a teacher:

1. Identify the operational classroom tools quickly.
2. Understand which navigation areas are available and unavailable.
3. Open and deliberately close Student Display without becoming trapped.
4. Use Timer and Memo controls without accidental loss or ambiguous feedback.
5. Operate the Command Center with keyboard and touchpad on a physical Chromebook.

## Remediation Principles

### Classroom continuity

Remediation must reduce the chance that a teacher loses instructional time, classroom-facing content, focus position, or orientation.

### Operational tools before deferred surfaces

Implemented Timer, Memo, and Student Display workflows must be easier to locate than honest future placeholders. Visual priority must not imply new data, functionality, urgency, or authority.

### Honest availability

Unavailable navigation and placeholder areas must remain truthful and must respond in a way that cannot be mistaken for a broken control.

### One owner per behavior

PB-002G may refine presentation and bounded interaction safety but must not create a second owner for timer state, memo state, presentation mode, display-open state, route state, or session state.

### Accessibility is classroom readiness

Keyboard operation, focus containment, focus return, readable labels, responsive reflow, and non-visual state communication are required behavior, not optional enhancement.

### Evidence before expansion

PB-002G must not use schedule pressure or prototype terminology to authorize deferred features, automation, live data, or architectural expansion.

## Priority Hierarchy

PB-002G uses the following remediation order:

1. Visible Student Display dismissal and modal focus containment.
2. Reserved-navigation feedback at Chromebook widths.
3. Stronger hierarchy for Lesson Timer, Teacher Memo, and Student Display.
4. Classroom-critical label readability.
5. Safe Teacher Memo clear/recovery behavior.
6. Lesson Timer duration success feedback.

Lower-priority future enhancements must not delay correction of a higher-priority classroom interruption risk.

## Student Display Visible Dismissal Boundary

PB-002G proposes a single bounded, teacher-operated way to dismiss an open Student Display in addition to the existing Escape behavior.

The future dismissal contract must:

- be visible and understandable without requiring knowledge of a keyboard shortcut;
- close only the current Student Display presentation;
- clear only the existing display-open presentation state through the existing owner;
- preserve timer state, timer continuity, saved memo content, selected presentation mode, teacher session, and current route;
- return focus to the existing shared Open Student Display control, including after refresh restoration when that control remains the safe fallback;
- remain usable by keyboard and touchpad;
- be class-safe if visible on a projected or mirrored display;
- avoid exposing timer, memo, mode-selection, reset, save, or other teacher controls inside the classroom presentation;
- create no new route, session key, persistence record, display owner, or presentation mode.

Final control label, placement, visual treatment, and implementation mechanism are deferred.

### Existing control-free contract reconciliation

PB-002B and PB-002E currently protect Student Display as control-free, and current tests prohibit buttons inside the presentation. A visible dismissal control is therefore a proposed bounded exception, not an already-compatible implementation detail.

Before implementation, the Design Decisions and Build Specification must reconcile this exception explicitly by distinguishing:

- the one authorized presentation-dismissal control; from
- all prohibited timer, memo, presentation-mode, navigation, data, and student controls.

Affected tests may be updated only through explicit paired application-and-test authorization. They must continue proving that no other controls or behavior enter Student Display.

## Modal Focus-Containment Boundary

While Student Display is open:

- keyboard focus must remain within the active presentation and its single authorized dismissal path;
- obscured Teacher Command Center controls must not remain reachable or operable;
- Escape must continue closing the display;
- the visible dismissal and Escape must use the same existing close-state owner and cleanup result;
- focus must not become lost on the document body, browser chrome, or a hidden element;
- refresh restoration must focus the restored presentation safely;
- closing must return focus to the opening control or the existing approved fallback;
- no focus loop may prevent the teacher from closing the presentation.

The exact containment technique is a deferred technical decision. This blueprint does not select DOM structure, browser APIs, selectors, or dependencies.

## Reserved-Navigation Feedback at Chromebook Widths

Reserved navigation must remain clearly unavailable and must provide perceivable feedback at every supported viewport.

A later contract must ensure:

- reserved areas cannot appear to fail silently;
- availability meaning is visible and programmatically determinable;
- feedback remains available when navigation reflows or scrolls horizontally;
- keyboard and touchpad users receive equivalent feedback;
- repeated selection does not create navigation, route changes, state, or history;
- the active Today destination remains distinguishable from reserved areas;
- no future area is represented as implemented.

Whether reserved areas remain buttons, become static unavailable items, or use another approved semantic presentation is deferred. No final label or control pattern is selected here.

## Operational-Tool Visual Hierarchy

The Teacher Command Center must visually prioritize implemented classroom operations:

1. Lesson Timer.
2. Teacher Memo.
3. Student Display content choice and opening action.

Today’s Mission, Wins, Blockers, Next Steps, Teacher Feed, and other unavailable surfaces must remain honest but visually subordinate to operational tools.

Hierarchy remediation may later consider grouping, whitespace, relative emphasis, card weight, section labeling, and responsive order. It must not:

- remove an approved PB-002A placeholder without separate authorization;
- imply that a placeholder contains live information;
- change the owner or behavior of an operational tool;
- introduce a new dashboard route, navigation system, or workspace;
- create coaching signals, student status, urgency, priority, or classroom intelligence.

Exact layout, DOM order, CSS values, selectors, and breakpoints are deferred pending repository inspection and design approval.

## Lesson Timer Usability Boundary

PB-002G must preserve:

- duration validation and existing minimum/maximum boundaries;
- Ready, Running, Paused, and Complete meanings;
- Start, Pause, Resume, Reset, End, Add, and Subtract behavior;
- original-duration Reset behavior;
- authoritative running endpoint behavior;
- session restoration and no-repeat refresh behavior;
- Student Display synchronization;
- sign-out cleanup;
- absence of student tracking, analytics, history, grades, and cross-device synchronization.

PB-002G may define a future bounded success-feedback contract for an accepted duration change. That feedback must not create history, notifications, analytics, or new timer state.

Timer-control simplification is deferred unless later classroom evidence establishes a need and a separate scope is approved.

## Teacher Memo Safety and Recovery Boundary

PB-002G may define a bounded safeguard against accidental clearing of the single saved class memo.

The safety outcome must:

- make destructive clearing deliberate or immediately recoverable through a separately approved bounded behavior;
- preserve the existing 240-character, plain-text, class-wide memo boundary;
- preserve saved, unsaved, empty, invalid, refresh, Student Display, and sign-out meanings;
- avoid creating a memo library, history system, version archive, cloud record, or cross-session recovery store;
- avoid exposing teacher-only editing controls on Student Display;
- avoid changing presentation-mode selection or timer state;
- remain accessible by keyboard and touchpad.

This blueprint does not choose confirmation, undo, recovery duration, wording, focus behavior, or technical mechanism. Those are required Design Decisions.

## Classroom-Critical Typography and Readability

Labels that communicate control purpose, timer state, memo state, Student Display mode, active navigation, or unavailable status must be readable under supported Chromebook conditions.

Future design decisions must address:

- minimum readable presentation for classroom-critical labels;
- contrast in normal, selected, disabled, saved, unsaved, error, and unavailable states;
- wrapping without clipping, overlap, or unintended truncation;
- hierarchy that remains understandable without uppercase, color, icon, or position alone;
- readable state feedback at default and supported zoom levels;
- preservation of long teacher, class, period, memo, and status text without horizontal page overflow.

No exact font size, line height, color, width, truncation rule, or design token is selected here.

## Chromebook and Responsive Requirements

Any future PB-002G implementation must undergo physical Chromebook validation. Desktop emulation cannot establish a physical PASS.

Validation must cover:

- supported Chromebook viewport sizes;
- no page-level horizontal scrolling;
- any intentionally scrollable navigation remaining discoverable and operable;
- default zoom and supported enlarged zoom/reflow;
- keyboard and touchpad operation;
- visible focus and logical focus order;
- Student Display open, dismissal, Escape, refresh restoration, and focus return;
- Timer duration feedback and all existing timer controls;
- Memo save, unsaved, clear-safety, refresh, and Student Display behavior;
- reserved-navigation feedback at each responsive state;
- readable labels, status, errors, and unavailable states;
- no clipping, overlap, hidden feedback, unexpected scroll jump, or stale presentation;
- no regression in presentation-mode readability at classroom distance.

## Keyboard and Focus Requirements

- Every retained or approved new control must be operable with the keyboard.
- Focus indicators must remain visible and unobscured.
- Focus order must follow the approved teacher workflow and responsive presentation.
- Disabled and unavailable items must communicate their state without creating misleading focus stops.
- Opening Student Display must move focus into the active presentation.
- Student Display must contain focus while open.
- Visible dismissal and Escape must restore focus predictably.
- Refresh must not place focus behind an open Student Display.
- No static placeholder should gain focus merely for visual styling.

## Honest Unavailable and Empty States

Unavailable areas must:

- state truthfully that their capability is not available;
- avoid fabricated counts, status, students, missions, evidence, recognition, reflection, coaching, or progress;
- avoid looking like a broken enabled action;
- avoid promises about delivery dates;
- avoid language that implies monitoring, ranking, grading, or automatic decisions;
- remain understandable without icons or color;
- remain visually subordinate to operational classroom tools;
- expose no new state, storage, data source, or integration.

Final empty-state wording remains a separate content decision.

## Student Display and Smart Board Relationship

PB-002E Student Display is the current teacher-authorized, full-screen classroom presentation foundation. It may be projected or mirrored to a Smart Board through the classroom’s existing external display arrangement.

PB-002G does not create:

- a separate Smart Board route or application;
- device discovery, casting, pairing, synchronization, or remote control;
- a second presentation owner;
- Smart Board persistence or settings;
- production display integration.

The proposed visible dismissal is presentation safety, not Smart Board integration. Timer-only, Message-only, and Timer + Message presentation content and ownership remain unchanged.

## Classroom Snapshot Deferral

Classroom Snapshot does not exist in the current Teacher Command Center runtime. Its absence is an unavailable capability, not a PB-002A through PB-002E defect.

Classroom Snapshot remains governed by PB-002F and PI-000. PB-002G must not implement or imply:

- live or example snapshot data;
- student counts, status, grouping, progress, evidence, reflection, or coaching signals;
- recognition or intervention priorities;
- analytics, ranking, scoring, prediction, surveillance, or personalization;
- a static shell that claims production readiness without its own approval.

## Accessibility Requirements

A future implementation must verify:

- semantic regions, headings, groups, controls, status, error, and dialog relationships;
- accessible names and state communication for every control;
- visible focus, contained modal focus, and deterministic focus restoration;
- a minimum 44-by-44 CSS-pixel target for applicable controls;
- text contrast and non-color state equivalence;
- zoom, reflow, wrapping, and no-loss behavior;
- reduced-motion preferences;
- no hover-only or pointer-only requirement;
- equivalent keyboard, touchpad, and assistive-technology access;
- status feedback that remains perceivable without unnecessary repeated announcements.

## Privacy Requirements

- Add no student or classroom data.
- Add no analytics, interaction history, monitoring, or usage profiles.
- Do not log or persist navigation attempts, display dismissal, timer feedback, or memo safety interactions.
- Keep teacher editing and controls out of classroom-facing presentation except for the separately reconciled dismissal control.
- Do not expose memo drafts, identifiers, credentials, teacher-only state, or internal timer state.
- Preserve current session cleanup and route authorization.
- Preserve all applicable PI-000 ownership, purpose, retention, deletion, restoration, and authority blocks.

## Protected Systems

PB-002G must preserve:

- PB-001 authentication, roles, routing, refresh restoration, and sign-out cleanup.
- PB-002A Teacher Command Center route, class orientation, TODAY foundation, reserved areas, and honest placeholders.
- PB-002B Lesson Timer state machine, storage boundary, Student Display open-state restoration, Escape cleanup, and sign-out cleanup.
- PB-002C timer adjustment behavior and boundaries.
- PB-002D Teacher Memo validation, plain-text boundary, save/update/clear ownership, refresh restoration, presentation separation, and sign-out cleanup.
- PB-002E presentation modes, memo preservation, timer continuity, presentation content, refresh restoration, focus return, and control separation except for the explicitly proposed dismissal reconciliation.
- PB-002F coaching, Classroom Snapshot, ownership, privacy, lifecycle, and authority blocks.
- PB-003 Student Dashboard boundaries.
- Platform fixtures, routes, session keys, storage, dependencies, assets, and namespaces unless separately inspected and authorized.
- Student Display content separation.
- Builder and Workshop runtime, data, navigation, persistence, tests, and assets.

## Explicit Exclusions

PB-002G does not authorize:

- Analytics or reporting engines.
- Teacher Coaching automation or coaching logic.
- Mission Distribution.
- New persistence, memo history, timer history, or recovery systems.
- Backend or cloud architecture.
- Cloud, Google, or other external integrations.
- Student data systems or live classroom data.
- Grading, ranking, scoring, prediction, diagnosis, risk classification, surveillance, or personalization.
- AI recommendations or automated intervention.
- New routes, providers, APIs, models, storage, adapters, synchronization, or dependencies.
- Builder or Workshop changes.
- Production Smart Board integration.
- Live Classroom Snapshot.
- Timer-control simplification.
- New presentation modes or Student Display content.
- Assignment of owners or accountable authorities.
- Physical Chromebook PASS without physical validation.

## Future Enhancements

Only after separate evidence, inspection, ownership, design, specification, and approval may future work consider:

- Timer-control simplification.
- Production Smart Board integration.
- PB-002F Classroom Snapshot and Teacher Coaching Workspace.
- Additional classroom workflows supported by authoritative data.
- Broader navigation when reserved destinations are implemented.

These are non-authorizing expansion points and are not PB-002G scope.

## Deferred Decisions

The following remain unresolved:

- Final Student Display dismissal label, placement, visibility, semantics, and visual treatment.
- Exact reconciliation language for the PB-002E control-free presentation contract.
- Exact modal focus-containment mechanism.
- Reserved-navigation semantic model and feedback wording.
- Operational-tool layout, DOM order, responsive order, grouping, and emphasis.
- Exact classroom-critical typography, spacing, colors, breakpoints, and truncation behavior.
- Teacher Memo confirmation or recovery model, wording, timing, and focus behavior.
- Lesson Timer duration-success wording and status behavior.
- Final unavailable and empty-state wording.
- Exact application files, functions, selectors, and tests.
- Product/content, privacy, accessibility, technical, and other required authority assignments and concurrence.
- Browser and physical Chromebook acceptance results.

## Implementation Stop Conditions

Stop before implementation if:

- this blueprint, subsequent Design Decisions, and Build Specification have not each passed review and explicit approval;
- the required accountable authority remains unavailable or `UNASSIGNED`;
- the Student Display dismissal exception has not been reconciled with PB-002E and its protected tests;
- final labels, recovery behavior, focus behavior, layout, styling, or unavailable-state wording would need to be invented;
- a new route, state owner, session key, persistence record, fixture, asset, dependency, provider, API, model, adapter, integration, or data source is required;
- timer, memo, presentation-mode, refresh, or sign-out ownership would change;
- Student Display would expose any control beyond the separately approved dismissal path;
- physical Chromebook validation requirements cannot be satisfied;
- Classroom Snapshot, PB-002F coaching, live data, analytics, automation, or another excluded feature enters scope;
- Builder, Workshop, PB-003, or another protected system would be modified;
- honest unavailable states cannot be maintained.

When stopped, report the exact conflict, decision, authority, concurrence, contract reconciliation, inspection, or approval required. Do not substitute schedule pressure for authorization.

## Blueprint Completion Criteria

This blueprint is ready for its next documentation stage only when:

- its classroom-readiness objective and remediation priorities are complete;
- the Student Display dismissal exception and required PB-002E reconciliation are explicit;
- Timer, Memo, presentation, refresh, and sign-out ownership remain protected;
- Classroom Snapshot and PB-002F remain deferred;
- accessibility, privacy, Chromebook, unavailable-state, exclusion, and stop-condition boundaries are complete;
- no final implementation detail or authority assignment is implied;
- the blueprint passes review and receives explicit approval.

Blueprint completion does not authorize implementation.

## Exact Next Gate

`/REVIEW` — **PB-002G Teacher Command Center Classroom Readiness Remediation Blueprint v1.0**
