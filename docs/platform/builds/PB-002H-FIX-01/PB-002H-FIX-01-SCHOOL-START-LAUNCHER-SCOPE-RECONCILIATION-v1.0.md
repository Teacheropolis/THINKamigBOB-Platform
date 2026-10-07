# PB-002H-FIX-01 — School-Start Launcher Scope Reconciliation v1.0

**Document Status:** Proposed; pending review and approval  
**Implementation Status:** `BLOCKED` and unauthorized  
**Operation Type:** Documentation reconciliation only  
**Controlling Relationship:** Proposed bounded UI-scope reconciliation to the approved PB-002H-FIX-01 Launch Today's Mission (Pilot) specification and destination inventory

## 1. Purpose and Boundary

Define a reduced school-start Student Dashboard launcher consisting of exactly three fixed destinations. This proposal removes Class Activity Library routing from this reduced UI only; it does not invalidate, erase, or supersede approved architecture or destination documentation unless and until this reconciliation is separately reviewed and approved.

This document creates no application behavior, route, state, field, fixture, session/storage key, assignment, backend, synchronization, integration, or authority. Implementation remains blocked.

## 2. Controlling References

- Approved PB-002H-FIX-01 Launch Today's Mission (Pilot) specification and final destination inventory.
- Approved PI-000H Class Activity Library Ownership and Projection Contract v1.0.
- Approved PI-000H-A Authority Assignment and Lifecycle Decision Readiness Register v1.0.
- Approved PB-003A Student Home, PB-003B Mission Choice, and PB-003C My STEM Work foundations.
- PB-001 authentication, role, route, session, refresh, and sign-out boundaries.
- Applicable PI-000 and PI-001 stop conditions.

## 3. Relationship to Previously Approved Contracts

The earlier detailed destination inventory remains approved documentation authority and historical context. Its Mission Hubs, Directions Libraries, Side Paths Library, Forms, Builder, and Workshop contracts remain available to govern separately approved future work.

If this reconciliation later passes review and receives explicit approval, it supersedes only the earlier PB-002H-FIX-01 **single Launch Today's Mission action and its Class Activity Library UI dependency** for the reduced school-start launcher. It does not declare the earlier contract invalid and does not remove Class Activity Library architecture.

PI-000H and PI-000H-A remain valid architecture and readiness authority for any future class-library-based routing. Their assignments and decisions remain unresolved. The reduced school-start launcher simply does not consume Class Activity Library assignment data.

Until this reconciliation is approved, the previously approved PB-002H-FIX-01 contract remains controlling. Approval of this document would still not authorize implementation.

## 4. Exact Three-Control Scope

The proposed school-start launcher contains exactly these three primary Student Dashboard launch controls:

| Order | Visible control label | Exact destination | Destination boundary |
| ---: | --- | --- | --- |
| 1 | **GO TO MY STEM MISSIONS** | `https://sites.google.com/ravennaschools.us/steminbobwarts/home-start` | Exact user-supplied Google Sites Home destination; permission, school-account, browser, and Chromebook validation outstanding |
| 2 | **STEM BUILDER** | Existing approved repository-root THINKamigBOB Builder entry | Reuses existing approved entry; no Builder behavior, route, return, persistence, or ownership change |
| 3 | **STEM WORKSHOP** | `http://192.168.1.252:8000` | Exact user-supplied classroom-pilot local-network endpoint; reachability, browser, and physical Chromebook validation outstanding; Workshop routing/internals unchanged |

The exact URLs must not be rewritten, normalized, shortened, expanded, inferred, substituted, or appended to. This documentation task performs no URL, permission, browser, network, or Chromebook validation.

No fourth primary launcher control, hidden launcher control, activity-specific control, grade-specific control, or fallback destination is included.

## 5. Google Sites Pilot Curriculum Ownership

For this reduced school-start pilot, the external Google Sites experience owns:

- graduation-year selection;
- Goal navigation;
- activity cards and activity choice;
- Activity Directions access;
- STEM Mission Start Form access;
- What I Learned Today access;
- Goal-linked Side Paths;
- My STEM Work navigation presented by Google Sites;
- existing Google curriculum navigation.

The Platform Student Dashboard does not select, distribute, assign, synchronize, observe, or track any of those choices or results. Google Sites ownership in this section is an external presentation/content boundary, not a new Platform integration or an assignment of an unverified accountable party.

Opening Google Sites does not imply assignment, mission start, activity selection, completion, evidence submission, reflection submission, progress, save, tracking, or persistence.

## 6. Reduced Platform Knowledge Boundary

The reduced launcher requires no Platform knowledge of:

- student grade or graduation year;
- Class Activity Library assignment;
- Goal or activity choice;
- Side Path choice;
- an individual Directions URL;
- Google Slides notebook URL;
- Google Vids URL, copy, or index.

The Platform must not infer any of those facts from student identity, class name, roster, fixtures, session data, URL, navigation, or prior use. No Class Activity Library state is read, copied, cached, stored, or projected for this launcher.

This reduction means the PI-000H Class Activity Library prerequisite is **not consumed by this proposed school-start launcher only**. It does not resolve PI-000H, assign its authorities, approve its lifecycle or technology decisions, or remove it from architecture for future library-routed work.

## 7. Student Dashboard Placement and Protected Foundations

The three-control launcher is proposed as one bounded, full-width region:

- immediately after Current Goal;
- before the existing PB-003 informational foundations;
- outside PB-003B Mission Choice and PB-003C My STEM Work sections.

PB-003A/B/C foundations remain intact. The launcher must not fabricate missions, projects, work, evidence, continuation eligibility, reflection status, completion, or student progress. Existing PB-003B/C presentation, noninteraction, empty-state, privacy, and test contracts remain unchanged.

## 8. Navigation, Accessibility, and Chromebook Contract

Each control must:

- use its exact approved visible label;
- clearly communicate whether it opens Google Sites, Builder, or the local-network Workshop;
- use semantic link behavior appropriate to the destination;
- provide safe new-context behavior with opener isolation for external or local-network destinations;
- preserve the Platform tab, authenticated session, and Student Dashboard context without claiming external success;
- provide a visible focus indicator and logical keyboard order;
- support keyboard and touchpad activation without pointer-only or timed gestures;
- provide a minimum 44-by-44 CSS-pixel target;
- use large, readable labels and icons without icon-only meaning;
- reflow without clipping, overlap, or page-level horizontal scrolling;
- remain usable at supported zoom and respect reduced-motion preferences;
- receive browser and physical Chromebook validation before classroom acceptance.

Browser back/navigation or closing/switching the external tab is the only current return expectation. No callback, deep link, Google return integration, Builder return integration, or Workshop return integration is defined.

If an external destination is unreachable or unauthorized, the Platform must not claim automatic detection, submission, completion, or recovery. Final failure guidance remains separately reviewable.

## 9. Conditional Future Implementation Surface

Subject to review, blocker resolution, read-only inspection, and separate implementation authorization, the expected candidate surface is limited to:

- `platform/scripts/platform-app.mjs`;
- `platform/styles/platform.css` using PB-002H-FIX-01-namespaced presentation;
- one focused PB-002H-FIX-01 test;
- narrow reconciliation of the PB-003A Student Home test only if inspection proves it necessary.

Exact functions, markup, selectors, link handling, styling, test assertions, and regression surface remain non-authoritative until the required read-only inspection. No implementation file is authorized by this section.

## 10. Protected Systems

- PB-001 authentication, roles, routing, guards, sessions, refresh, and sign-out.
- PB-002 teacher systems and approved PB-002H blocked configuration work.
- PB-003A outside the bounded launcher region.
- PB-003B/C behavior, markup ownership, and tests.
- Existing routes, sessions, storage keys, and fixtures.
- Builder entry, behavior, routing, persistence, assets, and internals.
- Workshop routing, behavior, persistence, assets, and internals.
- Google Sites and all Google resources, accounts, permissions, and content.
- PI-000H, PI-000H-A, and all PI-000/PI-001 contracts and stop conditions.
- Dependencies, assets, and unrelated files.

## 11. Explicit Exclusions

This reconciliation does not authorize:

- Activity Registry or Mission Distribution;
- Class Activity Library implementation, routing, assignment, projection, or state;
- student-grade or graduation-year inference;
- teacher-to-student launcher configuration;
- student-specific or small-group routing;
- activity, Goal, Side Path, Directions, Slides, Vids, evidence, or reflection routing inside Platform;
- Google authentication changes, API automation, file creation, copy creation, indexing, permissions management, or integrations;
- analytics, AI, personalization, recommendations, ranking, grading, prediction, or surveillance;
- launch, selection, assignment, completion, evidence, reflection, or progress tracking;
- new persistence, storage, session keys, fixtures, backend, synchronization, providers, APIs, models, schemas, adapters, dependencies, or routes;
- fabricated missions, projects, work, evidence, availability, or continuation state;
- Builder or Workshop changes;
- production governance or deployment;
- staging, committing, tagging, pushing, publishing, or implementation.

## 12. Architecture and Readiness Reconciliation

### Class Activity Library dependency

Using one fixed user-supplied Google Sites Home URL eliminates the PI-000H Class Activity Library data prerequisite **only for this proposed reduced school-start launcher**. The launcher does not need a class assignment, allowed-value resolution, assignment owner result, or student projection to select its Google Sites destination.

This is dependency reduction, not architecture deletion. PI-000H and PI-000H-A remain controlling for future class-library-based behavior, and all their unresolved assignments and decisions remain unchanged.

### Authority gates that still apply

The following accountable gates remain required and `UNASSIGNED`; this document assigns none:

- Product/Content Authority for the three-control purpose, labels, meaning, and honest failure content;
- Privacy Authority for session preservation, external-resource boundaries, data minimization, and account behavior;
- Accessibility/Content Authority for semantics, labels, focus, target size, reflow, and classroom acceptance;
- Technical Architecture Authority for bounded link behavior and protected-system compatibility;
- Technical Operations Authority for availability, support, network expectations, and validation;
- External Google Resource Accountability for Google Sites access, content, permission, and availability;
- School/Classroom Operations Concurrence for school-start workflow and classroom readiness;
- Legal/District Concurrence where applicable for external services and student access.

The PI-000H-specific Assignment Meaning Authority, Class Assignment Authority, and Authoritative Record Owner are not consumed by this fixed-destination UI. They remain `UNASSIGNED` and blocking for future Class Activity Library work, but their absence alone does not select or validate this reduced fixed destination.

### Remaining operational and approval gates

- Google Sites permission, school-account, browser, new-context, opener-isolation, and physical Chromebook validation;
- Workshop classroom-network reachability, browser behavior, and physical Chromebook validation;
- Builder browser smoke without modifying Builder;
- product/content, privacy, accessibility, technical, operations, external-resource, classroom, and applicable legal/district decisions;
- reconciliation review and explicit approval;
- a separate read-only pre-implementation repository inspection;
- separate explicit implementation authorization;
- focused tests, full Platform regression, Builder smoke, Workshop regression, browser rehearsal, and physical Chromebook acceptance after an authorized build.

## 13. Stop Conditions

Stop before implementation when:

- this reconciliation has not passed review and received explicit approval;
- any required authority or concurrence remains unassigned or unverified;
- any URL would need to be inferred, altered, or treated as validated;
- Google Sites or Workshop permission, account, browser, network, or Chromebook behavior is unvalidated;
- implementation would require Class Activity Library state, grade inference, a route, fixture, session/storage key, backend, synchronization, API, adapter, dependency, or protected-system change;
- the three-control scope would expand or PB-003 foundations would be weakened;
- a read-only repository inspection or separate implementation authorization is absent;
- any applicable PI-000 or PI-001 stop condition remains active.

**Current readiness:** `BLOCKED / NOT READY`.

## 14. Approval Meaning

Approval of this reconciliation would establish documentation authority for the reduced three-control school-start UI contract and would supersede the earlier single-action/Class Activity Library UI dependency for this pilot only.

Approval would not invalidate the approved destination inventory or PI-000H architecture, assign authority, resolve lifecycle or technology decisions, validate destinations, create state or data, select implementation details, modify Builder or Workshop, authorize application/test changes, or authorize implementation.

## Exact Next Gate

`/REVIEW` — **PB-002H-FIX-01 School-Start Launcher Scope Reconciliation v1.0**
