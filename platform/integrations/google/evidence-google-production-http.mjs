import { randomBytes } from "node:crypto";
import { MAX_PRODUCTION_EVIDENCE_BYTES, PRODUCTION_EVIDENCE_IMAGE_TYPES } from "./evidence-google-api-clients.mjs";

export const PRODUCTION_EVIDENCE_ENDPOINTS = Object.freeze({
  launch: "/api/evidence/google/v1/launch",
  tickets: "/api/evidence/google/v1/tickets",
  uploads: "/api/evidence/google/v1/uploads",
  evidence: "/api/evidence/google/v1/evidence",
});

const DEFAULT_LAUNCH_TTL_MS = 4 * 60 * 60 * 1000;
const DEFAULT_TICKET_TTL_MS = 5 * 60 * 1000;

function json(status, body, extra = {}) {
  return Object.freeze({ status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra }, body: JSON.stringify(body) });
}

function textHeader(request, name) {
  const entries = Object.entries(request.headers || {});
  return String(entries.find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1] || "");
}

function parseJsonBody(request) {
  const bytes = Buffer.from(request.body || []);
  if (bytes.length > 16_384) throw new Error("request-too-large");
  try { return JSON.parse(bytes.toString("utf8") || "{}"); } catch { throw new Error("invalid-json"); }
}

function clean(value, maximum = 120) {
  return String(value || "").trim().slice(0, maximum);
}

export function createProductionEvidenceLaunchStore({ now = () => Date.now(), ttlMs = DEFAULT_LAUNCH_TTL_MS, token = () => randomBytes(18).toString("base64url") } = {}) {
  const launches = new Map();
  return Object.freeze({
    async publish({ teacherId, classId, folderId, activity }) {
      const value = { id: `launch-${token()}`, teacherId: clean(teacherId), classId: clean(classId), folderId: clean(folderId, 200), activity: clean(activity), expiresAt: now() + ttlMs };
      if (!value.teacherId || !value.classId || !value.folderId || !value.activity) throw new Error("complete-launch-scope-required");
      launches.set(value.classId, value);
      return { id: value.id, activity: value.activity, expiresInMs: ttlMs };
    },
    async current({ classId }) {
      const value = launches.get(clean(classId));
      if (!value || now() > value.expiresAt) return null;
      return { ...value, expiresInMs: value.expiresAt - now() };
    },
  });
}

export function createProductionEvidenceTicketStore({ now = () => Date.now(), ttlMs = DEFAULT_TICKET_TTL_MS, token = () => randomBytes(24).toString("base64url") } = {}) {
  const tickets = new Map();
  return Object.freeze({
    async issue(scope) {
      const value = { teacherId: clean(scope.teacherId), studentId: clean(scope.studentId), folderId: clean(scope.folderId, 200), activity: clean(scope.activity), allowedTypes: [...PRODUCTION_EVIDENCE_IMAGE_TYPES], expiresAt: now() + ttlMs };
      if (!value.teacherId || !value.studentId || !value.folderId || !value.activity) throw new Error("complete-upload-scope-required");
      const ticket = token();
      tickets.set(ticket, value);
      return { token: ticket, expiresInMs: ttlMs };
    },
    async consume(ticket, mimeType) {
      const value = tickets.get(String(ticket || ""));
      tickets.delete(String(ticket || ""));
      if (!value) return { ok: false, reason: "invalid-or-used-ticket" };
      if (now() > value.expiresAt) return { ok: false, reason: "expired-ticket" };
      if (!value.allowedTypes.includes(mimeType)) return { ok: false, reason: "type-not-authorized" };
      return { ok: true, scope: value };
    },
  });
}

export function createGoogleProductionEvidenceHttpHandler({ enabled = false, platformOrigin, authenticateTeacher, authenticateStudent, authorizeClass, connectionStore, tokenVault, driveClient, launchStore, ticketStore } = {}) {
  let origin;
  try { origin = new URL(platformOrigin); } catch { throw new Error("production-platform-origin-required"); }
  if (origin.protocol !== "https:") throw new Error("https-platform-origin-required");
  const dependencies = [authenticateTeacher, authenticateStudent, authorizeClass];
  if (dependencies.some((value) => typeof value !== "function")) throw new Error("teacher-student-class-authorization-required");
  if (enabled && (typeof connectionStore?.get !== "function" || typeof tokenVault?.use !== "function" || typeof driveClient?.uploadEvidence !== "function" || typeof driveClient?.listEvidence !== "function" || typeof driveClient?.getEvidenceContent !== "function" || typeof launchStore?.publish !== "function" || typeof launchStore?.current !== "function" || typeof ticketStore?.issue !== "function" || typeof ticketStore?.consume !== "function")) throw new Error("production-evidence-services-required");

  async function teacherConnection(teacherId) {
    const connection = await connectionStore.get({ teacherId });
    if (!connection?.connected || !connection.folderId) return null;
    return connection;
  }

  return Object.freeze({
    async handle(request) {
      const url = new URL(request.url, origin);
      const contentMatch = url.pathname.match(/^\/api\/evidence\/google\/v1\/evidence\/([^/]+)\/content$/);
      const known = Object.values(PRODUCTION_EVIDENCE_ENDPOINTS).includes(url.pathname) || contentMatch;
      if (!known) return null;
      if (!enabled) return json(503, { status: "setup-required", productionEvidenceEnabled: false });
      if (textHeader(request, "origin") !== origin.origin) return json(403, { error: "same-origin-request-required" });

      if (url.pathname === PRODUCTION_EVIDENCE_ENDPOINTS.uploads && request.method === "POST") {
        const mimeType = textHeader(request, "content-type").split(";")[0].trim().toLowerCase();
        const ticket = textHeader(request, "authorization").replace(/^Bearer\s+/i, "");
        const authorization = await ticketStore.consume(ticket, mimeType);
        if (!authorization.ok) return json(401, { error: authorization.reason });
        const bytes = Buffer.from(request.body || []);
        if (!bytes.length) return json(422, { error: "empty-evidence-file" });
        if (bytes.length > MAX_PRODUCTION_EVIDENCE_BYTES) return json(413, { error: "evidence-file-too-large" });
        try {
          const evidence = await tokenVault.use({ teacherId: authorization.scope.teacherId, operation: (refreshToken) => driveClient.uploadEvidence({ refreshToken, folderId: authorization.scope.folderId, bytes, mimeType, fileName: textHeader(request, "x-evidence-filename"), studentId: authorization.scope.studentId, activity: authorization.scope.activity, evidenceType: textHeader(request, "x-evidence-type") || "Photo" }) });
          return json(201, { ok: true, evidence });
        } catch (error) { return json(502, { error: String(error?.message || "drive-upload-failed").slice(0, 120) }); }
      }

      const teacher = await authenticateTeacher(request);
      if (url.pathname === PRODUCTION_EVIDENCE_ENDPOINTS.launch && request.method === "PUT") {
        if (!teacher?.id) return json(401, { error: "authenticated-teacher-required" });
        try {
          const body = parseJsonBody(request);
          if (!(await authorizeClass({ teacherId: teacher.id, classId: body.classId }))) return json(403, { error: "teacher-class-access-required" });
          const connection = await teacherConnection(teacher.id);
          if (!connection) return json(409, { error: "teacher-drive-connection-required" });
          const launch = await launchStore.publish({ teacherId: teacher.id, classId: body.classId, folderId: connection.folderId, activity: body.activity });
          return json(200, { ok: true, launch });
        } catch (error) { return json(400, { error: error.message }); }
      }

      const student = await authenticateStudent(request);
      if (url.pathname === PRODUCTION_EVIDENCE_ENDPOINTS.launch && request.method === "GET") {
        if (!student?.id || !student.classId) return json(401, { error: "authenticated-student-required" });
        const launch = await launchStore.current({ classId: student.classId });
        return launch ? json(200, { ok: true, launch: { id: launch.id, activity: launch.activity, expiresInMs: launch.expiresInMs } }) : json(404, { error: "no-active-launch" });
      }
      if (url.pathname === PRODUCTION_EVIDENCE_ENDPOINTS.tickets && request.method === "POST") {
        if (!student?.id || !student.classId) return json(401, { error: "authenticated-student-required" });
        const body = parseJsonBody(request);
        const launch = await launchStore.current({ classId: student.classId });
        if (!launch || launch.id !== body.launchId) return json(409, { error: "valid-class-launch-required" });
        const issued = await ticketStore.issue({ teacherId: launch.teacherId, studentId: student.id, folderId: launch.folderId, activity: launch.activity });
        return json(201, { ok: true, ticket: issued.token, expiresInMs: issued.expiresInMs });
      }

      if (url.pathname === PRODUCTION_EVIDENCE_ENDPOINTS.evidence && request.method === "GET") {
        if (!teacher?.id) return json(401, { error: "authenticated-teacher-required" });
        const connection = await teacherConnection(teacher.id);
        if (!connection) return json(409, { error: "teacher-drive-connection-required" });
        const evidence = await tokenVault.use({ teacherId: teacher.id, operation: (refreshToken) => driveClient.listEvidence({ refreshToken, folderId: connection.folderId }) });
        return json(200, { ok: true, evidence });
      }
      if (contentMatch && request.method === "GET") {
        if (!teacher?.id) return json(401, { error: "authenticated-teacher-required" });
        const connection = await teacherConnection(teacher.id);
        if (!connection) return json(409, { error: "teacher-drive-connection-required" });
        try {
          const content = await tokenVault.use({ teacherId: teacher.id, operation: (refreshToken) => driveClient.getEvidenceContent({ refreshToken, folderId: connection.folderId, fileId: decodeURIComponent(contentMatch[1]) }) });
          return Object.freeze({ status: 200, headers: { "Content-Type": content.mimeType, "Content-Length": String(content.bytes.length), "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }, body: content.bytes });
        } catch { return json(404, { error: "evidence-preview-unavailable" }); }
      }
      return json(405, { error: "method-not-allowed" });
    },
  });
}
