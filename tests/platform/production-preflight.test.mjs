import test from "node:test";
import assert from "node:assert/strict";
import { evaluateProductionPreflight } from "../../platform/integrations/cloudflare/production-preflight.mjs";

const completeFiles = {
  authWorker: "worker deleteExpiredAuditEvents", authRepository: "deleteExpiredAuditEvents DELETE FROM platform_audit_events", identityWorker: "worker", evidenceWorker: "worker",
  authMigration: "CREATE TABLE auth; CREATE TABLE IF NOT EXISTS platform_audit_events; CREATE INDEX platform_audit_events_occurred_at; CREATE TABLE IF NOT EXISTS platform_maintenance_status (last_success_at INTEGER)", evidenceMigration: "CREATE TABLE evidence",
  platformHtml: '<meta name="thinkamigbob-production-identity" content="disabled">',
  authConfig: '{"PRODUCTION_ENABLED":"false","triggers":{"crons":["17 3 * * *"]},"AUDIT_POLICY_APPROVED":"false","AUDIT_PURPOSE":"authentication-and-classroom-security","AUDIT_AUTHORIZED_VIEWERS":"authorized-platform-security-operators","AUDIT_RETENTION_DAYS":"","AUDIT_DELETION_ENFORCEMENT":"unapproved"}',
  identityConfig: '{"PRODUCTION_ENABLED":"false"}',
  evidenceConfig: '{"PRODUCTION_ENABLED":"false"}',
};

test("preflight passes the local foundation while external activation remains incomplete", () => {
  const report = evaluateProductionPreflight({ files: completeFiles, activation: {}, secretNames: [] });
  assert.equal(report.foundationReady, true);
  assert.equal(report.activationReady, false);
  assert.ok(report.checks.some((check) => check.status === "setup"));
});

test("preflight accepts only a complete public HTTPS activation", () => {
  const report = evaluateProductionPreflight({
    files: completeFiles,
    activation: {
      platformOrigin: "https://platform.schooltools.test",
      googleSignInClientId: "signin-client-123",
      googleOAuthClientId: "drive-client-123",
      authDatabaseId: "12345678-1234-1234-1234-123456789abc",
      evidenceDatabaseId: "abcdef12-1234-1234-1234-123456789abc",
      auditPolicyApproved: true,
      auditPurpose: "authentication-and-classroom-security",
      auditAuthorizedViewers: "authorized-platform-security-operators",
      auditRetentionDays: 30,
      auditDeletionEnforcement: "required",
    },
    secretNames: ["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"],
  });
  assert.equal(report.foundationReady, true);
  assert.equal(report.activationReady, true);
});

test("preflight blocks activation when audit governance is incomplete", () => {
  const report = evaluateProductionPreflight({
    files: completeFiles,
    activation: {
      platformOrigin: "https://platform.schooltools.test",
      googleSignInClientId: "signin-client-123",
      googleOAuthClientId: "drive-client-123",
      authDatabaseId: "12345678-1234-1234-1234-123456789abc",
      evidenceDatabaseId: "abcdef12-1234-1234-1234-123456789abc",
    },
    secretNames: ["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"],
  });
  assert.equal(report.activationReady, false);
  assert.equal(report.checks.find((check) => check.id === "activation-auditRetentionDays").status, "setup");
});

test("preflight blocks unsafe foundation changes and local activation origins", () => {
  const report = evaluateProductionPreflight({ files: { ...completeFiles, authConfig: '{"PRODUCTION_ENABLED":"true"}' }, activation: { platformOrigin: "http://localhost:8784" } });
  assert.equal(report.foundationReady, false);
  assert.equal(report.activationReady, false);
  assert.equal(report.checks.find((check) => check.id === "activation-origin").status, "setup");
});

test("preflight blocks a bundle missing audit migration or retention enforcement", () => {
  const report = evaluateProductionPreflight({ files: { ...completeFiles, authMigration: "CREATE TABLE auth", authConfig: '{"PRODUCTION_ENABLED":"false"}' } });
  assert.equal(report.foundationReady, false);
  for (const id of ["foundation-audit-schema", "foundation-audit-maintenance-status", "foundation-audit-schedule", "foundation-audit-defaults"]) assert.equal(report.checks.find((check) => check.id === id).status, "block");
});
