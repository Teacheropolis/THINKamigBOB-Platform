# PB-002J — Teacher Goal, Mission, and Activity Availability Build Specification v1.0

**Document Status:** Proposed specification pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent System:** PB-002 — Teacher Command Center  
**Student Consumer:** PB-003 Student Dashboard and PB-003B Mission Choice  
**Architecture Dependencies:** PI-000B, PI-000H, PI-001  
**Protected Systems:** PB-001; PB-002A through PB-002I; PB-003A through PB-003D; Builder; Workshop

## 1. Controlling References

- PB-002J Teacher Goal, Mission, and Activity Availability Blueprint v1.0 — approved final reconciliation.
- PB-002J Teacher Goal, Mission, and Activity Availability Design Decisions v1.0 — approved final reconciliation.
- PB-002J Teacher Goal, Activity Mission, and Side Path Availability Scope Expansion Reconciliation v1.0 — approved final reconciliation.
- PI-001 Selected-Student Mission Distribution Recipient-Scope Reconciliation v1.0 — approved final reconciliation.
- PB-003B Mission Choice Experience Blueprint, Design Decisions, and Build Specification v1.0.
- PI-000B Mission and Distribution Ownership Contracts.
- PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- PI-001 Mission Distribution Blueprint, Design Decisions, and Build Specification v1.0.
- PB-002I Teacher Command Center Today’s Mission Classroom Pilot Build Specification v1.0.
- Platform Blueprint v1.0 and Development Standards v1.0.
- `THINKamigBOB_Activity_Templates_Grade_Goal_Prep_Guide (1).docx`, identified as a future curriculum and preparation reference but not verified in the repository when this specification was created.

No Goal, Mission, Activity Mission, Side Path, preparation fact, identity, authority, provider, or technology may be inferred from an unavailable or unverified source.

## 2. Pre-Implementation Status and Stop Gate

This specification defines a future implementation contract. It does not make PB-002J ready to build.

Implementation must not begin until separate approved decisions establish at least:

- the authoritative curriculum-catalog owner and verified source;
- stable Goal, Mission, Activity Mission, and Side Path identities and version rules;
- the instructional Grade 3–6 configuration owner and lifecycle;
- the relationship, if any, between instructional grade and PI-000H Activity Library assignment;
- the Mission Distribution owner and applicable PI-001 implementation contract;
- the authoritative classroom and roster owner, teacher authorization source, and selected-student recipient authority;
- the individual distribution record owner and its relationship to the class-wide distribution baseline;
- the separate activity-availability owner, record meaning, authority, lifecycle, persistence, audit, removal, and projection contract;
- class authorization and authoritative class context;
- ordering, conflict, idempotency, correction, replacement, removal, expiry, restoration, and stale-state behavior;
- persistence, synchronization, offline, refresh, and cross-device technology;
- current classroom-focus meaning;
- maximum Activity Missions per Goal and Side Path activities per topic;
- preparation and safety presentation or acknowledgement decisions;
- student-projection transport and freshness;
- privacy, accessibility, security, legal, district-deployment, and external-resource requirements as applicable; and
- a read-only pre-implementation repository inspection followed by explicit implementation authorization.

If any required owner, record, source, lifecycle rule, or technology is missing, contradictory, or unsafe, stop. Do not substitute fixtures, browser storage, PB-002I state, titles, filenames, card positions, Google resource scraping, or hardcoded curriculum data.

## 3. Build Objective

Implement a protected, teacher-controlled workflow that allows an authorized teacher to configure an entire authorized class or one or more explicitly selected students by:

1. choose an authorized class;
2. explicitly choose Grade 3, Grade 4, Grade 5, or Grade 6 instructional context;
3. select one or multiple approved Goals as curriculum organizers;
4. explicitly select approved Activity Missions under each selected Goal;
5. explicitly select approved Side Path topics and activities as secondary choices;
6. choose class-wide or selected-student recipient scope;
7. review verified classroom-preparation information;
8. preview the effective availability for every affected student; and
9. explicitly confirm the applicable authoritative availability changes.

Students must receive only the confirmed, current, authorized projection. PB-003B must preserve Continue-first presentation and no more than three primary Start choices backed by verified student-startable Mission records.

## 4. Primary Users

### Teacher

An authenticated teacher authorized for the active class.

Teacher goal:

> Prepare a class by choosing approved Goal organizers and only the student-startable Activity Missions and secondary Side Path activities the classroom is ready to support, then verify exactly what students will see before confirming.

### Student

An authenticated student authorized for the class and viewing the existing Student Dashboard and PB-003B Mission Choice experience.

Student goal:

> Continue verified current work first or choose from the student-startable Missions and secondary Side Path activities my teacher has made available.

## 5. Required End-to-End Flow

```text
Protected Teacher Command Center
→ Verified Authorized Class
→ Explicit Instructional Grade
→ Verified Curriculum Catalog
→ Select Goal Organizer(s)
→ Select Activity Missions Under Each Goal
→ Select Secondary Side Path Topics and Activities
→ Choose Entire Class or Selected Students
→ Review Verified Preparation Facts
→ Resolve and Preview Effective Per-Student Availability
→ Explicit Confirmation
→ Authoritative Class and Individual Availability State
→ Verified Student Projection
→ PB-003B Continue-First Presentation
```

Opening, filtering, checking, selecting, or previewing an item must modify draft review state only. None of those actions makes content student-visible.

## 6. Included Scope

Implement only:

- one prominent protected PB-002J entry point in the Teacher Command Center;
- persistent orientation to the current authorized class and period;
- explicit Grade 3–6 instructional-context selection;
- read-only catalog presentation from the approved authoritative source;
- one or multiple Goal-organizer selections without treating the organizer itself as a Start choice;
- explicit student-startable Activity Mission selection grouped by parent Goal;
- explicit Side Path topic and Side Path activity selection as secondary availability;
- verified, version-aligned preparation information;
- guided-class and independent-progression behaviors without forced sequence;
- complete teacher preview of the proposed student-visible set;
- explicit atomic confirmation and replacement behavior;
- authoritative restoration after refresh and across supported devices;
- honest loading, empty, unavailable, stale, conflict, success, and failure states;
- minimum student-safe projection to PB-003/PB-003B;
- preservation of verified Continue work outside the three Start choices;
- class-wide availability and explicit selected-student additions and removals;
- effective per-student availability review before confirmation;
- one active individual Mission distribution relationship per student, classroom, Mission, and Mission version;
- preservation of one class-wide current classroom focus without personalized replacement;
- teacher and student role protection;
- accessible and Chromebook-responsive controls;
- focused PB-002J tests and required regressions; and
- implementation notes and completion evidence.

## 7. Explicit Exclusions

Do not implement:

- curriculum authoring, editing, generation, normalization, publishing, or deletion;
- invented Goal, Mission, Activity Mission, Side Path, preparation, or destination data;
- title-derived identity;
- more than three primary Start mission choices;
- View All Missions without a separate approved contract;
- cross-grade confirmation, persistence, or projection before the required approvals;
- groups, teams, cohorts, inferred categories, differentiated automation, or adaptive availability;
- automatic activity selection;
- forced student sequence, mastery, readiness, or completion logic;
- AI, analytics, recommendations, personalization, ranking, grading, or behavior scoring;
- procurement, inventory, kit checkout, scheduling, or room assignment;
- student-work, project, evidence, reflection, progress, or completion ownership;
- new Builder or Workshop behavior, routing, formats, persistence, or authorization;
- Google API, Google Workspace integration, scraping, or synchronization;
- replacement of the Classroom Pilot Google Sites workflow;
- new authentication, public surfaces, routes, fixtures, providers, dependencies, backends, databases, APIs, or storage unless separately inspected and approved; or
- reinterpretation of PB-002I as authoritative availability.

## 8. Authoritative Data Contracts

### 8.1 Class Context

Consume only an authoritative class context that verifies teacher authority and student membership. Keep class and period visible. Unresolved or unauthorized context fails closed.

Changing class must discard or safely isolate the prior class’s unconfirmed draft and load only authoritative state belonging to the newly verified class.

### 8.2 Instructional Grade

Store and restore explicit Grade 3, Grade 4, Grade 5, or Grade 6 instructional configuration only through its approved owner.

Do not infer grade. Do not treat it as student identity. Do not automatically create, change, validate, or remove a PI-000H Grade 3/4 or Grade 5/6 Activity Library assignment.

Cross-grade selection is a proposed future capability and remains unauthorized. If the explicitly selected catalog grade crosses the authoritative ordinary instructional context, confirmation, persistence, and student projection must fail closed. No cross-grade choice may become authoritative or student-visible until product, curriculum/safety, school-operations, and accessibility approvals determine whether and how it may operate.

### 8.3 Curriculum Catalog

Read verified catalog facts including:

- stable Goal organizer identity and version;
- explicit authoritative fact stating whether any Goal is also independently a distributable Mission;
- approved teacher and student titles and descriptions;
- stable student-startable Activity Mission identity and version;
- Grade-to-Goal and Goal-to-Activity-Mission relationships;
- eligibility, retirement, and availability facts;
- verified preparation requirements; and
- approved Builder, Workshop, or other destination relationships.

The UI must not mutate the catalog.

A Goal is a curriculum organizer by default. Selecting it does not create a primary Start choice and does not expose every related Activity Mission. A Goal counts toward the three-primary-choice ceiling only when the authoritative catalog explicitly establishes that exact Goal identity and version as an independently distributable, student-startable Mission record.

### 8.4 Mission Distribution

Use the approved PI-001 owner for mission-level class availability, explicit selected-student additions and removals, Start order, the single optional class-wide current classroom focus, actor, lifecycle, confirmation, and student projection.

Selected-student Mission distribution must follow the approved PI-001 recipient-scope reconciliation. It must use authoritative student identity and current roster membership, permit only one active individual relationship per student, classroom, Mission, and Mission version, and prevent duplicate or overlapping active records through idempotent and conflict-safe operations.

### 8.5 Activity Availability

Use the separately approved owner for class-wide and selected-student Activity Mission and Side Path availability, parent relationships, identity and version, actor, ordering if meaningful, lifecycle, confirmation, removal, and projection.

Mission availability must not implicitly expose all related activities.

### 8.6 Selected-Student Recipient Context

Consume only authoritative student identities from the current verified classroom roster. Do not infer recipients from names, grade, behavior, performance, readiness, disability, support status, activity history, fixtures, browser state, or visual grouping.

For student `s`, the effective availability calculation is:

`effective availability(s) = class availability + explicit additions(s) - explicit removals(s)`

Individual changes must not rewrite the class baseline. Class changes must identify affected individual records before confirmation. Safety, legal, source, destination, and preparation restrictions cannot be bypassed by an individual addition.

### 8.7 Student Work

Consume verified Continue state from the authoritative student-work owner. PB-002J must not create, alter, rank, or infer work.

## 9. Teacher Workflow Requirements

### Step 1 — Choose Class

- Show only classes the authenticated teacher may manage.
- Clearly show the active class and period.
- Prevent continuation when authority cannot be verified.
- Never carry another class’s selections into the active class.

### Step 2 — Choose Instructional Grade

- Require an explicit Grade 3, 4, 5, or 6 choice.
- Provide no inferred or silent default.
- Clearly distinguish this choice from Activity Library assignment.
- Changing grade must identify selections that become invalid and follow the approved replacement/conflict rules.
- Do not infer any student's grade or ordinary instructional context.
- Identify an explicit cross-grade choice honestly, but keep confirmation, persistence, and projection unavailable while cross-grade approval remains unresolved.

### Step 3 — Select Goal Organizer(s)

- Show only verified catalog entries valid for the selected context.
- Display approved title and version.
- Permit one or multiple selections.
- Prevent duplicate stable identities.
- Distinguish authoritative saved state from draft edits.
- Treat each Goal as an organizer unless the authoritative catalog explicitly identifies it as an independently distributable, student-startable Mission.
- Do not count an organizer-only Goal toward the three-primary-choice ceiling.
- Do not implicitly expose every Activity Mission related to a selected Goal.

### Step 4 — Select Activity Missions

- Show student-startable Activity Missions only under their verified parent Goal.
- Require explicit Activity Mission choices; select none by default.
- Preserve draft choices while the teacher reviews another selected Goal.
- Keep retired, missing, version-invalid, non-startable, or unavailable Activity Missions non-actionable.
- Enforce the separately approved maximum Activity Missions per Goal.
- Prevent confirmation that would expose more than three verified student-startable Mission records as primary Start choices.
- Do not count verified Continue work toward those three Start choices.
- Do not silently hide, rotate, or truncate a fourth Start choice.

### Step 5 — Select Side Paths

- Show only verified Side Path topics and their verified activities.
- Keep Side Paths secondary to the three primary Mission Start choices.
- Do not let Side Paths displace, imitate, or bypass primary Start choices.
- Require explicit Side Path activity selection; select none by default.
- Keep the separately approved Side Path browsing and presentation limit fail closed while unresolved.

### Step 6 — Choose Recipient Scope

- Keep class-wide configuration the simplest and most prominent flow.
- Require an explicit switch to **Selected students** before individual configuration.
- Show only authoritative current roster members the teacher is authorized to manage.
- Do not infer, recommend, group, or categorize recipients.
- Review additions and removals relative to the class baseline.
- Revalidate roster membership before preview and confirmation.
- Keep selected-student details off Student Display and all public classroom presentation.

### Step 7 — Review Preparation

- Present only verified, version-aligned preparation facts.
- Identify missing facts as unavailable, never as “no preparation required.”
- Associate each requirement accessibly with the affected activity.
- Do not declare the classroom ready.
- Implement confirmation, acknowledgement, warning, or information-only behavior only after the pending product and safety decision is approved.

### Step 8 — Preview Student Experience

Show the complete resulting student-visible set, including:

- class-safe orientation;
- selected Goal organizers and explicitly selected student-startable Missions;
- exact Start order;
- current classroom focus, if approved and selected;
- explicitly selected activities;
- secondary Side Path availability;
- recipient scope and the effective availability for every affected student;
- verified student-safe descriptions and work-environment relationships;
- the Missions First reminder when applicable; and
- honest unavailable states.

Do not show teacher-only preparation notes, readiness gaps, audit facts, rankings, inferred progress, or fabricated content.

When the class-wide current focus is unavailable in a student's effective Start set, do not present it as that student's focus and do not infer a replacement. Preserve ordinary choice order and Continue-first behavior.

### Step 9 — Confirm Availability

- Require explicit confirmation.
- Reverify class authority, identities, versions, eligibility, preparation state as required, current authoritative state, and conflict status.
- Fail closed when an unresolved cross-grade selection is present; do not persist or project any part of that proposed change.
- Apply the mission-level and activity-level changes atomically according to the approved coordination contract.
- Apply a repeated identical confirmation exactly once.
- Prevent more than one active individual Mission distribution relationship for the same student, classroom, Mission, and Mission version.
- Reject stale or concurrent operations that cannot safely apply to the verified current state.
- Show success only after authoritative confirmation.
- On failure, preserve the last authoritative set and retain or safely recover the teacher’s draft according to approved rules.

## 10. Student Projection Requirements

PB-003/PB-003B remains the student presentation consumer and must not mutate availability.

Student presentation must:

1. show one verified Continue item first when available;
2. show up to three primary Start choices backed by verified student-startable Mission records;
3. optionally emphasize no more than one approved current classroom focus;
4. show only Activity Missions explicitly available under their verified parent Goal;
5. keep Side Paths secondary to primary Start choices;
6. expose only the authenticated student's effective availability without identifying class or individual source;
7. omit the class-wide focus when it is unavailable to that student without inferring another focus;
8. use exact approved student-safe copy;
9. keep invalid or unavailable items non-actionable; and
10. refresh only from the authoritative projection.

Verified Continue work is separate from the three primary Start choices and does not consume one of those positions.

For one active student-startable Mission, `YOUR MISSION: [approved title]` is permitted. Multiple active Missions require separately approved plural or choice-oriented copy. Organizer-only Goals must not be presented as Start choices.

## 11. Classroom Operating Behaviors

### Guided-Class Behavior

- One verified student-startable Mission may receive the single class-wide focus emphasis.
- Only teacher-selected activities are available.
- The system does not force or automatically launch an activity.

### Independent-Progression Behavior

- Multiple verified student-startable Missions may be available within the three-Start-choice ceiling; organizer-only Goals do not consume Start positions.
- Only teacher-selected activities are available under each.
- The system does not infer order, mastery, readiness, or completion.

Final interface labels remain deferred.

## 12. Lifecycle, Conflict, and Removal Requirements

The implementation must follow separately approved rules for:

- draft creation and abandonment;
- atomic create and replacement;
- version conflict and concurrent teacher action;
- idempotent repeated confirmation;
- ordering and current-focus replacement;
- correction and removal;
- expiration and restoration;
- catalog retirement or version change;
- stale preparation information;
- offline or interrupted operations;
- refresh and cross-device freshness;
- audit and retention; and
- preservation of existing student work.

Selected-student lifecycle must also enforce one active relationship per student, classroom, Mission, and Mission version; explicit roster revalidation; atomic recipient-set changes; privacy-safe correction; and fail-closed join, leave, transfer, duplicate, merge, and rejoin behavior.

Removal may affect future availability only as authorized. It must not delete mission definitions, activity definitions, student work, projects, evidence, or reflection.

## 13. Honest States and Feedback

Provide accessible, non-actionable states for:

- no authorized class;
- no instructional grade;
- catalog unavailable;
- no eligible Goal organizer or student-startable Mission;
- no selected Goal organizer or Activity Mission;
- no selected activity;
- no valid activity;
- preparation unavailable or stale;
- unsaved edits;
- conflicting or stale authoritative state;
- confirmation, replacement, correction, or removal failure;
- no student-visible choices;
- projection unavailable;
- functional destination unavailable;
- no authorized students or no recipient selected;
- stale or changed roster membership;
- invalid effective per-student choice set;
- duplicate individual relationship; and
- unavailable class-wide focus in the student's effective Start set.

Never replace missing facts with fixtures, stale cached assumptions, universal fallbacks, or enabled placeholders.

## 14. Privacy, Security, and Governance Requirements

- Keep class-wide and selected-student recipient scopes explicit and visibly distinct to the teacher.
- Enforce teacher and student role boundaries.
- Expose only the minimum student-safe projection.
- Do not show teacher preparation, audit, or authority details to students.
- Do not expose another class’s configuration.
- Do not expose one student's configuration, recipient status, or override source to another student or public display.
- Do not infer student identity, grade, readiness, ability, or progress.
- Protect private identifiers and use classroom-safe display labels.
- Require approved safe-link and opener behavior for external destinations.
- Keep product, district deployment, and classroom configuration governance separate.
- Preserve all applicable privacy, security, accessibility, legal, and district requirements.

## 15. Accessibility and Chromebook Requirements

- Use semantic headings, groups, labels, controls, and status regions.
- Provide visible focus and logical keyboard order.
- Do not require drag-and-drop for ordering or selection.
- Communicate selected, unavailable, stale, invalid, and unsaved states without color alone.
- Associate errors and preparation messages with affected controls.
- Announce confirmation results accessibly without disruptive focus loss.
- Maintain targets of at least 44 by 44 CSS pixels.
- Support keyboard and touchpad operation.
- Remain usable at 1204×695 CSS pixels and DPR 1.25.
- Avoid horizontal scrolling and preserve readable lists, review panels, and dialogs.
- Preserve zoom, reflow, contrast, reduced-motion, and screen-reader usability.

## 16. Classroom Pilot and Production Boundary

The current Classroom Pilot remains unchanged:

- PB-002I provides one session-only teacher announcement;
- the Student Dashboard retains its three-control launcher;
- Google Sites remains the pilot curriculum presentation and navigation system; and
- teachers retain the approved manual classroom routine.

PB-002J is a future production/integrated Platform specification. It does not authorize adding its controls to the Classroom Pilot or replacing the pilot workflow.

## 17. Protected Systems

Preserve without modification unless a later inspected implementation surface explicitly requires and authorizes a narrow consumer reconciliation:

- PB-001 authentication, routing, session, class-context, and role foundations;
- PB-002A through PB-002I;
- PB-003A through PB-003D;
- PB-003B Continue/Start ownership and presentation rules;
- PB-003C My STEM Work;
- student-work, evidence, and reflection ownership;
- Builder and Workshop internals, routes, project formats, and persistence;
- existing Platform routes and fixtures;
- the Classroom Pilot launcher; and
- Google Sites, Drive, Forms, Slides, and Vids.

## 18. Required Pre-Implementation Repository Inspection

Before any build authorization, inspect read-only:

- current Teacher Command Center structure and PB-002I boundary;
- current class and teacher authority surfaces;
- Student Dashboard and PB-003B consumer surfaces;
- existing routes, sessions, fixtures, storage, modules, CSS namespaces, and tests;
- available authoritative catalog, distribution, activity-availability, and projection owners;
- existing persistence, synchronization, conflict, refresh, and sign-out behavior;
- Builder and Workshop protection boundaries; and
- the smallest exact file and test surface.

The inspection must return PASS, CONDITIONAL PASS, or BLOCKED and identify every required owner or decision still missing. It must not implement or create models.

### Repository Inspection Reconciliation

The completed read-only inspection found suitable future presentation locations but no authoritative PB-002J owners or persistence infrastructure.

#### Existing Teacher Command Center Location

The current Teacher Command Center is rendered by `platform/scripts/platform-app.mjs` and styled by `platform/styles/platform.css`. It already provides class and period orientation and a prominent PB-002I Today’s Mission card.

A future PB-002J workflow may use the Teacher Command Center as its presentation entry point only after inspection of an exact implementation boundary. The existing PB-002I card must not be treated as PB-002J configuration or reused as authoritative state.

#### Existing Student Consumer Locations

The current Student Dashboard in `platform/scripts/platform-app.mjs` already contains appropriate future consumer regions:

- Current Goal;
- Continue;
- Available Missions;
- Side Paths; and
- My STEM Work.

These regions currently present honest unavailable states. PB-003B tests intentionally prohibit fabricated mission data, enabled mission actions, and unapproved persistence or integration. Any future PB-002J student projection must be a narrow consumer reconciliation that preserves PB-003B and PB-003C ownership.

#### PB-002I Protected Session-Only Boundary

PB-002I currently uses `platform/scripts/todays-mission.mjs` and browser `sessionStorage` to preserve one validated classroom announcement for refresh and the existing Student Display.

PB-002I remains:

- session-only;
- announcement-only;
- independent from Goal, Mission, and Activity Mission identity;
- independent from instructional grade;
- independent from Mission Distribution and activity availability; and
- non-authoritative for student dashboard projection.

PB-002J must not read, migrate, reinterpret, or extend PB-002I stored values as authoritative records.

#### Development Fixture and Browser Storage Prohibitions

`platform/scripts/platform-fixtures.mjs` contains fictional development-preview teachers, classes, and students. `platform/scripts/platform-session.mjs` stores temporary entry state in `sessionStorage` with an in-memory fallback.

Neither module can own PB-002J class authorization, instructional grade, catalog identity, distribution, activity availability, or student projection. The following must not become authoritative PB-002J sources:

- development fixtures;
- `sessionStorage` or `localStorage`;
- in-memory values;
- DOM markup or card order;
- routes or URL parameters;
- filenames or asset paths;
- display titles; or
- Classroom Pilot destination URLs.

#### Required Service Boundaries

The repository contains no approved implementation of the following required boundaries:

- **Catalog service boundary:** verified, versioned Goal organizers, independently distributable Missions, Activity Missions, Side Paths, preparation, eligibility, relationship, and destination facts.
- **Instructional-grade service boundary:** authoritative class-scoped Grade 3–6 configuration and lifecycle, separate from PI-000H Activity Library assignment.
- **Mission Distribution service boundary:** authoritative PI-001 class-to-mission availability, Start order, current focus, actor, lifecycle, confirmation, and projection.
- **Selected-student recipient boundary:** authoritative student identity, current roster membership, teacher authorization, class baseline, explicit additions and removals, uniqueness, lifecycle, privacy, audit, and effective availability.
- **Activity-availability service boundary:** separately authoritative class-wide and selected-student parent, activity/version, Side Path topic/activity, availability, ordering if applicable, lifecycle, confirmation, removal, and projection.
- **Persistence and synchronization boundary:** approved storage, atomicity, idempotency, conflicts, correction, removal, expiry, restoration, refresh, offline, cross-device, audit, and retention behavior.
- **Student-projection boundary:** minimum authorized, current, student-safe projection with freshness and sign-out invalidation.

No backend, API, database, provider, cache, adapter, synchronization mechanism, or transport is selected by this reconciliation.

#### PB-002I Mixed-File Dependency

The earlier inspection identified uncommitted PB-002I-related changes in likely shared presentation and test files. PB-002I has since been isolated in its own bounded implementation commit, so that historical working-tree dependency is resolved.

PB-002I remains a protected session-only boundary. Any later PB-002J manifest must still exclude unrelated PB-002I behavior and authorize shared-file changes only where a fresh repository inspection proves they are required.

#### Implementation Manifest Status

The following are probable future presentation and test surfaces, not an approved manifest:

- a dedicated PB-002J teacher workflow module;
- approved catalog, grade, distribution, activity-availability, persistence, and projection service adapters;
- narrow Teacher Command Center integration;
- narrow Student Current Goal and PB-003B consumer integration;
- namespaced Platform CSS;
- focused PB-002J tests; and
- narrow protection-test reconciliations where required.

The exact file manifest remains **PENDING OWNER AND TECHNOLOGY RESOLUTION**. Route placement also remains unresolved; the current repository structure does not prove that a new route is necessary.

**Inspection result:** `BLOCKED`.

**Implementation status:** `BLOCKED / NOT AUTHORIZED`.

## 19. Testing Requirements

### Focused PB-002J Tests

Test at minimum:

- teacher-only access and authorized class isolation;
- explicit class-wide and selected-student recipient scopes;
- authoritative roster selection, revalidation, and privacy isolation;
- effective per-student additions and removals against the class baseline;
- one active individual Mission relationship per student, classroom, Mission, and version;
- idempotent repeated submission and concurrent-operation conflict handling;
- explicit grade selection and no inference;
- cross-grade identification with fail-closed confirmation, persistence, and projection;
- separation from PI-000H Activity Library assignment;
- catalog identity and version handling;
- organizer-only Goal selection without implicit Activity Mission exposure;
- authoritative Goal-as-Mission exception handling;
- explicit one and multiple student-startable Activity Mission selection;
- three-primary-choice enforcement using only verified student-startable Mission records;
- verified Continue exclusion from the three-choice count;
- explicit activity selection and no defaults;
- secondary Side Path topic and activity selection without bypassing primary Start choices;
- parent grouping and invalid activity handling;
- preparation fact and stale-state handling;
- faithful preview;
- explicit atomic and idempotent confirmation;
- conflict, failure, correction, removal, refresh, and sign-out behavior;
- student projection and Continue-first ordering;
- privacy and wrong-role protection;
- honest states;
- keyboard, focus, status, and 44-pixel targets; and
- Chromebook responsive behavior without horizontal scrolling.

### Platform Regression

Run the full Platform suite, including focused protection for PB-001, PB-002A through PB-002I, PB-003A through PB-003D, routes, sessions, fixtures, sign-out, and the Classroom Pilot launcher.

### Builder and Workshop Regression

Run all required Builder and Workshop regression suites. PB-002J must introduce no internal behavior change to either system.

### Static and Browser Validation

Run:

- JavaScript and module syntax validation;
- inline-script validation where applicable;
- `git diff --check`;
- browser inspection for teacher and student flows;
- desktop responsive inspection; and
- physical Chromebook validation at 1204×695 CSS pixels and DPR 1.25.

## 20. Definition of Done

PB-002J is complete only when:

- every pre-implementation owner and decision is approved;
- the implementation stays within an inspected and authorized file boundary;
- the nine-step teacher workflow is complete and protected;
- class and Grade 3–6 choices are explicit and authoritative;
- cross-grade confirmation, persistence, and projection fail closed while authorization remains unresolved;
- instructional grade remains separate from Activity Library assignment;
- only verified catalog records are used;
- Goal organizers remain distinct from student-startable Activity Missions unless the catalog explicitly establishes an independently distributable Goal-as-Mission record;
- selecting a Goal does not implicitly expose related Activity Missions;
- mission and activity availability remain separately authoritative;
- class-wide and selected-student availability remain separately traceable;
- effective per-student availability is calculated from the class baseline plus explicit additions minus explicit removals;
- individual Mission distribution uniqueness, idempotency, concurrency, roster, privacy, and audit rules are enforced;
- one or multiple verified student-startable Missions work within the three-Start-choice ceiling while organizer-only Goals do not consume Start positions;
- verified Continue remains separate and Continue-first;
- activities require explicit teacher selection;
- Side Paths remain secondary and cannot bypass primary Mission Start limits;
- one class-wide current focus is preserved without personalized or inferred replacement;
- preparation information is verified and follows the approved safety decision;
- preview is faithful and teacher-private;
- confirmation is atomic, idempotent, recoverable, and authoritative;
- students see only their confirmed effective availability without recipient-source disclosure;
- existing work survives availability changes;
- honest states, privacy, accessibility, and Chromebook requirements pass;
- Classroom Pilot, PB-002I, PB-003B/C, Builder, Workshop, routes, sessions, and fixtures remain protected;
- focused, Platform, Builder, and Workshop tests pass;
- browser and physical Chromebook validation pass;
- no unrelated files or behavior change; and
- implementation receives separate final acceptance before commit or release.

## 21. Remaining Blockers

All deferred decisions in the approved PB-002J Design Decisions, Scope Expansion Reconciliation, and PI-001 Selected-Student Recipient-Scope Reconciliation remain blockers, including catalog ownership, identity, grade ownership, Mission Distribution, roster and recipient authority, individual distribution ownership, activity and Side Path availability, limits, lifecycle, privacy, safety behavior, persistence, synchronization, projection, audit, accessibility validation, district deployment, external resources, providers, routes, and final copy.

The repository inspection additionally confirms that:

- no current module can serve as an authoritative catalog, grade, distribution, activity-availability, persistence, or projection owner;
- no current module can serve as an authoritative classroom roster, selected-student recipient, or individual distribution owner;
- current fixtures and browser session storage are prohibited substitutes;
- PB-002I's historical mixed-file dependency is resolved, but its session-only behavior remains protected from PB-002J; and
- the exact PB-002J implementation and test manifest cannot be approved until owner and technology decisions are complete.

**Implementation readiness:** `BLOCKED / NOT AUTHORIZED`.

## 22. Approval Meaning

Approval makes this specification the implementation contract for subsequent read-only repository inspection and readiness work only.

Approval does not authorize implementation, assign an authority, select curriculum content, choose a provider or technology, create data or storage models, change the Classroom Pilot, modify PB-002I, implement class-wide or selected-student Mission Distribution, implement Activity Mission or Side Path availability, or alter any protected system.

## 23. Exact Next Gate

`/REVIEW` — **PB-002J Teacher Goal, Mission, and Activity Availability Build Specification v1.0**
