const SECRET_KEYS = new Set(["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"]);

function check(id, pass, detail) {
  return Object.freeze({ id, status: pass ? "pass" : "block", detail });
}

export function validateDisabledStagingBundle({ auth, identity, evidence, resolvedPaths = {} } = {}) {
  const configs = [auth, identity, evidence];
  const checks = [];
  checks.push(check("three-configs", configs.every((value) => value && typeof value === "object"), "Auth, Identity, and Evidence configurations are required."));
  if (!configs.every((value) => value && typeof value === "object")) return Object.freeze({ ready: false, checks });

  checks.push(check("disabled", configs.every((config) => config.vars?.PRODUCTION_ENABLED === "false"), "Every staging Worker must remain disabled for dry-run review."));
  checks.push(check("private-auth", auth.workers_dev === false && auth.preview_urls === false && !auth.route && !auth.routes, "The authentication Worker must have no public route or preview URL."));
  checks.push(check("audit-schedule", Array.isArray(auth.triggers?.crons) && auth.triggers.crons.length === 1 && typeof auth.triggers.crons[0] === "string", "The private authentication Worker must include one retention cron trigger."));
  checks.push(check("audit-policy-disabled", auth.vars?.AUDIT_POLICY_APPROVED === "false" && auth.vars?.AUDIT_RETENTION_DAYS === "" && auth.vars?.AUDIT_DELETION_ENFORCEMENT === "unapproved", "Generated audit policy values must remain explicitly unapproved."));
  checks.push(check("service-binding", [identity, evidence].every((config) => config.services?.length === 1 && config.services[0].binding === "PLATFORM_AUTH" && config.services[0].service === auth.name), "Public Workers must use the private staging authentication service binding."));

  const identityRoutes = (identity.routes || []).map((route) => route.pattern);
  const evidenceRoutes = (evidence.routes || []).map((route) => route.pattern);
  const allRoutes = [...identityRoutes, ...evidenceRoutes];
  checks.push(check("routes", identityRoutes.length === 2 && evidenceRoutes.length === 1 && new Set(allRoutes).size === 3 && identityRoutes.every((route) => /\/api\/(?:auth|classrooms)\/\*$/.test(route)) && evidenceRoutes.every((route) => /\/api\/evidence\/\*$/.test(route)), "Identity and Evidence must have separate, non-overlapping API routes."));

  const d1 = [...(auth.d1_databases || []), ...(evidence.d1_databases || [])];
  checks.push(check("d1-isolation", d1.length === 2 && d1[0].database_id !== d1[1].database_id, "Authentication and Evidence must use different staging D1 databases."));
  checks.push(check("no-secrets", configs.every((config) => Object.keys(config.vars || {}).every((key) => !SECRET_KEYS.has(key))), "Secrets must never appear in generated vars."));
  checks.push(check("source-paths", ["authMain", "identityMain", "evidenceMain"].every((key) => resolvedPaths[key] === true), "Every generated Worker entrypoint must resolve to a real source file."));
  checks.push(check("migration-paths", ["authMigrations", "evidenceMigrations"].every((key) => resolvedPaths[key] === true), "Both generated D1 migration directories must resolve and contain SQL migrations."));
  checks.push(check("audit-migration", resolvedPaths.auditMigration === true, "The authentication migration directory must contain the audit schema migration."));
  checks.push(check("audit-maintenance-migration", resolvedPaths.auditMaintenanceMigration === true, "The authentication migration directory must contain the private retention status migration."));

  return Object.freeze({ ready: checks.every((item) => item.status === "pass"), checks: Object.freeze(checks) });
}

export const STAGING_REVIEW_ORDER = Object.freeze([
  "Validate all three generated configurations with Wrangler dry-run.",
  "Review and apply the authentication D1 migrations.",
  "Review and apply the Evidence D1 migrations.",
  "Add staging secrets through Cloudflare secret management.",
  "Deploy the private authentication Worker first.",
  "Deploy Identity and Evidence Workers with features still disabled.",
  "Run health checks before any activation flag changes.",
]);
