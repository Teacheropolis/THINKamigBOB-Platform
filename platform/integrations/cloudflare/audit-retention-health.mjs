export const AUDIT_RETENTION_MAX_AGE_MS = 36 * 60 * 60 * 1000;

export function evaluateAuditRetentionHealth(status, { now = Date.now(), maxAgeMs = AUDIT_RETENTION_MAX_AGE_MS } = {}) {
  if (!Number.isSafeInteger(now) || now < 0 || !Number.isSafeInteger(maxAgeMs) || maxAgeMs < 1) throw new Error("valid-retention-health-clock-required");
  if (status === null || status === undefined) return Object.freeze({ state: "pending", lastSuccessAt: null, nextExpectedBy: null, lastDeletedCount: null, lastCutoff: null });
  const lastSuccessAt = Number(status.lastSuccessAt);
  const lastDeletedCount = Number(status.lastDeletedCount);
  const lastCutoff = Number(status.lastCutoff);
  const valid = Number.isSafeInteger(lastSuccessAt) && lastSuccessAt >= 0 && lastSuccessAt <= now
    && Number.isSafeInteger(lastDeletedCount) && lastDeletedCount >= 0 && lastDeletedCount <= 1000
    && Number.isSafeInteger(lastCutoff) && lastCutoff >= 0 && lastCutoff <= lastSuccessAt;
  if (!valid) return Object.freeze({ state: "invalid", lastSuccessAt: null, nextExpectedBy: null, lastDeletedCount: null, lastCutoff: null });
  const nextExpectedBy = lastSuccessAt + maxAgeMs;
  return Object.freeze({ state: now <= nextExpectedBy ? "healthy" : "stale", lastSuccessAt, nextExpectedBy, lastDeletedCount, lastCutoff });
}
