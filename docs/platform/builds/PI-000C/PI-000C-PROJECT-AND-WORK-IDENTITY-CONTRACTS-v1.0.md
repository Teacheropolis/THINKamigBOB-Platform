# PI-000C — Project and Work Identity Contracts

## Architecture Contracts v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending authoritative owners and lifecycle decisions

## Document Boundary

This document defines provider-neutral ownership contracts for student projects and work. It does not create project or work records, authorize Start or Continue behavior, connect Platform to Builder or Workshop, or select implementation technology.

It does not select:

- A backend, database, schema, API, provider, or hosting platform.
- A project, work, revision, request, session, or token format.
- A storage, synchronization, cache, or offline technology.
- A project data model or adapter transport.
- A Builder or Workshop save format.
- A launch route, return protocol, or migration mechanism.

Future implementation requires separately approved authoritative owners, lifecycle decisions, adapter inspections, a build specification, automated verification, physical Chromebook validation, and explicit authorization.

## Controlling References

- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PI-000A/PI-000A-IDENTITY-AND-AUTHORITY-CONTRACTS-v1.0.md`
- `docs/platform/builds/PI-000B/PI-000B-MISSION-AND-DISTRIBUTION-OWNERSHIP-CONTRACTS-v1.0.md`
- PI-000C Project and Work Identity Contracts Inspection: BLOCKED beyond documentation
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PB-003C/PB-003C-MY-STEM-WORK-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003C/PB-003C-BUILD-SPECIFICATION-v1.0.md`
- PI-001 Mission Distribution architecture
- Platform Blueprint v1.0
- Development Standards v1.0

## Contract Principles

1. Project identity, environment-work identity, mission identity, evidence identity, and presentation identity remain separate.
2. One approved project/work owner is authoritative for project lifecycle and Continue eligibility.
3. A student owns their project relationship; classroom membership grants context, not ownership transfer.
4. Start is an intent that must resolve idempotently before any work is created.
5. Continue returns to the same authoritative work and never resets it.
6. Unknown work state is not equivalent to no work.
7. PB-003B and PB-003C present projections; neither becomes a project/work owner.
8. Builder and Workshop retain their internal runtime and artifact ownership.
9. Browser session state, filenames, titles, DOM state, and development fixtures cannot become authoritative project identity.
10. Missing identity, authorization, freshness, ownership, or persistence guarantees stop implementation safely.

## Shared Vocabulary

### Project

The authoritative student-owned engineering journey record that may relate a mission context to one or more approved environment-work records and evidence connections. It is not a title, file, card, browser session, or work-environment runtime.

### Environment Work

An authoritative work reference owned by an approved Builder, Workshop, or future work-environment adapter. It is separate from the Platform project identity.

### Start Intent

An authorized student request to begin an available mission context. Intent is not proof that work was created.

### Continue Eligibility

A verified project/work-owner result stating that existing student-owned work may be resumed safely.

### Primary Resumable Work

At most one verified Continue projection selected by an approved project/work-owner rule for the primary Student Home experience.

### Work Projection

A minimal, authorized, read-only presentation supplied to PB-003B or PB-003C. It is not a second project record.

## Contract 1 — Project Identity

### Purpose

Resolve one stable project identity without deriving it from a project title, mission title, filename, card order, route, browser key, Builder field, Workshop state, or evidence item.

### Authoritative Owner

One approved project/work owner.

### Minimum Request Meaning

- Verified actor identity and purpose.
- Verified student owner relationship when student-specific access is requested.
- A reference issued by an approved owner relationship.
- Required freshness and authorization context.

### Minimum Successful Result

- Stable project identity reference.
- Verified student-owner relationship.
- Factual lifecycle meaning.
- Mission relationship when one is authoritatively established.
- Owner and freshness information.

This defines meaning, not a record schema.

### Required Guarantees

- A title change does not create a new project identity.
- A downloaded filename or Builder project-name field is not identity.
- One identity is never reused for another student's project.
- Project identity remains stable across approved environment and evidence connections.
- Project identity does not imply mission availability, launch permission, completion, grade, or public visibility.
- Duplicate or conflicting identities stop access and mutation.

### Failure States

- Unknown project.
- Project-owner mismatch.
- Conflicting project identity.
- Project archived, removed, or unavailable.
- Result stale.
- Owner unavailable.

### Deferred Decisions

Identity format, issuer technology, creation policy, title rules, multiple-project rules, and migration remain deferred.

## Contract 2 — Student Work Identity

### Purpose

Identify student-owned engineering work without treating a runtime object, local file, screenshot, mission, or evidence artifact as the Platform work identity.

### Authoritative Owner

The approved project/work owner owns the Platform work relationship. An approved environment adapter may own a separate environment-work reference.

### Minimum Successful Result

- Stable project/work identity reference.
- Verified student owner.
- Verified project relationship.
- Environment-work relationship when applicable.
- Factual lifecycle, resumability, and freshness meanings.

### Required Guarantees

- Work identity remains separate from mission and mission-version identity.
- Builder and Workshop references cannot replace Platform project identity.
- Save revisions do not create new project identity unless an approved lifecycle explicitly requires it.
- Existing work remains distinguishable from unknown or unavailable work.
- Repeated Start or Continue does not duplicate work.
- Work cannot be reassigned by changing a displayed student name, class, route, or filename.

### Deferred Decisions

Whether project and Platform work share an identity, revision semantics, branching, copies, collaboration, and environment-work cardinality remain deferred.

## Contract 3 — Student-to-Project Ownership

### Purpose

Bind each project to its authoritative student owner while keeping classroom membership and teacher visibility separate.

### Required Guarantees

- Every student project has exactly one verified student-owner relationship under the current scope.
- Student identity comes from the PI-000A authority boundary.
- Classroom membership does not become project ownership.
- Leaving a roster or classroom does not delete or transfer work.
- Display-name changes do not change ownership.
- Teachers do not become co-owners by viewing classroom work.
- Another student never receives the project projection or environment-work reference.
- Ownership conflict fails closed without deleting data.

### Required Authorization

- Student access requires verified identity, ownership, and current authorization.
- Teacher visibility requires current authority for the relevant classroom and an approved educational purpose.
- Possession of an ID, route, URL, filename, or cached projection is insufficient.

### Deferred Decisions

Transfers, duplicates, team projects, guardian access, account recovery, classroom exit, and long-term post-membership access remain deferred.

## Contract 4 — Mission and Mission-Version Relationship

### Purpose

Preserve the mission context in which work began without making the project owner the mission definition owner.

### Required Inputs

- Verified mission and mission-version references from the PI-000B mission owner.
- Verified student and classroom authorization.
- Verified Start intent or existing project relationship.

### Required Guarantees

- Mission identity, mission-version identity, and project identity remain separate.
- Existing work retains its original authoritative mission-version relationship.
- Mission retirement or removal from Start choices does not delete existing work.
- A newer mission version does not silently replace the version connected to existing work.
- Mission distribution controls new Start availability, not Continue ownership.
- Unknown version compatibility stops migration or substitution.

### Deferred Decisions

Missionless projects, multiple mission relationships, version migration, copies between versions, and teacher-initiated reassignment remain deferred.

## Contract 5 — Project-to-Environment-Work Relationship

### Purpose

Relate one Platform project to approved Builder or Workshop work without merging ownership domains.

### Relationship Guarantees

- Platform project identity is authoritative for the student journey relationship.
- Each environment retains ownership of its runtime, artifact, and internal work reference.
- An approved versioned adapter is the only connection boundary.
- Environment references are never inferred from filenames, UI labels, global functions, DOM nodes, geometry, or screenshots.
- Opening an environment does not prove successful creation, save, progress, or completion.
- Adapter failure does not delete or replace the project.
- A project may not silently connect to another student's environment work.

### Deferred Decisions

Relationship cardinality, source-of-truth reconciliation, adapter versioning, migration, environment switching, and cross-environment projects remain deferred.

## Contract 6 — Start Intent

### Purpose

Represent a student's authorized request to begin a teacher-available mission without equating a click with created work.

### Required Inputs

- Verified student identity and classroom membership.
- Verified PI-000B mission availability.
- Verified mission and version.
- Verified destination readiness.
- Current work-owner resolution for the same context.
- Approved idempotency intent context.

### Required Guarantees

- Start is available only for a current verified Start projection.
- Start does not erase or replace current work.
- Repeated activation expresses the same intent rather than multiple creations.
- Unknown existing-work state stops Start.
- Start does not claim success until the project/work owner and destination handoff confirm the result.
- Refresh never repeats Start automatically.
- A Start intent may normalize to Continue when authoritative work already exists.

### Failure States

- Student unauthorized.
- Availability stale or removed.
- Mission/version conflict.
- Destination unavailable.
- Work state unknown.
- Intent conflict.
- Owner unavailable.
- Outcome unknown.

## Contract 7 — Idempotent Work Creation

### Purpose

Create at most one authoritative project/work relationship for one valid Start intent.

### Required Sequence

1. Revalidate student identity, membership, and authorization.
2. Revalidate mission availability and version.
3. Revalidate destination readiness.
4. Query the project/work owner for matching existing work.
5. Normalize to Continue when approved existing work is found.
6. Create the project/work relationship exactly once when creation is authorized.
7. Establish the environment-work handoff through the approved adapter.
8. Return authoritative resulting identity and state.
9. Announce success only after confirmation.

### Required Guarantees

- Double activation produces one authoritative result.
- Retrying equivalent intent does not duplicate projects or environment work.
- Partial failure does not expose a false Continue or successful Start state.
- Refresh re-reads authoritative state and does not replay creation.
- Concurrent attempts produce one result or a safe conflict.
- An unknown outcome is reconciled before retry.
- No last-write-wins or merge behavior is assumed.

### Deferred Decisions

Idempotency representation, concurrency mechanism, pending lifetime, compensation, retry policy, and atomicity implementation remain deferred.

## Contract 8 — Continue Eligibility

### Purpose

Determine whether existing student-owned work can be resumed safely.

### Authoritative Owner

Only the approved project/work owner.

### Minimum Successful Result

- Verified project/work identity.
- Verified student ownership.
- Factual resumability meaning.
- Mission/version relationship when applicable.
- Verified destination relationship and readiness.
- Student-safe presentation facts.
- Freshness information.

### Required Guarantees

- Continue returns to the same work.
- Continue does not create another project.
- Continue does not reset work or environment state.
- Continue is independent of current mission distribution when the work lifecycle permits resumption.
- Teacher review, credits, badges, reflection, and public sharing do not gate Continue unless separately authorized.
- Unknown, stale, conflicting, or inaccessible work never appears as enabled Continue.
- Viewing a Continue projection does not update progress or last-opened state.

## Contract 9 — Primary Resumable-Work Selection

### Purpose

Select at most one verified Continue item for PB-003B and PB-003C without using an unapproved ranking inference.

### Required Guarantees

- The project/work owner supplies the primary result.
- Presentation code does not select by DOM order, timestamp, title, mission popularity, performance, or behavior.
- Continue appears before Start choices.
- One primary Continue item is shown in the Student Home experience.
- When no safe primary result exists, the approved honest empty or unavailable state appears.
- Selection does not archive, demote, or alter other work.

### Deferred Decisions

Primary-selection policy, multiple-current-work navigation, student pinning, teacher influence, and recency semantics remain deferred.

## Contract 10 — Start-versus-Continue Normalization

### Purpose

Prevent duplicate work when a student requests Start for a context that already has resumable work.

### Required Rules

- The work owner resolves matching work before creation.
- A verified match normalizes the intent to Continue when the approved work rule requires it.
- Distribution availability cannot override the work owner's match.
- Unknown work state cannot be treated as no match.
- Conflicting mission-version or environment relationships stop the handoff.
- Normalization preserves the existing project and environment-work identities.
- The student receives calm, accurate action language.

### Deferred Decisions

Match criteria, multiple-project policy, restart behavior, copies, abandoned work, and version-conflict resolution remain deferred.

## Contract 11 — Current, Recent, and Previous Work Projection

### Purpose

Supply PB-003C with minimal verified project facts without making presentation categories authoritative lifecycle states.

### Projection Owner

The project/work owner supplies classification meaning. PB-003C owns presentation only.

### Minimum Projection

Subject to authorization, a projection may contain:

- Student-safe project title.
- Factual Current, Recent, or Previous presentation category.
- Continue availability and destination label.
- Student-safe mission context when verified.
- Approved evidence-connection summary.
- Owner and freshness information.

### Required Guarantees

- Current appears first and remains visually strongest.
- Recent and Previous support reflection without judging quality.
- Category changes do not create, delete, reset, or transfer work.
- No fabricated projects, timestamps, progress, evidence, or teacher-review claims appear.
- A project appears once in the primary organization.
- Empty, unavailable, and stale states remain distinct.
- PB-003C does not store authoritative project records.

### Deferred Decisions

Classification rules, category quantity, history depth, sorting, filtering, pagination, and evidence summaries remain deferred.

## Contract 12 — Builder Adapter Boundary

Builder retains ownership of:

- Mission-selection and launch behavior presently inside Builder.
- Geometry, block state, camera, controls, and runtime.
- Project-name fields, autosave/resume behavior, downloads, and file handling.
- Save/load representation, UI, navigation, and assets.

A future versioned Builder adapter may accept only approved meanings such as verified project/work identity, student authorization context, mission/version context, and Start or Continue intent.

It may return only approved meanings such as environment-work reference, handoff outcome, save acknowledgement, resumability, and safe error state.

It must guarantee:

- No project identity is inferred from project name, filename, function name, mission tile, or browser key.
- Start and Continue are idempotent at the Platform work boundary.
- Continue does not reset Builder work.
- Adapter failure preserves existing Builder state.
- Platform does not inspect Builder DOM or globals as an owner interface.
- Builder opening is not treated as progress, completion, or save.

Adapter transport, serialization, routing, save ownership, return behavior, offline operation, and migration remain deferred.

## Contract 13 — Workshop Adapter Boundary

Workshop retains ownership of:

- Rendering, geometry, placement, selection, delete, Undo/Redo, snapping, and precision.
- Camera and View architecture.
- Table, Grid, measurements, and Tool Chest.
- Smart Board, Projector, mission restoration, screenshots, persistence, and assets.

A future versioned Workshop adapter may accept only approved meanings such as verified project/work identity, student authorization context, mission/version context, and Start or Continue intent.

It may return only approved meanings such as environment-work reference, handoff outcome, save acknowledgement, resumability, and safe error state.

It must guarantee:

- No identity is inferred from geometry, screenshots, assets, labels, or internal runtime state.
- Continue does not reset camera, geometry, selection, Table, Grid, measurements, or mission state.
- Adapter failure preserves existing Workshop state.
- Platform does not inspect Workshop internals as an owner interface.
- Workshop opening is not treated as progress, completion, or save.

Adapter transport, routing, save ownership, screenshot relationship, return behavior, offline operation, and migration remain deferred.

## Contract 14 — Work-Environment Handoff

### Purpose

Transfer an authorized Start or Continue intent to an approved environment without transferring identity ownership to presentation or routing code.

### Required Sequence

1. Verify identity, ownership, membership, and action authorization.
2. Resolve authoritative project/work and mission relationships.
3. Resolve Start versus Continue.
4. Verify destination readiness and adapter compatibility.
5. Submit one idempotent handoff.
6. Receive an authoritative environment outcome.
7. Preserve a safe return context without claiming save or completion.

### Required Guarantees

- Wrong-role, cross-student, or cross-classroom handoff fails closed.
- Refresh does not repeat handoff mutation.
- Back navigation does not create duplicate work.
- Partial or unknown outcome is reconciled before retry.
- An environment cannot silently replace the project identity.
- Platform presentation remains usable when a destination is unavailable.

## Save and Refresh Expectations

- Save authority must be explicitly assigned before implementation.
- UI feedback cannot claim saved until the authoritative owner confirms it.
- Environment autosave or downloaded files do not automatically constitute Platform project persistence.
- Refresh revalidates identity, ownership, authorization, revision, and resumability.
- Cached projections cannot authorize save, Start, Continue, archive, restore, or delete.
- Sign-out clears protected local presentation without deleting authoritative work.
- Browser close and device change do not silently alter authoritative project state.
- Unknown save outcome requires authoritative re-read before retry.
- No adapter may report a save acknowledgement it did not receive from its owner.

## Lifecycle and Persistence Requirements

### Required Lifecycle Meanings

Future owners must distinguish:

- Proposed or pending creation.
- Active and resumable work.
- Temporarily unavailable work.
- Archived work.
- Restorable work.
- Removed or deletion-requested work.
- Retained records required by approved policy.
- Conflicting or recovery-required work.

Final state names remain deferred.

### Persistence Requirements

- Project/work state requires an authoritative lifetime beyond one browser session.
- Student work expected across devices cannot be owned by `sessionStorage` or development fixtures.
- Every projection declares freshness and source.
- Every mutation defines idempotency and concurrency behavior.
- Owner, expiry, refresh, sign-out, device-change, offline, and recovery behavior must be approved.
- Cached presentation is distinguishable from authoritative state.
- Environment and Platform revision disagreement fails safely.

Retention periods, archival mechanics, synchronization timing, storage technology, backup, and disaster recovery remain deferred.

## Archive, Restoration, and Deletion Principles

### Archive

- Archive changes availability or presentation according to an approved lifecycle.
- Archive does not change student ownership.
- Archive does not silently delete environment work or evidence.
- Continue eligibility after archive must be explicit.

### Restoration

- Restoration preserves the same stable project identity.
- Restoration does not duplicate project or environment work.
- Ownership and authorization are revalidated.
- Conflicting destination or mission-version state stops restoration.

### Deletion

- Deletion requires an authoritative owner, approved policy, preview, confirmation, retention consequences, and recovery meaning.
- Removing classroom membership, mission availability, a card, or a projection never deletes work.
- Sign-out never deletes authoritative records.
- Evidence and environment-work consequences must be defined before deletion is exposed.
- Unknown deletion outcome must be reconciled before retry.

Exact archive, restoration, deletion, retention, legal, audit, and recovery policies remain deferred.

## Authorization and Teacher-Visibility Boundaries

### Student Authorization

- Verify student identity and project ownership for every protected projection and handoff.
- Revalidate current authorization at mutation and environment handoff.
- Ended or stale membership follows an approved access policy without deleting work.
- Identity possession alone grants no access.

### Teacher Visibility

- Teacher identity does not confer authority by name or email match.
- Teacher visibility requires current authorization for the relevant classroom and approved purpose.
- Teacher visibility is not ownership and cannot silently alter work.
- Private student choice, drafts, reflections, and unrelated work remain excluded.
- Teacher access after membership or classroom changes requires explicit lifecycle policy.

### Forbidden Authority Sources

- Development fixtures.
- Class code possession.
- Route or URL possession.
- Browser session or cached projection.
- Project title or filename.
- Builder or Workshop UI state.

## Privacy Requirements

Future implementations must:

- Minimize identity and work fields by purpose and audience.
- Prevent cross-student and cross-classroom disclosure.
- Keep raw identities, revisions, storage details, and adapter internals out of ordinary UI.
- Preserve student ownership and dignity without rankings or deficit labels.
- Avoid behavior, inferred ability, support classification, time-on-task, or surveillance data.
- Keep projects and evidence out of public displays, Hall of Fame, Teacher Feed, reports, and analytics without separate approval.
- Separate teacher visibility from student ownership.
- Define retention and deletion before collecting durable project data.
- Remove protected local presentation on sign-out or failed revalidation.

## Accessibility Requirements

Future project/work experiences must:

- Use semantic regions, headings, lists, and native controls.
- Preserve Continue-first reading and focus order.
- Provide visible focus and predictable focus return after handoff or error.
- Communicate Current, Recent, Previous, saved, unsaved, pending, stale, conflict, archived, unavailable, and removed meanings in text.
- Never rely on color, icon, motion, hover, audio, drag, or pointer precision alone.
- Support keyboard operation without drag.
- Use calm student-friendly error language.
- Wrap long titles, mission names, environment labels, and status messages.
- Support browser zoom, text resizing, and reduced motion.
- Avoid timed responses and repetitive announcements.

## Chromebook Requirements

Every future implementation must physically validate:

- Student orientation and ownership clarity.
- Continue-first presentation and focus order.
- Start-versus-Continue normalization.
- Double activation produces one work result.
- Refresh does not repeat creation or handoff.
- Save confirmation reflects authoritative state.
- Current, Recent, and Previous categories remain readable.
- Long titles and status messages wrap safely.
- Keyboard and touchpad operation.
- 44px minimum practical interaction targets where controls exist.
- Browser zoom and text resizing.
- No horizontal or nested scrolling and no clipped status.
- Wrong-role, cross-student, membership, refresh, and sign-out protection.
- Owner-unavailable, offline, stale, conflict, and unknown-outcome recovery.
- Builder and Workshop regression and smoke tests.
- No console errors or significant slowdown.

Local desktop testing does not replace physical Chromebook validation.

## Shared Error and Recovery States

### Unknown

No authoritative project, work, owner, mission relationship, or environment relationship can be verified. Unknown is never treated as empty.

### Stale

A projection, authorization, revision, or intent no longer satisfies its freshness requirement. It cannot authorize mutation or enabled Continue.

### Conflicting

Owners or concurrent changes cannot provide one safe result. Preserve the last verified state and stop mutation.

### Unavailable

An authoritative owner or environment cannot answer safely. Unavailable is distinct from no work, archived, removed, or unauthorized.

### Unauthorized

The actor cannot access or mutate the requested project in the current context. Do not reveal whether another student's project exists.

### Outcome Unknown

A create, save, archive, restore, delete, or handoff request was submitted but its authoritative result is unknown. Re-read authoritative state before retry.

### Destination Not Ready

The project is valid, but the approved environment handoff cannot safely proceed. Preserve work and present a calm recovery state.

### Presentation Rules

- Do not expose raw identities, revisions, stack traces, storage names, or another person's data.
- Do not announce creation, save, restoration, or deletion without confirmation.
- Distinguish empty, unavailable, stale, conflict, unauthorized, archived, removed, and unknown outcome.
- Preserve existing verified work during recovery.

## Protected Systems

PI-000C documentation and future work must preserve:

- PB-001 entry, role, routing, refresh, and sign-out behavior.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Continue-first Mission Choice and three-Start-choice boundary.
- PB-003C My STEM Work hierarchy, honest states, and evidence boundaries.
- Approved PI-000, PI-000A, and PI-000B architecture authority.
- PI-001 implementation block.
- Builder missions, geometry, camera, controls, autosave/resume, download/load, runtime, UI, navigation, and assets.
- Workshop rendering, geometry, Table, Grid, camera, measurements, Tool Chest, Smart Board, Projector, screenshots, restoration, persistence, and assets.
- Existing approved documents and unrelated files.

## Deferred Decisions

PI-000C v1.0 does not decide:

- Backend, database, schema, API, provider, hosting, or service topology.
- Project, work, revision, request, idempotency, or token format.
- Storage, cache, synchronization, or offline technology.
- Project data model or adapter transport.
- Project creation policy or multiple-project rules.
- Current, Recent, and Previous classification algorithm.
- Primary Continue selection policy.
- Start-match and normalization rules.
- Environment-work cardinality or reconciliation.
- Builder or Workshop adapter implementation.
- Launch routes, return protocols, save ownership, or migration.
- Cross-device propagation or offline editing.
- Collaboration, groups, teams, copying, branching, or shared projects.
- Archive, deletion, restoration, retention, recovery, or audit implementation.
- Teacher editing, review, approval, grading, feedback, or assignment of student work.
- Evidence synchronization, Google integrations, portfolio publication, analytics, credits, badges, or AI.

## Implementation Stop Conditions

Stop before implementing PI-000C, interactive PB-003B/PB-003C work, or PI-001 when:

- The authoritative project/work owner is unidentified.
- Project or work identity would be inferred from a title, filename, DOM node, browser key, Builder function, Workshop state, or fixture.
- Student ownership cannot be verified independently of classroom membership.
- PI-000A identity and authorization contracts lack authoritative implementation.
- PI-000B mission, version, distribution, or destination dependencies lack authoritative implementation.
- Existing work cannot be checked before Start.
- Start idempotency, concurrency, or unknown-outcome behavior is undefined.
- Continue eligibility or primary selection has no authoritative owner.
- Project persistence would rely only on session or device-local state.
- Save ownership or refresh revalidation is undefined.
- Builder or Workshop requires direct Platform presentation-layer coupling.
- Adapter failure could reset, overwrite, duplicate, or misattribute work.
- Archive, restoration, or deletion could affect environment work or evidence without defined consequences.
- Teacher visibility or student privacy purpose is unclear.
- Offline or stale state could appear authoritative.
- Implementation requires an unapproved provider, route, dependency, format, storage model, project model, or adapter transport.

When blocked, return the exact missing owner or decision. Do not fill the gap with fixtures, browser storage, filenames, UI labels, DOM inspection, direct environment calls, or assumptions.

## Contract Acceptance Criteria

PI-000C contracts are ready for approval when they:

- Separate project, work, mission, environment, evidence, and presentation ownership.
- Define student ownership without selecting identity formats.
- Define Start intent, idempotent creation, Continue eligibility, and normalization.
- Preserve one primary Continue presentation without inventing a ranking rule.
- Define PB-003C Current, Recent, and Previous projections as read-only.
- Protect Builder and Workshop behind future versioned adapters.
- Define save, refresh, lifecycle, persistence, archive, restoration, and deletion principles.
- Require current authorization and protect teacher-visibility boundaries.
- Cover privacy, accessibility, Chromebook, error, conflict, and unknown-outcome behavior.
- Keep PI-000C and PI-001 implementation blocked until authoritative owners exist.
- Select no provider, technology, identity format, project data model, route, or adapter transport.

## Approval Meaning

Approval establishes these provider-neutral contracts as architecture authority for subsequent ownership inspections and documentation.

Approval does not authorize project/work implementation, Start or Continue actions, project data, persistence, Builder or Workshop adapters, migration, application changes, test changes, staging, committing, tagging, or pushing.

After review and approval, the next PI-000 decomposition inspection should address PI-000D — Evidence and Evidence-Connection Ownership Contracts. PI-001 remains blocked until PI-000A, PI-000B, PI-000C, destination, persistence, and adapter requirements have separately approved authoritative implementations.
