# PB-002J — Single-Activity Technology B Final Manifest Reconciliation v1.0

**Status:** `REVIEW RECONCILED / PENDING FINAL POST-RECONCILIATION REVIEW / IMPLEMENTATION UNAUTHORIZED`  
**Document type:** Single-activity catalog, source-integrity, operational-destination, and implementation-manifest reconciliation; not implementation, source publication, deployment, or release authorization  
**Effective date:** August 23, 2026  
**Purpose:** Reconcile the approved Technology B prototype manifest to the sole approved initial student-available Activity Mission, `pb002j-am-g05-005` version `2`, while preserving the approved service, security, file-scope, and fail-closed boundaries.

## 1. Controlling Boundary

This reconciliation is controlled by the approved PB-002J class-wide prototype decisions, Technology B manifest, first-batch correction and version decisions, formal reverification evidence, and Initial Student-Available Activity Mission Approval Record v1.0.

The prototype remains limited to:

- one class-wide classroom-network session;
- Grade 5, Goal 1 — Build a Shelter;
- `pb002j-am-g05-005` version `2` — Design a Space Bedroom;
- explicit teacher confirmation;
- one student-safe class-wide projection; and
- memory-only Technology B state.

It excludes every other Activity Mission, every Side Path, Grade 6, cross-grade selection, individual-student and small-group assignment, production persistence, Google integration, source publication, Builder or Workshop modification, Cloudflare deployment, and production release.

## 2. Corrected Seed Decision

The former version-`1`-only seed contract is superseded for this bounded prototype.

| Field | Controlling value |
|---|---|
| Catalog ID | `pb002j-catalog-single-activity` |
| Catalog version | `1` |
| Stable Activity Mission ID | `pb002j-am-g05-005` |
| Activity Mission version | `2` |
| Display name | Design a Space Bedroom |
| Grade | `pb002j-grade-05` — Grade 5 |
| Parent Goal | `pb002j-g05-goal-01` — Build a Shelter |
| Curriculum availability | `approved` for this exact ID and version only |
| Operational launchability | Fail closed until the directions-destination contract in Section 6 is satisfied |

Version `1` remains preserved historical source evidence. It is not student-available, must not be loaded as a fallback, and must not be silently relabeled as version `2`.

## 3. Exact One-Activity Catalog JSON Contract

The implementation seed, if separately authorized, must be exactly one UTF-8 JSON document at:

`platform/data/pb-002j-single-activity-catalog.v1.json`

Its complete allowed structure is:

```json
{
  "schemaVersion": 1,
  "catalog": {
    "id": "pb002j-catalog-single-activity",
    "version": 1,
    "scope": "classWidePrototype",
    "grades": [
      {
        "id": "pb002j-grade-05",
        "version": 1,
        "displayName": "Grade 5"
      }
    ],
    "goals": [
      {
        "id": "pb002j-g05-goal-01",
        "version": 1,
        "gradeId": "pb002j-grade-05",
        "displayName": "Build a Shelter"
      }
    ],
    "activityMissions": [
      {
        "id": "pb002j-am-g05-005",
        "version": 2,
        "gradeId": "pb002j-grade-05",
        "goalId": "pb002j-g05-goal-01",
        "displayName": "Design a Space Bedroom",
        "recordType": "activityMission",
        "lifecycleStatus": "active",
        "studentAvailabilityStatus": "approved",
        "replaces": {
          "id": "pb002j-am-g05-005",
          "version": 1
        },
        "source": {
          "filename": "Design-a-Space-Bedroom-Corrected-Directions-v2.2.pptx",
          "sha256": "806c738a58f6b85c525b35865cf3711435fee4d4210f14213dcf99c653203dc7",
          "publicationStatus": "notPublished",
          "checksumStatus": "approvedChecksumRecorded"
        },
        "directions": {
          "destinationType": "teacherSchoolControlledStudentReadableExternalPresentation",
          "urlSource": "startupConfiguration",
          "url": null,
          "status": "pendingVerifiedUrl",
          "openMode": "newTab",
          "openerIsolation": "noopener-noreferrer"
        },
        "engineeringLevels": [
          "habitatDesigner",
          "humanFactorsEngineer",
          "masterSpaceHabitatDesigner"
        ],
        "creationRoutes": [
          "paperPlanningAndDrawing",
          "teacherApprovedPhysicalModel"
        ],
        "preparation": {
          "alwaysRequired": [
            "pencil",
            "designPaper",
            "ruler",
            "markers",
            "engineeringDesignPlanningSheet",
            "scaleDrawingBlueprintSheet",
            "chromebook",
            "schoolApprovedGoogleAccess",
            "teacherAssignedEngineeringLevel",
            "teacherApprovedCreationRoute",
            "teacherConfirmedEvidenceLocation"
          ],
          "conditional": [
            "cameraAccessWhenEvidenceRequiresIt",
            "teacherApprovedModelMaterialsForPhysicalModelRoute",
            "teacherApprovedGoogleVidsAccessForOptionalVideoEvidence"
          ]
        },
        "toolAvailability": {
          "builder": false,
          "workshop": false
        },
        "evidence": {
          "destination": "Student Engineering Notebook / Evidence Portfolio",
          "boundary": "externalNavigationOrCurriculumInstructionOnly",
          "failureBehavior": "stopAndAskTeacher"
        },
        "safetyBoundary": "contextualClassroomWordingOnly"
      }
    ],
    "sidePathTopics": [],
    "sidePathActivities": []
  }
}
```

### 3.1 Schema invariants

Startup must reject the seed before listening unless all of the following are true:

- the document has exactly one grade, one Goal, and one Activity Mission;
- the only Activity Mission is `pb002j-am-g05-005` version `2`;
- its grade and Goal relationships match the contract above;
- its source checksum matches Section 4;
- `builder` and `workshop` are both `false`;
- Side Path arrays are empty;
- no Grade 6, cross-grade, recipient, student, roster, evidence, progress, or individual-assignment data exists; and
- no omitted or unknown record is inferred from the prior Grades 3–5 seed.

Catalog membership does not bypass operational readiness. The student projection must omit the Start choice while the exact directions URL, required preparation, selected creation route, permissions, or evidence location is unresolved.

## 4. Corrected-Source Checksum and Private Verification

Controlling corrected source:

`/Users/jenniferwilliams/Documents/Codex/2026-08-23/PB-002J-first-batch-v2.2/Design-a-Space-Bedroom-Corrected-Directions-v2.2.pptx`

Approved SHA-256:

`806c738a58f6b85c525b35865cf3711435fee4d4210f14213dcf99c653203dc7`

The source remains outside the repository and outside the Platform public artifact. It must not be copied into the implementation seed, served by Technology B, committed, uploaded, or published by this work.

### 4.1 Verification workflow without source publication

1. Before starting Technology B, the operator supplies the local controlling-source path through a required startup argument, `--approved-source`.
2. The startup process reads the file locally and computes SHA-256 in memory.
3. Startup compares the computed digest using constant-time byte comparison with the approved checksum embedded in the one-activity catalog contract.
4. A missing file, unreadable file, non-file target, changed digest, wrong ID/version, or malformed seed stops startup before any network listener opens.
5. The source bytes, source path, and presentation content are never returned by an endpoint, written to a log, copied into browser storage, or included in projection data.
6. Health may report only `sourceVerified: true|false`, the approved Activity Mission ID/version, and catalog version. It must not report the local source path.

The catalog field `approvedChecksumRecorded` means only that the controlling approval record supplied the expected checksum. It does not claim that runtime verification has occurred. Runtime verification is established separately only after startup computes the local file checksum and confirms an exact match.

This runtime verification establishes local correspondence to the approved corrected source. It does not prove that an external browser copy is identical; that requires the separately approved exact destination record and matching runtime destination validation in Section 6.

## 5. Approved Activity Operation Contract

### 5.1 Engineering levels

The teacher may select only one of the three levels contained in the approved Version 2 directions:

1. `habitatDesigner` — design one astronaut bedroom;
2. `humanFactorsEngineer` — include storage, lighting, sleeping space, work area, and personal items; or
3. `masterSpaceHabitatDesigner` — design a complete living suite with sleeping, exercise, hygiene, work, and relaxation spaces.

No level is preselected. An unavailable level remains unavailable and receives no inferred substitute.

### 5.2 Approved creation routes

The manifest permits only:

- `paperPlanningAndDrawing`; and
- `teacherApprovedPhysicalModel`, only when the teacher confirms suitable materials, supervision, and classroom rules.

Google Slides and Google Vids are approved evidence-presentation routes under the activity-specific evidence contract; they are not silently reclassified as creation routes. The Platform must not invent a Google Draw, Builder, Workshop, fabrication, or other route.

### 5.3 Preparation requirements

Before confirmation, the teacher must attest to:

- the selected engineering level;
- the selected creation route;
- pencil, design paper, ruler, markers, planning sheet, Engineering Design Planning Sheet, and Scale Drawing/Blueprint sheet;
- Chromebook access;
- camera access when the selected evidence route requires it;
- school-approved Google access needed for directions or evidence;
- teacher-approved physical-model materials and supervision when that route is selected;
- the exact Student Engineering Notebook / Evidence Portfolio activity entry or teacher-designated location; and
- any optional Google Vids route and its school-approved access.

Missing preparation fails without replacing the last confirmed configuration. No invented tool, material, permission, or evidence route is allowed.

### 5.4 Builder and Workshop availability

For this single-activity manifest:

```text
Builder availability: false
Workshop availability: false
```

The approved corrected directions do not establish Builder or Workshop as creation routes for this Activity Mission. Their existing systems, launcher controls, routes, internals, storage, and behavior remain unchanged.

## 6. Browser-Accessible Activity Directions Destination

The approved destination contract is:

**A teacher- or school-controlled, student-readable external presentation of the checksum-approved Version 2 directions, opened as a semantic HTTPS link in a new tab with `noopener` and `noreferrer`.**

No exact browser-accessible URL has been supplied or approved by the controlling records. An operator statement or startup value cannot approve a destination. Therefore:

- the seed stores no URL;
- no curriculum source is published by this reconciliation;
- a separate controlling destination record must approve the exact student-readable HTTPS URL and bind it to `pb002j-am-g05-005` version `2` before startup may accept it;
- startup requires `--directions-url <approved-student-readable-https-url>` and must confirm an exact normalized match with that separately approved destination record;
- the URL is held in Technology B process memory only and is not committed;
- only `https:` is accepted; credentials, fragments containing secrets, local file URLs, `javascript:`, `data:`, and classroom-private IP URLs are rejected;
- the teacher must confirm student/school-account access and Chromebook navigation for that exact approved URL before class-wide confirmation; and
- until an exact URL is separately supplied, verified, and approved, `directions.status` remains `pendingVerifiedUrl` and the Activity Mission is omitted from the student Start projection.

A missing destination record, unapproved URL, mismatch after safe normalization, redirect to an unapproved destination, inaccessible resource, permission failure, or incomplete Chromebook validation fails closed. It must not be replaced by an operator attestation, a Mission Hub landing page, a local file path, a nearby curriculum link, or another inferred destination.

Technology B does not authenticate to, inspect, ingest, synchronize, modify, provision, or store the external presentation. A URL approval does not authorize Google APIs or source publication by the Platform.

**Remaining operational blocker:** an exact student-readable HTTPS Activity Directions URL and its student-permission/Chromebook validation evidence remain required before a functional Start choice may appear.

## 7. Preserved Technology B Endpoint and Security Boundary

The exact endpoint set remains unchanged:

| Method | Endpoint | Access |
|---|---|---|
| `GET` | `/api/pb-002j/v1/health` | Classroom network; student-safe readiness only |
| `GET` | `/api/pb-002j/v1/catalog` | Temporary teacher key |
| `GET` | `/api/pb-002j/v1/projection` | Classroom network; confirmed student-safe class-wide state only |
| `PUT` | `/api/pb-002j/v1/configuration` | Temporary teacher key |
| `POST` | `/api/pb-002j/v1/withdrawals` | Temporary teacher key |
| `OPTIONS` | `/api/pb-002j/v1/catalog`, `/configuration`, `/withdrawals` | Exact approved Platform origin only |

Preserved requirements:

- one memory-only Node service per classroom prototype session;
- explicit opaque `classContextId` at startup; never inferred;
- high-entropy temporary teacher key in process/page memory only;
- no cookies, credentials mode, production authentication, database, filesystem persistence, browser storage, Google API, or Cloudflare storage;
- exact startup `--platform-origin`; never `*`, reflected origins, lists, or `null`;
- allowed request headers only `Authorization`, `Content-Type`, `If-Match`, and `X-PB-002J-Request-Id`;
- atomic, idempotent, revision-protected confirmation and withdrawal;
- honest empty/reset/unavailable behavior after startup, restart, loss, timeout, rejection, or authorization failure; and
- verified Continue work remains protected and independent.

The approved startup contract is reconciled only by replacing the catalog path and adding the two fail-closed source/destination inputs:

```text
node scripts/start-classroom-prototype.mjs \
  --host 0.0.0.0 \
  --port 8783 \
  --platform-origin http://<classroom-host>:8782 \
  --class-context-id <approved-opaque-class-context-id> \
  --catalog platform/data/pb-002j-single-activity-catalog.v1.json \
  --approved-source <local-path-to-approved-version-2-pptx> \
  --directions-url <exact-url-from-separately-approved-destination-record>
```

The service must not listen if required validation fails.

## 8. Preserved Fourteen-File Maximum Implementation Surface

If implementation is separately authorized, the maximum surface remains fourteen files.

### 8.1 New files

1. `scripts/start-classroom-prototype.mjs`
2. `platform/scripts/pb-002j-classwide-contract.mjs`
3. `platform/scripts/pb-002j-classwide-client.mjs`
4. `platform/scripts/pb-002j-classwide-controller.mjs`
5. `platform/data/pb-002j-single-activity-catalog.v1.json`
6. `tests/platform/pb-002j-classwide-contract.test.mjs`
7. `tests/platform/pb-002j-classwide-service.test.mjs`
8. `tests/platform/pb-002j-classwide-teacher.test.mjs`
9. `tests/platform/pb-002j-classwide-student-projection.test.mjs`

### 8.2 Existing files permitted narrow change

10. `platform/scripts/platform-app.mjs`
11. `platform/styles/platform.css`
12. `tests/platform/pb-002a-command-board-layout.test.mjs`
13. `tests/platform/pb-003a-student-home-experience.test.mjs`
14. `tests/platform/pb-003b-mission-choice-experience.test.mjs`

No fifteenth file is authorized. The corrected PowerPoint is an external controlling source, not an implementation file. Expansion stops for review.

Protected files and systems remain `platform/scripts/todays-mission.mjs`, `platform/scripts/platform-session.mjs`, `platform/scripts/platform-fixtures.mjs`, routes, login behavior, fixtures, PB-002I, the School-Start Launcher, PB-003C, Continue-current-work ownership, Builder, Workshop, and unrelated files.

## 9. Availability and Fail-Closed Rules

- The approved curriculum subset contains exactly `pb002j-am-g05-005@2`.
- Every other Activity Mission and every other version remains unavailable.
- Goal selection never implicitly exposes an Activity Mission.
- Catalog approval does not equal operational projection.
- The teacher must explicitly select the activity, one engineering level, one permitted creation route, required preparation, evidence location, Builder `false`, and Workshop `false` before confirmation.
- The service must verify the source checksum and directions destination before accepting confirmation.
- The student projection contains no Activity Mission unless all prerequisites are current and confirmed.
- Removal or emergency withdrawal prevents new Starts without deleting, hiding, or mutating independently verified Continue work.
- No stale browser state, fixture, PB-002I value, failed request, prior service session, or omitted catalog record may restore availability.

## 10. Implementation Status and Next Gate

Implementation remains `BLOCKED / UNAUTHORIZED` pending:

1. review and approval of this reconciliation;
2. supply and explicit approval of the exact student-readable HTTPS Activity Directions URL;
3. student/school-account and physical Chromebook validation of that destination; and
4. a separate bounded `/BUILD` authorization naming this fourteen-file maximum surface.

This document does not modify application or test files, publish the corrected source, start Technology B, make the Activity Mission visible to students, stage, commit, push, or deploy.

Exact next gate:

```text
/REVIEW

PB-002J — Single-Activity Technology B
Final Manifest Reconciliation v1.0 — Final Post-Reconciliation Review
```
