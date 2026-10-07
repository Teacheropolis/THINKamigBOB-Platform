# PI-001 — Mission Distribution

## Design Blueprint v1.0

Status: Proposed blueprint pending review and approval  
Platform Area: Teacher-to-student mission availability  
Student Experience Consumer: PB-003B Mission Choice

## Document Boundary

This document defines the proposed Mission Distribution experience only. It does not authorize implementation.

Implementation requires an approved mission owner, distribution owner, data and retention decisions, read-only repository inspection, companion design decisions, a separately reviewed build specification, and the complete THINKamigBOB development workflow.

## Controlling References

- `docs/platform/PLATFORM-BLUEPRINT-v1.0.md`
- `docs/platform/DEVELOPMENT-STANDARDS-v1.0.md`
- `docs/platform/builds/PB-003/PB-003-STUDENT-DASHBOARD-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003/PB-003-STUDENT-DASHBOARD-DESIGN-DECISIONS-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-EXPERIENCE-BLUEPRINT-v1.0.md`
- `docs/platform/builds/PB-003B/PB-003B-MISSION-CHOICE-DESIGN-DECISIONS-v1.0.md`
- Approved PB-001 through PB-003C Platform foundations

## Purpose

Define how an authorized teacher may make approved missions available to a class or student without changing mission content, fabricating student readiness, or turning ordinary student choice into automated assignment.

Mission Distribution should help a teacher answer:

1. Which approved missions can I make available?
2. Who will receive each mission choice?
3. Which mission is the current classroom focus?
4. In what order should available choices appear?
5. What will students see before I confirm distribution?
6. Can I correct availability without deleting student work?

It should help a student answer:

1. Which missions are available to me?
2. Which mission is the current classroom focus?
3. Am I continuing existing work or starting something new?

## Core Principle

Mission Distribution controls availability, not ability.

A distribution record may say that a mission is available to a class or student. It must not claim that the student is ready, capable, behind, advanced, likely to succeed, or required to complete the mission unless an approved authoritative assignment source explicitly provides that meaning.

## Definition of Distribution

Distribution is the teacher-authorized relationship between:

- One approved mission definition.
- One authorized classroom or, when separately permitted, one student.
- One factual availability state.
- One teacher-controlled presentation position or approved source order.
- Optional current-classroom-focus meaning.

Distribution does not copy, edit, fork, or own the mission definition. It does not create student work, launch a work environment, calculate progress, or mark completion.

## Experience Objective

Provide a calm, bounded teacher workflow that makes approved mission choices visible in PB-003B while preserving:

- Teacher authority over classroom availability.
- Student choice within teacher-authorized boundaries.
- Continue-first behavior for verified existing work.
- Mission identity and content ownership.
- Student privacy.
- Existing Builder, Workshop, and Mission behavior.
- Honest unavailable and error states.

## Authoritative Ownership Model

### Mission Definition Owner

An approved mission source owns:

- Stable mission identity.
- Mission title and student-safe description.
- Mission version.
- Approved availability eligibility.
- Supported work-environment relationships.
- Any required teacher context.

PI-001 must not derive mission identity from titles, filenames, card position, or tool names.

### Distribution Owner

A future approved Platform owner must own:

- Classroom or student availability relationship.
- Current classroom mission designation.
- Display order when explicitly teacher-controlled.
- Distribution status and authorized timestamps.
- Teacher identity responsible for the distribution action.

This blueprint does not choose a backend, database, API, browser-storage model, or cross-device synchronization architecture.

### Student Work Owner

The authoritative mission-work or project system must own:

- Whether work already exists.
- Continue versus Start resolution.
- Work identity.
- Save and restoration behavior.
- Launch and return contracts.
- Progress or completion, if later approved.

Mission Distribution must not create or infer student work.

## Teacher Distribution Experience

### Entry Point

Mission Distribution belongs in a protected teacher-only Platform area.

The exact Teacher Command Center navigation location requires a later design decision and build specification. It must not displace TODAY-focused classroom controls or expose distribution controls on student routes.

### Mission Selection

The teacher may select only from mission definitions verified by the approved mission source.

Mission selection should provide enough factual information to distinguish missions without opening Builder, Workshop, or student work. Permitted future information may include:

- Mission title.
- Student-safe summary.
- Mission version.
- Approved subject or classroom context.
- Supported work-environment relationships when explicitly provided.
- Current availability state for the selected classroom.

Do not display fabricated thumbnails, progress, popularity, recommendation, difficulty, grade level, readiness, or success predictions.

### Recipient Selection

The primary distribution scope is the teacher's current authorized classroom.

Class-wide availability should be the simplest and most prominent flow. Student-specific distribution may be offered only after separate decisions establish:

- Legitimate classroom purpose.
- Teacher authorization.
- Privacy-safe roster selection.
- Clear behavior when roster membership changes.
- Protection against exposing one student's availability to another.

PI-001 must not introduce groups, teams, adaptive cohorts, or inferred student categories.

### Current Classroom Mission

The teacher may identify one distributed mission as the current classroom focus when the approved distribution owner supports that meaning.

Current classroom focus:

- Controls presentation emphasis only.
- Does not erase other available missions.
- Does not automatically start student work.
- Does not override verified Continue work.
- Does not imply completion, grade, urgency, or teacher review.

Only one mission may be the current classroom focus for a classroom at a time. Conflict and replacement behavior require explicit companion design decisions before implementation.

### Primary Start Choices

PB-003B permits up to three teacher-authorized Start mission cards.

The distribution experience must prevent an unresolved state in which more than three missions are expected to occupy the primary Start positions. It should make the visible student order clear before confirmation.

It must not:

- Randomly rotate or shuffle missions.
- Rank missions using student activity, grades, behavior, AI, or inferred ability.
- Silently hide teacher-authorized missions.
- Treat Side Paths as primary Start positions.

Access to more than three available missions requires a separately approved View All Missions experience or another explicit product decision.

### Preview Before Confirmation

Before confirming distribution, the teacher should receive a student-safe preview showing:

- Mission title and approved description.
- Intended recipient scope.
- Current classroom focus, if selected.
- Primary Start order.
- Visible availability meaning.
- Any unavailable or missing destination limitation.

Preview must not impersonate a student, expose student private identifiers, or display another student's work.

### Confirmation

Distribution requires an explicit teacher confirmation.

Confirmation must:

- Identify the mission.
- Identify the classroom or separately approved student scope.
- State the resulting availability meaning.
- Avoid accidental duplicate distribution under repeated activation.
- Fail safely when mission identity, recipient authority, or destination cannot be verified.

No mission should become visible merely because the teacher opened, previewed, searched, or selected it.

## Distribution States

The future authoritative distribution model may use these factual meanings:

### Draft

The teacher is preparing a distribution. Students cannot see it.

### Available

The mission is teacher-authorized for the specified classroom or student and may appear as a Start choice when a functional destination exists.

### Current Classroom Focus

The mission is available and receives approved classroom-focus emphasis. It remains subject to Continue-first presentation.

### Unavailable

The teacher has removed future Start availability. Existing student work is not deleted, submitted, completed, or hidden by this state.

### Availability Cannot Be Verified

The Platform cannot safely confirm the current distribution state. Students must not receive stale availability as current.

The final state names, transition rules, timestamps, and persistence contract require companion design decisions and an approved data owner.

## Availability and Removal Rules

- Distribution makes a mission available; it does not force a start.
- Repeated confirmation must be idempotent and must not create duplicate distribution records.
- Removing availability affects future Start choices only.
- Removing availability must not delete, reset, submit, complete, or publish existing student work.
- Verified existing work may remain continuable when the authoritative mission-work owner permits it.
- A mission version change must not silently replace the version connected to existing student work.
- A removed or unavailable mission must not remain visible as currently available after refresh.
- Failed changes must preserve the last verified state and provide a calm teacher-facing recovery message.

## Student Experience Contract

PB-003B remains the student presentation owner.

Mission Distribution may provide PB-003B only verified, student-safe facts needed to present:

- Up to one current classroom mission emphasis.
- Up to three teacher-authorized Start choices.
- Explicit teacher-provided order.
- Factual unavailable state when student-safe and useful.
- Supported Builder or Workshop relationship labels only when supplied by the mission definition.

Mission Distribution must not provide or cause:

- Automatic mission launch.
- A fabricated Continue state.
- Student progress or completion claims.
- Personalized recommendations.
- Hidden ability grouping.
- Public class comparisons.
- Teacher-review status.
- Changes to PB-003B Continue-first behavior.

## Continue Versus Start Boundary

Distribution authorizes Start availability. It does not decide whether a student should see Continue.

When authoritative work already exists:

- The mission-work owner determines resumability.
- Continue remains first and strongest.
- Starting the same mission must not create duplicate work.
- Starting another available mission must not erase current work.
- Any conflict between distribution and existing work must stop safely until approved owner rules resolve it.

## Mission Content Boundaries

PI-001 does not authorize mission authoring or editing.

Teachers must not use distribution to change:

- Mission title or definition.
- Mission instructions or stages.
- Builder or Workshop content.
- Mission version.
- Evidence requirements.
- Reflection prompts.
- Progress or completion rules.

Teacher-added classroom context, scheduling language, or notes require separate design and privacy approval before they may accompany a distribution.

## Builder and Workshop Boundaries

Mission Distribution may preserve a factual relationship label supplied by the approved mission source.

It must not:

- Launch Builder or Workshop.
- Create Builder or Workshop work.
- Transfer mission, student, geometry, camera, selection, measurement, or save data.
- Change Builder or Workshop navigation, assets, persistence, or mission restoration.
- Treat opening either environment as Start, progress, or completion.
- Infer an environment relationship from titles or existing assets.

Future launch and return behavior requires separate integration inspection and approval.

## Side Paths Boundary

Side Paths remain optional, secondary, and teacher-authorized.

PI-001 does not define Side Path creation, distribution, relationship, launch, or return behavior. A future Side Path distribution build must preserve the primary mission, avoid remediation labeling, and prevent loss of current work.

## Teacher Authority Boundaries

An authorized teacher may eventually:

- Make an approved mission available to an authorized classroom.
- Remove future Start availability.
- Identify the current classroom focus.
- Set the bounded primary display order.
- Preview student-safe presentation before confirmation.

A teacher may not use PI-001 to:

- Alter mission definitions.
- Create student work.
- Mark progress or completion.
- Infer ability or readiness.
- Expose another teacher's classroom.
- Override source permissions.
- Delete student work or evidence.
- Publish student choices or activity.

## Student Authority Boundaries

When supported by later approved systems, a student may:

- View missions authorized for that student or classroom.
- Continue verified current work.
- Start one of the bounded available choices.
- Decline to start an optional choice.

A student may not:

- Make a mission available.
- Reorder teacher-authorized choices.
- Change current classroom focus.
- View another student's availability or work.
- Edit mission definitions or distribution records.
- Override teacher or source permissions.

## Privacy Requirements

Mission Distribution must:

- Restrict teacher controls to authenticated authorized teacher routes.
- Restrict classroom recipients to classrooms the teacher is authorized to manage.
- Provide students only their authorized class-wide and student-specific availability.
- Keep student-specific distribution private from classmates.
- Avoid displaying class codes, private identifiers, raw student IDs, internal mission IDs, or distribution IDs in ordinary UI.
- Avoid transmitting or storing grades, behavior, inferred ability, support classifications, or private teacher notes as distribution inputs.
- Avoid sending distribution events to Student Display, Smart Board, Hall of Fame, Teacher Feed, or public surfaces without separate approval.
- Preserve PB-001 refresh, wrong-role, and sign-out protection.

Data purpose, retention, audit, deletion, and cross-device behavior must be approved before implementation.

## Accessibility Requirements

A future Mission Distribution experience must provide:

- Semantic teacher-only regions and logical headings.
- Explicit labels for mission, recipient, availability, and order.
- Keyboard-operable selection, preview, confirmation, correction, and removal.
- Visible focus and predictable focus return.
- Text-based state and error meaning without color-only communication.
- Accessible confirmation and error announcements that do not repeat excessively.
- Clear distinction between selection and confirmed availability.
- No drag-only ordering; provide a keyboard-accessible alternative.
- No hover-only essential information.
- Safe long-title and description wrapping.
- Browser zoom and text-resize support.
- Reduced-motion compatibility.

## Chromebook Requirements

A future implementation must physically validate:

- Mission selection is understandable on a Chromebook screen.
- Classroom and recipient scope remain visible during review.
- Up to three primary positions can be reviewed without horizontal scrolling.
- Ordering is usable with keyboard and touchpad.
- Confirmation cannot be triggered accidentally by ordinary scrolling or selection.
- Long mission titles and descriptions wrap without clipping.
- No nested scrolling or horizontal card rail is required.
- Refresh restores only verified draft or confirmed state according to the approved data contract.
- Wrong-role and sign-out protection remain intact.
- Repeated confirmation does not duplicate distribution.
- Removal does not remove existing student work.
- PB-003B receives the correct bounded choices and order.
- No console error or significant slowdown occurs.

Physical Chromebook validation cannot be replaced by desktop inspection.

## Honest Empty and Error States

Future teacher-facing language should distinguish:

- No approved missions are available to distribute.
- No classroom is selected or authorized.
- The mission destination is not ready.
- Availability cannot be verified.
- A distribution change could not be saved.
- A mission version conflict requires attention.

Messages must be calm, specific, recoverable, and must not expose internal IDs, credentials, another classroom, or another student's information.

The interface must not fabricate a mission card or show stale availability merely to avoid an empty state.

## Reliability and Safety Principles

- Distribution confirmation must be idempotent.
- A refresh must not repeat a distribution action.
- A failed change must not create a partial student-visible state.
- Multiple teacher sessions require an explicit conflict policy before implementation.
- Mission version changes require an explicit compatibility policy.
- Removing availability must be reversible when the authoritative owner permits it.
- Existing student work must never be used as the rollback mechanism for a distribution error.
- Destructive deletion of mission definitions or student work is outside PI-001.

## Protected Systems

PI-001 must protect:

- PB-001 authentication shell, teacher/student roles, entry, routing, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, and Student Display behavior.
- PB-003A Student Home foundation.
- PB-003B Mission Choice hierarchy, Continue-first behavior, bounded three-choice model, empty states, and privacy.
- PB-003C My STEM Work hierarchy and evidence boundaries.
- Existing Builder and Workshop behavior, assets, persistence, navigation, rendering, geometry, camera, measurement, and mission restoration.
- Existing Mission behavior and canonical mission content.
- Existing assets and approved documents.

## Explicitly Out of Scope

This blueprint does not authorize:

- Implementation of any Mission Distribution UI or data owner.
- Mission authoring, editing, import, duplication, generation, or publishing.
- Mission launch, stages, progress, completion, grading, or analytics.
- Student work creation, persistence, identity, or restoration.
- Builder or Workshop integration.
- Side Path distribution.
- Google Drive, Slides, Vids, Classroom, or account integration.
- Student recommendations, adaptive assignment, AI, or automation.
- Groups, teams, differentiated cohorts, or inferred readiness.
- Notifications, Teacher Feed events, reports, credits, badges, or Hall of Fame.
- Backend, database, API, production authentication, or cross-device architecture.
- New routes, session keys, fixtures, frameworks, dependencies, or assets.

## Required Decisions Before a Build Specification

The following must be resolved through inspection and approved design decisions:

1. Authoritative mission catalog and stable identity owner.
2. Distribution data owner and persistence architecture.
3. Classroom and optional student recipient authority.
4. Draft retention and refresh behavior.
5. Confirmation, idempotency, and concurrent-edit conflict policy.
6. Current classroom focus replacement behavior.
7. More-than-three availability handling.
8. Mission version compatibility and existing-work behavior.
9. Removal, restoration, and audit requirements.
10. Student-specific distribution privacy and roster-change behavior.
11. Error recovery and offline behavior.
12. Exact Teacher Command Center entry point.
13. Student presentation handoff contract with PB-003B.
14. Launch and Continue ownership boundaries.

If these decisions cannot be grounded in approved authoritative systems, implementation must stop at documentation and inspection.

## Proposed Build Decomposition

Subject to inspection and approval, PI-001 may be decomposed into:

### PI-001A — Mission Catalog Read-Only Foundation

Present verified approved mission definitions to authorized teachers without distribution controls.

### PI-001B — Classroom Distribution Controls

Define class-wide availability, bounded ordering, preview, and confirmation.

### PI-001C — Student Availability Handoff

Connect verified distribution state to PB-003B without implementing mission launch.

### PI-001D — Distribution Correction and Removal

Provide safe correction and future-Start removal without affecting existing work.

Student-specific distribution, launch, Side Paths, and cross-system work identity require separate milestones unless later inspection proves they can be safely bounded.

## Blueprint Acceptance Criteria

This blueprint is ready for review when it:

- Defines distribution as availability rather than assignment intelligence.
- Separates mission definition, distribution, and student-work ownership.
- Preserves Continue-first and the three-choice PB-003B boundary.
- Defines teacher and student authority limits.
- Protects existing work when availability changes.
- Establishes privacy, accessibility, Chromebook, and reliability principles.
- Identifies unresolved ownership and persistence decisions honestly.
- Adds no implementation authorization.

## Next Required Step

After review and approval, perform a read-only PI-001 pre-implementation inspection to identify authoritative mission, classroom, distribution, and work owners. Then create companion Mission Distribution Design Decisions before any build specification or implementation is authorized.

