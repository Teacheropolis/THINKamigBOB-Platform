# PB-002F-FIX-01 — Prototype Scope Separation

## Specification v1.0

Status: Proposed specification pending review and approval  
Parent Build: PB-002F — Teacher Coaching Workspace  
Implementation Status: Blocked and not authorized

## Purpose

Separate the static presentation concept for a future Teacher Coaching Workspace prototype from deferred production coaching data, decisions, automation, and integrations.

This specification clarifies scope only. It does not weaken, supersede, amend, replace, or bypass the approved PB-002F Teacher Coaching Workspace Build Specification v1.0, its PI-000 authority requirements, its implementation stop conditions, or any required approval gate.

Calling a surface a `prototype` does not exempt it from product, privacy, accessibility, content, technical-architecture, Chromebook, protected-system, or authority review. Scope separation alone does not authorize inspection beyond an expressly approved gate, implementation planning, application changes, test changes, or implementation.

## Controlling References

- Approved PB-002F Teacher Coaching Dashboard Blueprint v1.0.
- Approved PB-002F Teacher Coaching Workspace Design Decisions v1.0.
- Approved PB-002F Teacher Coaching Workspace Build Specification v1.0.
- Platform Blueprint v1.0.
- Development Standards v1.0.
- Approved PI-000 ownership, identity, authorization, privacy, evidence, lifecycle, persistence, recovery, and governance architecture.

If this specification conflicts with a controlling reference, the controlling reference prevails and work stops for reconciliation.

## Approval Meaning

Approval of PB-002F-FIX-01 would approve only this written separation between prototype presentation and deferred production behavior. It would not:

- authorize implementation or a build;
- remove or satisfy a parent stop condition;
- assign an owner or accountable authority;
- approve application or test files;
- permit student, teacher, classroom, reflection, evidence, Credit, recognition, or note data;
- select a provider, route, API, model, storage system, adapter, technology, dependency, integration, identity format, data model, synchronization mechanism, or lifecycle rule; or
- authorize staging, committing, tagging, pushing, publishing, or deployment.

## Permanent Design Principles

The prototype presentation must preserve:

1. **Coaching Before Data** — presentation supports teacher orientation without maximizing or simulating data.
2. **Recognition Before Intervention** — Recognition appears before ordinary Coaching whenever practical.
3. **Teacher Attention Is Precious** — every visible element must justify the attention it requests.
4. **Teacher Judgment Always Wins** — the presentation never makes, recommends, or implies a classroom decision.
5. **Student Dignity** — no label, ranking, comparison, diagnosis, embarrassment, or public support classification.
6. **Honest Information** — no invented signal, recognition, evidence, status, Credit, note, progress, urgency, or praise.

## Five Required Teacher Questions

The static presentation must make these questions understandable without answering them with invented information:

1. Who needs me first?
2. Who made meaningful progress?
3. Who deserves recognition?
4. Who still needs reflection?
5. Where should I walk next?

The questions are orientation prompts only. They do not create priority, merit, recognition, status, comparison, intervention, or student judgment.

## Prototype Scope

The prototype is a static, teacher-only visual presentation containing honest unavailable states. It may define only the following presentation regions.

### Workspace Layout

The required internal reading order is:

1. Workspace introduction.
2. Classroom Snapshot.
3. Recognition placeholder.
4. Coaching placeholder.
5. Reflection placeholder.
6. Teacher Notes unavailable state.

Recognition must precede ordinary Coaching. The parent contract's bounded exceptions for an explicit student request, safety need, accessibility need, or teacher-selected urgent priority remain conceptual only. PB-002F-FIX-01 does not implement those exceptions and does not authorize automated urgency detection, prioritization, scoring, ranking, prediction, or intervention.

The workspace must remain subordinate to the existing Teacher Command Center and must not alter existing Timer, Teacher Memo, Student Display, Wins/Blockers/Next Steps, Teacher Feed, navigation, or class-orientation behavior.

### Classroom Snapshot

The prototype may show:

- the `Classroom Snapshot` heading;
- a short explanation of the section's future purpose; and
- an honest unavailable state.

It must not show or derive:

- a class label copied into new state;
- student or roster counts;
- names or records;
- requests, priorities, summaries, aggregates, statuses, metrics, or examples; or
- claims that any classroom source was checked.

Reuse of an existing current-class orientation remains subject to the parent specification, repository inspection, and separate approval. This document does not approve that reuse.

### Recognition Placeholder

The prototype may show:

- the `Recognition Opportunities` heading;
- the questions `Who made meaningful progress?` and `Who deserves recognition?`; and
- an honest statement that verified recognition information is unavailable.

It must not show a recognition candidate, progress event, student example, praise, award, Credit, public-display option, action, control, or pipeline state.

The absence of information must not imply that no student progressed or deserves recognition.

### Coaching Placeholder

The prototype may show:

- the `Coaching` heading;
- the questions `Who needs me first?` and `Where should I walk next?`; and
- an honest statement that coaching information is unavailable.

It must not show a student, visit order, priority, request, follow-up, urgency, risk, coaching category, color status, intervention, recommendation, action, or control.

The presentation must state or clearly communicate that the teacher remains the decision-maker.

### Reflection Placeholder

The prototype may show:

- the `Reflection Monitoring` heading;
- the question `Who still needs reflection?`; and
- an honest statement that reflection status cannot be checked.

It must not connect to, open, copy, read, create, edit, summarize, score, classify, store, or simulate the What I Learned Today Google Form or any reflection record.

It must not show submitted, not-submitted, missing, late, stale, unavailable-by-student, or other live status. Source unavailability must never be presented as student failure.

### Teacher Notes Unavailable State

The prototype may state `Teacher Notes are not available in this build.`

It must not include a note editor, field, control, record, history, search, tag, subject relationship, student association, storage, export, audit state, or sample note. It must remain distinct from the existing PB-002D class-wide Teacher Memo.

### Honest Empty and Unavailable States

Candidate conceptual language, subject to later content approval, includes:

- `Classroom coaching information is not connected yet.`
- `Verified recognition information is not available yet.`
- `Coaching signals are not connected yet.`
- `Reflection status cannot be checked right now.`
- `Teacher Notes are not available in this build.`

The prototype must not imply:

- all students are finished, successful, fine, inactive, independent, or equally situated;
- no student needs support or recognition;
- any student failed to work, progress, provide evidence, or reflect;
- any source was queried, connected, or unavailable for a particular student;
- any evidence or record is missing or deleted; or
- the teacher has no next action.

The presentation must not simulate empty, stale, permission-lost, not-submitted, error, or unavailable distinctions that it cannot authoritatively verify.

## Prototype Data and Interaction Prohibitions

The prototype must contain no:

- student names, teacher-entered student content, roster entries, records, counts, aggregates, examples, or live statuses;
- roster loops or data-driven student rendering;
- recognition candidates, coaching priorities, reflection statuses, evidence states, Credits, Teacher Notes data, Flashbacks, or Headlines;
- buttons, links, forms, inputs, text areas, menus, filters, sorting, dismissals, selections, actions, controls, or control-like unavailable elements;
- enabled or disabled workflow controls;
- event handlers, `data-action` behavior, timers, polling, listeners, or dynamic status updates;
- storage, session keys, cached state, persistence, refresh restoration, or sign-out cleanup owned by PB-002F;
- fixtures or fictional coaching outcomes;
- network requests, providers, APIs, adapters, integrations, dependencies, models, or external content; or
- analytics, telemetry, tracking, profiling, personalization, automation, scoring, ranking, prediction, inference, or surveillance.

Existing PB-001 and PB-002 route, session, refresh, sign-out, Timer, Memo, and Student Display behavior remains unchanged and is not PB-002F prototype functionality.

## Student Privacy Boundaries

- The prototype is teacher-only and remains behind the existing teacher route guard.
- No student-specific information is authorized.
- No private coaching content may appear on Student Display, a student route, a public surface, a URL, an error, a log, or browser-restored state.
- No student or teacher activity may be collected, monitored, inferred, or profiled.
- No support need, priority, reflection state, evidence state, note, candidate state, or comparison may be represented.
- Existing development fixtures must not become coaching data or authoritative owners.
- Existing authorization, refresh, wrong-role, and sign-out behavior must remain unchanged.

## Accessibility Requirements

- Use semantic headings and named regions in the approved reading order.
- Maintain a logical DOM and reading order without implying student rank.
- Use understandable text without depending on color, position, shape, icon, motion, or sound.
- Ensure sufficient contrast.
- Support browser zoom, text enlargement, reflow, and wrapping without clipping, overlap, truncation, or horizontal scrolling.
- Create no unnecessary keyboard focus stops in static unavailable content.
- Preserve existing visible focus and keyboard behavior around surrounding Teacher Command Center controls.
- Respect reduced-motion preferences; add no flashing, pulsing, auto-scroll, animation, or attention-stealing motion.
- Require no hover, drag, fine-pointer precision, timed response, audio, or mouse-only behavior.
- Use calm, factual language that exposes no private information.

## Chromebook UX Requirements

Any later authorized prototype implementation would require physical Chromebook validation for:

- teacher-only route and wrong-role protection;
- common Chromebook viewports without horizontal scrolling;
- zoom, enlarged text, wrapping, and reflow;
- keyboard and touchpad operation;
- logical reading and focus order;
- absence of focusable prototype placeholders;
- reduced-motion behavior;
- readable hierarchy without dense columns;
- refresh and sign-out protection;
- absence of PB-002F content on Student Display and student routes;
- Platform regression behavior; and
- Builder and Workshop smoke tests.

Desktop browser validation cannot replace physical Chromebook validation.

## Production Scope — Deferred

The following production capabilities remain deferred, unavailable, non-authorizing, and outside PB-002F-FIX-01:

### Recognition Pipeline

Candidate sourcing, factual-event projection, teacher confirmation, public presentation, correction, removal, audience control, Engineering Headlines, Engineering Flashback, Hall of Fame, Credits, and recognition history.

### Coaching Logic

Student requests, priorities, categories, visit ordering, teacher follow-up, resolution, dismissal, recommendations, interventions, urgency, inference, scoring, ranking, prediction, or automation.

### Reflection Ownership

Account mapping, form access, status projection, consent, authorization, freshness, permission, correction, retention, deletion, recovery, adapter behavior, and response content.

### Engineering Credits

Credit identity, ownership, balances, earning, awarding, correction, revocation, retention, audit, visibility, and economics.

### Teacher Notes Data

Note ownership, subject relationships, editors, student association, access, co-teacher visibility, retention, correction, deletion, restoration, export, audit, school/district policy, and student or guardian access.

### Analytics and Automation

Analytics engines, metrics, recommendations, AI, scoring, ranking, risk detection, generated summaries, automated recognition, automated intervention, personalization, behavior analysis, and surveillance.

### Persistence and Authority-Dependent Behavior

Backend persistence, durable records, storage, synchronization, concurrency, idempotency, conflict handling, offline behavior, recovery, audit, providers, APIs, routes, models, adapters, integrations, owners, accountable authorities, authorization policy, and lifecycle rules.

Deferral does not reserve, approve, prioritize, or imply a future implementation approach.

## Explicit Exclusions

PB-002F-FIX-01 does not authorize:

- application or test changes;
- implementation inspection beyond a separately approved gate;
- implementation planning or implementation;
- live or invented student, classroom, coaching, recognition, reflection, evidence, Credit, or note data;
- analytics, AI, automation, grading, scoring, ranking, prediction, intervention, surveillance, tracking, profiling, or hidden personalization;
- Mission Distribution;
- persistence or backend architecture;
- providers, APIs, routes, models, storage systems, session keys, adapters, integrations, dependencies, or technologies;
- Builder, Workshop, Student Display, routing, session, fixture, or PB-003 changes;
- owner or authority assignment;
- lifecycle, retention, deletion, recovery, audit, or governance decisions; or
- staging, committing, tagging, pushing, publishing, deployment, or production-readiness claims.

## Protected Systems

Preserve without modification:

- PB-001 authentication, roles, routes, guards, refresh, session, and sign-out.
- PB-002A through PB-002E Teacher Command Center, Timer, Teacher Memo, Student Display, presentation modes, focus return, and cleanup.
- PB-003 Student Dashboard routes, presentation, privacy, and foundations.
- The What I Learned Today Google Form boundary.
- Approved PI-000 ownership, privacy, evidence, lifecycle, persistence, recovery, and governance architecture.
- Builder and Workshop runtime, data, routes, persistence, assets, tests, and canonical content.
- Existing fixtures, dependencies, session keys, assets, application files, and tests.

## Remaining Decisions and Blockers

- Review and approval of PB-002F-FIX-01.
- Every parent PB-002F and PI-000 implementation stop condition.
- Verified accountable authority assignments required by the approved parent contract.
- Product, privacy, accessibility, content, and technical-architecture decisions for any proposed visual slice.
- Final region labels and unavailable-state wording.
- Whether existing current-class orientation may be referenced without a new ownership or projection claim.
- Exact permitted files, functions, styles, tests, and regression commands.
- Physical Chromebook validation plan and acceptance evidence.

No remaining decision is resolved by this specification.

## Implementation Stop Conditions

Do not begin implementation inspection, planning, application changes, or test changes unless:

- PB-002F-FIX-01 has passed review and received the required explicit approval;
- the parent PB-002F Build Specification's authority and decision prerequisites are satisfied;
- the parent inspection and approval sequence is repeated or explicitly reconciled for the approved slice; and
- a separate gate expressly authorizes the next read-only action.

Stop immediately if the proposed prototype would require data, examples, state, controls, events, storage, fixtures, owners, authorities, lifecycle decisions, integrations, dependencies, protected-system changes, or an exception to the parent contract.

## Definition of Documentation Complete

PB-002F-FIX-01 documentation is complete when:

- prototype presentation and deferred production scope are unambiguously separated;
- the prototype contains only static teacher-only regions and honest unavailable states;
- recognition-first ordering and all five teacher questions are preserved;
- no student data, action, control, state, persistence, integration, owner, authority, or lifecycle rule is introduced;
- privacy, accessibility, Chromebook, protected-system, and regression boundaries are explicit;
- the parent PB-002F contract and PI-000 stop conditions remain controlling;
- review passes; and
- the user provides explicit documentation approval.

Documentation completion does not authorize implementation.

## Next Required Gate

The next gate is a read-only review of PB-002F-FIX-01 against the approved PB-002F Blueprint, Design Decisions, Build Specification, Development Standards, and PI-000 architecture. No implementation activity begins automatically.
