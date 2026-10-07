import test from "node:test";
import assert from "node:assert/strict";
import { createEvidenceUploadTicketStore } from "../../platform/scripts/evidence-upload-tickets.mjs";
import { createEvidenceUploadClient } from "../../platform/scripts/evidence-upload-client.mjs";

test("upload tickets are scoped, expiring, and single-use", () => {
  let clock = 1000;
  let counter = 0;
  const store = createEvidenceUploadTicketStore({ ttlMs: 100, now: () => clock, generateToken: () => `ticket-${++counter}` });
  const issued = store.issue({ studentId: "fictional-01", activity: "bridge" });
  assert.equal(issued.ok, true);
  assert.equal(store.consume(issued.token, { mimeType: "image/png" }).scope.studentId, "fictional-01");
  assert.equal(store.consume(issued.token, { mimeType: "image/png" }).reason, "invalid-or-used-ticket");
  const expiring = store.issue({ studentId: "fictional-02", activity: "tower" });
  clock += 101;
  assert.equal(store.consume(expiring.token, { mimeType: "image/png" }).reason, "expired-ticket");
});

test("student client sends only a one-time ticket and image bytes to the broker", async () => {
  let request;
  const client = createEvidenceUploadClient({ brokerOrigin: "http://127.0.0.1:8784", fetchImpl: async (url, options) => { request = { url, options }; return { ok: true, json: async () => ({ ok: true, evidence: { id: "fictional" } }) }; } });
  const file = new Blob(["image"], { type: "image/png" });
  const result = await client.uploadImage({ ticket: "one-time-ticket", file, fileName: "test.png" });
  assert.equal(result.ok, true);
  assert.equal(request.options.headers.Authorization, "Bearer one-time-ticket");
  assert.equal(request.options.headers["X-Evidence-Filename"], "test.png");
  assert.equal(JSON.stringify(request).includes("UPLOAD_TOKEN"), false);
});
