import test from "node:test";
import assert from "node:assert/strict";
import { generateDisabledStagingConfigs } from "../../platform/integrations/cloudflare/staging-config-generator.mjs";
import { validateDisabledStagingBundle, STAGING_REVIEW_ORDER } from "../../platform/integrations/cloudflare/staging-bundle-validator.mjs";

const input = {
  stagingOrigin: "https://staging.schooltools.test", zoneName: "schooltools.test",
  googleSignInClientId: "signin-client", googleOAuthClientId: "drive-client",
  authDatabaseId: "12345678-1234-1234-1234-123456789abc",
  evidenceDatabaseId: "abcdef12-1234-1234-1234-123456789abc",
};
const paths = { authMain: true, identityMain: true, evidenceMain: true, authMigrations: true, evidenceMigrations: true, auditMigration: true, auditMaintenanceMigration: true };

test("disabled staging bundle passes the static pre-Wrangler gate", () => {
  const configs = generateDisabledStagingConfigs(input);
  assert.equal(validateDisabledStagingBundle({ ...configs, resolvedPaths: paths }).ready, true);
  assert.equal(STAGING_REVIEW_ORDER[0].includes("dry-run"), true);
});

test("gate blocks public auth, activation, secrets, route overlap, and missing files", () => {
  const configs = generateDisabledStagingConfigs(input);
  const unsafeAuth = { ...configs.auth, workers_dev: true, vars: { PRODUCTION_ENABLED: "true", CLASSROOM_CODE_HASH_KEY: "never-store-this" } };
  const unsafeEvidence = { ...configs.evidence, routes: configs.identity.routes };
  const report = validateDisabledStagingBundle({ auth: unsafeAuth, identity: configs.identity, evidence: unsafeEvidence, resolvedPaths: { ...paths, authMain: false } });
  assert.equal(report.ready, false);
  for (const id of ["disabled", "private-auth", "routes", "no-secrets", "source-paths"]) assert.equal(report.checks.find((item) => item.id === id).status, "block");
});

test("gate blocks a staging bundle without audit retention controls", () => {
  const configs = generateDisabledStagingConfigs(input);
  const unsafeAuth = { ...configs.auth, triggers: undefined, vars: { ...configs.auth.vars, AUDIT_POLICY_APPROVED: "true" } };
  const report = validateDisabledStagingBundle({ ...configs, auth: unsafeAuth, resolvedPaths: { ...paths, auditMigration: false, auditMaintenanceMigration: false } });
  assert.equal(report.ready, false);
  for (const id of ["audit-schedule", "audit-policy-disabled", "audit-migration", "audit-maintenance-migration"]) assert.equal(report.checks.find((item) => item.id === id).status, "block");
});
