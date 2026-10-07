import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createEvidenceUploadBroker, MAX_PILOT_IMAGE_BYTES, PILOT_IMAGE_TYPES } from "../../platform/scripts/evidence-upload-broker.mjs";

const origin = "http://127.0.0.1:8782";
const folderId = "1LEb7tIqisBKNEvtLhGGRpW3PKB8OIY74";
const ticketStore = { consume() { return { ok: true, scope: { studentId: "fictional-01", activity: "bridge" } }; } };

const source = readFileSync(new URL("../../platform/scripts/evidence-upload-broker.mjs", import.meta.url), "utf8");

test("broker contract rejects incomplete setup and bounds the fictional image pilot", () => {
  assert.throws(() => createEvidenceUploadBroker({ platformOrigin: origin, ticketStore, folderId }), /complete-broker-configuration-required/);
  assert.deepEqual(PILOT_IMAGE_TYPES, ["image/jpeg", "image/png", "image/webp"]);
  assert.equal(MAX_PILOT_IMAGE_BYTES, 8 * 1024 * 1024);
  assert.match(source, /origin-not-approved/);
  assert.match(source, /valid-upload-session-required/);
  assert.match(source, /pilot-image-type-not-allowed/);
  assert.match(source, /upload-too-large/);
  assert.match(source, /Access-Control-Allow-Private-Network/);
  assert.match(source, /request\.headers\.origin \|\| requestUrl\.origin/);
});

test("broker keeps Drive authority server-side and returns bounded metadata", () => {
  const broker = createEvidenceUploadBroker({ platformOrigin: origin, teacherKey: "runtime-teacher-key", ticketStore: { ...ticketStore, issue() { return { ok: true, token: "ticket" }; } }, folderId, driveClient: { uploadImage() {} } });
  assert.equal(typeof broker.listen, "function");
  assert.equal(typeof broker.close, "function");
  assert.match(source, /driveClient\.uploadImage\(\{ folderId, bytes, mimeType, fileName/);
  assert.match(source, /evidence: \{ id: result\.id, name: result\.name, mimeType, size: bytes\.length \}/);
  assert.doesNotMatch(source, /clientSecret|refreshToken|accessToken/);
  assert.match(source, /ticketStore\.consume/);
  assert.doesNotMatch(source, /x-evidence-student|x-evidence-activity/i);
});
