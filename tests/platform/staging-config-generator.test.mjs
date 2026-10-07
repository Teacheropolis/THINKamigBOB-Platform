import test from "node:test";
import assert from "node:assert/strict";
import { generateDisabledStagingConfigs } from "../../platform/integrations/cloudflare/staging-config-generator.mjs";

const input = {
  stagingOrigin: "https://staging.schooltools.test",
  zoneName: "schooltools.test",
  googleSignInClientId: "signin-public-client",
  googleOAuthClientId: "drive-public-client",
  authDatabaseId: "12345678-1234-1234-1234-123456789abc",
  evidenceDatabaseId: "abcdef12-1234-1234-1234-123456789abc",
};

test("generator creates isolated disabled staging Workers with exact bindings", () => {
  const configs = generateDisabledStagingConfigs(input);
  assert.equal(configs.auth.vars.PRODUCTION_ENABLED, "false");
  assert.equal(configs.identity.vars.PRODUCTION_ENABLED, "false");
  assert.equal(configs.evidence.vars.PRODUCTION_ENABLED, "false");
  assert.equal(configs.identity.services[0].service, "thinkamigbob-platform-auth-staging");
  assert.equal(configs.evidence.services[0].service, "thinkamigbob-platform-auth-staging");
  assert.equal(configs.auth.workers_dev, false);
  assert.equal(configs.auth.routes, undefined);
  assert.equal(configs.auth.main, "../../platform-auth-worker.mjs");
  assert.equal(configs.auth.d1_databases[0].migrations_dir, "../../auth-migrations");
  assert.deepEqual(configs.auth.triggers.crons, ["17 3 * * *"]);
  assert.equal(configs.auth.vars.AUDIT_POLICY_APPROVED, "false");
  assert.equal(configs.auth.vars.AUDIT_RETENTION_DAYS, "");
});

test("public routes are separated between identity and evidence APIs", () => {
  const configs = generateDisabledStagingConfigs(input);
  assert.deepEqual(configs.identity.routes.map((route) => route.pattern), ["staging.schooltools.test/api/auth/*", "staging.schooltools.test/api/classrooms/*"]);
  assert.deepEqual(configs.evidence.routes.map((route) => route.pattern), ["staging.schooltools.test/api/evidence/*"]);
  assert.equal(configs.evidence.vars.GOOGLE_OAUTH_REDIRECT_URI, "https://staging.schooltools.test/api/evidence/google/v1/connect/callback");
});

test("generator rejects localhost, mismatched zones, and invalid D1 IDs", () => {
  assert.throws(() => generateDisabledStagingConfigs({ ...input, stagingOrigin: "http://localhost:8784" }), /public-https/);
  assert.throws(() => generateDisabledStagingConfigs({ ...input, zoneName: "different.test" }), /matching-cloudflare-zone/);
  assert.throws(() => generateDisabledStagingConfigs({ ...input, authDatabaseId: "not-an-id" }), /valid-d1/);
});
