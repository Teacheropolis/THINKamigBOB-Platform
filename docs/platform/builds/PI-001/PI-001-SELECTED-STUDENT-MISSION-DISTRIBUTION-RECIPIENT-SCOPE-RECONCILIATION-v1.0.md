# PI-001 — Selected-Student Mission Distribution Recipient-Scope Reconciliation v1.0

**Document Status:** Proposed reconciliation pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent Architecture:** PI-001 Mission Distribution  
**Teacher Consumer:** PB-002J Teacher Goal, Activity Mission, and Side Path Availability  
**Student Consumer:** PB-003B Mission Choice  
**Protected Systems:** PB-001; PB-002I; PB-003A through PB-003D; Builder; Workshop; authoritative student work

## 1. Purpose

Reconcile PI-001's class-wide recipient boundary with the approved future PB-002J direction for explicitly selected students.

This document defines the minimum privacy, roster-change, teacher-authority, visibility, lifecycle, correction, removal, and audit requirements that must exist before selected-student Mission distribution may be implemented.

It does not create recipients, distributions, assignments, catalogs, storage, routes, fixtures, APIs, synchronization, authentication, or student projection.

## 2. Controlling References

- PI-001 Mission Distribution Blueprint v1.0.
- PI-001 Mission Distribution Design Decisions v1.0.
- PI-001 Mission Distribution Build Specification v1.0.
- PI-000B Mission and Distribution Ownership Contracts v1.0.
- PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- PB-002J Teacher Goal, Mission, and Activity Availability Blueprint v1.0.
- PB-002J Teacher Goal, Mission, and Activity Availability Design Decisions v1.0.
- PB-002J Teacher Goal, Activity Mission, and Side Path Availability Scope Expansion Reconciliation v1.0.
- PB-003B Mission Choice Experience Blueprint and Design Decisions v1.0.

## 3. Reconciliation Boundary

PI-001 v1.0 remains the controlling class-wide Mission Distribution contract.

This reconciliation adds a proposed future recipient type:

- one or more explicitly selected students who are verified members of the teacher's currently authorized classroom.

It does not authorize:

- inferred recipients;
- groups, teams, cohorts, intervention labels, readiness categories, or adaptive audiences;
- distribution to students outside the teacher's authorized classroom;
- activity-level or Side Path availability ownership;
- implementation under the existing PI-001 v1.0 build specification; or
- production or Classroom Pilot use.

Until this reconciliation and all listed dependencies are separately approved, selected-student Mission distribution must fail closed.

## 4. Recipient Meaning

A selected-student recipient is an authoritative student identity explicitly chosen by an authorized teacher from the current verified classroom roster.

Recipient identity must not be inferred from:

- display name;
- initials;
- seat, group, table, or period;
- grade, age, behavior, performance, readiness, disability, or support status;
- activity history, evidence, progress, or analytics;
- browser state, fixtures, filenames, URLs, or Google resources; or
- a prior class or stale roster.

Display names may help the teacher recognize a student but cannot serve as authoritative identity.

## 5. Legitimate Classroom Purpose

Selected-student distribution exists only to let a teacher intentionally vary which approved Mission Start choices are available within an authorized classroom.

It must not become:

- grading or behavior management;
- hidden ability grouping;
- automated intervention;
- surveillance or recommendation logic;
- a public label or comparison;
- a substitute for accessibility accommodations owned elsewhere; or
- an inferred decision based on student data.

The product must communicate availability, not characterize the student.

## 6. Teacher Authority

Before recipient selection is enabled, the Platform must verify:

- the authenticated teacher identity;
- the current authorized classroom;
- the teacher's authority to manage Mission availability for that classroom;
- an authoritative current roster;
- the selected students' current membership in that classroom; and
- the distributable status of the selected Mission and version.

No action may proceed when authorization, classroom identity, roster membership, or Mission identity is missing, stale, conflicting, or unavailable.

Authority to distribute does not grant authority to edit Mission content, student identity, student work, evidence, reflection, progress, or completion.

## 7. Recipient Selection and Confirmation

Class-wide distribution remains the simplest and most prominent PI-001 flow.

Selected-student distribution must require an explicit change of recipient scope. Before confirmation, the teacher must be shown:

- the current classroom;
- that the scope is **Selected students**, not the entire class;
- the selected students in a reviewable form;
- the Mission identity, version, and student-safe title;
- the resulting effective Start choices for every affected student;
- any existing class distribution that supplies the baseline;
- additions, removals, replacements, and unchanged availability;
- any protected Continue work; and
- every validation conflict that prevents confirmation.

No recipient may be silently added, removed, expanded, or inferred. Select-all behavior, if later approved, must be explicit and must not silently change the scope into a class-wide distribution.

## 8. Relationship to Class-Wide Distribution

Selected-student distribution supplements the authoritative class-wide Mission availability baseline through explicit per-student additions and removals, consistent with the approved PB-002J product-level direction.

For a student `s`:

`effective Mission availability(s) = class-wide Mission availability + explicit additions(s) - explicit removals(s)`

This formula defines product meaning only. It does not select the authoritative record model or persistence technology.

Rules:

- An individual change must not rewrite the class-wide record.
- A class-wide change must identify affected individual records before confirmation.
- An individual record must identify its class baseline and applicable Mission version.
- One student, classroom, Mission, and Mission version may have no more than one active individual distribution relationship.
- A repeated submission of the same intended relationship must resolve idempotently to the existing active relationship rather than create a duplicate.
- A submission that would conflict with a concurrent create, update, replacement, or removal must fail visibly unless the authoritative lifecycle contract can safely apply the intended operation to the verified current version.
- Concurrent operations must never leave overlapping active individual relationships for the same student, classroom, Mission, and Mission version.
- A removal affects future Start availability only.
- Safety, legal, source, or destination restrictions cannot be bypassed by an individual addition.
- Conflict resolution must fail visibly rather than silently choosing one record.

### Current Classroom Focus

PI-001 preserves at most one class-wide current classroom focus. Selected-student distribution:

- does not create a personalized current focus;
- does not create a second classroom focus;
- does not rewrite or replace the class-wide focus; and
- does not infer another Mission as a replacement focus.

If the class-wide current focus is absent from a student's effective Start set because of an explicit individual removal, that Mission is not presented as the current focus for that student. The student's remaining Mission choices retain their ordinary order and none is promoted automatically. Verified Continue work remains ahead of focus and Start presentation under PB-003B.

## 9. Three-Choice and Continue Boundaries

PB-003B's maximum of three primary Mission Start choices applies per student after class-wide and selected-student records are resolved.

- A selected-student addition cannot create a fourth primary Start choice.
- Confirmation must stop and identify every affected student whose resulting set is invalid.
- Choices must not be silently hidden, rotated, ranked, or truncated.
- Verified Continue work does not consume a Start position.
- A Mission represented by verified Continue work must not appear as a duplicate Start choice for the same student.
- Removing Start availability must not delete, hide, reset, or reclassify verified Continue work.

Side Paths remain secondary under PB-003B and outside this Mission recipient-scope reconciliation.

## 10. Student Visibility and Dignity

The Student Dashboard may receive only the minimum effective Mission presentation required for the authenticated student.

Students must not see:

- another student's availability;
- recipient lists;
- whether their availability came from a class record or individual record;
- labels such as exception, override, intervention, advanced, behind, or support;
- teacher rationale, audit history, or roster information; or
- comparison, ranking, recommendation, or inferred reason.

The student experience states only which verified Missions are available, unavailable, or eligible to Continue. Honest empty and unavailable states must not expose private configuration details.

Selected-student information must never appear on Student Display, Smart Board, public classroom presentation, another student's route, or an unauthorized teacher surface.

## 11. Roster-Change Behavior

Roster membership must be revalidated before preview, confirmation, projection, restoration, correction, or removal.

When a student leaves the classroom:

- future Start projection from that classroom must stop;
- the record must not be silently reassigned to another student or classroom;
- verified existing work remains governed by the authoritative student-work owner;
- historical audit evidence remains subject to approved retention rules; and
- the teacher must receive an honest stale-recipient or membership-changed state.

When a student joins or rejoins the classroom:

- no prior individual distribution may be automatically recreated or reactivated;
- class-wide availability may apply only after authoritative membership is verified; and
- any individual availability requires a new explicit teacher decision unless a separately approved restoration rule authorizes otherwise.

Roster refresh, transfer, duplicate identity, merged identity, and concurrent roster-change behavior remain unresolved and must fail closed.

## 12. Lifecycle, Correction, and Removal

A selected-student distribution requires explicit lifecycle states capable of distinguishing, at minimum:

- draft or unconfirmed change;
- active future-Start availability;
- corrected or replaced availability;
- removed future-Start availability;
- expired availability, if expiration is later approved;
- stale or invalid recipient membership; and
- failed or conflicted confirmation.

Repeated confirmation of the same intended state must be idempotent and must not create duplicate distributions. Uniqueness must be enforced for the combination of student, classroom, Mission, and Mission version across create, update, replacement, restoration, and concurrent-operation paths.

Correction or removal must:

- identify the exact student, classroom, Mission, and version;
- preview the resulting effective availability;
- preserve verified Continue work;
- require explicit confirmation;
- be atomic for the selected recipient set;
- report partial transport or concurrency failure without presenting false success; and
- preserve audit history without silently rewriting the earlier decision.

A destructive default discard action is prohibited.

## 13. Persistence and Projection Requirements

The authoritative system must eventually provide:

- stable classroom, student, Mission, Mission-version, and distribution identities;
- durable class-wide and selected-student records;
- version-aware relationships;
- atomic and idempotent confirmation;
- concurrent-edit detection;
- authorized read and write boundaries;
- projection freshness and stale-state behavior;
- recovery from interruption and partial transport failure;
- retention, expiration, deletion, and restoration rules; and
- a minimum per-student projection to PB-003B.

Browser `sessionStorage`, `localStorage`, fixtures, PB-002I state, URL parameters, display names, and Google resource scraping are prohibited as authoritative persistence or identity.

No database, API, provider, storage model, synchronization mechanism, offline model, or adapter is selected by this document.

## 14. Audit Requirements

Every confirmed selected-student distribution, correction, replacement, removal, or failed atomic operation must be traceable to:

- authenticated actor;
- authorized classroom;
- authoritative recipient identities;
- Mission identity and version;
- operation type;
- prior effective state;
- intended resulting state;
- confirmation time;
- outcome and conflict status; and
- source record versions needed to explain the decision.

A rationale may be collected only if separately approved as necessary. It must not solicit sensitive student information or become visible to students or unauthorized users.

Audit access, retention, deletion, export, correction, and legal-hold requirements remain unresolved.

## 15. Privacy and Accessibility Requirements

Before implementation, approved authorities must determine:

- the minimum student and roster data required;
- permitted purposes and prohibited uses;
- who may view and change recipient scope;
- whether local privacy concurrence is required;
- retention and deletion behavior;
- student and family rights where applicable;
- exposure and incident-response behavior; and
- accessibility requirements for roster selection, review, conflict resolution, and confirmation.

The interface must support keyboard and touchpad operation, visible focus, programmatic labels, non-color-only status, clear recipient counts, error summaries, and Chromebook-responsive review without horizontal scrolling.

No privacy, accessibility, security, district, legal, or student-dignity safeguard is waived.

## 16. Ownership and Authority Status

No accountable party or technology is assigned by this reconciliation.

The following remain **UNASSIGNED / UNRESOLVED**:

- Mission catalog owner;
- Mission Distribution owner;
- classroom and roster authority;
- selected-student recipient authority;
- individual distribution record owner;
- privacy authority and applicable concurrence;
- student projection owner;
- technical architecture and operations authority;
- audit owner;
- retention and deletion authority; and
- Legal/District applicability determination and concurrence when applicable.

Existing approved governance-layer separation remains controlling. Product authority, district deployment authority, and teacher classroom configuration must not be conflated.

## 17. Explicit Exclusions

This reconciliation does not authorize:

- implementation or a build specification;
- curriculum, Mission, Goal, Activity Mission, or Side Path content;
- Activity Mission or Side Path recipient distribution;
- groups, teams, cohorts, accommodations, interventions, or inferred categories;
- adaptive assignment, recommendations, AI, analytics, ranking, grading, or behavior scoring;
- Mission launch or student-work creation;
- evidence, reflection, progress, completion, or Teacher Feed behavior;
- production persistence, authentication, APIs, synchronization, or Google integration;
- new routes, sessions, fixtures, frameworks, dependencies, or adapters;
- changes to PB-002I, PB-003B, PB-003C, Builder, or Workshop; or
- cross-grade selection.

## 18. Required Decisions Before Build Planning

Implementation planning remains blocked until separate approvals resolve:

1. Authoritative classroom and roster owner.
2. Teacher authorization source and scope.
3. Individual distribution record owner.
4. Mission Distribution owner and authoritative Mission catalog.
5. Privacy purpose, minimum data, access, retention, deletion, and concurrence.
6. Roster join, leave, transfer, duplicate, merge, and rejoin behavior.
7. Lifecycle, expiration, correction, removal, restoration, and idempotency.
8. Concurrent class and individual edit policy.
9. Persistence, API, synchronization, offline, and recovery technology.
10. Minimum student projection contract and freshness behavior.
11. Audit ownership, access, retention, correction, and deletion.
12. Accessibility and Chromebook interaction acceptance criteria.
13. Legal/District applicability and concurrence when applicable.
14. Exact teacher entry point and focused implementation manifest.

## 19. Implementation Readiness and Stop Conditions

**Implementation Status:** `BLOCKED / NOT AUTHORIZED`.

Stop before implementation if work would require:

- an unverified teacher, classroom, roster, student, Mission, or version;
- inferred recipient membership or categorization;
- browser state or fixtures as authority;
- exposure of one student's availability to another student or public display;
- more than three effective primary Start choices;
- overlapping active individual distribution relationships for the same student, classroom, Mission, and Mission version;
- a personalized, duplicated, rewritten, or inferred current classroom focus;
- deletion or hiding of verified Continue work;
- an unapproved owner, lifecycle, privacy rule, authority, or technology;
- Activity Mission or Side Path distribution;
- a new route, fixture, storage system, API, synchronization mechanism, or authentication behavior;
- Builder or Workshop modification; or
- implementation under the existing class-wide PI-001 v1.0 build specification.

## 20. Acceptance Criteria

This reconciliation is ready for approval when review confirms that it:

- preserves class-wide PI-001 v1.0 as the current authorized scope;
- defines selected-student Mission distribution as a separately governed future recipient type;
- requires explicit authorized selection without inference;
- defines the relationship between class-wide and individual availability;
- permits only one active individual distribution relationship per student, classroom, Mission, and Mission version;
- preserves one class-wide current classroom focus without personalized or inferred replacement;
- protects the three-choice and Continue boundaries;
- defines privacy-safe student visibility;
- defines fail-closed roster-change behavior;
- defines lifecycle, correction, removal, persistence, projection, and audit requirements;
- separates Mission distribution from Activity Mission and Side Path availability;
- assigns no owner or technology;
- preserves all protected systems; and
- authorizes no implementation.

## 21. Exact Next Gate

`/REVIEW` — **PI-001 Selected-Student Mission Distribution Recipient-Scope Reconciliation v1.0**
