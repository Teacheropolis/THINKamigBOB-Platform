# PB-002J — Design a Space Bedroom Browser-Accessible Activity Directions Destination Record v1.0

**Status:** `EXACT DESTINATION ASSIGNED AND APPROVED / PENDING RECORD REVIEW AND PHYSICAL CHROMEBOOK VALIDATION / ACTIVITY FAIL CLOSED / IMPLEMENTATION UNAUTHORIZED`  
**Document type:** External Activity Directions destination decision record; not source publication, Platform implementation, Google integration, deployment, or student-launch authorization  
**Effective date:** August 23, 2026  
**Purpose:** Define the exact approval, integrity, access, and operational contract for the browser-accessible Activity Directions destination associated with `pb002j-am-g05-005` version `2`, Design a Space Bedroom.

## 1. Controlling Boundary

This record is controlled by:

- PB-002J Initial Student-Available Activity Mission Approval Record v1.0;
- PB-002J Single-Activity Technology B Final Manifest Reconciliation v1.0;
- the approved Design a Space Bedroom Version 2.2 corrected-source reverification; and
- the approved class-wide, single-activity Technology B boundary.

This record applies only to:

| Field | Controlling value |
|---|---|
| Stable Activity Mission ID | `pb002j-am-g05-005` |
| Activity Mission version | `2` |
| Display name | Design a Space Bedroom |
| Grade | Grade 5 |
| Goal | Goal 1 — Build a Shelter |
| Destination purpose | Student-readable Activity Directions only |

No destination approval is inherited by another Activity Mission, version, Goal, grade, Side Path, evidence resource, form, Builder, or Workshop.

## 2. Controlling Corrected Source

| Field | Controlling value |
|---|---|
| Filename | `Design-a-Space-Bedroom-Corrected-Directions-v2.2.pptx` |
| Private controlling-source path | `/Users/jenniferwilliams/Documents/Codex/2026-08-23/PB-002J-first-batch-v2.2/Design-a-Space-Bedroom-Corrected-Directions-v2.2.pptx` |
| Approved SHA-256 | `806c738a58f6b85c525b35865cf3711435fee4d4210f14213dcf99c653203dc7` |
| Formal reverification | `PASS / NO REQUIRED REVISIONS` |
| Publication status | `NOT PUBLISHED BY THIS RECORD` |

The local source remains private and outside the repository and Platform public artifact. Its path must not be exposed to students or returned by Technology B.

## 3. Required Browser Destination

The approved destination type is:

```text
A teacher- or school-controlled, student-readable HTTPS presentation
containing the approved Design a Space Bedroom Version 2 directions.
```

Required behavior:

- open as a semantic external link;
- open in a new browser tab;
- use `noopener` and `noreferrer` opener isolation;
- require no editor access;
- require no teacher-only permission;
- request no unexpected student permission;
- support the school-managed Chromebook and student/school Google account;
- preserve a clear browser Back or tab-close return workflow; and
- contain no Platform API, Google API, ingestion, synchronization, or provisioning behavior.

## 4. Exact Destination Entry

| Field | Recorded value |
|---|---|
| Exact student-readable HTTPS URL | `https://docs.google.com/presentation/d/1GzkVODaIdAweiSCuFxJC3NOAQEE8GmwdMO7z05Inx64/edit?usp=drivesdk` |
| Destination owner/account | Teacheropolis Google account |
| Destination title | Design a Space Bedroom — Activity Directions |
| Activity Mission binding | `pb002j-am-g05-005` version `2` |
| Source-fidelity evidence | User-supplied confirmation that this destination was created from `Design-a-Space-Bedroom-Corrected-Directions-v2.2.pptx`, whose approved SHA-256 is `806c738a58f6b85c525b35865cf3711435fee4d4210f14213dcf99c653203dc7` |
| Student permission model | User-supplied confirmation that students can view through their school accounts without editor access; pending physical validation |
| Teacher/editor permission required | `NO` for student use |
| Redirect behavior | `PENDING VALIDATION` |
| Chromebook validation | `NOT YET RECORDED` |
| Approval status | `EXPLICITLY APPROVED BY JENNIFER WILLIAMS / PENDING RECORD REVIEW AND OPERATIONAL VALIDATION` |

No URL may be inferred from a Mission Hub, Drive folder, neighboring activity, original Version 1 source, local file path, browser history, or operator recollection.

## 5. Destination-to-Source Integrity Contract

The browser destination must be traceably derived from the checksum-approved Version 2 source.

Before destination approval, the destination record must include:

1. the exact HTTPS URL;
2. the accountable destination owner or school-controlled account;
3. evidence that the destination presents `pb002j-am-g05-005` version `2`;
4. a comparison against the approved corrected source confirming that required directions, engineering levels, creation routes, evidence wording, contextual-safety boundary, sharing language, and approved corrections remain intact;
5. confirmation that no unresolved or unapproved content was added;
6. the reviewer, review date, and comparison evidence; and
7. explicit destination approval.

The external presentation need not share the PowerPoint file checksum because conversion to a hosted presentation may change its bytes. Instead, the private PowerPoint checksum establishes the controlling source, and a documented content-and-structure comparison establishes destination fidelity.

Technology B must separately verify the private controlling-source checksum at startup. That runtime checksum verification does not approve or validate the external URL.

## 6. URL Validation Contract

Before the URL can enter Technology B runtime configuration, validation must confirm:

- scheme is exactly `https:`;
- hostname and complete normalized URL exactly match the separately approved destination entry;
- the URL contains no embedded credentials or secrets;
- the destination does not redirect to an unapproved host or resource;
- the published/student-facing presentation loads successfully;
- students can read every required direction without editor access;
- all required links and navigation within the presentation are accessible;
- no dead-end enabled control exists;
- permissions work through the intended student/school account;
- keyboard navigation works;
- touchpad navigation works;
- browser Back or tab close returns safely; and
- the presentation is readable at `1204×695` CSS pixels and DPR `1.25`.

The startup `--directions-url` value must match this separately approved exact URL. An operator statement, runtime argument, or teacher key cannot create destination approval.

## 7. Fail-Closed Behavior

The Activity Mission must be omitted from the student Start projection when any of the following is true:

- exact URL is absent;
- destination record is unapproved;
- supplied URL does not exactly match the approved normalized URL;
- destination ownership is unverified;
- destination fidelity to Version 2 is unverified;
- source checksum verification fails;
- redirect target is unapproved;
- student access or permissions fail;
- directions are incomplete or changed;
- Chromebook validation is incomplete or failed; or
- the destination is unavailable.

Failure must not:

- expose Version 1;
- publish the private source;
- substitute the general Mission Hub;
- substitute another Activity Mission or directions deck;
- fall back to a local path, fixture, PB-002I value, browser cache, or stale Technology B projection;
- infer a Google Drive or Google Sites destination; or
- replace a previously confirmed class configuration.

The teacher receives an honest unavailable state. Independently verified Continue work remains protected.

## 8. External-System Boundary

The Platform provides only semantic external navigation to the approved destination.

The Platform and Technology B do not:

- create or publish the presentation;
- authenticate to Google;
- call a Google API;
- read, import, inspect, ingest, synchronize, or modify Google data;
- provision permissions;
- store the external presentation contents;
- expose the private source file;
- determine external retention or sharing policy; or
- infer that a URL remains valid after its content, owner, permissions, or destination changes.

Any later destination replacement requires a new exact URL, source-fidelity review, permission validation, physical Chromebook validation, and explicit approval before use.

## 9. Required Physical Validation Record

The teacher-performed validation record must report `PASS` or `FAIL` for:

1. exact approved URL opens;
2. correct Design a Space Bedroom Version 2 directions appear;
3. no editor access is required;
4. student/school Google permissions work;
5. all directions are readable;
6. required internal links/navigation work;
7. no unexpected permission screen appears;
8. no dead end is present;
9. keyboard navigation works;
10. touchpad navigation works;
11. browser Back/tab-close return works;
12. Chromebook presentation at `1204×695` CSS pixels and DPR `1.25` is acceptable; and
13. no problems were found that would prevent classroom use.

The physical record validates access and presentation only. It does not authorize Platform implementation or source publication.

## 10. Explicit Approval Statement

The following user-supplied statement is recorded exactly in substance:

```text
I approve this exact HTTPS destination as the student-readable Activity
Directions for pb002j-am-g05-005 version 2. I confirm that it presents the
approved corrected directions and that students require view access only.
```

This approval binds only the exact URL recorded in Section 4 to `pb002j-am-g05-005` version `2`. It does not approve a redirected, copied, replaced, republished, or edited destination.

## 11. Current Decision Status

The exact destination, owner/account, title, source-fidelity statement, student-permission basis, and approval statement have been supplied. The destination record still requires review, and physical Chromebook validation remains outstanding.

Therefore:

```text
directions.status = approvedUrlPendingOperationalValidation
studentStartProjection[pb002j-am-g05-005@2] = unavailable
```

Curriculum availability and exact-destination approval for `pb002j-am-g05-005` version `2` remain intact. Operational Start availability remains fail-closed until the record review and required physical validation pass.

## 12. Prohibitions

This record does not authorize:

- uploading, converting, copying, or publishing the corrected PowerPoint;
- creating or changing a Google Slides, Sites, or Drive resource;
- Platform or Technology B implementation;
- application or test modification;
- source publication or deployment;
- Google integration or API access;
- another Activity Mission, Side Path, Builder, or Workshop route;
- student-specific, small-group, cross-grade, or Grade 6 behavior;
- staging, commit, tag, push, or release.

## 13. Exact Next Gate

Review the assigned destination record using:

```text
/REVIEW

PB-002J — Design a Space Bedroom
Browser-Accessible Activity Directions Destination Record v1.0
```

Implementation remains unauthorized.
