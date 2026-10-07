# PI-001 — Mission Distribution

## Design Decisions v1.0

Status: Proposed design decisions pending review and approval  
Companion Document: PI-001 Mission Distribution Blueprint v1.0  
Student Experience Consumer: PB-003B Mission Choice

## Document Boundary

This document records Mission Distribution product and experience decisions only. It does not authorize implementation, data storage, routes, mission content, launch behavior, Builder or Workshop integration, or application-file changes.

Implementation requires an approved mission owner, distribution owner, persistence and retention decisions, read-only pre-implementation inspection, a separately reviewed build specification, and the complete THINKamigBOB development workflow.

## Controlling References

- `docs/platform/builds/PI-001/PI-001-MISSION-DISTRIBUTION-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/PLATFORM-BLUEPRINT-v1.0.md`
- `docs/platform/DEVELOPMENT-STANDARDS-v1.0.md`

## Decision 1 — Mission Ownership

### Decision

Mission definitions remain owned by one approved authoritative mission source.

PI-001 consumes verified mission information but does not create, copy, edit, fork, version, publish, or delete mission definitions.

### Required Mission Facts

Before a mission may be distributed, the mission owner must provide:

- Stable mission identity.
- Mission version.
- Student-safe title.
- Student-safe short description.
- Confirmation that the mission may currently be distributed.
- A functional destination status, even when launch remains outside PI-001.
- Builder or Workshop relationship labels only when explicitly defined by the source.

### Identity Rule

Mission identity must not be inferred from title, filename, card order, description, Builder relationship, Workshop relationship, or existing assets.

### Protected Content

Teachers cannot change mission content through distribution. Teacher-authored notes, scheduling language, adaptations, or classroom instructions require a separately approved content owner and are not part of PI-001 v1.0.

### Rationale

Separating content ownership from distribution prevents duplicate or conflicting mission definitions and protects canonical Mission, Builder, and Workshop behavior.

## Decision 2 — Distribution Model

### Decision

A distribution is one authoritative availability relationship between:

- One stable mission and version.
- One teacher-authorized classroom.
- One factual availability state.
- One primary Start position when the mission is student-visible.
- Optional current-classroom-focus meaning.

The same mission may have only one active class-wide distribution relationship per classroom and mission version.

### Initial Recipient Scope

PI-001 v1.0 supports class-wide distribution only.

Student-specific, group, team, cohort, differentiated, adaptive, and exception-based distribution are deferred. They require separate privacy, roster-change, teacher-authority, and visibility decisions.

### Distribution Is Not Work

Creating or changing a distribution must not:

- Create student work.
- Start a mission.
- Open Builder or Workshop.
- Record student progress.
- Mark a mission complete.
- Create evidence.
- Produce a Teacher Feed event.

### Persistence Boundary

This decision defines the conceptual record, not its technical storage. Backend, database, API, browser storage, retention, audit, synchronization, and concurrent-edit architecture remain unresolved and must be identified by inspection before a build specification.

### Rationale

Class-wide distribution is the smallest useful classroom model and avoids introducing private per-student assignment behavior before authoritative data and privacy systems exist.

## Decision 3 — Bounded Student Choice Set

### Decision

Each classroom may expose no more than three primary Start mission choices in PB-003B.

The teacher controls which distributed missions occupy these positions and their order. The Platform does not randomly rotate, shuffle, hide, rank, or personalize them.

### Order Rules

- Positions are explicit: first, second, and third.
- Fewer than three missions are shown when fewer are distributed.
- The current classroom focus may occupy one of the three positions but does not create a fourth position.
- Side Paths do not count as primary Start choices.
- A mission already represented by verified Continue work must not also appear as a duplicate Start choice for the same student.

### More Than Three Missions

The teacher cannot confirm a student-visible state containing more than three primary Start missions.

PI-001 does not silently hide additional distributions. A future View All Missions destination or a separately approved availability model is required before more than three may be available simultaneously.

### Rationale

The bounded set preserves PB-003B guided choice and makes the teacher responsible for classroom sequence without creating an algorithmic recommendation system.

## Decision 4 — Current Classroom Focus

### Decision

A teacher may mark at most one distributed mission as the current classroom focus.

Current classroom focus is a presentation emphasis within the available Start choices. It is not:

- An automatic Start instruction.
- A replacement for verified Continue work.
- A completion requirement.
- A deadline.
- A grade or teacher-review state.
- A personalized recommendation.

### Replacement Rule

Selecting a new current classroom focus must clearly identify the existing focus that will lose emphasis before confirmation. The prior mission remains available when it still occupies one of the approved Start positions.

If replacement would create an invalid choice set or the current state cannot be verified, confirmation must stop.

### Rationale

One focus supports classroom clarity without taking ordinary choice or continuation away from students.

## Decision 5 — Teacher Controls

### Decision

PI-001 v1.0 may provide only these protected teacher controls:

- View verified distributable missions.
- Select a mission for the current authorized classroom.
- Place it in one of up to three Start positions.
- Mark one distributed mission as current classroom focus.
- Preview the resulting student presentation.
- Confirm distribution.
- Change position or focus through a new preview and confirmation.
- Remove future Start availability through explicit confirmation.

### Control Boundaries

Teacher controls must remain on authenticated teacher routes and scoped to the teacher's authorized classroom.

They must not allow teachers to:

- Edit mission content.
- Create a mission.
- Start work for a student.
- Mark progress or completion.
- Infer or label ability, readiness, behavior, or support need.
- View or alter another teacher's classroom.
- Delete student work or evidence.
- Override mission-source or destination availability.

### Current Class Requirement

The teacher must see the active classroom throughout mission selection, ordering, preview, confirmation, and removal. A distribution action cannot proceed without one verified authorized classroom.

### Rationale

The controls expose only the minimum authority needed to manage classroom availability while keeping mission content and student work with their proper owners.

## Decision 6 — Student Choice Boundaries

### Decision

Students may see and choose only missions verified as available to their current classroom.

When later launch behavior is approved, a student may:

- Continue verified existing work.
- Start one of up to three available missions.
- Review student-safe mission information without starting.
- Choose not to start an optional mission.

Students may not:

- Make a mission available.
- Change classroom focus.
- Reorder teacher choices.
- Edit mission definitions.
- View another classroom's availability.
- View another student's choices or work.
- Override teacher or source permissions.

### No Forced Sequence

Distribution authorizes choices; it does not force a student through a sequence unless a separately approved mission owner explicitly defines a required sequence.

### No Inferred Personalization

Mission order and emphasis must not be changed using grades, behavior, time, activity, inferred readiness, ability, AI, or predictions.

### Rationale

Students retain meaningful agency inside teacher-authorized classroom boundaries without gaining teacher-only distribution powers.

## Decision 7 — Continue Versus Start

### Decision

Continue remains first and strongest whenever the authoritative work owner verifies resumable work.

Distribution controls Start availability only. It does not determine whether Continue exists.

### Continue Rules

- Continue returns to the same authoritative mission-work record.
- Continue does not create a new mission or work record.
- Continue remains ahead of current classroom focus and other Start choices.
- Continue is not blocked by teacher review, credits, badges, reflection, jobs, or public sharing when the source permits continuation.
- Removing future Start availability does not remove verified Continue access unless the authoritative work owner separately requires it.

### Start Rules

- Start is available only for a verified distributed mission with a functional authorized destination.
- Repeated activation must not create duplicate work.
- If work for that mission already exists, the work owner resolves the experience as Continue rather than duplicate Start.
- Starting a different available mission must not erase, submit, complete, publish, or replace current work.

### Conflict Rule

If the distribution owner and work owner disagree about Start versus Continue, no launch occurs. The student receives a calm unavailable message while existing work remains protected.

### Rationale

Separating availability from work ownership prevents duplicate projects and protects student continuity.

## Decision 8 — Preview Rules

### Decision

Every new distribution, position change, focus change, and removal requires a teacher preview before confirmation.

### Preview Content

The preview must show:

- Current authorized classroom.
- Mission title and version.
- Student-safe description.
- Resulting Start position.
- Current classroom focus status.
- Complete resulting set of up to three student Start choices in order.
- Factual destination limitation, if any.
- The effect of removal when removal is proposed.

### Preview Boundaries

Preview must not:

- Make the mission student-visible.
- Create or update student work.
- Impersonate a student.
- Reveal private identifiers or another student's state.
- Trigger Builder, Workshop, or mission launch.
- Claim that the change has been saved.

### Rationale

Showing the complete resulting student choice set helps teachers catch scope, order, and focus errors before affecting the classroom.

## Decision 9 — Confirmation Rules

### Decision

Distribution changes require one explicit confirmation after preview.

### Confirmation Requirements

Confirmation must:

- Identify the mission and classroom.
- State the resulting availability, order, and focus meaning.
- Use a clearly labeled teacher-only control.
- Be idempotent under repeated activation.
- Prevent duplicate active distribution relationships.
- Stop when mission identity, mission version, classroom authority, destination, or current distribution state cannot be verified.
- Present visible success feedback only after the authoritative owner confirms the change.
- Present a calm recoverable error when confirmation fails.

### Refresh and Repetition

- Refresh must not repeat a confirmation.
- Returning to a confirmed screen must not submit again.
- A repeated identical request must resolve to the same single distribution state.
- Confirmation state and persistence behavior require an approved technical owner before implementation.

### Rationale

Explicit, idempotent confirmation prevents accidental classroom-wide changes and duplicate records.

## Decision 10 — Removal Behavior

### Decision

Removal means removing future Start availability for one mission in one classroom.

It does not delete the mission, distribution history, student work, evidence, reflection, progress, or source content.

### Removal Flow

The teacher must receive a preview explaining:

- Which mission will stop appearing as a new Start choice.
- Which classroom is affected.
- Whether the mission is the current classroom focus.
- How remaining Start choices will be ordered.
- That existing student work will not be deleted.

Removal then requires explicit confirmation.

### Existing Work

When students already have authoritative work:

- The work remains intact.
- Continue behavior follows the work owner's rules.
- No work is reset, submitted, completed, archived, hidden, or published by PI-001.
- The Platform must not falsely promise Continue access when it cannot verify the work owner's policy.

### Position Handling

After removal, remaining missions retain their relative order and compact into the available first, second, and third positions. The Platform must not insert a fabricated mission or randomly reorder choices.

### Restoration

Making the mission available again is a new preview-and-confirm action. It must reconnect the same authoritative mission identity and must not duplicate existing student work.

### Rationale

Availability corrections must be safe and reversible without using student work as the rollback mechanism.

## Decision 11 — Student Presentation Rules

### Decision

PB-003B remains the only student-facing Mission Choice presentation owner.

PI-001 supplies verified availability facts; it does not render a second student mission interface.

### Permitted Student Presentation

PB-003B may present:

- Up to one verified Continue action from the work owner.
- Up to three verified teacher-authorized Start mission cards.
- One current-classroom-focus cue within those Start cards.
- Teacher-controlled Start order.
- Student-safe mission title and short description.
- Approved work-environment relationships supplied by the mission owner.
- Calm empty or unavailable states.

### Required Presentation Order

1. Verified Continue work.
2. Current classroom focus when it exists among Start choices.
3. Remaining Start choices in teacher-confirmed order.
4. Future separately approved Side Paths.

### Prohibited Student Presentation

Do not display:

- Raw mission, classroom, student, or distribution IDs.
- Teacher identity or private notes.
- Distribution audit history.
- Grades, rankings, ability, readiness, or recommendations.
- Progress or completion from PI-001.
- Another student's availability or work.
- A mission without a verified functional destination as an enabled action.

### Refresh and Sign-Out

Student presentation must restore only the latest verified authorized availability after refresh and must disappear on sign-out or wrong-role access.

### Rationale

One student presentation owner avoids contradictory mission cards and preserves the approved PB-003B experience.

## Decision 12 — Empty and Unavailable States

### Decision

Empty and unavailable states must identify what is missing without fabricating mission cards, exposing internal details, or blaming teachers or students.

### Teacher States

#### No Approved Missions

Meaning:

`No approved missions are available to distribute yet.`

#### No Authorized Classroom

Meaning:

`Choose an authorized class before preparing mission availability.`

#### No Student-Visible Choices

Meaning:

`No missions are currently available to students in this class.`

#### Destination Not Ready

Meaning:

`This mission cannot be made available until its destination is ready.`

#### Availability Cannot Be Verified

Meaning:

`Mission availability cannot be checked right now. Try again.`

#### Change Not Confirmed

Meaning:

`The mission availability change was not confirmed. Review it and try again.`

### Student States

PB-003B remains authoritative for student-facing language:

- `No mission is ready to continue yet.`
- `No new missions are available right now.`
- `Mission choices cannot be checked right now. Try again.`

### State Rules

- Use visible text and do not rely on color alone.
- Distinguish no data, unavailable destination, and verification failure.
- Do not expose IDs, credentials, storage names, network details, or another classroom.
- Do not show stale availability as current.
- Do not display success until the authoritative owner confirms it.

### Rationale

Specific factual states preserve trust and give teachers and students a safe next step without false data.

## Decision 13 — Privacy Boundaries

### Decision

Mission Distribution is private classroom management information.

### Teacher Privacy

Teachers may view and change distribution only for classrooms they are authorized to manage.

Teacher UI must not expose:

- Another teacher's classroom or distribution records.
- Student private identifiers.
- Grades, behavior, inferred ability, support classifications, or private notes as distribution inputs.
- Student work or evidence unless a separately approved teacher visibility system authorizes it.

### Student Privacy

Students may view only verified availability for their current authorized classroom.

Students must not see:

- Another classroom's mission availability.
- Another student's choices or work.
- Teacher-only draft, preview, audit, or removal state.
- Teacher identity or private distribution notes.
- Raw IDs or internal records.

### Public Surface Boundary

Mission distribution, selection, and availability must not flow to:

- Student Display or Smart Board.
- Teacher Feed.
- Hall of Fame.
- Public recognition.
- Classroom analytics or reports.

Any such use requires separate purpose, audience, privacy, retention, and approval decisions.

### Data Decisions Still Required

Before implementation, approve:

- Distribution data owner.
- Purpose limitation.
- Retention and deletion.
- Audit requirements.
- Cross-device synchronization.
- Concurrent teacher-session behavior.
- Roster and classroom lifecycle behavior.

### Rationale

Distribution should reveal only the availability facts necessary for teacher control and student choice.

## Decision 14 — Accessibility and Chromebook Boundaries

### Decision

Any future PI-001 interface must be usable without drag, hover, color recognition, pointer precision, or a large display.

### Requirements

- Semantic regions and logical headings.
- Explicit mission, classroom, order, focus, and availability labels.
- Keyboard-accessible ordering alternative.
- Visible focus and predictable focus return.
- Text-based preview, success, and error meaning.
- Accessible status announcements without repetitive output.
- At least the existing Platform minimum touch-target size for controls.
- Safe long-title and description wrapping.
- No horizontal card rail or nested scrolling.
- Browser zoom and text resizing without clipping.
- Physical Chromebook validation of selection, ordering, preview, confirmation, removal, refresh, keyboard, and touchpad behavior.

### Rationale

Distribution is a classroom control workflow and must remain dependable under ordinary Chromebook conditions.

## Decision 15 — Protected Systems and Stop Conditions

### Protected Systems

PI-001 must preserve:

- PB-001 authentication shell, roles, routing, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, and Student Display.
- PB-003A Student Home.
- PB-003B Continue-first hierarchy, bounded Start choices, empty states, and privacy.
- PB-003C My STEM Work and evidence boundaries.
- Existing Mission definitions, behavior, and restoration.
- Builder and Workshop behavior, assets, persistence, navigation, rendering, camera, geometry, and measurement.

### Stop Conditions

Stop before implementation if inspection cannot identify:

- One authoritative mission identity owner.
- One authorized classroom owner.
- One distribution data and persistence owner.
- One work owner for Continue versus Start resolution.
- A functional mission destination contract.
- Safe idempotent confirmation.
- Safe removal that preserves student work.
- Privacy-safe refresh, sign-out, and wrong-role behavior.

Do not substitute development fixtures or browser session state as production architecture without explicit approval.

## Explicitly Deferred Decisions

The following are not decided or authorized by v1.0:

- Student-specific distribution.
- Groups, teams, cohorts, or differentiated availability.
- More than three primary Start choices.
- View All Missions.
- Side Path distribution.
- Mission launch and return behavior.
- Mission authoring or teacher-added context.
- Mission version migration for existing work.
- Backend, database, API, browser storage, or cross-device architecture.
- Retention, deletion, audit, and concurrent-edit implementation.
- Notifications, Teacher Feed, reports, analytics, credits, badges, or AI.

## Decision Summary

- Missions retain one authoritative definition owner.
- PI-001 v1.0 distributes class-wide availability only.
- Students receive no more than three primary Start choices.
- One available mission may be the current classroom focus.
- Continue remains first and is owned by the work system.
- Every change requires preview and explicit idempotent confirmation.
- Removal affects future Start availability and never deletes student work.
- PB-003B remains the single student presentation owner.
- Empty states are factual, calm, and private.
- Backend, persistence, retention, and launch architecture remain blocked pending inspection and approval.

## Approval Meaning

Approval establishes these Mission Distribution decisions as design authority only.

It does not authorize implementation, application-file changes, test changes, staging, committing, tagging, or pushing.

The next step is a read-only PI-001 pre-implementation inspection to identify authoritative mission, classroom, distribution, persistence, work, and destination owners. A build specification may be created only when those owners and stop conditions are resolved.

