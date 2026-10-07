import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const VERSION = 1;

function teacherKey(value) {
  const teacherId = String(value || "").trim();
  if (!teacherId || teacherId.length > 120) throw new Error("valid-teacher-session-required");
  return teacherId;
}

function encryptionKey(value) {
  const key = Buffer.isBuffer(value) ? value : Buffer.from(value || "", "base64");
  if (key.length !== 32) throw new Error("32-byte-token-encryption-key-required");
  return key;
}

export function createMemoryTokenRepository() {
  const values = new Map();
  return Object.freeze({
    async get(id) { const value = values.get(id); return value ? structuredClone(value) : null; },
    async set(id, value) { values.set(id, structuredClone(value)); },
    async delete(id) { values.delete(id); },
  });
}

export function createEncryptedTeacherTokenVault({ key, repository, now = () => new Date().toISOString(), random = (length) => randomBytes(length) } = {}) {
  const secret = encryptionKey(key);
  if (typeof repository?.get !== "function" || typeof repository?.set !== "function" || typeof repository?.delete !== "function") throw new Error("durable-token-repository-required");

  function encrypt(teacherId, refreshToken) {
    const iv = random(12);
    const cipher = createCipheriv(ALGORITHM, secret, iv);
    cipher.setAAD(Buffer.from(teacherId));
    const ciphertext = Buffer.concat([cipher.update(refreshToken, "utf8"), cipher.final()]);
    return { iv: iv.toString("base64"), ciphertext: ciphertext.toString("base64"), authTag: cipher.getAuthTag().toString("base64") };
  }

  function decrypt(teacherId, record) {
    const decipher = createDecipheriv(ALGORITHM, secret, Buffer.from(record.iv, "base64"));
    decipher.setAAD(Buffer.from(teacherId));
    decipher.setAuthTag(Buffer.from(record.authTag, "base64"));
    return Buffer.concat([decipher.update(Buffer.from(record.ciphertext, "base64")), decipher.final()]).toString("utf8");
  }

  async function updateState(teacherId, state, reason = null) {
    const owner = teacherKey(teacherId);
    const record = await repository.get(owner);
    if (!record) return false;
    await repository.set(owner, { ...record, state, reason, checkedAt: now() });
    return true;
  }

  return Object.freeze({
    async save({ teacherId, refreshToken, scope }) {
      const owner = teacherKey(teacherId);
      const token = String(refreshToken || "");
      if (!token) throw new Error("refresh-token-required");
      const encrypted = encrypt(owner, token);
      await repository.set(owner, { version: VERSION, ...encrypted, scope: String(scope || ""), state: "connected", reason: null, savedAt: now(), checkedAt: null });
    },
    async status({ teacherId }) {
      const record = await repository.get(teacherKey(teacherId));
      return Object.freeze({ connected: record?.state === "connected", reconnectRequired: record?.state === "reconnect-required", folderName: record?.folderName || null, checkedAt: record?.checkedAt || null });
    },
    async use({ teacherId, operation }) {
      const owner = teacherKey(teacherId);
      if (typeof operation !== "function") throw new Error("bounded-token-operation-required");
      const record = await repository.get(owner);
      if (!record) return { ok: false, reason: "not-connected" };
      try {
        return await operation(decrypt(owner, record));
      } catch (error) {
        if (error?.message === "Unsupported state or unable to authenticate data") throw new Error("token-record-integrity-failed");
        throw error;
      }
    },
    async readForRevocation({ teacherId }) {
      const owner = teacherKey(teacherId);
      const record = await repository.get(owner);
      return record ? decrypt(owner, record) : null;
    },
    async markHealthy({ teacherId }) { return updateState(teacherId, "connected"); },
    async markReconnectRequired({ teacherId, reason }) { return updateState(teacherId, "reconnect-required", String(reason || "authorization-required").slice(0, 120)); },
    async delete({ teacherId }) { await repository.delete(teacherKey(teacherId)); },
  });
}
