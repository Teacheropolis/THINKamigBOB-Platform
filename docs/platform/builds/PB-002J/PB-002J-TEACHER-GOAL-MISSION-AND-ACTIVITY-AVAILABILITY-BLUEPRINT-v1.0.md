# PB-002J — Teacher Goal, Mission, and Activity Availability Blueprint v1.0

**Document Status:** Proposed blueprint pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only  
**Parent System:** PB-002 — Teacher Command Center  
**Student Consumer:** PB-003 Student Dashboard and PB-003B Mission Choice  
**Architecture Dependencies:** PI-000B, PI-000H, PI-001  
**Protected Systems:** PB-001; PB-002A through PB-002I; PB-003A through PB-003D; Builder; Workshop

## 1. Purpose

Define the future teacher-controlled workflow for selecting a class, selecting the instructional grade context, activating one or multiple approved Goals/Missions, and choosing which approved activities within those Goals/Missions students may see.

The intended classroom relationship is:

`Teacher chooses class → teacher chooses grade → teacher activates Goal(s)/Mission(s) → teacher makes prepared activities available → students choose only from those available activities`

This blueprint establishes product direction only. It does not create curriculum records, class assignments, Mission Distribution records, storage, synchronization, routes, fixtures, or student projection.

## 2. Controlling References

- Platform Blueprint v1.0.
- Development Standards v1.0.
- PB-002 Teacher Command Center foundations.
- PB-002I Teacher Command Center Today’s Mission Classroom Pilot Build Specification v1.0.
- PB-003 Student Dashboard foundations.
- PB-003B Mission Choice Experience Blueprint and Design Decisions v1.0.
- PI-000B Mission and Distribution Ownership Contracts.
- PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- PI-001 Mission Distribution Blueprint and Design Decisions.
- `THINKamigBOB_Activity_Templates_Grade_Goal_Prep_Guide (1).docx`, named by the project owner as the future curriculum and preparation reference.

The named Grade/Goal Prep Guide was not present in the repository or current attachment set when this blueprint was created. Therefore, this document does not reproduce, infer, summarize, normalize, or invent any Grade, Goal/Mission, activity, material, tool, or preparation entry from it. Exact catalog content remains **PENDING VERIFIED SOURCE IMPORT**.

## 3. Product Direction

The Teacher Command Center must make Goal/Mission selection a prominent classroom control rather than placing it in Settings or another administrative area.

The future workflow must support both:

- **Guided class:** the teacher activates one Goal/Mission and a bounded set of prepared activities for the whole class.
- **Independent progression:** the teacher activates multiple Goals/Missions and prepared activities so students can make meaningful choices within teacher-approved boundaries.

Teacher control protects instructional intent and classroom readiness. Student choice operates only inside the teacher-authorized availability set.

### Current Student-Choice Limit

Under the currently approved PB-003B and PI-001 contracts, a class may expose **no more than three primary student Start mission choices at one time**. Multiple active Goals/Missions are permitted only within that current three-choice ceiling. PB-002J must not silently hide a fourth choice, rotate choices, or present more than three primary Start missions until a separately approved View All Missions experience or reconciled availability model exists.

## 4. Core Design Principles

### Teacher Preparation Before Student Availability

An activity must not become student-visible merely because it exists in a curriculum catalog. The teacher must be able to review verified classroom-preparation information before making it available. Whether any readiness confirmation is required remains a pending product and safety decision.

### Choice Within Approved Boundaries

Students choose among activities the teacher has made available. The Platform must not expose unavailable activities as actionable choices or infer additional choices.

### Multiple Goals Without Hidden Ranking

The teacher may activate one or multiple Goals/Missions. The Platform must not rank, recommend, or personalize them using grades, behavior, progress, analytics, AI, or inferred readiness.

### Honest Information

The Platform must never invent a class, grade, Goal/Mission, activity, preparation state, assignment, availability state, or student-work state.

### Teacher Judgment Remains Authoritative

The Platform may present factual preparation information and validation warnings. It must not decide whether the teacher should teach a Goal/Mission or automatically activate or deactivate content.

### Student Dignity and Privacy

Availability must not label, rank, compare, embarrass, or reveal one student’s access or progress to another. This blueprint authorizes class-wide availability only; student-specific and small-group availability remain deferred.

## 5. Teacher Workflow

### Step 1 — Choose Class

The teacher selects only from classes they are authorized to manage.

The class selector must:

- clearly identify the current class and period;
- fail closed when class identity or teacher authority is unresolved;
- never infer a class from the last visible card, route, fixture order, or student identity; and
- preserve the PB-001 class-context boundary until an approved class owner replaces it.

Changing class context must not silently carry the previous class’s grade, Goal/Mission, or activity selections into the new class.

### Step 2 — Choose Grade

The teacher explicitly chooses the curriculum grade context required to filter the approved catalog.

Grade selection is instructional configuration for the chosen class. It must not:

- become student identity;
- infer an individual student’s grade;
- be derived from a class name, graduation year, roster, age, period, or fixture;
- silently assign a PI-000H Activity Library; or
- create a fallback when no grade is selected.

Explicit Grade 3, Grade 4, Grade 5, or Grade 6 instructional configuration is separate from the PI-000H Grade 3/4 and Grade 5/6 Activity Library assignment. Choosing or changing either value must not automatically create, change, infer, validate, or remove the other.

The exact relationship between the two concepts and the future Prep Guide catalog requires a separate approved catalog decision.

### Step 3 — Select Goal(s)/Mission(s)

The teacher selects one or multiple Goals/Missions from the approved catalog filtered to the chosen grade context.

Each selectable item must use a stable authoritative identity. Titles are presentation labels and must not serve as record identifiers.

The interface must:

- show the exact approved Goal/Mission title from the authoritative catalog;
- allow one or multiple selections;
- make the number and names of active selections clear;
- distinguish saved availability from unsaved edits;
- prevent duplicate selection of the same stable Goal/Mission;
- show an honest state when no catalog is connected; and
- require explicit confirmation before replacing a previously saved class availability set.

Selecting a Goal/Mission does not itself start student work, create a project, change evidence, or mark completion.

### Step 4 — Select Available Activities

After a Goal/Mission is selected, the teacher may select only activities that the authoritative catalog relates to that Goal/Mission and grade context.

The teacher may make one or multiple activities available. Activity selection must:

- remain grouped under its parent Goal/Mission;
- use stable activity identity and version information;
- preserve teacher selections when reviewing another selected Goal/Mission;
- make unavailable, retired, missing, or invalid activities non-actionable;
- provide a clear review of the complete student-visible set before confirmation; and
- never treat viewing, checking, or previewing an activity as distribution until the teacher confirms.

No activity is automatically selected when a Goal/Mission is selected.

Activity-level availability is not currently owned by PI-001 Mission Distribution. Its authoritative owner, record meaning, teacher authority, lifecycle, version relationship, persistence, audit, removal, and student projection are separately **UNRESOLVED**. PB-002J must not treat mission availability as implicit authority to expose every related activity.

### Step 5 — Review Classroom Readiness

Before confirmation, the teacher receives factual preparation information supplied by the approved curriculum source.

Preparation information may include only verified catalog facts, such as required categories of:

- robotics resources;
- electronics;
- construction kits;
- fabrication tools;
- Google classroom tools;
- craft materials;
- testing stations;
- safety or supervision considerations; and
- other source-defined preparation requirements.

This list defines allowable information categories, not actual requirements for any Goal/Mission or activity. Exact requirements must come from the verified Prep Guide or its approved successor.

Whether the future workflow requires readiness confirmation, warning acknowledgement, another safeguard, or information-only presentation is **PENDING PRODUCT AND SAFETY DECISION**. This blueprint establishes no confirmation or acknowledgement gate.

### Step 6 — Preview Student Experience

Before confirmation, the teacher sees a faithful preview of what students will see:

- active Goal(s)/Mission(s);
- teacher-emphasized current classroom focus, if separately approved;
- available activities under each Goal/Mission;
- relevant factual Builder or Workshop relationship supplied by the catalog;
- honest unavailable or empty states; and
- the fixed Missions First reminder when applicable.

The preview must not display fabricated progress, thumbnails, popularity, difficulty, recommendations, grades, rankings, or readiness claims.

### Step 7 — Confirm Availability

Confirmation creates or replaces the authoritative class-wide availability set only after the distribution owner, lifecycle, persistence, and audit contracts are approved.

Until then, this step remains a design boundary and must not be simulated as authoritative distribution using fixtures or browser-only state.

## 6. Classroom Operating Modes

### Guided-Class Mode

- One active Goal/Mission is emphasized.
- The teacher selects the prepared activities available within it.
- Students see a single clear mission context and only the approved activity choices.
- The mode does not force an activity choice or automatically launch work.

### Independent-Progression Mode

- Two or more Goals/Missions may be active.
- The teacher selects prepared activities within each.
- Students may choose among the approved Goals/Missions and activities.
- The mode does not infer sequence, mastery, readiness, or completion.

The names of these modes are working product labels and require a companion design decision before implementation.

## 7. Student Dashboard Projection

### Student Presentation

When an authoritative, current class availability projection exists, the Student Dashboard may present:

**YOUR MISSION: [approved Goal/Mission title]**

When multiple Goals/Missions are active, presentation must use a plural or choice-oriented heading rather than falsely implying that only one mission exists. Exact copy requires a companion design decision.

Students may see only:

- Goal(s)/Mission(s) currently made available to their authorized class;
- activities currently made available under those Goal(s)/Mission(s);
- factual catalog descriptions approved for student presentation;
- approved work-environment relationships; and
- verified Continue state from the authoritative student-work owner, if separately connected.

Students must not see:

- teacher-only preparation notes;
- resource shortages, safety acknowledgements, or classroom-readiness records;
- inactive or unauthorized activities as enabled controls;
- another class’s selections;
- distribution actor, audit, or administration details; or
- inferred grade, readiness, ability, or progress.

### PB-003B Relationship

PB-003B remains the student Mission Choice presentation consumer. PB-002J does not replace PB-003B ownership or authorize new student routes.

The default student order remains:

1. verified Continue work, when available;
2. teacher-emphasized current Goal/Mission, when authoritatively designated;
3. other teacher-available Goal/Mission choices;
4. available activities within the selected Goal/Mission; and
5. honest empty or unavailable information.

The existing PB-003B limit of up to three primary Start mission cards remains controlling unless separately reconciled. A multiple-Goal design exceeding that limit requires a separately approved View All or equivalent bounded experience.

## 8. Honest States

The teacher experience requires honest states for:

- no authorized class;
- no grade chosen;
- curriculum catalog unavailable;
- no Goal/Mission available for the chosen grade;
- no Goal/Mission selected;
- Goal/Mission selected but no activity selected;
- preparation information unavailable;
- preparation not confirmed;
- unsaved changes;
- conflicting or stale distribution state; and
- save, replacement, correction, or removal failure.

The student experience requires honest states for:

- no current class availability projection;
- teacher has not made a Goal/Mission available;
- Goal/Mission available but no activity currently available;
- unavailable, stale, revoked, or unsupported content;
- destination unavailable; and
- authoritative work state unavailable.

No empty state may fabricate a recommended activity or quietly expose a universal fallback.

## 9. Activity-Preparation Safeguards

- Preparation facts must be version-aligned with the selected activity.
- Missing preparation facts must be identified as unavailable, not interpreted as “no preparation required.”
- A catalog change after teacher confirmation must produce a stale or review-required state according to an approved lifecycle rule.
- The Platform must not claim that materials, devices, permissions, network access, or adult supervision are present without an authoritative source. Whether explicit teacher confirmation may establish any of those facts remains pending.
- Safety-critical requirements must not be reduced to decorative tips.
- Student presentation must never expose teacher preparation gaps.
- Automated procurement, inventory, kit checkout, scheduling, or room assignment is excluded.

## 10. Ownership Boundaries

### Curriculum Catalog Owner — Unresolved

Must authoritatively own:

- grade-context meaning;
- stable Goal/Mission identity and version;
- stable activity identity and version;
- Goal/Mission-to-activity relationships;
- approved teacher and student presentation copy;
- work-environment relationships; and
- verified preparation requirements.

The Prep Guide may be a reference source, but this blueprint does not declare a DOCX file, Google resource, Builder, Workshop, teacher, or Platform fixture to be the authoritative catalog owner.

### Class Context Owner — Existing Boundary Preserved

Must own teacher authorization for the selected class. PB-002J may consume only an approved class context; it must not create or infer class membership.

### Grade Configuration Owner — Unresolved

Must own the explicit class instructional grade context, including creation, change, correction, expiration, and audit meaning. Grade configuration must remain distinct from student identity.

### Mission Distribution Owner — Unresolved

Must own the teacher-authorized relationship among class, Goal/Mission availability, optional current classroom focus, ordering, actor, and lifecycle state under PI-001.

### Activity Availability Owner — Unresolved

Must separately own the teacher-authorized relationship among class, parent Goal/Mission, stable activity and version, factual availability, actor, ordering if applicable, lifecycle state, and student projection. This owner may ultimately be coordinated with Mission Distribution, but no shared owner or record is selected by this blueprint.

### Student Projection Consumer

PB-003/PB-003B consumes the minimum current availability projection. It must not own or mutate distribution state.

### Student Work Owner — Protected

The authoritative project or mission-work system retains Continue, Start, work identity, save, restoration, progress, and completion ownership. Availability must not fabricate work.

### Builder and Workshop — Protected

Builder and Workshop remain independent work-environment owners. PB-002J may present an approved catalog relationship but must not modify their internals, routing, project formats, persistence, or authorization.

## 11. Mission Distribution Boundary

PB-002J is a product-experience consumer of future PI-001 Mission Distribution. It does not implement or waive PI-001.

PI-001 governs mission-level availability within its approved boundary. It does not currently establish activity-level availability ownership. PB-002J therefore also depends on a separately approved activity-availability ownership, lifecycle, and projection contract.

Implementation requires, at minimum:

- approved curriculum catalog ownership and versioning;
- approved distribution ownership;
- approved activity-availability ownership and lifecycle;
- teacher authority for the selected class;
- approved grade-configuration meaning and lifecycle;
- stable Goal/Mission and activity identities;
- current-class-focus rules;
- multiple-selection ordering and limit decisions;
- atomic save, replacement, correction, removal, and idempotency rules;
- persistence and synchronization decisions;
- audit and retention decisions;
- privacy, security, accessibility, and legal review as applicable;
- student projection contract;
- conflict, stale-state, and offline behavior;
- functional destination contracts; and
- separate implementation authorization.

## 12. PB-002I Boundary

PB-002I remains the classroom-pilot, session-only Today’s Mission announcement tool.

PB-002J must not silently reinterpret PB-002I state as:

- authoritative Goal/Mission identity;
- grade configuration;
- activity availability;
- Mission Distribution;
- student assignment; or
- cross-device classroom configuration.

Future reconciliation may decide whether PB-002I becomes a presentation summary of authoritative PB-002J state, remains an independent announcement, or is retired. Until that decision, PB-002I behavior and storage remain unchanged and separate.

## 13. Classroom-Pilot and Production Boundaries

### Classroom Pilot

The current approved school-start workflow continues to use:

- PB-002I for one session-only teacher announcement;
- the three-control Student Dashboard launcher;
- Google Sites as the classroom curriculum presentation/navigation system; and
- teacher-managed classroom routines.

This blueprint does not authorize adding grade, Goal/Mission, or activity menus to the current pilot UI.

### Production / Integrated Platform

Future production implementation may provide persistent, cross-device, class-scoped configuration and student projection only after the ownership and technology prerequisites are resolved.

No browser fixture, hardcoded catalog, title-derived identity, hidden session value, or Google page scraping may be used as a substitute.

## 14. Accessibility and Chromebook Requirements

- All selectors must have programmatic labels and clear instructions.
- Multi-selection must not rely on color alone.
- Selected, unavailable, stale, and unsaved states must be announced accessibly.
- Keyboard users must be able to complete the workflow without drag-and-drop.
- Touch targets must be at least 44 by 44 CSS pixels.
- Goal/Mission and activity lists must remain readable at 1204×695 CSS pixels and DPR 1.25.
- The workflow must avoid horizontal scrolling at the required Chromebook viewport.
- Long verified titles must wrap without clipping or obscuring controls.
- Preparation warnings must use plain language and an accessible association with the affected activity.
- Reduced-motion preferences must be respected; no animation is required.

## 15. Privacy, Security, and Governance Requirements

- Teacher controls must remain on authenticated, teacher-authorized surfaces.
- Students receive only the minimum class availability projection.
- Grade configuration must not become a new student profile field by implication.
- No student-specific or small-group availability is authorized by this blueprint.
- No analytics, behavioral scoring, AI recommendation, hidden personalization, or surveillance is permitted.
- External-resource links require approved safe-link and opener behavior.
- Google resources remain external unless a separately approved integration contract exists.
- Product governance, district deployment governance, and teacher classroom configuration remain separated under PI-000I and PI-000I-A.

## 16. Explicit Exclusions

This blueprint does not define or authorize:

- implementation;
- a curriculum catalog model or import;
- invented Goal/Mission or activity titles;
- a database, backend, API, provider, cache, or synchronization mechanism;
- Mission Distribution implementation;
- Activity Registry implementation;
- student-specific or small-group assignments;
- grade inference;
- automated activity selection;
- AI recommendations;
- analytics or progress tracking;
- grading, ranking, mastery, or behavior scoring;
- procurement, inventory, kit checkout, or room scheduling;
- Google API or Google Workspace integration;
- cloud persistence;
- new authentication, routes, fixtures, or session state;
- Builder or Workshop changes;
- evidence or reflection ownership changes; or
- replacement of the current classroom-pilot Google Sites workflow.

## 17. Deferred Decisions

1. Authoritative curriculum catalog owner and source format.
2. Verified import and reconciliation of the named Grade/Goal Prep Guide.
3. Exact Grade 3–6 taxonomy and relationship to Grade 3/4 and Grade 5/6 pilot libraries.
4. Stable Goal/Mission and activity identifiers and version rules.
5. Whether “Goal” and “Mission” are synonyms, hierarchical concepts, or distinct entities.
6. Class instructional grade owner and lifecycle.
7. Mission Distribution owner and teacher authority.
8. Maximum simultaneously active Goals/Missions within the current ceiling of three primary student Start choices; any higher limit requires separate PB-003B/PI-001 reconciliation.
9. Maximum activities available within each Goal/Mission.
10. Current classroom focus meaning when multiple Goals/Missions are active.
11. Student presentation for more than three primary Start choices.
12. Ordering, replacement, conflict, idempotency, correction, removal, and expiration.
13. Persistence, synchronization, offline, and cross-device technology.
14. Whether preparation information requires confirmation, warning acknowledgement, another safeguard, or information-only presentation.
15. Catalog-change and stale-distribution behavior.
16. Student projection transport and freshness.
17. PB-002I future relationship to authoritative PB-002J state.
18. Teacher and student interface copy.
19. Accessibility validation plan.
20. District deployment and external-resource requirements.

## 18. Readiness and Stop Conditions

**Documentation readiness:** The blueprint is ready for review after confirming that it introduces no invented curriculum content and preserves the approved ownership boundaries.

**Implementation readiness:** `BLOCKED / NOT AUTHORIZED`.

Stop before implementation if any work would require:

- inventing or scraping curriculum records;
- inferring grade or class assignment;
- using titles as identity;
- treating PB-002I session data as authoritative distribution;
- creating storage, routes, fixtures, APIs, or synchronization without approval;
- bypassing PI-000H or PI-001 ownership decisions;
- exposing teacher preparation information to students;
- changing Builder or Workshop; or
- modifying files before a reviewed design decision document, build specification, repository inspection, and explicit build authorization exist.

## 19. Blueprint Acceptance Criteria

This blueprint is complete when review confirms that it:

- establishes the seven-step teacher workflow;
- supports one or multiple active Goals/Missions;
- prominently preserves the current maximum of three primary student Start mission choices;
- preserves teacher control of student-visible activities;
- separates Mission Distribution ownership from unresolved activity-level availability ownership;
- supports guided-class and independent-progression use;
- includes preparation-awareness safeguards without inventing requirements;
- defines the student projection and “YOUR MISSION” boundary;
- preserves PB-003B and the student-work owner;
- keeps PB-002I separate;
- preserves PI-000H and PI-001 stop conditions;
- keeps explicit Grade 3–6 instructional configuration separate from Grade 3/4 and Grade 5/6 Activity Library assignment;
- distinguishes classroom-pilot and production scope;
- assigns no unverified authority or technology; and
- authorizes no implementation.

## 20. Exact Next Gate

`/REVIEW` — **PB-002J Teacher Goal, Mission, and Activity Availability Blueprint v1.0**
