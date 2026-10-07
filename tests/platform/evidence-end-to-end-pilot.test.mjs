import test from "node:test";
import assert from "node:assert/strict";
import { createEvidenceUploadBroker } from "../../platform/scripts/evidence-upload-broker.mjs";
import { createEvidenceUploadTicketStore } from "../../platform/scripts/evidence-upload-tickets.mjs";
import { createEvidenceUploadClient } from "../../platform/scripts/evidence-upload-client.mjs";

test("teacher launch becomes a single-use fictional student Drive upload", async (t) => {
  const origin = "http://127.0.0.1:8782";
  const uploads = [];
  const broker = createEvidenceUploadBroker({
    host: "127.0.0.1", port: 0, platformOrigin: origin, teacherKey: "teacher-runtime-key",
    ticketStore: createEvidenceUploadTicketStore({ generateToken: () => "one-use-ticket" }),
    folderId: "fictional-folder",
    driveClient: { async uploadImage(value) { uploads.push(value); return { id: "drive-file-1", name: value.fileName }; } },
  });
  const address = await broker.listen();
  t.after(() => broker.close());
  const fetchWithOrigin = (url, options = {}) => fetch(url, { ...options, headers: { Origin: origin, ...options.headers } });
  const client = createEvidenceUploadClient({ brokerOrigin: `http://127.0.0.1:${address.port}`, fetchImpl: fetchWithOrigin });

  const launched = await client.publishLaunch({ teacherKey: "teacher-runtime-key", activity: "Fictional bridge test" });
  assert.equal(launched.ok, true);
  const ticket = await client.requestTicket({ launchId: launched.launch.id, studentId: "fictional-student-01" });
  const uploaded = await client.uploadImage({ ticket: ticket.ticket, file: new Blob(["image"], { type: "image/png" }), fileName: "bridge.png" });
  assert.equal(uploaded.evidence.id, "drive-file-1");
  assert.equal(uploads.length, 1);
  assert.equal(uploads[0].fileName, "bridge.png");
  assert.equal(uploads[0].activity, "Fictional-bridge-test");
  assert.equal(uploads[0].studentId, "fictional-student-01");
  const inbox = await client.listEvidence({ teacherKey: "teacher-runtime-key" });
  assert.equal(inbox.evidence.length, 1);
  assert.equal(inbox.evidence[0].studentId, "fictional-student-01");
  assert.equal("bytes" in inbox.evidence[0], false);
  const preview = await client.loadEvidencePreview({ teacherKey: "teacher-runtime-key", evidenceId: "drive-file-1" });
  assert.equal(preview.ok, true);
  assert.equal(await preview.blob.text(), "image");
  assert.equal((await client.uploadImage({ ticket: ticket.ticket, file: new Blob(["image"], { type: "image/png" }) })).reason, "invalid-or-used-ticket");
});

test("teacher launch rejects a missing or incorrect runtime key", async (t) => {
  const origin = "http://127.0.0.1:8782";
  const broker = createEvidenceUploadBroker({ host: "127.0.0.1", port: 0, platformOrigin: origin, teacherKey: "correct-key", ticketStore: createEvidenceUploadTicketStore(), folderId: "fictional-folder", driveClient: { async uploadImage() {} } });
  const address = await broker.listen();
  t.after(() => broker.close());
  const client = createEvidenceUploadClient({ brokerOrigin: `http://127.0.0.1:${address.port}`, fetchImpl: (url, options = {}) => fetch(url, { ...options, headers: { Origin: origin, ...options.headers } }) });
  assert.equal((await client.publishLaunch({ teacherKey: "incorrect", activity: "Bridge" })).reason, "teacher-key-required");
});
