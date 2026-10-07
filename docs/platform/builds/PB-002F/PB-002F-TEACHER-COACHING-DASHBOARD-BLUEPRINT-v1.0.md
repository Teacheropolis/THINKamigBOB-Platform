# PB-002F — Teacher Coaching Dashboard

## Design Blueprint v1.0

Status: Proposed blueprint pending review and approval  
Parent Experience: PB-002 — Teacher Classroom Command Center  
Implementation Status: Blocked pending authoritative owners, assigned decision authority, approved data purposes, and lifecycle decisions

## Document Boundary

This blueprint defines the intended classroom coaching experience for helping a teacher notice meaningful engineering activity, decide where personal attention may be useful, recognize growth, and organize the next classroom move.

It defines human-readable workflow concepts only. It does not implement a dashboard, create student records, select data sources, calculate categories, rank students, predict risk, infer learning, award credits, monitor behavior, or create analytics. It does not select owners, providers, APIs, models, storage, routes, integrations, or persistence.

All current PI-000 authority assignments remain `UNASSIGNED`. No implementation planning may treat this blueprint as an authority assignment or a substitute for approved ownership, privacy, lifecycle, and authorization contracts.

## Controlling References

- Platform Blueprint v1.0
- Development Standards v1.0
- PB-002 Teacher Classroom Command Center architecture
- PB-002E Smart Board Presentation System architecture
- PB-003 Student Dashboard foundations
- Approved PI-000 ownership, identity, privacy, evidence, persistence, and governance architecture

If this blueprint conflicts with a controlling document, work stops for reconciliation.

## Purpose

The Teacher Coaching Dashboard should reduce the time required to understand a classroom without converting engineering into grades, scores, rankings, surveillance, or automated judgment.

It should help the teacher answer:

1. Who needs me first?
2. Who made meaningful progress?
3. Who should receive recognition?
4. Who still needs reflection?
5. Where should I walk next?

The dashboard supports teacher judgment. It does not replace it.

## Coaching Philosophy

### Coach the Work, Not the Student's Worth

The dashboard may organize verified classroom facts and teacher-authored observations. It must not label a student's ability, motivation, character, future potential, or value.

### Attention Is Not a Grade

A need for teacher attention may reflect a question, a tool issue, an ambitious design, a collaboration need, missing context, or a routine check-in. It must never be presented as failure, misconduct, low ability, or a score.

### Growth Over Completion

Meaningful engineering progress may include planning, testing, revising, explaining, documenting, persisting, helping appropriately, or learning from a result. Completion alone is not the coaching model.

### Teacher Judgment Remains Primary

Future approved systems may present factual signals. Only the teacher decides whether to visit, coach, recognize, note, or take no action. No category automatically triggers a consequence, message, grade, credit, public display, or student restriction.

### Quiet by Default

Ordinary classroom activity should not create teacher work. The dashboard should emphasize clear exceptions and teacher-selected priorities without demanding constant data entry or acknowledgment.

### Student Continuity

Students continue authorized work regardless of teacher review, recognition, reflection status, evidence visibility, credits, coaching notes, or dashboard availability.

## Dashboard Hierarchy

The conceptual reading order is:

1. Current class and classroom context.
2. Classroom Snapshot.
3. Meaningful Progress and Recognition Opportunities.
4. Who Needs Me First?
5. Reflection Check.
6. Evidence Awareness.
7. Wins, Challenges, and Next Steps.
8. Teacher Notes.
9. Secondary Engineering Credits visibility.

The hierarchy must not become a leaderboard, dense spreadsheet, multi-column wall of alerts, or analytics console. The most urgent verified teacher-owned need may receive visual priority, but students must never be ranked against one another.

Recognition appears before ordinary coaching or intervention whenever practical. An explicit student request, safety need, accessibility need, or teacher-selected urgent priority may receive immediate prominence. This exception preserves teacher judgment and does not authorize automated urgency detection, scoring, ranking, prediction, prioritization, or intervention.

## Classroom Snapshot

The Classroom Snapshot is a concise teacher-only orientation layer for the currently authorized classroom.

It may eventually present approved factual summaries such as:

- Current classroom label and period.
- Number of currently authorized classroom members.
- Teacher-confirmed requests or priorities awaiting attention.
- Verified reflection-status availability.
- Verified evidence-status availability.
- Honest source-unavailable or stale states.

It must not present:

- Average student scores or grades.
- Productivity, time-on-task, engagement, behavior, or compliance metrics.
- Red/yellow/green public status.
- Predicted risk or automated intervention priority.
- Comparative student performance.
- Claims based on missing, stale, inferred, or development-fixture data.

Counts are permitted conceptually only when an authoritative owner, approved purpose, freshness rule, privacy boundary, and exact aggregation meaning exist. A count is not automatically anonymous or safe.

## Student Coaching Categories

Coaching categories are teacher-facing workflow concepts, not permanent student attributes. A student may appear in more than one category when separately approved factual conditions support it. Category order does not rank students.

### Teacher Check-In Requested

Purpose: Help the teacher notice an explicit, approved request for help or a teacher-authored reminder.

Required boundary:

- The request or reminder has an authoritative owner.
- It is not inferred from inactivity, clicks, time, errors, or missing work.
- It does not reveal a private support classification publicly.
- It expires or resolves through an approved lifecycle.

### Teacher Follow-Up

Purpose: Hold a teacher-selected coaching intention such as revisiting a design question or checking a classroom process.

Required boundary:

- Teacher-authored only unless a separate source is approved.
- Not a behavior mark, grade, diagnosis, or disciplinary record.
- Visibility, retention, correction, and deletion require separate decisions.

### Meaningful Progress to Notice

Purpose: Present verified factual activity that the teacher may choose to discuss or recognize.

Possible future facts require separately approved owners and may include a verified revision, evidence connection, reflection submission status, or completed classroom responsibility. Existence of activity does not establish quality, effort, mastery, or praise.

### Reflection Check Needed

Purpose: Help a teacher see whether the approved reflection source can verify a submission status.

Required boundary:

- The What I Learned Today Google Form remains the only reflection source.
- The Platform does not create a second reflection editor.
- Unknown or unavailable is not treated as missing.
- Reflection text is not summarized, scored, classified, or exposed without separate authority.

### Evidence to Review

Purpose: Indicate that an approved source can verify evidence availability for an authorized student and project relationship.

Required boundary:

- Evidence presence is not proof of learning, quality, completion, reflection, or teacher review.
- Opening or ignoring evidence creates no student-facing judgment.
- Evidence ownership and permission remain with approved PI-000 owners and sources.

### No Current Coaching Signal

Purpose: Provide an honest neutral state when no approved coaching item is available.

This state must not mean the student is finished, successful, inactive, independent, or unimportant.

## Answering the Five Teacher Questions

### 1. Who Needs Me First?

The dashboard may organize teacher-confirmed priorities and explicit approved requests. It must not calculate a hidden urgency score or rank students using activity, inactivity, grades, evidence quantity, reading behavior, or inferred struggle.

When several items exist, ordering requires a separately approved rule. Until then, use a neutral, non-ranking order or teacher-selected order and explain it honestly.

### 2. Who Made Meaningful Progress?

The dashboard may present verified factual changes from approved owners. The teacher determines whether those facts represent meaningful progress. The Platform must not infer quality or learning from event quantity.

### 3. Who Should Receive Recognition?

The dashboard may present a private recognition opportunity based on verified facts or a teacher-authored observation. The teacher decides whether recognition is appropriate and what it means.

No candidate is automatically praised, awarded, published, or displayed. Lack of a candidate does not diminish a student's work.

### 4. Who Still Needs Reflection?

The dashboard may show only approved reflection status from the single authorized source. Unknown, delayed, permission-lost, unavailable, and not-submitted states remain distinct.

Reflection status cannot block work, become a grade, or be displayed publicly.

### 5. Where Should I Walk Next?

The dashboard may translate teacher-selected priorities and approved explicit requests into a private classroom movement list. It must not track a teacher's physical location, a student's location, proximity, time spent, or compliance.

The teacher may ignore, reorder, clear, or replace the list when a future workflow is separately approved.

## Recognition Opportunities

Recognition is a teacher decision supported by factual context.

A future recognition opportunity may include:

- The verified fact that prompted consideration.
- A private teacher-facing reminder to notice or ask about the work.
- An explicit distinction between candidate, teacher-confirmed recognition, and public presentation.

Recognition must not:

- Be generated from popularity, speed, quantity, grades, or comparative performance.
- Imply teacher praise before the teacher confirms it.
- Automatically award Engineering Credits, badges, or Hall of Fame placement.
- Automatically appear on Student Display, Smart Board, Teacher Feed, or a student dashboard.
- Reveal private coaching needs or reflection status.

Public recognition requires a separate approved workflow, class-safe content, teacher confirmation, student privacy review, removal behavior, and audience control.

## Wins, Challenges, and Next Steps Relationship

PB-002A reserves Wins, Blockers, and Next Steps areas. This blueprint uses the more coaching-oriented term `Challenges` conceptually without authorizing a label change to the existing implementation.

### Wins

- Teacher-authored or based on a separately approved verified fact.
- Describe specific engineering growth or classroom contribution.
- Never fabricated or automatically presented as personal teacher praise.

### Challenges

- Describe a current design, process, tool, material, collaboration, or understanding obstacle in dignified language.
- Never become a student label, deficit category, behavior mark, or public list.
- `Blocker` and `Challenge` terminology requires a separate product wording decision before implementation.

### Next Steps

- Teacher-authored or derived only from an approved workflow with teacher confirmation.
- Suggest a coaching or classroom action without forcing student progression.
- Never restrict Student Home, Mission Choice, Builder, Workshop, or existing work.

Wins, Challenges, and Next Steps do not automatically become Teacher Feed entries, student messages, reports, grades, or Smart Board content.

## Reflection Monitoring

- The What I Learned Today Google Form remains the sole reflection source.
- The dashboard does not create, duplicate, edit, summarize, score, or classify reflection responses.
- A future view may show a minimal authorized status only.
- Submitted, not submitted, unavailable, stale, permission-lost, and unknown must remain distinct.
- Teachers must not be misled into believing that an unavailable source means a student failed to reflect.
- Reflection status remains private and cannot block student work.
- Account, consent, classroom mapping, retention, correction, and source-adapter behavior remain unresolved.

## Evidence Awareness

The dashboard may eventually show minimal authorized evidence projections from approved PI-000 owners.

Allowed conceptual facts may include:

- Evidence is available.
- Evidence status is unavailable or stale.
- Source permission was lost.
- A teacher review state exists only if a separate review owner is approved.

The dashboard must not infer:

- Quality, mastery, progress, effort, completion, or authenticity from evidence presence or quantity.
- Teacher review from opening or viewing evidence.
- Student ownership from filename, URL, title, screenshot, account possession, or classroom membership alone.

Builder, Workshop, Google Slides, and Google Vids remain protected behind separately approved evidence adapters. Their current runtime or files are not coaching-data owners.

## Engineering Credits Visibility

Engineering Credits remain secondary and cannot become a grade, rank, incentive score, behavior score, or proxy for engineering ability.

A future dashboard may display a factual credit balance or pending teacher-confirmation item only when:

- An authoritative credit owner exists.
- Earning, awarding, correction, revocation, retention, and audit rules are approved.
- The teacher is authorized for the current classroom.
- Student privacy and non-comparison requirements are satisfied.

PB-002F does not create credits, calculate credits, award credits, edit balances, or define credit economics. Credits never determine who receives teacher attention or who may continue working.

## Teacher Notes Concept

Teacher Notes are a possible private coaching aid, distinct from the existing class-wide Teacher Memo.

A future notes system would require decisions for:

- Note owner and subject relationship.
- Classroom and teacher authorization.
- Purpose and prohibited content.
- Visibility and co-teacher access.
- Retention, correction, deletion, restoration, export, and audit.
- Student or guardian access where required.
- School/district policy and legal requirements.
- Shared-device and sign-out protection.

This blueprint creates no note editor, storage, student record, history, search, tagging, or reporting. Teacher Notes must not flow to Student Display, Smart Board, student dashboards, public recognition, or another teacher without explicit authorization.

## Smart Board Relationship

The Teacher Coaching Dashboard is private. PB-002E Student Display remains an intentionally separate presentation system.

Smart Board or Student Display must never automatically receive:

- Student names connected to support needs.
- Coaching categories or visit order.
- Reflection status or content.
- Evidence-review state.
- Teacher Notes.
- Credit balances or pending awards.
- Recognition candidates.
- Wins, Challenges, or Next Steps that identify private student information.

Only separately approved, teacher-selected, class-safe presentation content may cross to Student Display. Existing timer, class message, presentation modes, refresh restoration, focus return, and sign-out cleanup remain unchanged.

## Engineering Flashback Relationship

Engineering Flashback is a future conceptual presentation boundary only. It has no authorized PB-002F owner, data contract, route, lifecycle, integration, or runtime behavior.

Engineering Flashback must not receive coaching categories, Teacher Notes, reflection content or status, evidence-review state, Credit information, recognition candidates, visit order, private Wins, Challenges, or Next Steps automatically.

Any future use requires teacher confirmation, class-safe content, privacy review, authoritative ownership, approved lifecycle and removal rules, and separate approval. This blueprint does not define or authorize implementation, integration, data flow, routes, storage, providers, models, or adapters for Engineering Flashback.

## Engineering Headlines Relationship

Engineering Headlines is a future conceptual presentation boundary only. It has no authorized PB-002F owner, data contract, route, lifecycle, integration, or runtime behavior.

Engineering Headlines must not receive coaching categories, Teacher Notes, reflection content or status, evidence-review state, Credit information, recognition candidates, visit order, private Wins, Challenges, or Next Steps automatically. A recognition opportunity is not a headline and cannot become one without a separate teacher confirmation.

Any future use requires teacher confirmation, class-safe content, privacy review, authoritative ownership, approved lifecycle, correction, and removal rules, and separate approval. This blueprint does not define or authorize implementation, integration, data flow, routes, storage, providers, models, or adapters for Engineering Headlines.

## Student Privacy Boundaries

- The dashboard is teacher-only and requires current classroom authorization.
- Teachers may access only students in classrooms they are currently authorized to manage.
- Student-specific coaching information is never class-wide or public by default.
- Students never see a support classification, priority order, teacher visit order, private note, recognition-candidate state, or comparison.
- No leaderboards, rankings, percentiles, risk scores, performance colors, or comparative charts.
- No activity surveillance, time-on-task tracking, clickstream monitoring, location tracking, device monitoring, keystroke monitoring, or behavioral inference.
- No inference of ability, motivation, effort, attention, emotion, disability, reading level, home circumstances, or future success.
- No public identification of students needing support.
- No cross-student exposure through counts, filters, URLs, logs, screenshots, exports, or stale browser state.
- Sign-out and authorization loss must clear protected local presentation without deleting authoritative records.
- Refresh must revalidate authority rather than trust cached classroom or student visibility.

Data purpose, minimum fields, audience, retention, correction, deletion, export, audit, and school/district requirements must be approved before any student-specific implementation.

## Accessibility Requirements

- Use semantic page titles, headings, regions, lists, controls, and status messages.
- Preserve a logical teacher reading and focus order that follows dashboard priority without implying student rank.
- Provide visible keyboard focus and full keyboard operation.
- Use text labels with icons; never depend on color, position, shape, or icon alone.
- Do not use red/yellow/green status without equivalent neutral wording; public traffic-light support labels remain prohibited.
- Support browser zoom, text resizing, and text wrapping without clipping, overlap, truncation, or horizontal scrolling.
- Meet readable contrast requirements.
- Provide large Chromebook-friendly controls when controls are separately authorized.
- Respect reduced-motion preferences and avoid flashing, pulsing, or alarm-like animation.
- Announce meaningful status changes without repetitive interruption.
- Preserve calm, specific, recoverable error language.
- Do not require hover, drag-only behavior, fine pointer precision, or timed response.
- Ensure dense information can be understood in a linear reading order.

## Chromebook Requirements

Any future implementation requires physical Chromebook validation for:

- Authorized teacher login, class context, refresh, and sign-out.
- Common Chromebook viewport sizes without horizontal scrolling.
- Browser zoom and text enlargement.
- Long student, class, category, and empty-state labels wrapping safely.
- Keyboard and touchpad navigation.
- Visible focus and logical tab order.
- Minimum approved touch-target size for every control.
- Filters or lists, if separately authorized, without focus traps or hidden content.
- Reduced-motion behavior.
- Loading, empty, stale, unavailable, conflict, and authorization-loss states.
- No stale student or classroom information after sign-out or role change.
- No teacher-only content on Student Display.
- Existing PB-001, PB-002, and PB-003 regression behavior.
- Builder and Workshop smoke tests.

Desktop validation cannot replace physical Chromebook validation.

## Honest Empty and Unavailable States

Every area must distinguish absence from inability to verify.

Approved conceptual states include:

- `No teacher-selected coaching priorities yet.`
- `No verified recognition opportunities are available right now.`
- `Reflection status cannot be checked right now.`
- `Evidence status cannot be checked right now.`
- `Engineering Credits are not connected.`
- `Teacher Notes are not available in this build.`

These phrases are conceptual and require product/content approval before implementation.

Empty states must not say or imply:

- Every student is finished or fine.
- A student failed to participate, reflect, or make progress.
- Evidence or work is missing or deleted when its source is unavailable.
- No teacher action is needed.
- The Platform has checked a source that is not connected.

Unavailable, unknown, stale, permission-lost, empty, and not-submitted remain distinct states.

## Explicit Exclusions

PB-002F does not authorize:

- Application or test changes.
- Analytics engines, dashboards, reports, exports, or data warehouses.
- Automated scoring, ranking, prioritization, triage, prediction, risk detection, recommendations, or intervention logic.
- AI, machine learning, generated summaries, sentiment analysis, or inferred coaching advice.
- Grades, mastery, rubrics, performance levels, behavior marks, or compliance tracking.
- Hidden personalization, private profiling, or undisclosed adaptation.
- Student tracking, time-on-task, location, activity surveillance, clickstreams, or device monitoring.
- Mission Distribution.
- Production student, teacher, classroom, mission, project, evidence, reflection, credit, recognition, or note data.
- New fixtures that simulate coaching outcomes.
- Teacher Notes implementation or persistence.
- Reflection form duplication, content analysis, scoring, or summary.
- Evidence ingestion, synchronization, copying, deletion, quality analysis, or review tracking.
- Engineering Credit calculation, award, balance editing, ranking, or economy design.
- Wins, Challenges, Next Steps, Teacher Feed, recognition, Hall of Fame, or public-display automation.
- Smart Board or Student Display changes.
- Builder, Workshop, Google, or external-source integration.
- New backend, database, API, provider, route, storage, session key, dependency, data model, adapter, or identity format.
- Assignment of any product, privacy, curriculum, school-operations, security, legal/district, technical, Builder, Workshop, evidence-source, or adapter authority.

## Future Expansion Points

Subject to separate inspection, authority assignment, ownership decisions, design decisions, specifications, and approval, future work may consider:

- Teacher-authored classroom coaching priorities.
- Explicit student help-request presentation.
- Verified factual growth events.
- Private recognition-candidate workflow.
- Reflection-status projection from the approved source.
- Evidence-awareness projection from approved owners.
- Teacher-confirmed Wins, Challenges, and Next Steps.
- Private Teacher Notes.
- Engineering Credits visibility.
- Class-safe teacher-selected Smart Board handoff.
- Co-teacher and substitute access.
- Classroom rollover and historical continuity.

This list does not authorize or prioritize implementation.

## Unresolved Design Decisions

- Accountable product, privacy, school-operations, security, curriculum, legal/district, technical, Builder, Workshop, and source-system authorities.
- Authoritative teacher, classroom, membership, support-request, reflection-status, evidence, credit, recognition, and note owners.
- Exact coaching category names and teacher-facing language.
- Whether teacher-selected ordering is stored and for how long.
- Whether any factual aggregate is necessary and privacy-safe.
- Meaning and lifecycle of teacher-confirmed requests, follow-ups, Wins, Challenges, and Next Steps.
- Recognition confirmation, correction, removal, and audience behavior.
- Reflection account, consent, mapping, permission, freshness, and retention behavior.
- Evidence projection, permission, freshness, review separation, and adapter behavior.
- Credit lifecycle, correction, audit, and visibility.
- Teacher Notes purpose, access, retention, correction, deletion, restoration, export, and audit.
- Engineering Flashback and Engineering Headlines ownership, purpose, teacher confirmation, class-safe content, privacy, lifecycle, correction, removal, and approval behavior.
- Co-teacher, substitute, transfer, rollover, classroom closure, and recovery behavior.
- Exact routes, data contracts, storage, concurrency, idempotency, offline, recovery, audit, and implementation technologies.

Every unresolved item remains blocked. No current fixture, session key, DOM element, existing placeholder, Builder function, Workshop state, Google link, filename, or conversation establishes an owner or decision.

## Protected Systems

PB-002F must preserve:

- PB-001 authentication shells, roles, routing, authorization guards, refresh restoration, and sign-out cleanup.
- PB-002A Teacher Command Center hierarchy and existing placeholder meanings.
- PB-002B timer and timer-adjustment behavior.
- PB-002D Teacher Memo behavior and privacy boundary.
- PB-002E Student Display, presentation modes, refresh restoration, focus return, and sign-out cleanup.
- PB-003 Student Dashboard privacy, continuity, and presentation boundaries.
- The What I Learned Today Google Form as the single reflection source.
- Approved PI-000 ownership, identity, authorization, privacy, governance, persistence, recovery, and adapter contracts.
- Builder and Workshop runtime, data, navigation, persistence, assets, and canonical content.
- Existing routes, session keys, fixtures, dependencies, application code, tests, and assets.

## Implementation Stop Conditions

Stop before implementation planning when:

- A required authority is `UNASSIGNED` or unavailable.
- An authoritative identity, classroom, membership, coaching, reflection, evidence, credit, recognition, or note owner is missing.
- Data purpose, minimum fields, audience, freshness, retention, deletion, correction, restoration, or audit is unresolved.
- A category would require scoring, ranking, prediction, inference, surveillance, or automated judgment.
- Missing or unavailable data would be treated as a negative student state.
- Teacher access cannot be revalidated for the current classroom.
- Student-specific information could cross to another student, public surface, Smart Board, or unauthorized teacher.
- Teacher Notes or another sensitive record would lack approved lifecycle and school/district policy.
- A current fixture, placeholder, session state, browser state, or presentation component would become authoritative.
- Builder, Workshop, Google, or another source would require direct coupling.
- A provider, API, model, route, storage system, dependency, adapter, or data model would need to be invented.
- Implementation would modify a protected system without separate authorization.

When blocked, report the exact authority, owner, product decision, privacy decision, lifecycle rule, inspection, and approval required.

## Blueprint Acceptance Criteria

PB-002F is ready for review when it:

- Defines coaching as teacher-supported judgment rather than automated evaluation.
- Answers the five teacher questions conceptually without ranking or prediction.
- Establishes a clear teacher-first hierarchy.
- Separates factual source awareness from learning or quality claims.
- Preserves reflection, evidence, credit, note, recognition, and Smart Board boundaries.
- Protects student dignity and privacy.
- Defines accessibility, Chromebook, empty-state, exclusion, and stop-condition requirements.
- Preserves PI-000 blockers and assigns no authority or owner.
- Selects no implementation architecture or technology.
- Authorizes no application or test change.

## Next Required Gate

After blueprint review and explicit approval, create PB-002F design decisions only if separately authorized. No inspection for implementation, build specification, or implementation begins automatically.
