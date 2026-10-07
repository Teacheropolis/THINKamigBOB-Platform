# PI-000I-A — Layered Authority Register Reconciliation v1.0

**Document Status:** Proposed reconciliation pending review and approval  
**Implementation Status:** `BLOCKED / NOT READY` and unauthorized  
**Authority Status:** All original `UNASSIGNED` and `UNRESOLVED` states preserved  
**Operation Type:** Additive governance-register reconciliation only  
**Parent Governance:** Approved PI-000I Product Governance vs Deployment Authority Separation Reconciliation v1.0

## 1. Purpose and Ordering

This document additively reconciles the general PI-000H-A D–K authority requirements and the PB-002H-FIX-01 bounded D–K package to the approved PI-000I governance layers:

`Product Governance → District/School Deployment Governance → Teacher Classroom Configuration → Student Access`

It adds layer classification and reconciled current meaning without assigning a party, approving a policy, deciding K applicability, resolving a record, authorizing implementation, or changing the original records.

## 2. Documents and History Preserved

The following remain unchanged and controlling as audit history until separately reconciled through approved records:

- `PI-000H-A-AUTHORITY-ASSIGNMENT-AND-LIFECYCLE-DECISION-READINESS-REGISTER-v1.0.md`;
- `PI-000H-A-AUTHORITY-ASSIGNMENT-DECISIONS-v1.0.md`;
- `PB-002H-FIX-01-BOUNDED-AUTHORITY-AND-CONCURRENCE-DECISIONS-v1.0.md`;
- approved PB-002H-FIX-01 scope, build-specification inspection reconciliation, and validation evidence;
- PI-000G-A and all upstream PI-000/PI-001 records.

Original decision IDs, statuses, evidence, findings, provenance, dates, and missing fields are preserved. This document supersedes no historical fact. If approved, it supplies the authoritative layer interpretation for future reconciliation records while leaving existing metadata/status unchanged.

## 3. Controlling PB-002H-FIX-01 Facts

- Exactly three static anchors are in scope.
- The product contract for scope, no-data/non-integration behavior, accessibility, safe links, static four-file architecture, tests, and protected systems is approved.
- Teacher-supplied destination/environment validation is `COMPLETE PASS` operational evidence.
- No Google API, Google authentication change, data read/write/ingestion, synchronization, new data, persistence, grade inference, Mission Distribution, Activity Registry, Builder/Workshop modification, route, session, or fixture change is authorized.
- Approved design and build contracts establish architecture requirements; under current verification rules, they do not silently assign accountable product parties.
- Ravenna deployment policy, accountable deployment authority, and Legal/District applicability are not verified.
- Teacher operational evidence is not deployment-policy approval.
- Teacher configuration is ordinary use of resources already permitted by both upstream layers.

## 4. General PI-000H-A D–K Layer Mapping

### D — Product/Content Authority

- **Original ID:** `PI-000H-A-D`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`, product-primary
- **Product responsibility:** Reusable product intent, semantic meaning, student-facing outcomes, labels, honest states, exclusions, and product acceptance.
- **Deployment responsibility:** Apply local content restrictions and audience policy without redefining product semantics.
- **Teacher configuration responsibility:** Select instructional choices only within approved semantics and deployment limits.
- **Unresolved product decision/evidence:** Verified accountable product party, scope, explicit acceptance, effective date, review/expiration, and approval evidence.
- **Unresolved deployment decision/evidence:** Local content/audience restriction decision only where deployment policy requires it.
- **Product implementation blocker:** **Yes** while the controlling register requires accountable product acceptance.
- **Ravenna deployment/use blocker only:** Local content restrictions, if any, are deployment blockers and not generic product blockers.
- **Evidence required:** Product assignment/acceptance record; separately, deployment policy/approval when applicable.
- **Non-authorizations:** No privacy, architecture, operations, legal, deployment, configuration, or implementation authority follows from D alone.

### E — Privacy Authority

- **Original ID:** `PI-000H-A-E`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`
- **Product responsibility:** Privacy-by-design, Platform data behavior, minimization, audience, and reusable no-data/non-integration guarantees.
- **Deployment responsibility:** Local privacy, acceptable-use, account, service, and audience policy concurrence where applicable.
- **Teacher configuration responsibility:** No privacy authority; operate only within approved boundaries.
- **Unresolved product decision/evidence:** Verified accountable product Privacy party and explicit acceptance of product data behavior.
- **Unresolved deployment decision/evidence:** Verified local privacy/policy basis and approval for the deployment where required.
- **Product implementation blocker:** **Yes** for unresolved product privacy acceptance under current registers.
- **Ravenna deployment/use blocker only:** Ravenna-specific privacy/account/service policy evidence blocks Ravenna activation, not generic product implementation.
- **Evidence required:** Product privacy acceptance record; separate local policy/authority evidence.
- **Non-authorizations:** No data collection, API, authentication, ingestion, tracking, persistence, or teacher privacy authority.

### F — Accessibility/Content Authority

- **Original ID:** `PI-000H-A-F`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`
- **Product responsibility:** Reusable accessible design, semantic interaction, content criteria, testing, and product acceptance.
- **Deployment responsibility:** Local accessibility policy, accommodations, and deployment acceptance.
- **Teacher configuration responsibility:** Ordinary accessible use, classroom feedback, and compliance with approved accommodations; no authority assignment.
- **Unresolved product decision/evidence:** Verified product Accessibility/Content party and explicit acceptance of reusable criteria.
- **Unresolved deployment decision/evidence:** Local accessibility/accommodation approval where required.
- **Product implementation blocker:** **Yes** while product accessibility acceptance remains unassigned.
- **Ravenna deployment/use blocker only:** Local accommodations or policy requirements block affected local use, not generic product implementation.
- **Evidence required:** Product accessibility assignment/acceptance; local policy/accommodation evidence; post-build UI acceptance after implementation.
- **Non-authorizations:** Operational use or automated tests do not assign accessibility authority or authorize implementation.

### G — Technical Architecture Authority

- **Original ID:** `PI-000H-A-G`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `PRODUCT`
- **Product responsibility:** Reusable product architecture, compatibility, protected boundaries, and technical acceptance.
- **Deployment responsibility:** May restrict deployment but may not redesign or approve product architecture.
- **Teacher configuration responsibility:** None.
- **Unresolved product decision/evidence:** Verified accountable Technical Architecture party and explicit acceptance of the approved architecture.
- **Unresolved deployment decision/evidence:** None for product architecture; local technology permission belongs to deployment operations/policy.
- **Product implementation blocker:** **Yes** under current express assignment requirements.
- **Ravenna deployment/use blocker only:** Local technology approval may block Ravenna use but is not G product authority.
- **Evidence required:** Product architecture assignment, bounded scope, approved contract, dates, exclusions, and approval statement.
- **Non-authorizations:** No product meaning, privacy, deployment, operations, legal, or teacher authority.

### H — Technical Operations Authority

- **Original ID:** `PI-000H-A-H`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`, with separately named responsibilities
- **Product responsibility:** Release, compatibility, product support, recovery expectations, validation boundary, and operational ownership of the reusable capability.
- **Deployment responsibility:** Local network, device, access, support, escalation, availability, and deployment operations.
- **Teacher configuration responsibility:** Follow approved operating procedure and report issues; teacher use is not authority.
- **Unresolved product decision/evidence:** Verified product Technical Operations party and release/support acceptance.
- **Unresolved deployment decision/evidence:** Verified Ravenna/local operations party, network/account/support conditions, and deployment acceptance.
- **Product implementation blocker:** **Yes** for the unresolved product release/support responsibility required by current registers.
- **Ravenna deployment/use blocker only:** Local network, device, support, and operations evidence ordinarily blocks Ravenna activation/use only.
- **Evidence required:** Separate product-operations and deployment-operations records; operational validation may support but cannot assign either.
- **Non-authorizations:** Hosting, teaching, validation, or tool access does not assign operations authority; no Builder/Workshop modification.

### I — External Google Resource Accountability

- **Original ID:** `PI-000H-A-I`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`
- **Product responsibility:** Safe-link capability, external-context presentation, opener isolation, non-integration boundary, and fail-safe product behavior.
- **Deployment responsibility:** Permission to use each local destination and ongoing accountability for content, access, permissions, availability, review, and replacement/removal.
- **Teacher configuration responsibility:** Select only deployment-permitted resources; no arbitrary external destination.
- **Unresolved product decision/evidence:** Verified product safe-external-link acceptance within the reusable capability.
- **Unresolved deployment decision/evidence:** Verified accountable Ravenna/local destination party and permission/accountability evidence.
- **Product implementation blocker:** **Yes** only for the product safe-link capability acceptance required by current registers; local destination policy is not a generic product blocker.
- **Ravenna deployment/use blocker only:** Local destination permission and ongoing accountability ordinarily block Ravenna use.
- **Evidence required:** Product safe-link assignment/acceptance; separate destination approval/accountability record and operational evidence.
- **Non-authorizations:** No Google API, authentication, editor access, ingestion, synchronization, persistence, or assignment of Google as an accountable party.

### J — School/Classroom Operations Concurrence

- **Original ID:** `PI-000H-A-J`
- **Original status:** `UNASSIGNED`; approval statement `NOT PROVIDED`
- **PI-000I classification:** `DEPLOYMENT` with bounded `TEACHER CONFIGURATION` evidence
- **Product responsibility:** None as a product-governance assignment; product may define supported workflow boundaries.
- **Deployment responsibility:** School/classroom workflow concurrence, local operational fit, support/contact procedure, and deployment acceptance.
- **Teacher configuration responsibility:** Ordinary scheduling, directions, instructional sequence, and operational evidence inside approved bounds.
- **Unresolved product decision/evidence:** No J product assignment is required merely to build the generic capability.
- **Unresolved deployment decision/evidence:** Verified Ravenna/local concurrence party and explicit deployment/workflow acceptance.
- **Product implementation blocker:** **No**, once correctly layered; prior treatment as a universal product blocker was over-broad.
- **Ravenna deployment/use blocker only:** **Yes** until local concurrence is verified.
- **Evidence required:** Deployment concurrence assignment and acceptance; teacher `COMPLETE PASS` evidence may support but does not assign concurrence.
- **Non-authorizations:** Teacher participation does not assign deployment, product, privacy, architecture, operations, or legal authority.

### K — Legal/District Concurrence, If Applicable

- **Original ID:** `PI-000H-A-K`
- **Original status:** `UNASSIGNED`; applicability/approval statement `NOT PROVIDED`
- **PI-000I classification:** `SHARED/MULTI-LAYER`, explicitly separated
- **Product responsibility:** Product-level legal/compliance requirements that apply to the reusable capability.
- **Deployment responsibility:** Organization-specific Legal/District applicability and concurrence for local services, policies, audience, accounts, network, and use.
- **Teacher configuration responsibility:** None; no teacher legal authority.
- **Unresolved product decision/evidence:** Verified product legal/compliance applicability and acceptance where product-level law requires it.
- **Unresolved deployment decision/evidence:** Ravenna/local applicability determination and concurrence only if applicable.
- **Product implementation blocker:** Product legal/compliance is blocking only when applicable to product implementation; local Ravenna applicability is not a generic product blocker.
- **Ravenna deployment/use blocker only:** Local applicability must be resolved; concurrence blocks Ravenna use when applicable.
- **Evidence required:** Separate verified product and deployment applicability bases, accountable parties, dates, limits, and concurrence when required.
- **Non-authorizations:** Absence of data integration does not decide K; teacher, developer, project owner, or validation evidence cannot decide applicability by implication.

## 5. PB-002H-FIX-01 Specialized Gate Matrix

| Gate | Approved product contract already exists | Accountable product acceptance unresolved | Ravenna deployment evidence unresolved | Teacher role | Product implementation effect | Ravenna activation/use effect |
| --- | --- | --- | --- | --- | --- | --- |
| D | Three-link scope, labels, meanings, honest outcomes | Yes | Local content restriction only if applicable | Configure within semantics | Blocks under current product assignment rules | Local restrictions may block use |
| E | No-data/no-integration behavior | Yes | Local privacy/account/service policy | No privacy authority | Blocks product implementation until accepted | Local policy blocks use where required |
| F | Semantic links, 44px, keyboard, responsive/test contract | Yes | Local accommodations/policy | Operate and report | Blocks product implementation until accepted | Local accommodation/policy may block use |
| G | Static four-file architecture and protections | Yes | Local technology permission is outside G | None | Blocks product implementation until accepted | Local restriction may block use separately |
| H | Release/test/support boundary | Yes | Network, access, support, escalation | Follow procedure | Product operations acceptance blocks release/build authorization | Local operations block Ravenna use |
| I | Safe-link and non-integration boundary | Yes | Exact destination permission/accountability | Select permitted resources only | Product safe-link acceptance blocks product build/release | Exact destination accountability blocks Ravenna use |
| J | Supported classroom workflow contract | No J product assignment | Yes | Scheduling, directions, workflow evidence | Does not block generic product implementation | Blocks Ravenna activation until concurred |
| K | Product safeguards and non-waiver contract | Product legal/compliance only if applicable | Local applicability unresolved; concurrence if applicable | None | Product K blocks only if product-level applicability requires it | Local K resolution required; concurrence when applicable |

No row is marked resolved. Approved contract existence is not accountable-party assignment under current verification rules.

## 6. Product Implementation Authorization vs Ravenna Deployment Authorization

### Product implementation authorization

For a reusable generic three-link capability, unresolved product-layer assignments/acceptances that genuinely remain under current approved documents are:

- D product meaning/content acceptance;
- E product privacy-by-design/no-data acceptance;
- F product accessibility/content acceptance;
- G product Technical Architecture acceptance;
- H product release/support/Technical Operations acceptance;
- I product safe-link capability acceptance;
- product Security acceptance where required by the controlling product process;
- product legal/compliance applicability and acceptance where applicable;
- separate explicit implementation authorization.

J local classroom concurrence, Ravenna network/account policy, local destination accountability, and Ravenna K applicability are not generic product-development blockers under PI-000I.

### Ravenna deployment authorization

Before Ravenna activation/use, unresolved local items include:

- verified deployment authority and explicit approval;
- permission for the exact Google Sites Home, Builder entry, and Workshop endpoint;
- Google Workspace/school-account, acceptable-use, privacy, security, accessibility, and network policy evidence;
- local Technical Operations/support/escalation responsibility;
- ongoing destination accountability;
- School/Classroom Operations concurrence;
- Legal/District applicability determination and concurrence if applicable;
- effective date, review/expiration, restrictions, and change triggers.

Product approval does not authorize Ravenna deployment. Ravenna approval cannot release the product or waive product safeguards.

## 7. Hardcoded-Destination Analysis

The reusable product concept is a static, safe external-link capability. The currently specified PB-002H-FIX-01 artifact is not deployment-neutral: it requires exact Ravenna-specific destinations to be embedded directly in `platform-app.mjs`, including the school-controlled Google Sites URL and local-network Workshop endpoint.

No configuration abstraction, deployment overlay loader, route, fixture, session value, storage record, provider, adapter, or destination registry is approved or implemented. Therefore the exact artifact cannot be treated as a generic product binary awaiting later destination configuration.

Consequences:

1. Ravenna destination authorization is not a blocker to developing a reusable generic safe-link capability in principle.
2. It **is a prerequisite for implementing this exact Ravenna-configured build artifact**, because implementation itself would place and present the local destinations in product source.
3. This does not merge Ravenna deployment authority into product governance. It is a build-input precondition caused by hardcoded deployment configuration.
4. Teacher operational `COMPLETE PASS` proves access/usability but does not supply Ravenna policy or destination-accountability approval.
5. The build must fail closed until both product-layer acceptance and Ravenna authorization for the exact embedded destinations exist.
6. No hypothetical configuration abstraction may be assumed to avoid this result; adding one would exceed the approved architecture and require separate specification and authority.

## 8. Teacher Classroom Configuration Responsibilities

For this fixed artifact, teacher configuration is limited to:

- deciding when and how students use already-approved links;
- giving classroom directions and scheduling;
- selecting instructional activities inside the externally presented, deployment-permitted environment;
- reporting operational or accessibility problems.

The teacher may not add arbitrary URLs, change source destinations, approve deployment policy, decide K, assign product roles, authorize release, waive safeguards, or turn operational evidence into governance approval.

## 9. Evidence Matrix

| Evidence | Product layer use | Deployment layer use | Configuration use | What it cannot establish |
| --- | --- | --- | --- | --- |
| Approved scope/specification | Product contract and acceptance basis | Identifies deployed capability | Defines configuration limits | Accountable-party assignment or local permission |
| Four-file inspection | Architecture evidence | Identifies deployment artifact | None | Architecture authority assignment |
| Teacher physical `COMPLETE PASS` | Product usability evidence where relevant | Strong operational/access evidence | Classroom-use evidence | Product authority, deployment policy, K, ongoing destination accountability |
| Ravenna policy/service approval, if supplied | No product release authority | Local permission/accountability evidence | Defines permitted resources | Product architecture or product authority |
| Product authority record | Reusable product acceptance | Identifies approved capability | Upstream prerequisite | Ravenna permission |
| Deployment authority record | No product authority | Local activation/use approval | Upstream prerequisite | Product release or architecture change |
| Post-build UI acceptance | Implementation acceptance evidence | Local device acceptance evidence | Operational feedback | Pre-build authority assignment |

## 10. Over-Broad Prior Gate Findings

The following prior interpretations are over-broad under approved PI-000I:

- treating J School/Classroom Operations concurrence as a prerequisite for generic product implementation rather than Ravenna deployment/use;
- treating Ravenna network, account, service, and destination accountability as generic product-development authority;
- requiring a teacher to fill D–I reusable product roles because the teacher operates or validates the feature;
- treating local K applicability as automatically blocking all generic product architecture work;
- treating teacher operational validation as deployment-policy approval.

Corrected layer meaning does not waive the underlying decisions. For this exact hardcoded artifact, Ravenna destination authorization remains a pre-build input even though it is not generic product authority.

## 11. Reconciled Blockers

### Product blockers

- Verified D, E, F, G, H, and product-safe-link I accountable assignments/acceptances remain absent under current approved registers.
- Product Security acceptance remains required where the product process requires it.
- Product legal/compliance applicability and acceptance remain unresolved where applicable.
- Separate implementation authorization is absent.

### Ravenna deployment blockers

- Verified Ravenna deployment authority and policy basis remain absent.
- Authorization/accountability for the exact hardcoded destinations remains absent.
- Local account, acceptable-use, privacy, security, accessibility, network, support, and review conditions remain unverified as deployment decisions.
- J concurrence remains absent.
- K applicability remains unresolved; concurrence remains absent if applicable.

### Future acceptance

- Narrow post-build launcher UI acceptance remains required after authorized implementation.

## 12. Smallest Compliant Path to Implementation

1. Review and approve this reconciliation as layered register meaning only.
2. Create and approve verified product-layer assignment/acceptance records for the applicable D–I product responsibilities, Security where required, and product legal/compliance where applicable.
3. Create and approve one bounded Ravenna deployment record covering the exact destinations, account/service/network/policy conditions, local operations, ongoing accountability, J concurrence, and K applicability/concurrence when applicable.
4. Reconcile the original PI-000H-A and PB-002H-FIX-01 statuses by reference without erasing history; mark only decisions supported by the approved records.
5. Reassess readiness against the hardcoded artifact and all genuinely applicable PI stop conditions.
6. Request separate explicit implementation authorization for the exact four-file boundary.
7. Implement, test, run regressions, and complete the narrow post-build UI acceptance.

No pilot exception or teacher-as-product-authority shortcut is permitted.

## 13. Approval Meaning

Approval of this document would establish only the layered interpretation, D–K mappings, specialized gate matrix, hardcoded-destination analysis, over-broad gate corrections, evidence meaning, blocker split, and migration path as governance-register reconciliation authority.

Approval would not assign a party, approve Ravenna policy or deployment, decide K, resolve an original record, change original metadata, authorize implementation, add a configuration abstraction, validate external services, or waive a safeguard.

## 14. No-Implementation Rule and Stop Conditions

Implementation remains `BLOCKED / NOT READY`. Stop if:

- this reconciliation is treated as approved before review and explicit approval;
- original history/status is erased or silently changed;
- any product or Ravenna decision, party, policy, applicability result, or evidence would need to be inferred;
- a local approval is used as product authority or product approval is used as Ravenna permission;
- teacher use or validation is used as governance assignment;
- Ravenna-specific URLs are embedded without verified Ravenna destination authorization;
- implementation requires a configuration abstraction or file outside the approved boundary;
- separate implementation authorization is absent;
- an applicable privacy, accessibility, security, legal, district, external-service, data-governance, architecture, or PI stop condition remains active.

## Exact Next Gate

`/REVIEW` — **PI-000I-A Layered Authority Register Reconciliation v1.0**
