# PI-000 — Platform Ownership & Identity Foundation

## Design Blueprint v1.0

Status: Approved architecture authority  
Phase: Phase 2 integration prerequisite  
Architecture Role: Ownership, identity, privacy, and persistence boundary definition

## Document Boundary

This blueprint defines the ownership and identity architecture that must exist before Phase 2 integrations can safely connect missions, student work, Builder, Workshop, evidence, teachers, classes, and student-facing Platform experiences.

It does not authorize implementation, select a backend, create data models, choose a database, modify authentication, add routes, connect Builder or Workshop, or introduce production persistence.

Each implementation requires read-only inspection, approved design decisions, a separately reviewed build specification, testing, physical Chromebook validation, and explicit user approval.

## Controlling Context

PI-000 responds to the PI-001 Mission Distribution Architecture Inspection, which found that the current repository contains:

- Development-only teacher, class, and student fixtures.
- Session-based PB-001 entry identity.
- Student and teacher presentation foundations.
- Embedded Builder mission launch behavior without a canonical mission catalog.
- Downloaded Builder project files without a Platform project owner.
- No authoritative distribution, evidence, or cross-system work identity owner.

PI-000 must preserve completed PB-001 through PB-003C behavior while defining the contracts required for future integrations.

## Purpose

Define who owns each core Platform concept, what identity each concept requires, how systems may refer to one another, and which decisions must be resolved before data crosses system boundaries.

The foundation should ensure that:

- One real-world concept is not accidentally represented by multiple conflicting records.
- Platform presentation does not become the hidden owner of mission, project, or evidence data.
- Builder and Workshop remain protected work environments.
- Students and teachers see only information they are authorized to see.
- Removing a connection does not delete source work.
- Refresh, sign-out, retries, and repeated activation do not create duplicates.
- Future integrations fail safely when ownership or identity cannot be verified.

## Core Architecture Principles

### One Authoritative Owner Per Concept

Every mission, project, student, teacher, classroom, distribution, and evidence item must have one approved authoritative owner.

Other systems may receive authorized references or projections, but they must not silently become competing masters.

### Stable Identity Before Integration

Cross-system integration must use stable approved identities. Titles, names, filenames, labels, card order, timestamps, and tool names are not identities.

### References Before Copies

When practical, the Platform should connect to authoritative source records rather than copying content into an uncontrolled second store.

### Presentation Is Not Ownership

Teacher and Student Dashboard cards may present authorized information. Rendering a card does not make the dashboard the owner of that information.

### Work Must Survive Relationship Changes

Removing availability, disconnecting evidence, changing classroom focus, or changing presentation must not delete or reset mission definitions, projects, Builder work, Workshop work, or source evidence.

### Identity Is Not Display Text

Internal identity must remain separate from student- and teacher-facing labels. A renamed project, student display-name correction, or mission-title revision must not create a new identity.

### Privacy by Default

Student work, evidence, choices, and identity relationships remain private unless a separately approved purpose and audience authorize broader visibility.

### Honest Failure

When an owner, identity, permission, or destination cannot be verified, the integration must stop and show an honest unavailable state rather than guessing.

## Ownership Domain Map

```text
Teacher Owner ──authorizes──> Classroom Owner
                                  │
                                  ├──contains authorized membership──> Student Owner
                                  │
Mission Owner ──referenced by──> Distribution Owner
        │                         │
        │                         └──controls availability only
        │
        └──context for──> Project/Work Owner
                              │
                              ├──references──> Builder Work Owner
                              ├──references──> Workshop Work Owner
                              └──references──> Evidence Owner(s)

Platform Presentation reads authorized projections from these owners.
It does not replace them.
```

The final technical arrangement may differ, but the ownership separation must remain.

## Mission Ownership

### Mission Owner Responsibilities

One approved mission owner must authoritatively manage:

- Stable mission identity.
- Mission version identity.
- Mission title.
- Student-safe summary and instructions.
- Mission lifecycle state.
- Distribution eligibility.
- Supported Builder or Workshop relationships.
- Required mission context.
- Mission stages, progress rules, and completion rules only when separately approved.

### Mission Identity Requirements

A mission identity must:

- Be stable across title and copy changes.
- Distinguish mission definition from mission version.
- Be unique within the approved mission namespace.
- Remain opaque to ordinary student and teacher UI.
- Be safe to reference from distribution and work records.
- Avoid reliance on filenames, JavaScript function names, DOM IDs, card positions, or visible titles.

### Mission Version Requirements

Mission version identity must distinguish:

- Editorial changes that preserve compatibility.
- Changes that require a new version.
- Retired versions connected to existing work.
- The version available for new distribution.

The exact compatibility and migration policy is deferred.

### Mission Ownership Boundaries

The mission owner does not automatically own:

- Teacher/class distribution.
- Student work.
- Builder geometry.
- Workshop state.
- Evidence artifacts.
- Reflection.
- Grades or teacher review.

### Current Repository Boundary

Builder mission buttons and launch functions are protected implementation behavior, not an approved canonical Platform mission owner.

## Project and Work Ownership

### Project/Work Owner Responsibilities

One approved project or mission-work owner must authoritatively manage:

- Stable project/work identity.
- Student owner.
- Mission relationship when present.
- Current, Recent, and Previous organization.
- Work lifecycle state.
- Continue-versus-Start resolution.
- Creation idempotency.
- Connected Builder and Workshop work references.
- Connected evidence references.
- Save and restoration status.

### Project Identity Requirements

Project identity must:

- Remain stable when the title changes.
- Remain stable across Builder, Workshop, Slides, Vids, and evidence connections.
- Prevent duplicate projects under repeated Start or Continue activation.
- Distinguish project identity from mission identity.
- Distinguish one student's work from another student's work.
- Avoid derivation from project title, downloaded filename, student display name, or tool state.

### Continue Versus Start

The project/work owner decides:

- Whether verified work exists.
- Whether it is resumable.
- Which environment should reopen.
- Whether Start must resolve to Continue.
- How repeated activation remains idempotent.

Mission Distribution may authorize Start availability but cannot create or infer Continue state.

### Project Ownership Boundaries

The project/work owner does not automatically own:

- Mission definitions.
- Classroom membership.
- Teacher permissions.
- Builder geometry internals.
- Workshop camera or measurement state.
- Source evidence content.
- Reflection responses.
- Grades or teacher feedback.

### Current Repository Boundary

Builder project-name fields and downloaded JSON files are user-controlled artifacts, not an authoritative Platform project identity system.

## Student Ownership

### Student Identity Owner Responsibilities

One approved student owner must authoritatively manage:

- Stable student identity.
- Student display name.
- Authorized classroom memberships.
- Entry credentials or private identifier relationship.
- Identity lifecycle, including roster corrections and departures.
- Identity resolution across sessions and approved systems.

### Student Identity Requirements

Student identity must:

- Be stable when a display name changes.
- Not require a personal Google, Microsoft, Clever, or email account unless the Platform strategy is separately changed and approved.
- Remain separate from the private identifier used for entry.
- Remain separate from class code.
- Avoid exposure in ordinary UI, URLs, screenshots, public surfaces, and exported student-visible content.
- Prevent one student's records from resolving to another student.

### Private Identifier Boundary

A private identifier is an authentication or entry factor, not the student identity itself.

Changing the private identifier must not create a new student or disconnect existing work.

### Student Ownership Boundaries

The student owner does not automatically own:

- Projects.
- Mission definitions.
- Classroom definitions.
- Distribution records.
- Evidence artifacts.
- Teacher notes.

It supplies the stable subject relationship those owners require.

### Current Repository Boundary

PB-001 student records are explicitly fictional development fixtures. They are not approved production identity.

## Teacher and Classroom Ownership

### Teacher Owner Responsibilities

One approved teacher identity owner must manage:

- Stable teacher identity.
- Display name.
- Authentication relationship.
- Authorized classroom relationships.
- Account lifecycle.

### Classroom Owner Responsibilities

One approved classroom owner must manage:

- Stable classroom identity.
- Classroom display name and period label.
- Teacher authority.
- Student membership.
- Class-code relationship.
- Classroom lifecycle.
- Roster-change behavior.

### Teacher and Classroom Identity Requirements

- Teacher identity must not be derived from email address alone.
- Classroom identity must not be derived from class code, display name, period, or teacher name.
- Class codes may change without creating a new classroom.
- Teacher reassignment must follow an explicit authority policy.
- Student membership changes must not silently delete student work.
- An archived or closed class requires an approved access and retention policy.

### Authority Requirements

Before a teacher reads or changes classroom-controlled data, the classroom owner must verify that teacher's current authority.

Before a student receives class-wide information, the classroom owner must verify current membership.

### Current Repository Boundary

PB-001 teacher and classroom fixtures support local entry testing only and cannot authorize Phase 2 integrations.

## Distribution Ownership

Although PI-001 defines Mission Distribution, PI-000 establishes its ownership boundary.

One distribution owner must manage:

- Stable distribution identity.
- Mission and version reference.
- Classroom reference.
- Availability state.
- Primary Start order.
- Current classroom focus.
- Authorized teacher action.
- Idempotent confirmation.
- Removal and restoration state.
- Retention and audit information when approved.

Distribution identity must not be inferred from mission title, classroom name, card position, or a combination of visible labels.

Distribution owns availability only. It does not own mission content, student work, progress, completion, or launch behavior.

## Evidence Ownership

### Evidence Owner Responsibilities

Every evidence item must have one authoritative source owner that manages:

- Stable evidence identity.
- Source artifact identity.
- Source permissions.
- Content or artifact location.
- Revision or version information when available.
- Availability and deletion state.
- Sharing state.

### Evidence Connection Owner

The Platform may require a separate connection owner that records an authorized relationship between:

- One project/work identity.
- One evidence identity.
- One evidence source.
- One permitted presentation context.

The connection must not become a duplicate evidence artifact.

### Evidence Identity Requirements

- Evidence identity must come from the authoritative source or an approved stable mapping.
- Filenames, titles, timestamps, thumbnails, and URLs are not sufficient identity by themselves.
- Disconnecting evidence must not delete the source artifact.
- Deleting a Platform connection must not change source permissions.
- Broken access must produce an unavailable state rather than a claim that evidence was deleted.

### Evidence Meaning Boundaries

Evidence is not automatically:

- Reflection.
- Proof of learning.
- A grade.
- Teacher-reviewed.
- Public.
- Complete.

The What I Learned Today source remains separate unless a future approved integration changes that boundary.

### External Sources

Google Slides, Google Vids, Google Drive, and other external systems remain independent owners of their source artifacts and permissions.

Account, consent, sharing, retention, and access-loss behavior require separate integration decisions.

## Builder Boundary

### Builder Owns

Builder owns its protected runtime behavior, including:

- Geometry and block state.
- Builder-specific camera and controls.
- Builder mission launch functions.
- Builder save and load format.
- Builder UI and assets.
- Builder runtime lifecycle.

### Platform May Eventually Own

Subject to separate approval, the Platform may own:

- The project/work identity connected to Builder work.
- A launch request referencing an approved project and mission.
- A return destination.
- A factual Builder-work relationship.
- A save or revision reference supplied by an approved Builder adapter.

### Platform Must Not

- Read or alter Builder internals directly from dashboard code.
- Infer project identity from project name or downloaded filename.
- Treat opening Builder as project creation, progress, or completion.
- Duplicate Builder saves.
- Reset Builder state during Continue.
- Modify Builder mission behavior to solve Platform ownership gaps.

### Required Future Adapter

Any Builder integration requires an inspected, versioned boundary that defines launch, identity, save, restore, return, error, and duplicate-prevention behavior without coupling Platform presentation to Builder DOM or global functions.

## Workshop Boundary

### Workshop Owns

Workshop owns its protected runtime behavior, including:

- Rendering.
- Student geometry.
- Placement, selection, delete, Undo/Redo, snapping, and precision.
- Camera and View architecture.
- Table and Grid behavior.
- Measurement values and tools.
- Tool Chest.
- Smart Board and Projector behavior.
- Mission restoration.
- Screenshot flow.
- Workshop persistence and approved assets.

### Platform May Eventually Own

Subject to separate approval, the Platform may own:

- The project/work identity connected to Workshop work.
- A launch request referencing an approved project and mission.
- A return destination.
- A factual Workshop-work relationship.
- A save, revision, or screenshot evidence reference supplied by an approved Workshop adapter.

### Platform Must Not

- Read or mutate Workshop runtime internals directly from dashboard code.
- Infer project identity from geometry, screenshot names, or UI labels.
- Treat opening Workshop as progress or completion.
- Reset camera, geometry, Table, Grid, selection, measurements, or mission state during Continue.
- Duplicate Workshop saves or evidence.
- Modify Workshop architecture to compensate for missing Platform ownership.

### Required Future Adapter

Any Workshop integration requires an inspected, versioned boundary defining launch, identity, save, restore, return, evidence, error, and duplicate-prevention behavior.

## Platform Ownership

### Platform Owns

The Platform should own or coordinate:

- Teacher and student presentation shells.
- Protected route presentation and navigation.
- Role-aware access to Platform experiences.
- Classroom-facing workflows such as distribution after authority is verified.
- References connecting approved owners.
- Honest empty, unavailable, and error states.
- User intent such as previewing and confirming a distribution.
- Idempotent orchestration across approved owner boundaries.

### Platform Does Not Automatically Own

- Mission definitions.
- Builder or Workshop work internals.
- Source evidence.
- Reflection responses.
- External Google files.
- Grades, mastery, or student ability.
- Teacher review unless a separate system is approved.

### Presentation Projection Boundary

Platform dashboards may receive minimal authorized projections such as:

- Display names.
- Student-safe mission summaries.
- Factual availability.
- Factual work relationship.
- Factual evidence availability.

These projections must remain traceable to authoritative owners and must not become silent master records.

### Current Repository Boundary

The current Platform is a static hash-routed application using development fixtures and session-scoped state. That architecture is approved for the completed foundation builds only and must not be assumed to satisfy Phase 2 ownership or persistence needs.

## Identity Requirements

### Identity Classes

Future architecture must distinguish at least:

- Teacher identity.
- Student identity.
- Classroom identity.
- Classroom membership identity or relationship.
- Mission identity.
- Mission version identity.
- Distribution identity.
- Project/work identity.
- Builder-work identity or reference.
- Workshop-work identity or reference.
- Evidence identity.
- Evidence-connection identity.

### General Identity Rules

Every identity must:

- Be stable for the lifetime required by its owner.
- Be unique within a documented namespace.
- Have one issuer or authoritative owner.
- Be validated before crossing a boundary.
- Be separate from display labels.
- Avoid unnecessary display in ordinary UI.
- Be safe under retry and repeated activation.
- Support clear not-found, unavailable, revoked, and conflict behavior.
- Avoid reuse for a different real-world record after deletion or retirement.

### Relationship Rules

- Relationships reference identities; they do not merge owners.
- A relationship must have a purpose and authorized audience.
- Relationship removal must define whether source records remain available.
- Cross-owner references require version and failure contracts.
- Duplicate prevention must use authoritative identities, not text matching.

### Identity Resolution

Future systems must define how an identity is resolved when:

- A display name changes.
- A class code changes.
- A student changes classes.
- A teacher changes classroom authority.
- A mission version changes.
- A project reconnects to Builder or Workshop.
- Evidence is renamed, moved, access-restricted, or deleted at its source.
- A session expires or a user signs out.

## Privacy Boundaries

### Minimum Necessary Data

Each system may receive only the identities and presentation fields necessary for its approved purpose.

### Student Privacy

- Students may see only their authorized identity, classroom context, work, choices, and evidence.
- One student must never receive another student's project, choice, evidence, reflection, or activity.
- Private identifiers, class codes, raw IDs, and credentials must not appear in ordinary Student Home content.
- Student work remains private by default.

### Teacher Privacy and Authority

- Teachers may access only classrooms they are authorized to manage.
- Teacher-only notes, support signals, reports, and review history must not appear in student or public surfaces.
- Teacher identity must not grant authority merely because an email address or display name matches.

### Classroom Privacy

- Class-wide content must be limited to verified current members.
- Roster changes require defined access behavior.
- Student-specific data must not become class-wide merely because it is related to a classroom.

### Public Surface Boundary

Mission choices, projects, evidence, distribution state, and student identity must not flow automatically to:

- Student Display or Smart Board.
- Hall of Fame.
- Teacher Feed.
- Public recognition.
- Reports or analytics.

Each public or broader audience requires separate purpose, consent, teacher control, retention, and removal decisions.

### Sensitive Data Boundary

Do not use grades, behavior, inferred ability, support classification, private teacher notes, or activity surveillance as identity or availability inputs without separate explicit authorization.

## Authorization Requirements

Identity answers who or what a record is. Authorization answers what the current actor may do.

Future architecture must separately verify:

- Teacher authority for a classroom.
- Student membership in a classroom.
- Teacher permission to distribute a mission.
- Student permission to view or start a mission.
- User permission to open a project.
- User permission to view evidence.
- Source permission for Builder, Workshop, and external artifacts.

Possession of an ID, class code, URL, filename, or browser state must not be treated as authorization.

## Persistence Questions

PI-000 does not choose persistence architecture. Before implementation, resolve:

### Owner and Store

- Which system stores each identity and authoritative record?
- Is there one Platform service or multiple owner services?
- Which records may be cached by the static client?
- Which records must never be client-authoritative?

### Lifetime

- Which state is page-memory, session, classroom-day, school-year, or long-term?
- What survives refresh, browser close, device change, roster change, and sign-out?
- What expires automatically?

### Cross-Device Behavior

- Which teacher changes must appear on student Chromebooks?
- How quickly must changes propagate?
- What happens offline or during intermittent connectivity?
- How is stale state detected and rejected?

### Idempotency and Concurrency

- How are duplicate Start, Continue, save, distribution, and evidence-connection requests prevented?
- How are two teacher sessions reconciled?
- Which owner issues idempotency tokens or equivalent guarantees?
- What does the user see after a conflict?

### Retention and Deletion

- How long are identities, memberships, distributions, projects, and evidence connections retained?
- What does classroom closure do?
- What does student departure do?
- Which records can be deleted, archived, restored, or anonymized?
- How are source artifacts protected when relationships are removed?

### Audit

- Which teacher-controlled changes require an audit record?
- Who may view audit information?
- How long is it retained?
- How are corrections represented without rewriting history inaccurately?

### Backup and Recovery

- Which owners provide recovery?
- How is identity preserved during restore?
- How are cross-owner references checked after recovery?
- How is partial recovery prevented from exposing stale or mismatched data?

### Security and Privacy

- How are identities protected in transit and at rest?
- How are authorization checks enforced outside the browser?
- Which logs may contain identifiers?
- How are development fixtures isolated from real records?

## Session and Authentication Boundary

PB-001 session state currently owns development entry and route protection only.

Future production architecture must distinguish:

- Authentication session.
- Stable teacher or student identity.
- Current classroom context.
- Authorization grants.
- Application workflow draft state.
- Persistent authoritative records.

Signing out must clear local protected presentation and credentials without deleting authoritative projects, distributions, or evidence.

Session storage must not become the authoritative owner of Phase 2 records merely because it supports refresh in current foundation builds.

## Error and Conflict Principles

Future owner boundaries must define safe behavior for:

- Unknown identity.
- Missing record.
- Retired mission version.
- Unauthorized classroom.
- Stale membership.
- Duplicate request.
- Conflicting teacher changes.
- Missing Builder or Workshop destination.
- Broken evidence permission.
- Partial service failure.
- Offline Chromebook.

The Platform must preserve the last verified safe state, avoid destructive fallback, and show calm recovery language without exposing internal IDs or another user's information.

## Accessibility and Chromebook Principles

Ownership and identity architecture must support experiences that:

- Use student- and teacher-friendly labels instead of raw IDs.
- Preserve semantic status and error meaning.
- Do not require users to transcribe opaque identifiers.
- Do not expose ownership through color alone.
- Remain usable with keyboard and touchpad.
- Preserve focus through authentication, retry, confirmation, and conflict flows.
- Support browser zoom and text resizing.
- Avoid horizontal scrolling and nested workflow traps.
- Restore only verified authorized state after refresh.
- Fail safely during connectivity interruptions.

Every implementation requires physical Chromebook validation.

## Protected Systems

PI-000 and future ownership work must protect:

- PB-001 authentication shell, entry, roles, route guards, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Mission Choice and Continue-first behavior.
- PB-003C My STEM Work and evidence boundaries.
- Builder mission selection, geometry, camera, controls, save/load, navigation, and assets.
- Workshop rendering, geometry, Table, Grid, camera, View controls, measurement, Tool Chest, Smart Board, Projector, screenshots, mission restoration, persistence, and assets.
- Existing canonical missions and approved documents.

## Deferred Decisions

PI-000 v1.0 deliberately does not decide:

- Backend or service topology.
- Database technology or schema.
- Hosting provider.
- Production authentication provider.
- Identity format or token format.
- API protocol.
- Event or synchronization architecture.
- Offline storage strategy.
- Retention and deletion durations.
- Audit implementation.
- School, district, or tenant ownership hierarchy.
- Teacher transfer or co-teacher behavior.
- Guardian access.
- Student-specific mission distribution.
- Groups, teams, cohorts, or adaptive assignment.
- Mission authoring and publishing.
- Project creation and launch implementation.
- Builder or Workshop adapter design.
- Google Drive, Slides, Vids, or Classroom integration.
- Evidence upload or portfolio behavior.
- Reflection ownership changes.
- Grades, analytics, recommendations, or AI.

## Required Design Decisions Before Implementation

Companion PI-000 design decisions must resolve at minimum:

1. Identity namespaces and authoritative issuers.
2. Teacher, student, and classroom lifecycle ownership.
3. Classroom membership and authorization model.
4. Mission and mission-version ownership.
5. Project/work identity and Continue-versus-Start ownership.
6. Distribution ownership.
7. Evidence and evidence-connection ownership.
8. Platform projection and caching boundaries.
9. Persistence lifetime categories.
10. Idempotency and concurrency expectations.
11. Retention, deletion, restoration, and audit principles.
12. Builder and Workshop adapter requirements.
13. Privacy purpose and audience boundaries.
14. Error, conflict, and offline behavior.

Any decision requiring unavailable legal, district, operational, security, or product authority must remain explicitly unresolved rather than being invented.

## Proposed PI-000 Decomposition

Subject to inspection and approval:

### PI-000A — Identity and Authority Contracts

Define teacher, student, classroom, membership, session, and authorization contracts.

### PI-000B — Mission and Distribution Ownership Contracts

Define mission identity, versioning, catalog ownership, and class-wide distribution ownership.

### PI-000C — Project and Work Identity Contracts

Define stable project identity, Continue-versus-Start ownership, and duplicate prevention.

### PI-000D — Evidence Ownership Contracts

Define source evidence identity, connection ownership, privacy, and removal safety.

### PI-000E — Integration Adapter Contracts

Define protected Builder, Workshop, and future external-source boundaries without implementing them.

### PI-000F — Persistence and Lifecycle Architecture

Select approved persistence, retention, concurrency, recovery, and cross-device architecture only after required authority and technical inspection.

The decomposition does not authorize implementation.

## Blueprint Acceptance Criteria

PI-000 is ready for review when it:

- Assigns one conceptual owner to each core domain.
- Separates identities from display labels and credentials.
- Separates mission, distribution, project, work-environment, and evidence ownership.
- Protects Builder and Workshop internals.
- Establishes privacy and authorization boundaries.
- Identifies persistence questions honestly.
- Preserves completed Platform foundations.
- Clearly records deferred decisions.
- Does not select or implement unapproved architecture.

## Next Required Step

After blueprint review and approval, create `PI-000 — Platform Ownership & Identity Foundation Design Decisions v1.0`.

Then perform targeted read-only architecture inspections before any PI-000 build specification or Phase 2 integration implementation is authorized.
