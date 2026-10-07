# PI-000I — Product Governance vs Deployment Authority Separation Reconciliation v1.0

**Document Status:** Proposed governance reconciliation pending review and approval  
**Implementation Status:** `BLOCKED / NOT READY` and unauthorized  
**Authority Assignment Status:** No party assigned or inferred  
**Operation Type:** Governance documentation only  
**Parent Architecture:** PI-000 — Platform Ownership and Identity Foundation

## 1. Purpose and Controlling Status

This proposed reconciliation separates reusable THINKamigBOB product-development governance, district/school deployment governance, and teacher classroom configuration. It corrects a structural conflation that otherwise makes a local classroom participant appear responsible for proving reusable product authority whenever an approved capability is deployed.

This document does not overwrite, invalidate, or silently amend any approved PI or PB document. Existing registers, assignments, statuses, and stop conditions remain controlling until this reconciliation is separately reviewed and approved and then reconciled through explicit follow-up records. It assigns no party, declares no Ravenna or other district policy, resolves no existing `UNASSIGNED` entry, and authorizes no implementation.

## 2. Governing Principles

1. **Product governance is reusable.** Product-level approval governs whether a capability may be built, released, supported, or changed across deployments.
2. **Deployment governance is local.** Each district or school decides whether and how an approved capability may be used within its policies, accounts, services, network, audience, and legal context.
3. **Teacher configuration is bounded operation.** Teachers make ordinary instructional choices only within approved product and deployment boundaries.
4. **Evidence is not authority.** Testing, use, authorship, employment, access, technical control, or approval participation does not assign an accountable party.
5. **No layer may waive another.** Deployment cannot redefine product architecture or remove product safeguards; product approval cannot establish local deployment permission; teacher configuration cannot approve either layer.
6. **Minimum necessary governance.** Each decision is routed to the layer that owns its effect. A reusable approval is not repeated without a material trigger, and a local decision is not promoted into global product authority.
7. **Fail closed.** Missing, conflicting, expired, unauthorized, or out-of-scope decisions stop the affected capability without inventing an owner or falling back to a broader permission.

## 3. Three-Layer Governance Model

### Layer 1 — THINKamigBOB Product Governance

Product governance controls reusable decisions about whether a capability may be built or released:

- product meaning, intended outcome, and scope;
- privacy-by-design and Platform data behavior;
- accessibility standards and reusable content acceptance;
- security requirements;
- technical architecture;
- technical operations, release, support, and compatibility boundaries;
- external-resource capability and safe-link boundaries;
- product-level legal and compliance requirements;
- reusable acceptance, change control, review, and expiration.

Product roles are `UNASSIGNED` unless an approved record explicitly verifies an accountable party. Project ownership, creation, development, repository access, implementation, THINKamigBOB participation, or authorship does not establish product authority.

### Layer 2 — District/School Deployment Governance

Deployment governance controls whether and how a released capability may be used locally:

- permitted external services and resources;
- Google Workspace, account, permission, and access policy;
- local acceptable-use, privacy, security, and accessibility requirements;
- approved technology and network resources;
- deployment restrictions, audience, and classroom eligibility;
- legal/district concurrence where applicable;
- local support, escalation, review, expiration, and service-change triggers.

Deployment decisions vary by organization. They cannot redefine product architecture, weaken product safeguards, assign product authority, or authorize an excluded product capability. No Ravenna policy or approval is asserted here; all local policy and decision evidence remains `PENDING` unless explicitly supplied and verified.

### Layer 3 — Teacher Classroom Configuration

Within approved product and deployment boundaries, teacher configuration may include:

- activities, Goals, and classroom resources;
- permitted Builder or Workshop availability;
- permitted external destinations;
- student choices, Side Paths, and directions;
- scheduling, sequencing, and classroom workflow.

Teacher configuration does not assign product Privacy, Architecture, Operations, Accessibility, Security, Legal, or deployment-policy authority. Teacher use and validation are operational evidence, not governance concurrence, unless an explicitly verified record separately assigns a bounded concurrence role.

## 4. Commercial Scalability and Decision Flow

The intended scalable flow is:

`one reusable product-governance layer → deployment overlays per district/school → teacher configuration → students`

The product layer defines a safe reusable capability once. Each deployment overlay confirms local permission and operating conditions without redesigning the product. Teachers then configure classroom use from the permitted set. Students receive only capabilities and resources allowed by all controlling layers.

## 5. Authority-Layer Matrix

| Decision area | Product governance | Deployment governance | Teacher configuration |
| --- | --- | --- | --- |
| Capability meaning and exclusions | Defines reusable meaning and safeguards | Accepts or restricts local use; cannot redefine | Uses within approved meaning |
| Privacy | Defines Platform data behavior and minimization | Applies local privacy policy and account/service conditions | Cannot approve privacy policy |
| Accessibility/content | Defines reusable standards and acceptance contract | Applies local accommodations and policy | Operates approved experience and reports issues |
| Security | Defines capability and implementation security | Applies network, account, device, and service policy | Cannot waive controls |
| Technical architecture | Owns product architecture | Cannot redesign product; may restrict deployment | No authority |
| Technical operations | Owns release/support/compatibility boundary | Owns local network, access, escalation, and deployment operations | Follows approved procedure |
| External resources | Defines safe-link/integration capability boundary | Approves local service/destination and ongoing accountability | Selects only permitted resources |
| Legal/compliance | Resolves product-level obligations | Resolves local/district applicability and concurrence | No authority by participation |
| Classroom workflow | Provides supported capability | Sets deployment constraints | Selects timing, sequence, and instructional use |

## 6. Responsibility and Decision Map

### Product decisions

Product records must state capability scope, reusable outcome, privacy/data behavior, accessibility criteria, security constraints, architecture, operations/support boundary, external-resource behavior, acceptance evidence, change triggers, effective date, review/expiration, and explicit approval.

### Deployment decisions

Deployment records must identify the organization and deployment, permitted services/destinations, audience, account and network conditions, local privacy/security/accessibility requirements, legal/district applicability, accountable local approval, effective date, review/expiration, evidence provenance, restrictions, and escalation path.

### Configuration decisions

Configuration records or runtime choices, when needed, must reference the approved product capability and deployment overlay, remain within allowed values/resources, identify the classroom scope, and fail closed when upstream permission is missing or stale. Configuration cannot manufacture policy, authority, product meaning, identity, or integration.

## 7. Reusable Approval Rules

A product approval may be reused across deployments when:

- the capability, data behavior, architecture, security boundary, accessibility contract, and external-resource capability are materially unchanged;
- the release remains within its approved version, audience, and support boundary;
- the product approval is current and has not expired or been revoked;
- no new law, product-level compliance requirement, data purpose, or broader audience changes the product decision.

Reuse avoids requiring each teacher or district to reassign product authority. It does not remove local deployment review.

A deployment approval may be reused within its stated organization, audience, services, resources, network/account conditions, product version, effective period, and restrictions. It does not transfer to another organization or materially different deployment by implication.

## 8. Change and Review Triggers

### Renewed product review triggers

- material capability or student-facing meaning change;
- new Platform data collection, persistence, synchronization, analytics, identity use, or audience;
- new API, provider, adapter, authentication, integration, or external-data flow;
- material architecture, security, accessibility, route, storage, or operations change;
- changed external-resource capability or trust boundary;
- product-level legal/compliance change;
- expiration, revocation, serious defect, or incompatible release.

### Renewed deployment review triggers

- district/school, audience, account policy, acceptable-use policy, privacy/security/accessibility policy, or legal requirement change;
- new or changed external destination, Google Workspace configuration, network endpoint, device environment, or permission model;
- changed product version outside the approved deployment range;
- changed classroom eligibility, support path, deployment restriction, or local owner;
- expiration, revocation, access loss, incident, or materially stale validation evidence.

### Configuration review triggers

- a selected resource is not deployment-approved, becomes unavailable, or changes identity;
- the product or deployment approval expires or is revoked;
- the teacher attempts a value, audience, route, or workflow outside approved configuration bounds.

## 9. Evidence Requirements by Layer

### Product evidence

- verified accountable product decision record;
- approved scope/design/build contract;
- privacy, accessibility, security, architecture, and operations acceptance appropriate to the capability;
- focused/regression/browser/device validation contract and results when implementation exists;
- explicit effective date, review/expiration, exclusions, and approval statement.

### Deployment evidence

- verified deployment authority and organization scope;
- applicable policy, technology/service approval, account/access evidence, and network/device conditions;
- local privacy, security, accessibility, acceptable-use, and legal/district determination where applicable;
- destination accountability, support/escalation path, effective date, and review/expiration;
- operational validation evidence tied to the deployment.

### Teacher configuration evidence

- reference to permitted product capability and deployment overlay;
- classroom scope and selected permitted resources/workflow;
- operational observations when relevant.

Operational evidence alone is insufficient for product or deployment authority assignment. Conversely, authority approval cannot fabricate technical or classroom validation results.

## 10. Safeguards and Non-Waiver

Nothing in this separation waives FERPA, COPPA, other applicable law, privacy, accessibility, security, district policy, acceptable-use restrictions, external-service limits, data governance, or production architecture review. Each requirement is routed to its proper layer and remains blocking when applicable.

No layer may use this reconciliation to authorize surveillance, analytics, AI, grading, ranking, Mission Distribution, persistence, integration, student-specific routing, or another excluded capability.

## 11. Conflict, Escalation, and Fail-Closed Rules

- Product and deployment decisions must retain distinct IDs, parties, scope, evidence, dates, and approval statements.
- When decisions conflict, the more restrictive applicable boundary controls until explicitly reconciled; teacher configuration cannot resolve the conflict.
- An expired, revoked, missing, ambiguous, or unverifiable product approval blocks the capability.
- A missing or invalid deployment overlay blocks local use but does not invalidate the reusable product architecture.
- A missing or invalid teacher configuration disables only the affected configurable choice.
- A destination outside the deployment-approved set remains unavailable.
- No arbitrary, inferred, latest, default, or convenience decision may replace an authoritative result.
- Escalation must go to the accountable layer-specific party; it must not be redirected to a teacher, developer, or tool by convenience.

## 12. No-Authority-Inference Rules

Authority is not established by project ownership, creation, employment, teaching, classroom participation, validation, document authorship, repository access, commits, technical control, tool access, prior approval participation, or organizational naming alone.

One party may hold multiple roles only through explicit, individually scoped, verified, and approved assignments. Product authority does not imply deployment authority; deployment authority does not imply product authority; teacher configuration does not imply either.

## 13. Reconciliation of PI-000H D–K

| Category | Product aspect | Deployment aspect | Configuration aspect | Reconciled status |
| --- | --- | --- | --- | --- |
| D — Product/Content | Product intent, reusable semantics, labels, honest outcomes | Accept/restrict local deployment content where policy applies | Classroom choices within approved semantics | Split; unresolved parties remain unresolved |
| E — Privacy | Privacy-by-design and Platform data behavior | Local privacy/account/service-policy concurrence where applicable | No privacy authority; ordinary use only | Split; no decision resolved |
| F — Accessibility/Content | Reusable standards and product acceptance | Local accommodations and accessibility policy | Teacher operational use and issue reporting | Split; no decision resolved |
| G — Technical Architecture | Product-only architecture authority | Deployment may restrict but not redesign | None | Product-only; assignment remains unresolved |
| H — Technical Operations | Release, compatibility, product support boundary | Local network, device, access, support, and escalation | Follows procedure | Split into separately named product/deployment responsibilities |
| I — External Resource Accountability | Safe-link/capability and non-integration boundary | Local destination permission and ongoing accountability | Select only permitted resources | Split; no accountability inferred |
| J — School/Classroom Operations | Not product-governance authority | Deployment and classroom-workflow concurrence | Ordinary instructional operation | Deployment/configuration boundary; no product authority |
| K — Legal/District | Product legal/compliance where product-level law applies | Local applicability and concurrence | None | Explicitly separated; applicability remains unresolved |

A, B, and C remain PI-000H Class Activity Library architecture and are unaffected. No D–K category becomes assigned or approved merely because its aspects are separated.

## 14. Existing-Gate Defect Finding

The current D–K model overloads reusable product acceptance, local deployment permission, and classroom operation in single categories. The conflation becomes structurally defective when it requires a classroom teacher or each district deployment to prove product-level architecture, privacy-by-design, accessibility-standard, or release authority for an unchanged reusable capability.

The correction is not to waive governance. It is to require product approval once at the reusable layer, local approval at each deployment layer, and teacher configuration only inside both. Existing registers remain auditable historical records and controlling until explicit reconciliation approval and follow-up migration records exist.

## 15. PB-002H-FIX-01 Mapping

### A. Product-development governance

Approved design/contract outcomes already establish:

- exactly three controls and their product meaning;
- the no-data/non-integration privacy boundary;
- semantic anchors, opener isolation, accessibility, responsive, and test contracts;
- the static four-file architecture and protected-system boundary;
- product release, regression, validation, support, and stop-condition contract;
- the safe external-link capability boundary.

These approvals satisfy architecture and contract definition. Under current PI verification rules, they do not by themselves assign accountable product parties. Product-level accountable acceptance remains unresolved for Product/Content, narrow product Privacy, Accessibility/Content, Technical Architecture, product Technical Operations/release support, security where required, and product safe-external-link capability. No teacher or Ravenna deployment actor must become those product authorities.

### B. Ravenna/local deployment

The local deployment overlay must address:

- permission to present and use the exact Google Sites Home, Builder entry, and Workshop endpoint;
- student/school Google account and access policy;
- local network and approved technology conditions;
- acceptable-use, privacy, security, and accessibility requirements;
- legal/district applicability and concurrence when applicable;
- ongoing local destination accountability, support, restrictions, effective date, and review/expiration.

No Ravenna policy or deployment approval is recorded by this document. Teacher-supplied physical `COMPLETE PASS` evidence establishes operational usability and access, but not deployment-policy approval or accountable-party assignment.

### C. Teacher classroom configuration

For this fixed launcher, teacher configuration is limited to classroom use, scheduling, directions, and instructional selection of already-permitted destinations. It creates no product authority, local deployment authority, data owner, route, state, integration, or Class Activity Library assignment.

### Corrected gate semantics

The current PB-002H-FIX-01 D–K intake should ultimately be reconciled so that:

- reusable product decisions are approved by verified product-layer parties once and reused until a product trigger occurs;
- Ravenna/local deployment decisions are approved by verified deployment-layer parties for the exact environment and resources;
- teacher operational evidence supports deployment acceptance but does not assign product or deployment governance;
- K is split between product legal/compliance requirements and local legal/district applicability;
- no product authority is demanded from a teacher merely to configure or use an already-approved capability.

## 16. Remaining Blockers After Separation

- Verified accountable product-layer assignments and explicit acceptance for the reusable static-link capability remain absent.
- Verified Ravenna/local deployment authority, policy basis, and explicit approval remain absent.
- Local Legal/District applicability remains unresolved; concurrence remains required only if found applicable.
- Existing PI-000H-A and PB-002H-FIX-01 registers have not been formally migrated to layered records.
- This proposed reconciliation has not passed review or approval.
- Separate implementation authorization remains absent.
- Narrow post-build launcher UI acceptance remains future evidence.
- Any genuinely applicable PI-000/PI-001 stop condition remains active.

## 17. Migration and Reconciliation Plan

1. Review and approve or revise this structural reconciliation without assigning parties.
2. Preserve existing PI-000G-A, PI-000H-A, and PB-002H-FIX-01 records as audit history; do not delete or rewrite prior states.
3. Add explicit layer metadata to future decision records: `PRODUCT`, `DEPLOYMENT`, or `CONFIGURATION`.
4. Require each future record to state capability/deployment scope, accountable party, verification evidence, reusable scope, organization/audience where applicable, effective date, review/expiration, change triggers, concurrence, delegation limits, exclusions, and explicit approval.
5. Reconcile overloaded D–K entries through separately reviewed records that map old category IDs to new layer-specific records without silently marking either complete.
6. Complete verified product-layer assignments and approvals.
7. Complete verified Ravenna/local deployment decisions and K applicability.
8. Record teacher configuration only after upstream product and deployment permissions exist.
9. Reassess PB-002H-FIX-01 readiness; then request separate implementation authorization if no applicable blocker remains.

## 18. Unresolved Decisions

- Accountable parties for every product-level role.
- Accountable parties and policy evidence for the Ravenna/local deployment overlay.
- Product security and legal/compliance applicability for the static-link capability.
- Local privacy, security, accessibility, acceptable-use, external-service, network, and account-policy decisions.
- Local Legal/District applicability and concurrence if applicable.
- Reusable product approval duration and release/version range.
- Deployment duration, review cadence, escalation, and change-control details.
- Exact register migration records and identifiers.

## 19. Approval Meaning

Approval of this reconciliation would establish only the three-layer governance architecture, category separation, reuse rules, triggers, evidence rules, PB-002H-FIX-01 mapping, defect finding, and migration plan as governance-documentation authority.

Approval would not assign a party, approve a Ravenna policy, resolve a D–K record, change an existing register status, approve implementation, validate an external service, authorize product release or deployment, waive a safeguard, modify code/tests/Builder/Workshop, or override PI-000/PI-001.

## 20. Implementation Prohibition and Stop Conditions

Implementation remains `BLOCKED / NOT READY`. Stop if:

- this reconciliation is treated as approved before review and explicit approval;
- any required product or deployment party, policy, concurrence, date, scope, or evidence would need to be inferred;
- teacher configuration or operational evidence would be used as product/deployment authority;
- a local approval would be used to waive a product safeguard or a product approval would be used to infer local permission;
- migration would erase audit history or silently mark an existing record resolved;
- implementation or release would proceed without its separate explicit gate;
- an applicable privacy, accessibility, security, legal, district, external-service, data-governance, architecture, or PI stop condition remains active.

## Exact Next Gate

`/REVIEW` — **PI-000I Product Governance vs Deployment Authority Separation Reconciliation v1.0**
