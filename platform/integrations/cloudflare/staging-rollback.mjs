export const STAGING_ROLLBACK_CONFIRMATION = "PREPARE PRIVATE STAGING ROLLBACK";
export const STAGING_ROLLBACK_ORDER = Object.freeze([
  "Publish the disabled staging platform HTML first so no new production entry is offered.",
  "Deploy the disabled Identity Worker to block new sign-in and classroom requests.",
  "Deploy the disabled Evidence Worker to block new Drive and evidence requests.",
  "Deploy the disabled private Authentication Worker last.",
  "Run the disabled staging smoke test and require both services to report productionReady=false.",
  "Preserve D1 data, Drive files, and secrets for investigation; rollback must not delete them.",
]);

function clone(value) { return JSON.parse(JSON.stringify(value)); }

export function createStagingRollbackCandidate({ configs, platformHtml = "", confirmation = "" } = {}) {
  const reasons = [];
  if (confirmation !== STAGING_ROLLBACK_CONFIRMATION) reasons.push("exact-rollback-confirmation-required");
  if (![configs?.auth, configs?.identity, configs?.evidence].every((config) => config?.vars?.PRODUCTION_ENABLED === "true")) reasons.push("enabled-staging-configs-required");
  if (!/thinkamigbob-production-identity"\s+content="enabled"/.test(platformHtml)) reasons.push("enabled-staging-html-required");
  if (reasons.length) return Object.freeze({ ok: false, reasons: Object.freeze(reasons) });

  const disabled = {};
  for (const key of ["auth", "identity", "evidence"]) {
    disabled[key] = clone(configs[key]);
    disabled[key].vars.PRODUCTION_ENABLED = "false";
  }
  const disabledHtml = platformHtml
    .replace(/thinkamigbob-production-identity"\s+content="enabled"/, 'thinkamigbob-production-identity" content="disabled"')
    .replace(/thinkamigbob-google-signin-client-id"\s+content="[^"]*"/, 'thinkamigbob-google-signin-client-id" content=""');
  return Object.freeze({ ok: true, configs: Object.freeze(disabled), platformHtml: disabledHtml, order: STAGING_ROLLBACK_ORDER });
}

