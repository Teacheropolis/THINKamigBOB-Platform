# PI-000D — Evidence and Evidence-Connection Ownership Contracts

## Architecture Contracts v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending authoritative owners, lifecycle decisions, and approved adapters

## Document Boundary

This document defines provider-neutral ownership contracts for evidence and project-to-evidence connections. It does not create evidence, connect artifacts, access external accounts, upload or copy files, expose teacher review, or implement Builder, Workshop, Google Slides, or Google Vids integration.

It does not select:

- A backend, database, schema, API, provider, or hosting platform.
- An evidence, connection, source, revision, request, or token format.
- A storage, synchronization, cache, upload, or offline technology.
- An evidence data model or adapter transport.
- A Google account, classroom, consent, sharing, or permission technology.
- A Builder or Workshop artifact format.

Future implementation requires separately approved authoritative owners, PI-000A through PI-000C implementations, source-adapter inspections, product and privacy decisions, a reviewed build specification, automated testing, physical Chromebook validation, and explicit authorization.

## Controlling References

- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PI-000A/PI-000A-IDENTITY-AND-AUTHORITY-CONTRACTS-v1.0.md`
- `docs/platform/builds/PI-000B/PI-000B-MISSION-AND-DISTRIBUTION-OWNERSHIP-CONTRACTS-v1.0.md`
- `docs/platform/builds/PI-000C/PI-000C-PROJECT-AND-WORK-IDENTITY-CONTRACTS-v1.0.md`
- PI-000D Evidence and Evidence-Connection Ownership Inspection: BLOCKED beyond documentation
- `docs/platform/builds/PB-003C/PB-003C-MY-STEM-WORK-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003C/PB-003C-BUILD-SPECIFICATION-v1.0.md`
- Platform Blueprint v1.0
- Development Standards v1.0

## Contract Principles

1. Source artifact, evidence identity, project connection, revision, and presentation remain separate ownership domains.
2. Every evidence item has one authoritative source owner.
3. One approved evidence-connection owner controls project-to-evidence relationships.
4. Evidence presence is factual; it is not reflection, quality, mastery, grade, progress, or teacher review.
5. Students retain ownership and privacy boundaries for their evidence relationships.
6. Teachers receive only separately authorized visibility and do not become evidence owners.
7. Connecting, reconnecting, removing, or restoring is idempotent and refresh-safe.
8. Removing a connection does not delete the source artifact.
9. Source deletion or permission loss is never disguised as ordinary empty state.
10. PB-003C owns Evidence Connections presentation only.
11. Builder, Workshop, Slides, and Vids remain protected source systems.
12. Missing ownership, authorization, project identity, freshness, permission, or lifecycle guarantees stop implementation safely.

## Shared Vocabulary

### Source Artifact

A file, save, screenshot, video, slide presentation, document, notebook output, or other item controlled by its originating system. Existence alone does not make it Platform evidence.

### Evidence Item

An authoritative, student-owned evidence identity referencing an approved source artifact for an approved educational purpose. It is not the artifact itself unless a future owner explicitly defines that relationship.

### Evidence Source

The authoritative system responsible for a source artifact's identity, access, revisions, availability, and deletion meaning.

### Evidence Connection

An authoritative relationship connecting one verified evidence item to one verified student-owned project.

### Evidence Revision

A source-owned revision or freshness meaning sufficient to present or validate evidence safely. Its representation is deferred.

### Evidence Projection

A minimal, authorized, read-only view supplied to PB-003C. It is not a master record and cannot authorize mutation.

## Contract 1 — Evidence Identity

### Purpose

Resolve one stable evidence identity without deriving it from a filename, URL, title, screenshot timestamp, DOM node, Builder field, Workshop object, Slides title, Vids title, or card position.

### Authoritative Owner

One approved evidence owner, with source identity resolved through the approved source owner.

### Minimum Request Meaning

- Verified actor, purpose, and authorization.
- Verified student owner.
- Approved source reference.
- Required freshness and project context when applicable.

### Minimum Successful Result

- Stable evidence identity reference.
- Verified student-owner relationship.
- Verified source relationship.
- Factual lifecycle and availability meaning.
- Revision or freshness meaning when required.
- Owner information.

This defines meanings, not a record schema.

### Required Guarantees

- Visible labels and filenames are not identity.
- One identity is never reused for unrelated evidence or another student.
- Changing a title does not automatically create new identity.
- Evidence identity remains separate from source-artifact, project, mission, and connection identity.
- Evidence identity does not imply teacher review, quality, completion, publication, or permission to view.
- Unknown or conflicting identity fails closed without deleting source content.

### Failure States

- Unknown evidence.
- Evidence-owner mismatch.
- Source relationship unknown.
- Identity conflicting.
- Evidence removed, unavailable, or stale.
- Owner unavailable.

### Deferred Decisions

Identity representation, issuer technology, creation policy, eligible evidence types, and migration remain deferred.

## Contract 2 — Evidence-Source Ownership

### Purpose

Keep source artifact ownership with the originating system while allowing a minimal authorized evidence reference.

### Source Owner Controls

- Source-artifact identity and lifecycle.
- Access and permission truth.
- Revision and freshness truth.
- Source deletion, restoration, and availability.
- Safe preview or access capability when approved.

### Required Guarantees

- Platform does not become source owner by displaying or connecting an artifact.
- An adapter cannot claim a source artifact exists without source confirmation.
- A source reference does not grant access.
- Source permission is revalidated for protected viewing and mutation.
- Cached source facts cannot silently become authoritative.
- Source-specific private fields are not copied into Platform projections without approval.

### Deferred Decisions

Eligible sources, source enrollment, discovery, import, upload, copying, mirroring, and source-specific permission mechanics remain deferred.

## Contract 3 — Source Artifact Versus Evidence Record

### Purpose

Prevent local artifacts and external files from automatically becoming Platform evidence.

### Required Boundary

- A Builder screenshot, download, save, or autosave is a Builder artifact.
- A Workshop screenshot, notebook view, save, or runtime state is a Workshop artifact or state.
- A Slides presentation remains owned by its approved source.
- A Vids project or video remains owned by its approved source.
- Platform evidence requires an approved evidence identity and purpose.
- A project connection requires a separate authoritative connection.

### Required Guarantees

- Artifact creation alone does not create evidence or a connection.
- Opening or viewing an artifact is not evidence creation.
- A screenshot does not prove progress, quality, or authorship.
- A file name or URL is not a durable evidence identity.
- Notebook content is not evidence merely because it is visible.
- Platform never implies ingestion, upload, copying, or ownership when only a reference exists.

## Contract 4 — Student-to-Evidence Ownership

### Purpose

Bind evidence to the correct student without treating classroom membership, teacher access, or source-account possession as ownership.

### Required Guarantees

- Every evidence item under the current scope has one verified student-owner relationship.
- Student identity comes from PI-000A authority.
- Project ownership and evidence ownership are verified independently before connection.
- Display-name, classroom, roster, or account-label changes do not transfer ownership.
- Leaving a classroom does not automatically delete or transfer evidence.
- Teachers do not become owners by viewing or discussing evidence.
- Another student never receives the evidence projection, source reference, or permission details.
- Ownership conflict fails closed while preserving source records.

### Deferred Decisions

Team evidence, transfers, duplicates, guardian access, account recovery, classroom exit, and long-term access remain deferred.

## Contract 5 — Project-to-Evidence Connection

### Purpose

Relate one verified evidence item to one verified student-owned project without merging their identities or owners.

### Required Inputs

- Verified student identity and authorization.
- Verified project identity and student ownership from PI-000C.
- Verified evidence identity and student ownership.
- Verified source availability and permission.
- Approved connection intent and freshness context.

### Minimum Successful Result

- Stable connection identity reference.
- Verified project and evidence relationship.
- Factual lifecycle meaning.
- Owner, permission, revision, and freshness information.

### Required Guarantees

- Project and evidence identities remain separate.
- Connection does not copy, move, publish, or delete source content unless separately approved.
- One evidence item cannot be connected to another student's project.
- Connection does not imply reflection, teacher review, progress, or completion.
- Project archive or mission removal does not automatically delete evidence.
- Connection removal does not delete source or project.

### Deferred Decisions

One-to-many relationships, multiple-project use, connection ordering, labels, captions, and student annotations remain deferred.

## Contract 6 — Evidence-Connection Ownership

### Authoritative Owner

One approved evidence-connection owner.

### Owner Controls

- Connection identity and lifecycle.
- Idempotent connect, remove, and restore outcomes.
- Verified project and evidence references.
- Connection-level authorization and freshness.
- Duplicate detection.
- Projection to PB-003C.

### Owner Does Not Control

- Source-artifact content or permissions.
- Project identity or lifecycle.
- Mission identity or distribution.
- Reflection content.
- Teacher review.
- Builder, Workshop, Slides, or Vids behavior.

### Required Guarantees

- Browser storage and development fixtures cannot own durable connections.
- Presentation order cannot become connection identity.
- Connection owner revalidates both sides before mutation.
- Owner unavailability does not grant access or fabricate empty state.

## Contract 7 — Source-Reference Validation

### Purpose

Verify that an approved source reference resolves safely for the requested purpose.

### Required Result

- Source exists or a precise safe failure meaning.
- Source type and ownership relationship are verified.
- Current permission for the requested actor and purpose.
- Current revision or freshness meaning.
- Safe preview or access capability when separately approved.
- No side effect.

### Required Guarantees

- Validation does not connect, copy, publish, download, or modify evidence.
- URL possession is insufficient.
- Redirects, aliases, filenames, and titles do not establish identity.
- Source-owner unavailability remains distinct from permission denial or deletion.
- Unsafe or unverifiable references cannot produce enabled evidence actions.

## Contract 8 — Evidence Revision and Freshness

### Purpose

Present the correct source state without silently replacing, freezing, or misrepresenting evidence.

### Required Guarantees

- Source owner remains authoritative for revision meaning.
- Evidence owner records only the approved relationship to revision or freshness truth.
- A newer source revision does not silently become a reviewed or selected evidence revision.
- A stale projection cannot authorize connection, removal, replacement, or viewing.
- Revision changes do not create duplicate evidence identity unless approved policy requires it.
- Unknown revision compatibility stops replacement or restoration.
- UI distinguishes current, stale, unavailable, changed, and permission-lost meanings.

### Deferred Decisions

Pinned versus live revisions, revision history, comparison, thumbnails, preview generation, and update notifications remain deferred.

## Contract 9 — Idempotent Connection

### Purpose

Connect one verified evidence item to one verified project exactly once for one valid intent.

### Required Sequence

1. Revalidate student identity, ownership, and authorization.
2. Revalidate project identity and lifecycle.
3. Revalidate evidence and source identity.
4. Revalidate source permission, revision, and availability.
5. Query existing authoritative connections.
6. Apply the relationship once through the connection owner.
7. Return authoritative confirmed state.
8. Announce success only after confirmation.

### Required Guarantees

- Double activation creates one relationship.
- Equivalent retry does not create a duplicate.
- Refresh never replays connection mutation.
- Stale state cannot overwrite newer connection state.
- Partial failure does not appear connected.
- Unknown outcome is reconciled before retry.
- Connection does not mutate the source artifact or project content.

### Deferred Decisions

Idempotency representation, revision mechanism, pending lifetime, concurrency, retry, and atomicity remain deferred.

## Contract 10 — Duplicate Prevention

### Purpose

Prevent multiple records from representing the same approved project-to-evidence relationship.

### Required Guarantees

- Duplicate evaluation is performed by the authoritative connection owner.
- Labels, filenames, URLs, thumbnails, and presentation order are not duplicate keys.
- An existing valid relationship resolves to that relationship.
- Conflicting source identities or revisions stop mutation.
- Duplicate prevention never merges evidence across students.
- Unknown existing state is not interpreted as no connection.

### Deferred Decisions

Duplicate equivalence, revision-specific connections, multiple-project reuse, copies, and replacement semantics remain deferred.

## Contract 11 — Connection Removal

### Purpose

Remove a project-to-evidence relationship without deleting source evidence or project work.

### Required Guarantees

- Current student ownership and action authorization are revalidated.
- Teacher removal, if ever allowed, requires separate explicit authority and policy.
- Preview clearly distinguishes disconnecting from deleting.
- Removal is idempotent.
- Removal affects only the connection.
- Source artifact, evidence identity, project, reflection, and environment work remain unchanged.
- PB-003C stops showing the relationship only after authoritative confirmation.
- Unknown removal outcome is reconciled before retry.

### Deferred Decisions

Who may remove, recovery window, reason capture, teacher involvement, audit, and retention remain deferred.

## Contract 12 — Source Deletion and Permission Loss

### Purpose

Respond safely when a connected source is deleted, moved, made private, or no longer accessible.

### Required Guarantees

- Source deletion is owned by the source system.
- Permission loss is distinct from deletion, removal, and owner unavailability.
- Platform does not claim source deletion without confirmation.
- A broken connection does not delete the project or other evidence.
- Cached previews do not bypass revoked access.
- Student-facing presentation uses calm, private language.
- Teacher visibility cannot exceed current source and classroom authorization.
- Recovery or relinking requires separately approved behavior.

### Deferred Decisions

Broken-reference retention, cached previews, relinking, ownership transfer, source trash, and permanent-deletion timing remain deferred.

## Contract 13 — Evidence Replacement and Restoration

### Replacement Guarantees

- Replacement is a separate previewed and confirmed intent.
- New evidence identity, source, ownership, revision, and permission are verified.
- Replacement does not overwrite or delete the prior source artifact.
- Connection history is not fabricated.
- Unknown revision or duplicate state stops replacement.

### Restoration Guarantees

- Restoring a removed connection preserves its stable identity when policy permits.
- Restoration revalidates project, evidence, ownership, permission, and source availability.
- Restoration creates no duplicate relationship.
- Restoration does not imply teacher review or publication.

### Deferred Decisions

Replacement history, supersession, restoration window, revision pinning, and audit presentation remain deferred.

## Contract 14 — PB-003C Evidence Connections Projection

### Purpose

Supply PB-003C with minimal verified evidence relationships without making PB-003C an evidence or connection owner.

### Required Dependencies

- Verified student identity and authorization.
- Verified PI-000C project identity and ownership.
- Verified evidence connection.
- Verified source availability and permission.
- Approved freshness meaning.

### Minimum Projection

When authorized, PB-003C may receive:

- Student-safe source label.
- Student-safe evidence title or type when verified.
- Factual connection and availability meaning.
- Approved revision or changed-state meaning.
- Approved safe preview or open capability when separately implemented.
- Owner and freshness information.

### Required Guarantees

- PB-003C remains presentation owner only.
- Builder, Workshop, Google Slides, and Google Vids remain `Coming Later` until approved adapters exist.
- No fabricated evidence, thumbnails, revisions, dates, progress, or review state appears.
- Another student's evidence never appears.
- Evidence presence does not become reflection or a score.
- Empty, unavailable, stale, permission-lost, and removed states remain distinct.
- Raw identities, URLs, permission details, and internal source metadata stay out of ordinary UI.
- Projection access does not mutate last-opened, progress, or review state.

## Contract 15 — Teacher Visibility

### Purpose

Permit only separately authorized educational visibility without changing student ownership or implying review.

### Required Guarantees

- Teacher identity is verified independently from classroom authority.
- Current classroom authorization and approved purpose are required.
- Teacher visibility is read-only unless a later contract authorizes a specific action.
- Teachers receive only evidence connected to projects they are authorized to view.
- Visibility does not expose source credentials, private account structure, unrelated files, or other classrooms.
- Access ends or changes according to membership and classroom lifecycle policy.
- Viewing evidence does not create a review event automatically.
- Evidence is not shared to Student Display, Teacher Feed, reports, or public recognition without separate approval.

### Deferred Decisions

Teacher navigation, comments, feedback, requests, download, export, review actions, and post-class access remain deferred.

## Contract 16 — Teacher-Review Separation

### Required Boundary

- Evidence presence means only that verified evidence is connected and available.
- Teacher viewing is not teacher review unless an approved review owner records that event.
- Review status, feedback, approval, grading, and completion are separate domains.
- No timestamp, open event, thumbnail generation, or access log may imply review.
- Students are never blocked from continuing work because review is pending.
- UI must not say reviewed, approved, checked, complete, or successful without authoritative confirmation.

Teacher-review identity, workflow, lifecycle, and presentation remain out of scope.

## Contract 17 — Builder Evidence-Adapter Boundary

Builder retains ownership of its geometry, mission runtime, project fields, screenshots, downloads, autosave/resume, save/load representation, UI, navigation, and assets.

A future versioned adapter may expose only approved source meanings such as artifact reference, source ownership, revision/freshness, safe preview capability, and availability.

It must guarantee:

- Builder artifacts do not automatically become Platform evidence.
- Identity is not inferred from filename, project name, mission tile, function, browser key, or DOM.
- Evidence connection does not alter Builder work.
- Screenshot or download creation does not claim connection success.
- Adapter failure preserves Builder state.
- Platform does not inspect Builder globals or DOM as an evidence interface.

Transport, serialization, capture behavior, save ownership, upload, copying, return behavior, and migration remain deferred.

## Contract 18 — Workshop Evidence-Adapter Boundary

Workshop retains ownership of rendering, geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, Engineering Notebook, screenshots, mission restoration, persistence, and assets.

A future versioned adapter may expose only approved source meanings such as artifact reference, source ownership, revision/freshness, safe preview capability, and availability.

It must guarantee:

- Workshop screenshots and Notebook presentation do not automatically become evidence.
- Identity is not inferred from geometry, selection, screenshot pixels, asset names, object IDs, or runtime state.
- Evidence connection does not alter Workshop state.
- Adapter failure preserves geometry, camera, selection, measurement, and restoration behavior.
- Platform does not inspect Workshop internals as an evidence interface.
- Notebook content remains separate from reflection and evidence unless separately approved.

Transport, screenshot capture, Notebook authorship, persistence, save ownership, upload, copying, and migration remain deferred.

## Contract 19 — Google Slides Evidence-Adapter Boundary

Google Slides remains an unconnected future source. No current Platform label grants account, file, permission, preview, or evidence authority.

A future adapter must:

- Use an approved account and authorization boundary.
- Verify source identity, student relationship, project relationship, permission, and revision.
- Request only minimum approved access.
- Avoid exposing unrelated Drive content.
- Distinguish owner, editor, viewer, link access, unavailable, and permission-lost meanings as required.
- Avoid copying or changing sharing without explicit approval.
- Preserve source ownership and revisions.
- Fail safely when access is unavailable or revoked.

Account model, provider configuration, scopes, file selection, classroom relationship, sharing, copying, export, preview, and revision technology remain deferred.

## Contract 20 — Google Vids Evidence-Adapter Boundary

Google Vids remains an unconnected future source. No current Platform label grants account, file, permission, playback, or evidence authority.

A future adapter must:

- Use an approved account and authorization boundary.
- Verify source identity, student relationship, project relationship, permission, and revision.
- Request only minimum approved access.
- Avoid exposing unrelated Drive content.
- Distinguish source availability, processing, playback readiness, and permission loss.
- Avoid copying, publishing, or changing sharing without explicit approval.
- Preserve source ownership and revisions.
- Fail safely when access is unavailable or revoked.

Account model, provider configuration, scopes, file selection, classroom relationship, sharing, playback, copying, export, preview, and revision technology remain deferred.

## Lifecycle and Persistence Requirements

### Required Lifecycle Meanings

Future owners must distinguish:

- Proposed or pending evidence identity.
- Available evidence.
- Connected evidence.
- Changed or stale source evidence.
- Permission-lost evidence.
- Source-unavailable evidence.
- Removed connection.
- Restorable connection.
- Deleted or unavailable source.
- Conflicting or recovery-required state.

Final state names remain deferred.

### Persistence Requirements

- Evidence identity and confirmed connections require authoritative durable lifetimes.
- `sessionStorage`, local UI state, development fixtures, filenames, and URLs cannot own durable evidence.
- Every projection declares source and freshness.
- Every mutation defines idempotency, concurrency, and unknown-outcome recovery.
- Source and connection owners define refresh, sign-out, device-change, offline, expiry, and recovery behavior.
- Cached presentation is distinguishable from authoritative state.
- Cross-device visibility cannot be claimed without an approved durable owner.

Storage technology, propagation timing, backup, offline cache, synchronization, and recovery implementation remain deferred.

## Retention, Deletion, Restoration, and Audit Principles

### Retention

- Evidence and connection owners define separate retention purposes and durations.
- Retention must be minimized and disclosed for the approved educational purpose.
- Source retention and Platform connection retention are not assumed to match.

### Deletion

- Source deletion is controlled by the source owner.
- Connection deletion or removal is controlled by the connection owner.
- Each operation requires clear consequences, authorization, confirmation, and unknown-outcome recovery.
- Deleting a connection does not delete a source artifact or project.
- Deleting a project must not silently delete source artifacts.

### Restoration

- Restoration preserves stable identity and ownership.
- Restoration revalidates permission and prevents duplicates.
- A source that no longer exists cannot be represented as restored.

### Audit

- Audit, if required, is a separate protected owner and audience.
- Audit records do not become student progress, grading, behavior, or public activity feeds.
- Audit presentation and retention require separate approval.

Exact retention, deletion, restoration, legal, consent, audit, export, and recovery policies remain deferred.

## Privacy and Authorization Requirements

Future implementations must:

- Verify student identity, project ownership, evidence ownership, and action authorization independently.
- Verify teacher identity, classroom authority, purpose, and source permission before visibility.
- Revalidate authorization and permission at mutation and protected access time.
- Minimize fields and source access by purpose and audience.
- Prevent cross-student, cross-classroom, and unrelated-source disclosure.
- Keep raw identities, URLs, revisions, account details, and permission structures out of ordinary UI.
- Never expose private identifiers or credentials to source adapters or presentation unnecessarily.
- Avoid collecting grades, behavior, inferred ability, support classifications, or surveillance data.
- Keep evidence out of public displays, Teacher Feed, reports, analytics, Hall of Fame, and AI without separate approval.
- Preserve evidence as distinct from reflection.
- Clear protected local presentation on sign-out or failed revalidation without deleting authoritative records.

## Accessibility Requirements

Future evidence experiences must:

- Use semantic regions, headings, lists, and native controls.
- Preserve the PB-003C reading and focus order.
- Provide visible focus and predictable return after preview, connect, remove, or error.
- Communicate source, connection, revision, pending, stale, conflict, unavailable, permission-lost, removed, and unknown-outcome meanings in text.
- Never rely on color, thumbnails, icons, motion, hover, audio, drag, or pointer precision alone.
- Provide meaningful text alternatives for approved visual evidence previews.
- Support keyboard operation without drag-and-drop.
- Wrap long titles, source labels, permission messages, and errors.
- Support browser zoom, text resizing, and reduced motion.
- Avoid timed responses and repetitive announcements.

## Chromebook Requirements

Every future implementation must physically validate:

- Student project and evidence orientation.
- Clear source-artifact versus connected-evidence meaning.
- Keyboard and touchpad selection, connection, preview, removal, and restoration when authorized.
- 44px minimum practical interaction targets.
- Double activation creates one connection.
- Refresh does not repeat connection, removal, or restoration.
- Source permission and stale-state revalidation.
- Teacher visibility and review separation.
- Long titles, status messages, zoom, and text resizing.
- No horizontal or nested scrolling and no clipped state.
- Wrong-role, cross-student, cross-classroom, refresh, and sign-out protection.
- Permission-lost, owner-unavailable, offline, conflict, and unknown-outcome recovery.
- Builder and Workshop regression and smoke tests.
- No source mutation, console errors, or significant slowdown.

Local desktop testing does not replace physical Chromebook validation.

## Shared Error and Recovery States

### Unknown

No authoritative evidence, source, project, connection, ownership, or permission relationship can be verified. Unknown is not empty.

### Stale

A projection, revision, permission, authorization, or intent no longer meets freshness requirements. It cannot authorize mutation or protected viewing.

### Conflicting

Owners, revisions, or concurrent changes cannot provide one safe result. Preserve the last verified state and stop mutation.

### Unavailable

An authoritative owner or source cannot answer safely. Unavailable is distinct from missing, deleted, removed, or denied.

### Permission Lost

The source relationship may still exist, but the current actor or Platform can no longer verify approved access. Cached content cannot bypass this state.

### Removed

The project-to-evidence connection is no longer active. Removed does not mean the source artifact, evidence identity, or project was deleted.

### Unauthorized

The actor cannot view or mutate the requested evidence in the current context. Do not reveal whether another student's evidence exists.

### Source Deleted

The source owner confirms that the referenced artifact no longer exists under the approved meaning. Platform does not infer deletion from a failed request alone.

### Outcome Unknown

A connect, remove, replace, restore, or delete request was submitted, but its authoritative result is unknown. Re-read before retry.

### Presentation Rules

- Use calm factual language.
- Do not expose raw identities, URLs, permissions, revisions, stack traces, or another person's data.
- Do not announce connection, review, replacement, restoration, or deletion without confirmation.
- Distinguish empty, unavailable, stale, conflict, permission lost, unauthorized, removed, source deleted, and unknown outcome.
- Preserve verified projects and source artifacts during recovery.

## Protected Systems

PI-000D documentation and future work must preserve:

- PB-001 entry, roles, routing, refresh, and sign-out.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Mission Choice.
- PB-003C My STEM Work hierarchy and honest Evidence Connections states.
- Approved PI-000 and PI-000A through PI-000C architecture authority.
- PI-001 implementation block.
- Student reflection as a separate domain.
- Builder geometry, missions, screenshots, downloads, autosave, save/load, runtime, UI, navigation, and assets.
- Workshop geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, Engineering Notebook, screenshots, restoration, persistence, and assets.
- Google Slides and Google Vids remaining unconnected.
- Existing approved documents and unrelated files.

## Deferred Decisions

PI-000D v1.0 does not decide:

- Backend, database, schema, API, provider, hosting, or service topology.
- Evidence, source, connection, revision, request, idempotency, or token format.
- Storage, cache, upload, synchronization, or offline technology.
- Evidence data model or adapter transport.
- Eligible evidence types or evidence creation workflow.
- Automatic versus student-selected connections.
- Multiple-project connection policy, ordering, captions, or annotations.
- Revision pinning, live updates, history, comparison, preview, or thumbnails.
- Duplicate equivalence, replacement, restoration, or relinking policy.
- Source deletion, permission loss, retention, recovery, or audit implementation.
- Teacher comments, feedback, requests, review, approval, grading, or download.
- Builder or Workshop evidence-adapter implementation.
- Google account model, provider configuration, scopes, consent, classroom mapping, sharing, file selection, playback, or export.
- Portfolio publication, public sharing, reports, analytics, credits, badges, Hall of Fame, or AI.

## Implementation Stop Conditions

Stop before implementing PI-000D, connected PB-003C evidence, or dependent PI-001 work when:

- Evidence identity or source owner is unidentified.
- Connection owner is unidentified.
- PI-000A authorization or PI-000C project ownership lacks authoritative implementation.
- Identity would be inferred from a filename, URL, title, DOM node, screenshot, Builder field, Workshop state, or fixture.
- Student ownership or teacher classroom authority cannot be verified.
- Source permission and freshness cannot be revalidated.
- Evidence qualification or educational purpose is undefined.
- Idempotency, duplicate prevention, concurrency, or unknown-outcome behavior is undefined.
- Refresh could repeat mutation or show stale evidence as current.
- Connection removal could delete source content or project work.
- Source deletion and permission loss cannot be distinguished.
- Revision behavior or replacement policy is undefined.
- Teacher viewing could be mistaken for review.
- Evidence could be mistaken for reflection, progress, quality, completion, or grade.
- Durable evidence or connections would rely only on session or device-local state.
- Builder, Workshop, Slides, or Vids requires direct presentation-layer coupling.
- Privacy purpose, audience, retention, deletion, or consent is unclear.
- Implementation requires an unapproved provider, account model, route, dependency, format, storage model, evidence model, permission technology, or adapter transport.

When blocked, return the exact missing owner or decision. Do not fill gaps with fixtures, browser storage, filenames, URLs, DOM inspection, screenshots, direct source calls, or assumptions.

## Contract Acceptance Criteria

PI-000D contracts are ready for approval when they:

- Separate source artifact, evidence, connection, revision, project, and presentation ownership.
- Define evidence and student ownership without selecting identity formats.
- Define source validation, revision freshness, idempotent connection, and duplicate prevention.
- Keep connection removal separate from source deletion.
- Define permission-loss, replacement, and restoration behavior safely.
- Preserve PB-003C as presentation owner only.
- Separate teacher visibility from teacher review.
- Protect Builder, Workshop, Google Slides, and Google Vids behind future adapters.
- Define lifecycle, persistence, retention, deletion, restoration, and audit principles.
- Cover privacy, authorization, accessibility, Chromebook, and recovery states.
- Keep PI-000D and dependent implementation blocked until authoritative owners exist.
- Select no provider, technology, identity format, evidence model, account model, permission technology, route, or adapter transport.

## Approval Meaning

Approval establishes these provider-neutral contracts as architecture authority for subsequent ownership inspections and documentation.

Approval does not authorize evidence implementation, source access, evidence creation, project connections, uploads, copies, previews, teacher review, Builder or Workshop adapters, Google integration, application changes, test changes, staging, committing, tagging, or pushing.

After review and approval, the next PI-000 decomposition inspection should address PI-000E — Persistence, Concurrency, and Recovery Contracts. PI-001 and interactive PB-003B/PB-003C work remain blocked until the required owners and infrastructure contracts have separately approved authoritative implementations.
