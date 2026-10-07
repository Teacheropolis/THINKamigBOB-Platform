# PI-000E — Persistence, Concurrency, and Recovery Contracts

## Architecture Contracts v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending authoritative owners and infrastructure decisions

## Document Boundary

This document defines provider-neutral persistence, concurrency, and recovery meanings. It does not create records, select technology, migrate state, enable offline use, or authorize implementation.

It does not select a backend, database, API, provider, hosting platform, storage or synchronization technology, revision or idempotency format, conflict algorithm, offline or backup technology, audit technology, or adapter transport.

## Controlling References

- Approved PI-000 Blueprint and Design Decisions v1.0.
- Approved PI-000A Identity and Authority Contracts v1.0.
- Approved PI-000B Mission and Distribution Ownership Contracts v1.0.
- Approved PI-000C Project and Work Identity Contracts v1.0.
- Approved PI-000D Evidence and Evidence-Connection Ownership Contracts v1.0.
- PI-000E Persistence, Concurrency, and Recovery Inspection: BLOCKED beyond documentation.
- Platform Blueprint v1.0.
- Development Standards v1.0.

## Contract Principles

1. Every state field has one authoritative owner and an approved lifetime.
2. Session state, drafts, projections, durable records, and audit records remain distinct.
3. Cached or restored state never becomes authority by possession.
4. Every mutation defines idempotency, concurrency, and unknown-outcome behavior.
5. Refresh revalidates and never replays mutation.
6. Sign-out removes protected local presentation without deleting authoritative records.
7. Offline access and mutation are prohibited until explicitly approved.
8. Recovery preserves identity, ownership, and the last verified safe state.
9. Builder and Workshop persistence remain protected behind future adapters.
10. Missing ownership, lifetime, privacy, or recovery meaning stops implementation.

## Shared Vocabulary

### Authoritative Record

State controlled by its approved owner and used to make current decisions.

### Projection

A minimal read-only view of authoritative state. It is not a competing master.

### Revision Context

Owner-supplied freshness or change context sufficient to detect stale or competing operations. Its representation is deferred.

### Idempotency Intent

The approved meaning that equivalent repeated requests must resolve to one authoritative outcome.

### Unknown Outcome

A submitted operation whose authoritative result cannot yet be established.

## Contract 1 — State Classification

Every future state field must be classified before implementation as one of:

- Ephemeral presentation state.
- Session-scoped feature state.
- Private draft state.
- Projection or cache state.
- Classroom-operational authoritative state.
- Durable identity or relationship state.
- Durable project, work, or evidence state.
- Audit state.

Each classification must declare owner, purpose, audience, lifetime, freshness, refresh, sign-out, device-change, offline, retention, deletion, restoration, and recovery behavior. Unclassified state cannot be implemented.

## Contract 2 — Session-Scoped State

### Approved Current Examples

- PB-001 development entry context.
- Lesson Timer.
- Teacher Memo.
- Student Display mode and open state.

### Required Guarantees

- Namespaced state may survive refresh within the approved browser session.
- State clears according to sign-out and feature cleanup contracts.
- Session state does not own durable identity, membership, distribution, project, work, or evidence.
- Invalid restoration fails safely.
- Session state cannot grant current authorization by itself.
- Existing PB behavior remains unchanged until separately approved.

Session issuer, duration, renewal, cross-tab behavior, and production storage remain deferred.

## Contract 3 — Draft State

A draft represents unconfirmed private intent.

- Drafts never change student-visible or classroom-operational state.
- Draft and confirmed state are visibly and structurally distinct.
- Draft access requires current authorization.
- Draft freshness is rechecked before confirmation.
- Cancellation preserves confirmed state.
- Draft restoration never submits or confirms automatically.
- Expiry, device scope, retention, abandonment, and cross-device behavior require separate approval.

## Contract 4 — Projection and Cache

- Every projection remains traceable to its owner and revision context.
- Projection is read-only and cannot authorize mutation.
- Cache lifetime and audience are explicit.
- Stale, unavailable, and unauthorized remain distinct.
- Cached protected content is removed or hidden after sign-out, revocation, or failed revalidation.
- Offline display is prohibited unless cache protection and stale labeling are approved.
- Projection removal does not delete authoritative records.

Transport, cache technology, invalidation, and live-update mechanisms remain deferred.

## Contract 5 — Classroom-Operational State

This category includes confirmed state intended to be shared by authorized classroom participants, such as future mission availability.

- One authoritative owner controls it.
- It survives ordinary refresh, browser close, and device change for its approved lifetime.
- Session storage cannot be its sole owner.
- Teacher classroom authorization is revalidated for mutation.
- Student membership is revalidated for presentation.
- Concurrent changes cannot silently overwrite one another.
- Classroom closure, rollover, restoration, retention, and removal meanings must be approved.

## Contract 6 — Durable Identity and Relationship State

Teacher, student, classroom, membership, mission, mission-version, distribution, project, evidence, and connection identities require authoritative durable owners.

- Stable identity survives presentation, title, route, and device changes.
- Relationships preserve both endpoint identities and authorization meaning.
- Identity is never inferred from labels, filenames, URLs, DOM, fixtures, or browser keys.
- Sign-out does not delete durable identity.
- Merge, transfer, retirement, deletion, restoration, and retention require explicit policy.

## Contract 7 — Durable Project, Work, and Evidence State

- Student ownership remains authoritative across sessions and devices.
- Start, Continue, save, connect, remove, restore, and delete operations are idempotent.
- Environment-local artifacts do not automatically become Platform records.
- Unknown work or evidence state is not treated as empty.
- Project, environment work, evidence, and connection revisions remain separable.
- Membership or mission-availability changes do not delete work or evidence.
- Durable state cannot rely solely on `sessionStorage`, `localStorage`, downloads, screenshots, or fixtures.

## Contract 8 — Authoritative Record Versus Projection

- Owners mutate authoritative records; presentation consumes projections.
- Projection code cannot manufacture identity, revision, authorization, or success.
- A projection may preserve the last verified safe view only when its owner approves lifetime and labeling.
- Stale projections never authorize actions.
- Write-through, optimistic UI, local mirrors, and reconciliation require separate approval.
- The DOM is never a record owner.

## Contract 9 — Persistence Lifetime

Every record declares:

- Creation and activation meaning.
- Minimum and maximum approved lifetime.
- Expiry and renewal meaning.
- Refresh and browser-close behavior.
- Device and cross-device behavior.
- Sign-out and revocation behavior.
- Archive, retention, deletion, restoration, and recovery behavior.
- Owner-unavailable and offline behavior.

Undefined lifetime blocks implementation. Storage convenience cannot determine lifecycle.

## Contract 10 — Revision and Freshness

- Every mutable owner supplies sufficient freshness context.
- Mutations revalidate current authoritative state.
- Stale requests fail without silent overwrite.
- Read projections communicate stale or unavailable status safely.
- Revision identity is not inferred from timestamps alone.
- Cross-owner revision disagreement stops mutation.
- Refresh obtains current authorized state rather than trusting cache.

Revision representation, ordering, clocks, and comparison mechanisms remain deferred.

## Contract 11 — Idempotency Intent

Before every create, Start, Continue, distribute, confirm, save, connect, remove, restore, delete, or publish operation, the owner must define which retries represent the same intent.

- Equivalent activation produces one outcome.
- Refresh and navigation do not create a new intent.
- Actor, scope, target, authorization, and approved operation meaning are revalidated.
- Intent cannot be inferred solely from button state or local timestamp.

Intent representation and expiry remain deferred.

## Contract 12 — Idempotency Result

- The authoritative owner records or resolves one result for equivalent intent.
- Repeated requests return the confirmed result or safe pending/unknown meaning.
- Partial success never appears complete.
- Failed presentation does not cause blind mutation retry.
- Result lookup does not disclose another actor's operation.
- Result retention is long enough for the approved retry and recovery window.

Result format, ledger technology, and retention duration remain deferred.

## Contract 13 — Concurrent Mutation

- Every mutable owner detects stale or competing changes.
- No unapproved last-write-wins, silent merge, or card-order precedence occurs.
- Concurrent teacher, student, device, and adapter actions produce one confirmed result or a safe conflict.
- Conflict preserves authoritative records and student work.
- Read-only projections cannot resolve conflicts.
- Retry follows authoritative re-read and renewed user intent when required.

Locking, optimistic concurrency, merge, ordering, and transaction technology remain deferred.

## Contract 14 — Conflict Detection and Resolution Boundary

Owners detect conflicts; Platform presentation explains them safely.

- Conflicts identify the affected operation without exposing private records.
- The last verified state remains visible only when safely labeled.
- Automatic merging is prohibited unless separately specified.
- Destructive conflict resolution requires preview and confirmation.
- Cross-owner conflict requires an approved orchestration contract.
- Unresolved conflict blocks mutation, not ordinary access to unaffected work.

## Contract 15 — Unknown-Outcome Reconciliation

When success or failure is unknown:

1. Stop automatic retry.
2. Preserve pending/unknown meaning.
3. Revalidate identity and authorization.
4. Query the authoritative owner for the result or resulting state.
5. Resume only after reconciliation or explicit safe recovery.

Unknown outcome must never be treated as failure, success, or permission to duplicate. Refresh initiates re-read, not replay.

## Contract 16 — Retry, Timeout, and Interruption

- Timeout is not proof of failure.
- Retry availability depends on idempotency and reconciliation.
- Repeated controls are disabled or safely resolved while outcome is pending.
- Browser close, route change, sleep, and connection loss cannot replay mutation.
- User messaging is calm, factual, and non-destructive.
- Retry never weakens authorization or privacy checks.

Timeout durations, backoff, queueing, and network implementation remain deferred.

## Contract 17 — Refresh Revalidation

Refresh must:

1. Read only the minimum local context needed to attempt restoration.
2. Revalidate session, identity, role, membership, and authorization.
3. Re-read required authoritative records and freshness.
4. Reconcile pending or unknown operations.
5. Restore only authorized projections and approved session state.
6. Redirect or show an approved unavailable state otherwise.

Refresh never repeats confirmation, Start, Continue, save, connection, removal, restoration, deletion, or handoff.

## Contract 18 — Sign-Out and Revocation Cleanup

- Clear protected local session and feature state.
- Remove private projections from presentation and browser history where approved.
- Cancel or hide pending local interactions safely.
- Do not delete authoritative identity, classroom, project, work, evidence, or audit records.
- Revocation is revalidated through the authoritative owner; local cleanup is not server-side revocation.
- Cross-tab, cross-device, expiry, and revocation propagation remain deferred.

## Contract 19 — Offline and Owner-Unavailable

Protected Phase 2 data is unavailable offline unless a later contract approves:

- Permitted cached fields and audience.
- Device protection and cache lifetime.
- Stale labeling.
- Allowed read and write actions.
- Queueing, ordering, revocation, and reconciliation.
- Conflict and unknown-outcome behavior.
- Cross-user cleanup.

Owner unavailable is distinct from denial, missing, empty, or deleted. It never grants access. Offline mutation is prohibited by default.

## Retention and Deletion Principles

- Every owner declares purpose, audience, duration, and deletion authority.
- Retention is minimized to approved educational and operational needs.
- Deletion requires current authorization, clear consequences, preview, confirmation, and unknown-outcome recovery.
- Removing membership, distribution, projection, or connection does not silently delete work.
- Cascades across owners are prohibited until explicitly contracted.
- Legal, district, backup, export, and permanent-deletion requirements remain deferred.

## Restoration and Recovery Principles

- Restoration preserves stable identity and correct ownership.
- Restoration revalidates authorization and dependent records.
- Restoration creates no duplicates.
- Recovery never attaches data to the wrong student, classroom, project, mission, or evidence item.
- Backup restoration cannot silently revert newer authoritative state.
- Recovery point, disaster recovery, migration rollback, and support procedures remain deferred.

## Audit Ownership and Privacy

- Audit, when required, has one separate authoritative owner.
- Audit purpose, event vocabulary, audience, access, retention, correction, export, and deletion are approved before collection.
- Audit is not analytics, grading, progress, behavior monitoring, Teacher Feed, or public activity.
- Students and teachers do not receive internal audit identifiers in ordinary UI.
- Audit access never grants record mutation.
- Sensitive authentication, private identifiers, credentials, and unrelated content are excluded.
- No audit implementation is authorized by this contract.

## Builder Persistence-Adapter Boundary

Builder retains ownership of autosave/resume, downloads, screenshots, import/export, project fields, save/load representation, runtime, and assets.

A future versioned adapter must:

- Accept only verified Platform identity, authorization, and intent meanings.
- Return only approved environment-work, save, revision, availability, and recovery meanings.
- Never infer Platform identity from filename, project name, mission tile, DOM, global function, or browser key.
- Preserve Builder state on adapter failure.
- Prevent duplicate Start, Continue, save, or migration effects.
- Distinguish local artifact success from Platform persistence success.

Transport, serialization, save authority, migration, offline behavior, and reconciliation remain deferred.

## Workshop Persistence-Adapter Boundary

Workshop retains ownership of geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, Notebook, screenshots, restoration, persistence, mission state, and assets.

A future versioned adapter must:

- Accept only verified Platform identity, authorization, and intent meanings.
- Return only approved environment-work, save, revision, availability, and recovery meanings.
- Never infer identity from geometry, object IDs, screenshots, labels, assets, or runtime state.
- Preserve Workshop state on adapter failure.
- Prevent duplicate Start, Continue, save, or migration effects.
- Never reset camera, geometry, selection, measurement, or restoration during recovery.

Transport, save authority, migration, screenshot relationship, offline behavior, and reconciliation remain deferred.

## Migration and Compatibility Boundaries

- Migration requires identified source and destination owners.
- Identity mapping, revision compatibility, validation, rollback, and recovery are approved before execution.
- Existing local Builder or Workshop artifacts are not automatically Platform records.
- Migration never infers ownership from names, paths, or browser state.
- Partial migration is distinguishable and recoverable.
- Read compatibility does not authorize write conversion.
- Provider, tooling, batch behavior, downtime, and legacy retention remain deferred.

## Accessibility Requirements

Future persistence and recovery experiences must:

- Use semantic status and native controls.
- Provide visible focus and predictable return after retry, conflict, or recovery.
- Express saved, pending, stale, conflict, offline, unavailable, restored, deleted, and unknown outcomes in text.
- Avoid color-only, timed, hover-only, drag-only, or pointer-precision interactions.
- Support keyboard operation, zoom, text resize, reduced motion, and calm non-repetitive announcements.
- Never expose technical identifiers, stack traces, or another user's data.

## Chromebook Requirements

Physical validation must cover refresh without replay, double activation, interruption, timeout, unknown-outcome reconciliation, sign-out cleanup, stale and conflict states, offline/owner-unavailable handling, keyboard and touchpad use, 44px targets, zoom, wrapping, no horizontal scrolling, wrong-role and cross-user protection, Builder and Workshop regressions, and no console errors or significant slowdown.

Local desktop testing does not replace physical Chromebook validation.

## Shared Failure States

- **Unknown:** no authoritative result can be verified.
- **Stale:** freshness requirements are no longer satisfied.
- **Conflicting:** competing state prevents one safe result.
- **Unavailable:** an owner cannot currently answer.
- **Unauthorized:** the actor cannot access or mutate the state.
- **Expired:** approved lifetime has ended.
- **Revoked:** previously granted authority is no longer valid.
- **Offline:** required owner cannot be reached under an approved network meaning.
- **Outcome unknown:** a mutation was submitted but not reconciled.
- **Recovery required:** safe continuation needs an approved recovery process.

These meanings remain distinct and use calm, private presentation.

## Protected Systems

Preserve PB-001 entry/session behavior; PB-002 Timer, Memo, and Student Display session behavior; PB-003 foundations; approved PI-000A through PI-000D authority; PI-001's implementation block; all existing session keys and cleanup until separately authorized; development-fixture isolation; Builder persistence and runtime; Workshop persistence, restoration, rendering, geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, Notebook, screenshots, mission behavior, and assets.

## Deferred Decisions

All backend, database, API, provider, hosting, storage, synchronization, revision, idempotency, concurrency, conflict, offline, backup, audit, adapter, migration, retention-duration, deletion, recovery, cross-device, cross-tab, retry, timeout, and monitoring technologies remain deferred. No production identity, session, mission, distribution, project, work, evidence, or audit model is selected.

## Implementation Stop Conditions

Stop when any authoritative owner is missing; state classification or lifetime is undefined; session/cache state would become authority; revision, idempotency, concurrency, or unknown-outcome behavior is undefined; refresh could replay mutation; sign-out could delete durable data or expose protected state; offline access lacks approval; retention, deletion, restoration, recovery, or audit purpose is unclear; Builder or Workshop requires direct coupling; migration could infer identity or lose work; privacy or authorization cannot be revalidated; or implementation requires any unapproved provider, technology, format, model, algorithm, route, dependency, or adapter transport.

When blocked, report the exact missing owner or decision. Do not fill gaps with fixtures, browser storage, timestamps, filenames, DOM state, direct environment calls, or assumptions.

## Contract Acceptance Criteria

PI-000E is ready for approval when it separates all lifetime categories; preserves current session behavior; defines authority/projection, freshness, idempotency, concurrency, conflict, unknown outcome, retry, refresh, sign-out, offline, retention, recovery, audit, adapter, and migration boundaries; protects privacy and Chromebook accessibility; keeps implementation blocked; and selects no technology or data model.

## Approval Meaning

Approval establishes provider-neutral architecture authority for subsequent inspection and documentation only. It does not authorize persistence, synchronization, offline use, recovery, audit, adapters, migration, application or test changes, staging, committing, tagging, or pushing.

After review and approval, the next gate should be a PI-000 architecture readiness review covering PI-000A through PI-000E. PI-001 and interactive PB-003B/PB-003C work remain blocked until required authoritative implementations are separately approved.
