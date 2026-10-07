# PB-002H-FIX-01 — School-Start Launcher Build Specification Inspection Reconciliation v1.0

**Document Status:** Proposed; pending review and approval  
**Implementation Status:** `BLOCKED / NOT READY` and unauthorized  
**Operation Type:** Documentation reconciliation only  
**Parent Scope:** Approved PB-002H-FIX-01 School-Start Launcher Scope Reconciliation v1.0

## 1. Build Objective

Define the exact inspected implementation contract for a future bounded Student Dashboard launcher containing exactly three fixed destination anchors. This document reconciles the approved school-start scope with repository reality; it does not implement the launcher or authorize application or test changes.

The launcher must provide a reliable presentation handoff without adding routes, state, fixtures, storage, ownership, integration, tracking, or inferred curriculum data.

## 2. Included Scope and Exact Inventory

Exactly three primary controls are included, in this order:

| Order | Exact visible label | Exact destination | Boundary |
| ---: | --- | --- | --- |
| 1 | **GO TO MY STEM MISSIONS** | `https://sites.google.com/ravennaschools.us/steminbobwarts/home-start` | Fixed user-supplied Google Sites Home destination |
| 2 | **STEM BUILDER** | `../index.html` from Platform | Existing approved same-origin repository-root Builder entry |
| 3 | **STEM WORKSHOP** | `http://192.168.1.252:8000` | Fixed user-supplied classroom-pilot local-network endpoint |

There must be no fourth, hidden, conditional, grade-specific, activity-specific, generated, or fallback control. Exact labels and destinations must not be rewritten, normalized, inferred, substituted, or expanded.

## 3. Exact Implementation File Allowlist

Only the following future implementation files are permitted, and only after separate authorization:

1. `platform/scripts/platform-app.mjs`
2. `platform/styles/platform.css`
3. `tests/platform/pb-002h-fix-01-school-start-launcher.test.mjs` — one new focused test
4. `tests/platform/pb-003a-student-home-experience.test.mjs` — narrow assertion reconciliation only

No other file is authorized by this contract. The allowlist is an implementation boundary, not implementation authorization.

## 4. Exact DOM and Render Contract

### Function boundary

The only application function in scope is `studentDashboardView(state)` in `platform/scripts/platform-app.mjs`.

### Insertion point

Insert one full-width semantic launcher section:

- immediately after the closing `.platform-student-goal` section containing `Current Goal`;
- immediately before the existing `.platform-yesterday` section;
- outside PB-003B Mission Choice and PB-003C My STEM Work.

### Required structure

- One semantic section with a unique accessible heading relationship.
- One contained launcher grid.
- Exactly three semantic `<a>` elements in the approved order.
- No `<button>`, form, generic click handler, `data-action`, state-dependent branch, generated destination, or invisible duplicate action.
- No event handler, route call, state lookup, class/grade lookup, fixture projection, or session/storage access.

The launcher is static presentation. Existing `student`, `classRecord`, Student Home sections, shell behavior, and route rendering remain unchanged.

## 5. Exact Link Contract

All three controls are semantic anchors.

Each anchor must use:

- `target="_blank"`;
- `rel="noopener noreferrer"`;
- the exact approved destination;
- a visible label that identifies the destination;
- accessible context communicating that the destination opens separately.

Destination-specific requirements:

- **GO TO MY STEM MISSIONS:** exact Google Sites Home URL; no success, permission, account, assignment, or completion claim.
- **STEM BUILDER:** exact repository-relative `../index.html`; opens separately to preserve Student Dashboard because no Builder return integration exists.
- **STEM WORKSHOP:** exact `http://192.168.1.252:8000`; opens separately; local-network requirement must be communicated without claiming the Platform detects reachability.

No generic external-link abstraction, JavaScript handler, callback, popup API, return integration, route, or dependency is required or authorized. Browser back/navigation or closing/switching the opened context is the only return expectation.

### Google Sites external presentation/content boundary

For this Classroom Pilot, the exact destination `https://sites.google.com/ravennaschools.us/steminbobwarts/home-start` leads to the existing Google Sites classroom experience. Google Sites remains an external presentation/content system that presents or navigates existing classroom content including:

- graduation-year / grade-facing navigation;
- Goals;
- activity cards;
- Activity Directions;
- Side Paths;
- existing My STEM Work access;
- STEM Mission Start Form access;
- What I Learned Today access;
- other existing Google Sites classroom presentation/navigation already owned by that external system.

This describes a system boundary only. It does not identify Google or any other party as an accountable owner; assign an accountable governance, legal, privacy, product, technical, or operational party; transfer Platform data ownership; or resolve any PI-000 authority.

The launcher supplies only a semantic external-navigation link. It does not:

- import, read, write, synchronize, or ingest Google Sites or other external-source data;
- authenticate to Google Sites or change Google authentication;
- use Google Workspace or Google APIs;
- inspect Google Drive or Google Forms;
- store identifiers beyond the approved external destination;
- determine Goals, activities, grade, graduation year, Side Paths, evidence state, reflection state, or My STEM Work state.

This boundary does not authorize Mission Distribution, an Activity Registry, Google Workspace/API integration, synchronization, external-source ingestion, persistence, student-specific routing, teacher-to-student configuration, grade inference, Goal or activity ownership changes, or evidence/reflection integration.

## 6. Exact CSS Contract

The launcher must use these PB-002H-FIX-01-namespaced selectors:

- `.platform-school-start-launcher`
- `.platform-school-start-launch-grid`
- `.platform-school-start-launch-link`

Optional destination modifier classes are permitted only for presentation and must not encode state, ownership, grade, availability, completion, or routing.

Required CSS behavior:

- `.platform-school-start-launcher` spans the Student Home grid with `grid-column: 1 / -1`;
- the grid uses bounded columns based on `minmax(0, 1fr)`;
- the section, grid items, and anchors preserve `min-width: 0`;
- labels wrap without clipping, overlap, ellipsis that hides meaning, or page-level horizontal scrolling;
- every anchor has a minimum target height of `2.75rem` (44 CSS pixels at the root size) or greater;
- focus is visible and unobscured;
- hover is not the only affordance;
- keyboard and touchpad behavior require no pointer-only or timed gesture;
- icons, if later approved within the label treatment, are supplementary and never the only name;
- reduced-motion preferences are respected; no motion is required;
- the layout collapses responsively using the existing 800px and/or 520px breakpoint boundaries as appropriate;
- the 520px Student Home single-column rule remains compatible;
- no horizontal carousel, scroll rail, fixed minimum content width, or page-level `overflow-x` workaround is permitted.

Exact decorative values beyond these requirements remain implementation-review details.

## 7. Honesty and State Contract

The launcher uses exact fixed strings only. It consumes and creates no:

- grade or graduation-year state;
- Class Activity Library assignment or projection;
- Goal, activity, Mission, Side Path, or Directions state;
- Slides or Vids URL/copy/index state;
- project, work, evidence, continuation, availability, reflection, submission, or completion state;
- session, fixture, storage, cache, analytics, or tracking state.

Opening any destination does not mean assignment, start, selection, completion, submission, save, evidence, reflection, progress, availability, or tracking. The Platform must not claim that a destination loaded or that a student completed an external action.

## 8. Test Reconciliation Contract

### New focused test

Create only `tests/platform/pb-002h-fix-01-school-start-launcher.test.mjs` when implementation is separately authorized.

It must verify:

- exact three labels, destinations, and order;
- exact DOM placement after Current Goal and before Yesterday;
- exactly three anchors and no hidden/fourth/fallback action;
- semantic anchor markup;
- `target="_blank"` and `rel="noopener noreferrer"` on all three;
- Builder maps only to `../index.html`;
- Google Sites and Workshop strings match byte-for-byte;
- absence of handlers, routes, forms, buttons, state branches, grade/library logic, data sources, storage, fixtures, analytics, tracking, and dependencies;
- required CSS namespace and full-width placement;
- `minmax(0, 1fr)`, `min-width: 0`, wrapping, target height, responsive collapse, and absence of horizontal overflow patterns;
- PB-003A/B/C protected headings and regions remain present;
- PB-003B/C sections remain noninteractive and unchanged.

### Narrow PB-003A reconciliation

The existing broad no-`href` assertion in `tests/platform/pb-003a-student-home-experience.test.mjs` must be narrowed only enough to permit the approved launcher anchors.

The reconciled test must continue to prohibit links, actions, navigation, or forms inside protected Mission Choice and My STEM Work foundations. It must not globally remove noninteraction, honest-state, privacy, route, session, fixture, or structure protections.

### PB-003B/C protection

PB-003B, PB-003C, and PB-003C FIX test files remain unchanged. Their section-sliced assertions already permit a separate launcher outside their boundaries.

## 9. Regression and Manual Validation

### Inspection baseline

- Platform: **90/90 passed**.
- Workshop: **290/290 passed**.
- `git diff --check`: passed.

These are pre-implementation inspection baselines, not post-build acceptance.

### Required automated validation after an authorized build

- focused PB-002H-FIX-01 test;
- narrow PB-003A reconciliation test;
- full Platform suite;
- full Workshop suite;
- `git diff --check`;
- unrelated-file and allowlist verification.

### Required manual validation

- Google Sites permission and school-account behavior;
- Builder browser smoke without Builder modification;
- Workshop reachability on the classroom network;
- new-context and opener-isolation behavior for all three anchors;
- keyboard and touchpad operation;
- visible focus and accessible names/context;
- browser layout, wrapping, zoom, and no-horizontal-scroll inspection;
- Chromebook viewport validation;
- physical Chromebook acceptance for Google Sites, Builder, and Workshop.

No automated test may be reported as Google permission, classroom-network, or physical Chromebook validation.

## 10. Protected Systems and Forbidden-File List

The following are forbidden from modification:

- `platform/scripts/platform-session.mjs`;
- `platform/scripts/platform-fixtures.mjs`;
- `guardRoute()`, `ROUTES`, and route rendering outside the static insertion;
- existing storage keys and owners;
- authentication, role, refresh, and sign-out behavior;
- all PB-003B/C markup and test files;
- Builder `index.html`, Builder internals, behavior, routing, persistence, dependencies, and assets;
- every Workshop file, route, internal, behavior, persistence owner, dependency, and asset;
- Google Sites or any Google resource, account, content, or permission;
- dependencies and assets;
- PB-001, PB-002, parent PB-002H, PI-000, PI-001, PI-000H, and PI-000H-A contracts;
- unrelated application, test, documentation, configuration, or workspace files.

No PB-002G implementation may be combined with this build. PB-002G identifies `platform-app.mjs` and `platform.css` as future candidate files, creating a mixed-file coordination risk. If PB-002G application changes exist before this build, stop for inspection and explicit reconciliation rather than merging scopes implicitly.

## 11. Explicit Exclusions

- A fourth, hidden, fallback, generated, conditional, grade-specific, or activity-specific launcher control.
- Class Activity Library state, ownership, routing, assignment, projection, or implementation.
- Grade or graduation-year inference.
- Activity Registry, Mission Distribution, or teacher-to-student configuration.
- Student-specific or small-group routing.
- Platform Goal, Mission, activity, Side Path, Directions, Slides, Vids, project, evidence, reflection, continuation, availability, or completion behavior.
- Google authentication changes, API automation, file/copy creation, indexing, permission management, callback, tracking, or integration.
- Analytics, AI, personalization, recommendations, grading, ranking, prediction, or surveillance.
- New routes, handlers, state, storage, session keys, fixtures, cache, persistence, backend, synchronization, provider, API, schema, model, adapter, dependency, or asset.
- Builder or Workshop modifications.
- Production deployment or governance implementation.

## 12. Authority and Readiness Status

Class Activity Library Assignment Meaning, Class Assignment, and Record Owner authorities are not consumed by this reduced fixed launcher. They remain unresolved for future PI-000H work and are not invalidated.

The following applicable gates remain unresolved and implementation-blocking:

- Product/Content Authority;
- Privacy Authority;
- Accessibility/Content Authority;
- Technical Architecture Authority;
- Technical Operations Authority;
- External Google Resource Accountability;
- School/Classroom Operations Concurrence;
- Legal/District Concurrence where applicable.

Applicable PI-000/PI-001 stop conditions remain. No party is assigned and no decision is resolved by this document.

## 13. Remaining Blockers and Stop Conditions

Stop before implementation if:

- this reconciliation has not passed read-only review and explicit approval;
- any applicable authority or concurrence remains unassigned, unverified, or outside scope;
- Google Sites permission/account/browser behavior remains unvalidated;
- Builder browser behavior remains unvalidated;
- Workshop classroom-network/browser behavior remains unvalidated;
- physical Chromebook acceptance is incomplete;
- a candidate file differs materially from the inspected baseline or contains PB-002G/application changes;
- implementation requires a forbidden file, fourth control, route, handler, state, fixture, storage, backend, dependency, or protected-system change;
- separate explicit implementation authorization is absent;
- an applicable PI-000/PI-001 stop condition remains active.

**Current readiness:** `BLOCKED / NOT READY`.

## 14. Definition of Done

The future build is complete only when:

- this reconciliation is reviewed and approved;
- applicable authorities and concurrences are explicitly verified;
- a separate build gate authorizes exactly the allowlisted implementation;
- the launcher appears at the exact insertion point with exactly three anchors;
- labels, destinations, `target`, and `rel` match the contract exactly;
- no forbidden state, action, control, dependency, file, or behavior is introduced;
- the focused test and narrowly reconciled PB-003A test pass;
- full Platform and Workshop suites pass;
- `git diff --check` and exact allowlist verification pass;
- Google permission/account behavior, Builder smoke, Workshop classroom-network reachability, browser behavior, keyboard/touchpad use, responsive layout, and opener isolation are validated;
- physical Chromebook acceptance passes without horizontal scrolling;
- PB-003A/B/C, sessions, fixtures, routes, Builder, Workshop, and unrelated systems remain protected;
- implementation review passes;
- staging, commit, tag, push, and publication remain separately authorized.

## 15. Approval Meaning

Approval of this document would establish the reconciled implementation-contract documentation boundary and authorize only the next separately requested gate.

Approval would not assign authority, resolve governance, validate a destination, modify a file, authorize implementation, approve implementation readiness, permit protected-system changes, or override PI-000/PI-001 stop conditions.

## Exact Next Gate

`/REVIEW` — **PB-002H-FIX-01 School-Start Launcher Build Specification Inspection Reconciliation v1.0**
