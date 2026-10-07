const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const PLACEHOLDER = /REPLACE-|example(?:\.org)?|YOUR_|CHANGEME/i;

function result(id, label, status, detail) {
  return Object.freeze({ id, label, status, detail });
}

function publicHttpsOrigin(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" && !LOCAL_HOSTS.has(url.hostname) && !PLACEHOLDER.test(url.hostname) && url.origin === String(value).replace(/\/$/, "");
  } catch { return false; }
}

export function evaluateProductionPreflight({ files = {}, activation = {}, secretNames = [] } = {}) {
  const checks = [];
  const requiredFiles = [
    ["authWorker", "Private authentication Worker"],
    ["authRepository", "Authentication D1 repository"],
    ["identityWorker", "Public identity Worker"],
    ["evidenceWorker", "Evidence API Worker"],
    ["authMigration", "Authentication D1 migrations"],
    ["evidenceMigration", "Evidence D1 migrations"],
    ["platformHtml", "Platform activation controls"],
  ];
  for (const [key, label] of requiredFiles) {
    checks.push(result(`foundation-${key}`, label, String(files[key] || "").trim() ? "pass" : "block", String(files[key] || "").trim() ? "Present." : "Required file is missing or empty."));
  }

  const templates = [files.authConfig, files.identityConfig, files.evidenceConfig].filter(Boolean);
  const failClosed = templates.length === 3 && templates.every((source) => /"PRODUCTION_ENABLED"\s*:\s*"false"/.test(source));
  checks.push(result("foundation-fail-closed", "Deployment templates fail closed", failClosed ? "pass" : "block", failClosed ? "All templates default to disabled." : "Every template must default PRODUCTION_ENABLED to false."));
  const localDisabled = /thinkamigbob-production-identity"\s+content="disabled"/.test(files.platformHtml || "");
  checks.push(result("foundation-local-disabled", "Local browser activation is disabled", localDisabled ? "pass" : "block", localDisabled ? "Local and file previews cannot activate production identity." : "The platform activation meta control is not disabled."));

  const auditSchema = /CREATE TABLE IF NOT EXISTS platform_audit_events/.test(files.authMigration || "") && /platform_audit_events_occurred_at/.test(files.authMigration || "");
  checks.push(result("foundation-audit-schema", "Authentication audit migration", auditSchema ? "pass" : "block", auditSchema ? "Privacy-minimized audit schema and retention index are present." : "The authentication bundle must include the audit migration."));
  const maintenanceStatus = /CREATE TABLE IF NOT EXISTS platform_maintenance_status/.test(files.authMigration || "") && /last_success_at/.test(files.authMigration || "");
  checks.push(result("foundation-audit-maintenance-status", "Audit retention maintenance status", maintenanceStatus ? "pass" : "block", maintenanceStatus ? "Private retention success status schema is present." : "The authentication bundle must include the retention status migration."));
  const auditCleanup = /deleteExpiredAuditEvents/.test(files.authWorker || "") && /deleteExpiredAuditEvents/.test(files.authRepository || "") && /DELETE FROM platform_audit_events/.test(files.authRepository || "");
  checks.push(result("foundation-audit-cleanup", "Bounded audit deletion implementation", auditCleanup ? "pass" : "block", auditCleanup ? "The authentication Worker includes audit-only retention cleanup." : "The authentication Worker must include bounded audit deletion enforcement."));
  const auditSchedule = /"crons"\s*:\s*\[\s*"[^"\r\n]+"\s*\]/.test(files.authConfig || "");
  checks.push(result("foundation-audit-schedule", "Audit retention schedule", auditSchedule ? "pass" : "block", auditSchedule ? "A scheduled retention trigger is configured." : "The authentication Worker requires a retention cron trigger."));
  const auditDefaults = ["AUDIT_POLICY_APPROVED", "AUDIT_PURPOSE", "AUDIT_AUTHORIZED_VIEWERS", "AUDIT_RETENTION_DAYS", "AUDIT_DELETION_ENFORCEMENT"].every((name) => new RegExp(`"${name}"\\s*:`).test(files.authConfig || ""));
  checks.push(result("foundation-audit-defaults", "Fail-closed audit policy variables", auditDefaults ? "pass" : "block", auditDefaults ? "Every audit policy variable is declared with disabled defaults." : "The authentication template is missing audit policy variables."));

  const originReady = publicHttpsOrigin(activation.platformOrigin);
  checks.push(result("activation-origin", "Published HTTPS platform origin", originReady ? "pass" : "setup", originReady ? "Public HTTPS origin is configured." : "Add the final public HTTPS origin; localhost and placeholders are rejected."));

  for (const [key, label] of [["googleSignInClientId", "Google teacher sign-in client ID"], ["googleOAuthClientId", "Google Drive OAuth client ID"]]) {
    const ready = Boolean(String(activation[key] || "").trim()) && !PLACEHOLDER.test(String(activation[key]));
    checks.push(result(`activation-${key}`, label, ready ? "pass" : "setup", ready ? "Public client identifier is configured." : "Add the public Google client identifier."));
  }

  for (const [key, label] of [["authDatabaseId", "Authentication D1 database ID"], ["evidenceDatabaseId", "Evidence D1 database ID"]]) {
    const ready = /^[0-9a-f-]{20,}$/i.test(String(activation[key] || "")) && !PLACEHOLDER.test(String(activation[key]));
    checks.push(result(`activation-${key}`, label, ready ? "pass" : "setup", ready ? "D1 database identifier is configured." : "Create the D1 database and add its ID."));
  }

  const auditChecks = [
    ["auditPolicyApproved", "Approved authentication audit policy", activation.auditPolicyApproved === true],
    ["auditPurpose", "Minimum-purpose audit scope", activation.auditPurpose === "authentication-and-classroom-security"],
    ["auditAuthorizedViewers", "Restricted audit audience", activation.auditAuthorizedViewers === "authorized-platform-security-operators"],
    ["auditRetentionDays", "Approved audit retention period", Number.isSafeInteger(activation.auditRetentionDays) && activation.auditRetentionDays >= 1 && activation.auditRetentionDays <= 365],
    ["auditDeletionEnforcement", "Audit deletion enforcement requirement", activation.auditDeletionEnforcement === "required"],
  ];
  for (const [key, label, ready] of auditChecks) {
    checks.push(result(`activation-${key}`, label, ready ? "pass" : "setup", ready ? "Approved bounded value is configured." : "Record the approved policy value before activation."));
  }

  const availableSecrets = new Set(secretNames);
  for (const name of ["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"]) {
    const ready = availableSecrets.has(name);
    checks.push(result(`activation-secret-${name}`, `${name} Worker secret`, ready ? "pass" : "setup", ready ? "Secret name is present; its value was not read or printed." : "Add this secret through the deployment secret manager."));
  }

  const foundationReady = checks.filter((check) => check.id.startsWith("foundation-")).every((check) => check.status === "pass");
  const activationReady = foundationReady && checks.every((check) => check.status === "pass");
  return Object.freeze({ foundationReady, activationReady, checks: Object.freeze(checks) });
}
