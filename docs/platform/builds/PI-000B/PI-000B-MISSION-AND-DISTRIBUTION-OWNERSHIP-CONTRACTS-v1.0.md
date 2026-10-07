# PI-000B — Mission and Distribution Ownership Contracts

## Architecture Contracts v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending authoritative owners and lifecycle decisions

## Document Boundary

This document defines provider-neutral mission and distribution ownership contracts only. It does not authorize implementation, create mission or distribution records, define a mission data model, select storage, add routes, modify Builder or Workshop, or connect PB-003B to live availability.

It deliberately does not select:

- A backend or service topology.
- A database or schema.
- An API or event protocol.
- A provider or hosting platform.
- An identity, version, distribution, revision, or token format.
- A storage, cache, synchronization, or offline technology.
- A canonical mission-record representation.

These contracts describe ownership meanings and guarantees. Future owners may implement them only after targeted inspection, approved product and lifecycle decisions, a reviewed build specification, testing, physical Chromebook validation, and explicit approval.

## Controlling References

- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PI-000A/PI-000A-IDENTITY-AND-AUTHORITY-CONTRACTS-v1.0.md`
- PI-000B Mission and Distribution Ownership Inspection: BLOCKED beyond documentation
- `docs/platform/builds/PI-001/PI-001-MISSION-DISTRIBUTION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-001/PI-001-MISSION-DISTRIBUTION-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-DESIGN-DECISIONS-v1.0.md`
- Platform Blueprint v1.0
- Development Standards v1.0

## Contract Principles

All PI-000B contracts follow these rules:

1. Mission definition, mission version, distribution, student work, destination, and presentation have separate owners.
2. Mission titles, filenames, DOM IDs, JavaScript functions, card positions, and tool names are not identities.
3. Distribution controls availability, not ability, work, launch, progress, or completion.
4. Continue remains owned by the project/work system and precedes Start when verified.
5. PB-003B remains the only student Mission Choice presentation owner.
6. No teacher draft becomes student-visible before authoritative confirmation.
7. Confirmation is idempotent and refresh never repeats it.
8. Removing availability never deletes mission definitions or student work.
9. Builder and Workshop remain protected work environments.
10. Unknown, stale, conflicting, or unavailable ownership fails safely.

## Shared Contract Vocabulary

### Mission

An authoritative educational mission definition. It is separate from its visible title, its versions, its distributions, and student work created in its context.

### Mission Version

An authoritative versioned content contract for one mission. The representation and compatibility mechanism are deferred.

### Mission Catalog Projection

A minimal, authorized, read-only presentation of mission facts supplied by the mission owner. It is not the mission master record.

### Distribution

An authoritative relationship making one mission version available to one classroom under approved ordering and focus rules.

### Draft

Unconfirmed teacher intent. A draft is private and does not change student availability.

### Confirmed Availability

An authoritative distribution state that PB-003B may present after all required authorization and destination checks succeed.

### Current Classroom Focus

Presentation emphasis for at most one confirmed available mission. It is not a forced Start, recommendation, deadline, grade, or Continue override.

### Destination Readiness

A factual result from the approved destination owner indicating whether a mission has a functional authorized Start destination.

### Student Presentation Projection

The minimal verified facts PB-003B may use to display teacher-authorized choices.

## Contract 1 — Mission Identity

### Purpose

Resolve one stable mission identity without relying on visible title, Builder function, starter-card order, filename, DOM content, or work-environment label.

### Authoritative Owner

One approved mission owner.

### Minimum Request Meaning

A caller requests resolution of a mission reference supplied by the approved mission owner or another authorized owner relationship.

### Minimum Successful Result

- Stable mission identity reference.
- Factual lifecycle meaning sufficient for the requested purpose.
- Owner and freshness information.
- No assumption about current version, distribution, destination, or student work.

### Required Guarantees

- Title or copy changes do not automatically create a new mission identity.
- One identity is not reused for a different mission.
- Builder launcher names and Workshop labels do not become mission identity.
- Mission identity remains separate from mission-version identity.
- Mission identity alone does not authorize distribution or launch.
- Retired or unavailable missions remain distinguishable from unknown missions.

### Failure States

- Unknown mission.
- Mission retired or inactive.
- Mission identity conflicting.
- Mission identity stale.
- Mission owner unavailable.

### Privacy Boundary

Mission identity references remain out of ordinary student and teacher UI unless a separately approved support purpose requires display.

### Deferred Decisions

Identity representation, issuer technology, mission creation, authoring, publication, retirement, restoration, and retention remain deferred.

## Contract 2 — Mission Version

### Purpose

Resolve the authoritative content version associated with one mission for distribution or existing work without silently migrating between versions.

### Authoritative Owner

The approved mission owner or one explicitly approved mission-version owner.

### Minimum Request Meaning

- Verified mission identity reference.
- Requested purpose, such as new distribution or existing-work resolution.
- Existing mission-version reference when resolving student work.

### Minimum Successful Result

- Stable mission-version identity reference.
- Relationship to the verified mission identity.
- Factual lifecycle and distributable meaning for the requested purpose.
- Compatibility meaning sufficient to prevent unsafe replacement.
- Owner and freshness information.

### Required Guarantees

- Mission identity and version identity remain separate.
- Existing work retains its authoritative version relationship.
- New distribution uses only a verified distributable version.
- Retiring a version does not delete existing work.
- Newer content does not silently replace a version attached to work.
- Unknown compatibility stops migration, launch, or reassignment.
- Version identity is not inferred from timestamps, file names, code comments, or title text.

### Failure States

- Unknown version.
- Version does not belong to mission.
- Version retired for new distribution.
- Version unavailable.
- Compatibility unknown or conflicting.
- Version result stale.
- Owner unavailable.

### Deferred Decisions

Version representation, compatibility rules, editorial-change thresholds, migration, localization, retirement, and restoration remain deferred.

## Contract 3 — Mission Catalog Projection

### Purpose

Provide authorized teachers and student presentation owners with minimal read-only mission facts without exposing or duplicating the mission owner's full record.

### Authoritative Source

The approved mission owner.

### Minimum Request Meaning

- Verified actor and purpose.
- Relevant classroom context when distribution eligibility depends on it.
- Requested catalog scope.
- Current authorization and freshness requirements.

### Minimum Successful Projection

When authorized and available, the projection may include:

- Mission identity reference for internal resolution.
- Mission-version identity reference for internal resolution.
- Student-safe title.
- Student-safe short description.
- Factual distributable meaning.
- Factual lifecycle meaning necessary for the view.
- Approved work-environment relationship labels.
- Destination-readiness reference or status from the proper owner.
- Projection freshness information.

This list defines meanings, not a record schema.

### Required Guarantees

- Every projected fact remains traceable to its owner.
- Projection is read-only.
- Projection does not become a second mission master.
- Stale projection cannot authorize distribution.
- Catalog viewing does not distribute, launch, or create work.
- Unavailable missions do not appear as enabled choices.
- Builder and Workshop internals are not read directly to construct the projection.
- Long student-safe content can be presented accessibly.

### Prohibited Projection Content

- Unapproved internal instructions.
- Raw IDs in ordinary UI.
- Popularity or rankings.
- Grades, difficulty claims, or inferred readiness.
- Progress or completion.
- Teacher-review state.
- Fabricated thumbnails or environment relationships.

### Failure States

- No approved missions.
- Mission unavailable.
- Projection stale.
- Destination state unavailable.
- Actor unauthorized.
- Mission owner unavailable.

### Deferred Decisions

Catalog query, transport, caching, pagination, search, filtering, localization, and presentation quantity remain deferred.

## Contract 4 — Distribution Identity

### Purpose

Resolve one stable authoritative availability relationship without deriving identity from mission title, classroom name, Start position, or current-focus status.

### Authoritative Owner

One approved distribution owner.

### Relationship Meaning

One distribution identity relates:

- One verified mission identity.
- One verified mission-version identity.
- One verified classroom identity.
- One class-wide availability lifecycle.

The representation remains deferred.

### Minimum Successful Result

- Stable distribution identity reference.
- Verified mission, version, and classroom relationship.
- Factual lifecycle meaning.
- Owner and freshness information.

### Required Guarantees

- One active class-wide relationship exists for the same classroom, mission, and version under the approved PI-001 scope.
- Repeated confirmation resolves to the same single relationship rather than a duplicate.
- Changing order or focus does not create a new mission or student work record.
- Removal does not reuse the identity for a different relationship.
- Restoration reconnects the same authoritative relationship when policy permits.
- Identity does not depend on visible order or labels.

### Failure States

- Distribution unknown.
- Relationship inconsistent.
- Duplicate active relationships detected.
- Distribution stale.
- Distribution inactive or removed.
- Distribution owner unavailable.

### Deferred Decisions

Identity representation, creation mechanism, lifecycle state names, retention, audit, and restoration identity behavior remain deferred.

## Contract 5 — Class-Wide Availability

### Purpose

Determine the verified Start choices available to the current authorized classroom.

### Required Dependencies

- Verified teacher authority for mutations.
- Verified student membership for student presentation.
- Verified classroom identity.
- Verified mission and version identity.
- Verified distribution state.
- Verified destination readiness.

### Minimum Successful Result

- Zero through three confirmed available mission-version relationships.
- Explicit first, second, and third Start order where present.
- At most one current classroom focus.
- Freshness and owner information.
- No teacher draft or private change history.

### Required Guarantees

- More than three primary Start choices cannot be confirmed.
- Fewer than three remain valid.
- Order is explicit and stable.
- No random rotation, hidden ranking, or inferred personalization occurs.
- Side Paths do not occupy primary Start positions.
- Availability does not force Start.
- Availability does not imply ability, readiness, grade, or completion.
- Student presentation receives only current verified classroom availability.
- Stale state cannot appear as current.

### Failure States

- No confirmed choices.
- Classroom unauthorized.
- Membership unavailable.
- Distribution unavailable or stale.
- Destination unavailable.
- Invalid or conflicting choice set.
- Distribution owner unavailable.

### Deferred Decisions

Availability lifecycle names, classroom closure behavior, multi-class switching, cross-device propagation, and offline presentation remain deferred.

## Contract 6 — Current Classroom Focus

### Purpose

Provide one optional presentation emphasis among confirmed Start choices without overriding Continue or creating a forced assignment.

### Required Inputs

- Verified classroom identity.
- Verified confirmed Start-choice set.
- Proposed focus mission-version relationship or no focus.
- Current authoritative distribution revision or equivalent conflict context.
- Verified teacher classroom authorization.

### Minimum Successful Result

- Zero or one current classroom focus within the confirmed Start set.
- Factual replacement outcome when focus changes.
- Owner and freshness information.

### Required Guarantees

- Focus must belong to the confirmed class-wide Start set.
- At most one focus exists.
- Changing focus does not remove other choices automatically.
- Focus never appears before verified Continue work.
- Focus does not imply requirement, recommendation, deadline, grade, readiness, or review.
- No replacement occurs without preview and explicit confirmation.
- Unknown or conflicting current focus stops mutation.

### Failure States

- Proposed focus not in Start set.
- Multiple focus records detected.
- Existing focus stale or conflicting.
- Teacher unauthorized.
- Distribution owner unavailable.

### Deferred Decisions

No-focus defaults, focus duration, schedule relationship, restoration, and audit remain deferred.

## Contract 7 — Distribution Draft and Preview

### Purpose

Let an authorized teacher prepare and inspect a proposed availability change without affecting students.

### Draft Boundary

A draft is private, unconfirmed intent. It may describe:

- Proposed mission and version.
- Proposed Start position.
- Proposed current focus.
- Proposed reorder.
- Proposed removal or restoration.

This list describes meanings, not a storage model.

### Preview Must Show

- Current authorized classroom display context.
- Mission title and version meaning.
- Resulting complete zero-through-three Start set.
- Exact resulting order.
- Current classroom focus.
- Destination readiness or limitation.
- Removal effect when applicable.
- Clear distinction from confirmed availability.

### Required Guarantees

- Creating, editing, opening, or cancelling a draft does not change student availability.
- Preview does not create work, launch a destination, or update PB-003B.
- Draft is visible only to an authorized teacher for the relevant classroom.
- Preview reuses verified mission and classroom projections rather than duplicate entry.
- Preview does not impersonate a student or reveal student-specific work.
- Cancelling leaves confirmed state unchanged.
- Preview becomes stale when authoritative dependencies change.

### Failure States

- No authorized classroom.
- Mission or version unavailable.
- Destination not ready.
- Proposed set invalid.
- Draft stale or conflicting.
- Current distribution unavailable.
- Teacher unauthorized.

### Persistence Boundary

Draft lifetime, refresh restoration, device scope, expiry, and abandonment remain unresolved. Draft state must not be treated as classroom-operational state.

## Contract 8 — Idempotent Confirmation

### Purpose

Apply one valid previewed teacher intent exactly once after revalidating every authoritative dependency.

### Required Inputs

- Verified teacher identity and current classroom authorization.
- Verified classroom identity.
- Valid previewed intent.
- Verified mission and version.
- Verified destination readiness.
- Current authoritative distribution state and revision or equivalent conflict context.
- Approved idempotency intent context.

The representation of these inputs remains deferred.

### Required Sequence

1. Revalidate teacher classroom authorization.
2. Revalidate mission identity, version, and distributable meaning.
3. Revalidate destination readiness.
4. Revalidate current distribution state.
5. Validate the resulting bounded Start set and optional focus.
6. Apply the change once through the distribution owner.
7. Return authoritative confirmed state.
8. Announce success only after authoritative confirmation.

### Required Guarantees

- Double activation creates one result.
- Retry of equivalent intent creates no duplicate relationship.
- Refresh does not replay confirmation.
- Stale preview cannot overwrite newer state silently.
- Pending confirmation does not look confirmed.
- Partial failure does not expose a partial student-visible set.
- Failed confirmation preserves the last verified state.
- Confirmation does not create student work or launch a mission.

### Failure States

- Authorization changed.
- Mission or version changed.
- Destination no longer ready.
- Preview stale.
- Distribution conflict.
- Duplicate request already resolved.
- Owner unavailable.
- Confirmation outcome unknown.

### Unknown Outcome Rule

When confirmation outcome cannot be verified, the Platform must re-read authoritative state before offering retry. It must not assume failure or repeat mutation blindly.

### Deferred Decisions

Idempotency representation, revision mechanism, pending-state lifetime, retry policy, and concurrent-edit implementation remain deferred.

## Contract 9 — Removal and Restoration

### Removal Purpose

Remove future Start availability for one mission version in one classroom without deleting mission definitions or student work.

### Removal Preview Must Show

- Current classroom.
- Mission and version meaning.
- Whether the mission is current focus.
- Resulting Start-choice set and order.
- Clear statement that existing work is not deleted.

### Removal Guarantees

- Requires current teacher authorization.
- Requires authoritative preview and explicit confirmation.
- Affects future Start presentation only.
- Does not delete, reset, submit, complete, archive, hide, or publish student work.
- Does not delete evidence or reflection.
- Does not alter Builder or Workshop state.
- Remaining choices retain relative order and compact safely.
- Removed focus clears without automatically choosing another focus.
- Removal is idempotent.
- PB-003B stops showing removed Start availability after verified refresh.

### Restoration Guarantees

- Restoration is a new preview-and-confirm action.
- Mission identity and version are revalidated.
- Destination readiness is revalidated.
- Restoration does not duplicate distribution or student work.
- Restored position and focus are explicit rather than assumed.

### Failure States

- Distribution unknown or already removed.
- Existing state stale or conflicting.
- Teacher unauthorized.
- Mission version no longer distributable.
- Destination not ready.
- Student-work safety cannot be verified.
- Owner unavailable.

### Deferred Decisions

Removal lifecycle names, restoration window, classroom closure, audit, retention, and behavior for retired mission versions remain deferred.

## Contract 10 — Mission Destination Readiness

### Purpose

Determine whether a verified mission version has a functional authorized Start destination without making the mission owner or Platform presentation responsible for Builder or Workshop internals.

### Authoritative Owner

One approved destination owner or approved mission-to-destination relationship owner.

### Minimum Request Meaning

- Verified mission identity and version.
- Requested Start purpose.
- Relevant authorized Platform context.

### Minimum Successful Result

- Ready or not ready for the requested Start purpose.
- Approved destination relationship label when permitted.
- Owner and freshness information.
- No launch side effect.

### Required Guarantees

- Readiness check does not launch or create work.
- Readiness is not inferred from a Builder function's existence, Workshop asset, URL, or UI label.
- Unready or unverifiable destination cannot produce an enabled Start action.
- Readiness does not imply that a particular student is authorized to launch.
- Destination relationship remains separate from mission identity.
- Builder and Workshop internals remain protected.

### Failure States

- No approved destination relationship.
- Destination not ready.
- Destination unavailable.
- Mission-version mismatch.
- Destination result stale.
- Owner unavailable.

### Deferred Decisions

Destination representation, routing, adapters, launch authorization, environment choice, return behavior, and offline behavior remain deferred.

## Contract 11 — PB-003B Student Presentation Projection

### Purpose

Provide PB-003B with the minimal verified class-wide facts needed to present Mission Choice without making PB-003B an availability or mission owner.

### Required Dependencies

- Verified student identity.
- Verified current classroom membership and authorization.
- Verified class-wide availability.
- Verified destination readiness.
- Separate verified Continue projection from the project/work owner when available.

### Minimum Projection Meaning

PB-003B may receive:

- Zero or one verified Continue presentation from the work owner.
- Zero through three confirmed Start mission projections.
- Explicit Start order.
- At most one current classroom focus among Start choices.
- Student-safe mission title and description.
- Approved environment relationship labels.
- Factual destination readiness.
- Projection freshness and unavailable meaning.

### Required Presentation Order

1. Verified Continue work.
2. Current classroom focus among Start choices.
3. Remaining Start choices in confirmed teacher order.
4. Future separately approved Side Paths.

### Required Guarantees

- PB-003B remains the single student Mission Choice presentation owner.
- No teacher draft, preview, audit, or private note appears.
- No more than three primary Start cards appear.
- A mission represented by Continue does not appear as duplicate Start for the same work context.
- Stale or unverifiable availability does not appear enabled.
- Refresh displays only current verified authorized state.
- Wrong-role access and sign-out remove protected presentation.
- Projection does not expose raw identity or distribution references in ordinary UI.
- Projection includes no grades, rankings, ability, readiness inference, progress, completion, or teacher-review state.

### Empty and Failure Meanings

Preserve PB-003B meanings:

- `No mission is ready to continue yet.`
- `No new missions are available right now.`
- `Mission choices cannot be checked right now. Try again.`

### Deferred Decisions

Projection transport, cache, refresh frequency, loading behavior, live updates, and launch controls remain deferred.

## Contract 12 — Continue Versus Start Ownership Handoff

### Purpose

Resolve student presentation and future action intent without allowing distribution to duplicate or replace existing work.

### Owners

- Distribution owner: Start availability.
- Project/work owner: existing work and Continue eligibility.
- Mission owner: mission and version meaning.
- Destination owner: readiness.
- PB-003B: student presentation.

### Handoff Rules

- Work owner is queried for verified resumable work independently of distribution.
- Verified Continue appears first.
- When the same mission context already has resumable work, Start must not create duplicate work.
- Starting a different available mission must not erase current work.
- Removing Start availability does not delete existing work.
- Continue remains available without teacher review, credits, badges, reflection, jobs, or public sharing when the work owner permits it.
- Distribution and work-owner disagreement stops launch.
- Unknown work state must not be interpreted as no work.

### Failure States

- Work owner unavailable.
- Work identity conflicting.
- Mission-version relationship conflicting.
- Destination unavailable.
- Start-versus-Continue resolution unknown.
- Student unauthorized.

### Safe Result

When resolution is unsafe, no Start or Continue launch occurs. Existing work remains protected, and PB-003B presents a calm unavailable state.

### Deferred Decisions

Project/work contract implementation, launch intent, work creation, resume routing, environment selection, and return behavior remain deferred.

## Contract 13 — Classroom Authorization Dependency

### Purpose

Require PI-000A teacher and student classroom-authorization decisions before any distribution mutation or student projection.

### Teacher Mutation Dependency

Every draft containing protected class context and every confirmation, reorder, focus change, removal, or restoration requires:

- Verified teacher identity.
- Verified classroom identity.
- Current authorization for the specific action.
- Fresh authorization at mutation time.

### Student Presentation Dependency

Every PB-003B availability projection requires:

- Verified student identity.
- Verified classroom identity.
- Current membership.
- Current authorization to view class-wide mission choices.

### Required Guarantees

- Fixture teacher/class relationships cannot authorize Phase 2 distribution.
- Class code, role state, URL, identity possession, or cached browser context is insufficient.
- Ended membership removes current class presentation according to approved lifecycle policy.
- Authorization failure does not expose mission choices for another classroom.
- Owner unavailability is distinct from denial but does not grant access.

### Blocking Dependency

PI-000B and PI-001 implementation cannot proceed until PI-000A contracts have authoritative implementations through separately approved work.

## Lifecycle and Persistence Requirements

### Mission Lifecycle

Must define creation, distributable, retired-for-new-use, unavailable, and restoration meanings without deleting existing work. Final state names remain deferred.

### Mission-Version Lifecycle

Must define new-distribution eligibility, retirement, compatibility, and existing-work preservation.

### Distribution Lifecycle

Must distinguish private draft, confirmed availability, removed future availability, stale, conflicting, and unavailable meanings. Final state names remain deferred.

### Persistence Lifetimes

- Mission and version: authoritative owner-defined lifetime.
- Distribution: classroom-operational authoritative lifetime.
- Draft: separate unconfirmed workflow lifetime.
- Student presentation projection: bounded cache or view lifetime only when approved.
- Continue state: project/work-owner lifetime.

### Required Guarantees

- Session state cannot own confirmed class-wide availability.
- Refresh restores only verified confirmed state.
- Browser close or device change does not silently change authoritative availability.
- Classroom closure behavior is explicit.
- Mission retirement preserves existing work.
- Distribution removal preserves mission and work.
- Cached projections are distinguishable from authoritative state.

### Deferred Decisions

Storage technology, retention duration, archival, deletion, recovery, audit, propagation timing, and cross-device synchronization remain deferred.

## Shared Error, Stale, Conflict, and Unavailable States

### Unknown

No authoritative mission, version, distribution, classroom relationship, or destination match can be verified.

### Stale

A previously verified projection or draft no longer satisfies its approved freshness or revision requirement.

Stale state cannot authorize mutation or enabled Start presentation.

### Conflicting

Authoritative relationships or competing changes prevent one safe answer.

Conflict preserves the last verified state and stops mutation.

### Unavailable

An authoritative owner cannot currently answer safely.

Unavailable is not equivalent to missing, removed, unauthorized, or not ready.

### Not Ready

A verified destination or lifecycle dependency does not currently permit the requested distribution or Start behavior.

### Removed

Future Start availability is no longer confirmed. Removed does not mean mission or work deleted.

### Unauthorized

The current actor cannot perform the requested action or view the requested classroom projection.

### Unknown Confirmation Outcome

A mutation was submitted, but authoritative success or failure cannot yet be established. Re-read before retry.

### Presentation Rules

- Use calm factual language.
- Do not expose raw identities, internal revisions, stack traces, or another classroom.
- Distinguish empty, unavailable, unauthorized, not ready, stale, and removed.
- Do not announce success without authoritative confirmation.
- Do not show stale availability as current.
- Do not claim deletion without source confirmation.

## Builder Protection Boundary

Builder retains ownership of:

- Existing mission-selection buttons.
- Existing mission launch functions.
- Geometry and block state.
- Camera and controls.
- Save/load format.
- Runtime lifecycle.
- UI, navigation, and assets.

PI-000B must not:

- Treat Builder buttons or functions as the canonical mission catalog.
- Import mission identity from function names.
- Read Builder DOM to construct Platform mission projections.
- Launch Builder during catalog, preview, or confirmation operations.
- Create or alter Builder work.
- Modify Builder to fill mission-ownership gaps.
- Treat Builder opening as progress or completion.

A future Builder adapter requires separate inspection after mission, project/work, and destination ownership exists.

## Workshop Protection Boundary

Workshop retains ownership of:

- Rendering and student geometry.
- Placement, selection, delete, Undo/Redo, snapping, and precision.
- Camera and View architecture.
- Table and Grid.
- Measurement values and tools.
- Tool Chest.
- Smart Board and Projector.
- Mission restoration.
- Screenshots, persistence, and approved assets.

PI-000B must not:

- Read Workshop state to infer a mission catalog.
- Infer mission identity from geometry, screenshots, assets, or labels.
- Launch or modify Workshop during distribution.
- Change mission restoration or work state.
- Treat Workshop opening as Start, progress, or completion.

A future Workshop adapter requires separate inspection after mission, project/work, and destination ownership exists.

## Privacy Requirements

PI-000B future implementations must:

- Verify teacher classroom authorization before drafts, previews, and mutations.
- Verify student identity and membership before PB-003B presentation.
- Provide only minimum student-safe mission projections.
- Keep teacher drafts, previews, audit, and removal preparation private.
- Keep raw mission, version, distribution, classroom, student, and teacher identities out of ordinary UI.
- Prevent one classroom from receiving another classroom's availability.
- Avoid collecting grades, behavior, inferred ability, support classifications, or private notes for ordering or availability.
- Keep mission choice, distribution, and student work out of Student Display, Smart Board, Hall of Fame, Teacher Feed, reports, and public recognition without separate approval.
- Preserve student choice privacy and teacher authority.
- Remove protected presentation after sign-out, failed revalidation, or ended membership.

## Accessibility Requirements

Future mission and distribution experiences must:

- Use semantic regions and logical headings.
- Use student- and teacher-friendly mission labels while keeping identities opaque.
- Provide explicit classroom, mission, version, order, focus, draft, preview, and confirmed-state labels.
- Support keyboard selection and ordering without drag.
- Provide visible focus and predictable focus return.
- Communicate empty, stale, conflict, unavailable, unauthorized, not-ready, and removed states with text rather than color alone.
- Use accessible status announcements without repetition.
- Keep unavailable items out of the tab order unless a functional explanation is approved.
- Support browser zoom and text resizing.
- Wrap long mission titles, descriptions, classroom labels, and errors safely.
- Require no hover, audio, speech, drag, pointer precision, or timed response.
- Preserve reduced-motion compatibility.

## Chromebook Requirements

Every future implementation must physically validate:

- Teacher classroom orientation.
- Mission catalog readability.
- Draft versus confirmed distinction.
- Keyboard and touchpad mission selection and ordering.
- Preview of the complete resulting Start set.
- Explicit confirmation and pending behavior.
- Double activation creates one result.
- Refresh does not repeat confirmation.
- Current focus remains secondary to Continue.
- Removal preserves mission definitions and student work.
- Restoration creates no duplicates.
- PB-003B receives zero through three correct choices.
- Wrong-role, membership, refresh, and sign-out protection.
- Long text, browser zoom, and text resizing.
- No horizontal scrolling, nested scrolling, or clipped states.
- Safe interruption during offline or owner-unavailable conditions.
- No stale or cross-classroom mission presentation.
- No console errors or significant slowdown.

Local desktop testing does not replace physical Chromebook validation.

## Protected Systems

PI-000B documentation and future work must preserve:

- PB-001 entry, role, route, refresh, and sign-out behavior.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Continue-first Mission Choice presentation and honest states.
- PB-003C My STEM Work and evidence boundaries.
- Approved PI-000 and PI-000A architecture authority.
- PI-001 implementation block.
- Existing Mission behavior and restoration.
- Builder behavior, runtime, mission selection, launch, save/load, navigation, and assets.
- Workshop rendering, geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, screenshots, persistence, restoration, and assets.
- Existing approved documents and unrelated files.

## Deferred Decisions

PI-000B v1.0 does not decide:

- Backend, service topology, database, schema, API, provider, or hosting.
- Mission, version, distribution, revision, or idempotency format.
- Mission data model or canonical record representation.
- Mission authoring, publication, localization, or import.
- Version compatibility, migration, retirement, or restoration policy.
- Catalog query, search, filtering, or caching.
- Distribution storage, lifecycle state names, retention, deletion, restoration, or audit implementation.
- Draft storage, refresh, expiry, or device scope.
- Concurrent teacher-session implementation.
- Destination adapter, launch, routing, return, or work creation.
- Project/work owner implementation.
- Student-specific distribution, groups, teams, or adaptive assignment.
- More than three primary Start choices or View All Missions.
- Side Path distribution.
- Notifications, Teacher Feed, reports, analytics, credits, badges, or AI.
- Offline storage, queueing, synchronization, or reconciliation technology.

## Implementation Stop Conditions

Stop before implementing PI-000B or PI-001 when:

- Mission identity or version owner is missing.
- Mission identity would be inferred from Builder or Workshop internals.
- Distribution owner is missing.
- PI-000A teacher authorization or student membership has no authoritative implementation.
- Destination readiness cannot be verified independently of launch.
- Project/work owner cannot resolve Continue versus Start.
- Confirmed availability would be stored only as local session state.
- Draft and confirmed state cannot be distinguished.
- Idempotency or concurrent-edit behavior is undefined.
- Refresh could replay confirmation or display stale availability.
- Removal could delete or hide student work.
- More than three primary Start choices could be confirmed.
- PB-003B would become the mission or distribution owner.
- Builder or Workshop would require direct presentation-layer coupling.
- Privacy purpose, audience, retention, or classroom authority is unclear.
- Implementation requires an unapproved provider, route, dependency, identity format, storage model, or mission data model.

When blocked, return the exact missing owner or decision. Do not fill the gap with fixtures, browser storage, Builder function names, DOM inspection, card order, or assumptions.

## Contract Acceptance Criteria

PI-000B contracts are ready for approval when they:

- Separate mission, version, distribution, work, destination, and presentation ownership.
- Define mission and distribution identity without selecting formats.
- Define read-only mission-catalog and PB-003B projections.
- Preserve Continue-first behavior and the three-choice boundary.
- Require teacher authorization and student membership.
- Define draft, preview, confirmation, removal, and restoration guarantees.
- Require idempotency, freshness, and safe conflict behavior.
- Protect Builder and Workshop internals.
- Preserve privacy, accessibility, and Chromebook requirements.
- Keep PI-000B and PI-001 implementation blocked until authoritative owners exist.
- Select no provider, storage technology, route, API, or mission data model.

## Approval Meaning

Approval establishes these provider-neutral contracts as architecture authority for targeted owner selection, lifecycle decisions, and future specifications.

Approval does not authorize mission or distribution implementation, mission-data creation, migration, live PB-003B availability, Builder or Workshop integration, application changes, test changes, staging, committing, tagging, or pushing.

After review and approval, the next PI-000 decomposition inspection should address PI-000C — Project and Work Identity Contracts. PI-001 remains blocked until PI-000A, PI-000B, and required project/work and destination owners have separately approved implementations.
