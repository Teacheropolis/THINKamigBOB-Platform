# PB-002G — Teacher Command Center Classroom Readiness Remediation Design Decisions v1.0

**Document Status:** Proposed design decisions pending review and approval  
**Controlling Blueprint:** PB-002G Teacher Command Center Classroom Readiness Remediation Blueprint v1.0 — approved architecture authority  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only

## Purpose

Lock the architecture-level decisions required to specify the smallest safe classroom-readiness remediation for the existing Teacher Command Center.

These decisions preserve PB-001 and PB-002A through PB-002E behavior, acknowledge the bounded exception required for visible Student Display dismissal, and keep PB-002F, PI-000, live data, production Smart Board integration, and implementation authority deferred.

## References

- Approved PB-002G Teacher Command Center Classroom Readiness Remediation Blueprint v1.0
- Classroom Readiness Audit — Teacher Command Center
- Platform Blueprint v1.0
- Development Standards v1.0
- PB-001 Platform Foundation architecture, implementation, and tests
- PB-002 Teacher Command Center architecture
- PB-002A through PB-002E architecture, implementation, approved corrections, and tests
- PB-002F Teacher Coaching Workspace boundaries
- PB-003 Student Dashboard foundations
- Applicable approved PI-000 ownership, privacy, accessibility, lifecycle, persistence, recovery, and authority contracts

## Approval Meaning

Approval of these Design Decisions would authorize creation and review of a PB-002G Build Specification only.

Approval would not:

- authorize implementation or application/test changes;
- resolve an unassigned owner or accountable authority;
- satisfy a PI-000 or PB-002F prerequisite;
- select exact files, functions, selectors, CSS values, browser APIs, libraries, dependencies, providers, models, storage, adapters, or technologies;
- approve final labels, messages, or visual treatment;
- establish browser, classroom, or physical Chromebook acceptance;
- authorize excluded features or data.

## Decision 1 — Remediation Priority Order

PB-002G implementation planning must preserve this order:

1. Visible Student Display dismissal and modal focus containment.
2. Reserved-navigation availability feedback at Chromebook widths.
3. Stronger hierarchy for operational Timer, Memo, and Student Display tools.
4. Classroom-critical label readability.
5. Confirm-before-clear safety for Teacher Memo.
6. Lesson Timer duration success feedback.

Lower-priority presentation work must not delay or weaken a higher-priority classroom-interruption correction.

## Decision 2 — PB-002E Control-Free Contract Reconciliation

Student Display remains a read-only, teacher-authorized classroom presentation. PB-002G permits exactly one new category of interactive behavior inside the open presentation:

**Presentation dismissal.**

This is a bounded exception to PB-002E’s existing control-free contract. It is not a general exception for teacher controls and does not turn Student Display into an interactive dashboard.

The reconciled contract means:

- Exactly one visible dismissal action may be available while Student Display is open.
- The dismissal action may close the presentation only.
- Timer, Memo, presentation-mode, navigation, reset, save, clear, adjustment, settings, student, and data controls remain prohibited inside Student Display.
- The dismissal action must not alter the Timer, Memo, selected mode, displayed content, teacher session, or route.
- Student Display remains free of content-editing and classroom-management controls.
- The dismissal action is class-safe presentation chrome, not student data or instructional content.

Current tests that prohibit every button or control inside Student Display must be deliberately reconciled during an authorized build. Replacement assertions must prove:

1. Exactly one authorized dismissal action exists.
2. No prohibited controls exist.
3. Presentation content and ownership remain unchanged.
4. Escape behavior remains available.
5. Focus containment and deterministic focus return work.

No existing assertion may simply be deleted or weakened without an approved replacement contract.

## Decision 3 — Visible Dismissal Semantics

The visible dismissal is a teacher presentation-control action whose sole outcome is to exit the current full-screen Student Display.

It must:

- be perceivable and operable without knowing the Escape shortcut;
- expose an accessible name whose meaning is unambiguously presentation dismissal;
- remain visible in Timer-only, Message-only, and Timer + Message modes;
- remain usable at supported Chromebook and classroom-display sizes;
- use the existing Student Display open-state owner and close result;
- clear the existing open-display state exactly once;
- preserve timer continuity, saved memo, selected presentation mode, route, and teacher session;
- return focus according to Decision 7;
- be visually subordinate to Timer and Class Message content while remaining discoverable;
- avoid appearing to students as an activity choice, timer control, or message control.

The final visible label, location, shape, color, icon use, and DOM representation remain approval-dependent Build Specification decisions.

## Decision 4 — Escape Behavior

Escape remains a complete and equivalent dismissal path.

Escape must:

- close an open Student Display;
- clear the existing display-open state exactly once;
- preserve Timer, Memo, selected presentation mode, route, and teacher session;
- return focus using the same deterministic rule as visible dismissal;
- remain effective after refresh restoration;
- do nothing to these systems when Student Display is already closed.

Visible dismissal must not replace, disable, or alter Escape behavior.

## Decision 5 — Modal Focus Containment

Student Display is a modal presentation while open.

The focus contract is:

- Focus enters the open presentation.
- The visible dismissal is the primary interactive focus destination because it is the only authorized control.
- Keyboard traversal must remain within the open modal.
- Focus must not move to obscured Teacher Command Center content, the header, navigation, footer, or another route control.
- Assistive-technology navigation must not treat background controls as available for interaction.
- Focus must remain visible and must not be clipped or obscured.
- The teacher must always be able to dismiss through the visible action or Escape.
- Containment must not create an inescapable focus loop.

The exact browser or DOM mechanism used to make the background unavailable is deferred. No API, library, attribute strategy, selector, or dependency is selected here.

## Decision 6 — Background Interaction Boundary

While Student Display is open, the underlying Teacher Command Center is unavailable for interaction.

The implementation contract must prevent:

- pointer activation of obscured controls;
- keyboard focus on background controls;
- accidental Timer, Memo, navigation, presentation-mode, Settings, or sign-out actions behind the presentation;
- assistive-technology exposure that represents obscured controls as currently operable.

Closing Student Display restores the underlying Command Center without re-rendering, mutating, or resetting its protected tool state except where the existing owner already requires rendering.

## Decision 7 — Deterministic Focus Return

Both visible dismissal and Escape use one focus-return rule:

1. Return focus to the exact shared **Open Student Display** control that opened the presentation when it remains connected and valid.
2. After refresh restoration, or when the remembered opener is unavailable, return focus to the existing shared Open Student Display control rendered on the authorized Teacher Command Center.
3. If that fallback is unexpectedly unavailable, return focus to the authorized Teacher Command Center main region rather than the document body, a hidden element, or another route.

The return target must be visible and must not cause an unexpected route change or page-level scroll jump.

## Decision 8 — Refresh and Sign-Out While Student Display Is Open

### Refresh

Refresh must continue using existing owners to reconstruct:

- authorized teacher session and route;
- Student Display open state;
- selected presentation mode;
- Timer state and running endpoint;
- saved Teacher Memo presentation.

After an authorized restoration, focus moves into the restored Student Display according to the modal focus contract. Refresh must not repeat a Timer adjustment, Memo save/clear, mode selection, or dismissal action.

If teacher authorization is missing or invalid, Student Display must not restore and its local open-state presentation record must fail closed through the existing boundary.

### Sign-out

Sign-out must preserve the existing locked cleanup effects for:

- Student Display open state;
- Lesson Timer state;
- teacher session;
- Teacher Memo state;
- Student Display presentation-mode state.

PB-002G must not reorder, weaken, or partially perform the existing cleanup contract. A visible dismissal action is not sign-out and must never invoke sign-out cleanup.

## Decision 9 — Reserved-Navigation Availability Feedback

Reserved destinations remain unavailable and must not create routes or features.

At every supported viewport, including Chromebook widths:

- each reserved item must communicate that it is unavailable;
- selecting or focusing an approved interactive unavailable item must produce perceivable, honest feedback when interaction is retained;
- feedback must be visually available and programmatically exposed;
- feedback must remain available when navigation becomes horizontally scrollable;
- repeated interaction must not create state, history, persistence, analytics, or navigation;
- Today remains the only active Teacher Command Center destination in this scope;
- unavailable items must not look broken or complete.

The Build Specification must choose one accessible semantic model after repository inspection. Final item labels, feedback wording, live-region behavior, and visual treatment remain content/accessibility decisions.

## Decision 10 — Operational-Tool Hierarchy

Implemented classroom operations receive primary visual priority in this order:

1. Lesson Timer.
2. Teacher Memo.
3. Student Display mode selection and opening action.

Approved PB-002A placeholders remain present, truthful, and discoverable but visually subordinate.

The hierarchy may be expressed through approved grouping, reading order, spacing, relative card emphasis, headings, and responsive layout. It must not:

- delete or hide an approved placeholder;
- fabricate placeholder content;
- imply an unavailable capability is active;
- change Timer, Memo, or Student Display ownership or behavior;
- create coaching, priority, urgency, student status, or classroom intelligence;
- create a new route or workspace.

Exact DOM order, grid placement, breakpoint behavior, and visual values remain deferred.

## Decision 11 — Classroom-Critical Label Readability

Labels and status text that communicate classroom action or state must remain readable without relying on proximity, uppercase, color, icon, or hover alone.

This includes:

- Timer state and duration feedback;
- Memo saved, unsaved, empty, and error feedback;
- Student Display selected mode and opening action;
- visible dismissal;
- active Today navigation;
- reserved-area unavailable feedback;
- current teacher, class, and period orientation.

The Build Specification must define testable typography and wrapping outcomes without assuming a physical Chromebook PASS. Exact font sizes, weights, colors, widths, line heights, truncation limits, and tokens are deferred.

## Decision 12 — Teacher Memo Clear Safety

PB-002G selects **confirmation before destructive clear** as the authoritative conceptual pattern.

The first Clear Memo activation must not immediately remove the saved memo. It must initiate a bounded confirmation step that clearly distinguishes:

- confirming removal of the one currently saved class memo; and
- canceling and preserving that memo unchanged.

Only explicit confirmation may invoke the existing memo owner’s clear operation.

This decision intentionally rejects same-session undo as the primary pattern because undo would require additional recoverable-value state and lifecycle decisions. PB-002G creates no memo history, version record, library, archive, recovery store, or persistent confirmation state.

The confirmation contract must:

- preserve the saved memo until confirmation;
- preserve unsaved draft meaning and prevent ambiguity about which value would be cleared;
- avoid clearing Timer or presentation-mode state;
- remain teacher-only and absent from Student Display;
- be keyboard and touchpad operable;
- provide deterministic focus on entry, cancellation, and confirmation;
- disappear safely on route loss, refresh, or sign-out without creating a stored pending action;
- invoke clear at most once.

Exact wording, visual pattern, DOM mechanism, focus sequence, and handling of a simultaneous unsaved draft remain required Build Specification decisions. If a safe rule for unsaved drafts cannot be specified without ambiguity, implementation stops.

## Decision 13 — Timer Duration Success Feedback

An accepted duration change must produce bounded confirmation that the duration was accepted.

The feedback must:

- report only the accepted duration outcome already represented by the existing Timer owner;
- appear after successful duration validation;
- be perceivable visually and programmatically;
- avoid interrupting the teacher or moving focus unnecessarily;
- avoid creating a new Timer state, notification system, event history, analytics record, or persistence record;
- avoid repeating after refresh;
- remain distinct from invalid-duration error feedback;
- preserve Ready, Running, Paused, and Complete semantics.

Final wording, presentation duration, live-region behavior, and styling remain Build Specification decisions.

## Decision 14 — Chromebook Responsive Principles

PB-002G must support the existing approved Chromebook viewport expectations and physical validation process.

Responsive behavior must:

- avoid page-level horizontal scrolling;
- keep any intentionally scrollable reserved navigation discoverable;
- preserve logical visual and keyboard order;
- keep operational tools prominent when columns collapse;
- keep feedback adjacent or clearly associated with its initiating control;
- prevent labels, state, errors, Memo content, and controls from clipping or overlapping;
- preserve usable control targets and visible focus;
- support default zoom and approved enlarged zoom/reflow;
- preserve Student Display readability in all three presentation modes;
- avoid hover-only information or actions.

Desktop inspection and automated tests cannot replace physical Chromebook validation.

## Decision 15 — Keyboard and Accessibility Behavior

- All retained and approved new controls must use appropriate semantics and accessible names.
- Applicable controls must meet the existing minimum 44-by-44 CSS-pixel target.
- Focus indicators must be visible, unobscured, and sufficiently distinct.
- Keyboard order must match the approved responsive reading order.
- Status and error feedback must be programmatically associated and announced without excessive repetition.
- Disabled and unavailable states must not rely on color alone.
- Text must wrap and reflow without loss, clipping, overlap, or unnecessary horizontal scrolling.
- Reduced-motion preferences must remain respected.
- Touchpad, keyboard, pointer, and assistive-technology users must receive equivalent meaning and outcomes.
- No placeholder gains an unnecessary focus stop.

## Decision 16 — Honest Unavailable-State Rules

Every reserved or unavailable surface must:

- identify itself as unavailable without claiming a delivery date;
- avoid fabricated data, counts, examples, activity, students, missions, evidence, progress, recognition, reflection, or coaching;
- avoid appearing broken or enabled for a feature action;
- remain understandable without icons or color;
- remain subordinate to operational tools;
- create no route, state, storage, history, tracking, or integration;
- avoid language implying monitoring, grading, ranking, prediction, urgency, or automated decision-making.

Final unavailable-state copy remains content-approval dependent.

## Decision 17 — Student Display and Smart Board Relationship

Student Display remains the local, teacher-authorized, full-screen classroom presentation foundation. An external classroom arrangement may mirror or project it to a Smart Board.

PB-002G does not create device discovery, pairing, casting, remote control, synchronization, Smart Board persistence, a separate route, or production integration.

Visible dismissal is local presentation safety. It does not create a Smart Board integration or permit Student Display to receive PB-002F coaching information, teacher-only data, or additional controls.

## Decision 18 — Classroom Snapshot Deferral

Classroom Snapshot remains unavailable and governed by PB-002F and PI-000.

PB-002G must not add a live or fabricated Snapshot, student counts, progress, evidence, reflection status, coaching signals, recognition candidates, priorities, analytics, or placeholder data that implies owner readiness.

Its absence is not a PB-002G defect and does not block bounded remediation unrelated to Snapshot, provided all applicable PB-002G authorities are separately satisfied.

## Testing and Validation Gates

A later Build Specification must require:

### Focused automated tests

- Exactly one visible dismissal action and no other Student Display controls.
- Visible dismissal and Escape use equivalent close cleanup.
- Modal focus containment and background interaction blocking.
- Deterministic focus return from direct open and refresh restoration.
- Timer, Memo, mode, route, and session preservation after dismissal.
- Existing sign-out cleanup remains complete.
- Reserved-navigation feedback remains perceivable at Chromebook breakpoints without routing.
- Operational-tool hierarchy preserves all honest placeholders.
- Memo clear requires confirmation, cancel preserves, confirm clears once, and no history/persistence is created.
- Accepted Timer duration produces bounded success feedback without new Timer state or refresh repetition.
- No live data, analytics, persistence system, integration, or excluded capability.

### Regression tests

- Full Platform suite.
- PB-001 authentication, roles, routing, refresh, and sign-out.
- PB-002A layout and placeholder contracts.
- PB-002B timer and display restoration.
- PB-002C adjustment boundaries and refresh behavior.
- PB-002D memo validation, save/update/clear ownership, refresh, and cleanup.
- PB-002E modes, content, synchronization, presentation readability, focus return, and cleanup, with the explicitly reconciled dismissal exception.
- PB-003 route and presentation boundaries.
- Builder smoke tests.
- Full Workshop regression and smoke tests.

### Browser validation

- Student Display open, visible dismissal, Escape, containment, refresh restoration, and focus return.
- Background interaction prevention.
- Reserved-navigation feedback across responsive states.
- Timer success feedback and unchanged timer semantics.
- Memo confirmation, cancellation, clear, draft safety, refresh, and sign-out.
- Zoom, reflow, wrapping, contrast, reduced motion, keyboard order, and no page-level horizontal scrolling.
- No console errors or stale UI.

### Physical Chromebook and classroom validation

- Keyboard and touchpad operation.
- Student Display dismissal discoverability.
- Focus containment and return.
- Reserved-navigation feedback.
- Operational-tool hierarchy and label readability.
- Timer and Memo classroom workflows.
- All three Student Display modes and classroom-distance readability.
- Refresh and sign-out behavior.
- No clipping, overlap, hidden feedback, unexpected scrolling, or page-level horizontal overflow.

No implementation may be considered complete before physical validation and explicit user approval.

## Protected Systems

PB-002G must preserve:

- PB-001 authentication, teacher/student roles, routes, guards, session restoration, and sign-out protection.
- PB-002A Teacher Command Center orientation, TODAY foundation, reserved areas, and honest placeholders.
- PB-002B Lesson Timer state, duration boundaries, controls, persistence boundary, display-open restoration, Escape, and cleanup.
- PB-002C adjustments, maximum, zero completion, Reset, and refresh behavior.
- PB-002D Teacher Memo plain-text and length boundaries, storage owner, feedback meanings, refresh, Student Display separation, and cleanup.
- PB-002E Timer-only, Message-only, and combined presentation; memo preservation; timer continuity; display restoration; focus return; and control separation except for the one explicitly reconciled dismissal action.
- PB-002F Classroom Snapshot, coaching, ownership, privacy, lifecycle, and authority blocks.
- PB-003 Student Dashboard architecture and routes.
- Platform routes, fixtures, session keys, data boundaries, dependencies, assets, and namespaces unless separately inspected and authorized.
- Builder and Workshop runtime, data, navigation, persistence, assets, and tests.
- Applicable PI-000 ownership, privacy, lifecycle, persistence, recovery, and authority contracts.

## Explicit Exclusions

These Design Decisions do not authorize:

- Analytics, reporting, or event tracking.
- Teacher Coaching automation or coaching logic.
- Mission Distribution.
- New persistence, Timer history, Memo history, undo history, archive, or recovery storage.
- Backend, cloud, Google, or external integration.
- Student data systems or live classroom data.
- Grading, ranking, scoring, prediction, diagnosis, surveillance, or personalization.
- AI recommendations or automated intervention.
- New routes, providers, APIs, models, storage, adapters, synchronization, libraries, or dependencies.
- Builder or Workshop changes.
- Production Smart Board integration.
- Live Classroom Snapshot.
- Timer-control simplification.
- New presentation modes or classroom-facing content.
- Owner or authority assignment.
- Application or test changes.
- Physical Chromebook PASS without physical validation.

## Deferred Implementation Decisions

The following remain unresolved for Build Specification and inspection gates:

- Final visible-dismissal label, copy, location, styling, icon policy, and markup.
- Exact modal focus and background-unavailability mechanism.
- Exact PB-002E test expressions and application/test change surface.
- Reserved-navigation semantic model, copy, status behavior, and responsive placement.
- Operational-tool DOM order, layout, grouping, CSS, and responsive behavior.
- Exact classroom-critical typography, spacing, contrast, width, and truncation rules.
- Memo confirmation wording, UI pattern, focus sequence, and safe handling of unsaved drafts.
- Timer success-feedback wording, duration, status semantics, and placement.
- Final unavailable-state wording.
- Exact files, functions, selectors, tests, and implementation notes.
- Required product/content, privacy, accessibility, technical, operational, and other authority assignments and concurrence.
- Browser and physical Chromebook acceptance results.

## Stop Conditions

Stop before Build Specification approval or implementation if:

- these Design Decisions have not passed review and explicit approval;
- a required owner or accountable authority remains unavailable or `UNASSIGNED`;
- the PB-002E dismissal exception cannot be reconciled without admitting other controls;
- the modal cannot make background interaction unavailable while preserving deterministic exit and focus return;
- final content, Memo draft handling, status behavior, layout, or accessibility decisions would need to be invented;
- a new route, owner, session key, persistence record, data source, fixture, asset, API, provider, model, adapter, library, dependency, or integration is required;
- Timer, Memo, presentation-mode, refresh, route, or sign-out ownership would change;
- Memo safety requires history, persisted undo, or a second Memo owner;
- Timer feedback requires new Timer state, history, analytics, or notification infrastructure;
- Student Display would expose any control beyond one approved dismissal action;
- Classroom Snapshot, PB-002F coaching, live data, analytics, automation, or another excluded feature enters scope;
- Builder, Workshop, PB-003, or another protected system would be modified;
- physical Chromebook validation requirements cannot be satisfied;
- honest unavailable states cannot be preserved.

When stopped, report the exact decision, conflict, authority, concurrence, inspection, or approval required. Schedule pressure does not override a stop condition.

## Exact Next Gate

`/REVIEW` — **PB-002G Teacher Command Center Classroom Readiness Remediation Design Decisions v1.0**
