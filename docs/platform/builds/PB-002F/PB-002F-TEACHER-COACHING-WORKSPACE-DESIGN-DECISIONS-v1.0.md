# PB-002F — Teacher Coaching Workspace

## Design Decisions v1.0

Status: Proposed design decisions pending review and approval  
Controlling Blueprint: PB-002F — Teacher Coaching Dashboard Blueprint v1.0  
Implementation Status: Blocked and not authorized

## Document Boundary

These decisions use `workspace` to describe the teacher's coaching experience. They do not rename, replace, duplicate, or claim approval of the existing PB-002F Teacher Coaching Dashboard Blueprint.

This document locks experience principles and presentation relationships only. It does not create data, owners, authority, automation, storage, integrations, routes, analytics, or implementation permission. All PI-000 ownership, privacy, lifecycle, persistence, recovery, and authority blockers remain controlling. Every unassigned authority remains `UNASSIGNED`.

## Controlling References

- PB-002F Teacher Coaching Dashboard Blueprint v1.0.
- Platform Blueprint v1.0.
- Development Standards v1.0.
- PB-002 Teacher Classroom Command Center architecture.
- PB-002E Smart Board Presentation System architecture.
- PB-003 Student Dashboard foundations.
- Approved PI-000 architecture and governance documentation.

If these decisions conflict with a controlling reference, work stops for reconciliation.

## Permanent Design Principles

### Coaching Before Data

The workspace exists to improve teacher coaching, not maximize visible information. Every presented fact must have an approved purpose and help a teacher make a human classroom decision.

### Recognition Before Intervention

When practical and safe, verified opportunities to notice growth appear before coaching opportunities. This ordering promotes an asset-based classroom view without hiding an explicit request or urgent teacher-confirmed need.

Recognition-first ordering never delays a safety response, an explicit student request, an accessibility need, or a teacher-selected priority. It does not imply that recognition is more important than support.

### Teacher Attention Is Precious

Every element must justify the attention it asks the teacher to spend. Ordinary activity stays quiet. Repeated notices, dense metrics, decorative alerts, and acknowledgment requirements are prohibited.

### Teacher Remains in Control

The Platform may eventually present authorized factual context. The teacher alone decides whether to notice, visit, coach, recognize, record a note, or take no action. A suggestion never makes a classroom decision or creates a consequence.

### Student Dignity

The workspace never publicly labels, ranks, embarrasses, compares, diagnoses, or assigns worth to students. A coaching category describes a temporary teacher workflow, not a student identity.

### Honest Information

The workspace never invents signals, recognition, evidence, reflection status, credits, progress, urgency, or praise. Unknown, empty, stale, unavailable, permission-lost, and not-submitted states remain distinct.

## Five Required Teacher Questions

The workspace must always make the following questions understandable without converting them into scores or rankings:

1. Who needs me first?
2. Who made meaningful progress?
3. Who deserves recognition?
4. Who still needs reflection?
5. Where should I walk next?

`Deserves recognition` means a private opportunity for teacher judgment. It does not establish merit, award recognition, compare students, or imply that students not shown are less deserving.

## Workspace Hierarchy

The required conceptual reading order is:

1. Current authorized class and classroom context.
2. Classroom Snapshot.
3. Meaningful Progress and Recognition Opportunities.
4. Teacher-confirmed or explicit coaching needs.
5. Reflection Monitoring.
6. Evidence Awareness.
7. Wins, Challenges, and Next Steps.
8. Teacher Notes concept.
9. Secondary Engineering Credits visibility.
10. Separately authorized presentation relationships.

An explicit request, safety concern, accessibility need, or teacher-selected priority may receive immediate prominence. This exception preserves teacher judgment and does not authorize automated urgency detection.

The workspace must not become a leaderboard, spreadsheet of student performance, alert wall, reporting console, or analytics dashboard.

## Recognition-First Ordering

- Verified growth facts and teacher-authored recognition candidates appear before ordinary coaching opportunities whenever practical.
- The workspace distinguishes a factual event, a recognition opportunity, teacher-confirmed recognition, and public presentation.
- Only the teacher may confirm recognition or choose its wording and audience.
- Recognition never automatically creates Credits, a headline, a Flashback, a Smart Board item, a Teacher Feed entry, or a student-visible message.
- The absence of a recognition opportunity makes no claim about a student's work.
- Recognition ordering must not obscure a student-initiated request or teacher-marked immediate priority.

## Coaching Categories

Approved conceptual categories are:

- `Recognition Opportunity`: a verified fact or teacher-authored observation the teacher may choose to recognize.
- `Teacher Check-In Requested`: an explicit authorized request or teacher-authored reminder, never inferred from behavior.
- `Teacher Follow-Up`: a temporary teacher-selected coaching intention.
- `Reflection Check`: a minimal status from the single approved reflection source when that source is authoritative and available.
- `Evidence Awareness`: minimal factual evidence availability from an approved evidence projection.
- `No Current Coaching Signal`: a neutral state that makes no claim about completion, success, independence, or need.

Categories are temporary workflow concepts. They do not score, diagnose, rank, predict, restrict, reward, or permanently characterize a student. A student may appear in more than one category only when separate approved facts support each appearance.

Ordering within a category remains unresolved. Until separately approved, no hidden urgency, risk, priority, or performance order may be used.

## Classroom Snapshot Behavior

The Classroom Snapshot is a concise teacher-only orientation for the current authorized classroom. It may eventually show approved factual context whose owner, purpose, freshness, and aggregation meaning are established.

It must:

- remain brief and subordinate to coaching action;
- identify stale, unavailable, unknown, and permission-lost sources honestly;
- avoid duplicating the detailed student workspace;
- avoid treating a count as anonymous by default; and
- preserve current classroom authorization across refresh and sign-out boundaries.

It must not show grades, averages, performance colors, time-on-task, engagement, behavior, compliance, risk, predictions, comparative performance, or claims derived from missing data.

## Reflection Monitoring Rules

- The What I Learned Today Google Form remains the sole reflection source unless separately changed by approved architecture.
- PB-002F creates no reflection editor, copy, score, classification, summary, or content analysis.
- A future workspace may show only an authorized minimal status.
- Submitted, not submitted, unknown, stale, unavailable, and permission-lost remain distinct.
- Source unavailability never becomes `not submitted`.
- Reflection status is private, cannot block student work, and cannot become a grade, recognition criterion, Credit rule, or public display.
- Account, consent, classroom mapping, adapter ownership, retention, correction, and deletion remain unresolved.

## Evidence Awareness Boundaries

- Evidence records, source artifacts, connections, and teacher review remain separately owned under PI-000.
- PB-002F may eventually receive only an approved minimal projection.
- Evidence existence does not prove learning, quality, effort, completion, authenticity, progress, or teacher review.
- Opening evidence does not create a review decision.
- Missing permission or an unavailable source does not mean evidence is absent or deleted.
- Builder, Workshop, Google Slides, and Google Vids remain protected behind separately approved adapters.
- PB-002F does not ingest, synchronize, copy, edit, delete, classify, score, or summarize evidence.

## Engineering Credits Visibility Rules

- Engineering Credits are secondary context and never determine attention order.
- Credits are not grades, ranks, behavior points, ability measures, recognition substitutes, or access controls.
- Visibility requires an authoritative Credit owner and approved awarding, correction, revocation, retention, audit, and privacy rules.
- PB-002F does not create, calculate, award, edit, revoke, or define Credits.
- A pending Credit item cannot imply teacher approval or student achievement before an authorized teacher decision.

## Teacher Notes Boundaries

Teacher Notes are a possible private coaching aid and remain distinct from the PB-002D class-wide Teacher Memo.

Before any implementation, separate approval is required for purpose, owner, subject relationship, authorized viewers, co-teacher access, prohibited content, retention, correction, deletion, restoration, export, audit, student or guardian access, school/district policy, and shared-device protection.

Teacher Notes must never automatically flow to students, Student Display, Smart Board, Engineering Flashback, Engineering Headlines, recognition, reports, another teacher, or an external system. These decisions create no editor, history, search, tags, storage, export, or student record.

## Smart Board Relationship

The coaching workspace is private and teacher-only. PB-002E Student Display remains a separate class-safe presentation system.

No student names tied to support, coaching categories, visit order, reflection status, evidence-review state, Credits, Teacher Notes, recognition candidates, or private Wins, Challenges, and Next Steps may cross automatically to Student Display.

Any future handoff requires teacher selection, class-safe content, explicit audience control, removal behavior, privacy review, and separate authorization. Existing timer, class message, presentation modes, refresh restoration, focus return, and sign-out cleanup remain unchanged.

## Engineering Flashback Relationship

Engineering Flashback has no authorized PB-002F owner, data contract, route, lifecycle, or runtime behavior.

Conceptually, a future separately approved Flashback may present a teacher-selected, class-safe retrospective about engineering growth. It must not be generated from private coaching categories, Teacher Notes, reflection content, evidence quantity, Credits, rankings, or inferred progress. No item crosses from PB-002F automatically.

This relationship is a future boundary only. PB-002F does not define Flashback content, timing, storage, presentation, selection logic, or implementation.

## Engineering Headlines Relationship

Engineering Headlines has no authorized PB-002F owner, data contract, route, lifecycle, or runtime behavior.

Conceptually, a future separately approved Headlines surface may present teacher-confirmed, class-safe recognition. A recognition opportunity is not a headline. Publication requires a distinct teacher confirmation and approved audience, privacy, correction, removal, and lifecycle rules.

Headlines must not expose coaching needs, reflection status, Teacher Notes, evidence-review state, Credits, private comparisons, or unverified claims. PB-002F does not define or implement Headlines.

## Student Privacy Boundaries

- Access is teacher-only and limited to the teacher's currently authorized classroom.
- Student-specific coaching information is private by default.
- No support label, priority, visit order, note, candidate state, or comparison appears to students or public audiences.
- No rankings, leaderboards, percentiles, risk scores, performance colors, or comparative charts.
- No activity, clickstream, location, device, keystroke, time-on-task, behavior, emotion, ability, motivation, disability, reading-level, home-circumstance, or future-success surveillance or inference.
- No cross-student exposure through lists, counts, filters, URLs, logs, screenshots, exports, browser restoration, or public presentation.
- Refresh revalidates authority. Sign-out and authorization loss clear protected local presentation without deleting authoritative records.
- Data purpose, minimum fields, audience, freshness, retention, correction, deletion, restoration, export, audit, and school/district requirements require separate approval.

## Honest Empty and Unavailable States

Every area must distinguish absence from inability to verify. Conceptual messages include:

- `No teacher-selected coaching priorities yet.`
- `No verified recognition opportunities are available right now.`
- `Reflection status cannot be checked right now.`
- `Evidence status cannot be checked right now.`
- `Engineering Credits are not connected.`
- `Teacher Notes are not available in this build.`
- `Engineering Flashback is not available.`
- `Engineering Headlines are not available.`

Exact language requires later content approval. No state may imply all students are finished, a student failed to work or reflect, evidence was deleted, the teacher has nothing to do, or an unconnected source was checked.

## Accessibility Requirements

- Semantic title, headings, regions, lists, controls, and status messages.
- Logical reading and focus order matching workspace hierarchy without implying student rank.
- Visible keyboard focus and full keyboard operation.
- Text labels with icons; never color, position, shape, sound, or icon alone.
- Neutral textual state descriptions instead of traffic-light-only status.
- Browser zoom, text resizing, reflow, and wrapping without clipping, overlap, truncation, or horizontal scrolling.
- Readable contrast and approved Chromebook-sized targets for any future controls.
- Reduced-motion support with no flashing, pulsing, alarm animation, or attention competition.
- Status announcements that are meaningful and non-repetitive.
- Calm, specific, recoverable error language.
- No hover-only, drag-only, fine-pointer, timed-response, or mouse-only requirement.
- Dense information must retain a coherent linear reading order.

## Chromebook Requirements

Any later implementation requires physical Chromebook validation for:

- authorized teacher entry, classroom context, refresh, role protection, authorization loss, and sign-out;
- common Chromebook viewports without horizontal scrolling;
- browser zoom, enlarged text, reflow, and long-label wrapping;
- keyboard and touchpad operation, visible focus, and logical tab order;
- approved minimum touch-target size;
- reduced-motion behavior;
- loading, empty, stale, unavailable, permission-lost, conflict, and unknown states;
- no stale classroom or student information after refresh, role change, or sign-out;
- no private workspace information on Student Display;
- PB-001 through PB-003 regression behavior; and
- Builder and Workshop smoke tests.

Desktop validation does not replace physical Chromebook validation.

## Future Automation Boundaries

No automation is authorized. Any future proposal must begin with a separate inspection and must preserve these boundaries:

- Automation may organize only approved factual records from authoritative owners.
- It may not score, rank, predict, diagnose, infer need, infer progress, infer recognition, or decide an intervention.
- It may not generate teacher praise, Credits, notes, headlines, Flashbacks, public content, or student restrictions.
- It may not convert missing, stale, unavailable, or permission-lost data into a student judgment.
- Every suggested action must identify its factual basis and remain dismissible, correctable, and subject to teacher confirmation.
- No automation may monitor student or teacher behavior, optimize attention through hidden criteria, or create a support profile.
- Approval would require assigned authorities, authoritative owners, explicit purpose, data minimization, lifecycle rules, privacy review, failure behavior, accessibility review, and separate specification and build gates.

These boundaries do not approve an automation system or imply that one is necessary.

## Explicit Exclusions

PB-002F does not define or authorize:

- analytics engines, reporting systems, exports, or data warehouses;
- AI recommendations, generative summaries, machine learning, sentiment analysis, or predictive models;
- automated interventions, prioritization, triage, recognition, praise, or classroom decisions;
- grading, mastery, rubrics, performance levels, rankings, leaderboards, or behavior scoring;
- hidden personalization, profiles, surveillance, tracking, or inferred support needs;
- Mission Distribution;
- backend or durable persistence;
- authority-dependent governance, owner selection, or authority assignment;
- production student, teacher, classroom, mission, project, evidence, reflection, Credit, recognition, or note data;
- Teacher Notes, Engineering Flashback, Engineering Headlines, Teacher Feed, Hall of Fame, or Smart Board implementation;
- Builder, Workshop, Google, or external-source integration;
- a provider, API, model, identity format, data model, route, storage system, session key, synchronization mechanism, dependency, or adapter;
- application or test changes.

## Unresolved Design Decisions

- The controlling PB-002F Teacher Coaching Dashboard Blueprint v1.0 is approved architecture authority. These PB-002F Teacher Coaching Workspace Design Decisions v1.0 remain proposed pending review and approval. Blueprint approval does not authorize implementation or resolve any PI-000 blocker.
- Assignment of every required product, privacy, curriculum, school-operations, security, legal/district, technical, Builder, Workshop, evidence-source, and adapter authority.
- Authoritative owners for identity, classroom membership, requests, coaching workflow, reflection status, evidence, Credits, recognition, notes, Flashback, and Headlines.
- Exact approved category labels, content language, and neutral order within categories.
- Meaning and lifecycle of requests, follow-ups, recognition, Wins, Challenges, and Next Steps.
- Whether any aggregate is necessary and privacy-safe.
- Reflection source mapping, account, consent, freshness, permissions, retention, correction, and adapter behavior.
- Evidence projection, permissions, freshness, teacher-review separation, and adapter behavior.
- Credit ownership, lifecycle, correction, revocation, retention, audit, and visibility.
- Teacher Notes purpose, access, policy, retention, correction, deletion, restoration, export, and audit.
- Flashback and Headlines ownership, content, audience, teacher confirmation, lifecycle, correction, removal, and presentation boundaries.
- Co-teacher, substitute, transfer, rollover, classroom closure, offline, conflict, recovery, and unknown-outcome behavior.
- Exact routes, data contracts, persistence, concurrency, idempotency, recovery, audit, and implementation technology.

Every unresolved decision remains blocked. This document assigns no authority and selects no implementation approach.

## Protected Systems

Preserve PB-001 through PB-003, PB-002E Student Display, existing Read to BOB behavior, approved PI-000 architecture, Builder, Workshop, reflection-source boundaries, routes, sessions, fixtures, dependencies, application code, tests, and assets.

No current placeholder, fixture, session key, DOM element, file, function, commit, conversation, or technical control becomes authoritative because of these decisions.

## Implementation Stop Conditions

Implementation planning and implementation remain blocked when:

- the controlling blueprint or these decisions lack required approval;
- any required authority remains `UNASSIGNED`;
- any authoritative owner, data purpose, minimum field set, audience, freshness, lifecycle, correction, deletion, restoration, audit, or authorization rule is missing;
- a category or ordering would require scoring, ranking, inference, prediction, surveillance, or automation;
- unavailable information would become a negative student state;
- teacher classroom authorization cannot be revalidated;
- private information could cross students, teachers, classrooms, Smart Board, Flashback, Headlines, or external systems;
- Teacher Notes or another sensitive record lacks school/district and lifecycle approval;
- a fixture, browser state, placeholder, Builder, Workshop, Google, or another source would be treated as the owner;
- a provider, API, model, route, storage system, dependency, adapter, identity format, data model, or synchronization mechanism must be invented; or
- a protected system would change without separate authorization.

## Approval Meaning

Approval of these design decisions would authorize only the next separately requested documentation or read-only inspection gate. It would not approve implementation, build planning, automation, data collection, owner or authority assignment, technology selection, storage, integrations, application changes, tests, staging, committing, tagging, or pushing.

## Next Required Gate

The next gate is a read-only review of these design decisions against the controlling blueprint and references. No later stage begins automatically.
