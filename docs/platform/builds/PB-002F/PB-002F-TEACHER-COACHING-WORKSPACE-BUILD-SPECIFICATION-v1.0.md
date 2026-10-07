# PB-002F — Teacher Coaching Workspace

## Build Specification v1.0

Specification Status: Proposed specification pending review and approval  
Controlling Blueprint: PB-002F — Teacher Coaching Dashboard Blueprint v1.0 — Approved architecture authority  
Controlling Design Decisions: PB-002F — Teacher Coaching Workspace Design Decisions v1.0 — Approved architecture authority  
Experience Term: `Workspace` describes the teacher experience and does not rename the controlling blueprint  
Implementation Status: Blocked and not authorized

## Document Boundary

This document defines a future inspectable implementation contract for the PB-002F Teacher Coaching Workspace. The PB-002F Teacher Coaching Dashboard Blueprint v1.0 and PB-002F Teacher Coaching Workspace Design Decisions v1.0 are approved architecture authority. This Build Specification v1.0 remains proposed pending review and approval. Blueprint and Design Decisions approval do not authorize implementation or resolve any PI-000 blocker.

The only implementable behavior described here is a teacher-only visual workspace foundation whose live-data areas remain honestly unavailable until their authoritative owners, purposes, authorization, privacy, freshness, lifecycle, and recovery contracts are separately approved. This specification does not create those owners or contracts.

All PI-000 authority assignments and blockers remain controlling. An existing fixture, placeholder, session value, DOM element, file, function, Builder or Workshop record, Google reference, or conversation must not be promoted to authority.

## Controlling References

- Approved PB-002F Teacher Coaching Dashboard Blueprint v1.0.
- Approved PB-002F Teacher Coaching Workspace Design Decisions v1.0.
- Platform Blueprint v1.0.
- Development Standards v1.0.
- PB-002 Teacher Classroom Command Center architecture.
- PB-002E Smart Board Presentation System architecture.
- PB-003 Student Dashboard foundations.
- Approved PI-000 ownership, privacy, lifecycle, persistence, recovery, and governance architecture.

If this specification conflicts with a controlling reference, implementation remains stopped pending reconciliation.

## Build Objective

Create a calm, accessible, teacher-only visual foundation that explains the intended coaching workflow and helps a teacher orient around five questions without displaying invented or unauthorized student information:

1. Who needs me first?
2. Who made meaningful progress?
3. Who deserves recognition?
4. Who still needs reflection?
5. Where should I walk next?

The foundation must reinforce coaching before data, recognition before ordinary intervention, teacher control, student dignity, honest information, and economical use of teacher attention.

The build objective does not include connecting live data, making any coaching determination, or enabling an action whose owner or lifecycle is unresolved.

## Included Scope

Subject to every implementation stop condition and a later explicit build gate, the bounded visual foundation may include:

- A teacher-only coaching workspace region within the existing Teacher Command Center architecture.
- Current class orientation using only already-authorized PB-001/PB-002 context; no new class owner or context mechanism.
- A recognition-first reading order.
- A Classroom Snapshot unavailable-state shell.
- A Recognition Opportunities unavailable-state shell.
- A Coaching unavailable-state shell organized around teacher attention questions.
- A Reflection Monitoring unavailable-state shell.
- Static explanatory language for the five teacher questions.
- Honest unavailable and future-state messages.
- Semantic regions, headings, lists, descriptions, and noninteractive status presentation.
- Responsive, keyboard-readable, zoom-safe, reduced-motion-compatible styling.
- Focused structural, privacy, accessibility, responsive, and regression tests for the authorized visual foundation.

No student names, roster entries, coaching signals, recognition candidates, reflection statuses, evidence statuses, Credits, notes, Flashbacks, Headlines, inferred facts, or fabricated examples may be rendered.

## Explicit Exclusions

PB-002F does not authorize:

- Analytics engines, reporting systems, exports, dashboards of metrics, or data warehouses.
- AI, machine learning, recommendations, summaries, sentiment analysis, or predictive models.
- Automated intervention, prioritization, triage, recognition, praise, or classroom decisions.
- Grading, mastery, rubrics, performance levels, student rankings, leaderboards, or behavior scoring.
- Hidden personalization, profiles, risk detection, surveillance, tracking, or inferred support needs.
- Invented student, teacher, classroom, request, recognition, reflection, evidence, Credit, note, progress, or coaching data.
- Live coaching categories or ordering.
- Mission Distribution.
- Teacher Notes implementation.
- Evidence integration or teacher-review tracking.
- Reflection integration, duplication, content access, scoring, classification, or summary.
- Engineering Credits calculation, award, editing, revocation, or persistence.
- Engineering Flashback or Engineering Headlines behavior.
- Teacher Feed, Wins, Challenges, Next Steps, Hall of Fame, or public-recognition automation.
- Smart Board or Student Display changes or handoff.
- Builder, Workshop, Google Slides, Google Vids, Google Forms, or external-source integration.
- Backend or durable persistence.
- New routes, session keys, storage, data models, identity formats, APIs, providers, dependencies, adapters, or synchronization mechanisms.
- Authority assignment, owner selection, governance resolution, or PI-000 decision resolution.
- Production-security or production-readiness claims.
- Changes outside a separately inspected and approved implementation surface.

## Workspace Layout

### Required Reading Order

The visual foundation must follow this order:

1. Workspace title and current authorized class orientation.
2. Classroom Snapshot.
3. Recognition Opportunities.
4. Coaching: Who Needs Me First? and Where Should I Walk Next?
5. Reflection Monitoring.
6. Future relationship notices for evidence, Credits, Teacher Notes, Engineering Flashback, and Engineering Headlines only when required by the approved final content contract.

Recognition appears before ordinary coaching content whenever practical. An eventual explicit request, safety need, accessibility need, or teacher-selected priority may supersede that order only through a separately approved live-data workflow. This specification does not implement that exception.

### Presentation Rules

- Use the existing Platform visual language and namespaced Platform styles.
- Preserve the PB-002 Teacher Command Center hierarchy rather than introducing a competing dashboard architecture.
- Keep information calm, concise, and understandable in a linear reading order.
- Do not use tables, leaderboards, comparative charts, traffic-light performance colors, alert walls, or student ranking positions.
- Do not add enabled actions for unavailable workflows.
- Any unavailable control-like presentation must not be keyboard-focusable or suggest that an action succeeded.
- Workspace absence or failure must not block existing Teacher Command Center functions.

## Recognition Section

The Recognition section must appear before ordinary coaching opportunities and answer `Who made meaningful progress?` and `Who deserves recognition?` conceptually.

For this bounded specification:

- Show no candidate students, facts, progress events, praise, awards, Credits, or public-display actions.
- Present an honest unavailable state explaining that verified recognition information is not connected.
- Do not imply that no student made progress or deserves recognition.
- Do not provide recognition, publish, award, headline, Flashback, Smart Board, or Teacher Feed controls.
- Do not fabricate demonstration recognition content.

A future live Recognition section requires an authoritative fact source, recognition owner, teacher-confirmation contract, audience rules, correction and removal behavior, privacy review, and lifecycle approval.

## Coaching Section

The Coaching section must orient the teacher to `Who needs me first?` and `Where should I walk next?` without ordering students.

For this bounded specification:

- Show no student names, visit sequence, request, follow-up, urgency, risk, status color, or inferred need.
- Present an honest unavailable state explaining that coaching signals are not connected.
- Explain that the teacher remains the decision-maker.
- Do not infer need from inactivity, clicks, errors, missing work, reflection, evidence quantity, Credits, or time.
- Do not create check-in, reorder, resolve, dismiss, note, or intervention controls.

Live coaching categories remain blocked until their owners, meanings, ordering, correction, expiration, authorization, privacy, and lifecycle rules are approved.

## Classroom Snapshot Section

The Classroom Snapshot is a brief teacher-only orientation layer, not an analytics summary.

For this bounded specification:

- It may repeat only an existing, already-authorized current-class label when the pre-implementation inspection confirms that doing so introduces no new ownership claim.
- All new counts, aggregates, student summaries, requests, reflection summaries, evidence summaries, and Credit summaries remain unavailable.
- Present an honest status that classroom coaching information is not connected.
- Do not imply that a count is anonymous or privacy-safe.
- Do not show grades, averages, engagement, productivity, compliance, behavior, time-on-task, performance colors, risk, or comparison.

The current-class label must remain owned by the existing authorized classroom/session boundary and must not be copied into a new persistent record.

## Reflection Monitoring Section

- The What I Learned Today Google Form remains the sole reflection source.
- This specification does not connect to, open, duplicate, edit, read, copy, summarize, classify, score, or store reflections.
- Show no submitted, missing, or student-level status without an authoritative reflection-status projection.
- Present an honest unavailable state such as `Reflection status cannot be checked right now.`
- Do not equate unavailable, unknown, stale, permission-lost, or delayed with not submitted.
- Reflection status cannot block work, affect recognition, determine Credits, become a grade, or appear publicly.

Any live reflection status requires approved account, consent, classroom mapping, authorization, adapter ownership, freshness, correction, retention, deletion, recovery, and unavailable-state behavior.

## Student Privacy Boundaries

- The workspace is teacher-only and must remain behind the existing teacher authorization boundary.
- No student-specific information may be added by this bounded visual foundation.
- No student coaching need, priority, visit order, reflection state, evidence state, Credit state, Teacher Note, recognition candidate, or comparison may appear publicly or on Student Display.
- No cross-student or cross-class exposure through lists, counts, filters, URLs, logs, screenshots, exports, browser restoration, or error text.
- No activity, clickstream, location, device, keystroke, time-on-task, behavior, emotion, ability, motivation, disability, reading-level, home-circumstance, or future-success monitoring or inference.
- Refresh must preserve existing authorization behavior and must not trust a new cached authority state.
- Sign-out and authorization loss must preserve existing cleanup and route protection.
- The build must add no analytics, telemetry, tracking, usage profile, or hidden personalization.

## Honest Empty and Unavailable States

The visual foundation must use factual, neutral language. Candidate messages, subject to content review, are:

- `Classroom coaching information is not connected yet.`
- `Verified recognition information is not available yet.`
- `Coaching signals are not connected yet.`
- `Reflection status cannot be checked right now.`
- `Evidence awareness is not connected.`
- `Engineering Credits are not connected.`
- `Teacher Notes are not available in this build.`
- `Engineering Flashback is not available.`
- `Engineering Headlines are not available.`

Messages must not say or imply:

- every student is finished, fine, successful, inactive, or independent;
- no student needs support or recognition;
- a student failed to work, progress, provide evidence, or reflect;
- evidence or reflection was deleted;
- the teacher has nothing to do; or
- an unconnected source was checked.

Empty, unavailable, unknown, stale, permission-lost, not-submitted, and error are distinct meanings. The bounded visual foundation must not simulate distinctions that it cannot authoritatively verify.

## Accessibility Requirements

- One clear page title and semantic headings in the required hierarchy.
- Named regions for Snapshot, Recognition, Coaching, and Reflection.
- Logical DOM and reading order matching the visual order.
- No student ranking implied through order, numbering, styling, or accessible names.
- Textual meanings for every visual distinction; no reliance on color, position, shape, icon, or sound alone.
- Sufficient contrast in default, hover, focus, disabled, and unavailable states.
- Browser zoom, text enlargement, reflow, and wrapping without clipping, overlap, truncation, or horizontal scrolling.
- Full keyboard access to any existing surrounding Teacher Command Center controls.
- No unnecessary focus stops in noninteractive unavailable sections.
- Existing visible focus indicators must remain intact.
- Respect reduced-motion preferences; no flashing, pulsing, alarm animation, auto-scroll, or attention-stealing motion.
- No hover-only, drag-only, fine-pointer, timed-response, or mouse-only behavior.
- Status and error language must be calm, specific, and understandable without exposing private data.
- Any future dynamic status announcements require separate authorization and must avoid repetitive interruption.

## Chromebook Requirements

The future build must support:

- Common physical Chromebook viewport sizes without horizontal scrolling.
- Browser zoom and enlarged text with safe reflow.
- Long class names, headings, and unavailable messages without clipping or overlap.
- Keyboard and touchpad operation.
- Logical focus order and visible focus around preserved existing controls.
- Existing approved minimum touch-target sizing for any surrounding controls affected by layout.
- Reduced-motion preferences.
- Readable hierarchy without dense columns or fine pointer precision.
- No stale or private classroom information after refresh, role change, authorization loss, or sign-out.
- No teacher-only workspace content on Student Display.

Physical Chromebook validation is mandatory and cannot be replaced by desktop browser testing.

## Focused Testing

Automated focused tests for a later authorized implementation must verify:

- The teacher workspace renders only on the authorized teacher surface.
- Student routes and student rendering do not contain the workspace.
- The required section order is Snapshot, Recognition, Coaching, then Reflection.
- The five teacher questions are present and understandable.
- Recognition precedes ordinary coaching content.
- All live-data sections render approved honest unavailable states.
- No student names, fabricated records, counts, scores, rankings, comparisons, progress, recognition, reflection, evidence, Credits, notes, Flashbacks, or Headlines are introduced.
- No enabled controls exist for unavailable workflows.
- Semantic headings and regions are present.
- Noninteractive unavailable content introduces no focus stops.
- Refresh, authorization loss, wrong-role access, and sign-out preserve existing protection.
- Student Display contains no PB-002F private content.
- No new route, session key, storage, provider, dependency, adapter, API, or external request is introduced.

Tests must assert authorized behavior rather than brittle implementation details when practical.

## Regression Requirements

A later build must run and pass:

- All Platform tests.
- PB-001 authentication, role, route, refresh, and sign-out tests.
- PB-002A Teacher Command Center layout tests.
- PB-002B timer and adjustment tests.
- PB-002D Teacher Memo tests.
- PB-002E Student Display and presentation-mode tests.
- PB-003 Student Dashboard tests.
- Existing Workshop regression tests.
- Builder smoke tests.
- Workshop smoke tests.

No stale test may be changed merely to conceal a product regression. Any test-alignment change requires separate inspection and authorization.

## Browser Validation

In a supported local browser, verify:

- Authorized teacher entry reaches the existing Teacher Command Center and visual workspace foundation.
- Wrong-role and unauthorized routes remain protected.
- Workspace hierarchy and unavailable messages match this specification.
- No console errors, failed requests, new storage entries, or private-data leaks occur.
- Refresh does not invent, reveal, or persist coaching data.
- Sign-out clears existing protected presentation as already specified.
- Student Display remains unchanged and private workspace content is absent.
- Keyboard navigation, focus, zoom, reflow, contrast, and reduced motion behave correctly.
- Existing timer, memo, presentation controls, Student Dashboard, Builder, and Workshop remain unaffected.

Browser validation does not establish authoritative data readiness or replace physical Chromebook validation.

## Chromebook Validation

Physical Chromebook validation must verify:

- Teacher login and current-class orientation.
- Teacher-only route protection and student wrong-role protection.
- Classroom Snapshot unavailable state.
- Recognition unavailable state and recognition-first placement.
- Coaching unavailable state and the five teacher questions.
- Reflection unavailable state.
- No invented student data or enabled unavailable actions.
- No private PB-002F content on Student Display.
- Refresh and sign-out protection.
- No horizontal scrolling at supported Chromebook sizes.
- Browser zoom, text enlargement, wrapping, and reflow.
- Keyboard and touchpad usability.
- Visible focus and logical focus order.
- Reduced-motion behavior.
- Readability and calm visual hierarchy.
- PB-001 through PB-003 regressions.
- Builder smoke test.
- Workshop smoke test.

Any failure returns the build to inspection and correction. Chromebook validation alone does not resolve ownership or implementation blockers.

## Protected Systems

The implementation contract must preserve:

- PB-001 authentication, roles, routing, refresh restoration, and sign-out cleanup.
- PB-002A Teacher Command Center hierarchy and approved behavior.
- PB-002B timer and timer-adjustment behavior.
- PB-002D Teacher Memo behavior.
- PB-002E Student Display, presentation modes, refresh restoration, focus return, and cleanup.
- PB-003 Student Dashboard foundations and privacy.
- The What I Learned Today Google Form boundary.
- Approved PI-000 identity, authorization, ownership, evidence, persistence, privacy, recovery, and governance architecture.
- Existing Read to BOB behavior.
- Builder and Workshop runtime, data, persistence, routes, functions, assets, and canonical content.
- Existing routes, session keys, fixtures, dependencies, application code, tests, and assets outside a separately approved implementation surface.

## Unresolved Implementation Decisions

- The PB-002F Teacher Coaching Dashboard Blueprint v1.0 and PB-002F Teacher Coaching Workspace Design Decisions v1.0 are approved architecture authority. This PB-002F Teacher Coaching Workspace Build Specification v1.0 remains proposed pending review and approval. Those prior approvals do not authorize implementation or resolve any PI-000 blocker.
- Assigned product, privacy, curriculum, school-operations, security, legal/district, technical, Builder, Workshop, evidence-source, and adapter authorities.
- Authoritative ownership for classroom membership, coaching requests, recognition, reflection status, evidence, Credits, Teacher Notes, Flashback, and Headlines.
- Exact approved route or placement within the existing Teacher Command Center.
- Exact files and functions forming the smallest safe implementation surface.
- Final section labels, explanatory copy, and unavailable-state language.
- Whether the existing class label may be reused in PB-002F without creating a new projection.
- Any live category meanings, neutral ordering, teacher actions, expiration, correction, and removal behavior.
- Data purpose, minimum fields, audience, freshness, authorization, retention, deletion, restoration, audit, conflict, offline, and unknown-outcome behavior.
- Reflection, evidence, Credits, notes, Flashback, Headlines, Smart Board, Builder, Workshop, and source-adapter contracts.
- Persistence, concurrency, idempotency, recovery, migration, provider, API, data model, route, storage, synchronization, dependency, and adapter technology.

No unresolved decision is resolved by this specification.

## Implementation Stop Conditions

Do not begin implementation inspection, planning, or code changes unless:

- The controlling blueprint, design decisions, and this specification have each passed review and received the required explicit approval.
- Required PI-000 authorities are assigned through verified approval.
- The exact visual-only implementation surface has passed a separate read-only repository inspection.
- Product, privacy, accessibility, lifecycle, and content decisions required for that slice are approved.
- The build gate explicitly identifies permitted files and tests.

Stop if:

- Any live data, student record, count, aggregate, signal, category, recognition, reflection, evidence, Credit, note, Flashback, or Headline would be required.
- Any source or owner must be invented.
- Any scoring, ranking, prediction, surveillance, personalization, persistence, backend, integration, or automation would be introduced.
- Teacher authorization cannot be revalidated.
- Private content could cross students, classrooms, teachers, Student Display, or external systems.
- A protected system or unrelated file would change.

## Definition of Done

PB-002F is complete only when all of the following are true:

- The Blueprint, Design Decisions, Build Specification, pre-implementation inspection, and explicit build authorization are approved in sequence.
- Only the separately approved visual foundation is implemented.
- Workspace hierarchy and recognition-first ordering conform to this specification.
- The five teacher questions are clearly represented.
- Snapshot, Recognition, Coaching, and Reflection show honest unavailable states without invented data.
- No live coaching, recognition, reflection, evidence, Credit, note, Flashback, Headline, analytics, grading, ranking, automation, surveillance, persistence, backend, or integration behavior exists.
- Student privacy and teacher-only authorization are verified.
- Accessibility requirements pass focused inspection.
- Focused and full regression tests pass.
- Browser validation passes.
- Physical Chromebook validation passes.
- Builder and Workshop smoke tests pass.
- Final diff inspection confirms only approved files changed.
- The user provides final approval.
- A separate commit instruction is received before staging or committing.

Meeting this Definition of Done does not resolve PI-000 owners or authorize later live-data functionality.

## Approval Meaning and Next Gate

Approval of this specification would authorize only a separately requested read-only pre-implementation repository inspection. It would not authorize implementation, application or test changes, live data, owner or authority selection, technology decisions, staging, committing, tagging, or pushing.

The exact next gate is `/REVIEW` of this PB-002F Teacher Coaching Workspace Build Specification v1.0.
