import test from "node:test";
import assert from "node:assert/strict";
import { createGoogleDriveEvidenceClient, createGoogleTokenClient, EVIDENCE_FILE_PROPERTY, EVIDENCE_FOLDER_PROPERTY, GOOGLE_DRIVE_FILES_ENDPOINT, GOOGLE_DRIVE_FOLDER_MIME, GOOGLE_REVOKE_ENDPOINT, GOOGLE_TOKEN_ENDPOINT, MAX_PRODUCTION_EVIDENCE_BYTES } from "../../platform/integrations/google/evidence-google-api-clients.mjs";
import { GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../platform/scripts/evidence-google-oauth-readiness.mjs";

function response(body, { ok = true, status = 200, bytes = null } = {}) {
  const binary = Buffer.from(bytes || []);
  return { ok, status, async json() { return body; }, async arrayBuffer() { return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength); } };
}

test("token client exchanges authorization code with PKCE at Google's server endpoint", async () => {
  const calls = [];
  const client = createGoogleTokenClient({ fetchImpl: async (url, options) => { calls.push({ url, options }); return response({ access_token: "access", refresh_token: "refresh", expires_in: 3600, scope: GOOGLE_OAUTH_REQUIRED_SCOPE, token_type: "Bearer" }); } });
  const result = await client.exchange({ code: "code", verifier: "verifier", clientId: "client-id", clientSecret: "server-secret", redirectUri: "https://platform.example.org/callback" });
  assert.equal(calls[0].url, GOOGLE_TOKEN_ENDPOINT);
  const form = new URLSearchParams(calls[0].options.body);
  assert.equal(form.get("grant_type"), "authorization_code");
  assert.equal(form.get("code_verifier"), "verifier");
  assert.equal(result.refreshToken, "refresh");
  assert.equal(JSON.stringify(result).includes("server-secret"), false);
});

test("token refresh and revocation use Google's bounded endpoints", async () => {
  const calls = [];
  const client = createGoogleTokenClient({ fetchImpl: async (url, options) => { calls.push({ url, options }); return url === GOOGLE_TOKEN_ENDPOINT ? response({ access_token: "short-access", expires_in: 3600 }) : response({}); } });
  const refreshed = await client.refresh({ refreshToken: "stored-refresh", clientId: "client-id", clientSecret: "server-secret" });
  assert.equal(refreshed.accessToken, "short-access");
  await client.revoke({ token: "stored-refresh" });
  assert.deepEqual(calls.map((call) => call.url), [GOOGLE_TOKEN_ENDPOINT, GOOGLE_REVOKE_ENDPOINT]);
  assert.equal(new URLSearchParams(calls[1].options.body).get("token"), "stored-refresh");
});

test("Drive client reuses the app-owned evidence folder when present", async () => {
  const calls = [];
  const tokenClient = { async refresh() { return { accessToken: "access" }; } };
  const client = createGoogleDriveEvidenceClient({ tokenClient, clientId: "client-id", clientSecret: "server-secret", fetchImpl: async (url, options) => { calls.push({ url: String(url), options }); return response({ files: [{ id: "folder-1", name: "THINKamigBOB Student Evidence", mimeType: GOOGLE_DRIVE_FOLDER_MIME }] }); } });
  const folder = await client.ensureEvidenceFolder({ refreshToken: "refresh" });
  assert.deepEqual(folder, { id: "folder-1", name: "THINKamigBOB Student Evidence", created: false });
  assert.equal(calls.length, 1);
  const search = new URL(calls[0].url).searchParams.get("q");
  assert.match(search, /appProperties has/);
  assert.match(search, new RegExp(EVIDENCE_FOLDER_PROPERTY.key));
  assert.equal(calls[0].options.headers.Authorization, "Bearer access");
});

test("Drive client creates one private app-marked folder when none exists", async () => {
  const calls = [];
  const tokenClient = { async refresh() { return { accessToken: "access" }; } };
  const client = createGoogleDriveEvidenceClient({ tokenClient, clientId: "client-id", clientSecret: "server-secret", fetchImpl: async (url, options) => { calls.push({ url: String(url), options }); return calls.length === 1 ? response({ files: [] }) : response({ id: "new-folder", name: "THINKamigBOB Student Evidence", mimeType: GOOGLE_DRIVE_FOLDER_MIME }); } });
  const folder = await client.ensureEvidenceFolder({ refreshToken: "refresh" });
  assert.deepEqual(folder, { id: "new-folder", name: "THINKamigBOB Student Evidence", created: true });
  assert.equal(new URL(calls[1].url).origin + new URL(calls[1].url).pathname, GOOGLE_DRIVE_FILES_ENDPOINT);
  assert.equal(new URL(calls[1].url).searchParams.get("ignoreDefaultVisibility"), "true");
  const metadata = JSON.parse(calls[1].options.body);
  assert.equal(metadata.mimeType, GOOGLE_DRIVE_FOLDER_MIME);
  assert.deepEqual(metadata.appProperties, { [EVIDENCE_FOLDER_PROPERTY.key]: EVIDENCE_FOLDER_PROPERTY.value });
});

test("Drive health maps revoked and insufficient authorization to reconnect reasons", async () => {
  const revoked = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { throw new Error("invalid_grant"); } }, clientId: "client", clientSecret: "secret", fetchImpl: async () => response({}) });
  await assert.rejects(() => revoked.checkDriveAccess({ refreshToken: "refresh" }), /invalid_grant/);
  const insufficient = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async () => response({ error: "insufficientPermissions" }, { ok: false, status: 403 }) });
  await assert.rejects(() => insufficient.checkDriveAccess({ refreshToken: "refresh" }), /insufficient-permission/);
});

test("Drive client uploads bounded app-marked evidence only into the managed folder", async () => {
  const calls = [];
  const client = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async (url, options) => { calls.push({ url: String(url), options }); return response({ id: "evidence-1", name: "bridge.png", mimeType: "image/png", size: "4", createdTime: "2026-09-27T12:00:00Z" }); } });
  const result = await client.uploadEvidence({ refreshToken: "refresh", folderId: "folder-1", bytes: Buffer.from("test"), mimeType: "image/png", fileName: "bridge.png", studentId: "student-1", activity: "Bridge Test", evidenceType: "Photo" });
  assert.equal(result.id, "evidence-1");
  const url = new URL(calls[0].url);
  assert.equal(url.pathname, "/upload/drive/v3/files");
  assert.equal(url.searchParams.get("uploadType"), "multipart");
  assert.equal(url.searchParams.get("ignoreDefaultVisibility"), "true");
  const multipart = calls[0].options.body.toString("utf8");
  assert.match(multipart, new RegExp(`"${EVIDENCE_FILE_PROPERTY.key}":"${EVIDENCE_FILE_PROPERTY.value}"`));
  assert.match(multipart, /"parents":\["folder-1"\]/);
  assert.equal(calls[0].options.headers.Authorization, "Bearer access");
});

test("Drive client rejects unsupported, empty, and oversized uploads before networking", async () => {
  let calls = 0;
  const client = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { calls += 1; return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async () => { calls += 1; return response({}); } });
  await assert.rejects(() => client.uploadEvidence({ bytes: Buffer.from("x"), mimeType: "application/pdf" }), /evidence-file-type-not-allowed/);
  await assert.rejects(() => client.uploadEvidence({ bytes: Buffer.alloc(0), mimeType: "image/png" }), /empty-evidence-file/);
  await assert.rejects(() => client.uploadEvidence({ bytes: Buffer.alloc(MAX_PRODUCTION_EVIDENCE_BYTES + 1), mimeType: "image/png" }), /evidence-file-too-large/);
  assert.equal(calls, 0);
});

test("Drive client lists only app-marked evidence inside the managed folder", async () => {
  const calls = [];
  const client = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async (url, options) => { calls.push({ url: String(url), options }); return response({ files: [{ id: "e1", name: "bridge.png", mimeType: "image/png", size: "40", createdTime: "2026-09-27T12:00:00Z", appProperties: { studentId: "student-1", activity: "Bridge Test", evidenceType: "Photo" } }] }); } });
  const items = await client.listEvidence({ refreshToken: "refresh", folderId: "folder-1" });
  assert.equal(items.length, 1);
  assert.equal(items[0].studentId, "student-1");
  const url = new URL(calls[0].url);
  assert.match(url.searchParams.get("q"), /'folder-1' in parents/);
  assert.match(url.searchParams.get("q"), new RegExp(EVIDENCE_FILE_PROPERTY.key));
  assert.equal(url.searchParams.get("pageSize"), "50");
});

test("Drive preview verifies marker, parent folder, and image type before loading bytes", async () => {
  const calls = [];
  const metadata = { id: "e1", name: "bridge.png", mimeType: "image/png", parents: ["folder-1"], trashed: false, appProperties: { [EVIDENCE_FILE_PROPERTY.key]: EVIDENCE_FILE_PROPERTY.value } };
  const client = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async (url, options) => { calls.push({ url: String(url), options }); return calls.length === 1 ? response(metadata) : response({}, { bytes: Buffer.from("image-bytes") }); } });
  const content = await client.getEvidenceContent({ refreshToken: "refresh", folderId: "folder-1", fileId: "e1" });
  assert.equal(content.bytes.toString(), "image-bytes");
  assert.equal(content.mimeType, "image/png");
  assert.equal(new URL(calls[1].url).searchParams.get("alt"), "media");
});

test("Drive preview blocks unrelated Drive files without requesting their content", async () => {
  let calls = 0;
  const client = createGoogleDriveEvidenceClient({ tokenClient: { async refresh() { return { accessToken: "access" }; } }, clientId: "client", clientSecret: "secret", fetchImpl: async () => { calls += 1; return response({ id: "other", name: "other.png", mimeType: "image/png", parents: ["different-folder"], trashed: false, appProperties: {} }); } });
  await assert.rejects(() => client.getEvidenceContent({ refreshToken: "refresh", folderId: "folder-1", fileId: "other" }), /evidence-file-outside-managed-folder/);
  assert.equal(calls, 1);
});
