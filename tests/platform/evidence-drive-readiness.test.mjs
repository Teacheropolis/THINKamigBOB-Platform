import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createEvidenceDriveSetup, DRIVE_SETUP_STATUS, PILOT_DRIVE_DESTINATION } from "../../platform/scripts/evidence-drive-setup.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");

test("Drive readiness starts disconnected and validates local preparation", () => {
  const setup = createEvidenceDriveSetup();
  assert.equal(setup.read().status, DRIVE_SETUP_STATUS.NOT_CONFIGURED);
  assert.equal(setup.prepare({ folderName: "AB", privacyConfirmed: true }).ok, false);
  assert.equal(setup.prepare({ folderName: "Class Evidence", privacyConfirmed: false }).reason, "privacy-confirmation-required");
  const prepared = setup.prepare({ folderName: "Class Evidence", privacyConfirmed: true });
  assert.equal(prepared.ok, true);
  assert.equal(prepared.value.folderName, "Class Evidence");
});

test("teacher setup distinguishes the connected fictional pilot from production OAuth", () => {
  assert.match(app, /Pilot Drive Connection/);
  assert.match(app, /fictional Apps Script pilot is connected/);
  assert.match(app, /Production administrator OAuth is still required/);
  assert.match(app, /Fictional pilot connected\. Production school Google OAuth is not configured/);
  assert.match(app, /student devices receive no teacher credentials/);
  assert.doesNotMatch(app, /fetch\([^)]*(?:googleapis|google\.com)/i);
});

test("user-supplied pilot destination is exact and persistently validated", () => {
  assert.equal(PILOT_DRIVE_DESTINATION.folderId, "1LEb7tIqisBKNEvtLhGGRpW3PKB8OIY74");
  assert.equal(PILOT_DRIVE_DESTINATION.folderName, "THINKamigBOB Student Evidence Pilot");
  assert.equal(PILOT_DRIVE_DESTINATION.status, "PERSISTENT_FICTIONAL_REVIEW_VALIDATED");
  assert.match(PILOT_DRIVE_DESTINATION.uploadEndpoint, /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/);
  assert.match(app, /Persistent fictional review validated/);
});
