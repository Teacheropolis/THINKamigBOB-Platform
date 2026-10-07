# PI-001 — Mission Distribution

## Build Specification v1.0

Status: Proposed specification pending review, ownership inspection, and approval  
Platform Area: Teacher-to-student mission availability  
Student Experience Consumer: PB-003B Mission Choice

## Controlling References

- `docs/platform/PLATFORM-BLUEPRINT-v1.0.md`
- `docs/platform/DEVELOPMENT-STANDARDS-v1.0.md`
- `docs/platform/builds/PI-001/PI-001-MISSION-DISTRIBUTION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PI-001/PI-001-MISSION-DISTRIBUTION-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-DESIGN-DECISIONS-v1.0.md`
- Approved PB-001 through PB-003C Platform foundations

## Pre-Implementation Status and Stop Gate

The approved PI-001 documents intentionally do not select a backend, database, API, browser-storage model, production-authentication model, retention policy, audit model, or cross-device synchronization architecture.

The current approved documents also require inspection to identify:

- The authoritative mission catalog and stable identity owner.
- The authorized classroom owner.
- The distribution data and persistence owner.
- The mission-work owner for Continue versus Start.
- The functional destination owner.
- The source of current verified availability after refresh.

Implementation must not begin until a read-only repository inspection identifies these owners and confirms that the implementation can satisfy this specification without inventing architecture.

If any owner is missing, contradictory, or unsafe, stop and return an inspection report. Do not substitute fixtures, `sessionStorage`, `localStorage`, filenames, card positions, or mission titles as production owners unless separately approved.

## Build Objective

Implement a protected teacher-only class-wide Mission Distribution experience that:

- Reads approved mission definitions from one authoritative source.
- Lets an authorized teacher prepare up to three Start choices for the current classroom.
- Lets the teacher identify one distributed mission as the current classroom focus.
- Shows a complete student-safe preview before any change.
- Requires explicit idempotent confirmation.
- Safely changes or removes future Start availability.
- Supplies verified distribution facts to the existing PB-003B Mission Choice presentation.
- Preserves Continue-first behavior and all existing student work.
- Protects student privacy, Builder, Workshop, Mission behavior, and completed Platform foundations.

PI-001 distributes mission availability. It does not author missions, create student work, launch tools, or calculate progress.

## Primary Users

### Teacher

An authenticated teacher authorized for the active classroom.

Teacher goal:

> Choose which approved missions students may start, review exactly what students will see, and confirm or safely correct that availability.

### Student

An authenticated student entering through PB-001 and viewing PB-003B Mission Choice.

Student goal:

> Understand which missions are available while keeping verified current work first.

## Required End-to-End Flow

```text
Protected Teacher Route
→ Current Authorized Classroom
→ Verified Mission Catalog
→ Select Mission
→ Choose Start Position
→ Optional Current Classroom Focus
→ Preview Complete Student Choice Set
→ Explicit Confirmation
→ Authoritative Distribution State
→ PB-003B Student Presentation
```

Correction and removal flow:

```text
Verified Existing Distribution
→ Select Change or Remove
→ Preview Resulting Choice Set
→ Explicit Confirmation
→ Authoritative Updated State
→ PB-003B Refreshes Verified Presentation
```

Opening, searching, selecting, or previewing a mission must not make it student-visible.

## Included Scope

Implement only:

- One protected teacher Mission Distribution entry point.
- Current authorized classroom orientation throughout the workflow.
- Read-only presentation of verified distributable mission definitions.
- Class-wide distribution only.
- Up to three explicit primary Start positions.
- One optional current-classroom-focus designation.
- Teacher preview of the complete resulting student choice set.
- Explicit confirmation for create, reorder, focus, and removal changes.
- Idempotent confirmation behavior.
- Visible teacher success and recoverable failure feedback.
- Safe future-Start removal.
- Verified distribution-state restoration after refresh.
- PB-003B handoff of approved student-safe availability facts.
- Honest teacher and student empty and unavailable states.
- Teacher/student wrong-role and sign-out protection.
- Accessible, responsive Chromebook controls.
- Focused PI-001 automated tests.
- Required Platform, Builder, and Workshop regression testing.
- PI-001 implementation notes and completion report.

## Explicit Exclusions

Do not implement:

- Mission authoring, editing, duplication, import, generation, versioning, publishing, or deletion.
- Teacher-added mission instructions, notes, scheduling, adaptations, or deadlines.
- Student-specific, group, team, cohort, differentiated, or adaptive distribution.
- More than three primary Start choices.
- View All Missions.
- Side Path distribution.
- Automatic mission launch.
- Mission stages, progress, completion, grading, assessment, or analytics.
- Student work creation, project identity, evidence, history, or persistence.
- Builder integration or launch.
- Workshop integration or launch.
- Google Drive, Google Classroom, Google Slides, Google Vids, or account integration.
- Read-Aloud, speech, notifications, Teacher Feed events, Help, reports, credits, badges, Hall of Fame, rewards, or AI.
- Recommendations, personalization, ability inference, readiness inference, behavior classification, or ranking.
- New public surfaces or Student Display behavior.
- Destructive deletion of mission definitions, student work, or evidence.
- A new backend, database, API, authentication provider, framework, dependency, or asset unless separately inspected and approved.
- Production-security or cross-device claims not supported by the approved architecture.

## Mission Ownership Model

### Authoritative Mission Source

Every distributable mission must come from one approved mission source that provides:

- Stable mission identity.
- Mission version.
- Student-safe title.
- Student-safe short description.
- Distribution eligibility.
- Functional destination status.
- Supported Builder or Workshop relationship labels only when explicitly defined.

PI-001 must not infer identity or relationships from title, description, filename, card order, asset path, or tool name.

### Distribution Owner

One approved distribution owner must authoritatively manage:

- Classroom-to-mission availability.
- Primary Start position.
- Current classroom focus.
- Confirmed distribution state.
- Authorized teacher action.
- Refresh restoration.
- Conflict and idempotency behavior.

Only the distribution owner may confirm that a change succeeded.

### Classroom Owner

One approved classroom owner must verify:

- The teacher's authority for the classroom.
- The student's membership in the classroom.
- The active class context shown during distribution.

Class codes, private identifiers, and raw internal IDs must not be used as ordinary display labels.

### Mission-Work Owner

One approved mission-work owner determines:

- Whether student work already exists.
- Whether it is resumable.
- Whether PB-003B shows Continue instead of Start.
- Work identity and duplicate prevention.
- Save, restoration, launch, and return behavior.

PI-001 must not create or infer work state.

## Class-Wide Distribution Workflow

### 1. Enter Protected Distribution Area

- Require an authenticated teacher role.
- Verify the current authorized classroom.
- Display the classroom name persistently throughout the workflow.
- Deny student and unauthenticated access through existing route protection.
- Do not expose distribution data when authority cannot be verified.

The exact route and Teacher Command Center placement must be approved by the pre-implementation inspection. Do not create a route by assumption.

### 2. View Verified Missions

- Show only missions verified as distributable by the mission source.
- Present factual mission title, version, and student-safe description.
- Present destination readiness factually.
- Present supported environment labels only when authoritative.
- Keep unavailable missions noninteractive or clearly excluded from confirmation.

Do not fabricate catalog data to fill the interface.

### 3. Select a Mission

- Selection prepares a draft change only.
- Selection does not distribute, launch, start, or create work.
- Show the selected mission and active classroom together.
- Prevent the same mission and version from occupying more than one Start position.

### 4. Choose Start Position

- Provide explicit first, second, and third positions.
- Support fewer than three missions.
- Prevent confirmation of more than three choices.
- Preserve explicit teacher order.
- Provide a keyboard-accessible ordering method; drag-only behavior is prohibited.
- Do not rotate, rank, or personalize order automatically.

### 5. Choose Current Classroom Focus

- Permit zero or one current classroom focus.
- Current focus must be one of the distributed Start choices.
- Clearly identify when selecting a new focus will replace an existing focus.
- Preserve the prior mission as available when it remains in the approved Start set.
- Stop if focus replacement state cannot be verified.

### 6. Preview

- Show the complete resulting set of up to three Start choices.
- Show their exact order.
- Identify the current classroom focus.
- Show the classroom recipient.
- Show factual destination limitations.
- Show removal effects when removal is proposed.
- Keep preview private to the teacher.

### 7. Confirm

- Require one explicit teacher confirmation.
- Reverify mission identity, version, classroom authority, destination, and current distribution state.
- Apply the change exactly once.
- Show success only after authoritative confirmation.
- On failure, keep the last verified state and show a recoverable message.
- Refresh or repeated activation must not repeat the change.

### 8. Student Presentation

- PB-003B reads the latest verified distribution state.
- Students see only choices authorized for their current classroom.
- Continue-first behavior remains controlled by the mission-work owner.
- No teacher draft or preview is student-visible.

## Teacher Distribution Controls

Provide only:

- Select approved mission.
- Assign first, second, or third Start position.
- Mark or clear current classroom focus.
- Preview complete choice set.
- Confirm distribution.
- Preview a position or focus change.
- Confirm a position or focus change.
- Preview removal.
- Confirm removal.
- Cancel an unconfirmed draft.

All controls must:

- Be teacher-only.
- Remain visibly scoped to the current classroom.
- Meet the existing Platform minimum touch-target requirement.
- Have visible keyboard focus.
- Use explicit accessible names.
- Distinguish draft selection from confirmed state.
- Prevent repeated submission while confirmation is pending.

Do not add mission editing, student work, progress, grading, recommendation, or launch controls.

## Preview Behavior

Preview must include:

- Classroom name.
- Mission title and version.
- Student-safe description.
- Resulting Start position.
- Current focus status.
- Complete resulting Start-choice order.
- Destination readiness or limitation.
- Removal effect when applicable.

Preview must not:

- Save or distribute a mission.
- Impersonate a student.
- Display another student's state.
- Expose private identifiers or internal records.
- Create student work.
- Trigger Mission, Builder, or Workshop behavior.
- Announce success.

Closing or cancelling preview returns focus to the initiating teacher control and leaves confirmed distribution unchanged.

## Confirmation Behavior

Confirmation must:

- Follow a valid preview.
- Identify mission, classroom, order, focus, and resulting availability.
- Reverify authoritative state immediately before mutation.
- Be idempotent under double activation, refresh, retry, and repeated identical requests.
- Prevent duplicate active class-wide relationships.
- Lock or disable repeated submission while pending.
- Return visible and accessible success feedback after confirmation.
- Return visible and accessible failure feedback without exposing internal details.
- Preserve the last verified confirmed state after failure.

No confirmation may proceed from stale mission version, stale classroom authority, unverified destination, or unresolved concurrent change.

The approved owner must define the idempotency and conflict mechanism before implementation.

## Removal Safety Behavior

Removal means removing future Start availability for one mission in one classroom.

### Required Behavior

- Preview the mission and classroom.
- Identify whether the mission is current classroom focus.
- Show the resulting Start-choice order.
- State that existing student work will not be deleted.
- Require explicit confirmation.
- Remove the mission from future Start presentation only after authoritative success.
- Preserve remaining missions' relative order and compact positions.
- Clear current focus only when the removed mission held it; do not choose a replacement automatically.
- Make restoration a new preview-and-confirm action.

### Prohibited Removal Effects

Removal must not:

- Delete or change the mission definition.
- Delete, reset, submit, complete, archive, hide, or publish student work.
- Delete evidence or reflection.
- Alter Builder or Workshop state.
- Fabricate a replacement mission.
- Randomly reorder remaining missions.
- Promise Continue access when the mission-work owner cannot verify it.

If student-work safety cannot be confirmed, removal must stop.

## Continue Versus Start Ownership Boundaries

### Continue

- Owned by the authoritative mission-work system.
- Displayed first when verified resumable work exists.
- Returns to the same work record.
- Never created by a distribution record alone.
- Remains independent of teacher review, credits, badges, reflection, jobs, and public sharing when the work owner permits continuation.

### Start

- Requires verified distribution and a functional destination.
- Creates or opens initial work only through a separately approved mission-work and launch contract.
- Must not duplicate existing work.
- Must not erase another current project.

### Resolution

When the same mission has verified existing work, PB-003B presents Continue rather than duplicate Start.

When owners disagree or cannot be verified, no launch occurs. Existing work remains protected and the student receives a calm unavailable message.

PI-001 does not implement launch behavior unless a separate approved launch specification is incorporated explicitly.

## Student Presentation Contract

PB-003B remains the sole Mission Choice presentation owner.

PI-001 may supply only:

- Verified mission identity and version for internal resolution.
- Student-safe title and short description.
- Verified class-wide availability.
- First, second, or third Start position.
- Current classroom focus meaning.
- Destination availability.
- Approved work-environment relationship labels.

### Presentation Order

1. Verified Continue work.
2. Current classroom focus among Start choices.
3. Remaining Start choices in confirmed teacher order.
4. Future separately approved Side Paths.

### Student UI Rules

- Show no more than three Start cards.
- Do not show the same mission as both Continue and duplicate Start.
- Do not expose teacher drafts, previews, audit state, or private notes.
- Do not expose internal IDs.
- Do not show grades, rankings, progress, completion, ability, readiness, or recommendations from PI-001.
- Do not make an unverified or destination-unavailable mission look enabled.
- Preserve PB-003B empty states when no verified choices exist.
- Refresh must display only the latest verified authorized state.
- Wrong-role access and sign-out must remove student mission content.

## Empty and Unavailable States

### Teacher: No Approved Missions

`No approved missions are available to distribute yet.`

### Teacher: No Authorized Classroom

`Choose an authorized class before preparing mission availability.`

### Teacher: No Student-Visible Choices

`No missions are currently available to students in this class.`

### Teacher: Destination Not Ready

`This mission cannot be made available until its destination is ready.`

### Teacher: Availability Cannot Be Verified

`Mission availability cannot be checked right now. Try again.`

### Teacher: Change Not Confirmed

`The mission availability change was not confirmed. Review it and try again.`

### Student: No Continue Work

Preserve PB-003B:

`No mission is ready to continue yet.`

### Student: No Start Choices

Preserve PB-003B:

`No new missions are available right now.`

### Student: Availability Error

Preserve PB-003B:

`Mission choices cannot be checked right now. Try again.`

### State Rules

- Use visible text and do not rely on color alone.
- Distinguish empty, unavailable destination, verification failure, and failed confirmation.
- Do not fabricate cards or show stale availability.
- Do not expose IDs, credentials, network details, storage details, another teacher, another classroom, or another student.
- Do not announce success until authoritative confirmation exists.

## Privacy Requirements

PI-001 must:

- Restrict controls and data to authenticated authorized teacher routes.
- Verify classroom authority before every read and mutation.
- Provide students only the verified availability of their current authorized classroom.
- Keep teacher drafts, previews, changes, and removal state private.
- Avoid ordinary UI display of class codes, private identifiers, raw student IDs, mission IDs, distribution IDs, or account details.
- Avoid collecting or using grades, behavior, ability, readiness, support classifications, private teacher notes, or student activity as distribution inputs.
- Avoid exposing another teacher's classroom or another student's information.
- Keep distribution and student choice out of Student Display, Smart Board, Teacher Feed, Hall of Fame, analytics, reports, and public recognition.
- Preserve PB-001 wrong-role, refresh, and sign-out protections.

Before implementation, approve distribution data purpose, retention, deletion, audit, classroom lifecycle, and cross-device behavior.

## Accessibility Requirements

- Use semantic teacher and student regions with logical headings.
- Provide explicit labels for mission, classroom, order, focus, availability, preview, and confirmation.
- Preserve DOM, visual, screen-reader, and responsive order.
- Provide keyboard-operable selection and ordering; drag-only behavior is prohibited.
- Return focus predictably after preview, cancellation, confirmation, and errors.
- Provide visible focus for every enabled control.
- Communicate draft, confirmed, unavailable, success, and error states with text rather than color alone.
- Use accessible status announcements without repetitive output.
- Meet the existing Platform minimum touch-target size.
- Support text resizing and browser zoom without clipping or overlap.
- Wrap long mission titles, descriptions, classroom names, and state messages safely.
- Require no hover, audio, speech, pointer precision, or timed response.
- Preserve reduced-motion compatibility.
- Keep unavailable mission content out of the tab order unless a functional explanatory control is approved.

## Chromebook Requirements

Physically validate on the target Chromebook:

- Teacher route protection and current classroom orientation.
- Mission catalog readability.
- Mission selection with keyboard and touchpad.
- First, second, and third position controls.
- Keyboard-accessible ordering without drag.
- Current classroom focus selection and replacement warning.
- Complete preview readability without horizontal scrolling.
- Confirmation cannot be triggered accidentally.
- Double activation creates one result.
- Refresh does not repeat confirmation.
- Confirmed distribution restores correctly.
- Removal preview is understandable.
- Removal preserves existing student work.
- Remaining choices retain relative order.
- PB-003B shows the correct bounded student choices.
- Continue remains ahead of Start.
- Long mission titles and descriptions wrap safely.
- Browser zoom and text resizing remain usable.
- No nested scrolling, card carousel, or horizontal overflow.
- Wrong-role and sign-out protection remain intact.
- No stale or cross-classroom availability appears.
- No console errors, significant slowdown, or unexpected layout shifts occur.

Physical Chromebook validation cannot be replaced by local desktop inspection.

## Protected Systems

Do not break or redesign:

- PB-001 authentication shell, roles, entry, route guards, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, TODAY layout, timer, memo, Student Display, and presentation modes.
- PB-003A Student Home.
- PB-003B Continue-first hierarchy, Mission Choice layout, three-choice boundary, empty states, and privacy.
- PB-003C My STEM Work and evidence boundaries.
- Existing Mission definitions, behavior, restoration, and canonical content.
- Builder behavior, navigation, persistence, and assets.
- Workshop rendering, camera, geometry, Table, Grid, measurement, Tool Chest, Smart Board, persistence, mission restoration, and assets.
- Existing approved Platform assets and documents.
- `.vscode/settings.json` and unrelated files.

## Required Testing

### Focused Unit and Contract Tests

Verify:

- Stable mission identity and version are required.
- One active class-wide relationship exists per classroom, mission, and version.
- Student-specific recipients are rejected by PI-001 v1.0.
- Zero through three Start positions are accepted.
- A fourth Start choice is rejected before confirmation.
- Duplicate mission positions are rejected.
- One or zero current classroom focus states are accepted.
- Focus must belong to the distributed Start set.
- Mission order remains explicit and stable.
- Confirmation is idempotent.
- Refresh does not repeat confirmation.
- Failed confirmation preserves the last verified state.
- Removal affects future Start availability only.
- Removal preserves student work and remaining relative order.
- Restoration does not duplicate distribution or work.
- Continue versus Start is resolved by the mission-work owner.
- Unverified destinations cannot produce enabled Start actions.
- Teacher, student, classroom, and mission authorization boundaries hold.

### Teacher UI Tests

Verify:

- Current classroom remains visible throughout the workflow.
- Draft selection is distinct from confirmed state.
- Preview shows the complete resulting choice set.
- Confirmation requires explicit action.
- Pending confirmation prevents repeated submission.
- Success appears only after authoritative confirmation.
- Error states are visible, accessible, and recoverable.
- Ordering works without drag.
- Removal preview states its limited effect.
- Focus returns to the initiating control after cancellation or completion.

### Student Presentation Tests

Verify:

- PB-003B remains the only student Mission Choice presentation.
- Continue appears before Start when verified.
- No more than three Start cards appear.
- Current classroom focus is emphasized without overriding Continue.
- Teacher-confirmed order is preserved.
- The same mission is not duplicated across Continue and Start.
- Teacher drafts and internal records never appear.
- Empty and unavailable states use approved language.
- Refresh, wrong-role, and sign-out protection work.

### Privacy and Security-Boundary Tests

Verify:

- Students cannot access teacher distribution controls.
- Teachers cannot access unauthorized classrooms.
- Students cannot view another classroom's availability.
- Internal IDs and private identifiers do not appear in ordinary UI.
- Distribution data does not flow to Student Display, Smart Board, Teacher Feed, Hall of Fame, or public surfaces.
- Sign-out clears protected presentation and pending private state according to the approved owner contract.

### Accessibility and Responsive Tests

Verify:

- Semantic regions and heading order.
- Accessible control names.
- Keyboard selection, ordering, preview, confirmation, and removal.
- Visible focus and focus return.
- Text-based state meaning.
- Accessible status announcements.
- Existing minimum touch targets.
- Safe long-text wrapping.
- Browser zoom and text resizing.
- No horizontal scrolling, nested scrolling, card rail, or clipped fixed height.

### Regression Tests

Run and pass:

- Full Platform automated test suite.
- PB-001 teacher/student entry, roles, refresh, and sign-out regressions.
- PB-002 Teacher Command Center, timer, memo, and Student Display regressions.
- PB-003A Student Home regressions.
- PB-003B Mission Choice regressions.
- PB-003C My STEM Work regressions.
- Existing Mission regression tests.
- Full Workshop automated regression suite.
- Builder smoke test.
- Workshop smoke test.

### Final Inspection

Confirm:

- Implementation matches the approved ownership inspection and specification.
- Only approved PI-001 files changed.
- No unrelated application, test, asset, Builder, Workshop, or `.vscode/settings.json` file changed.
- No prohibited framework, dependency, route, data owner, storage owner, fixture, or integration was introduced.
- No file was staged, committed, tagged, or pushed before separate authorization.

## Definition of Done

PI-001 is complete only when:

- Pre-implementation inspection identifies every required authoritative owner.
- The implementation uses those approved owners without architectural invention.
- Authorized teachers can prepare up to three class-wide Start choices.
- One optional current classroom focus is supported safely.
- Every change uses preview and explicit idempotent confirmation.
- Refresh does not repeat a change.
- Removal affects future Start availability without deleting or changing student work.
- Continue versus Start remains owned by the mission-work system.
- PB-003B displays only verified authorized choices in the approved order.
- Empty and unavailable states are honest and accessible.
- Privacy, wrong-role, refresh, and sign-out protections pass.
- Focused, Platform, Mission, Builder, and Workshop regressions pass.
- Final implementation inspection passes.
- Physical Chromebook validation passes.
- User approval is received.

No commit, tag, or push is permitted until separately authorized.

## Completion Report Required

After implementation, report:

- Authoritative owners used.
- Architecture decisions approved by inspection.
- Files created.
- Files modified.
- Teacher distribution workflow implemented.
- Student presentation handoff implemented.
- Focused test results.
- Platform and protected-system regression results.
- Builder and Workshop smoke-test results.
- Privacy and accessibility results.
- Known limitations.
- Physical Chromebook validation status.

