# PI-000 — Platform Ownership & Identity Foundation

## Design Decisions v1.0

Status: Approved architecture authority  
Companion Document: PI-000 Platform Ownership & Identity Foundation Blueprint v1.0  
Architecture Role: Phase 2 ownership, identity, authorization, and lifecycle authority

## Document Boundary

This document records product and architecture decisions only. It does not authorize implementation, application changes, test changes, data creation, migration, integration, staging, committing, tagging, or pushing.

These decisions define what future owners must guarantee. They do not select a backend, database, API, authentication provider, hosting provider, identity token format, or synchronization technology.

Every implementation requires targeted read-only inspection, an approved build specification, local and regression testing, physical Chromebook validation, user approval, and separate commit authorization.

## Controlling References

- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-BLUEPRINT-v1.0.md`
- `docs/platform/PLATFORM-BLUEPRINT-v1.0.md`
- `docs/platform/DEVELOPMENT-STANDARDS-v1.0.md`
- PI-001 Mission Distribution Architecture Inspection: BLOCKED
- Approved PB-001 through PB-003C Platform foundations

## Decision 1 — Identity Namespaces and Authoritative Issuers

### Decision

Every identity class has one documented namespace and one authoritative issuer.

Required identity classes are:

- Teacher identity.
- Student identity.
- Classroom identity.
- Classroom-membership identity or stable relationship.
- Mission identity.
- Mission-version identity.
- Distribution identity.
- Project/work identity.
- Builder-work identity or reference.
- Workshop-work identity or reference.
- Evidence identity.
- Evidence-connection identity.

### Identity Rules

Every authoritative identity must:

- Be unique within its documented namespace.
- Remain stable for its required lifecycle.
- Never be reused for a different real-world record.
- Remain separate from display labels and credentials.
- Be validated by its issuer before another owner accepts it.
- Support factual unknown, unavailable, retired, revoked, and conflict states.
- Remain safe under retry and repeated activation.
- Be opaque in ordinary teacher and student UI unless a separately approved support purpose requires display.

### Prohibited Identity Sources

Do not derive identity from:

- Display name.
- Email address alone.
- Class code.
- Private identifier.
- Mission or project title.
- Filename or file path.
- DOM ID.
- JavaScript function name.
- Card position.
- Timestamp alone.
- Builder or Workshop tool name.
- URL alone.

### Issuer Boundary

The Platform may coordinate references but cannot issue identities for another owner's domain merely because it displays that domain's data.

### Deferred Technical Choice

Identity syntax, storage format, generation algorithm, and transport representation remain deferred.

## Decision 2 — Teacher Identity Ownership

### Decision

One approved teacher identity owner is authoritative for teacher identity and account lifecycle.

It owns:

- Stable teacher identity.
- Teacher display name.
- Account-to-identity relationship.
- Account lifecycle state.
- Verified relationship to classroom authorization sources.

### Authentication Boundary

Authentication proves control of an approved teacher account. It does not by itself grant classroom authority.

Teacher identity must remain separate from:

- Email address.
- Password or authentication credential.
- Session identifier.
- Classroom identity.
- Teacher display name.

Changing an email address or display name must not create a new teacher identity.

### Current Foundation Boundary

PB-001 development fixtures remain valid only for local foundation testing. They cannot authorize Phase 2 records or be treated as production teacher identity.

### Deferred Decisions

Production authentication provider, verification workflow, recovery implementation, co-teacher behavior, teacher transfer, and account-retention policy remain deferred.

## Decision 3 — Student Identity Ownership

### Decision

One approved student identity owner is authoritative for stable student identity and identity lifecycle.

It owns:

- Stable student identity.
- Student display name.
- Relationship to authorized classroom memberships.
- Relationship to approved entry credentials.
- Identity correction, merge, retirement, and recovery policy when later approved.

### Entry Boundary

Class code, roster-name selection, and private identifier support entry. None is the student identity itself.

Changing a display name or private identifier must not:

- Create a new student.
- Disconnect existing projects.
- Disconnect evidence.
- Move work to another student.
- Alter classroom history silently.

### Account Boundary

Students do not require personal email, Google, Microsoft, or Clever accounts under the approved Platform strategy.

An external evidence account must not replace Platform student identity.

### Current Foundation Boundary

PB-001 fictional roster records remain development-only and cannot own Phase 2 student data.

### Deferred Decisions

Roster import, district identifiers, duplicate-student reconciliation, student departure, school transfer, graduation, and long-term identity retention remain deferred.

## Decision 4 — Classroom and Membership Ownership

### Classroom Decision

One approved classroom owner is authoritative for:

- Stable classroom identity.
- Classroom display name.
- Period or section label.
- Classroom lifecycle state.
- Teacher authority relationships.
- Student membership relationships.
- Class-code relationship.

### Membership Decision

Classroom membership is an authoritative relationship between one student identity and one classroom identity.

Membership must distinguish:

- Currently authorized.
- Pending when later approved.
- Ended or inactive.
- Unknown or unverifiable.

The final state model remains deferred.

### Identity Rules

- Class code is an entry mechanism, not classroom identity.
- Classroom name and period are display information, not identity.
- Changing a class code must not create a new classroom.
- Changing membership must not delete student work.
- A student may not receive class-wide information after membership is no longer authorized.
- Historical access after class closure requires a separate retention and authorization decision.

### Authority Rule

Every classroom-controlled read or mutation must verify current teacher authority or student membership through the classroom owner.

Possessing a classroom ID, class code, URL, or cached browser state is not authorization.

### Initial Scope

PI-000 defines classroom and membership contracts only. It does not implement class creation, roster editing, transfers, co-teachers, or archival behavior.

## Decision 5 — Mission and Mission-Version Ownership

### Mission Decision

One approved mission owner is authoritative for mission definitions.

It owns:

- Stable mission identity.
- Mission title.
- Student-safe summary and instructions.
- Mission lifecycle.
- Distribution eligibility.
- Supported work-environment relationships.

### Mission-Version Decision

Mission identity and mission-version identity are separate.

A mission version represents a defined mission-content contract. Existing student work must retain its authoritative mission-version relationship even when a newer version becomes available.

### Version Rules

- Renaming a mission does not automatically create a new mission.
- A material content change may require a new version according to a later approved compatibility policy.
- Retiring a version must not delete existing work.
- New distribution must reference a verified distributable version.
- Existing work must not be silently migrated.
- Mission identity must not be inferred from Builder function names or starter cards.

### Current Repository Boundary

Builder's embedded mission buttons and launch functions remain protected Builder behavior. They are not the canonical Phase 2 mission catalog.

### Deferred Decisions

Mission authoring, publication, version compatibility, migration, retirement, localization, and canonical catalog implementation remain deferred.

## Decision 6 — Project and Work Identity Ownership

### Decision

One approved project/work owner is authoritative for the student's continuing engineering-work record.

It owns:

- Stable project/work identity.
- Student owner reference.
- Mission and mission-version relationship when present.
- Current, Recent, and Previous organization.
- Work lifecycle state.
- Continue-versus-Start resolution.
- Creation idempotency.
- Builder-work, Workshop-work, and evidence references.
- Verified save and restoration relationships.

### Identity Rules

- Project identity is not project title.
- Project identity is not a downloaded filename.
- Project identity is not mission identity.
- One mission may relate to multiple student projects only when an approved work rule permits it.
- The same project retains one identity across connected work environments and evidence sources.
- Repeated Start or Continue activation must not create duplicates.

### Continue Ownership

Only the project/work owner may determine:

- Whether work exists.
- Whether work is resumable.
- Which approved environment should reopen.
- Whether Start resolves to Continue.
- Whether a destination is safe to open.

### Work Preservation

Changing mission availability, classroom focus, evidence connection, project title, or presentation category must not delete or reset work.

### Current Repository Boundary

Builder project-name fields and downloaded JSON files are artifacts, not authoritative Platform project identity.

### Deferred Decisions

Project creation, multiple active projects, lifecycle state names, archive and restore, deletion, launch, save, cross-device behavior, and source-work mapping remain deferred.

## Decision 7 — Distribution Ownership

### Decision

One approved distribution owner is authoritative for mission availability relationships.

It owns:

- Stable distribution identity.
- Mission and mission-version reference.
- Classroom reference.
- Availability state.
- Primary Start position.
- Current classroom focus.
- Authorized teacher action.
- Idempotent confirmation.
- Removal and restoration state.
- Audit reference when later approved.

### Ownership Boundary

Distribution owns availability only. It does not own:

- Mission content.
- Student work.
- Continue state.
- Mission launch.
- Progress or completion.
- Grades or recommendations.

### Initial Product Boundary

PI-001 v1.0 remains class-wide and limited to three primary Start choices. Student-specific distribution, groups, teams, and adaptive assignment remain deferred.

### Blocking Status

PI-001 implementation remains blocked until the mission, classroom, distribution-persistence, project/work, and destination owners are approved and inspectable.

## Decision 8 — Evidence and Evidence-Connection Ownership

### Evidence Decision

Every evidence item has one authoritative source owner.

The evidence owner controls:

- Stable evidence identity.
- Source artifact identity.
- Source permissions.
- Artifact content or location.
- Version or revision information when available.
- Availability and deletion state.
- Sharing state.

### Connection Decision

One approved evidence-connection owner may manage the relationship between:

- Project/work identity.
- Evidence identity.
- Evidence source.
- Authorized presentation purpose.

An evidence connection is a reference, not a duplicate evidence artifact.

### Safety Rules

- Disconnecting evidence must not delete the source artifact.
- Removing a connection must not alter source permissions.
- Broken access produces an unavailable state, not a deletion claim.
- Identity must not be guessed from filename, title, URL, thumbnail, or timestamp.
- Evidence remains private by default.
- Public sharing requires separate teacher-controlled approval.

### Meaning Boundary

Evidence is not automatically reflection, proof of learning, a grade, teacher-reviewed, public, or complete.

The What I Learned Today Google Form remains the only reflection source.

### Deferred Decisions

Evidence-source adapters, upload, file picking, consent, retention, external-account mapping, revision policy, and portfolio presentation remain deferred.

## Decision 9 — Platform Projection Boundaries

### Decision

The Platform presents minimal authorized projections from authoritative owners. A projection is not a competing master record.

### Permitted Projection Content

Subject to authorization, a projection may include:

- Display label.
- Student-safe mission summary.
- Factual availability.
- Factual work relationship.
- Factual save or revision information.
- Factual evidence availability.
- Current classroom context.

### Projection Requirements

- Every projection remains traceable to its owner and identity.
- Projection freshness must be detectable.
- Stale projections must not authorize mutations.
- Cached presentation must not outlive its approved lifetime.
- Projection failure must preserve the last verified safe state or show unavailable.
- Projection removal must not delete source records.

### Prohibited Projection Behavior

The Platform must not:

- Infer identity from visible text.
- Convert cached data into an authoritative record.
- Merge owners silently.
- Invent progress, praise, review, availability, or evidence.
- expose raw identifiers unnecessarily.

### Current Foundation Boundary

The current static hash-routed Platform and development fixtures remain valid for approved foundation demonstrations only. They are not automatically sufficient Phase 2 projection or persistence architecture.

## Decision 10 — Builder Adapter Boundary

### Decision

Any Platform-to-Builder integration requires a separately inspected, versioned adapter contract.

### Builder Retains Ownership Of

- Geometry and block state.
- Builder runtime and controls.
- Builder camera behavior.
- Existing mission launch functions.
- Builder save/load format.
- Builder UI, navigation, and assets.

### Adapter May Eventually Accept

- Authorized project/work identity.
- Authorized mission and version reference.
- Explicit launch intent.
- Return destination.
- Approved minimal student context when required and authorized.

### Adapter May Eventually Return

- Factual launch result.
- Builder-work identity or reference.
- Factual save or revision reference.
- Safe return result.
- Factual error or unavailable state.

### Adapter Must Guarantee

- Repeated launch does not duplicate work.
- Continue does not reset work.
- Platform code does not reach into Builder DOM or global functions directly.
- Project identity is not inferred from project name or filename.
- Opening Builder does not imply progress or completion.
- Failed launch preserves existing work.

### Deferred Decisions

Adapter transport, serialization, save ownership, launch route, return protocol, offline behavior, and migration from current Builder files remain deferred.

## Decision 11 — Workshop Adapter Boundary

### Decision

Any Platform-to-Workshop integration requires a separately inspected, versioned adapter contract.

### Workshop Retains Ownership Of

- Rendering.
- Student geometry.
- Placement, selection, delete, Undo/Redo, snapping, and precision controls.
- Camera and View architecture.
- Table and Grid behavior.
- Measurement values and tools.
- Tool Chest.
- Smart Board and Projector behavior.
- Mission restoration.
- Screenshots.
- Workshop persistence and approved assets.

### Adapter May Eventually Accept

- Authorized project/work identity.
- Authorized mission and version reference.
- Explicit launch intent.
- Return destination.
- Approved minimal student context when required and authorized.

### Adapter May Eventually Return

- Factual launch result.
- Workshop-work identity or reference.
- Factual save or revision reference.
- Approved screenshot evidence reference.
- Safe return result.
- Factual error or unavailable state.

### Adapter Must Guarantee

- Repeated launch does not duplicate work.
- Continue does not reset camera, geometry, selection, Table, Grid, measurements, or mission state.
- Platform code does not mutate Workshop runtime internals.
- Identity is not inferred from geometry, screenshot names, or UI labels.
- Opening Workshop does not imply progress or completion.
- Failed launch preserves existing work and restoration behavior.

### Deferred Decisions

Adapter transport, launch route, save ownership, screenshot relationship, return protocol, offline behavior, and current-work migration remain deferred.

## Decision 12 — Authorization Boundaries

### Decision

Identity, authentication, session, and authorization are separate concepts.

- Identity answers who or what a record is.
- Authentication verifies control of an approved account or entry process.
- Session maintains current authenticated context.
- Authorization determines whether the actor may perform the requested action now.

### Required Authorization Checks

Future systems must verify:

- Teacher authority for the classroom before every classroom-controlled read or mutation.
- Student membership before class-wide content is presented.
- Mission distribution permission before availability changes.
- Student project ownership before work is opened.
- Evidence permission before evidence is shown.
- Source permission before Builder, Workshop, or external artifacts are accessed.

### Authorization Rules

- Possession of an ID, class code, private identifier, URL, filename, or cached state is not authorization.
- Authorization must be rechecked at mutation time.
- Stale authorization must fail closed without deleting data.
- Wrong-role content must not render before redirect or denial.
- Sign-out clears protected local presentation without deleting authoritative records.
- Public presentation requires separate audience authorization.

### Current Foundation Boundary

PB-001 route guards remain authoritative for the current development foundation but do not constitute a production authorization service.

## Decision 13 — Persistence Lifetime Categories

### Decision

Every state field must be assigned an approved lifetime category before implementation.

Required categories are:

### Page-Ephemeral

Exists only during the current rendered page or interaction. Examples may include focus return and an open preview surface.

### Session-Scoped

May survive page refresh within one authenticated browser session but clears on sign-out. Existing PB-001 entry state, timer, memo, and presentation-mode behavior remain separately approved examples; they do not authorize new Phase 2 session ownership.

### Draft Workflow

Unconfirmed user intent such as a prepared distribution. Draft retention, refresh, expiry, and cross-device behavior require explicit approval per workflow.

### Classroom-Operational

Authoritative state expected to be available to authorized classroom participants across devices during its approved lifetime, such as confirmed mission availability.

### Student-Work

Authoritative project and work state that must survive ordinary session and device changes according to an approved lifecycle.

### Long-Term Record

Records retained for an approved educational, operational, legal, or recovery purpose.

### Source-External

Artifacts whose content and permissions are owned outside the Platform, with the Platform retaining only an approved reference or connection.

### Rules

- Browser storage cannot be selected merely for convenience.
- Session-scoped state cannot become authoritative classroom or student-work state.
- Every category requires owner, expiry, refresh, sign-out, device-change, and recovery behavior.
- Cached projections must be distinguishable from authoritative state.

### Deferred Decisions

The storage technology and exact lifetime of each future record remain deferred.

## Decision 14 — Idempotency and Concurrency Requirements

### Idempotency Decision

Every create, Start, Continue, distribute, save, connect, remove, restore, or publish request must define an idempotency contract before implementation.

Repeated equivalent intent must not create duplicate:

- Students.
- Classrooms.
- Memberships.
- Missions or versions.
- Distributions.
- Projects.
- Builder or Workshop work.
- Evidence connections.

### Concurrency Decision

Every mutable owner must define how it handles stale or competing changes.

At minimum:

- Mutation verifies the latest authoritative version or equivalent conflict state.
- Stale writes do not silently overwrite newer work.
- Conflicts preserve the last verified safe state.
- Users receive calm, recoverable messages.
- Refresh does not replay a completed action.
- Pending state does not appear confirmed.

### Multi-Session Boundary

Concurrent teacher sessions, student sessions, and cross-device updates require explicit owner behavior. The Platform must not invent last-write-wins or merge behavior.

### Deferred Decisions

Idempotency key format, revision mechanism, locking, optimistic concurrency, event ordering, and merge strategy remain deferred.

## Decision 15 — Retention, Deletion, Restoration, and Audit Principles

### Retention Decision

Every authoritative owner must define:

- Retention purpose.
- Retention duration or lifecycle trigger.
- Authorized audience.
- Expiry behavior.
- Relationship behavior after expiry.

No record is retained indefinitely by default.

### Deletion Decision

Deletion must be owned by the authoritative source and must define consequences before it is exposed.

Removing a relationship must not silently delete its source record.

Examples:

- Removing mission availability does not delete mission or student work.
- Removing an evidence connection does not delete source evidence.
- Ending classroom membership does not delete projects.
- Signing out does not delete authoritative records.

### Restoration Decision

Restorable records must preserve stable identity. Restoration must not create a duplicate identity or attach records to the wrong student, classroom, mission, or project.

### Audit Decision

Teacher-controlled or destructive changes may require factual audit records when later approved.

Audit information must:

- Record verified actor, action, target, and time.
- Avoid becoming student-facing praise, blame, or surveillance.
- Have an approved audience and retention period.
- Preserve corrections without falsely rewriting historical action.

### Deferred Decisions

Exact retention periods, deletion authority, legal requirements, audit events, audit viewers, export, recovery windows, and anonymization remain deferred.

## Decision 16 — Privacy Boundaries

### Minimum Necessary Decision

Every owner and projection receives only the identities and fields required for its approved purpose.

### Student Privacy

- Students see only their authorized identity, classroom context, choices, work, and evidence.
- One student never receives another student's work, choices, reflection, evidence, activity, or private identity.
- Private identifiers, class codes, raw IDs, credentials, and internal relationship records stay out of ordinary Student Home content.
- Student work and evidence remain private by default.

### Teacher Privacy and Authority

- Teachers access only classrooms they are currently authorized to manage.
- Teacher-only notes, support signals, reports, review history, and audit data do not flow to students.
- Teacher identity does not grant classroom authority by email or display-name match.

### Classroom Privacy

- Class-wide data is available only to verified current members and authorized teachers.
- Student-specific data does not become class-wide because it is related to a classroom.
- Roster changes require explicit access and retention behavior.

### Public Surface Boundary

No mission choice, distribution, project, evidence, identity, support state, or audit event flows automatically to:

- Student Display or Smart Board.
- Teacher Feed.
- Hall of Fame.
- Public recognition.
- Reports or analytics.

Each broader audience requires separate purpose, teacher control, privacy, retention, and removal approval.

### Sensitive Input Boundary

Grades, behavior, inferred ability, support classifications, private teacher notes, and activity surveillance must not be used as identity, distribution, or availability inputs without separate explicit authorization.

## Decision 17 — Error, Conflict, and Offline Behavior

### Safe Failure Decision

When identity, ownership, authorization, freshness, destination, or permission cannot be verified, the operation stops.

The Platform must not guess, substitute a similarly named record, fabricate success, or proceed using stale authority.

### Required Error Classes

Future owner contracts must distinguish:

- Unknown identity.
- Missing record.
- Retired mission version.
- Unauthorized classroom.
- Ended or stale membership.
- Duplicate request.
- Conflicting mutation.
- Missing or unavailable destination.
- Broken evidence permission.
- Offline or unreachable owner.
- Partial integration failure.

### User Experience Rules

- Preserve the last verified safe state.
- Do not expose internal IDs, credentials, stack traces, storage names, or another user's information.
- Distinguish empty from unavailable and failed.
- Do not announce success until the authoritative owner confirms it.
- Provide a calm recovery path when one exists.
- Protect current work during every error.

### Offline Decision

Offline presentation may show previously verified information only when its owner has approved caching, lifetime, and stale-state labeling.

Offline mode must not:

- Authorize new mutations by assumption.
- Present stale mission availability as current.
- Create duplicate work when connectivity returns.
- Merge competing changes without an approved policy.

### Deferred Decisions

Retry policy, caching technology, queueing, reconciliation, connectivity detection, and offline-capable workflows remain deferred.

## Decision 18 — Platform Orchestration Boundary

### Decision

The Platform coordinates approved owner contracts and presents authorized projections. It does not absorb ownership merely to simplify UI code.

The Platform may eventually:

- Request authorized projections.
- Validate current role and context.
- Collect explicit user intent.
- Present preview and confirmation.
- Submit idempotent requests to authoritative owners.
- Present verified success, empty, unavailable, and error states.

The Platform must not:

- Treat the DOM as a data owner.
- Treat browser session state as persistent classroom or work ownership.
- Reach into Builder or Workshop internals.
- Copy external evidence into an uncontrolled store.
- Infer mission, project, student, or evidence identity from labels.
- Convert presentation order into identity.

## Decision 19 — Protected Systems

PI-000 decisions and future work must preserve:

- PB-001 teacher/student entry, roles, route guards, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Mission Choice, Continue-first behavior, three-choice boundary, and honest states.
- PB-003C My STEM Work, hierarchy, and evidence boundaries.
- Existing Mission behavior and restoration.
- Builder mission selection, launch, geometry, camera, controls, save/load, UI, navigation, and assets.
- Workshop rendering, geometry, Table, Grid, camera, View controls, measurements, Tool Chest, Smart Board, Projector, screenshots, restoration, persistence, and assets.
- Existing approved documents and unrelated files.

PI-001 implementation remains blocked until the owners and contracts required by its inspection exist through separately approved work.

## Decision 20 — Deferred Decisions and Stop Conditions

### Deferred Decisions

PI-000 v1.0 does not select or authorize:

- Backend or service topology.
- Database technology or schema.
- API or event protocol.
- Hosting provider.
- Production authentication provider.
- Identity or token format.
- Offline storage or synchronization technology.
- Retention durations.
- Audit implementation.
- School, district, or tenant hierarchy.
- Co-teachers, teacher transfer, or guardian access.
- Student-specific distribution or groups.
- Mission authoring, publishing, or version migration.
- Project creation, launch, archive, deletion, or cross-device persistence.
- Builder or Workshop adapter implementation.
- Google integration.
- Evidence upload or portfolio behavior.
- Reflection changes.
- Grades, analytics, recommendations, or AI.

### Stop Conditions

Stop before any Phase 2 implementation when:

- An authoritative issuer or owner is unidentified.
- Two systems claim ownership of the same concept.
- Identity would be inferred from display text or filenames.
- Authorization cannot be verified independently of possession of an ID.
- Persistence lifetime is undefined.
- Idempotency or conflict behavior is undefined.
- Removal could delete source work or evidence unintentionally.
- Builder or Workshop internals would be accessed directly.
- Privacy purpose or audience is unclear.
- Retention, deletion, or audit authority is required but unavailable.
- Offline or stale state could be mistaken for authoritative current state.
- The implementation requires an unapproved backend, provider, route, dependency, or architecture.

When stopped, return an inspection report and the smallest decision needed to proceed. Do not fill the gap with fixtures, browser storage, hidden coupling, or assumptions.

## Decision Summary

- Every identity class has one namespace and authoritative issuer.
- Teacher, student, classroom, membership, mission, project, distribution, and evidence ownership remain separate.
- Authentication, identity, session, and authorization are separate.
- Mission identity and mission-version identity are separate.
- Project/work ownership resolves Continue versus Start and prevents duplicates.
- Distribution owns availability only.
- Evidence connections reference source evidence and never silently delete it.
- Platform dashboards present authorized projections rather than becoming owners.
- Builder and Workshop require protected versioned adapters.
- Every state field requires an approved persistence lifetime.
- Every mutation requires idempotency and concurrency behavior.
- Retention, deletion, restoration, and audit require explicit purpose and authority.
- Offline or unverifiable state fails safely.
- Technology and provider selections remain deferred.
- PI-001 implementation remains blocked pending separately approved owner implementation.

## Approval Meaning

Approval establishes these ownership and identity decisions as design authority for targeted architecture inspections and future documentation.

Approval does not authorize implementation, data migration, application changes, test changes, staging, committing, tagging, or pushing.

After review and approval, the next step is targeted read-only inspection of the proposed PI-000 decomposition. The first recommended inspection is PI-000A — Identity and Authority Contracts, covering teacher identity, student identity, classroom identity, membership, session, and authorization boundaries.
