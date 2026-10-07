# PI-000J — Classroom Pilot Navigation Implementation Boundary v1.0

**Document Status:** Proposed; pending read-only review and explicit approval  
**Implementation Status:** `BLOCKED / NOT READY` and unauthorized  
**Boundary Type:** Temporary Classroom Readiness Sprint implementation category  
**Parent Governance:** Approved PI-000I and approved controlling PI-000I-A layered interpretation

## 1. Purpose and Non-Waiver

PI-000J defines a narrowly bounded Classroom Pilot implementation category for presentation/navigation work that does not exercise production data, integration, persistence, identity, distribution, or automation architecture.

PI-000J does not waive, replace, invalidate, or mark complete PI-000I, PI-000I-A, PI-000H-A, PI-000G-A, PI-001, PB-002H-FIX-01 governance, or any existing authority register. It distinguishes a temporary classroom-pilot implementation decision from production/commercial product release and deployment readiness.

Until PI-000J passes review and explicit approval, existing gates remain controlling. Approval of PI-000J alone would not authorize a build.

## 2. Classroom Pilot Eligibility Contract

A build qualifies only when **all** of the following remain true:

- classroom-pilot use only;
- presentation/navigation functionality only;
- no new student-data collection;
- no new student-data processing;
- no new persistence;
- no cloud storage;
- no authentication changes;
- no Google API;
- no external-data ingestion;
- no synchronization;
- no analytics;
- no AI;
- no Mission Distribution;
- no Activity Registry;
- no student-specific routing;
- no protected-system modification;
- every enabled destination has existing physical validation evidence;
- focused and regression protection remains mandatory.

Eligibility is indivisible: if any condition fails, the build immediately exits PI-000J and returns to the applicable normal product/deployment governance gate before further planning or implementation.

## 3. Governance Status Separation

### Classroom Pilot Implementation

A qualifying build may become eligible for a separately authorized, tightly allowlisted classroom-pilot implementation. Eligibility is not implementation authorization.

### Production or Commercial Release

Production/commercial governance remains incomplete. Production release, reuse beyond the approved pilot, broader deployment, commercialization, materially different destinations, persistent configuration, integrations, or productized administration require the applicable PI-000I/PI-000I-A product and deployment governance.

This distinction preserves:

- PI-000I and PI-000I-A;
- existing authority registers;
- all original `UNASSIGNED`, `UNRESOLVED`, `NOT PROVIDED`, and approval statuses;
- evidence provenance and audit history;
- the reviewed but not separately approved Ravenna STEM Technology Deployment Authority Record;
- all privacy, security, accessibility, legal/district, external-service, data-governance, and architecture safeguards.

No unresolved production/commercial decision is marked resolved by PI-000J.

## 4. PB-002H-FIX-01 Eligibility Evaluation

### Exact pilot controls

PB-002H-FIX-01 contains exactly three static navigation controls:

1. **GO TO MY STEM MISSIONS**  
   Destination: `https://sites.google.com/ravennaschools.us/steminbobwarts/home-start`
2. **STEM BUILDER**  
   Destination: existing approved repository-root Builder entry
3. **STEM WORKSHOP**  
   Pilot destination: `http://192.168.1.252:8000`

### Confirmed qualifying boundaries

- static semantic navigation only;
- no new student data or data processing;
- no Google API, authentication, ingestion, or synchronization;
- no persistence, storage, analytics, or AI;
- no grade or Class Activity Library inference;
- no Mission Distribution or Activity Registry;
- no student-specific routing or configuration;
- no Builder or Workshop modification;
- no Platform route, session, fixture, authentication, or storage change;
- no protected-system modification;
- destinations and classroom environment have teacher-performed physical operational validation recorded as `COMPLETE PASS`;
- existing regression and protected-test requirements remain mandatory.

### Eligibility determination

**PB-002H-FIX-01 QUALIFIES for the PI-000J Classroom Pilot boundary on its documented technical and operational facts.**

This determination means only that the implementation may use the temporary pilot category after the remaining pilot-specific gates in Section 9 are satisfied. It does not authorize implementation, production release, commercialization, or broader deployment.

## 5. Exact PB-002H-FIX-01 Implementation Boundary

Any separately authorized pilot implementation is limited to exactly these four files:

1. `platform/scripts/platform-app.mjs` — only the approved `studentDashboardView(state)` static insertion.
2. `platform/styles/platform.css` — only PB-002H-FIX-01-namespaced presentation styles.
3. `tests/platform/pb-002h-fix-01-school-start-launcher.test.mjs` — one new focused test.
4. `tests/platform/pb-003a-student-home-experience.test.mjs` — one narrow assertion reconciliation only.

No other file may be created or modified. The approved DOM placement, exact labels/order/destinations, exactly-three-anchor count, `target="_blank"`, `rel="noopener noreferrer"`, CSS namespace, responsive behavior, 44px target, PB-003B/C protection, and no-handler/no-state contract remain controlling.

## 6. Production and Commercial Governance Deferred

The following remain unresolved for production/commercial release and are neither bypassed nor completed:

- reusable product-layer accountable assignments and acceptances;
- product Security and legal/compliance decisions where applicable;
- reusable release, support, compatibility, and external-resource ownership decisions;
- production deployment overlays and commercial change-control terms;
- any governance needed by a future configuration abstraction, additional destinations, persistence, API, integration, or broader audience;
- original authority-register statuses and audit reconciliation.

PI-000J cannot be cited as evidence that production governance is complete.

## 7. Post-Build Validation and Classroom Acceptance

After a separately authorized build and before classroom acceptance, all of the following are mandatory:

- focused PB-002H-FIX-01 tests;
- full Platform regression;
- full Workshop regression;
- `git diff --check`;
- exact four-file allowlist verification;
- browser inspection;
- physical Chromebook launcher UI validation.

The physical launcher UI validation must confirm:

- exactly three controls;
- correct placement after Current Goal and before the existing informational foundations;
- minimum 44px interactive targets;
- no horizontal scrolling;
- keyboard usability;
- touchpad usability;
- correct new-context and opener-isolation behavior;
- exact approved destinations;
- no dead-end controls.

Teacher-performed destination/environment validation is already recorded `COMPLETE PASS`. It does not claim acceptance of the not-yet-built launcher UI. Only the narrow post-build UI validation must be completed unless the earlier evidence becomes stale or the relevant boundary changes.

## 8. Stop Conditions

Stop immediately and return to the applicable normal governance gate if implementation requires or introduces:

- new data ownership or student-data behavior;
- new storage, persistence, or cloud storage;
- new authentication or authorization behavior;
- a new route;
- new session state or storage key;
- new or modified fixtures;
- Google APIs, authentication, or data access;
- external-source ingestion or synchronization;
- Mission Distribution;
- an Activity Registry;
- student-specific configuration or routing;
- analytics, AI, tracking, personalization, grading, ranking, or surveillance;
- a Builder-internal change;
- a Workshop-internal change;
- a protected-system change;
- any file outside the exact four-file boundary;
- a fourth, hidden, conditional, generated, grade-specific, activity-specific, fallback, unvalidated, or dead-end control.

Also stop if a destination, validation result, pilot approval, implementation authorization, or required authority would need to be invented or inferred.

## 9. Remaining Classroom Pilot Blockers

PB-002H-FIX-01 is technically eligible but remains blocked from implementation until:

1. PI-000J passes read-only review and explicit approval.
2. The already-reviewed PB-002H-FIX-01 Ravenna STEM Technology Deployment Authority Record receives its separate explicit approval; until then its evidence is not final.
3. A read-only pilot readiness check confirms the approved PI-000J boundary, Ravenna approval status, unchanged candidate files, and absence of mixed-file conflicts.
4. A separate explicit `/BUILD` authorization permits exactly the four-file classroom-pilot implementation.

No production/commercial product-role assignment is made or marked complete by these pilot gates. If the exact Ravenna authority record is not approved, the hardcoded Ravenna destinations remain an implementation blocker for this exact artifact.

## 10. Evidence and Authority Meaning

- Operational validation establishes access and usability evidence, not product authority.
- Ravenna deployment authority evidence may authorize local pilot use only after its separate approval.
- Teacher classroom operation does not assign privacy, security, accessibility, architecture, operations, product, or legal authority.
- PI-000J approval establishes the temporary category, not an accountable party.
- A separate build authorization establishes permission to implement the bounded pilot, not production/commercial release authority.

## 11. Approval Meaning

Approval of PI-000J would establish:

- the temporary Classroom Pilot eligibility rules;
- the technical eligibility of PB-002H-FIX-01 under the documented facts;
- the exact four-file maximum implementation boundary;
- the post-build validation and fail-closed requirements;
- the separation between bounded classroom-pilot implementation and unresolved production/commercial governance.

Approval would not:

- authorize implementation;
- approve the downstream Ravenna authority record automatically;
- assign or infer an authority;
- approve Ravenna policy, K applicability, privacy policy, product release, or commercialization;
- modify an existing register status;
- waive PI-000I, PI-000I-A, FERPA, COPPA, applicable law, privacy, security, accessibility, district policy, external-service restrictions, data governance, or architecture safeguards;
- authorize integration, persistence, data behavior, Builder/Workshop changes, staging, committing, tagging, pushing, or publication.

## 12. Implementation Prohibition

This document is specification/governance documentation only. No application or test change is authorized. Implementation remains `BLOCKED / NOT READY` until every pilot-specific gate in Section 9 is separately completed.

## Exact Next Gate

`/REVIEW` — **PI-000J Classroom Pilot Navigation Implementation Boundary v1.0**
