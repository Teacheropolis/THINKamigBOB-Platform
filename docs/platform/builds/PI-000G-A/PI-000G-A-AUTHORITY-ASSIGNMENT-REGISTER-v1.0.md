# PI-000G-A — Authority Assignment Register v1.0

Governance Document Status: Approved  
Authority Assignments: All 13 accountable roles or parties are `UNASSIGNED`  
Future Assignment Requirement: Explicit verified approval is required  
Implementation Status: Blocked

## Purpose

This register records only authority assignments that are explicitly verified as approved in the controlling documentation. It does not infer authority, create an assignment, select an owner, or authorize decision work or implementation.

## Controlling References

- Approved PI-000 Blueprint and Design Decisions v1.0
- Approved PI-000A through PI-000E contracts
- Approved PI-000F Platform Owner and Decision Readiness Register v1.0
- Approved PI-000G Decision Authority Assignment Register v1.0
- Platform Blueprint v1.0
- Development Standards v1.0

## Verification Standard

An assignment is verified only when an approved record explicitly links an authority category to an accountable role or named party and supplies the required scope and approval evidence.

Authority is not inferred from:

- Authority-category names
- Repository ownership or access
- File authorship
- Commits or branch history
- Conversation participation
- Tool access
- Technical or administrative control
- Prior inspection, review, validation, approval, implementation, or commit participation

An approved architecture document establishes architectural authority for its contents; it does not assign an accountable role or party to a governance category unless it says so explicitly.

## Verified Assignment Result

No explicit accountable-role or party assignment was found in the controlling approved documentation. Therefore, every category remains `UNASSIGNED`.

| Authority category | Verified accountable role or party | Verification evidence | Current status |
|---|---|---|---|
| Product | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Privacy | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Curriculum | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| School Operations | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Security | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Legal/District where applicable | `UNASSIGNED` | No approved assignment record identified | `BLOCKING WHEN APPLICABLE` |
| Technical Architecture | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Technical Operations | `UNASSIGNED` | No approved assignment record identified | `BLOCKING` |
| Builder | `UNASSIGNED` | No approved assignment record identified | `BLOCKING FOR BUILDER-DEPENDENT WORK` |
| Workshop | `UNASSIGNED` | No approved assignment record identified | `BLOCKING FOR WORKSHOP-DEPENDENT WORK` |
| Evidence/External Source System | `UNASSIGNED` | No approved assignment record identified | `BLOCKING FOR EXTERNAL-SOURCE WORK` |
| Google Slides Source Adapter | `UNASSIGNED` | No approved assignment record identified | `BLOCKING FOR GOOGLE SLIDES ADAPTER WORK` |
| Google Vids Source Adapter | `UNASSIGNED` | No approved assignment record identified | `BLOCKING FOR GOOGLE VIDS ADAPTER WORK` |

## Assignment Boundaries

The categories remain distinct:

- Product authority does not imply privacy, curriculum, operational, security, legal/district, or technical authority.
- Privacy authority does not imply legal/district or security authority.
- Curriculum authority does not imply mission runtime, Builder, Workshop, or product authority.
- School Operations authority does not imply identity, privacy, security, or technical ownership.
- Technical Architecture and Technical Operations are separate and cannot approve protected product or policy decisions for one another.
- Builder and Workshop authority remain separate from Platform authority and from each other.
- Evidence/External Source-System authority owns source meaning, not Platform evidence connections or adapter compatibility.
- Google Slides and Google Vids source-adapter authority are separate from source ownership and from each other.

The decision scopes, concurrence, consultation, escalation, delegation, approval-evidence, review, expiry, reassignment, and stop-condition requirements remain governed by the approved PI-000G register.

## Unassigned-State Effect

Because every accountable role or party is unassigned:

- PI-000A product and lifecycle decision work remains blocked.
- PI-000A authoritative-owner selection remains blocked.
- PI-000A implementation planning and implementation remain blocked.
- PI-001 product decision work remains blocked.
- PI-001 owner selection, implementation planning, and implementation remain blocked.
- Builder and Workshop destination or adapter work remains blocked where their authority is required.
- Evidence/External Source-System, Google Slides, and Google Vids adapter work remains blocked.
- Provider and technology selection remains blocked.

Documentation may proceed only through separately authorized gates that do not require an unresolved assignment to be invented.

## Assignment Change Requirements

Changing any `UNASSIGNED` entry requires a separate approved assignment record that identifies:

- Authority category
- Accountable role or named party
- Decision scope and exclusions
- Effective date
- Review date or expiration rule
- Required concurrence and consultation
- Delegation limits
- Escalation and conflict-resolution path
- Approval evidence
- Revocation and reassignment behavior

The assignment must be reviewed against PI-000G before it can become effective. Assignment of one category does not assign any other category.

## Explicit Non-Decisions

This register does not:

- Assign a person, organization, provider, or role holder.
- Select an authoritative runtime owner.
- Resolve any product, privacy, curriculum, lifecycle, operational, security, legal/district, or technical decision.
- Select a provider, technology, identity format, data model, route, storage system, synchronization mechanism, API, adapter, or transport.
- Define a Google account, consent, sharing, or permission model.
- Authorize implementation, code or test changes, staging, commit, tagging, pushing, deployment, or integration.

## Stop Conditions

Stop when:

- A required category remains `UNASSIGNED`.
- Assignment evidence is missing, ambiguous, expired, revoked, or outside the approved scope.
- Authority would need to be inferred from participation, access, ownership, authorship, approval history, or technical control.
- A proposed role or party has not been separately authorized.
- One assignment would be used to claim another category.
- Required concurrence, consultation, delegation, escalation, review, or reassignment rules are absent.
- Decision work or implementation would require an unapproved owner, provider, technology, format, model, route, storage system, synchronization mechanism, or adapter.

When blocked, report the exact category and approved assignment evidence required.

## Approval Meaning

Approval of this register confirms only that the verified current assignment state is accurately recorded as entirely `UNASSIGNED`.

Approval does not assign authority, unblock PI-000A or PI-001, approve owner selection, or authorize implementation.
