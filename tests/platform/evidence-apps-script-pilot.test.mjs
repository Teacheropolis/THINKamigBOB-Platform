import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../platform/integrations/apps-script/evidence-upload-pilot.gs", import.meta.url), "utf8");
const destination = JSON.parse(readFileSync(new URL("../../platform/data/evidence-drive-pilot-destination.v1.json", import.meta.url), "utf8"));

test("Apps Script pilot targets only the supplied fictional folder", () => {
  assert.match(source, new RegExp(destination.folderId));
  assert.equal(destination.allowedData, "FICTIONAL_PILOT_EVIDENCE_ONLY");
  assert.match(destination.uploadEndpoint, /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/);
  assert.equal(destination.connectionStatus, "PERSISTENT_FICTIONAL_REVIEW_VALIDATED");
  assert.equal(destination.validationEvidence.sizeBytes, 68);
  assert.equal(destination.validationEvidence.persistentReview.listedFiles, 3);
});

test("Apps Script validates secret, image type, and size before creating a file", () => {
  assert.match(source, /getProperty\('UPLOAD_TOKEN'\)/);
  assert.match(source, /ALLOWED_IMAGE_TYPES\.includes/);
  assert.match(source, /MAX_IMAGE_BYTES/);
  assert.ok(source.indexOf("valid-upload-session-required") < source.indexOf("createFile(blob)"));
  assert.doesNotMatch(source, /UPLOAD_TOKEN\s*=|clientSecret|refreshToken|accessToken/);
});

test("Apps Script supports protected persistent evidence listing and visual retrieval", () => {
  assert.match(source, /request\.action === 'list'/);
  assert.match(source, /request\.action === 'content'/);
  assert.match(source, /file\.setDescription\(JSON\.stringify/);
  assert.match(source, /getFiles\(\)/);
  assert.match(source, /belongsToPilotFolder/);
  assert.match(source, /Utilities\.base64Encode\(bytes\)/);
});
