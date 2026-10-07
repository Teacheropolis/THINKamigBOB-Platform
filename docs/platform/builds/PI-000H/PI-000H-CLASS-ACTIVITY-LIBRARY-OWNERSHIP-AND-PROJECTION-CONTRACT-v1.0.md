# PI-000H — Class Activity Library Ownership and Projection Contract v1.0

**Document Status:** Proposed architecture contract pending review and approval  
**Implementation Status:** `BLOCKED` and unauthorized  
**Operation Type:** Architecture and ownership documentation only  
**Parent Architecture:** PI-000 — Platform Ownership & Identity Foundation

## 1. Purpose and Status

This contract defines the minimum ownership, allowed-value, assignment, lifecycle, and student-projection boundaries required by PB-002H-FIX-01. It does not implement a Class Activity Library Assignment or make PB-002H-FIX-01 implementation-ready.

This contract creates no field, fixture, record schema, database, storage key, route, API, provider, backend, cache, synchronization system, adapter, administrative interface, or teacher interface. Implementation remains blocked until the ownership, authority, lifecycle, technology, permission, and validation gates in this document are separately resolved and approved.

## Controlling References

- Approved PI-000 Blueprint and Design Decisions v1.0.
- Approved PI-000A through PI-000G contracts and registers, including PI-000G-A.
- Approved Classroom Pilot Destination Map v1.0.
- Approved and reconciled PB-002H Teacher Activity Launcher (Classroom Pilot) Build Specification v1.0.
- Approved PB-002H-FIX-01 Classroom Destination Reconciliation v1.0.
- PB-001 authentication, role, class-context, session, refresh, and sign-out boundaries.
- PB-002 Teacher Command Center boundaries.
- PB-003A Student Home, PB-003B Mission Choice, and PB-003C My STEM Work foundations.

## 2. Entity Boundary

### Class Activity Library Assignment

A Class Activity Library Assignment is a class-scoped configuration concept that states which one of the two supported pilot Activity Libraries currently applies to an entire class.

Required meaning:

- One class may resolve to exactly one supported pilot Activity Library at a time.
- The assignment applies uniformly to the entire class.
- It is not student identity, student grade, classroom identity, membership identity, mission identity, mission availability, Mission Distribution, student-specific routing, a mission assignment, or evidence of student activity.
- It grants no completion, progress, submission, evidence, or reflection meaning.
- It must be explicitly assigned by a separately approved authority through a separately approved mechanism.
- It must never be inferred from a class name, period, teacher, student, roster, grade label, fixture order, display order, route, URL, or browser/session artifact.

The concept defines semantic meaning only. It does not define a data model or authorize a record.

## 3. Allowed Pilot Values and Destination Meaning

The allowed-value set is closed for this pilot:

### `GRADE_3_4_ACTIVITY_LIBRARY`

- Meaning: the Activity Library used by Grade 3 and Grade 4 classes under the approved classroom-pilot curriculum grouping.
- Mission Hub: `https://sites.google.com/ravennaschools.us/steminbobwarts/grade-34`
- Activity Directions Library: `https://drive.google.com/drive/folders/1OnDNN0MW7Nah90mYpnwBwNGpT_3i4gOo?usp=sharing`

### `GRADE_5_6_ACTIVITY_LIBRARY`

- Meaning: the Activity Library used by Grade 5 and Grade 6 classes under the approved classroom-pilot curriculum grouping.
- Mission Hub: `https://sites.google.com/ravennaschools.us/steminbobwarts/grade-5`
- Activity Directions Library: `https://drive.google.com/drive/folders/1nKF19-PXXSBoL5ZoKmICzEFhe8uOKcUD?usp=sharing`

No third value, alias, fallback, automatic conversion, or inferred value is authorized.

### Universal destinations independent of assignment

- Side Paths Library: `https://drive.google.com/drive/folders/1zcdOEiJCNbWeeQuo6OfkcSUbTbpfWK0B?usp=sharing`
- STEM Mission Start Form: `https://docs.google.com/forms/d/e/1FAIpQLScuH6jI3hYwvfMqdL1790AvjYYIwoUDX1MvHnW6DEq2qGaFjg/viewform?usp=header`
- What I Learned Today: `https://docs.google.com/forms/d/e/1FAIpQLSfEXb7njuuIQdbFP9MfStMGeC_3-9_U2b-NvwR8r5mUpy2BEg/viewform?usp=header`

These universal destination contracts do not depend on or reveal the class assignment. They do not expand the single-action PB-002H-FIX-01 UI contract.

Every URL above is an exact user-supplied pilot destination. It must not be rewritten, shortened, normalized, inferred, substituted, expanded, or appended to. Reader/respondent permission, school-account behavior, browser behavior, and physical Chromebook validation remain outstanding.

## 4. Ownership Roles

The following roles are distinct and none is assigned by this contract:

| Ownership role | Required responsibility | Must not own by implication | Accountable role or party |
| --- | --- | --- | --- |
| Assignment meaning owner | Decides the semantic meaning and allowed-value set | Individual class changes, storage, student identity, or destination content | `UNASSIGNED` |
| Assignment authority | May explicitly assign or change a class value within approved policy | Record storage, student overrides, curriculum inference, or technical implementation | `UNASSIGNED` |
| Record owner | Authoritative source of the current class assignment and its lifecycle state | Student identity, destination content, presentation, or inferred grade | `UNASSIGNED` |
| Projection consumer | Student Dashboard reads the minimum resolved value | Mutation, reassignment, storage ownership, or audit access | Platform Student Dashboard, consumer boundary only; accountable authority `UNASSIGNED` |
| Destination content owners | External Google resources retain content, permission, and availability ownership | Platform assignment, Platform projection, or student status | External accountable parties `UNASSIGNED` |
| Technical implementation owner | Implements only an approved owner and technology contract | Product meaning, authority assignment, or provider selection | `UNASSIGNED` |

PI-000G-A records all 13 accountable authority categories as `UNASSIGNED`. No person, organization, role holder, teacher, administrator, developer, creator, repository owner, technical operator, AI system, THINKamigBOB component, or approving participant may be substituted for an accountable role without explicit verified assignment.

Repository ownership, authorship, commits, conversation participation, tool access, technical control, or approval participation are not assignment evidence.

## 5. Assignment Contract

A valid assignment must satisfy all of the following:

- entire-class scope only;
- exactly one value from the closed allowed-value set;
- explicit, authorized assignment;
- an authoritative record-owner result;
- current authorization and lifecycle validity;
- no student-specific or small-group override;
- no grade inference or automatic grade mapping;
- no derivation from names, labels, rosters, fixtures, order, or browser state;
- no universal or library fallback.

Missing, multiple, conflicting, unsupported, stale, unauthorized, unreadable, revoked, removed, or unavailable assignment results fail closed. The Platform must not select the newest, first, last, closest, grade-looking, or otherwise arbitrary value.

Whether a teacher may become a future assignment actor is `PENDING AUTHORITY DECISION`. Teacher role or classroom access alone grants no assignment authority.

## 6. Student Projection Contract

- PB-001 authenticated student context supplies `classId` only under the current boundary.
- A future authoritative class record or approved projection may resolve the class assignment for that `classId`.
- The semantic assignment must not become part of student identity.
- It must not be copied into a new student session key, browser storage key, cache, fixture, URL, or client record merely for convenience.
- The student projection is read-only.
- The projection exposes only the minimum supported semantic value required to select the applicable Mission Hub.
- It exposes no teacher-only configuration metadata, assignment actor, audit history, external credentials, editor permissions, student grade, roster information, or unrelated class data.
- The projection is not proof of assignment freshness unless the authoritative owner says it is current.
- Missing, invalid, stale, conflicting, unsupported, unreadable, or unauthorized projection produces honest noninteractive text in PB-002H-FIX-01 with no `href`, pseudo-button, fallback, or focusable launch action.

This is a projection contract, not a transport, schema, cache, or API decision.

## 7. Lifecycle Contract

| Lifecycle event | Required contract |
| --- | --- |
| Creation | Explicit authorized assignment to an existing class; no inferred default |
| Effective time | `PENDING PRODUCT/LIFECYCLE DECISION` |
| Change | Explicit authorized reassignment; no silent conversion |
| Refresh | Re-resolve from the authoritative owner; exact mechanism is `PENDING TECHNOLOGY DECISION` |
| Sign-out | Student-local projection is no longer usable; no new local persistence |
| Correction | Separately approved authorized correction path required |
| Deletion or class archival | Assignment becomes unavailable and launch fails closed |
| Expiration or review | `PENDING PRODUCT/LIFECYCLE DECISION` |
| Audit purpose, events, access, retention, and deletion | `PENDING PRIVACY/OPERATIONS DECISION` |
| Conflict | Fail closed; never choose latest or arbitrary value |
| Idempotency | Repeating the same authorized assignment produces the same semantic result and no duplicate meaning |
| Removal | Absence produces an honest noninteractive state and never a fallback |

Unknown outcome is not success. A caller must reconcile through the future authoritative owner before presenting an actionable launch.

## 8. Privacy and Data Minimization

- The assignment is class-scoped and not student-specific.
- Student grade must not be derived, stored, exposed, or projected by this contract.
- Only the minimum allowed semantic value may reach the Student Dashboard.
- No analytics, launch tracking, behavior tracking, personalization, behavioral inference, evidence status, activity selection, submission, progress, or completion data is created.
- No external credential, account token, editor permission, resource response, or teacher-only metadata is exposed.
- Cross-class and cross-student disclosure is prohibited.
- Privacy purpose, retention, audit, correction, and access authority remain unresolved.

Privacy accountable authority remains `UNASSIGNED` unless explicit verified assignment evidence is approved under PI-000G and PI-000G-A.

## 9. External Destination Boundary

- The recorded URLs are user-supplied destination contracts pending permission, school-account, browser, and Chromebook validation.
- Google Sites and Drive require only the approved student reader access appropriate to their purpose.
- Google Forms require student respondent access only; editor access must never be required, requested, or exposed.
- What I Learned Today remains the sole approved reflection source.
- External Google owners retain resource content, permission, availability, submission, and response-record responsibilities.
- Platform opening a resource does not imply assignment, selection, start, completion, submission, evidence, reflection, progress, tracking, or persistence.
- No Google authentication change, file creation, assignment, copy automation, submission tracking, permission management, account model, integration, or adapter ownership is authorized.

External permissions and classroom browser behavior are operational prerequisites, not evidence that a Platform assignment exists.

## 10. Technology Decisions Explicitly Deferred

The following remain undecided and unapproved:

- authoritative data store;
- class-record format or schema;
- API or provider;
- backend or service boundary;
- synchronization and concurrency mechanism;
- caching or offline behavior;
- transport;
- administrative UI;
- teacher assignment UI;
- audit-log technology;
- migration and compatibility mechanism;
- production routing;
- adapter or integration mechanism;
- revision, freshness, and idempotency representation.

`localStorage`, `sessionStorage`, development fixtures, a static constant, DOM markup, URL parameters, filenames, or an in-memory value must not become the authoritative owner.

## 11. PB-002H-FIX-01 Dependency Contract

PB-002H-FIX-01 may proceed only after all of the following are separately completed and approved:

- accountable ownership and authority assignments are explicitly verified;
- the authoritative assignment record owner is selected;
- the technology mechanism is decided;
- assignment and lifecycle decisions are approved;
- authoritative class assignment data exists for each pilot class;
- the minimum read-only projection is available to authenticated student context;
- missing, stale, conflicting, unsupported, unauthorized, removal, and correction behavior is implementable;
- all applicable Google permissions and browser validation pass;
- applicable PI-000 and PI-001 stop conditions are resolved;
- a reviewed implementation specification and separate explicit implementation authorization are granted.

Approval of this document alone satisfies none of these implementation prerequisites.

## 12. Future Testing and Acceptance Contract

Future authorized tests and validation must cover:

- both allowed values and their exact Mission Hub and Directions Library mappings;
- exact universal destinations without treating them as assignment-dependent;
- missing, multiple, conflicting, unsupported, stale, unauthorized, unreadable, revoked, and removed failure-closed behavior;
- absence of student-grade inference and automatic grade mapping;
- entire-class consistency and absence of student/small-group overrides;
- refresh re-resolution from the authoritative owner;
- sign-out invalidation of the student-local projection;
- authorized correction and removal behavior;
- idempotent repeated assignment meaning;
- no new local persistence or session/storage key;
- minimum read-only projection and absence of protected metadata;
- external reader/respondent permission failures and honest unavailable presentation;
- exact URL preservation and safe external navigation;
- keyboard, focus, accessible naming, target size, wrapping, zoom, no-horizontal-scroll, browser, and physical Chromebook validation;
- full Platform regression, Builder browser protection, and full Workshop regression.

Tests cannot substitute for authority assignment, lifecycle approval, Google permission validation, or physical Chromebook acceptance.

## 13. Protected Systems

This contract does not authorize changes to:

- application code or tests;
- `platform-fixtures.mjs`, fixture ownership, or fixture content;
- `platform-session.mjs`, sessions, storage keys, or authentication context;
- `guardRoute()`, the route list, or navigation ownership;
- PB-001, PB-002, PB-002H, or PB-002H-FIX-01 implementation;
- PB-003A, PB-003B, or PB-003C foundations;
- Google Sites, Drive, Forms, accounts, or permissions;
- Builder or Workshop behavior, routing, storage, or assets;
- dependencies, providers, APIs, schemas, backends, adapters, or synchronization mechanisms.

## 14. Implementation Status and Stop Conditions

**Status:** `BLOCKED` and unauthorized.

Stop before planning or implementation when:

- any required accountable role or authority remains `UNASSIGNED`;
- assignment meaning, assignment authority, record ownership, or technical implementation ownership is absent or ambiguous;
- a teacher, administrator, developer, creator, AI, THINKamigBOB component, repository participant, or technical operator would need to be treated as authority without explicit verified assignment;
- the authoritative record owner, technology, allowed values, assignment mechanism, lifecycle, projection, correction, removal, or audit requirements remain unapproved;
- an assignment or student grade would need to be inferred;
- more or less than exactly one supported value is returned;
- implementation would require a new field, fixture, session/storage key, route, backend, provider, API, cache, synchronization mechanism, adapter, or persistence choice not separately approved;
- any Google destination lacks required reader/respondent permission or browser validation;
- PB-002H-FIX-01 or an applicable PI-000/PI-001 stop condition remains unresolved;
- browser or physical Chromebook acceptance is incomplete.

No implementation readiness is implied. No application, test, fixture, session, route, storage, Google resource, Builder, or Workshop change is authorized.

## 15. Deferred Decisions

- Every accountable ownership and authority assignment.
- Effective time, expiration, review, reassignment, correction, removal, archival, and unavailable-owner policy.
- Audit purpose, audience, events, retention, deletion, and access.
- Authoritative record and all technology decisions listed in Section 10.
- Exact projection freshness and revalidation mechanism.
- Administrative or teacher assignment experience, if separately approved.
- Google permission and school-account acceptance.
- Implementation specification, implementation authorization, and validation outcomes.

## 16. Approval Meaning

Approval of this contract would establish only the semantic ownership, allowed-value, assignment, lifecycle-requirement, projection, privacy, dependency, testing, and stop-condition boundaries recorded here.

Approval would not assign an owner or authority, select a person or party, choose technology, create class assignment data, validate Google access, authorize PB-002H-FIX-01 implementation, or modify any protected system.

## Exact Next Gate

`/REVIEW` — **PI-000H Class Activity Library Ownership and Projection Contract v1.0**
