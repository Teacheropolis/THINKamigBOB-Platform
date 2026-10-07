import test from "node:test";
import assert from "node:assert/strict";
import { createStagingRollbackCandidate, STAGING_ROLLBACK_CONFIRMATION, STAGING_ROLLBACK_ORDER } from "../../platform/integrations/cloudflare/staging-rollback.mjs";

const configs = Object.fromEntries(["auth", "identity", "evidence"].map((key) => [key, { name: key, vars: { PRODUCTION_ENABLED: "true", PUBLIC_VALUE: key } }]));
const html = '<meta name="thinkamigbob-production-identity" content="enabled">\n<meta name="thinkamigbob-google-signin-client-id" content="public-client">';

test("rollback candidate disables all staging surfaces without removing data bindings", () => {
  const result = createStagingRollbackCandidate({ configs, platformHtml: html, confirmation: STAGING_ROLLBACK_CONFIRMATION });
  assert.equal(result.ok, true);
  assert.ok(Object.values(result.configs).every((config) => config.vars.PRODUCTION_ENABLED === "false"));
  assert.equal(result.configs.auth.vars.PUBLIC_VALUE, "auth");
  assert.match(result.platformHtml, /production-identity" content="disabled"/);
  assert.match(result.platformHtml, /client-id" content=""/);
  assert.ok(STAGING_ROLLBACK_ORDER.some((step) => /must not delete/i.test(step)));
  assert.equal(configs.auth.vars.PRODUCTION_ENABLED, "true");
});

test("rollback candidate requires exact confirmation and fully enabled inputs", () => {
  const noConfirmation = createStagingRollbackCandidate({ configs, platformHtml: html });
  assert.deepEqual(noConfirmation.reasons, ["exact-rollback-confirmation-required"]);
  const mixed = { ...configs, evidence: { ...configs.evidence, vars: { PRODUCTION_ENABLED: "false" } } };
  const invalid = createStagingRollbackCandidate({ configs: mixed, platformHtml: "<html></html>", confirmation: STAGING_ROLLBACK_CONFIRMATION });
  assert.equal(invalid.ok, false);
  assert.ok(invalid.reasons.includes("enabled-staging-configs-required"));
  assert.ok(invalid.reasons.includes("enabled-staging-html-required"));
});
