# PI-000F — Platform Owner and Decision Readiness Register

## Architecture-Readiness Register v1.0

Status: Approved architecture authority  
Parent Architecture: PI-000 — Platform Ownership & Identity Foundation  
Implementation Status: Blocked pending recorded decisions and authoritative-owner approval

## Purpose

This register consolidates the approved PI-000 ownership foundation and records the decisions still required before implementation planning. It selects no owner, provider, technology, identity format, data model, route, or adapter.

Approval of this register would approve the decision sequence and readiness gates only. It would not approve any listed decision outcome or authorize implementation.

## Controlling References

- Approved PI-000 Blueprint v1.0.
- Approved PI-000 Design Decisions v1.0.
- Approved PI-000A through PI-000E contracts.
- PI-000 Architecture Readiness Review: conditional pass; implementation planning blocked.
- PI-001 Mission Distribution architecture.
- Platform Blueprint v1.0.
- Development Standards v1.0.

## Approved Ownership-Domain Summary

| Domain | Approved authority boundary | Current runtime readiness |
|---|---|---|
| Teacher and student identity | PI-000A | Owner not selected or implemented |
| Classroom and membership | PI-000A | Owner not selected or implemented |
| Authentication result | PI-000A | Provider and owner unresolved |
| Session and authorization | PI-000A | Production owners unresolved |
| Mission and mission version | PI-000B | Owner not selected or implemented |
| Mission catalog projection | PI-000B | Source owner unresolved |
| Distribution, availability, and focus | PI-000B | Owner not selected or implemented |
| Destination readiness | PI-000B | Owner not selected or implemented |
| Project and student work | PI-000C | Owner not selected or implemented |
| Start and Continue resolution | PI-000C | Work owner unresolved |
| Environment-work relationships | PI-000C | Adapters unimplemented |
| Evidence and source identity | PI-000D | Owners unresolved |
| Evidence connections | PI-000D | Owner unresolved |
| Teacher evidence visibility | PI-000D | Purpose and authority unresolved |
| State lifetimes and durability | PI-000E | Infrastructure unresolved |
| Idempotency and concurrency | PI-000E | Result owners and mechanisms unresolved |
| Recovery and audit | PI-000E | Owners and policies unresolved |
| Mission Choice presentation | PB-003B | Approved foundation only |
| My STEM Work presentation | PB-003C | Approved foundation only |

These domains are non-overlapping. Platform presentation consumes authorized projections and does not absorb source ownership.

## Dependency Order

1. Product, privacy, lifecycle, and operational authority.
2. Teacher, student, classroom, and membership owner decisions.
3. Authentication, session, and authorization owner decisions.
4. Durable-state, revision, idempotency, concurrency, recovery, and audit decisions.
5. Mission, mission-version, catalog, and destination owner decisions.
6. Distribution and classroom-focus owner decisions.
7. Project/work owner and Start-versus-Continue decisions.
8. Evidence and evidence-connection owner decisions.
9. Builder and Workshop adapter inspections and decisions.
10. Separately reviewed implementation specifications.

Later decisions cannot substitute for unresolved earlier authority.

## Missing Authoritative-Owner Register

| Owner required | Must own | Must not own | Decision authority required |
|---|---|---|---|
| Teacher identity owner | Stable teacher identity and lifecycle | Credentials, classroom authority by implication | Product, privacy, security, operations |
| Student identity owner | Stable private student identity | Display name, roster order, project data | Product, privacy, school operations |
| Classroom owner | Classroom identity and lifecycle | Teacher identity or student work | Product, school operations, privacy |
| Membership owner | Teacher/student classroom relationships | Identity or project ownership | Product, school operations, privacy |
| Authentication owner | Verified authentication result | Identity, authorization, durable work | Security, privacy, operations |
| Session owner | Current authenticated context | Durable domain records | Security, privacy, operations |
| Authorization owner | Current action and view decisions | Authentication or identity issuance | Product, privacy, security |
| Mission owner | Mission identity and lifecycle | Distribution, work, presentation | Curriculum/product authority |
| Mission-version owner | Version identity and compatibility | Student work migration by implication | Curriculum/product authority |
| Catalog projection owner | Minimal authorized mission facts | Mission master records | Curriculum/product, privacy |
| Distribution owner | Class-wide availability and focus | Mission, work, launch, progress | Product, classroom authority |
| Destination owner | Readiness and approved destination relationship | Mission or work identity | Product, Builder/Workshop authorities |
| Project/work owner | Project identity, lifecycle, Continue eligibility | Mission or environment internals | Product, privacy, lifecycle authority |
| Evidence owner | Evidence identity and lifecycle | Source artifact or teacher review | Product, privacy, source authority |
| Evidence-source owner | Source-artifact identity, access, revision, availability, and deletion meaning | Platform evidence connections, projects, or teacher review | Product, privacy, source-system authority |
| Evidence-connection owner | Project-to-evidence relationships | Project or source content | Product, privacy, lifecycle authority |
| Persistence owner | Durable authoritative state guarantees | Domain meaning | Technical, security, privacy, operations |
| Idempotency/concurrency owner | Mutation result and conflict guarantees | Product intent definition | Technical and domain authorities |
| Recovery owner | Reconciliation and restoration guarantees | Silent overwrite or reassignment | Operations, security, privacy |
| Audit owner | Approved audit events and access | Analytics, grading, behavior tracking | Privacy, security, legal/operations |
| Builder adapter owner | Versioned Platform-to-Builder contract behavior and compatibility | Builder runtime, Platform project identity, or mission ownership | Product, technical operations, Builder authority, privacy/security |
| Workshop adapter owner | Versioned Platform-to-Workshop contract behavior and compatibility | Workshop runtime, Platform project identity, or mission ownership | Product, technical operations, Workshop authority, privacy/security |
| Google Slides source-adapter owner | Approved Slides source-contract behavior and compatibility | Google account ownership, evidence identity, or project ownership | Product, privacy, security, technical operations, source authority |
| Google Vids source-adapter owner | Approved Vids source-contract behavior and compatibility | Google account ownership, evidence identity, or project ownership | Product, privacy, security, technical operations, source authority |

No current fixture, browser key, page, Builder function, Workshop state, filename, URL, or DOM element may fill these roles.

## Remaining Product-Decision Register

| Decision | Required before | Decision authority |
|---|---|---|
| Teacher and student account lifecycle | PI-000A planning | Product, privacy, school operations |
| Roster correction, transfer, departure, and rollover | PI-000A planning | Product, privacy, school operations |
| Co-teacher, substitute, and delegated authority | PI-000A planning | Product, school operations, privacy |
| Mission authoring, publication, retirement, and restoration | PI-000B/PI-001 planning | Curriculum and product authority |
| Mission-version compatibility and migration meaning | PI-000B/PI-001 planning | Curriculum and product authority |
| Distribution draft, confirmation, removal, restoration, and closure | PI-001 planning | Product and classroom authority |
| Current-focus meaning and duration | PI-001 planning | Product and classroom authority |
| Destination eligibility and environment choice | PI-001 planning | Product and environment authorities |
| One-versus-many projects per mission | PI-000C planning | Product and curriculum authority |
| Primary Continue selection | Interactive PB-003B planning | Product and student-experience authority |
| Current, Recent, and Previous classification | Interactive PB-003C planning | Product and student-experience authority |
| Project archive, restore, delete, and post-membership access | PI-000C planning | Product, privacy, lifecycle authority |
| Eligible evidence types and connection initiator | PI-000D planning | Product, curriculum, privacy |
| Evidence revision, replacement, and permission-loss behavior | PI-000D planning | Product, privacy, source authority |
| Teacher visibility versus review actions | Evidence integration planning | Product, privacy, classroom authority |
| Offline product experience | Any offline planning | Product, privacy, security, operations |

## Remaining Privacy and Lifecycle Decision Register

| Decision required | Required before | Decision-authority categories |
|---|---|---|
| Identity, classroom, membership, project, evidence, and audit retention purposes and durations | Any durable-record planning | Product, privacy, school operations, security, legal/district |
| Student access after classroom exit, transfer, graduation, or account recovery | PI-000A and PI-000C planning | Product, privacy, school operations, legal/district |
| Teacher access after reassignment or classroom closure | PI-000A and teacher-visibility planning | Product, privacy, school operations, security |
| Consent and minimum-data requirements for external evidence sources | PI-000D source-adapter planning | Product, privacy, security, legal/district, source authority |
| Source permission revocation and protected-cache cleanup | PI-000D and PI-000E planning | Privacy, security, technical operations, source authority |
| Archive, deletion, restoration, export, and correction rights | Any durable-domain planning | Product, privacy, school operations, legal/district, technical operations |
| Cross-student, cross-classroom, and shared-device protections | PI-000A and protected-data planning | Privacy, security, school operations, product |
| Audit purpose, audience, correction, retention, and deletion | Any audit planning | Privacy, security, legal/district, school operations |
| Public-display, recognition, reporting, analytics, and AI gates | Any broader-audience planning | Product, privacy, school operations, legal/district |

## Remaining Operational Decision Register

| Decision required | Required before | Decision-authority categories |
|---|---|---|
| Support ownership and escalation paths | Production implementation planning | Technical operations, product, school operations, security |
| Owner-unavailable, timeout, and incident behavior | PI-000E implementation planning | Technical operations, product, security |
| Account, roster, project, and evidence recovery procedures | Relevant PI-000A, PI-000C, or PI-000D planning | Technical operations, product, privacy, school operations, security |
| Backup restoration and disaster-recovery objectives | Durable-persistence planning | Technical operations, security, privacy, legal/district |
| Migration validation, rollback, and partial-failure handling | Migration planning | Technical operations, domain authority, security, privacy |
| Cross-device and cross-tab revocation propagation | Production session planning | Security, technical operations, privacy, product |
| Monitoring boundaries that avoid student surveillance | Monitoring planning | Privacy, security, technical operations, school operations |
| Audit access and investigation procedures | Audit implementation planning | Security, privacy, legal/district, school operations |
| Classroom rollover and archival operations | Classroom lifecycle implementation planning | School operations, product, privacy, technical operations |
| Builder and Workshop adapter version support | Adapter implementation planning | Builder/Workshop authorities, technical operations, product |

Operational authority must preserve the domain contracts and cannot redefine product ownership.

## Remaining Technology and Provider Decision Register

| Decision required | Required before | Decision-authority categories |
|---|---|---|
| Authentication and identity implementation | PI-000A implementation planning | Security, privacy, technical architecture, operations, product |
| Durable persistence and record-ownership implementation | Durable-domain implementation planning | Technical architecture, operations, security, privacy, domain authority |
| API or service boundaries | Connected implementation planning | Technical architecture, security, privacy, domain authority |
| Hosting and deployment topology | Production implementation planning | Technical operations, security, privacy, legal/district |
| Session issuance, renewal, expiry, and revocation | Production PI-000A planning | Security, privacy, technical architecture, product |
| Authorization enforcement | Protected-feature planning | Security, privacy, technical architecture, domain authority |
| Revision and concurrency handling | Mutable durable-state planning | Technical architecture, operations, domain authority |
| Idempotency-result persistence | Durable mutation planning | Technical architecture, operations, security, domain authority |
| Cross-device synchronization | Cross-device feature planning | Technical architecture, security, privacy, product |
| Offline cache or queueing, if separately approved | Offline implementation planning | Product, privacy, security, technical architecture, operations |
| Backup and recovery | Durable-persistence implementation planning | Technical operations, security, privacy, legal/district |
| Audit implementation | Audit implementation planning | Security, privacy, legal/district, technical operations |
| Builder and Workshop adapter transport | Adapter implementation planning | Technical architecture, Builder/Workshop authorities, security, product |
| Google account, consent, permission, and source integration | Google source-adapter planning | Product, privacy, security, legal/district, technical architecture, source authority |
| Monitoring and migration tooling | Production operations or migration planning | Technical operations, security, privacy, domain authority |

This register intentionally neither selects nor recommends any option.

## Decisions Required Before PI-000A Implementation Planning

All of the following are required:

- Teacher, student, classroom, and membership authoritative-owner decisions.
- Authentication-result, session, and authorization owner decisions.
- Account, roster, transfer, recovery, and rollover product policies.
- Privacy purpose, audience, minimum fields, retention, deletion, and correction policies.
- Session expiry, renewal, revocation, refresh, cross-tab, and device behavior.
- Offline behavior and shared-device cleanup.
- Durable-state and audit boundaries required by identity operations.
- Approved provider/technology decision process and decision authority.

Until then, PB-001 fixtures and session behavior remain development-only.

## Decisions Required Before PI-001 Implementation Planning

PI-000A prerequisites above, plus:

- Mission and mission-version owners and lifecycle policies.
- Mission catalog projection owner.
- Distribution and classroom-focus owner.
- Durable classroom-operational persistence.
- Teacher mutation authorization and student membership presentation checks.
- Destination-readiness owner.
- Project/work owner for Start-versus-Continue resolution.
- Idempotency, concurrency, unknown-outcome, removal, restoration, and audit behavior.
- Builder/Workshop relationship prerequisites where destinations depend on them.

PI-001 cannot proceed while any item is unresolved.

## Builder and Workshop Adapter Prerequisites

Before adapter planning:

- Platform project/work identity must have an authoritative owner.
- Mission/version and destination relationships must be verified independently of environment internals.
- Start, Continue, save, revision, and recovery meanings must be approved.
- Adapter authority, accepted inputs, returned results, versioning, failure, and rollback must be defined.
- Identity cannot be inferred from filenames, project names, mission tiles, geometry, screenshots, object IDs, DOM, globals, or browser keys.
- Builder autosave/download behavior and Workshop persistence/restoration remain protected.
- Adapter failure must preserve existing student work.

Each adapter requires a separate read-only inspection and approved contract before implementation planning.

## Explicit Non-Decisions

PI-000F does not decide or recommend:

- Backend, database, schema, API, provider, or hosting.
- Authentication, identity, session, or token technology.
- Storage, cache, synchronization, revision, idempotency, concurrency, conflict, offline, backup, recovery, audit, or monitoring technology.
- Identity, mission, distribution, project, evidence, connection, or audit data models.
- Routes, frameworks, dependencies, adapters, or transport.
- Google account model, scopes, sharing, classroom mapping, or permissions.
- Product outcomes listed in the open registers.

## Stop Conditions

Stop implementation planning when:

- A required owner or decision authority is missing.
- Two systems claim the same domain.
- A decision would be inferred from existing fixtures or runtime details.
- Product, privacy, lifecycle, operational, and technical authority are conflated.
- Provider or technology selection precedes approved product and privacy requirements.
- Session, draft, cache, or presentation state would become authority.
- Identity, authorization, lifetime, idempotency, concurrency, recovery, or audit behavior is undefined.
- Builder or Workshop requires direct coupling.
- PI-001 would require inventing any missing owner or policy.

When blocked, report the exact owner, decision, and authority required.

## Recommended Decision Sequence

1. Review and approve this readiness register.
2. Reconcile approved-document status metadata through a separate documentation-only authorization.
3. Establish who has product, privacy, school-operations, security, curriculum, and technical decision authority.
4. Resolve PI-000A product, privacy, and lifecycle decisions.
5. Conduct a separate provider-neutral owner-selection specification for PI-000A.
6. Resolve PI-000E durable-state and operational requirements needed by the first implementation slice.
7. Inspect and specify the smallest PI-000A implementation slice.
8. Reassess PI-001 readiness after authoritative PI-000A implementation exists.
9. Resolve PI-000B/PI-001 product decisions and owner selections.
10. Inspect adapters only when their upstream identities and owners exist.

No step authorizes the next step automatically.

## Architecture-Readiness Exit Criteria

PI-000 is ready to advance from documentation into bounded implementation planning only when:

- Every required domain has one approved authoritative owner.
- Decision authority and accountable operational ownership are named.
- Required product, privacy, lifecycle, and operational policies are approved.
- Technology selection follows those requirements through a separate gate.
- Persistence lifetime, authorization, idempotency, concurrency, recovery, and audit behaviors are specified for the proposed slice.
- Builder and Workshop remain protected by approved adapter boundaries.
- The proposed slice has explicit stop conditions, tests, regression scope, and physical Chromebook validation.
- No unresolved decision must be invented by implementation.

PI-001 additionally requires all prerequisites listed in its dedicated register section.

## Approval Meaning

Approval establishes this register as architecture-readiness authority. It confirms what remains unresolved and the order for deciding it.

Approval does not select owners, providers, technologies, formats, models, routes, or adapters and does not authorize implementation, application or test changes, staging, committing, tagging, or pushing.
