import test from "node:test";
import assert from "node:assert/strict";
import { createStagingActivationCandidate, REQUIRED_STAGING_SECRETS, STAGING_ACTIVATION_CONFIRMATION } from "../../platform/integrations/cloudflare/staging-activation-gate.mjs";

const configs = Object.fromEntries(["auth", "identity", "evidence"].map((key) => [key, { name: key, vars: { PRODUCTION_ENABLED: "false" } }]));
const smoke = { ok: true, mode: "disabled", checks: [{ ok: true, reportedReady: false }, { ok: true, reportedReady: false }] };
const html = '<meta name="thinkamigbob-production-identity" content="disabled">\n<meta name="thinkamigbob-google-signin-client-id" content="">';

test("activation gate creates only a reviewed private-staging candidate", () => {
  const result = createStagingActivationCandidate({ configs, bundleReady: true, disabledSmokeReport: smoke, secretNames: REQUIRED_STAGING_SECRETS, confirmation: STAGING_ACTIVATION_CONFIRMATION, platformHtml: html, googleSignInClientId: "public-client" });
  assert.equal(result.ok, true);
  assert.ok(Object.values(result.configs).every((config) => config.vars.PRODUCTION_ENABLED === "true"));
  assert.match(result.platformHtml, /production-identity" content="enabled"/);
  assert.match(result.platformHtml, /client-id" content="public-client"/);
  assert.equal(configs.auth.vars.PRODUCTION_ENABLED, "false");
});

test("activation gate reports every missing proof and never returns partial output", () => {
  const result = createStagingActivationCandidate({ configs, platformHtml: html });
  assert.equal(result.ok, false);
  assert.deepEqual(result.reasons, ["disabled-bundle-gate-required", "passing-disabled-smoke-evidence-required", "all-staging-secret-names-required", "exact-staging-confirmation-required", "google-signin-client-id-required"]);
  assert.equal(result.configs, undefined);
});

test("activation gate rejects already-enabled inputs and unsafe HTML", () => {
  const enabled = { ...configs, auth: { ...configs.auth, vars: { PRODUCTION_ENABLED: "true" } } };
  const result = createStagingActivationCandidate({ configs: enabled, bundleReady: true, disabledSmokeReport: smoke, secretNames: REQUIRED_STAGING_SECRETS, confirmation: STAGING_ACTIVATION_CONFIRMATION, platformHtml: "<html></html>", googleSignInClientId: "public-client" });
  assert.equal(result.ok, false);
  assert.ok(result.reasons.includes("disabled-configs-required"));
  assert.ok(result.reasons.includes("disabled-platform-html-required"));
});
