import test from "node:test";
import assert from "node:assert/strict";
import { createEncryptedTeacherTokenVault } from "../../platform/integrations/google/evidence-google-token-vault.mjs";
import { createGoogleConnectionHealthService } from "../../platform/integrations/google/evidence-google-connection-health.mjs";

function inspectableRepository() {
  const values = new Map();
  return {
    values,
    async get(id) { return values.get(id) ? structuredClone(values.get(id)) : null; },
    async set(id, value) { values.set(id, structuredClone(value)); },
    async delete(id) { values.delete(id); },
  };
}

function fixture() {
  const repository = inspectableRepository();
  const vault = createEncryptedTeacherTokenVault({ key: Buffer.alloc(32, 7), repository, random: (length) => Buffer.alloc(length, 9), now: () => "2026-09-27T12:00:00.000Z" });
  return { repository, vault };
}

test("vault stores AES-GCM ciphertext instead of a plaintext refresh token", async () => {
  const { repository, vault } = fixture();
  await vault.save({ teacherId: "teacher-1", refreshToken: "private-refresh-token", scope: "drive.file" });
  const stored = repository.values.get("teacher-1");
  assert.equal(JSON.stringify(stored).includes("private-refresh-token"), false);
  assert.ok(stored.ciphertext);
  assert.ok(stored.authTag);
  assert.ok(stored.iv);
  assert.equal((await vault.status({ teacherId: "teacher-1" })).connected, true);
});

test("vault decrypts only inside a bounded server operation", async () => {
  const { vault } = fixture();
  await vault.save({ teacherId: "teacher-1", refreshToken: "private-refresh-token", scope: "drive.file" });
  const result = await vault.use({ teacherId: "teacher-1", operation: async (token) => ({ ok: token === "private-refresh-token" }) });
  assert.deepEqual(result, { ok: true });
  assert.equal(Object.keys(await vault.status({ teacherId: "teacher-1" })).includes("refreshToken"), false);
});

test("connection health converts revoked authorization into one reconnect action", async () => {
  const { vault } = fixture();
  await vault.save({ teacherId: "teacher-1", refreshToken: "revoked-token", scope: "drive.file" });
  const health = createGoogleConnectionHealthService({ tokenVault: vault, googleClient: { async checkDriveAccess() { throw new Error("invalid_grant"); } } });
  assert.deepEqual(await health.check({ teacherId: "teacher-1" }), { status: "reconnect-required", action: "reconnect" });
  assert.equal((await vault.status({ teacherId: "teacher-1" })).reconnectRequired, true);
  assert.deepEqual(await health.check({ teacherId: "teacher-1" }), { status: "reconnect-required", action: "reconnect" });
});

test("temporary Google failures do not falsely revoke a healthy connection", async () => {
  const { vault } = fixture();
  await vault.save({ teacherId: "teacher-1", refreshToken: "healthy-token", scope: "drive.file" });
  const health = createGoogleConnectionHealthService({ tokenVault: vault, googleClient: { async checkDriveAccess() { throw new Error("network-timeout"); } } });
  assert.deepEqual(await health.check({ teacherId: "teacher-1" }), { status: "temporarily-unavailable", action: "retry" });
  assert.equal((await vault.status({ teacherId: "teacher-1" })).connected, true);
});

test("healthy access reports folder readiness without returning a token", async () => {
  const { vault } = fixture();
  await vault.save({ teacherId: "teacher-1", refreshToken: "healthy-token", scope: "drive.file" });
  const health = createGoogleConnectionHealthService({ tokenVault: vault, googleClient: { async checkDriveAccess({ refreshToken }) { return { ok: refreshToken === "healthy-token", folderReady: true }; } } });
  const result = await health.check({ teacherId: "teacher-1" });
  assert.deepEqual(result, { status: "connected", action: null, folderReady: true });
  assert.equal(JSON.stringify(result).includes("healthy-token"), false);
});
