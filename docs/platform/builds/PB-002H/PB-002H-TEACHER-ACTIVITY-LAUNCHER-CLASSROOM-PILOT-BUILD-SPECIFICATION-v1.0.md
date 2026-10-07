# PB-002H — Teacher Activity Launcher (Classroom Pilot) Build Specification v1.0

**Document Status:** Approved underlying specification; inspection reconciliation pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent Experience:** PB-002 Teacher Command Center  
**Destination Authority:** Approved Classroom Pilot Destination Map v1.0
**Inspection Status:** Approved read-only pre-implementation repository inspection completed; result `BLOCKED`  
**Reconciliation Provenance:** PB-002H Pre-Implementation Repository Inspection

## Purpose

Define the implementation contract for a classroom-pilot Teacher Activity Launcher that allows a teacher to configure today's learning experience before class begins without creating Mission Distribution, an Activity Registry, production persistence, automated assignment, or new ownership architecture.

This specification does not implement the launcher. It preserves PB-001, PB-002, PB-003A through PB-003C, Builder, Workshop, and all applicable PI-000 and PI-001 stop conditions.

## References

- Classroom Readiness Sprint planning context.
- Approved Classroom Pilot Destination Map v1.0.
- PB-002 Teacher Command Center architecture and existing implementation.
- PB-003A Student Home architecture and existing implementation.
- PB-003B Mission Choice architecture and existing implementation.
- PB-003C My STEM Work architecture and existing implementation.
- Platform Blueprint v1.0.
- Development Standards v1.0.
- Applicable approved PI-000 and PI-001 ownership, privacy, evidence, lifecycle, persistence, recovery, adapter, and authority contracts.

## 1. Build Objective and Pilot Purpose

Provide a fast, teacher-controlled, entire-class configuration surface that communicates which verified classroom resources students may open during the current classroom pilot.

The pilot must:

- let the teacher select one approved curriculum library;
- let the teacher identify whether today's scope is an Entire Goal or a Specific Activity;
- let the teacher enable only exact, verified, reviewed destinations;
- present students with only actionable enabled resources plus the unconditional Side Path availability policy;
- prevent dead ends and false claims of availability;
- keep Platform session, Builder, Workshop, Google resources, evidence, and reflection ownership unchanged;
- be usable in under one minute after required destinations and state behavior are approved.

## 2. Included Teacher Workflow

### Activity Library selection

The teacher chooses exactly one pilot library:

- **Grade 3 / 4 Activity Library**
- **Grade 5 / 6 Activity Library**

The selection is an entire-class curriculum presentation choice. It must not infer student grade, inspect a roster, or create an activity record.

### Today's Scope selection

The teacher chooses exactly one scope:

- **Entire Goal**
- **Specific Activity**

The pilot must not invent a Goal, activity, identifier, catalog, ordering rule, or Activity Registry. Exact selectable content and its authoritative source remain blocked until separately supplied, inspected, and approved.

### Teacher resource enables

The teacher configuration groups these resource choices:

- Builder.
- Workshop.
- Google Slides Evidence.
- Google Vids Evidence.
- Reflection.

Only a destination that is exact, verified, non-empty, reviewed, and authorized may become selectable and enabled. A resource with `PENDING URL ENTRY` must remain unavailable in teacher configuration and cannot become part of the student action set.

## 3. Google Side Paths Pilot Rule

Google Side Paths are logically available to all students in the pilot regardless of the teacher's resource selections.

PB-002H must not:

- filter Side Paths;
- assign or distribute Side Paths;
- persist Side Path availability;
- target Side Paths by student or group;
- select a specific activity or slide inside a Side Path;
- infer Side Path URLs, content, ownership, permissions, or completion.

The approved Destination Map does not currently record exact Side Path URLs. Therefore, this always-available policy does not by itself authorize an enabled Side Path launch control. Exact Side Path destinations must be supplied, verified, and separately reviewed before they can be actionable. Until then, the Platform may communicate the policy only through an honest noninteractive state.

## 4. Student Experience

Students see:

- only teacher-enabled resources with exact approved destinations;
- Google Side Paths according to the unconditional availability policy, subject to the exact-destination safeguard above;
- a reliable Return to Student Home action;
- concise context identifying external or classroom-network destinations;
- honest noninteractive information for any required unavailable condition.

Students must never see an unavailable or pending tool as an enabled action.

### Pending-destination presentation

The safest existing Student Dashboard pattern is a noninteractive honest unavailable state rather than a disabled button in the student action sequence. Therefore:

- pending resources are omitted from the actionable student launcher group;
- if the experience must explain their absence, they appear only as noninteractive unavailable status text or a `Coming Later`-style relationship label;
- pending resources add no focus stop and expose no `href`, action handler, or activation affordance;
- pending resources must not look selected, assigned, available, broken, or launch-ready.

Teacher configuration may show a resource control as disabled only when its unavailable status is clearly visible and programmatically associated with the control.

No student button or link may create a dead end.

## 5. Destination Contract

| Resource | Classroom-pilot destination | Status |
| --- | --- | --- |
| Activity Directions | Teacher-selected Google Slides `ACTIVITY DIRECTIONS` presentation | `PENDING URL ENTRY` |
| Google Slides Evidence | Student's year-long Google Slides Engineering Notebook / Evidence Portfolio | `PENDING URL ENTRY` |
| Google Vids Evidence | Teacher-provided new Google Vids evidence copy or approved template destination for the selected activity | `PENDING URL ENTRY` |
| Reflection | Existing What I Learned Today Google Form, the sole approved reflection source | `PENDING URL ENTRY` |
| Builder | Existing repository-root `index.html` | Approved destination meaning for pilot; implementation remains separately gated |
| Workshop | `http://192.168.1.252:8000` | Approved destination meaning for pilot; local-network-only; implementation and reachability remain separately gated |
| Student Home | Existing `#/student/dashboard` route | Verified existing route; launcher implementation remains separately gated |

This table does not make any destination launcher-ready by itself. Every enabled destination must also satisfy governance, inspection, implementation, browser, network, and validation gates.

## 6. Required Destination Safeguards

- A `PENDING URL ENTRY` destination remains unavailable and non-actionable.
- Do not infer, fabricate, search for, transform, shorten, substitute, or generalize a URL.
- Every enabled destination must be exact, verified, non-empty, separately reviewed, and approved for classroom use.
- Workshop must communicate that it requires the classroom network that can reach `http://192.168.1.252:8000`.
- Workshop reachability is a manual classroom validation. The Platform must not claim to detect connectivity unless later inspection and approval establish that behavior.
- Opening any external or local-network destination must not mutate Platform role, session, route ownership, Timer, Memo, Student Display, mission, project, work, evidence, or reflection state.
- Opening a destination must not imply successful creation, save, submission, evidence connection, reflection completion, or progress.
- Builder launch behavior must not be modified.
- Workshop routing and internals must not be modified.
- External or local-network destinations, if later authorized, must be visibly identified as opening outside the current Platform context, open in an appropriate new browsing context with opener isolation, and leave Platform session ownership unchanged.
- Failure guidance must identify what the teacher or student can check without claiming diagnosis, detected network failure, or automatic availability detection.

## 7. Pilot Recipient and Curriculum Boundaries

### Recipient scope

- Entire class only.
- No selected-student overrides.
- No small-group overrides.
- No roster-driven targeting.
- No recipient records, distribution records, or persistence.

### Curriculum grouping

- Grade 3 and Grade 4 classes use Grade 3 activities.
- Grade 5 and Grade 6 classes use Grade 5 activities.

The grouping does not authorize grade inference, roster inspection, automatic library selection, or a production curriculum model.

## 8. State and Lifecycle Boundary — Inspection Finding

The completed read-only inspection established that the current Platform cannot support teacher-configured student launcher state within its approved owners:

- Teacher and student sessions are role-exclusive.
- Signing in as one role replaces the other role's session.
- No same-tab or same-device teacher-to-student launcher handoff exists.
- Independent tabs cannot rely on `sessionStorage` as an authoritative shared classroom owner.
- Separate-device configuration sharing is unavailable without an authoritative shared owner, backend, or synchronization mechanism.
- In-memory-only configuration is incoherent across the required sign-out and role transition.
- Existing session keys belong to PB-001/PB-002 behaviors and cannot be repurposed.
- No new session key, storage owner, backend, fixture owner, or synchronization mechanism is authorized.
- The smallest lifecycle currently supported is **no teacher-configured student launcher state**.

Configuration survival across refresh, sign-out, role change, tab closure, or devices is neither present nor authorized.

### No reduced implementation subset

The verified Builder and Workshop destinations are technically displayable as links. They do not form a compliant reduced implementation subset:

- the approved student contract permits only teacher-enabled resources;
- showing Builder or Workshop unconditionally would violate that contract;
- enabling either destination through teacher configuration requires the missing state/lifecycle owner.

A static launcher workaround is therefore not authorized.

Stop implementation if the coherent pilot requires:

- cloud or backend persistence;
- a new authoritative owner;
- Activity Registry or Mission Distribution;
- production synchronization;
- analytics or automation;
- a new session key or route not separately inspected and approved;
- fabricated same-device or cross-device state transfer.

## 9. Teacher UX Requirements

- The approved workflow must be achievable in under one minute during browser and physical Chromebook validation.
- Library, Today's Scope, and Resources must be distinct labeled groups.
- Current selection and unavailable status must be perceivable without relying on color alone.
- Pending destinations must identify their unavailable status honestly.
- Controls require clear accessible names and programmatic states.
- Keyboard order must follow visual reading order.
- Focus must remain visible and unobscured.
- Actionable controls must meet the existing minimum 44-by-44 CSS-pixel target.
- Errors or unavailable states must preserve selections unless an approved lifecycle rule requires otherwise.
- The layout must reflow without clipping, overlap, or page-level horizontal scrolling.
- No control may imply that an activity, Goal, recipient, or resource was assigned, distributed, saved, or synchronized.

Final copy, exact controls, layout, grouping, focus behavior, and responsive values remain pending content/accessibility approval, blocker resolution, separate implementation authorization, and validation.

## 10. Student UX Requirements

- Launch labels must identify the resource clearly.
- External and local-network destinations must be distinguished from Platform navigation.
- Only teacher-enabled resources with exact approved destinations are actionable.
- Google Side Paths remain logically available to all students and are never filtered by this pilot.
- Return to Student Home must always use the existing protected route.
- The student must not be stranded after an unavailable or failed external launch.
- Pending or unverified destinations remain noninteractive.
- Workshop guidance must state the classroom-network requirement.
- If Workshop cannot be reached, guidance may tell the student to confirm the classroom network or ask the teacher; it must not claim that Platform detected the cause.
- No opening action may report evidence submitted, reflection completed, work saved, or progress recorded.
- Keyboard, focus, accessible names, target sizing, wrapping, zoom, and no-horizontal-scroll requirements apply to all student presentation.

## 11. Explicit Exclusions

PB-002H does not authorize:

- Mission Distribution.
- Activity Registry.
- Student-specific assignments.
- Small-group assignments.
- Side Path filtering, targeting, assignment, or persistence.
- Automation or automatic resource selection.
- Analytics, tracking, or usage history.
- AI or personalization.
- Cloud or backend persistence.
- Google authentication or account handling.
- Production governance or production launch architecture.
- Google file, slide, template, or Vids copy creation.
- Evidence submission, connection, completion, or review tracking.
- Reflection submission status or response-data integration.
- New routes unless a later read-only inspection demonstrates a bounded need and separate approval authorizes it.
- New session keys, storage, fixtures, providers, APIs, models, adapters, dependencies, or ownership models without separate authority.
- Builder modification.
- Workshop routing or internal modification.
- Changes to PB-001, PB-002, PB-003A/B/C, Student Display, assets, or existing authentication/session boundaries.

## 12. Inspected Conditional Implementation Boundary

The completed inspection identified this candidate boundary, conditional on resolving every lifecycle, authority, destination, curriculum, and validation blocker:

- `platform/scripts/platform-app.mjs`
  - `teacherDashboardView(state)`;
  - `studentDashboardView(state)`;
  - the existing render and event flow only.
- `platform/styles/platform.css`
  - PB-002H-namespaced presentation only.
- one new focused PB-002H test file; its filename remains deferred.

Protected and outside this boundary:

- `guardRoute()`;
- `platform-session.mjs`;
- `platform-fixtures.mjs`;
- existing storage modules and keys;
- the route list;
- Builder `index.html`, behavior, and internals;
- all Workshop files, routing, and internals;
- PB-001, PB-002A through PB-002G, and PB-003A through PB-003D;
- PI-000 and PI-001 contracts and stop conditions;
- dependencies and assets.

### Inspected test-reconciliation boundary

- `pb-002a-command-board-layout.test.mjs` currently prohibits Builder/Workshop links in the Teacher Command Center and protects the existing input/textarea structure.
- `pb-003a-student-home-experience.test.mjs` currently prohibits links, actions, forms, and navigation in Student Home.
- `pb-003b-mission-choice-experience.test.mjs` prohibits Mission, Side Path, Builder, and Workshop interactions.
- `pb-003c-my-stem-work-experience.test.mjs` requires My STEM Work to remain noninteractive and protects the Builder, Workshop, Slides, and Vids `Coming Later` entries.

If blockers are later resolved, the safest candidate presentation is a separate launcher region outside the existing Mission Choice and My STEM Work sections. Existing foundation contracts must not be weakened globally. Exact assertion reconciliation remains conditional on separate approval and implementation authorization.

## 13. Validation Requirements

### Inspection baseline

The completed read-only inspection recorded:

- Platform regression: **90/90 passed**;
- Workshop regression: **290/290 passed**;
- `git diff --check`: passed;
- no private-network reachability probe occurred.

These results are inspection baselines only. They are not post-implementation validation, Builder/Workshop browser acceptance, classroom-network verification, or physical Chromebook acceptance.

### Focused PB-002H tests

Verify:

- exactly one library and one Today's Scope can be selected;
- pending destinations remain unavailable and non-actionable;
- only enabled exact destinations appear as student actions;
- Google Side Paths are not filtered, targeted, assigned, distributed, or persisted;
- no Side Path action appears without an exact verified destination;
- Student Home return uses the existing route;
- Builder and Workshop destination values match the approved map;
- Workshop network requirements are honest;
- external-resource context is clear;
- no action implies save, submission, evidence, reflection completion, progress, or synchronization;
- no dead-end student control exists;
- no excluded state, integration, analytics, automation, or persistence is introduced.

### Regression and protection

- Full Platform regression suite.
- PB-001 and PB-002 teacher-system regression.
- PB-003A, PB-003B, and PB-003C regression.
- Full Workshop regression suite with no Workshop file changes.
- Builder browser smoke test with no Builder file changes.
- Workshop browser smoke test without modifying Workshop.
- Teacher-to-student classroom launch rehearsal.
- Browser inspection of every available, pending, opening, return, failure-guidance, refresh, route, and sign-out state.
- Physical Chromebook validation.
- Keyboard, focus, accessible-name, target-size, zoom, wrapping, and touchpad validation.
- No page-level horizontal scrolling.
- Workshop network reachability as a separate manual classroom check.
- `git diff --check`.
- Confirmation that no unrelated or protected file changed.

Desktop or automated results must not be reported as physical Chromebook or classroom-network PASS.

## 14. Definition of Done

PB-002H is complete only when:

- this specification passes review and explicit approval;
- the four pending URL entries and any required Side Path destinations are supplied, verified, entered, and separately reviewed;
- Workshop network reachability is physically validated in the classroom;
- the authoritative teacher-to-student configuration owner and lifecycle are separately resolved and approved without inventing same-device or cross-device behavior;
- required authorities and PI-000/PI-001 prerequisites are resolved;
- the completed read-only pre-implementation inspection is reconciled, reviewed, and approved;
- a separate explicit build instruction authorizes the exact bounded changes;
- a teacher can configure the approved entire-class experience in under one minute;
- students can launch every enabled classroom resource without a dead end;
- pending destinations remain non-actionable;
- Google Side Paths remain available according to the approved policy and exact-destination safeguards;
- Return to Student Home remains functional;
- focused and full Platform tests pass;
- Builder browser smoke and full Workshop regression pass;
- browser, accessibility, teacher-to-student rehearsal, and physical Chromebook validation pass;
- no excluded capability or protected-system regression is introduced;
- final user approval is received;
- commit, tag, push, and publication remain separately authorized.

## 15. Remaining Decisions, Blockers, Stop Conditions, and Approval Meaning

### Remaining decisions and blockers

- Activity Directions exact URL: `PENDING URL ENTRY`.
- Google Slides Evidence exact URL: `PENDING URL ENTRY`.
- Google Vids Evidence exact URL or approved template destination: `PENDING URL ENTRY`.
- What I Learned Today exact URL: `PENDING URL ENTRY`.
- Exact Google Side Path destinations and student launch presentation.
- Exact approved Goal and activity choices for each pilot library.
- An approved Goal/activity catalog and exact library content; current fixtures contain no goals, activities, libraries, teacher resource choices, or destination data and must not be expanded to invent them.
- Workshop classroom-network validation.
- Authoritative teacher-to-student configuration ownership and lifecycle.
- Same-device role-transition contract.
- A separate-device sharing mechanism if separate-device operation remains required.
- Final teacher/student copy, controls, styling, placement, selectors, and responsive values.
- All PI-000G-A authority categories remain `UNASSIGNED`, including required product, curriculum, content, privacy, accessibility, security, technical-architecture, technical-operations, Builder, Workshop, external-source, and adapter authorities.
- Browser, rehearsal, and physical Chromebook acceptance.

### Stop conditions

Stop before implementation if:

- this specification lacks review and explicit approval;
- the completed inspection reconciliation lacks review and approval;
- any enabled resource lacks an exact, verified, non-empty, separately reviewed destination;
- any `PENDING URL ENTRY` would receive an actionable control;
- a Google or Side Path URL, activity, Goal, permission, owner, template, or content would need to be inferred;
- an applicable PI-000G-A authority remains `UNASSIGNED`;
- teacher configuration cannot reach the student experience without fabricated cross-device synchronization;
- a same-device role transition would lose, leak, or preserve launcher configuration without an approved lifecycle contract;
- the state/lifecycle contract requires new backend, cloud persistence, Mission Distribution, Activity Registry, production synchronization, or an unapproved session key or route;
- Workshop reachability would be claimed without manual classroom validation;
- implementation would modify Builder launch behavior or Workshop routing/internals;
- a new route, fixture, storage owner, provider, API, model, adapter, dependency, analytics, automation, or excluded capability is required;
- a student control can create a dead end;
- PB-001, PB-002, PB-003A/B/C, Builder, Workshop, or another protected system would regress.

### Approval meaning

Approval of this reconciled specification may establish documentation authority only. It cannot authorize implementation while ownership, lifecycle, authority, destination, curriculum, network, browser, or physical-validation blockers remain unresolved.

Approval would not:

- authorize implementation or application/test changes;
- make a pending destination launch-ready;
- approve a URL not recorded and separately reviewed;
- resolve the state/lifecycle mechanism;
- authorize a static Builder/Workshop launcher workaround;
- assign an owner or authority;
- override PI-000 or PI-001 stop conditions;
- authorize Activity Registry, Mission Distribution, persistence, synchronization, analytics, automation, production integration, Builder modification, or Workshop modification;
- establish browser, Chromebook, or classroom-network acceptance;
- authorize staging, committing, tagging, pushing, publishing, or deployment.

## Exact Next Gate

`/REVIEW` — **PB-002H Teacher Activity Launcher (Classroom Pilot) Build Specification v1.0 Post-Reconciliation Review**
