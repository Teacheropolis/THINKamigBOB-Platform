import test from "node:test";
import assert from "node:assert/strict";
import { createGoogleProductionEvidenceHttpHandler, createProductionEvidenceLaunchStore, createProductionEvidenceTicketStore, PRODUCTION_EVIDENCE_ENDPOINTS } from "../../platform/integrations/google/evidence-google-production-http.mjs";

const origin = "https://platform.example.org";

function request(path, { method = "GET", role = "teacher", body = null, headers = {} } = {}) {
  return { method, url: `${origin}${path}`, role, headers: { origin, ...headers }, body: body == null ? Buffer.alloc(0) : Buffer.isBuffer(body) ? body : Buffer.from(JSON.stringify(body)) };
}

function fixture({ enabled = true } = {}) {
  let sequence = 0;
  const launchStore = createProductionEvidenceLaunchStore({ token: () => `launch-token-${++sequence}` });
  const ticketStore = createProductionEvidenceTicketStore({ token: () => `ticket-${++sequence}` });
  const driveCalls = [];
  const driveClient = {
    async uploadEvidence(value) { driveCalls.push(["upload", value]); return { id: "e1", name: value.fileName, mimeType: value.mimeType, size: value.bytes.length }; },
    async listEvidence(value) { driveCalls.push(["list", value]); return [{ id: "e1", name: "bridge.png", mimeType: "image/png" }]; },
    async getEvidenceContent(value) { driveCalls.push(["content", value]); return { bytes: Buffer.from("image"), mimeType: "image/png", name: "bridge.png" }; },
  };
  const handler = createGoogleProductionEvidenceHttpHandler({
    enabled,
    platformOrigin: origin,
    authenticateTeacher: async (value) => value.role === "teacher" ? { id: "teacher-1" } : null,
    authenticateStudent: async (value) => value.role === "student" ? { id: "student-1", classId: "class-1" } : null,
    authorizeClass: async ({ teacherId, classId }) => teacherId === "teacher-1" && classId === "class-1",
    connectionStore: { async get({ teacherId }) { return teacherId === "teacher-1" ? { connected: true, folderId: "folder-1" } : null; } },
    tokenVault: { async use({ teacherId, operation }) { assert.equal(teacherId, "teacher-1"); return operation("encrypted-vault-refresh-token"); } },
    driveClient,
    launchStore,
    ticketStore,
  });
  return { handler, driveCalls };
}

async function launchForClass(handler) {
  const response = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.launch, { method: "PUT", body: { classId: "class-1", activity: "Bridge Test" } }));
  assert.equal(response.status, 200);
  return JSON.parse(response.body).launch;
}

test("production evidence routes remain disabled in local or incomplete environments", async () => {
  const { handler } = fixture({ enabled: false });
  const result = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.evidence));
  assert.equal(result.status, 503);
  assert.deepEqual(JSON.parse(result.body), { status: "setup-required", productionEvidenceEnabled: false });
});

test("teacher launches evidence only for an authorized class and connected Drive", async () => {
  const { handler } = fixture();
  const denied = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.launch, { method: "PUT", body: { classId: "other-class", activity: "Bridge" } }));
  assert.equal(denied.status, 403);
  const launched = await launchForClass(handler);
  assert.equal(launched.activity, "Bridge Test");
  assert.ok(launched.id);
});

test("student obtains a single-use scoped ticket without a Google account", async () => {
  const { handler } = fixture();
  const launch = await launchForClass(handler);
  const current = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.launch, { role: "student" }));
  assert.equal(JSON.parse(current.body).launch.id, launch.id);
  const ticket = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.tickets, { method: "POST", role: "student", body: { launchId: launch.id } }));
  assert.equal(ticket.status, 201);
  assert.equal(JSON.parse(ticket.body).ticket.startsWith("ticket-"), true);
  assert.equal(ticket.body.includes("refresh"), false);
});

test("student ticket uploads once through the teacher encrypted token boundary", async () => {
  const { handler, driveCalls } = fixture();
  const launch = await launchForClass(handler);
  const issued = JSON.parse((await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.tickets, { method: "POST", role: "student", body: { launchId: launch.id } }))).body);
  const uploadRequest = request(PRODUCTION_EVIDENCE_ENDPOINTS.uploads, { method: "POST", role: "student", body: Buffer.from("image"), headers: { authorization: `Bearer ${issued.ticket}`, "content-type": "image/png", "x-evidence-filename": "bridge.png", "x-evidence-type": "Photo" } });
  const uploaded = await handler.handle(uploadRequest);
  assert.equal(uploaded.status, 201);
  assert.equal(driveCalls[0][0], "upload");
  assert.equal(driveCalls[0][1].folderId, "folder-1");
  assert.equal(driveCalls[0][1].studentId, "student-1");
  assert.equal(driveCalls[0][1].refreshToken, "encrypted-vault-refresh-token");
  assert.equal((await handler.handle(uploadRequest)).status, 401);
});

test("teacher list and preview use only the connected teacher folder", async () => {
  const { handler, driveCalls } = fixture();
  const listed = await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.evidence));
  assert.equal(listed.status, 200);
  assert.equal(JSON.parse(listed.body).evidence[0].id, "e1");
  const preview = await handler.handle(request(`${PRODUCTION_EVIDENCE_ENDPOINTS.evidence}/e1/content`));
  assert.equal(preview.status, 200);
  assert.equal(preview.body.toString(), "image");
  assert.equal(preview.headers["X-Content-Type-Options"], "nosniff");
  assert.deepEqual(driveCalls.map(([name, value]) => [name, value.folderId]), [["list", "folder-1"], ["content", "folder-1"]]);
});

test("production evidence endpoints reject cross-origin and unauthenticated browsing", async () => {
  const { handler } = fixture();
  const crossOrigin = request(PRODUCTION_EVIDENCE_ENDPOINTS.evidence, { headers: { origin: "https://evil.example" } });
  assert.equal((await handler.handle(crossOrigin)).status, 403);
  assert.equal((await handler.handle(request(PRODUCTION_EVIDENCE_ENDPOINTS.evidence, { role: "anonymous" }))).status, 401);
});
