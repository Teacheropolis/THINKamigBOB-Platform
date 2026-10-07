# Evidence Drive Connection Readiness v1.0

## Purpose

This bounded readiness step prepares a future teacher-owned Google Drive destination for Evidence 2.0. It does not authorize Google OAuth, create folders, transfer student media, or expose teacher credentials to student devices.

## Required Upload Contract

1. A teacher authorizes an approved school Google account.
2. An approved server-side broker holds the authorization; student browsers never receive teacher tokens.
3. The broker creates or verifies one teacher-owned evidence root folder.
4. Each upload is placed beneath a class/activity/student structure using opaque platform identifiers rather than student names in URLs.
5. Students may submit their own evidence but may not list, read, modify, or delete another student’s evidence.
6. Teachers may view classroom evidence only for classes they are authorized to teach.
7. Upload type, size, malware scanning, retry, duplicate handling, and failure recovery must be defined before launch.
8. Retention, deletion, export, audit, incident response, and school-record requirements require explicit approval.

## Current Stop Condition

Real connection remains blocked until the project has an approved Google Cloud project, OAuth client, redirect origin, teacher destination policy, server-side upload broker, and privacy/security approval. The in-product setup is local preview state only.

## User-Supplied Pilot Destination

- Account label: `teacheropolis@gmail.com`
- Folder name: `THINKamigBOB Student Evidence Pilot`
- Folder ID: `1LEb7tIqisBKNEvtLhGGRpW3PKB8OIY74`
- Canonical URL: `https://drive.google.com/drive/folders/1LEb7tIqisBKNEvtLhGGRpW3PKB8OIY74`
- Allowed content: fictional pilot evidence only
- Apps Script project ID: `1xNhYFr8jOcHIM9zqx5OgcRDTydlC4ncMHvRDpJiH35aBI5aUOev5JopR`
- Upload endpoint: `https://script.google.com/macros/s/AKfycbyKaeDz1c4xGSItQ-kHZpqqVe3dCinC7_1Jn88GQSJcoFybCv3vGHGti7F-HRrgdfntcw/exec`
- Status: `PERSISTENT_FICTIONAL_REVIEW_VALIDATED`

The folder reference is recorded without changing its sharing state or uploading content. The supplied account label is provenance from the user and is not authentication evidence.

## Local Upload Broker Proof of Concept

`platform/scripts/evidence-upload-broker.mjs` implements the bounded server-side seam for the first fictional image test. It enforces the exact Platform origin, a server-issued upload-session key, JPEG/PNG/WebP only, an 8 MB limit, sanitized metadata, the configured teacher folder, and a response that returns only safe file metadata. The Drive client is injected so OAuth tokens remain server-side and tests cannot contact Drive.

The Google Apps Script pilot is deployed under `teacheropolis@gmail.com` and authorized to create files in the test account. Deployment version 2 passed its health check and created one 68-byte fictional PNG in the configured folder. Its upload secret exists only in Apps Script properties, was rotated after validation, and is intentionally absent from repository files and student-facing JavaScript.

## Runtime Ticket Exchange Foundation

The student-facing client now targets only the local upload broker. The broker accepts a server-issued ticket that is scoped to one student, one activity, approved image types, a five-minute lifetime, and one use. Student-supplied headers cannot choose another student or activity. The permanent Apps Script upload secret remains a server-side deployment property and is never returned by the ticket store or committed to browser code.

## Fictional End-to-End Pilot

`scripts/start-evidence-pilot.mjs` connects the bounded broker to the validated Apps Script endpoint. It requires the Apps Script upload secret through the `EVIDENCE_APPS_SCRIPT_UPLOAD_TOKEN` process environment and generates a new memory-only teacher key every time it starts. Neither secret is written to browser storage.

The teacher dashboard accepts that temporary teacher key and publishes the current activity for four hours. A signed-in fictional student may request a five-minute, one-use ticket for the active launch. Photo and Screenshot evidence then uploads through the broker; Video, Reflection, and More Evidence remain session-only. If the service is unavailable, the image remains in the browser timeline and the interface reports the fallback honestly.

This is still not approved for real students. The launch and tickets are memory-only, the student identities are development fixtures, and the production OAuth, privacy, retention, deletion, malware-scanning, and school authorization gates remain open.

## Persistent Teacher Evidence Review v1

The teacher dashboard now includes a protected Drive-backed inbox for fictional pilot evidence. The teacher can refresh a bounded list of up to 50 image uploads, filter by fictional student, activity, or evidence type, select one submission, and load its actual visual preview after a local-service restart. List responses exclude image bytes; preview bytes require the current memory-only teacher key and are never placed in browser storage.

New uploads store a versioned metadata description with the fictional student identifier, activity, and evidence type. The Apps Script endpoint lists only approved image types from the configured pilot folder and verifies folder membership again before returning base64 preview content. Existing pilot images without versioned descriptions remain visible with explicit fallback metadata.

This remains a fictional pilot: no grades, comments, deletion controls, teacher-view history, real student accounts, or school authorization have been added.

Deployment verification retrieved three existing fictional image records after a local-service restart and successfully returned one protected PNG preview (`135591` bytes) through the teacher-authorized broker.

## Evidence Governance Foundation v1

The teacher dashboard now supports a session-only governance draft covering retention timing, deletion authority, recoverable trash, and export-before-deletion. Every field is required before the draft can be saved. The draft is documentation only: it cannot delete, move, export, or otherwise modify a Drive file, and it is explicitly not an enforced policy.

Real evidence remains blocked pending school and legal approval of these rules, a production administrator authorization model, auditable deletion and recovery behavior, and a decision about how teachers and families receive exports.
