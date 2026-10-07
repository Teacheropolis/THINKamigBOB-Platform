import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { assessGoogleOAuthReadiness, GOOGLE_OAUTH_ENDPOINTS, GOOGLE_OAUTH_REQUIRED_SCOPE, publicGoogleOAuthStatus } from "../../platform/scripts/evidence-google-oauth-readiness.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const guide = readFileSync(new URL("../../docs/platform/classroom-readiness/TEACHER-GOOGLE-OAUTH-PRODUCTION-READINESS-v1.0.md", import.meta.url), "utf8");

test("production readiness fails closed until every server and policy gate passes", () => {
  const empty = assessGoogleOAuthReadiness();
  assert.equal(empty.productionReady, false);
  assert.equal(empty.readyCount, 0);
  assert.equal(empty.totalCount, 7);
  const complete = assessGoogleOAuthReadiness({ publicOrigin: "https://platform.example.org", oauthClientConfigured: true, serverSecretConfigured: true, encryptedTokenVaultConfigured: true, verifiedBrandConfigured: true, revocationConfigured: true, monitoringConfigured: true });
  assert.equal(complete.productionReady, true);
  assert.equal(complete.scope, GOOGLE_OAUTH_REQUIRED_SCOPE);
});

test("localhost and broad Drive access never qualify as production readiness", () => {
  assert.equal(assessGoogleOAuthReadiness({ publicOrigin: "http://127.0.0.1:8784" }).gates.find((gate) => gate.id === "public-origin").ready, false);
  assert.equal(GOOGLE_OAUTH_REQUIRED_SCOPE, "https://www.googleapis.com/auth/drive.file");
  assert.notEqual(GOOGLE_OAUTH_REQUIRED_SCOPE, "https://www.googleapis.com/auth/drive");
});

test("public readiness status exposes no configuration secrets", () => {
  const status = publicGoogleOAuthStatus({ serverSecretConfigured: true, clientSecret: "must-not-leak", encryptedTokenVaultConfigured: true });
  assert.equal(JSON.stringify(status).includes("must-not-leak"), false);
  assert.deepEqual(status.endpoints, GOOGLE_OAUTH_ENDPOINTS);
  assert.equal(status.status, "setup-required");
});

test("teacher dashboard and readiness guide preserve the low-support boundary", () => {
  assert.match(app, /Production connection readiness:/);
  assert.match(app, /OAuth secrets and teacher refresh tokens must never enter browser code/);
  assert.match(guide, /Students never sign in to Google/);
  assert.match(guide, /teachers should not be asked to diagnose OAuth errors or configure Google Cloud/);
});
