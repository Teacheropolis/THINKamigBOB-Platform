# PI-000A — Identity and Authority Contracts

## Architecture Contracts v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending authoritative owners and provider decisions

## Document Boundary

This document defines provider-neutral identity and authority contracts only. It does not authorize implementation, create records, define storage models, add routes, modify authentication, or connect Phase 2 features.

It deliberately does not select:

- A backend or service topology.
- A database or schema.
- An API or event protocol.
- An authentication provider.
- A hosting provider.
- An identity, credential, session, or token format.
- A synchronization or offline-storage technology.

These contracts describe required meanings and guarantees. Future owners may implement them only after targeted inspection, approved provider and lifecycle decisions, a reviewed build specification, testing, physical Chromebook validation, and explicit approval.

## Controlling References

- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-000/PI-000-PLATFORM-OWNERSHIP-AND-IDENTITY-FOUNDATION-DESIGN-DECISIONS-v1.0.md`
- PI-000A Identity and Authority Contracts Inspection: BLOCKED beyond documentation
- `docs/platform/builds/PB-001/PB-001-BUILD-SPECIFICATION.md`
- `docs/platform/builds/PB-001/PB-001-FINAL-IMPLEMENTATION-PACKAGE.md`
- `docs/platform/builds/PB-001/PB-001-IMPLEMENTATION-NOTES.md`
- `docs/platform/PLATFORM-BLUEPRINT-v1.0.md`
- `docs/platform/DEVELOPMENT-STANDARDS-v1.0.md`

## Contract Principles

All PI-000A contracts follow these rules:

1. Identity, authentication, session, and authorization are separate.
2. Display labels and credentials are not identities.
3. Possession of an identity reference is not authorization.
4. Authorization is verified for the current actor, action, resource, and time.
5. Unknown or unverifiable authority fails closed.
6. Refresh restores only verified authorized context.
7. Sign-out clears local protected presentation without deleting authoritative records.
8. Membership changes do not silently delete student work.
9. Development fixtures never become Phase 2 owners.
10. Errors preserve the last verified safe state and do not expose another user.

## Shared Contract Vocabulary

### Authoritative Owner

The approved source responsible for the identity, relationship, or authority fact.

### Stable Identity Reference

An opaque reference issued by the authoritative owner. Its final representation is deferred.

### Display Projection

Authorized human-readable information such as a display name or classroom label. It is not identity or authorization.

### Authentication Result

A time-bounded factual result indicating whether an approved entry or account process verified the actor. It is not classroom authorization.

### Session Context

The current authenticated presentation context. It may reference identity, role, and active classroom but does not own those records.

### Authorization Decision

A factual answer for whether the current actor may perform one requested action on one resource under current authoritative relationships.

### Membership

An authoritative relationship between one student identity and one classroom identity.

### Stale

A previously verified result whose approved freshness or lifetime can no longer be trusted.

### Unavailable

The authoritative owner cannot currently answer safely. Unavailable is not equivalent to unauthorized, missing, or deleted.

## Contract 1 — Teacher Identity

### Purpose

Resolve and present one stable teacher identity without treating an email address, credential, display name, or browser session as identity.

### Authoritative Owner

One approved teacher identity owner.

### Minimum Request Meaning

A caller requests resolution of the teacher associated with a currently verified authentication result or another separately approved administrative context.

The request must not depend on a display-name match or raw email comparison performed by presentation code.

### Minimum Successful Result

- Stable teacher identity reference.
- Authorized display name.
- Factual lifecycle state sufficient to determine whether the identity is currently usable.
- Owner and freshness information sufficient for later authorization checks.

### Required Guarantees

- Display-name or email changes do not create a new teacher identity.
- The same authoritative teacher resolves consistently across approved sessions.
- A retired, disabled, merged, or unknown identity does not resolve as active.
- No classroom authority is implied by teacher identity alone.
- Raw credentials are never returned as identity data.

### Failure States

- Unknown teacher.
- Identity unavailable.
- Identity inactive or revoked.
- Authentication-to-identity relationship invalid.
- Stale result.
- Owner unavailable.

### Privacy Boundary

Return only information needed for the approved Platform purpose. Do not expose authentication secrets, recovery data, other accounts, or unauthorized classroom relationships.

### Deferred Decisions

Identity representation, issuer technology, account provider, verification, recovery, merge, transfer, and retention remain deferred.

## Contract 2 — Student Identity

### Purpose

Resolve one stable student identity after an approved entry process without treating roster name, private identifier, class code, email, or external account as identity.

### Authoritative Owner

One approved student identity owner.

### Minimum Request Meaning

A caller requests resolution of the student selected and verified through an approved entry process within an authorized classroom context.

### Minimum Successful Result

- Stable student identity reference.
- Authorized display name.
- Factual lifecycle state sufficient to determine whether the identity is currently usable.
- Owner and freshness information for membership and authorization checks.

### Required Guarantees

- Display-name or private-identifier changes do not create a new student identity.
- External evidence accounts do not replace Platform student identity.
- One student's entry cannot resolve another student's identity.
- A student departure or inactive identity does not resolve as currently active without an approved exception.
- Existing work remains attached to stable identity through approved name or credential changes.
- Raw private identifiers and entry credentials are not returned in identity projections.

### Failure States

- Unknown student.
- Entry verification failed.
- Identity unavailable.
- Identity inactive or retired.
- Ambiguous or conflicting identity.
- Stale result.
- Owner unavailable.

### Privacy Boundary

Student identity remains private. Ordinary UI receives display information only after authorization. Raw identity references must not appear in ordinary Student Home content, screenshots, exports, public displays, or URLs without separate approval.

### Deferred Decisions

Roster import, district identity relationship, duplicate reconciliation, merge, school transfer, departure, graduation, and retention remain deferred.

## Contract 3 — Classroom Identity

### Purpose

Resolve one stable classroom identity independently of class code, classroom name, period, teacher name, or current browser state.

### Authoritative Owner

One approved classroom owner.

### Minimum Request Meaning

A caller requests a classroom referenced by an approved entry, teacher authority, or membership context.

### Minimum Successful Result

- Stable classroom identity reference.
- Authorized classroom display name.
- Optional authorized period or section label.
- Factual classroom lifecycle state.
- Owner and freshness information.

### Required Guarantees

- Class-code, display-name, period, or teacher changes do not automatically create a new classroom identity.
- A closed, archived, unknown, or unavailable classroom is distinguishable from an active classroom.
- Classroom resolution alone grants neither teacher authority nor student membership.
- Identity references are never inferred from visible labels.

### Failure States

- Unknown classroom.
- Classroom inactive, closed, or archived.
- Classroom unavailable.
- Ambiguous classroom reference.
- Stale result.
- Owner unavailable.

### Privacy Boundary

Return classroom projections only after the caller establishes an approved purpose and relevant authority context. Do not expose another teacher's classroom, roster, class code, or internal identity.

### Deferred Decisions

Creation, archival, restoration, school-year rollover, teacher reassignment, co-teachers, class-code lifecycle, and retention remain deferred.

## Contract 4 — Classroom Membership

### Purpose

Verify the current relationship between one stable student identity and one stable classroom identity.

### Authoritative Owner

One approved classroom-membership owner, which may be the classroom owner when explicitly approved.

### Minimum Request Meaning

- Stable student identity reference.
- Stable classroom identity reference.
- Requested purpose or action.
- Current authenticated session context.

### Minimum Successful Result

- Factual current membership decision.
- Membership lifecycle meaning sufficient for the requested purpose.
- Owner and freshness information.
- No extra roster data.

### Required Guarantees

- Membership is verified independently of possession of a class code or classroom ID.
- Ended or stale membership does not authorize current class content.
- Membership changes do not delete projects, work, evidence, or historical records silently.
- One student's membership check does not disclose another student.
- Refresh and mutation checks do not rely solely on cached membership.

### Required Lifecycle Meanings

The owner must distinguish at least:

- Current and authorized.
- Ended or inactive.
- Unknown.
- Stale.
- Unavailable.

Additional states require separate approval.

### Failure States

- Student unknown.
- Classroom unknown.
- Membership not found.
- Membership ended.
- Membership stale.
- Conflicting membership records.
- Owner unavailable.

### Privacy Boundary

Return only the membership decision required for the current student and classroom. Do not return the full roster or another student's status.

### Deferred Decisions

Enrollment source, pending memberships, transfers, multiple concurrent classes, history access, roster correction, rollover, and retention remain deferred.

## Contract 5 — Authentication Result Boundary

### Purpose

Define the minimum factual boundary between an approved entry or account-verification process and Platform identity/session handling.

### Owner

One approved authentication owner. Provider selection is deferred.

### Minimum Successful Meaning

The result must establish:

- Authentication succeeded through an approved method.
- The identity owner may safely resolve the actor.
- The result has a defined current validity state.
- The approved role-entry path used: teacher or student.

### Required Guarantees

- Credentials, passwords, private identifiers, and recovery secrets are not identity records.
- Authentication result does not grant classroom authority.
- Teacher and student authentication contexts remain mutually exclusive unless a future multi-role policy is approved.
- Invalid authentication does not reveal whether an unrelated account or student exists.
- Expired, revoked, malformed, or unverifiable results fail closed.
- Client-visible development validation is not represented as production security.

### Failure States

- Invalid credentials or entry factor.
- Expired result.
- Revoked result.
- Malformed or unsupported result.
- Identity resolution unavailable.
- Authentication owner unavailable.

### Privacy Boundary

The Platform receives no secret beyond what is required by the approved authentication exchange. Authentication failure messages remain generic and do not expose account, roster, or recovery information.

### Deferred Decisions

Provider, credential type, verification, recovery, session issuance, token representation, device trust, and rate-limiting implementation remain deferred.

## Contract 6 — Session Context

### Purpose

Maintain the current authenticated presentation context without becoming the authoritative owner of identity, classroom, membership, projects, distributions, or evidence.

### Session Context May Reference

- Current teacher or student identity.
- Current authenticated role.
- Current classroom context when verified.
- Authentication validity state.
- Approved freshness or revalidation information.

### Session Context Must Not Own

- Teacher or student identity records.
- Classroom or membership records.
- Mission definitions.
- Distribution state.
- Projects or work.
- Evidence.
- Teacher review or progress.

### Required Guarantees

- Teacher and student contexts remain mutually exclusive under the current role model.
- Invalid or malformed context sanitizes to signed-out or a safe revalidation state.
- Refresh does not convert cached identity references into current authorization.
- Session expiry or revocation removes protected presentation.
- Sign-out clears protected local context.
- Storage failure does not grant access.
- Session restoration never exposes the wrong role before authorization completes.

### Failure States

- No session.
- Expired session.
- Revoked session.
- Malformed context.
- Identity unavailable.
- Authorization revalidation required.
- Session owner unavailable.

### Current PB-001 Boundary

`platform-session.mjs` remains the approved PB-001 development entry-state store. Its namespaced `sessionStorage` behavior must not be promoted into authoritative Phase 2 session or identity ownership by assumption.

### Deferred Decisions

Session issuer, storage, expiry duration, renewal, revocation propagation, device behavior, and cross-tab behavior remain deferred.

## Contract 7 — Teacher Classroom Authorization

### Purpose

Determine whether the current authenticated teacher may perform one requested action for one classroom now.

### Required Inputs

- Verified teacher identity reference.
- Verified classroom identity reference.
- Requested action.
- Current session/authentication context.
- Current authoritative teacher-to-classroom relationship.

### Minimum Result

- Authorized or denied.
- Factual reason category suitable for safe recovery.
- Owner and freshness information.

### Required Guarantees

- Authorization is checked before protected content renders and again before mutation.
- Teacher identity alone does not grant classroom access.
- Email, display name, URL, ID possession, or cached state does not grant access.
- Authorization is action-specific; viewing and changing may require different authority.
- Stale or unavailable authority fails closed.
- Denial does not reveal another teacher's classroom or records.
- A teacher reassignment takes effect according to the approved authoritative lifecycle, not stale browser state.

### Failure States

- Teacher unknown or inactive.
- Classroom unknown or inactive.
- Relationship absent or ended.
- Action not permitted.
- Stale authority.
- Conflicting authority.
- Owner unavailable.

### Privacy Boundary

Return only the decision and safe recovery meaning. Do not return another teacher's identity, private classroom details, full roster, or internal authority records.

### Deferred Decisions

Permission vocabulary, co-teachers, administrators, substitutes, transfers, delegated authority, and audit requirements remain deferred.

## Contract 8 — Student Classroom Authorization

### Purpose

Determine whether the current authenticated student may view or perform one requested classroom-scoped action now.

### Required Inputs

- Verified student identity reference.
- Verified classroom identity reference.
- Verified current membership.
- Requested action.
- Current session/authentication context.

### Minimum Result

- Authorized or denied.
- Factual reason category suitable for safe recovery.
- Owner and freshness information.

### Required Guarantees

- Authorization is checked before protected content renders and before mutation or launch.
- Class code, roster selection, private identifier, URL, ID possession, or cached state does not independently grant access.
- A student cannot view another classroom or another student's records.
- Ended, stale, conflicting, or unavailable membership fails closed.
- Denial does not disclose roster status or another student's information.
- Ordinary authorized continuation is not blocked by teacher review, credits, jobs, evidence review, or later features.

### Failure States

- Student unknown or inactive.
- Classroom unknown or inactive.
- Membership absent, ended, stale, or conflicting.
- Action not permitted.
- Owner unavailable.

### Privacy Boundary

Return only the decision and safe recovery meaning for the current student. Do not return full roster, another student's membership, teacher-only records, or internal IDs.

### Deferred Decisions

Action vocabulary, historical class access, multiple classes, transfer behavior, student-specific exceptions, and guardian access remain deferred.

## Contract 9 — Refresh Revalidation

### Purpose

Restore a protected Platform view after browser refresh without treating local cached state as current authority.

### Required Sequence

1. Read only the minimum local session context needed to attempt restoration.
2. Validate context shape without trusting its authority claims.
3. Revalidate authentication validity through the approved owner.
4. Resolve current identity through the approved owner.
5. Revalidate teacher authority or student membership for the requested protected context.
6. Render protected content only after successful revalidation.
7. Otherwise redirect or show the approved signed-out, unavailable, or recovery state.

### Required Guarantees

- Wrong-role content does not render before redirect.
- Refresh does not replay a mutation, confirmation, Start, or Continue action.
- Stale local identity or classroom references do not authorize access.
- Owner unavailability is distinct from authorization denial.
- Previously visible private content is removed when revalidation fails.
- Successful revalidation restores the correct authorized context without duplicate records.

### Offline Boundary

Offline restoration of protected data is prohibited unless a future approved owner contract defines cache lifetime, device protection, stale labeling, and allowed offline actions.

### Deferred Decisions

Revalidation transport, timeout, retry, cached-shell behavior, offline access, and user messaging details remain deferred.

## Contract 10 — Sign-Out and Revocation

### Sign-Out Purpose

End the current user's protected local session and remove private presentation from the device.

### Sign-Out Must

- Clear current local authentication/session context.
- Remove protected teacher and student content from the rendered UI.
- Clear approved session-scoped teacher and student feature state according to each feature contract.
- Prevent browser history or direct routes from restoring protected content without reauthentication.
- Return to an approved public entry route.
- Preserve authoritative missions, distributions, projects, work, evidence, and classroom records.

### Revocation Purpose

Allow the authoritative authentication or authority owner to invalidate previously usable context.

### Revocation Must

- Fail closed at the next required validation point.
- Remove or block protected presentation.
- Avoid deleting authoritative educational records.
- Distinguish revoked from temporarily unavailable when safe and useful.
- Prevent stale local state from overriding revocation.

### Current PB-001 Boundary

Current sign-out correctly removes PB-001 and approved feature session keys for the development foundation. It does not provide authoritative server-side revocation and must not claim to do so.

### Deferred Decisions

Revocation propagation, cross-tab behavior, cross-device sign-out, timeout, recovery, and offline behavior remain deferred.

## Contract 11 — Roster and Membership Lifecycle

### Purpose

Protect identity, authorization, and work continuity when classroom membership changes.

### Required Lifecycle Events

Future owners must define behavior for:

- Student added to a classroom.
- Student display name corrected.
- Private identifier changed.
- Student moved between classrooms.
- Student removed from a classroom.
- Membership restored.
- Classroom closed or archived.
- Teacher reassigned.
- School-year transition.

### Required Guarantees

- Lifecycle events use stable identities.
- Name or entry-factor changes do not create new students.
- Membership changes do not silently delete projects, work, evidence, reflection, or history.
- Ended membership removes current class authorization according to the approved policy.
- Restoring membership does not duplicate the student or work.
- Roster operations do not expose private identifiers to other students.
- Historical access, transfer, and retention are explicit rather than inferred.

### Conflict Requirements

The owner must safely handle duplicate roster candidates, conflicting membership state, simultaneous teacher changes, stale classroom context, and failed partial updates.

### Deferred Decisions

Roster source, import, correction workflow, transfer authority, history access, school-year rollover, archival, recovery, and audit remain deferred.

## Contract 12 — Shared Identity and Authority States

### Unknown

The owner has no verified matching record or relationship.

Unknown must not be presented as deleted, unauthorized, or temporarily unavailable without evidence.

### Expired

A previously valid authentication, session, or time-bounded authority result has passed its approved lifetime.

Expired context cannot authorize protected access.

### Revoked

The authoritative owner has invalidated previously usable authentication or authority.

Revoked context cannot be restored from local state.

### Unauthorized

The actor and resource may be known, but the requested action is not currently permitted.

Unauthorized responses must not reveal protected resource details.

### Stale

The result was previously verified but can no longer be trusted as current.

Stale state cannot authorize mutations or protected restoration.

### Unavailable

The owner cannot currently answer safely.

Unavailable is not denial and must not be converted into authorization.

### Conflicting

Two or more records or changes prevent a single safe authoritative answer.

Conflict preserves the last verified safe state and stops mutation.

### Inactive

An identity, classroom, or relationship exists but is not currently usable under its approved lifecycle.

### Malformed

The provided context fails structural validation and is treated as signed out or rejected safely.

### State Presentation Rules

- Use factual, calm language.
- Do not expose raw IDs, credentials, owner internals, or another user.
- Distinguish retryable unavailability from authorization denial.
- Do not claim deletion without source confirmation.
- Do not preserve private content after authorization fails.
- Do not announce success until the owner confirms it.

## Contract 13 — Development-Fixture Isolation

### Purpose

Preserve PB-001 development testing without allowing fictional client-visible records to become Phase 2 owners.

### Fixture Boundary

`platform-fixtures.mjs` may continue to provide clearly labeled fictional test doubles for:

- Teacher credential-flow testing.
- Class-code lookup testing.
- Roster-selection testing.
- Private-identifier testing.
- Teacher and student route demonstrations.

### Fixtures Must Not

- Contain real student or teacher data.
- Be represented as secure or production authentication.
- Authorize Phase 2 records.
- Own durable teacher, student, classroom, or membership identity.
- Own mission distribution, projects, work, or evidence.
- Be silently mixed with authoritative records.
- Share namespaces in a way that could collide with authoritative identities.
- Be accepted outside explicitly marked development/test context.

### Replacement Seam Requirements

Future authoritative owners must replace fixture lookup and validation behind approved contracts without forcing presentation code to infer production behavior.

The replacement must preserve PB-001 user-flow meanings unless a separately approved build changes them.

### Test Requirement

Tests must continue proving that fixtures are fictional, isolated, and rejected as production authority.

## Privacy Requirements

PI-000A future implementations must:

- Use minimum necessary identity and relationship information.
- Keep raw identities out of ordinary UI when display labels suffice.
- Keep credentials, private identifiers, recovery data, and authentication secrets out of projections.
- Prevent students from seeing another student's identity, membership, work, evidence, or entry data.
- Prevent teachers from accessing classrooms they do not manage.
- Keep teacher-only authority records and audit information private.
- Keep identity and membership information out of Student Display, Smart Board, Hall of Fame, Teacher Feed, reports, and public recognition without separate approval.
- Avoid using grades, behavior, inferred ability, support classifications, or private notes for identity or ordinary authorization.
- Remove protected presentation on sign-out, expiry, revocation, or failed revalidation.
- Define retention purpose before storing identity or relationship data.

## Accessibility Requirements

Future identity and authority experiences must:

- Use familiar display labels rather than requiring users to transcribe opaque IDs.
- Provide semantic forms, headings, status, and error relationships.
- Provide visible keyboard focus.
- Preserve predictable focus after authentication, retry, denial, expiry, and sign-out.
- Communicate unknown, expired, unauthorized, stale, unavailable, and conflicting states with text rather than color alone.
- Avoid revealing private information through accessible names or announcements.
- Avoid repetitive live-region announcements.
- Support browser zoom and text resizing.
- Wrap long classroom and display names safely.
- Require no hover, audio, speech, drag, or pointer precision.
- Preserve reduced-motion compatibility.

## Chromebook Requirements

Every future implementation must physically validate:

- Teacher and student entry flows.
- Correct identity and classroom orientation.
- Wrong-role protection before protected content appears.
- Refresh revalidation.
- Expired, revoked, unauthorized, stale, unavailable, and conflicting states.
- Sign-out and protected-history behavior.
- Keyboard and touchpad usability.
- Visible focus and focus return.
- Browser zoom and text resizing.
- No horizontal scrolling or clipped error messages.
- Safe behavior during connectivity interruption.
- No stale or cross-user content after account or membership change.
- No console errors or significant slowdown.

Local desktop testing does not replace physical Chromebook validation.

## Protected Systems

PI-000A documentation and future work must preserve:

- PB-001 class-code, roster-name, private-identifier, role, route, refresh, and sign-out meanings until separately changed.
- PB-001 isolated development fixtures and tests.
- PB-002 Teacher Command Center, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Mission Choice and Continue-first behavior.
- PB-003C My STEM Work and evidence boundaries.
- PI-001 implementation block.
- Existing Mission behavior.
- Builder behavior, data, runtime, save/load, navigation, and assets.
- Workshop rendering, geometry, camera, Table, Grid, measurements, Tool Chest, Smart Board, Projector, screenshots, restoration, persistence, and assets.
- Existing approved documents and unrelated files.

## Deferred Decisions

PI-000A v1.0 does not decide:

- Backend or service topology.
- Database or schema.
- API or event protocol.
- Authentication provider.
- Hosting provider.
- Identity, credential, session, or token format.
- Identity generation algorithm.
- Production teacher or student record source.
- Classroom or roster source.
- Permission vocabulary.
- Co-teachers, administrators, substitutes, guardians, or delegated authority.
- Session duration, renewal, or revocation mechanism.
- Cross-device or cross-tab behavior.
- Offline storage or synchronization.
- Roster import, transfer, archival, or school-year rollover.
- Retention periods, deletion, restoration, recovery, or audit implementation.
- Migration from development fixtures.
- Mission, project, distribution, evidence, Builder, or Workshop implementation.

## Implementation Stop Conditions

Stop before implementing PI-000A when:

- Any authoritative teacher, student, classroom, membership, authentication, session, or authorization owner is missing.
- Two systems claim authority for the same identity or relationship.
- Identity would be inferred from a display label, credential, filename, DOM ID, URL, or card position.
- Authorization would rely on possession of an ID, class code, private identifier, or cached state.
- Refresh cannot revalidate current authority.
- Sign-out or revocation cannot remove protected presentation safely.
- Membership changes could delete or misassign work.
- Session lifetime, expiry, and stale-state behavior are undefined.
- Offline behavior could expose stale or cross-user content.
- Fixtures could be confused with authoritative records.
- Privacy purpose, audience, or retention is unclear.
- Implementation requires an unapproved provider, storage model, route, dependency, or architecture.

When blocked, return the exact missing owner or decision. Do not fill the gap with fixtures, browser storage, hidden identifiers, or assumptions.

## Contract Acceptance Criteria

PI-000A contracts are ready for approval when they:

- Separate identity, authentication, session, and authorization.
- Define teacher, student, classroom, and membership owner responsibilities.
- Define minimum success, failure, freshness, and privacy meanings.
- Require refresh revalidation and safe sign-out/revocation.
- Protect work during roster and membership changes.
- Define shared unknown, expired, revoked, unauthorized, stale, unavailable, conflicting, inactive, and malformed states.
- Isolate development fixtures from Phase 2 ownership.
- Preserve PB-001 through PB-003C, Builder, Workshop, and PI-001 boundaries.
- Select no provider, format, storage, or implementation architecture.

## Approval Meaning

Approval establishes these provider-neutral contracts as architecture authority for targeted owner selection, lifecycle decisions, and future specifications.

Approval does not authorize implementation, provider selection, data creation, migration, application changes, test changes, staging, committing, tagging, or pushing.

After review and approval, the next step is a targeted decision milestone for authoritative owner selection and lifecycle policy. If the required product, privacy, operational, and technical authority is not available, PI-000A remains documentation-only and PI-001 remains blocked.
