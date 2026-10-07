import { createHash, randomBytes } from "node:crypto";
import { PRODUCTION_EVIDENCE_IMAGE_TYPES } from "./evidence-google-api-clients.mjs";

const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
const TEN_MINUTES_MS = 10 * 60 * 1000;
const FIVE_MINUTES_MS = 5 * 60 * 1000;

function hash(value) {
  return createHash("sha256").update(String(value || "")).digest("base64url");
}

function clean(value, maximum = 160) {
  return String(value || "").trim().slice(0, maximum);
}

function requireStore(store) {
  if (typeof store?.get !== "function" || typeof store?.put !== "function" || typeof store?.delete !== "function" || typeof store?.take !== "function") throw new Error("durable-atomic-store-required");
  return store;
}

function scoped(namespace, kind, id) {
  return `${namespace}:${kind}:${hash(id)}`;
}

export function createDurableEvidenceRepositories({ store, namespace = "thinkamigbob:evidence:v1", now = () => Date.now(), random = (length) => randomBytes(length) } = {}) {
  const database = requireStore(store);

  const tokenRepository = Object.freeze({
    async get(teacherId) { return database.get(scoped(namespace, "token", teacherId)); },
    async set(teacherId, value) { await database.put(scoped(namespace, "token", teacherId), value); },
    async delete(teacherId) { await database.delete(scoped(namespace, "token", teacherId)); },
  });

  const connectionStore = Object.freeze({
    async get({ teacherId }) { return database.get(scoped(namespace, "connection", teacherId)); },
    async save({ teacherId, folderId, folderName }) {
      const owner = clean(teacherId, 120);
      const folder = clean(folderId, 200);
      if (!owner || !folder) throw new Error("teacher-and-folder-required");
      const value = { version: 1, connected: true, folderId: folder, folderName: clean(folderName, 80) || "THINKamigBOB Student Evidence", updatedAt: now() };
      await database.put(scoped(namespace, "connection", owner), value);
      return { ...value };
    },
    async delete({ teacherId }) { await database.delete(scoped(namespace, "connection", teacherId)); },
  });

  const launchStore = Object.freeze({
    async publish({ teacherId, classId, folderId, activity }) {
      const value = { version: 1, id: `launch-${random(18).toString("base64url")}`, teacherId: clean(teacherId, 120), classId: clean(classId, 120), folderId: clean(folderId, 200), activity: clean(activity, 120), expiresAt: now() + FOUR_HOURS_MS };
      if (!value.teacherId || !value.classId || !value.folderId || !value.activity) throw new Error("complete-launch-scope-required");
      await database.put(scoped(namespace, "launch", value.classId), value, { expiresAt: value.expiresAt });
      return { id: value.id, activity: value.activity, expiresInMs: FOUR_HOURS_MS };
    },
    async current({ classId }) {
      const value = await database.get(scoped(namespace, "launch", classId));
      if (!value || now() > value.expiresAt) return null;
      return { ...value, expiresInMs: value.expiresAt - now() };
    },
  });

  const ticketStore = Object.freeze({
    async issue({ teacherId, studentId, folderId, activity }) {
      const token = random(24).toString("base64url");
      const value = { version: 1, teacherId: clean(teacherId, 120), studentId: clean(studentId, 120), folderId: clean(folderId, 200), activity: clean(activity, 120), allowedTypes: [...PRODUCTION_EVIDENCE_IMAGE_TYPES], expiresAt: now() + FIVE_MINUTES_MS };
      if (!value.teacherId || !value.studentId || !value.folderId || !value.activity) throw new Error("complete-upload-scope-required");
      await database.put(scoped(namespace, "ticket", token), value, { expiresAt: value.expiresAt });
      return { token, expiresInMs: FIVE_MINUTES_MS };
    },
    async consume(token, mimeType) {
      const value = await database.take(scoped(namespace, "ticket", token));
      if (!value) return { ok: false, reason: "invalid-or-used-ticket" };
      if (now() > value.expiresAt) return { ok: false, reason: "expired-ticket" };
      if (!value.allowedTypes.includes(mimeType)) return { ok: false, reason: "type-not-authorized" };
      return { ok: true, scope: value };
    },
  });

  const oauthStateStore = Object.freeze({
    async issue({ teacherId }) {
      const owner = clean(teacherId, 120);
      if (!owner) throw new Error("valid-teacher-session-required");
      const state = random(32).toString("base64url");
      const verifier = random(48).toString("base64url");
      const challenge = createHash("sha256").update(verifier).digest("base64url");
      const value = { version: 1, teacherId: owner, verifier, expiresAt: now() + TEN_MINUTES_MS };
      await database.put(scoped(namespace, "oauth-state", state), value, { expiresAt: value.expiresAt });
      return { state, challenge, expiresInMs: TEN_MINUTES_MS };
    },
    async consume(state) {
      const value = await database.take(scoped(namespace, "oauth-state", state));
      if (!value) return { ok: false, reason: "invalid-or-used-state" };
      if (now() > value.expiresAt) return { ok: false, reason: "expired-state" };
      return { ok: true, value };
    },
  });

  return Object.freeze({ tokenRepository, connectionStore, launchStore, ticketStore, oauthStateStore });
}
