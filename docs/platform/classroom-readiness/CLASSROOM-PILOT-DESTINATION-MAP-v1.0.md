# Classroom Pilot Destination Map v1.0

**Document Status:** Proposed destination map pending review and approval  
**Implementation Status:** Not authorized  
**Operation Type:** Documentation only  
**Documentation Boundary:** Classroom Readiness Sprint

## Purpose

Define the verified launch-destination meanings used by the Classroom Readiness Sprint so a future Student Activity Launcher can be implemented without inventing destinations, URLs, resources, ownership, or integration behavior.

This map records destination meaning and the explicit Builder, Workshop, and Student Home classroom-pilot destinations. It does not implement a launcher or make a destination with a pending URL launch-ready.

## Destination Status Rules

- An enabled launcher control requires an exact destination recorded here and separately reviewed.
- `PENDING URL ENTRY` means no enabled launcher control may be created.
- No URL, resource, file, template, route, owner, or permission may be inferred or fabricated.
- Opening a destination does not create student work, evidence, reflection, progress, completion, or ownership.
- Pilot destination approval does not authorize production integration, persistence, automation, analytics, or data exchange.

## Approved Destination Contracts

### 1. Activity Directions

**Destination type:** Google Slides `ACTIVITY DIRECTIONS` presentation  
**Selection rule:** The destination must correspond to the teacher-selected activity.  
**Exact URL status:** `PENDING URL ENTRY`

The destination type is approved. No specific presentation or URL is approved or launch-ready until an exact verified URL is entered and separately reviewed.

### 2. Google Slides Evidence

**Destination type:** Student's year-long Google Slides Engineering Notebook / Evidence Portfolio  
**Exact URL status:** `PENDING URL ENTRY`

Rules:

- Students continue using the same notebook across activities.
- The classroom pilot may use the existing approved student notebook destination only after its exact verified URL is supplied and separately reviewed.
- Future automation may add activity-specific evidence slides based on activity choice, but that automation is outside this pilot and is not authorized here.
- This map does not assign notebook ownership, permissions, evidence meaning, adapter authority, or lifecycle behavior.

### 3. Google Vids Evidence

**Destination type:** New Google Vids evidence copy for the selected activity  
**Exact URL/template destination status:** `PENDING URL ENTRY`

Rules:

- A new Vids copy is required for each activity.
- Future work must define how separate Vids projects are compiled or indexed.
- Copy creation, template duplication, indexing, automation, permissions, and lifecycle behavior are not defined or authorized by this map.
- No enabled launcher control may exist until the exact verified URL or approved template destination is entered and separately reviewed.

### 4. Reflection

**Destination type:** Existing What I Learned Today Google Form  
**Source rule:** The form remains the only approved reflection source.  
**Exact URL status:** `PENDING URL ENTRY`

This map does not create a reflection editor, duplicate reflection collection, submission-status integration, or response-data connection.

### 5. Builder

**Pilot destination:** Existing repository-root Builder entry, `index.html`  
**Destination status:** Explicitly recorded for classroom-pilot use

Rules:

- The existing root Builder entry is the classroom-pilot Builder destination.
- Builder launch behavior must not be modified.
- Opening Builder must not imply mission distribution, project creation, progress, evidence, completion, or persistence.
- Production launch, return, identity, save, and integration architecture remain separate future work.

### 6. Workshop

**Pilot destination:** `http://192.168.1.252:8000`  
**Destination type:** Classroom-pilot local-network Workshop endpoint  
**Destination status:** Explicitly recorded for classroom-pilot use

Rules:

- This endpoint is approved only as the classroom-pilot destination.
- Students must be connected to a network that can reach this address.
- Workshop routing and internals must not be redesigned or modified.
- Availability outside the applicable local network is not promised.
- Stable hosted Workshop routing remains future work.
- Opening Workshop must not imply project creation, progress, evidence, completion, or persistence.

### 7. Return to Student Home

**Pilot destination:** Existing PB-003A Student Home route, `#/student/dashboard`  
**Destination status:** Verified existing Platform route

Rules:

- Return must use the existing authorized student route and route guard.
- Return must not create a new route, session key, persistence record, or navigation owner.
- Existing authentication, role, session, refresh, and sign-out boundaries remain controlling.

## Destination Readiness Summary

| Destination | Meaning/type approved | Exact destination recorded | Launcher-ready from this map alone |
| --- | --- | --- | --- |
| Activity Directions | Yes | No — `PENDING URL ENTRY` | No |
| Google Slides Evidence | Yes | No — `PENDING URL ENTRY` | No |
| Google Vids Evidence | Yes | No — `PENDING URL ENTRY` | No |
| What I Learned Today | Yes | No — `PENDING URL ENTRY` | No |
| Builder | Yes | Yes — repository-root `index.html` | No; implementation and governance remain separately gated |
| Workshop | Yes | Yes — `http://192.168.1.252:8000` | No; implementation, network verification, and governance remain separately gated |
| Return to Student Home | Yes | Yes — `#/student/dashboard` | No; launcher implementation remains separately gated |

## Future Teacher Availability Model

A future Teacher Activity Launcher may allow any approved combination of:

- a specific activity;
- a goal with student activity choice;
- an entire Side Path;
- Builder;
- Workshop;
- Builder + Workshop;
- Google Slides Evidence;
- Google Vids Evidence;
- What I Learned Today.

This availability model is conceptual future scope only. It is not implemented or authorized by this map. It creates no assignment, distribution, recipient-selection, roster, persistence, activity, mission, or availability behavior.

## Pilot Curriculum Grouping

- Grade 3 and Grade 4 classes use Grade 3 activities.
- Grade 5 and Grade 6 classes use Grade 5 activities.

This grouping records the classroom-pilot curriculum rule only. It does not identify activities, select directions, populate resources, create a registry, or infer a student's grade or class.

## Pilot Recipient Scope

The classroom-readiness version is limited to the entire class.

The map does not authorize individual or subgroup targeting, roster-derived behavior, recipient persistence, or distribution records.

## Future and Explicitly Excluded Scope

- Selected-student overrides.
- Small-group overrides.
- A specific activity or slide within a Side Path.
- Activity Registry.
- Mission Distribution.
- Production routing.
- Cloud persistence.
- Google copy or template automation.
- Production Builder or Workshop launch/return architecture.
- Analytics, tracking, recommendations, AI, grading, ranking, prediction, or surveillance.
- New authentication, session keys, storage, ownership models, adapters, APIs, providers, or dependencies.

## Governance and Ownership Boundary

This map:

- approves destination meaning/type and records the user-explicit Builder, Workshop, and Student Home pilot destinations;
- does not claim that any Google destination is launch-ready before its exact verified URL is entered and separately reviewed;
- does not assign Google resource ownership, evidence ownership, adapter authority, privacy authority, persistence authority, or any accountable party;
- does not override PI-000 or PI-001 governance stop conditions except to record the user-explicit Builder root and Workshop local pilot destinations;
- does not authorize application or test changes, enabled launcher controls, production integration, or deployment.

All PI-000G-A authority assignments remain `UNASSIGNED` unless changed by a separate verified approval record.

## Protected Systems

- PB-001 Platform authentication, roles, routes, session, refresh, and sign-out behavior.
- PB-002 teacher systems and Student Display.
- PB-003A Student Home, PB-003B Mission Choice, and PB-003C My STEM Work foundations.
- Builder behavior, navigation, missions, work, persistence, and assets.
- Workshop behavior, routing, rendering, geometry, camera, measurements, Tool Chest, Smart Board, restoration, persistence, and assets.
- Existing Platform routes, fixtures, session keys, storage, dependencies, and assets.
- Approved PI-000 and PI-001 ownership, privacy, evidence, lifecycle, adapter, and authority boundaries.

## Remaining Launcher Blockers

- Exact verified Activity Directions URL for each teacher-selected pilot activity.
- Exact verified year-long Google Slides Engineering Notebook / Evidence Portfolio URL.
- Exact verified Google Vids activity-copy or template destination URL.
- Exact verified What I Learned Today Google Form URL.
- Separate review of every entered URL and its classroom accessibility.
- Required privacy, content, accessibility, technical, operational, Builder, Workshop, external-source, and adapter authority approvals.
- A separately reviewed launcher specification defining safe external-link behavior, focus/return behavior, unavailable states, Chromebook behavior, and tests.
- Separate explicit implementation authorization.
- Classroom-network verification for the Workshop endpoint.

## Stop Conditions

Stop before enabling a launcher destination if:

- its exact destination is `PENDING URL ENTRY`;
- a URL, resource, route, permission, owner, activity, template, or content would need to be inferred;
- the destination has not received separate review;
- an applicable authority remains unavailable or `UNASSIGNED`;
- implementation would alter Builder, Workshop, PB-001, PB-002, PB-003A/B/C, routing, sessions, fixtures, storage, dependencies, or assets;
- Mission Distribution, Activity Registry, production integration, persistence, analytics, automation, or another excluded feature would be introduced;
- the local Workshop endpoint cannot be reached from the classroom network;
- an enabled control could create a dead end.

## Approval Meaning

Approval of this map would approve only the recorded destination meanings, explicit pilot destinations, grouping, recipient scope, exclusions, and stop conditions for subsequent documentation and inspection.

Approval would not authorize implementation, enable a control, validate a pending URL, assign authority, modify application or test files, alter Builder or Workshop, or permit staging, committing, tagging, pushing, or publishing.

## Exact Next Gate

`/REVIEW` — **Classroom Pilot Destination Map v1.0**
