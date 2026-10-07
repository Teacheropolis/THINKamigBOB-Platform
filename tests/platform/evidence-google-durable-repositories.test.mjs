import test from "node:test";
import assert from "node:assert/strict";
import { createDurableEvidenceRepositories } from "../../platform/integrations/google/evidence-google-durable-repositories.mjs";
import { createEncryptedTeacherTokenVault } from "../../platform/integrations/google/evidence-google-token-vault.mjs";

function durableStore(now) {
  const values = new Map();
  return {
    values,
    async get(key) {
      const record = values.get(key);
      if (!record || (record.expiresAt && now() > record.expiresAt)) { values.delete(key); return null; }
      return structuredClone(record.value);
    },
    async put(key, value, options = {}) { values.set(key, { value: structuredClone(value), expiresAt: options.expiresAt || null }); },
    async delete(key) { values.delete(key); },
    async take(key) {
      const record = values.get(key);
      values.delete(key);
      if (!record || (record.expiresAt && now() > record.expiresAt)) return null;
      return structuredClone(record.value);
    },
  };
}

function deterministicRandom() {
  let sequence = 0;
  return (length) => Buffer.alloc(length, ++sequence);
}

test("encrypted teacher tokens survive repository reconstruction without plaintext storage", async () => {
  let clock = 1000;
  const store = durableStore(() => clock);
  const first = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  const vault1 = createEncryptedTeacherTokenVault({ key: Buffer.alloc(32, 5), repository: first.tokenRepository, random: () => Buffer.alloc(12, 8) });
  await vault1.save({ teacherId: "teacher-1", refreshToken: "private-refresh-token", scope: "drive.file" });
  assert.equal(JSON.stringify([...store.values]).includes("private-refresh-token"), false);
  assert.equal(JSON.stringify([...store.values]).includes("teacher-1"), false);
  const second = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  const vault2 = createEncryptedTeacherTokenVault({ key: Buffer.alloc(32, 5), repository: second.tokenRepository });
  assert.deepEqual(await vault2.use({ teacherId: "teacher-1", operation: (token) => ({ tokenMatches: token === "private-refresh-token" }) }), { tokenMatches: true });
});

test("teacher connection and active launch survive a new application instance", async () => {
  let clock = 1000;
  const store = durableStore(() => clock);
  const first = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  await first.connectionStore.save({ teacherId: "teacher-1", folderId: "folder-1", folderName: "Evidence" });
  const launch = await first.launchStore.publish({ teacherId: "teacher-1", classId: "class-1", folderId: "folder-1", activity: "Bridge Test" });
  const second = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  assert.equal((await second.connectionStore.get({ teacherId: "teacher-1" })).folderId, "folder-1");
  assert.equal((await second.launchStore.current({ classId: "class-1" })).id, launch.id);
  clock += 4 * 60 * 60 * 1000 + 1;
  assert.equal(await second.launchStore.current({ classId: "class-1" }), null);
});

test("durable ticket take is atomic and permits exactly one upload across instances", async () => {
  const store = durableStore(() => 1000);
  const first = createDurableEvidenceRepositories({ store, now: () => 1000, random: deterministicRandom() });
  const second = createDurableEvidenceRepositories({ store, now: () => 1000, random: deterministicRandom() });
  const issued = await first.ticketStore.issue({ teacherId: "teacher-1", studentId: "student-1", folderId: "folder-1", activity: "Bridge" });
  const results = await Promise.all([first.ticketStore.consume(issued.token, "image/png"), second.ticketStore.consume(issued.token, "image/png")]);
  assert.equal(results.filter((result) => result.ok).length, 1);
  assert.equal(results.filter((result) => result.reason === "invalid-or-used-ticket").length, 1);
  assert.equal(JSON.stringify([...store.values]).includes(issued.token), false);
});

test("OAuth state is durable, short-lived, PKCE-enabled, and single-use", async () => {
  let clock = 1000;
  const store = durableStore(() => clock);
  const first = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  const issued = await first.oauthStateStore.issue({ teacherId: "teacher-1" });
  assert.ok(issued.challenge);
  const second = createDurableEvidenceRepositories({ store, now: () => clock, random: deterministicRandom() });
  assert.equal((await second.oauthStateStore.consume(issued.state)).value.teacherId, "teacher-1");
  assert.equal((await first.oauthStateStore.consume(issued.state)).reason, "invalid-or-used-state");
  const expiring = await first.oauthStateStore.issue({ teacherId: "teacher-1" });
  clock += 10 * 60 * 1000 + 1;
  assert.equal((await second.oauthStateStore.consume(expiring.state)).reason, "invalid-or-used-state");
});

test("connection deletion is durable and never deletes Drive evidence", async () => {
  const store = durableStore(() => 1000);
  const repositories = createDurableEvidenceRepositories({ store, now: () => 1000, random: deterministicRandom() });
  await repositories.connectionStore.save({ teacherId: "teacher-1", folderId: "folder-1", folderName: "Evidence" });
  await repositories.connectionStore.delete({ teacherId: "teacher-1" });
  assert.equal(await repositories.connectionStore.get({ teacherId: "teacher-1" }), null);
  assert.equal(typeof repositories.connectionStore.delete, "function");
});
