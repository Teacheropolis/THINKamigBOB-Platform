# Teacher Google OAuth Production Readiness v1.0

## Product decision

Teachers authorize Google Drive once. Students never sign in to Google and never receive Google credentials or Drive permissions.

The production connection requests only:

`https://www.googleapis.com/auth/drive.file`

This allows THINKamigBOB to manage files it creates or files the teacher deliberately selects. The platform must not request access to the teacher's entire Drive.

## Low-support teacher flow

1. Teacher selects **Connect Google Drive**.
2. The server creates a short-lived, single-use authorization state and redirects to Google.
3. Google displays the teacher consent screen.
4. Google returns the teacher to the server callback.
5. The server validates state, exchanges the authorization code, encrypts the refresh token, and creates the evidence folder.
6. The dashboard displays **Connected** and monitors connection health.
7. If authorization expires or is revoked, the dashboard displays one guided **Reconnect Google Drive** action.
8. **Disconnect** revokes Google authorization and removes the stored token without deleting classroom evidence.

## Server-only endpoints

- `GET /api/evidence/google/v1/status`
- `POST /api/evidence/google/v1/connect/start`
- `GET /api/evidence/google/v1/connect/callback`
- `POST /api/evidence/google/v1/connect/disconnect`

The browser must never receive the OAuth client secret or a Google refresh token.

## Production activation gates

- Published HTTPS platform domain
- Production Google OAuth client
- Client secret stored only on the server
- Encrypted teacher token storage
- Verified domain, privacy policy, and OAuth brand
- Teacher disconnect and token revocation
- Connection monitoring and guided reconnect

Until every gate passes, the teacher dashboard must remain in preview mode and must not claim that a Google account is connected.

## Implemented server foundation

The repository now includes a provider-independent server service foundation at `platform/integrations/google/evidence-google-oauth-service.mjs`. It implements short-lived, single-use authorization state, PKCE, the exact `drive.file` scope, callback validation, an encrypted-vault interface, public connection status, and disconnect/revocation behavior. It intentionally has no production client ID, client secret, token vault, public callback domain, or live Google token exchange configured.

The encrypted-vault foundation uses AES-256-GCM with teacher identity bound as authenticated data. Connection health translates revoked authorization into one guided reconnect action, while temporary Google or network failures remain retryable and do not falsely disconnect the teacher. The included in-memory repository is for automated testing only; production requires a durable encrypted data service and a separately managed encryption key.

The protected HTTP boundary now implements the four production route contracts. Status, connect, and disconnect require an authenticated teacher session; state-changing requests require the exact platform origin; callbacks depend on the short-lived single-use OAuth state; responses are non-cacheable; and callback redirects never include authorization codes or tokens. The local fictional broker returns `setup-required` for these routes until production hosting and credentials are explicitly configured.

The Google API client foundation now implements authorization-code exchange with PKCE, access-token refresh, token revocation, and evidence-folder discovery or creation. Folder lookup uses a private app property instead of relying on a changeable folder name. New folders set `ignoreDefaultVisibility=true` to avoid inheriting a district-wide default visibility policy. Network access remains injected and is covered with fictional responses; no live Google credential is configured.

The same narrow client now implements image evidence upload, bounded evidence listing, and protected visual retrieval. Files are limited to PNG, JPEG, or WebP and 8 MB; carry a private app marker plus bounded classroom metadata; and are created only inside the managed evidence folder. Preview first retrieves metadata and confirms the app marker, expected parent folder, non-trashed state, and allowed image type before downloading content. This prevents the evidence endpoint from becoming a general-purpose Drive browser.

The production evidence HTTP layer now connects these operations to teacher and student platform sessions. Teachers may launch evidence only for classes they are authorized to manage and may list or preview only their connected Drive folder. Students authenticate only to THINKamigBOB, retrieve the active launch for their class, and receive a five-minute, single-use upload ticket containing no Google credential. The server resolves the teacher's encrypted refresh token only for the bounded Drive operation. The local Apps Script pilot remains a separate development path and every `/api/evidence/google/v1/` route remains disabled locally.

Durable repository adapters now cover encrypted token records, teacher-to-folder connections, four-hour class launches, five-minute upload tickets, and ten-minute OAuth state. Repository keys hash external identifiers, expiring records carry storage-level expiration times, and ticket or OAuth-state consumption requires an atomic `take` operation so two application instances cannot accept the same credential. The storage provider remains injected; production activation requires a durable service that implements atomic `get`, `put`, `delete`, and `take` operations.

The first production storage provider is now implemented for Cloudflare D1. It uses prepared statements for every dynamic value, bounds keys and serialized records, removes expired data, and implements single-use ticket and OAuth-state consumption with one `DELETE ... RETURNING` statement. The checked-in SQL migration creates only the private runtime table and expiry index. `wrangler.example.jsonc` is deliberately a deployment template: no account ID, database ID, OAuth client secret, or encryption key is committed, and nothing is deployed by this build.

Before activation, copy the example configuration to a deployment-only Worker package, add the authenticated HTTP entry point, create/apply the D1 migration, and store `GOOGLE_OAUTH_CLIENT_SECRET` plus the 32-byte token-encryption key as Worker secrets. The example uses automatic D1 provisioning only after an authorized deployment command; reviewing or testing the repository does not create any Cloudflare resource.

The authenticated Worker entry point is now implemented. It composes the D1 repositories, encrypted token vault, Google OAuth and Drive clients, health monitoring, and teacher/student evidence routes for each request without global request state. Authentication and teacher-to-class authorization must come from the private `PLATFORM_AUTH` service binding; browser-supplied role headers are never trusted. The Worker rejects oversized bodies before route construction, returns non-cacheable responses, and remains disabled unless `PRODUCTION_ENABLED=true` and every required binding, URL, and secret is present.

Successful Google authorization now also creates or finds the app-owned evidence folder and saves the teacher-to-folder connection. If folder setup fails, the local encrypted token is removed and Google authorization is revoked. Disconnect removes token and connection metadata but never deletes teacher evidence.

Remaining activation work is outside this isolated service: the published platform must implement the two private authentication endpoints, deployment secrets must be entered, the OAuth client/domain must be approved, and staging must pass end-to-end testing before `PRODUCTION_ENABLED` changes to `true`.

The private platform-authentication Worker foundation now implements those two Evidence service endpoints. It accepts only an opaque `__Host-` session cookie, stores only the SHA-256 session hash, enforces teacher or student role from durable data, checks expiration and revocation, and verifies teacher-to-class ownership against an active membership record. A teacher ID supplied in an authorization request must match the verified teacher session, preventing browser-side impersonation.

The authentication Worker has a separate D1 migration and deployment template. Its template explicitly disables `workers.dev` and preview URLs and declares no public route, leaving the service reachable only through the Evidence Worker's Cloudflare service binding. Session creation and revocation are repository operations for the future real teacher sign-in and student classroom-entry flows; no public session-creation endpoint exists.

Remaining activation work is now the real identity entry layer: connect teacher sign-in to an approved identity provider, create classroom memberships during teacher setup, create bounded student sessions through the platform's classroom-entry flow, and add sign-out/session rotation. The fictional local session store remains isolated from this production service.

The identity-entry server foundation now separates a public identity Worker from the private authentication Worker. Teacher entry accepts a Google Identity Services credential only after double-submit CSRF validation, verifies the JWT's Google signature against Google's discovered signing keys, and checks issuer, audience, expiration, subject, and authoritative verified email status. The stable Google subject is hashed before storage; teacher email addresses are not stored. The resulting platform session is independent from the later `drive.file` authorization used for evidence.

Students do not use Google. They enter a teacher-provided classroom code plus an individual student code. Both codes are normalized and protected with an HMAC-SHA-256 key stored separately as the `CLASSROOM_CODE_HASH_KEY` Worker secret; a database copy alone cannot be used to test guesses. Both codes must resolve to active classroom records before an eight-hour student platform session is issued. Sign-out revokes the server record and expires the browser cookie.

The authentication database now includes an append-oriented, privacy-minimized audit foundation. It records successful teacher or student session issuance, session revocation, and classroom creation using opaque internal actor and classroom IDs. Passwords, class codes, student codes, Google subjects or tokens, student labels, Drive filenames, and evidence content are never written to the audit table. Audit retention and authorized review remain policy gates before real-student launch; this foundation does not create an administrator browsing surface or automated deletion policy.

Production identity now fails closed unless the audit policy gate is complete. Activation requires an explicit approval flag, the fixed minimum-purpose scope, a restricted platform-security audience, an approved retention period between 1 and 365 days, and a requirement for deletion enforcement. These configuration fields document approval; they do not substitute for privacy, operations, security, or district review, and production must remain disabled until the chosen retention period can actually be enforced.

The authentication Worker includes deletion enforcement for an approved policy: a daily scheduled task deletes at most 500 audit records per run, oldest first, when they are older than the configured retention period. The task does nothing unless production and every audit-policy gate are enabled. Its SQL targets only `platform_audit_events`; it does not delete sessions, teacher identities, classroom records, student entries, or evidence.

Each successful cleanup updates one private maintenance-status row with only the completion time, cutoff time, and number of deleted audit records. A private service-binding endpoint can read that status for operational checks. It contains no audit events, actor or classroom identifiers, student information, Google data, filenames, or evidence content, and it is not routed through the public Identity or Evidence Workers.

The private status classifies the daily job as `pending` before its first successful run, `healthy` for 36 hours after success, `stale` after that window, or `invalid` when stored maintenance metadata fails validation. This status is advisory operational evidence: a delayed job does not automatically lock teachers or students out, but it must be investigated before treating retention enforcement as healthy.

This remains a disabled production foundation. No classroom codes, student records, Google Sign-In client, route, or real user session has been created. Activation still requires the teacher onboarding/class-setup workflow, district-facing policy review, a published same-origin route, and staged browser testing.

Teacher classroom setup is now implemented at the server boundary. An authenticated teacher may create a named class with 1–40 unique student display labels. Cryptographically generated class and individual student codes are returned once, while D1 receives only HMAC-protected code values. Class creation also writes the teacher ownership membership atomically. Teachers may list their own classes without recovering private student codes.

Student entry is rate-limited by classroom code through a Cloudflare rate-limit binding rather than by IP address, avoiding accidental lockout of a whole school network. The local teacher and student entry screens now show the future production paths beside the existing fictional pilot; production controls remain disabled and clearly labeled until deployment readiness is complete.

## School boundary

Some Google Workspace districts may block third-party apps even after Google verifies THINKamigBOB. The platform should present a short IT approval packet when Google reports an administrator restriction; teachers should not be asked to diagnose OAuth errors or configure Google Cloud.
