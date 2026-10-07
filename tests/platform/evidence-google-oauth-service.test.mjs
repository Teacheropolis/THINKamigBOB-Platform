import test from "node:test";
import assert from "node:assert/strict";
import { createGoogleEvidenceOAuthService, createGoogleOAuthStateStore } from "../../platform/integrations/google/evidence-google-oauth-service.mjs";
import { GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../platform/scripts/evidence-google-oauth-readiness.mjs";

function fixture({ now = () => 1000, tokenScope = GOOGLE_OAUTH_REQUIRED_SCOPE } = {}) {
  const saved = new Map();
  const connections = new Map();
  const revoked = [];
  const tokenVault = {
    async save(value) { saved.set(value.teacherId, { ...value, folderName: "THINKamigBOB Student Evidence" }); },
    async status({ teacherId }) { return saved.has(teacherId) ? { connected: true, folderName: saved.get(teacherId).folderName } : { connected: false }; },
    async readForRevocation({ teacherId }) { return saved.get(teacherId)?.refreshToken || null; },
    async delete({ teacherId }) { saved.delete(teacherId); },
    async use({ teacherId, operation }) { return operation(saved.get(teacherId)?.refreshToken); },
  };
  const tokenClient = {
    async exchange({ verifier }) { return { refreshToken: `refresh-${verifier}`, scope: tokenScope }; },
    async revoke({ token }) { revoked.push(token); },
  };
  const random = (length) => Buffer.alloc(length, length);
  const stateStore = createGoogleOAuthStateStore({ now, random });
  const driveClient = { async ensureEvidenceFolder() { return { id: "folder-1", name: "THINKamigBOB Student Evidence" }; } };
  const connectionStore = {
    async save(value) { connections.set(value.teacherId, { ...value }); },
    async delete({ teacherId }) { connections.delete(teacherId); },
  };
  const service = createGoogleEvidenceOAuthService({ clientId: "production-client-id", clientSecret: "server-only-secret", redirectUri: "https://platform.example.org/api/evidence/google/v1/connect/callback", stateStore, tokenClient, tokenVault, driveClient, connectionStore });
  return { service, saved, connections, revoked };
}

test("authorization start uses state, PKCE, offline access, and only drive.file", async () => {
  const { service } = fixture();
  const started = await service.start({ teacherId: "teacher-1" });
  const url = new URL(started.authorizationUrl);
  assert.equal(url.origin, "https://accounts.google.com");
  assert.equal(url.searchParams.get("scope"), GOOGLE_OAUTH_REQUIRED_SCOPE);
  assert.equal(url.searchParams.get("access_type"), "offline");
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.ok(url.searchParams.get("state"));
  assert.ok(url.searchParams.get("code_challenge"));
  assert.equal(started.authorizationUrl.includes("server-only-secret"), false);
});

test("callback consumes state once and records a ready evidence folder", async () => {
  const { service, saved, connections } = fixture();
  const started = await service.start({ teacherId: "teacher-1" });
  const state = new URL(started.authorizationUrl).searchParams.get("state");
  const first = await service.callback({ code: "authorization-code", state });
  assert.deepEqual(first, { ok: true, status: "connected", teacherId: "teacher-1" });
  assert.equal(saved.has("teacher-1"), true);
  assert.equal(connections.get("teacher-1").folderId, "folder-1");
  const replay = await service.callback({ code: "authorization-code", state });
  assert.equal(replay.reason, "invalid-or-used-state");
});

test("expired state and missing drive.file fail closed", async () => {
  let time = 1000;
  const expiredFixture = fixture({ now: () => time });
  const expiredStart = await expiredFixture.service.start({ teacherId: "teacher-1" });
  time += 11 * 60 * 1000;
  assert.equal((await expiredFixture.service.callback({ code: "code", state: new URL(expiredStart.authorizationUrl).searchParams.get("state") })).reason, "expired-state");
  const broadOnly = fixture({ tokenScope: "https://www.googleapis.com/auth/drive" });
  const broadStart = await broadOnly.service.start({ teacherId: "teacher-2" });
  assert.equal((await broadOnly.service.callback({ code: "code", state: new URL(broadStart.authorizationUrl).searchParams.get("state") })).reason, "required-drive-file-access-not-granted");
});

test("disconnect revokes authorization and connection metadata but never deletes evidence files", async () => {
  const { service, connections, revoked } = fixture();
  const started = await service.start({ teacherId: "teacher-1" });
  await service.callback({ code: "code", state: new URL(started.authorizationUrl).searchParams.get("state") });
  assert.equal((await service.status({ teacherId: "teacher-1" })).status, "connected");
  const disconnected = await service.disconnect({ teacherId: "teacher-1" });
  assert.deepEqual(disconnected, { ok: true, status: "not-connected", evidenceFilesDeleted: false, revocationPending: false });
  assert.equal(revoked.length, 1);
  assert.equal(connections.has("teacher-1"), false);
  assert.equal((await service.status({ teacherId: "teacher-1" })).status, "not-connected");
});

test("disconnect completes locally when Google revocation is temporarily unavailable", async () => {
  const values = new Map([["teacher-1", "refresh-1"]]);
  const connections = new Set(["teacher-1"]);
  const service = createGoogleEvidenceOAuthService({
    clientId: "client",
    clientSecret: "secret",
    redirectUri: "https://platform.example.org/api/evidence/google/v1/connect/callback",
    stateStore: createGoogleOAuthStateStore(),
    tokenClient: { async exchange() {}, async revoke() { throw new Error("network-failed"); } },
    tokenVault: { async save() {}, async status() { return { connected: true }; }, async use() {}, async readForRevocation({ teacherId }) { return values.get(teacherId); }, async delete({ teacherId }) { values.delete(teacherId); } },
    driveClient: { async ensureEvidenceFolder() {} },
    connectionStore: { async save() {}, async delete({ teacherId }) { connections.delete(teacherId); } },
  });
  const result = await service.disconnect({ teacherId: "teacher-1" });
  assert.equal(result.revocationPending, true);
  assert.equal(values.size, 0);
  assert.equal(connections.size, 0);
});

test("failed folder setup removes the local token and revokes Google authorization", async () => {
  const saved = new Map();
  const revoked = [];
  const stateStore = createGoogleOAuthStateStore({ now: () => 1000, random: (length) => Buffer.alloc(length, 2) });
  const tokenVault = {
    async save({ teacherId, refreshToken }) { saved.set(teacherId, refreshToken); },
    async status() { return { connected: false }; },
    async use() { throw new Error("drive-folder-create-failed"); },
    async readForRevocation() { return null; },
    async delete({ teacherId }) { saved.delete(teacherId); },
  };
  const tokenClient = { async exchange() { return { refreshToken: "refresh-1", scope: GOOGLE_OAUTH_REQUIRED_SCOPE }; }, async revoke({ token }) { revoked.push(token); } };
  const service = createGoogleEvidenceOAuthService({ clientId: "client", clientSecret: "secret", redirectUri: "https://platform.example.org/api/evidence/google/v1/connect/callback", stateStore, tokenClient, tokenVault, driveClient: { async ensureEvidenceFolder() {} }, connectionStore: { async save() {}, async delete() {} } });
  const started = await service.start({ teacherId: "teacher-1" });
  await assert.rejects(service.callback({ code: "code", state: new URL(started.authorizationUrl).searchParams.get("state") }), /drive-folder-create-failed/);
  assert.equal(saved.size, 0);
  assert.deepEqual(revoked, ["refresh-1"]);
});

test("service refuses localhost callbacks and incomplete secure dependencies", () => {
  assert.throws(() => createGoogleEvidenceOAuthService({ redirectUri: "http://127.0.0.1/callback" }), /valid-production-redirect-required/);
  assert.throws(() => createGoogleEvidenceOAuthService({ redirectUri: "https://platform.example.org/callback" }), /server-oauth-credentials-required/);
});
