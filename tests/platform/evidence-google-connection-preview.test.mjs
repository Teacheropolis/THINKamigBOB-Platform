import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createGoogleConnectionPreview, GOOGLE_CONNECTION_PREVIEW_STATUS, GOOGLE_DRIVE_FILE_SCOPE } from "../../platform/scripts/evidence-google-connection-preview.mjs";

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const connectionModule = readFileSync(new URL("../../platform/scripts/evidence-google-connection-preview.mjs", import.meta.url), "utf8");

test("connection preview requires both teacher and student-boundary confirmations", () => {
  const preview = createGoogleConnectionPreview({ storage: memoryStorage() });
  assert.equal(preview.read().status, GOOGLE_CONNECTION_PREVIEW_STATUS.NOT_CONNECTED);
  assert.equal(preview.begin().ok, true);
  assert.equal(preview.connect({}).reason, "teacher-confirmation-required");
  assert.equal(preview.connect({ teacherConfirmed: true }).reason, "student-boundary-required");
});

test("connection preview uses only drive.file and supports disconnect", () => {
  const preview = createGoogleConnectionPreview({ storage: memoryStorage() });
  preview.begin();
  const result = preview.connect({ teacherConfirmed: true, studentBoundaryConfirmed: true });
  assert.equal(result.ok, true);
  assert.equal(result.value.scope, GOOGLE_DRIVE_FILE_SCOPE);
  assert.equal(result.value.status, GOOGLE_CONNECTION_PREVIEW_STATUS.CONNECTED_PREVIEW);
  assert.equal(preview.disconnect().ok, true);
  assert.equal(preview.read().status, GOOGLE_CONNECTION_PREVIEW_STATUS.NOT_CONNECTED);
});

test("teacher UI describes the low-support production boundary honestly", () => {
  assert.match(app, /Connect Teacher Google Drive/);
  assert.match(app, /Students:<\/strong> No Google sign-in or Drive permission/);
  assert.match(app, /No OAuth token, Google identity, school account, or Drive file is created or stored/);
  assert.match(connectionModule, /https:\/\/www\.googleapis\.com\/auth\/drive\.file/);
  assert.doesNotMatch(connectionModule, /https:\/\/www\.googleapis\.com\/auth\/drive["']/);
});
