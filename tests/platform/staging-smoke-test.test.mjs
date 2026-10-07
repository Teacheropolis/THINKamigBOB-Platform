import test from "node:test";
import assert from "node:assert/strict";
import { runStagingSmokeTest, STAGING_HEALTH_PATHS } from "../../platform/integrations/cloudflare/staging-smoke-test.mjs";

function response(productionReady, options = {}) {
  return new Response(JSON.stringify(options.body || { ok: true, productionReady }), { status: options.status || 200, headers: { "content-type": "application/json", "cache-control": options.cache || "no-store", "x-content-type-options": "nosniff", ...(options.headers || {}) } });
}

test("disabled staging smoke test performs only two safe GET health checks", async () => {
  const seen = [];
  const report = await runStagingSmokeTest({ origin: "https://staging.schooltools.test", fetchImpl: async (url, options) => { seen.push({ url, options }); return response(false); } });
  assert.equal(report.ok, true);
  assert.deepEqual(seen.map((item) => new URL(item.url).pathname), STAGING_HEALTH_PATHS.map((item) => item.path));
  assert.ok(seen.every((item) => item.options.method === "GET" && item.options.redirect === "error"));
});

test("enabled smoke mode requires both Workers to report ready", async () => {
  const report = await runStagingSmokeTest({ origin: "https://staging.schooltools.test", expectEnabled: true, fetchImpl: async () => response(true) });
  assert.equal(report.ok, true);
});

test("smoke test rejects unsafe origins, cookies, cacheable or overbroad responses", async () => {
  assert.equal((await runStagingSmokeTest({ origin: "http://localhost:8784" })).reason, "public-https-staging-origin-required");
  const cookie = await runStagingSmokeTest({ origin: "https://staging.schooltools.test", fetchImpl: async () => response(false, { headers: { "set-cookie": "session=no" } }) });
  assert.equal(cookie.ok, false);
  const extra = await runStagingSmokeTest({ origin: "https://staging.schooltools.test", fetchImpl: async () => response(false, { body: { ok: true, productionReady: false, secret: "leak" } }) });
  assert.equal(extra.ok, false);
});
