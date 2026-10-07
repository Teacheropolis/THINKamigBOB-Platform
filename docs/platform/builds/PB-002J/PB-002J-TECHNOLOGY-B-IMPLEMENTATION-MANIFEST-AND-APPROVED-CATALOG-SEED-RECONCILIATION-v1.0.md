# PB-002J — Technology B Implementation Manifest and Approved Catalog Seed Reconciliation v1.0

**Status:** `REVIEW RECONCILED / CANDIDATE AVAILABILITY LIST RECORDED / PENDING POST-RECONCILIATION REVIEW / IMPLEMENTATION UNAUTHORIZED`  
**Document type:** Technology-selection, implementation-manifest, and catalog-seed reconciliation; not implementation, deployment, publication, production approval, or student-availability approval  
**Effective date:** August 14, 2026  
**Purpose:** Record the selected classroom-network prototype technology, exact bounded implementation surface, approved accountable assignments, stable catalog identities, source traceability, unavailable records, and review gate for the PB-002J class-wide prototype.

## 1. Controlling Boundary

This reconciliation is controlled by the approved PB-002J Blueprint, Design Decisions, Build Specification, scope reconciliations, curriculum-source records, PI-000H, PI-001, PI-000I, and PI-000I-A.

The prototype includes class-wide Grades 3–5 configuration only. It excludes individual-student and small-group assignments, cross-grade assignment, Grade 6, production persistence, production automation, analytics, AI, Google ingestion, Builder or Workshop modification, and reinterpretation of PB-002I Today’s Mission.

Catalog identity in this document does not itself approve student availability. Every record remains fail-closed until its applicable source, directions, preparation, destination, safety, accessibility, and operational requirements are satisfied.

## 2. Approved Assignments

The following user-supplied assignments are recorded within the approved class-wide prototype scope:

| Responsibility | Accountable role/party | Scope and limit |
|---|---|---|
| Curriculum Catalog Owner | Jennifer Williams | Grades 3–5 THINKamigBOB curriculum catalog within the documented authorship/source scope |
| Stable Identity and Version Authority | Jennifer Williams | Assign and maintain immutable prototype catalog identities, versions, replacements, withdrawals, and retirements |
| Catalog Maintenance and Correction Owner | Jennifer Williams | Maintain source traceability, approved display names, corrections, replacements, withdrawals, and review records |
| THINKamigBOB Product Owner | Jennifer Williams | Authorize the bounded PB-002J class-wide product meaning and prototype decisions |
| Class-wide Mission Distribution Owner | Jennifer Williams | Confirm no more than three verified primary Activity Mission Start choices for one class-wide prototype session |
| Class-wide Activity and Side Path Availability Owner | Jennifer Williams | Confirm explicit class-wide availability; Goal selection never implicitly exposes activities |
| One Class-wide Current Focus Owner | Jennifer Williams | Maintain one non-personalized classroom focus |
| Student Projection Owner | Jennifer Williams | Authorize the class-wide student-safe projection consumed by PB-003B |

These assignments do not establish substantive safety, legal, district privacy-office, general cybersecurity, production operations, or customer-deployment authority beyond separately approved evidence.

## 3. Selected Technology — Technology B

**Selection:** `TECHNOLOGY B — CLASSROOM-NETWORK, MEMORY-ONLY PROTOTYPE SERVICE`.

One service process represents one classroom prototype session. It runs on the classroom network, stores confirmed PB-002J state in process memory, and resets when the service stops. It does not use Cloudflare, D1, R2, a database, filesystem persistence, browser storage, Google APIs, or production authentication.

### 3.1 Network boundary

- Platform preview: existing classroom-network preview, normally port `8782`.
- PB-002J service: Node.js built-in HTTP server, default port `8783`.
- Bind address: explicit startup argument; classroom preview may use `0.0.0.0`.
- Browser client derives the host from the current Platform hostname and uses the explicitly configured PB-002J service port.
- CORS accepts only the explicitly supplied Platform origin.
- Startup requires an explicitly supplied opaque `classContextId`. It must be assigned for the intended classroom session and must not be inferred from a fixture, route, class name, period, roster, student, grade, or browser history.
- No classroom IP address, teacher key, student record, or private destination is committed.

### 3.2 Access boundary

- The service generates a temporary teacher write key at startup.
- The key is entered by the teacher for the active page session and remains in JavaScript memory only.
- Teacher mutations require the key in an authorization header.
- The complete catalog is teacher-readable only and requires the same temporary teacher key.
- Student health and projection endpoints are read-only and contain only service readiness and confirmed class-wide curriculum availability.
- No student name, identifier, roster, evidence, progress, grade, behavior, or individual assignment is stored or transmitted.

### 3.3 Exact startup, readiness, access, shutdown, and recovery workflow

1. The operator starts the existing Platform preview on the classroom-network host and records its exact origin, normally `http://<classroom-host>:8782`.
2. The operator starts Technology B from the repository root with:

   ```text
   node scripts/start-classroom-prototype.mjs \
     --host 0.0.0.0 \
     --port 8783 \
     --platform-origin http://<classroom-host>:8782 \
     --class-context-id <approved-opaque-class-context-id> \
     --catalog platform/data/pb-002j-grades-3-5-catalog.v1.json
   ```

3. Startup validates every required argument, the exact catalog ID/version, record counts, unique identities, parent relationships, source fields, unavailable statuses, and the absence of Grade 6, individual-recipient, or cross-grade data. Any failure stops startup before the service listens.
4. The service generates a high-entropy temporary teacher key and an opaque service-session ID. Neither is written to disk or logged after initial handoff.
5. The terminal displays only:
   - the approved Platform browser URL;
   - the PB-002J service health URL;
   - the opaque `classContextId`;
   - the temporary teacher key for direct teacher handoff;
   - a warning that PB-002J configuration will be lost when the service stops; and
   - confirmation that the initial projection is empty.
6. The operator opens the Platform URL on the teacher device, signs in through the unchanged Platform preview workflow, and enters the temporary teacher key in the PB-002J editor. The key remains in page memory and is cleared on sign-out, navigation away, reload, or tab close.
7. Student Chromebooks open the same approved Platform origin. They never receive or enter the teacher key and may read only the confirmed projection.
8. Readiness is `ready` only after catalog validation succeeds and the service is listening. An empty projection is a valid ready state; it is not treated as an error or replaced with fixture data.
9. Normal shutdown stops accepting requests, clears the in-memory configuration, audit events, teacher key, service-session ID, and `classContextId`, and writes nothing to disk.
10. An unexpected stop has the same data-loss result. On restart, the service generates a new key and service-session ID and exposes an explicit `reset`/empty state. Teacher and student interfaces state that classroom choices must be confirmed again.
11. During service failure, timeout, origin rejection, authorization failure, or network interruption, the last browser-rendered projection must not be treated as current. New Starts and Side Paths fail closed; verified Continue work remains independently available through its owner.
12. Recovery requires a successful health response followed by a fresh projection read. No queued draft, failed mutation, browser cache, PB-002I value, fixture, or stale response may republish configuration automatically.

## 4. Exact Implementation Manifest

### 4.1 New files

| File | Responsibility |
|---|---|
| `scripts/start-classroom-prototype.mjs` | Start the memory-only LAN service, validate configuration and catalog, enforce origin and teacher-key boundaries, expose approved endpoints, and print safe startup information |
| `platform/scripts/pb-002j-classwide-contract.mjs` | Shared schema constants, validation, stable-record checks, three-choice enforcement, projection sanitization, and error vocabulary |
| `platform/scripts/pb-002j-classwide-client.mjs` | Browser client for health, catalog, projection, confirmation, replacement, and withdrawal requests |
| `platform/scripts/pb-002j-classwide-controller.mjs` | Teacher editor and student projection orchestration without owning routes, sessions, fixtures, or PB-002I state |
| `platform/data/pb-002j-grades-3-5-catalog.v1.json` | Reviewed implementation form of the exact seed recorded in Section 8; no additional record may be inserted during build |
| `tests/platform/pb-002j-classwide-contract.test.mjs` | Contract, schema, identity, version, taxonomy, and three-choice tests |
| `tests/platform/pb-002j-classwide-service.test.mjs` | HTTP, authorization, CORS, idempotency, concurrency, reset, and atomicity tests |
| `tests/platform/pb-002j-classwide-teacher.test.mjs` | Teacher workflow, validation, review, confirmation, replacement, removal, and failure-state tests |
| `tests/platform/pb-002j-classwide-student-projection.test.mjs` | PB-003B projection, empty/unavailable states, Side Path boundary, and Continue protection tests |

### 4.2 Existing files permitted to change

| File | Narrow permitted change |
|---|---|
| `platform/scripts/platform-app.mjs` | Mount the PB-002J teacher editor in the Teacher Command Center and consume the student-safe projection in existing PB-003B locations |
| `platform/styles/platform.css` | Namespaced PB-002J teacher and student presentation only |
| `tests/platform/pb-002a-command-board-layout.test.mjs` | Narrow Teacher Command Center presentation reconciliation |
| `tests/platform/pb-003a-student-home-experience.test.mjs` | Narrow Current Goal projection reconciliation |
| `tests/platform/pb-003b-mission-choice-experience.test.mjs` | Replace only assertions that currently require all Mission and Side Path states to remain permanently disconnected |

No other file is authorized by this manifest. Expansion requires a separate stop-and-review gate.

### 4.3 Protected files and systems

- `platform/scripts/todays-mission.mjs` remains the PB-002I session-only communication owner.
- `platform/scripts/platform-session.mjs` remains the development entry-session boundary and is not PB-002J authority.
- `platform/scripts/platform-fixtures.mjs` remains development-only and supplies no catalog, assignment, grade, or projection fact.
- Existing routes, login behavior, fixtures, the three-control School-Start Launcher, Builder, Workshop, PB-003C evidence presentation, and Continue-current-work ownership remain unchanged.

## 5. Endpoint Manifest

| Method | Endpoint | Access | Result |
|---|---|---|---|
| `GET` | `/api/pb-002j/v1/health` | Classroom network | Service version, catalog version, state revision, and ready/reset state |
| `GET` | `/api/pb-002j/v1/catalog` | Teacher key | Teacher catalog metadata; no private student data or unapproved operational secrets |
| `GET` | `/api/pb-002j/v1/projection` | Classroom network | Current confirmed class-wide focus, up to three primary Start choices, secondary Side Paths, and Builder/Workshop availability |
| `PUT` | `/api/pb-002j/v1/configuration` | Teacher key | Atomically create or replace the complete confirmed class-wide configuration |
| `POST` | `/api/pb-002j/v1/withdrawals` | Teacher key | Emergency-withdraw one catalog choice without deleting or modifying student work |
| `OPTIONS` | `/api/pb-002j/v1/catalog`, `/configuration`, `/withdrawals` | Approved Platform origin only | Bounded browser preflight response; never processes application data or mutates state |

No endpoint accepts a student identifier, recipient list, evidence record, progress state, grade inference, external Google data, or PB-002I value.

### 5.1 Bounded browser preflight contract

- `Access-Control-Allow-Origin` must equal the single `--platform-origin` value supplied at startup. `*`, reflected unvalidated origins, origin lists, and `null` are prohibited.
- Allowed methods are exactly `GET`, `PUT`, `POST`, and `OPTIONS` as applicable to the requested endpoint.
- Allowed request headers are exactly `Authorization`, `Content-Type`, `If-Match`, and `X-PB-002J-Request-Id`.
- Credentials/cookies are not used and `Access-Control-Allow-Credentials` is not returned.
- Preflight requests from any other origin, for any other method, header, or path fail closed without CORS permission headers.
- Successful preflight does not validate the teacher key, reveal catalog content, create audit state, or mutate configuration.
- Health and projection responses use the same exact-origin restriction even though they do not require the teacher key.

## 6. Data Contract

### 6.1 Catalog record

Every implementation record must contain:

- `schemaVersion: 1`;
- immutable opaque `id`;
- integer `version: 1` for this initial seed;
- `recordType`: `grade`, `goal`, `activityMission`, `sidePathTopic`, `sidePathActivity`, `handoff`, or `supportingResource`;
- authoritative parent identity where applicable;
- approved display name distinct from the source filename;
- exact source archive and source-relative path;
- source status and student-availability status;
- lifecycle status: `active`, `withdrawn`, `replaced`, or `retired`; and
- optional explicit replacement identity.

IDs assigned below are immutable. Ordering, title changes, filename changes, or folder movement do not change them. Display-only spelling, capitalization, punctuation, spacing, and apostrophe corrections do not change identity. A substantive curriculum change creates a new integer version. Replacement, withdrawal, and retirement are explicit and traceable; records are never silently reused.

### 6.2 Confirmed class-wide configuration

The memory record contains only:

- `schemaVersion`;
- opaque `classContextId` supplied at service startup;
- opaque service-session ID generated at startup;
- `revision`;
- idempotent `requestId`;
- catalog identity and version;
- explicitly selected instructional grade identity;
- explicitly selected Goal identities;
- ordered primary Activity Mission identities, maximum three;
- explicitly selected secondary Side Path topic/activity identities;
- one class-wide current focus;
- Builder availability;
- Workshop availability;
- confirmation timestamp;
- opaque teacher-operator audit label; and
- replaced configuration revision.

The service instance and explicitly supplied `classContextId` define the classroom scope. The `classContextId` is recorded with every confirmation, replacement, withdrawal, and audit event. It is not persisted and is never inferred from Platform fixtures.

## 7. Lifecycle and Failure Behavior

- Confirmation atomically replaces the complete class-wide Start set.
- Repeated `requestId` values return the original result without duplicating a change.
- A stale expected revision fails with `409` and leaves the confirmed state unchanged.
- Invalid schema fails with `400`; unauthorized write fails with `401`; unknown, withdrawn, mismatched-version, cross-grade, or more-than-three-primary selections fail with `422`.
- No invalid or interrupted request mutates the active projection.
- Removal blocks future Starts but does not delete, hide, or modify verified Continue work.
- Emergency withdrawal produces an honest unavailable state and preserves existing work.
- Service loss shows an honest unavailable state; the browser does not fall back to fixtures, PB-002I, stale data, or browser storage.
- Service restart produces an explicit empty/reset state. Nothing is silently restored.
- Draft teacher selections remain local presentation state and never reach students until a successful atomic confirmation.

## 8. Approved Grades 3–5 Catalog Seed

### 8.1 Seed status and sources

Catalog ID: `pb002j-catalog-grades-03-05`  
Catalog version: `1`  
Seed totals: Grade 3 `39`; Grade 4 `29`; Grade 5 `40`; total Activity Missions `108`.

Controlling source set:

1. `THINKamigBOB_Activity_Templates_Grade_Goal_Prep_Guide`, Google Doc file ID `15w2luu3PMpFHeyPdq7M2WD0pBmUiNzS_irNvZZF1pls`, as the approved bounded Grades 3–5 reference.
2. `🚀 STEM Mission System-20260811T154309Z-1-001.zip`, as the source-traceable Grade/Goal and Activity Directions archive.
3. Individually approved correction and classification records, including the Draw Your Dream Playground candidate evidence and approved display-name normalizations.

All records below receive stable metadata identities. Unless a later approved record explicitly marks a record ready, its prototype `studentAvailable` value is `false`.

### 8.2 Grade and Goal identities

| ID | v | Display name | Source hierarchy |
|---|---:|---|---|
| `pb002j-grade-03` | 1 | Grade 3 | `Grade 3 - Stewart_s Dream Playground` |
| `pb002j-g03-goal-01` | 1 | Learn About Playgrounds | Grade 3 / Goal 1 |
| `pb002j-g03-goal-02` | 1 | Make It Safe | Grade 3 / Goal 2 |
| `pb002j-g03-goal-03` | 1 | Build Fun Features | Grade 3 / Goal 3 |
| `pb002j-g03-goal-04` | 1 | Add Technology | Grade 3 / Goal 4 |
| `pb002j-g03-goal-05` | 1 | Final Playground Design | Grade 3 / Goal 5 |
| `pb002j-grade-04` | 1 | Grade 4 | `Grade 4 - Little_s Community Safety Challenge` |
| `pb002j-g04-goal-01` | 1 | Learn About Disasters | Grade 4 / Goal 1 |
| `pb002j-g04-goal-02` | 1 | Build Strong Structures | Grade 4 / Goal 2 |
| `pb002j-g04-goal-03` | 1 | Create Warning Systems | Grade 4 / Goal 3 |
| `pb002j-g04-goal-04` | 1 | Help the Community | Grade 4 / Goal 4 |
| `pb002j-g04-goal-05` | 1 | Final Projects: Community Safety Plan | Grade 4 / Goal 5 |
| `pb002j-grade-05` | 1 | Grade 5 | `Grade 5 - Stewart & Little_s Mars Mission` |
| `pb002j-g05-goal-01` | 1 | Build a Shelter | Grade 5 / Goal 1 |
| `pb002j-g05-goal-02` | 1 | Solve Food and Water Problems | Grade 5 / Goal 2 |
| `pb002j-g05-goal-03` | 1 | Create Transportation | Grade 5 / Goal 3; approved display normalization from `Create Transporation` |
| `pb002j-g05-goal-04` | 1 | Build Communication Systems | Grade 5 / Goal 4 |
| `pb002j-g05-goal-05` | 1 | Final Projects: Launch the Colony | Grade 5 / Goal 5 |

### 8.3 Grade 3 Activity Mission identities

Each source path begins `Grade 3 - Stewart_s Dream Playground/`.

| ID | Goal | Display name | Exact remaining source path |
|---|---:|---|---|
| `pb002j-am-g03-001` | 1 | Draw Your Dream Playground | `Goal 1 - Learn About Playgrounds 🎡/✏️ Draw Your Dream Playground (planning is part of engineering).pptx`; corrected candidate v1.1 SHA-256 `fccb0db9a80d3524da41492d6e399aab712a2a4b622d374f885c520882463b43` |
| `pb002j-am-g03-002` | 1 | Favorite Equipment Graph | `Goal 1 - Learn About Playgrounds 🎡/📊 Favorite Equipment Graph ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-003` | 1 | Pixilart Playground Design | `Goal 1 - Learn About Playgrounds 🎡/🟪 Pixilart Playground Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-004` | 1 | Playground Advertisement | `Goal 1 - Learn About Playgrounds 🎡/📢 Playground Advertisement ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-005` | 1 | Playground Observation Challenge | `Goal 1 - Learn About Playgrounds 🎡/👀 Playground Observation Challenge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-006` | 1 | Playground Safety Inspector | Prep Guide activity; supporting source `Goal 1 - Learn About Playgrounds 🎡/🛡 Playground Safety Inspector Template_.pptx`; controlling Activity Directions relationship remains unavailable |
| `pb002j-am-g03-007` | 1 | Playground Survey | `Goal 1 - Learn About Playgrounds 🎡/📋 Playground Survey ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-008` | 2 | BricQ Motion Testing | `Goal 2 - Make It Safe 🛡/⚙️ BricQ Motion Testing ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-009` | 2 | Build a Safer Swing | `Goal 2 - Make It Safe 🛡/🏃 Build a Safer Swing  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-010` | 2 | Cardboard Playground Challenge | `Goal 2 - Make It Safe 🛡/📦 Cardboard Playground Challenge  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-011` | 2 | LEGO Playground Builder | `Goal 2 - Make It Safe 🛡/🧱 LEGO Playground Builder  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-012` | 2 | Playground Rules PSA | `Goal 2 - Make It Safe 🛡/🎥 Playground Rules PSA  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-013` | 2 | Playground Safety Poster | `Goal 2 - Make It Safe 🛡/🚧 Playground Safety Poster  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-014` | 2 | Safe Slide Design Challenge | `Goal 2 - Make It Safe 🛡/🛝 Safe Slide Design Challenge  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-015` | 2 | Scratch Safety Animation | `Goal 2 - Make It Safe 🛡/🐱 Scratch Safety Animation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-016` | 3 | 3D Pen Playground Equipment | `Goal 3 - Build Fun Features 🎉/🖊️ 3D Pen Playground Equipment ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-017` | 3 | Build an Obstacle Course | `Goal 3 - Build Fun Features 🎉/🏁 Build an Obstacle Course ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-018` | 3 | Clay Playground Model | `Goal 3 - Build Fun Features 🎉/🏺 Clay Playground Model ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-019` | 3 | Create a Playground Map | `Goal 3 - Build Fun Features 🎉/🗺️ Create a Playground Map ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-020` | 3 | Design a New Playground Ride | `Goal 3 - Build Fun Features 🎉/🎢 Design a New Playground Ride ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-021` | 3 | K'NEX Climbing Wall | `Goal 3 - Build Fun Features 🎉/🧩 Knex Climbing wall ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-022` | 3 | Playground Mascot Design | `Goal 3 - Build Fun Features 🎉/🐭 Playground Mascot Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-023` | 3 | Stop Motion Playground Tour | `Goal 3 - Build Fun Features 🎉/🎬 Stop Motion Playground Tour ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-024` | 4 | Build a Smart Playground Feature | `Goal 4 - Add Technology 🤖/🛜 Build a Smart Playground Feature ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-025` | 4 | Interactive Playground Sign | `Goal 4 - Add Technology 🤖/🪧 Interactive Playground Sign ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-026` | 4 | LED Playground Lighting | `Goal 4 - Add Technology 🤖/💡 LED Playground Lightning ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-027` | 4 | Makey Makey Playground Game | `Goal 4 - Add Technology 🤖/🎮 Makey Makey Playground Game ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-028` | 4 | Micro:bit Playground Counter | `Goal 4 - Add Technology 🤖/📟 Microbit Playground Counter ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-029` | 4 | Ozobot Playground Route | `Goal 4 - Add Technology 🤖/🤖 Ozobot Playground Route ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-030` | 4 | Sphero Playground Patrol | `Goal 4 - Add Technology 🤖/⚽ Sphero Playground Patrol ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-031` | 4 | Technology for Accessibility Challenge | `Goal 4 - Add Technology 🤖/♿ Technology for Accessibility Challenge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-032` | 5 | Canva Playground Poster Final | `Goal 5 - Final Playground Design 🏆/🎨 Canva Playground Poster Final ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-033` | 5 | Digital Playground Blueprint | `Goal 5 - Final Playground Design 🏆/📐 Digital Playground Blueprint ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-034` | 5 | Google Slides Playground Presentation | `Goal 5 - Final Playground Design 🏆/📽️ Google Slides Playground Presentation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-035` | 5 | Google Vids Playground Commercial | `Goal 5 - Final Playground Design 🏆/🎬 Google Vid Playground Commercial ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-036` | 5 | Physical Playground Model and Video | `Goal 5 - Final Playground Design 🏆/🏗️ Physical Playground Model and Video ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-037` | 5 | Playground Grand Opening Video | `Goal 5 - Final Playground Design 🏆/🎥 Playground Grand Opening Video ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-038` | 5 | Stewart's Dream Playground Proposal | `Goal 5 - Final Playground Design 🏆/📜 Stewart_s Dream Playground Proposal ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g03-039` | 5 | Ultimate Playground Showcase | `Goal 5 - Final Playground Design 🏆/🎉 Ultimate Playground Showcase ACTIVITY DIRECTIONS.pptx` |

### 8.4 Grade 4 Activity Mission identities

Each source path begins `Grade 4 - Little_s Community Safety Challenge/`.

| ID | Goal | Display name | Exact remaining source path |
|---|---:|---|---|
| `pb002j-am-g04-001` | 1 | Canva Safety Infographic | `Goal 1 Learn About Disasters  🌪/🛡️ Canva Safety Infographic  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-002` | 1 | Disaster Research Report | `Goal 1 Learn About Disasters  🌪/📚 Disaster Research Report  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-003` | 1 | Flood Mapping Activity | `Goal 1 Learn About Disasters  🌪/🗺️ Flood Mapping Activity  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-004` | 1 | Pixilart Disaster Scene GIF Animation | `Goal 1 Learn About Disasters  🌪/🖼️ Pixilart Disaster Scene  GIF Animation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-005` | 1 | Storm Tracking Challenge | `Goal 1 Learn About Disasters  🌪/🌪️ Storm Tracking Challenge  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-006` | 1 | Weather Data Investigation | `Goal 1 Learn About Disasters  🌪/🌦️ Weather Data Investigation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-007` | 2 | BricQ Wind Resistance Test | `GOAL 2 - Build Strong Structures 🏗/⚙️ BricQ Wind Resistance Test ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-008` | 2 | Cardboard Flood House | `GOAL 2 - Build Strong Structures 🏗/📦 Cardboard Flood House ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-009` | 2 | Earthquake Tower Challenge | `GOAL 2 - Build Strong Structures 🏗/🏢 Earthquake Tower Challenge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-010` | 2 | Hurricane-Proof Structure | `GOAL 2 - Build Strong Structures 🏗/🌪️ Hurricane-Proof Structure ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-011` | 2 | K'NEX Rescue Bridge | `GOAL 2 - Build Strong Structures 🏗/🌉 Knex Rescue Bridge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-012` | 2 | LEGO Storm Shelter | `GOAL 2 - Build Strong Structures 🏗/🧱 LEGO Storm Shelter  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-013` | 3 | Community Alarm System | `Goal 3 - Create Warning Systems 🚨/📢 Community Alarm Systeml ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-014` | 3 | Emergency Broadcast Design | `Goal 3 - Create Warning Systems 🚨/📺 Emergency Broadcast Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-015` | 3 | LED Emergency Signal | `Goal 3 - Create Warning Systems 🚨/💡 LED Emergency Signal ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-016` | 3 | Makey Makey Emergency Button | `Goal 3 - Create Warning Systems 🚨/🎮 Makey Makey Emergency Button ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-017` | 3 | Micro:bit Warning Device | `Goal 3 - Create Warning Systems 🚨/📟 Microbit Warning Device ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-018` | 3 | Scratch Emergency Alert | `Goal 3 - Create Warning Systems 🚨/ 🐱 Scratch Emergency Alert ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-019` | 4 | Community Safety Map | `Goal 4 - Help the Community 🚑/🗺️ Community Safety Map ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-020` | 4 | Emergency Supply Planner | `Goal 4 - Help the Community 🚑/🎒 Emergency Supply Planner ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-021` | 4 | Ozobot Evacuation Route | `Goal 4 - Help the Community 🚑/🤖 Ozobot Evacuation Route ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-022` | 4 | Safety PSA | `Goal 4 - Help the Community 🚑/📢 Safety PSA ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-023` | 4 | Sphero Rescue Delivery | `Goal 4 - Help the Community 🚑/⚽ Sphero Rescue Delivery ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-024` | 4 | Stop Motion Safety Video | `Goal 4 - Help the Community 🚑/🎬 Stop Motion Safety Video ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-025` | 5 | Animal Community Safety Plan | `Goal 5 - Final Projects_ Community Safety Plan 🏆/📜 Animal Community Safety Plan ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-026` | 5 | Community Safety Presentation | `Goal 5 - Final Projects_ Community Safety Plan 🏆/📽️ Community Safety Presentation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-027` | 5 | Disaster-Resistant Community Model | `Goal 5 - Final Projects_ Community Safety Plan 🏆/🏗️ Disaster-Resistant Community Model ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-028` | 5 | Emergency Preparedness Commercial | `Goal 5 - Final Projects_ Community Safety Plan 🏆/🎬 Emergency Preparedness Commercial ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g04-029` | 5 | Future Safety System Design | `Goal 5 - Final Projects_ Community Safety Plan 🏆/💡 Future Safety System Design ACTIVITY DIRECTIONS.pptx` |

### 8.5 Grade 5 Activity Mission identities

Each source path begins `Grade 5 - Stewart & Little_s Mars Mission/`.

| ID | Goal | Display name | Exact remaining source path |
|---|---:|---|---|
| `pb002j-am-g05-001` | 1 | 3D Printed Habitat Design | `Goal 1 -🏠 Build a Shelter/🖨️ 3D Printed Habitat Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-002` | 1 | Build a Radiation Shield (Moon or Mars) | `Goal 1 -🏠 Build a Shelter/🛡️ Build a Radiation Shield (Moon or Mars) ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-003` | 1 | Cardboard Mars Base | `Goal 1 -🏠 Build a Shelter/📦 Cardboard Mars Base ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-004` | 1 | Clay Habitat Model | `Goal 1 -🏠 Build a Shelter/🏺 Clay Habitat Model ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-005` | 1 | Design a Space Bedroom | `Goal 1 -🏠 Build a Shelter/🛏️ Design a Space Bedroom ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-006` | 1 | Future Colony Housing | `Goal 1 -🏠 Build a Shelter/🏠 Future Colony Housing ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-007` | 1 | LEGO Mars Habitat | `Goal 1 -🏠 Build a Shelter/🧱 LEGO Mars Habitat ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-008` | 1 | Mars Habitat Blueprint | `Goal 1 -🏠 Build a Shelter/📐 Mars Habitat Blueprint ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-009` | 2 | Canva Food Production Plan | `Goal 2 - Solve Food and Water Problems 💧/🥕 Canva Food Production Plan ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-010` | 2 | Colony Supply Calculator | `Goal 2 - Solve Food and Water Problems 💧/🧮 Colony Supply Calculator ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-011` | 2 | Google Sheets Resource Tracker | `Goal 2 - Solve Food and Water Problems 💧/📊 Google Sheets Resource Tracker ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-012` | 2 | Hydroponics Investigation | `Goal 2 - Solve Food and Water Problems 💧/🌿 Hydroponics Investigation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-013` | 2 | Mars Farm Research Project | `Goal 2 - Solve Food and Water Problems 💧/🌱 Mars Farm Research Project ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-014` | 2 | Mars Menu Challenge | `Goal 2 - Solve Food and Water Problems 💧/🍽️ Mars Menu Challenge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-015` | 2 | Mars Water System Design | `Goal 2 - Solve Food and Water Problems 💧/💧 Mars Water System Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-016` | 2 | Water Recycling System | `Goal 2 - Solve Food and Water Problems 💧/♻️ Water Recycling System ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-017` | 3 | Balloon-Powered Mars Vehicle | `Goal 3 - Create Transporation 🚗/🎈 Balloon-Powered Mars Vehicle ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-018` | 3 | Build a Cargo Transport | `Goal 3 - Create Transporation 🚗/📦 Build a Cargo Transport ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-019` | 3 | LEGO Exploration Vehicle | `Goal 3 - Create Transporation 🚗/🧱 LEGO Exploration Vehicle ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-020` | 3 | Mars Rescue Vehicle | `Goal 3 - Create Transporation 🚗/🚑 Mars Rescue Vehicle ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-021` | 3 | Ozobot Colony Delivery Route | `Goal 3 - Create Transporation 🚗/🤖 Ozobot Colony Delivery Route ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-022` | 3 | Rover Obstacle Course | `Goal 3 - Create Transporation 🚗/🏁 Rover Obstacle Course ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-023` | 3 | Solar Mars Rover | `Goal 3 - Create Transporation 🚗/☀️ Solar Mars Rover ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-024` | 3 | Sphero Rover Challenge | `Goal 3 - Create Transporation 🚗/⚽ Sphero Rover Challenge ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-025` | 4 | Colony Information Center | `Goal 4 - Build Communication Systems 📡/🏢 Colony Information Center ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-026` | 4 | Design a Mission Dashboard | `Goal 4 - Build Communication Systems 📡/🖥️ Design a Mission Dashboard ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-027` | 4 | LED Communication System | `Goal 4 - Build Communication Systems 📡/💡 LED Communication System ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-028` | 4 | Makey Makey Control Panel | `Goal 4 - Build Communication Systems 📡/🎮 Makey Makey Control Panel ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-029` | 4 | Mars Emergency Alert | `Goal 4 - Build Communication Systems 📡/🚨 Mars Emergency Alert ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-030` | 4 | Micro:bit Mars Communicator | `Goal 4 - Build Communication Systems 📡/📟 Microbit Mars Communicator ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-031` | 4 | Scratch Mission Control | `Goal 4 - Build Communication Systems 📡/🐱 Scratch Mission Control ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-032` | 4 | Stop Motion Mars News Report | `Goal 4 - Build Communication Systems 📡/🎬 Stop Motion Mars News Report ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-033` | 5 | Digital Colony Blueprint | `Goal 5 -  Final Projects_ Launch the Colony 🏆/📐 Digital Colony Blueprint ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-034` | 5 | Future Mars City Design | `Goal 5 -  Final Projects_ Launch the Colony 🏆/🌆 Future Mars City Design ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-035` | 5 | Interactive Mars Colony Tour | `Goal 5 -  Final Projects_ Launch the Colony 🏆/🗺️ Interactive Mars Colony Tour ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-036` | 5 | Mars Colony Presentation | `Goal 5 -  Final Projects_ Launch the Colony 🏆/📽️ Mars Colony Presentation ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-037` | 5 | Mars Commercial | `Goal 5 -  Final Projects_ Launch the Colony 🏆/🎬 Mars Commercial ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-038` | 5 | Mission to Mars Showcase | `Goal 5 -  Final Projects_ Launch the Colony 🏆/🚀 Mission to Mars Showcase  ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-039` | 5 | Physical Colony Model + Video | `Goal 5 -  Final Projects_ Launch the Colony 🏆/🏗️ Physical Colony Model + Video ACTIVITY DIRECTIONS.pptx` |
| `pb002j-am-g05-040` | 5 | Stewart and Little's Survival Plan | `Goal 5 -  Final Projects_ Launch the Colony 🏆/📜 Stewart and Little_s Survival Plan ACTIVITY DIRECTIONS.pptx` |

## 9. Records Remaining Unavailable

The following are explicitly unavailable regardless of seed identity:

- Grade 6: excluded; no verified Grade 6 catalog source.
- Cross-grade choices: unauthorized and fail closed.
- Individual-student or small-group availability: excluded from this prototype.
- `pb002j-am-g03-001` Draw Your Dream Playground: directions candidate conditionally verified, but authoritative source adoption, Google Drawings/Evidence Portfolio operational validation, and honest unavailable behavior remain incomplete.
- `pb002j-am-g03-006` Playground Safety Inspector: the inspected file is a supporting template; the controlling student-startable directions relationship is not established.
- Create Side Path handoff: classified as a handoff, not an Activity Mission and not a primary Start choice.
- All Side Path topics and activities: excluded from this initial implementation seed until item-level classification and readiness are complete. The proposed Create, Design, Build, Think, and Code topic names do not authorize any contained activity.
- Missing, coming-soon, incomplete, ambiguous, duplicated, login-dependent, or unsupported Side Path choices identified in the approved reconciliation register.
- Any Activity Mission without a later explicit readiness status remains `studentAvailable: false`; seed membership alone is not availability approval.

### 9.1 Initial functional-prototype candidate list

The product direction remains a functional class-wide prototype. The following source-matched Activity Mission identities form the complete candidate pool that may be considered for initial student availability. This list is not approval of any candidate: every listed record remains `studentAvailable: false` until Jennifer Williams individually approves the identity/version after checking its applicable directions, preparation, destination, safety, accessibility, and operational requirements.

Grade 3 candidates (`37`):

```text
pb002j-am-g03-002, pb002j-am-g03-003, pb002j-am-g03-004,
pb002j-am-g03-005, pb002j-am-g03-007, pb002j-am-g03-008,
pb002j-am-g03-009, pb002j-am-g03-010, pb002j-am-g03-011,
pb002j-am-g03-012, pb002j-am-g03-013, pb002j-am-g03-014,
pb002j-am-g03-015, pb002j-am-g03-016, pb002j-am-g03-017,
pb002j-am-g03-018, pb002j-am-g03-019, pb002j-am-g03-020,
pb002j-am-g03-021, pb002j-am-g03-022, pb002j-am-g03-023,
pb002j-am-g03-024, pb002j-am-g03-025, pb002j-am-g03-026,
pb002j-am-g03-027, pb002j-am-g03-028, pb002j-am-g03-029,
pb002j-am-g03-030, pb002j-am-g03-031, pb002j-am-g03-032,
pb002j-am-g03-033, pb002j-am-g03-034, pb002j-am-g03-035,
pb002j-am-g03-036, pb002j-am-g03-037, pb002j-am-g03-038,
pb002j-am-g03-039
```

Grade 4 candidates (`29`):

```text
pb002j-am-g04-001, pb002j-am-g04-002, pb002j-am-g04-003,
pb002j-am-g04-004, pb002j-am-g04-005, pb002j-am-g04-006,
pb002j-am-g04-007, pb002j-am-g04-008, pb002j-am-g04-009,
pb002j-am-g04-010, pb002j-am-g04-011, pb002j-am-g04-012,
pb002j-am-g04-013, pb002j-am-g04-014, pb002j-am-g04-015,
pb002j-am-g04-016, pb002j-am-g04-017, pb002j-am-g04-018,
pb002j-am-g04-019, pb002j-am-g04-020, pb002j-am-g04-021,
pb002j-am-g04-022, pb002j-am-g04-023, pb002j-am-g04-024,
pb002j-am-g04-025, pb002j-am-g04-026, pb002j-am-g04-027,
pb002j-am-g04-028, pb002j-am-g04-029
```

Grade 5 candidates (`40`):

```text
pb002j-am-g05-001, pb002j-am-g05-002, pb002j-am-g05-003,
pb002j-am-g05-004, pb002j-am-g05-005, pb002j-am-g05-006,
pb002j-am-g05-007, pb002j-am-g05-008, pb002j-am-g05-009,
pb002j-am-g05-010, pb002j-am-g05-011, pb002j-am-g05-012,
pb002j-am-g05-013, pb002j-am-g05-014, pb002j-am-g05-015,
pb002j-am-g05-016, pb002j-am-g05-017, pb002j-am-g05-018,
pb002j-am-g05-019, pb002j-am-g05-020, pb002j-am-g05-021,
pb002j-am-g05-022, pb002j-am-g05-023, pb002j-am-g05-024,
pb002j-am-g05-025, pb002j-am-g05-026, pb002j-am-g05-027,
pb002j-am-g05-028, pb002j-am-g05-029, pb002j-am-g05-030,
pb002j-am-g05-031, pb002j-am-g05-032, pb002j-am-g05-033,
pb002j-am-g05-034, pb002j-am-g05-035, pb002j-am-g05-036,
pb002j-am-g05-037, pb002j-am-g05-038, pb002j-am-g05-039,
pb002j-am-g05-040
```

Explicit exclusions from this candidate pool:

- `pb002j-am-g03-001` — Draw Your Dream Playground;
- `pb002j-am-g03-006` — Playground Safety Inspector;
- all Side Path topics and activities;
- every unresolved, incomplete, withdrawn, replaced, retired, unverified, or operationally unavailable record;
- Grade 6;
- cross-grade choices; and
- individual-student or small-group choices.

No implementation may infer that all `106` candidates are approved. The subsequent availability decision must enumerate the exact IDs and versions approved for `studentAvailable: true`; omission means unavailable.

## 10. Test and Validation Manifest

Required automated coverage:

- catalog counts, unique immutable IDs, versions, parents, source paths, and unavailable statuses;
- Goal-versus-Activity Mission taxonomy;
- no implicit activity selection from a Goal;
- no more than three ordered primary Start choices;
- Side Paths remain secondary and cannot bypass the primary limit;
- atomic replacement, idempotent retry, and stale-revision conflict;
- unauthorized, invalid, unknown, withdrawn, cross-grade, and service-unavailable failure behavior;
- no student or roster data in requests, memory state, logs, or projection;
- teacher write and student read-only boundaries;
- restart reset and honest empty state;
- removal and emergency withdrawal preserve Continue work;
- PB-002I semantic and storage isolation;
- PB-002A, PB-003A, PB-003B, and PB-003C focused regression;
- full Platform regression;
- full Workshop regression;
- JavaScript/module syntax validation;
- `git diff --check`;
- browser inspection; and
- physical teacher/student Chromebook validation at `1204×695` CSS pixels and DPR `1.25`.

## 11. Implementation Authorization Status

This document records the selected technology and exact candidate implementation allowlist. It does not authorize implementation.

Implementation remains `BLOCKED / UNAUTHORIZED` until:

1. this review reconciliation receives a final read-only post-reconciliation review;
2. every catalog identity, display name, parent, source path, count, and unavailable classification is confirmed;
3. Technology B access, privacy, reset, origin, and failure behavior are accepted;
4. the exact file allowlist is approved; and
5. an explicit initial `studentAvailable: true` subset is approved by ID and version; and
6. a separate `/BUILD` command explicitly authorizes the reviewed manifest.

No deployment, publication, Cloudflare change, Google integration, production persistence, individual assignment, or production release is authorized.

## 12. Exact Next Gate

```text
/REVIEW

PB-002J — Technology B Implementation Manifest
and Approved Catalog Seed Reconciliation v1.0
Final Post-Reconciliation Review
```
