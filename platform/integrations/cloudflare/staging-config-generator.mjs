const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SAFE_ZONE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function stagingTarget(input) {
  const origin = new URL(String(input.stagingOrigin || ""));
  if (origin.protocol !== "https:" || origin.port || origin.pathname !== "/" || origin.search || origin.hash) throw new Error("public-https-staging-origin-required");
  if (!SAFE_ZONE.test(String(input.zoneName || "")) || !(origin.hostname === input.zoneName || origin.hostname.endsWith(`.${input.zoneName}`))) throw new Error("matching-cloudflare-zone-required");
  if (!UUID.test(String(input.authDatabaseId || "")) || !UUID.test(String(input.evidenceDatabaseId || ""))) throw new Error("valid-d1-database-ids-required");
  for (const key of ["googleSignInClientId", "googleOAuthClientId"]) if (!String(input[key] || "").trim()) throw new Error(`${key}-required`);
  return { origin, zoneName: input.zoneName };
}

function base(name, main) {
  return {
    $schema: "node_modules/wrangler/config-schema.json",
    name,
    main,
    compatibility_date: "2026-09-27",
    compatibility_flags: ["nodejs_compat"],
    workers_dev: false,
    preview_urls: false,
    observability: { enabled: true, head_sampling_rate: 1 },
  };
}

export function generateDisabledStagingConfigs(input = {}) {
  const { origin, zoneName } = stagingTarget(input);
  const authName = "thinkamigbob-platform-auth-staging";
  const auth = {
    ...base(authName, "../../platform-auth-worker.mjs"),
    triggers: { crons: ["17 3 * * *"] },
    d1_databases: [{ binding: "AUTH_DB", database_name: "thinkamigbob-platform-auth-staging", database_id: input.authDatabaseId, migrations_dir: "../../auth-migrations" }],
    vars: {
      PRODUCTION_ENABLED: "false",
      AUDIT_POLICY_APPROVED: "false",
      AUDIT_PURPOSE: "authentication-and-classroom-security",
      AUDIT_AUTHORIZED_VIEWERS: "authorized-platform-security-operators",
      AUDIT_RETENTION_DAYS: "",
      AUDIT_DELETION_ENFORCEMENT: "unapproved",
    },
  };
  const identity = {
    ...base("thinkamigbob-platform-identity-staging", "../../platform-identity-worker.mjs"),
    routes: [
      { pattern: `${origin.hostname}/api/auth/*`, zone_name: zoneName },
      { pattern: `${origin.hostname}/api/classrooms/*`, zone_name: zoneName },
    ],
    services: [{ binding: "PLATFORM_AUTH", service: authName }],
    ratelimits: [{ name: "STUDENT_ENTRY_RATE_LIMIT", namespace_id: "1001", simple: { limit: 10, period: 60 } }],
    vars: { PRODUCTION_ENABLED: "false", PLATFORM_ORIGIN: origin.origin, GOOGLE_SIGNIN_CLIENT_ID: input.googleSignInClientId },
  };
  const evidence = {
    ...base("thinkamigbob-evidence-api-staging", "../../evidence-worker.mjs"),
    routes: [{ pattern: `${origin.hostname}/api/evidence/*`, zone_name: zoneName }],
    d1_databases: [{ binding: "EVIDENCE_DB", database_name: "thinkamigbob-evidence-staging", database_id: input.evidenceDatabaseId, migrations_dir: "../../migrations" }],
    services: [{ binding: "PLATFORM_AUTH", service: authName }],
    vars: {
      PRODUCTION_ENABLED: "false",
      PLATFORM_ORIGIN: origin.origin,
      DASHBOARD_URL: `${origin.origin}/platform/index.html#/teacher/dashboard`,
      GOOGLE_OAUTH_CLIENT_ID: input.googleOAuthClientId,
      GOOGLE_OAUTH_REDIRECT_URI: `${origin.origin}/api/evidence/google/v1/connect/callback`,
    },
  };
  return Object.freeze({ auth, identity, evidence });
}
