import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePlatformAuditPolicy } from "../../platform/integrations/cloudflare/platform-audit-policy.mjs";

const approved = {
  AUDIT_POLICY_APPROVED: "true",
  AUDIT_PURPOSE: "authentication-and-classroom-security",
  AUDIT_AUTHORIZED_VIEWERS: "authorized-platform-security-operators",
  AUDIT_RETENTION_DAYS: "30",
  AUDIT_DELETION_ENFORCEMENT: "required",
};

test("audit policy accepts only a complete bounded approval", () => {
  assert.deepEqual(evaluatePlatformAuditPolicy(approved), {
    ready: true,
    retentionDays: 30,
    checks: { approved: true, purpose: true, viewers: true, retention: true, deletion: true },
  });
});

test("audit policy rejects missing, invented, and unbounded values", () => {
  assert.equal(evaluatePlatformAuditPolicy({}).ready, false);
  assert.equal(evaluatePlatformAuditPolicy({ ...approved, AUDIT_RETENTION_DAYS: "0" }).ready, false);
  assert.equal(evaluatePlatformAuditPolicy({ ...approved, AUDIT_RETENTION_DAYS: "366" }).ready, false);
  assert.equal(evaluatePlatformAuditPolicy({ ...approved, AUDIT_AUTHORIZED_VIEWERS: "teachers" }).ready, false);
  assert.equal(evaluatePlatformAuditPolicy({ ...approved, AUDIT_DELETION_ENFORCEMENT: "optional" }).ready, false);
});
