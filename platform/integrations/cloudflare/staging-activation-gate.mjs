export const STAGING_ACTIVATION_CONFIRMATION = "ENABLE PRIVATE STAGING ONLY";
export const REQUIRED_STAGING_SECRETS = Object.freeze(["CLASSROOM_CODE_HASH_KEY", "GOOGLE_OAUTH_CLIENT_SECRET", "TOKEN_ENCRYPTION_KEY"]);

function clone(value) { return JSON.parse(JSON.stringify(value)); }

export function createStagingActivationCandidate({ configs, bundleReady = false, disabledSmokeReport, secretNames = [], confirmation = "", platformHtml = "", googleSignInClientId = "" } = {}) {
  const reasons = [];
  if (!bundleReady) reasons.push("disabled-bundle-gate-required");
  if (!disabledSmokeReport?.ok || disabledSmokeReport.mode !== "disabled" || disabledSmokeReport.checks?.length !== 2 || !disabledSmokeReport.checks.every((check) => check.ok && check.reportedReady === false)) reasons.push("passing-disabled-smoke-evidence-required");
  const available = new Set(secretNames);
  if (!REQUIRED_STAGING_SECRETS.every((name) => available.has(name))) reasons.push("all-staging-secret-names-required");
  if (confirmation !== STAGING_ACTIVATION_CONFIRMATION) reasons.push("exact-staging-confirmation-required");
  if (![configs?.auth, configs?.identity, configs?.evidence].every((config) => config?.vars?.PRODUCTION_ENABLED === "false")) reasons.push("disabled-configs-required");
  if (!String(googleSignInClientId).trim()) reasons.push("google-signin-client-id-required");
  if (!/thinkamigbob-production-identity"\s+content="disabled"/.test(platformHtml) || !/thinkamigbob-google-signin-client-id"\s+content=""/.test(platformHtml)) reasons.push("disabled-platform-html-required");
  if (reasons.length) return Object.freeze({ ok: false, reasons: Object.freeze(reasons) });

  const activated = {};
  for (const key of ["auth", "identity", "evidence"]) {
    activated[key] = clone(configs[key]);
    activated[key].vars.PRODUCTION_ENABLED = "true";
  }
  const activatedHtml = platformHtml
    .replace(/thinkamigbob-production-identity"\s+content="disabled"/, 'thinkamigbob-production-identity" content="enabled"')
    .replace(/thinkamigbob-google-signin-client-id"\s+content=""/, `thinkamigbob-google-signin-client-id" content="${String(googleSignInClientId).replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`);
  return Object.freeze({ ok: true, configs: Object.freeze(activated), platformHtml: activatedHtml });
}

