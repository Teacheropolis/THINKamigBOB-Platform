# PB-002J — Teacher Goal, Mission, and Activity Availability Design Decisions v1.0

**Document Status:** Proposed design decisions pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent System:** PB-002 — Teacher Command Center  
**Student Consumer:** PB-003 Student Dashboard and PB-003B Mission Choice  
**Architecture Dependencies:** PI-000B, PI-000H, PI-001  
**Protected Systems:** PB-001; PB-002A through PB-002I; PB-003A through PB-003D; Builder; Workshop

## 1. Purpose

Lock the approved product-experience decisions for future teacher control of class-wide Goal/Mission and activity availability without selecting unresolved authorities, records, storage, synchronization, technologies, or integrations.

The required workflow is:

`Choose class → choose instructional grade → select Goal(s)/Mission(s) → select available activities → review preparation → preview student experience → confirm availability`

These decisions do not authorize implementation.

## 2. Controlling References

- PB-002J Teacher Goal, Mission, and Activity Availability Blueprint v1.0 — approved final reconciliation.
- PB-003B Mission Choice Experience Blueprint and Design Decisions v1.0.
- PI-000B Mission and Distribution Ownership Contracts.
- PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- PI-001 Mission Distribution Blueprint and Design Decisions.
- PB-002I Teacher Command Center Today’s Mission Classroom Pilot Build Specification v1.0.
- `THINKamigBOB_Activity_Templates_Grade_Goal_Prep_Guide (1).docx`, identified as a future curriculum and preparation reference but not verified in the repository when these decisions were created.

No curriculum entry is inferred from the unavailable Prep Guide.

## 3. Decision 1 — Prominent Teacher Workflow

Goal/Mission and activity availability must be a prominent Teacher Command Center workflow, not a buried Settings function.

The teacher must complete the ordered seven-step workflow defined above. The interface may reveal later steps progressively, but it must not skip required context, silently choose values, or treat browsing as confirmation.

## 4. Decision 2 — Explicit Class Context

The teacher may configure only a class they are authorized to manage. The current class and period must remain visible throughout the workflow.

Class context must not be inferred from fixture order, a route, the last visible card, or student identity. Changing classes must not carry unsaved or saved grade, Goal/Mission, or activity choices into the new class unless an approved authoritative record explicitly belongs to that class.

Unresolved or unauthorized class context fails closed.

## 5. Decision 3 — Instructional Grade Configuration

The teacher explicitly selects Grade 3, Grade 4, Grade 5, or Grade 6 as instructional configuration for the selected class.

This grade value:

- is not student identity;
- must not be inferred from age, roster, graduation year, class name, period, or fixture;
- filters only an approved curriculum catalog when one exists; and
- must have an authoritative owner before implementation.

Explicit Grade 3–6 instructional configuration is separate from the PI-000H Grade 3/4 or Grade 5/6 Activity Library assignment. Neither value may automatically create, change, infer, validate, or remove the other.

## 6. Decision 4 — Authoritative Catalog Only

Goal/Mission, activity, preparation, and work-environment facts must come from an approved authoritative catalog.

Every Goal/Mission and activity must have a stable identity and version. Display titles are labels and must not serve as identifiers. The Platform must not hardcode, invent, normalize, or derive catalog content from unverified documents.

When the catalog or required relationship cannot be verified, the workflow presents an honest non-actionable state.

## 7. Decision 5 — One or Multiple Goals/Missions

The teacher may select one or multiple approved Goals/Missions for the class.

The interface must:

- prevent duplicate stable identities;
- distinguish saved availability from unsaved edits;
- show the complete selected set;
- preserve teacher order only where an approved contract gives that order meaning; and
- never rank, recommend, or personalize choices through AI, analytics, grades, behavior, progress, or inferred readiness.

### Current Three-Choice Ceiling

PB-002J must preserve the current PB-003B and PI-001 maximum of **three primary student Start mission choices at one time**.

The system must not hide a fourth selection, rotate choices, silently truncate a selection, or expose more than three primary Start choices. Expansion requires a separately approved View All Missions experience or reconciled availability model.

The three-choice ceiling applies only to the primary **Start** choices. A separately verified **Continue** item from the authoritative student-work owner does not count toward those three Start choices and retains PB-003B Continue-first placement.

## 8. Decision 6 — Explicit Activity Availability

Selecting a Goal/Mission does not automatically make every related activity available.

The teacher explicitly selects one or multiple approved activities under each selected Goal/Mission. Activities remain grouped under their parent and retain stable identity and version information. Missing, retired, invalid, or unavailable activities are non-actionable.

Reviewing, checking, or previewing an activity is not confirmation. No activity is selected by default solely because its parent Goal/Mission was selected.

## 9. Decision 7 — Separate Ownership Contracts

Mission-level availability and activity-level availability are distinct contracts.

- PI-001 governs mission distribution within its approved boundary.
- PI-001 does not implicitly own activity-level availability.
- Activity availability requires its own authoritative owner, record meaning, teacher authority, lifecycle, version relationship, persistence, audit, removal, and student-projection decisions.

Neither contract may be inferred from the other.

## 10. Decision 8 — Preparation Review Without an Invented Gate

Before confirmation, the teacher must be able to review verified, version-aligned preparation information supplied by the approved curriculum source.

Preparation information may describe source-defined materials, tools, technology, testing, safety, or supervision needs. The Platform must not invent requirements or declare a classroom ready.

Whether preparation requires confirmation, warning acknowledgement, another safeguard, or information-only presentation remains **PENDING PRODUCT AND SAFETY DECISION**. No acknowledgement or readiness gate is approved by this document.

Teacher judgment remains authoritative within applicable safety and organizational requirements.

## 11. Decision 9 — Faithful Student Preview

Before confirmation, the teacher sees a faithful preview of the proposed student-visible set, including:

- selected Goal(s)/Mission(s);
- the separately approved current classroom focus, if present;
- explicitly selected activities;
- verified work-environment relationships;
- honest unavailable states; and
- the Missions First reminder when applicable.

The preview must not fabricate progress, readiness, popularity, difficulty, completion, recommendations, or thumbnails. Teacher-only preparation information must not appear in the student preview.

## 12. Decision 10 — Confirmation Is Atomic and Explicit

Future confirmation must create or replace one authoritative class-wide availability set atomically. Unsaved review state must never project to students.

Replacing an existing saved set requires explicit teacher confirmation. Failure must leave the previously authoritative set unchanged and provide accessible status feedback.

This behavior remains non-implementable until the applicable owners, lifecycle, persistence, idempotency, removal, and audit contracts are approved.

## 13. Decision 11 — Classroom Operating Behaviors

The product must support:

- a guided-class behavior with one emphasized Goal/Mission and teacher-selected activities; and
- an independent-progression behavior with multiple available Goals/Missions and teacher-selected activities.

Neither behavior forces an activity, infers sequence or mastery, or automatically starts work. The labels “Guided Class” and “Independent Progression” remain working copy and are not locked as final interface labels.

## 14. Decision 12 — Student Projection

Students may see only the authoritative availability set for their authorized class and verified Continue state from the student-work owner.

Student presentation must:

- preserve PB-003B Continue-first behavior;
- expose no more than three primary Start mission choices;
- distinguish one mission from multiple choices honestly;
- keep unavailable items non-actionable;
- avoid revealing teacher-only preparation notes; and
- avoid rankings, comparisons, personalization, or fabricated progress.

“YOUR MISSION: [approved title]” is permitted for one active mission. Multiple active missions require plural or choice-oriented copy; the exact wording remains deferred.

A maximum of one current classroom focus may be emphasized when supported by the approved mission contract. Emphasis must not remove other valid available choices.

## 15. Decision 13 — Honest States and Failure Behavior

The workflow must provide honest, non-actionable states for at least:

- no authorized class;
- no instructional grade selected;
- no authoritative catalog;
- no approved Goal/Mission for the context;
- no valid activity under a selected Goal/Mission;
- preparation facts unavailable or version-mismatched;
- availability cannot be verified;
- confirmation failed; and
- no student-visible choices.

Missing information must never be replaced with fixture data, stale data, inferred values, or enabled placeholder controls.

## 16. Decision 14 — Privacy, Accessibility, and Chromebook Requirements

PB-002J is class-wide only. Student-specific and small-group availability are deferred.

The experience must not publicly label, rank, compare, or expose a student’s access, choice, work, or progress. Teacher-only preparation and configuration information remains on authorized teacher surfaces.

All controls must use semantic labels, visible focus, keyboard operation, non-color-only state communication, accessible validation association, and targets of at least 44 by 44 CSS pixels. The workflow must remain usable at 1204×695 CSS pixels without horizontal scrolling and must support Chromebook keyboard and touchpad use.

## 17. Decision 15 — PB-002I and Protected-System Boundaries

PB-002I remains a session-only Today’s Mission announcement tool. It must not be reinterpreted as authoritative class configuration, Mission Distribution, activity availability, or student projection.

PB-002J must not modify or assume ownership of:

- PB-003B Mission Choice or PB-003C My STEM Work;
- student-work, evidence, or reflection records;
- Builder or Workshop internals;
- Google Sites, Drive, Forms, Slides, or Vids;
- Platform authentication, routes, sessions, or fixtures; or
- the current Classroom Pilot launcher.

## 18. Decision 16 — Classroom Pilot and Production Boundaries

### Classroom Pilot

The current approved school-start workflow remains unchanged and continues to use:

- PB-002I for one session-only teacher announcement;
- the three-control Student Dashboard launcher;
- Google Sites as the classroom curriculum presentation and navigation system; and
- teacher-managed classroom routines.

PB-002J does not authorize adding class, grade, Goal/Mission, activity, preparation, or availability controls to the current Classroom Pilot interface.

### Production / Integrated Platform

Persistent, cross-device, class-scoped configuration and student projection belong to a future production or integrated Platform implementation. They remain blocked until the applicable catalog, ownership, authority, lifecycle, persistence, synchronization, audit, privacy, accessibility, security, legal, and technology decisions are separately approved.

Browser fixtures, hardcoded catalogs, title-derived identities, hidden session values, and Google resource scraping must not substitute for those decisions.

## 19. Explicitly Deferred Decisions

The following remain unresolved and are not selected by this document:

- authoritative curriculum-catalog owner and source;
- verified Prep Guide import, normalization, and maintenance process;
- final Goal-versus-Mission taxonomy and stable identifier format;
- instructional-grade configuration owner and lifecycle;
- relationship between Grade 3–6 configuration and PI-000H Activity Libraries;
- mission-distribution owner and implementation technology;
- activity-availability owner and authoritative record contract;
- maximum activities available within each Goal/Mission;
- current classroom-focus meaning when multiple Goals/Missions are active;
- persistence, storage, synchronization, idempotency, audit, expiry, removal, restoration, and version migration;
- ordering, replacement, conflict, correction, removal, and expiration behavior;
- behavior when more than three missions are desired;
- preparation confirmation, acknowledgement, warning, and safety rules;
- catalog-change and stale-distribution behavior;
- final operating-mode labels;
- multiple-mission student heading and card copy;
- student-projection transport and refresh behavior;
- accessibility validation plan;
- district deployment and external-resource requirements;
- production routes, APIs, adapters, and providers; and
- any future relationship between PB-002I and authoritative availability.

## 20. Stop Conditions

Stop before implementation if work would require any unresolved owner or decision above, fabricated curriculum data, a fourth Start choice, inferred grade or class, browser-only authoritative state, new storage, new routes, new fixtures, Google integration, Mission Distribution beyond PI-001, student-specific assignment, Builder or Workshop changes, or reinterpretation of PB-002I.

## 21. Decision Summary

Locked:

- prominent ordered teacher workflow;
- explicit class and Grade 3–6 selection;
- separation from Activity Library assignment;
- authoritative catalog and stable identity requirements;
- one or multiple Goal/Mission selection within the three-choice ceiling;
- verified Continue work remains separate from and does not consume the three primary Start choices;
- explicit activity selection;
- separate mission and activity ownership contracts;
- verified preparation review with no approved acknowledgement gate;
- faithful preview and explicit atomic confirmation contract;
- guided and independent classroom behaviors;
- honest student projection, privacy, accessibility, and Chromebook boundaries;
- PB-002I and protected-system separation; and
- Classroom Pilot and production/integrated Platform separation.

Not locked:

- authorities, providers, technologies, records, storage, synchronization, lifecycle, safety-gate behavior, final copy, or implementation.

## 22. Approval Meaning

Approval makes these design decisions architecture authority for subsequent PB-002J documentation and inspections only.

Approval does not authorize implementation, assign accountable authorities, select catalog content, create records, resolve Mission Distribution or activity availability ownership, modify PB-002I, or alter any protected system.

## 23. Exact Next Gate

`/REVIEW` — **PB-002J Teacher Goal, Mission, and Activity Availability Design Decisions v1.0**
