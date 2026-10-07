import test from "node:test";
import assert from "node:assert/strict";
import { AUDIT_RETENTION_MAX_AGE_MS, evaluateAuditRetentionHealth } from "../../platform/integrations/cloudflare/audit-retention-health.mjs";

const hour = 60 * 60 * 1000;

test("retention health distinguishes pending, healthy, and stale cleanup", () => {
  assert.deepEqual(evaluateAuditRetentionHealth(null, { now: 1000 }), { state: "pending", lastSuccessAt: null, nextExpectedBy: null, lastDeletedCount: null, lastCutoff: null });
  const status = { lastSuccessAt: 10 * hour, lastDeletedCount: 4, lastCutoff: 5 * hour };
  assert.deepEqual(evaluateAuditRetentionHealth(status, { now: 20 * hour }), { ...status, state: "healthy", nextExpectedBy: 10 * hour + AUDIT_RETENTION_MAX_AGE_MS });
  assert.equal(evaluateAuditRetentionHealth(status, { now: 47 * hour }).state, "stale");
});

test("retention health fails closed for malformed or future status", () => {
  assert.equal(evaluateAuditRetentionHealth({ lastSuccessAt: 2000, lastDeletedCount: 1, lastCutoff: 1000 }, { now: 1000 }).state, "invalid");
  assert.equal(evaluateAuditRetentionHealth({ lastSuccessAt: 1000, lastDeletedCount: 1001, lastCutoff: 500 }, { now: 2000 }).state, "invalid");
  assert.throws(() => evaluateAuditRetentionHealth(null, { now: -1 }), /valid-retention-health-clock/);
});
