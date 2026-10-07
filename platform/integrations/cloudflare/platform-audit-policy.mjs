const PURPOSE = "authentication-and-classroom-security";
const VIEWER = "authorized-platform-security-operators";

export function evaluatePlatformAuditPolicy(source = {}) {
  const retentionDays = Number(source.AUDIT_RETENTION_DAYS);
  const checks = Object.freeze({
    approved: source.AUDIT_POLICY_APPROVED === "true",
    purpose: source.AUDIT_PURPOSE === PURPOSE,
    viewers: source.AUDIT_AUTHORIZED_VIEWERS === VIEWER,
    retention: Number.isSafeInteger(retentionDays) && retentionDays >= 1 && retentionDays <= 365,
    deletion: source.AUDIT_DELETION_ENFORCEMENT === "required",
  });
  return Object.freeze({ ready: Object.values(checks).every(Boolean), retentionDays: checks.retention ? retentionDays : null, checks });
}

export const PLATFORM_AUDIT_POLICY_VALUES = Object.freeze({ purpose: PURPOSE, authorizedViewers: VIEWER });
