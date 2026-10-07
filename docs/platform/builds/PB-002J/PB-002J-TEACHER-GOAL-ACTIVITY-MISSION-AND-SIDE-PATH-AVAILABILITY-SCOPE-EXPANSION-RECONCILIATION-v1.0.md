# PB-002J — Teacher Goal, Activity Mission, and Side Path Availability Scope Expansion Reconciliation v1.0

**Document Status:** Proposed reconciliation pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent System:** PB-002 — Teacher Command Center  
**Student Consumers:** PB-003 Student Dashboard and PB-003B Mission Choice  
**Architecture Dependencies:** PI-000B, PI-000H, PI-001  
**Protected Systems:** PB-001; PB-002A through PB-002I; PB-003A through PB-003D; Builder; Workshop

## 1. Purpose

Reconcile PB-002J so an authorized teacher may control Goal, Activity Mission, Side Path topic, and Side Path activity availability for:

- an entire authorized class; and
- one or more explicitly selected students within that class.

The intended future workflow is:

`Choose class → choose instructional grade → choose Goals → choose Activity Missions → choose Side Paths → choose class or selected students → review effective availability → confirm`

This document defines product and ownership boundaries only. It does not create curriculum records, assignments, student overrides, storage, synchronization, routes, fixtures, or student projection.

## 2. Controlling References

- PB-002J Teacher Goal, Mission, and Activity Availability Blueprint v1.0 — approved final reconciliation.
- PB-002J Teacher Goal, Mission, and Activity Availability Design Decisions v1.0 — approved final reconciliation.
- PB-002J Teacher Goal, Mission, and Activity Availability Build Specification v1.0 and its inspection reconciliation.
- PB-002I Teacher Command Center Today’s Mission Classroom Pilot Build Specification v1.0.
- PB-003 Student Dashboard foundations.
- PB-003B Mission Choice Experience Blueprint and Design Decisions v1.0.
- PI-000B Mission and Distribution Ownership Contracts.
- PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- PI-001 Mission Distribution Blueprint and Design Decisions.
- `THINKamigBOB_Activity_Templates_Grade_Goal_Prep_Guide (1).docx`, identified by the project owner as a curriculum and preparation reference.

The named Grade/Goal Prep Guide is not present in the repository or current attachment set. This reconciliation therefore does not reproduce, infer, normalize, or invent any Goal, Activity Mission, Side Path topic, Side Path activity, material, tool, or preparation entry. Exact catalog content remains **PENDING VERIFIED SOURCE IMPORT**.

## 3. Scope Change

This reconciliation supersedes only the earlier PB-002J statements that limit availability to an entire class and defer selected-student configuration.

PB-002J now supports the future product direction of:

- class-wide availability;
- selected-student availability;
- explicit selected-student additions;
- explicit selected-student removals; and
- an effective-availability preview before confirmation.

It does not supersede:

- the requirement for authoritative catalogs and stable identities;
- the separation of mission distribution from activity-level availability;
- the current ceiling of three primary Start choices;
- Continue-current-work protection;
- PB-002I’s session-only announcement boundary;
- privacy, accessibility, audit, and student-dignity requirements; or
- any implementation stop condition caused by unresolved ownership, lifecycle, persistence, projection, or technology decisions.

### PI-001 Recipient-Scope Dependency

Selected-student availability in this reconciliation records an intended future PB-002J capability only. It does not supersede PI-001 v1.0, which authorizes class-wide Mission Distribution and defers student-specific distribution.

Any selected-student distribution of a Goal or Activity Mission requires a separately approved PI-001 recipient-scope reconciliation. That reconciliation must resolve, at minimum, privacy, roster-change behavior, teacher authority, recipient visibility, lifecycle, audit, and removal behavior before implementation may proceed.

## 4. Curriculum Taxonomy

The future authoritative catalog must distinguish these concepts without relying on display titles as identity.

### Goal

A grade-context curriculum objective or organizing outcome. A Goal groups related Activity Missions. Whether Goal and Mission remain distinct first-class entities in the authoritative model requires the catalog owner’s explicit decision.

### Activity Mission

A bounded student-startable learning experience related to one authoritative Goal. It has its own stable identity, version, approved presentation content, preparation facts, and work-environment relationships.

### Side Path Topic

An approved thematic grouping for optional or alternative learning choices. A topic is an organizer, not automatically a student-startable activity.

### Side Path Activity

A bounded student-startable activity related to one authoritative Side Path topic. It has its own stable identity, version, approved presentation content, and preparation facts.

Catalog relationships must be explicit. The Platform must not infer relationships from titles, document position, filenames, links, grade labels, or visual grouping.

## 5. Grade 3–6 Configuration

The teacher explicitly chooses Grade 3, Grade 4, Grade 5, or Grade 6 as the instructional catalog context for the configuration being edited.

This value:

- filters an approved curriculum catalog;
- is not student identity;
- is not inferred from age, roster, graduation year, class name, period, or fixtures;
- remains separate from PI-000H Grade 3/4 and Grade 5/6 Activity Library assignment; and
- must have an approved owner and lifecycle before implementation.

### PI-000H Class-Level Boundary

PI-000H remains a class-level Activity Library ownership and projection contract. Selected-student PB-002J configuration does not extend, amend, or supersede PI-000H and must not be stored in or inferred from its class Activity Library assignment.

Selected-student availability requires a separately approved owner, lifecycle, persistence, authorization, and projection contract. If a future design proposes using PI-000H for that purpose, PI-000H must first be separately reconciled and approved.

### Cross-Grade Catalog Decision

Cross-grade availability is a proposed future capability only. It is not authorized by this reconciliation and must never be inferred, automatically selected, presented as confirmable, or persisted.

Before confirmation, the interface must identify:

- the selected student or class;
- the student’s ordinary class instructional context, when authoritatively available;
- the explicitly selected catalog grade; and
- that the choice crosses the ordinary class context.

Whether cross-grade selection is permitted at all, and whether a warning acknowledgement, curriculum/safety review, additional concurrence, documented rationale, or prohibition applies, remains **PENDING PRODUCT, CURRICULUM/SAFETY, SCHOOL-OPERATIONS, AND ACCESSIBILITY DECISION**. Until those decisions are approved, cross-grade confirmation must fail closed.

## 6. Authoritative Catalog Requirements

The future catalog must authoritatively provide, at minimum:

- Grade 3, Grade 4, Grade 5, and Grade 6 contexts;
- stable Goal identity and version;
- stable Activity Mission identity and version;
- Goal-to-Activity-Mission relationships;
- stable Side Path topic identity and version;
- stable Side Path activity identity and version;
- Side-Path-topic-to-activity relationships;
- approved teacher and student presentation copy;
- preparation, materials, technology, safety, and supervision facts when applicable;
- Builder, Workshop, Google, or other destination relationships when approved; and
- active, unavailable, retired, replaced, and version-mismatch states.

The catalog must not be constructed from unverified titles, fixture arrays, scraped Google pages, or PB-002I values.

## 7. Teacher Configuration Workflow

### Step 1 — Choose Class

The teacher selects only a class they are authorized to manage. Class and period remain visible throughout configuration.

### Step 2 — Choose Recipient Scope

The teacher explicitly chooses one of:

- **Entire Class**; or
- **Selected Students**.

No student is preselected. Selected-student mode must show the exact selected count and allow review of the selected names on the private teacher surface.

### Step 3 — Choose Instructional Grade Context

The teacher explicitly selects Grade 3, 4, 5, or 6 for the catalog being browsed. No grade is inferred.

### Step 4 — Choose Goal(s)

The teacher selects one or multiple approved Goals. Selecting a Goal does not automatically select all related Activity Missions.

### Step 5 — Choose Activity Mission(s)

The teacher explicitly selects available Activity Missions under their authoritative parent Goal.

### Step 6 — Choose Side Path Topic(s) and Activity Choice(s)

The teacher explicitly selects Side Path topics and then one or more activities within those topics. Selecting a topic does not automatically expose every related activity.

### Step 7 — Review Preparation

The teacher reviews only verified, version-aligned preparation facts. Missing facts are shown as unavailable, never as “no preparation required.” Preparation confirmation and warning acknowledgement remain pending product and safety decisions.

### Step 8 — Review Effective Availability

The teacher sees the exact result for the class or each selected student, including inherited class choices, individual additions, individual removals, and protected Continue work.

### Step 9 — Confirm

Confirmation must be explicit and atomic. Browsing, checking, previewing, or changing a filter does not publish availability.

## 8. Class and Individual Availability Model

### Decision — Individual Settings Supplement Class Settings

Individual settings use a layered model rather than silently replacing the whole class configuration.

For each student:

`Effective availability = class availability + explicit student additions − explicit student removals`

This decision provides:

- an understandable class baseline;
- targeted enrichment or support without duplicating the entire class record;
- explicit, reviewable differences; and
- safe restoration to the class baseline by removing the individual override.

### Override Rules

- Inherit is the default for every student.
- An individual addition must name a stable catalog item and version.
- An individual removal must name the inherited item being suppressed.
- No override may be created from display text alone.
- A teacher must review the effective result before confirmation.
- Removing an override returns the student to the current class setting; it does not recreate an older class state.
- Class changes must recompute effective availability without erasing the historical override record.
- Conflicting, stale, retired, or version-mismatched overrides fail closed and require teacher review.
- An individual override must never change the class-wide record or another student’s availability.

The authoritative record shape and calculation service remain unresolved and must be separately approved.

## 9. Active Work and Removal Decision

Removing Start availability does not delete, hide, reassign, or corrupt verified work already started by the student.

When an Activity Mission or Side Path activity is removed:

- it is no longer offered as a new Start choice;
- verified active work remains eligible for **Continue** under the authoritative student-work owner;
- the removal does not mark work complete, abandoned, graded, or deleted;
- the teacher receives a warning that active work remains separately available to continue; and
- any exceptional rule that must revoke Continue access for safety, legal, or resource reasons requires a separately authorized stop-work contract and must not be inferred from availability removal.

Continue identity, restoration, completion, and deletion remain owned by the authoritative student-work system.

## 10. Three-Primary-Start-Choice Decision

The current maximum of three primary student Start choices is calculated **per student after class settings and individual overrides are resolved**.

- Verified Continue work does not consume a primary Start position.
- No fourth Start choice may be silently hidden, rotated, truncated, or deferred without explanation.
- Confirmation must fail before publishing an effective set that would expose more than three primary Start choices.
- A selected-student addition cannot bypass the ceiling.
- A class change that would push an overridden student above the ceiling must be reported before confirmation.

The three-choice ceiling governs primary Mission Start choices. Activity Missions presented as primary actions that begin new work count toward that ceiling.

Side Paths remain secondary choices under PB-003B. They must not displace, imitate, or bypass the three primary Mission Start choices. A Side Path activity counts toward the three-choice ceiling only if a future separately approved design elevates it into a primary Start position. A separately approved Side Path browsing or “View All” experience may later define its own bounded presentation and choice limit; that limit remains deferred.

## 11. Assignment Replacement and Removal

### Class-Wide Change

Replacing a saved class set requires confirmation showing:

- items being added;
- items being removed;
- students with affected individual overrides;
- students whose effective Start set would become invalid; and
- active Continue work that remains protected.

Failure must leave the previous authoritative class set unchanged.

### Selected-Student Change

The teacher must be able to:

- add an explicit override;
- remove a class-inherited choice for the selected student;
- remove an override and return to inheritance; and
- review the exact effective result before confirmation.

Bulk selected-student updates must be atomic for the explicitly selected recipient set. Partial silent success is prohibited.

### Removal

Removal requires clear confirmation and an impact summary. Destructive default actions are prohibited. Removal affects availability only and must not delete catalog items, projects, evidence, or reflection records.

## 12. Student Dashboard Projection

The Student Dashboard consumes only the minimum effective projection for the authenticated student.

The projection may include:

- authoritative recipient identity reference;
- current effective Goal choices;
- current effective Activity Mission choices;
- current effective Side Path choices;
- approved presentation copy and destination contracts;
- availability version and freshness state; and
- verified Continue reference from the student-work owner.

The student must not receive:

- another student’s availability;
- the class-versus-override calculation;
- teacher rationale or private notes;
- preparation warnings intended for teachers;
- audit actor details;
- rankings, labels, or comparisons; or
- inferred grade, readiness, ability, or progress.

The Student Dashboard must honestly distinguish:

- Continue existing work;
- start an Activity Mission;
- explore an available Side Path; and
- no currently available choice.

PB-003B remains the presentation consumer. PB-002J does not create routes or transfer ownership to PB-003B.

## 13. Honest States

Teacher-facing honest states must cover:

- no authorized class;
- no authorized students;
- no recipient selected;
- no instructional grade selected;
- authoritative catalog unavailable;
- no Goal, Activity Mission, Side Path topic, or Side Path activity available;
- cross-grade selection unresolved;
- preparation facts unavailable;
- stale class record or override;
- effective choice conflict;
- more than three primary Start choices;
- active Continue work affected by removal;
- unsaved changes;
- confirmation failure; and
- projection freshness unavailable.

Student-facing states must never reveal that the student has an exception or override. They state only what is currently available, unavailable, or awaiting teacher preparation.

## 14. Ownership Requirements

No accountable authority is assigned by this reconciliation.

### Curriculum Catalog Owner — Unresolved

Must own the Grade, Goal, Activity Mission, Side Path topic, Side Path activity, relationship, identity, version, presentation, preparation, retirement, and replacement facts.

### Class Assignment Owner — Unresolved

Must own the teacher-authorized class availability record, actor, recipients, lifecycle, correction, removal, expiry, and audit meaning.

### Individual Assignment/Override Owner — Unresolved

Must own selected-student additions and removals, their relationship to the class baseline, actor, effective dates, lifecycle, conflict handling, correction, removal, expiry, audit, and privacy meaning.

### Mission Distribution Owner — Unresolved

Must own mission-level distribution under PI-001. This does not automatically own Activity Mission or Side Path availability.

### Activity Availability Owner — Unresolved

Must own Activity Mission and Side Path activity availability unless a later approved contract explicitly assigns those responsibilities elsewhere.

### Student Projection Owner — Unresolved

Must own calculation, freshness, transport, authorization, and failure behavior for the minimum effective per-student projection.

### Student Work Owner — Protected

Continues to own Start/Continue work identity, persistence, restoration, progress, completion, and deletion.

## 15. Persistence, Restoration, and Audit Requirements

The future authoritative system must support:

- durable class configuration across sessions and devices;
- durable selected-student overrides;
- atomic class and selected-student confirmation;
- idempotent repeated submissions;
- optimistic or equivalent conflict detection;
- version-aligned catalog references;
- correction and removal without historical rewriting;
- effective and expiration dates when approved;
- recovery from partial transport failure;
- traceable actor, time, recipient scope, before state, and after state;
- reason or rationale only if separately approved and necessary;
- retention and deletion rules; and
- projection freshness and stale-state handling.

Browser `sessionStorage`, `localStorage`, fixtures, PB-002I state, URL parameters, and Google resource scraping are prohibited as authoritative persistence.

The storage provider, model, API, synchronization mechanism, offline behavior, retention period, and audit technology remain **UNRESOLVED**.

## 16. Privacy and Student Dignity

- Selected-student configuration is private to authorized teacher and operational surfaces.
- The UI must never publicly mark a student as receiving different, easier, harder, remedial, advanced, or exceptional work.
- Students must not see other students’ settings.
- Student availability must not be used as a grade, behavior score, ability label, or ranking.
- Only the minimum information required to calculate and display effective availability may be processed.
- Audit views must follow least-privilege access.
- Bulk actions must clearly identify recipient scope and prevent accidental whole-class changes.
- Privacy, security, accessibility, legal, and district deployment requirements remain applicable at their proper governance layers.

## 17. Accessibility and Chromebook Requirements

- Class and selected-student modes must be distinguishable without color alone.
- Student selection must support keyboard operation and accessible selected counts.
- Nested Goal, Activity Mission, Side Path topic, and activity lists must use semantic headings, groups, labels, and state descriptions.
- Every actionable target must be at least 44 by 44 CSS pixels.
- Focus order must follow the teacher workflow.
- Validation must identify the affected recipient and item without exposing private details on public displays.
- Confirmation dialogs must default focus to the safe non-destructive action.
- The workflow must remain usable at 1204×695 CSS pixels and DPR 1.25 without horizontal scrolling.
- Long lists require an approved accessible search, filter, pagination, or progressive-disclosure decision before implementation.

## 18. Teacher Preparation Safeguards

- Preparation facts must come from the authoritative versioned catalog.
- Missing preparation facts are unavailable, not “none required.”
- The teacher must be warned before making an item available when required facts are stale or unresolved.
- Safety-critical preparation must not be reduced to decorative guidance.
- A selected-student override must not bypass a class-level safety or resource restriction.
- Automated readiness decisions, recommendations, procurement, inventory, and surveillance are excluded.

Whether preparation acknowledgement is required remains **PENDING PRODUCT AND SAFETY DECISION**.

## 19. PB-002I Boundary

PB-002I remains a session-only Today’s Mission communication tool.

PB-002J must not read, migrate, reinterpret, or extend PB-002I values as:

- Goal identity;
- Activity Mission identity;
- Side Path identity;
- class availability;
- individual availability;
- Mission Distribution;
- durable assignment state; or
- Student Dashboard projection.

PB-002I may be reconciled with authoritative PB-002J state only through a future separately approved contract. Its current behavior remains protected.

## 20. Classroom Pilot and Production Boundaries

### Current Classroom Pilot

The current Classroom Pilot remains unchanged:

- PB-002I provides a session-only announcement;
- Google Sites remains the approved classroom curriculum presentation/navigation destination;
- the Student Dashboard retains its existing three-control launcher; and
- teacher-managed routines remain in place.

This reconciliation does not authorize class, grade, Goal, Activity Mission, Side Path, or selected-student configuration in the pilot UI.

### Production / Integrated Platform

Persistent class and selected-student availability belongs to a future integrated Platform implementation after all owners, lifecycle rules, catalog facts, technologies, privacy controls, and projection contracts are approved.

## 21. Explicit Exclusions

This reconciliation does not authorize:

- implementation;
- invented curriculum content;
- hardcoded catalog records;
- Mission Distribution implementation;
- Activity Registry implementation;
- production storage, APIs, synchronization, or authentication changes;
- inferred grade or student grouping;
- AI recommendations;
- analytics, grading, ranking, mastery, behavior scoring, or hidden personalization;
- automatic activity assignment;
- changes to PB-002I;
- changes to PB-003B or PB-003C ownership;
- changes to Builder or Workshop;
- Google APIs, ingestion, or synchronization; or
- new routes, sessions, or fixtures.

## 22. Required Decisions Status

1. **Individual settings:** Resolved at product-contract level as layered supplements to class settings using explicit additions and removals. Record implementation remains unresolved.
2. **Cross-grade catalogs:** Proposed only and not authorized. Confirmation fails closed until product, curriculum/safety, school-operations, and accessibility decisions approve whether and how cross-grade selection may operate.
3. **Active work after removal:** Resolved. New Start availability ends; verified Continue work remains protected by the student-work owner.
4. **Three-choice limit:** Resolved. Applied per student after overrides; Continue does not count; any primary new-work action counts.
5. **Curriculum catalog owner:** Unresolved and unassigned.
6. **Class and individual assignment owners:** Unresolved and unassigned.
7. **Persistence location and technology:** Unresolved and unselected.
8. **Student Dashboard projection transport and owner:** Unresolved and unassigned.

## 23. Remaining Deferred Decisions

- verified Prep Guide import and reconciliation;
- final Goal-versus-Mission taxonomy;
- stable identifier and version formats;
- authoritative owners listed in Section 14;
- Side Path browsing and presentation beyond the primary Start ceiling;
- maximum Goals, Activity Missions, Side Paths, and activities selectable before effective projection;
- cross-grade approval and warning behavior;
- preparation acknowledgement and safety behavior;
- storage, APIs, synchronization, offline, conflict, retention, and deletion technology;
- assignment effective-date and expiration semantics;
- audit retention and access;
- bulk selected-student failure and recovery details;
- student projection transport, refresh, and stale-state behavior;
- final teacher and student interface copy;
- accessibility validation for long catalogs; and
- future PB-002I relationship.

## 24. Implementation Readiness and Stop Conditions

**Implementation Status:** `BLOCKED / NOT AUTHORIZED`.

Stop before implementation if work would require:

- invented or scraped curriculum content;
- an inferred class, grade, recipient, relationship, or override;
- title-derived identity;
- use of PB-002I or browser state as authoritative configuration;
- more than three effective primary Start choices;
- deletion or hiding of verified Continue work;
- an unapproved owner, record, persistence, projection, or technology;
- a new route, fixture, authentication behavior, storage system, API, or synchronization mechanism;
- Google data access;
- Builder or Workshop modification; or
- exposure of selected-student differences to other students.

## 25. Acceptance Criteria

This reconciliation is complete when review confirms that it:

- defines Grade 3–6, Goal, Activity Mission, Side Path topic, and Side Path activity boundaries;
- supports class-wide and selected-student configuration;
- defines the layered override calculation;
- preserves active Continue work after Start removal;
- applies the three-choice limit to each student’s effective projection;
- prevents Side Paths from bypassing that limit;
- preserves authoritative catalog and stable-identity requirements;
- defines persistence, audit, privacy, dignity, accessibility, and Chromebook requirements;
- preserves PB-002I and all protected systems;
- invents no curriculum content;
- assigns no owner or technology; and
- authorizes no implementation.

## 26. Exact Next Gate

`/REVIEW` — **PB-002J Teacher Goal, Activity Mission, and Side Path Availability Scope Expansion Reconciliation v1.0**
