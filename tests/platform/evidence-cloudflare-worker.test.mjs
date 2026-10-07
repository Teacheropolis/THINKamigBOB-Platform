import test from "node:test";
import assert from "node:assert/strict";
import { createEvidenceWorker } from "../../platform/integrations/cloudflare/evidence-worker.mjs";

function configuredEnv() {
  return {
    PRODUCTION_ENABLED: "true",
    EVIDENCE_DB: { prepare() {} },
    PLATFORM_AUTH: { fetch() {} },
    PLATFORM_ORIGIN: "https://platform.example.org",
    DASHBOARD_URL: "https://platform.example.org/platform/index.html#/teacher/dashboard",
    GOOGLE_OAUTH_CLIENT_ID: "client-id",
    GOOGLE_OAUTH_CLIENT_SECRET: "secret",
    GOOGLE_OAUTH_REDIRECT_URI: "https://evidence.example/api/evidence/google/v1/connect/callback",
    TOKEN_ENCRYPTION_KEY: Buffer.alloc(32, 1).toString("base64"),
  };
}

test("worker health and API fail closed until every production binding exists", async () => {
  const worker = createEvidenceWorker();
  assert.deepEqual(await (await worker.fetch(new Request("https://evidence.example/health"), {})).json(), { ok: true, productionReady: false });
  assert.deepEqual(await (await worker.fetch(new Request("https://evidence.example/api/evidence/google/v1/health"), {})).json(), { ok: true, productionReady: false });
  const response = await worker.fetch(new Request("https://evidence.example/api/evidence/google/v1/status"), {});
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "setup-required", productionEvidenceEnabled: false });
});

test("worker routes bounded requests and preserves protected response headers", async () => {
  const seen = [];
  const worker = createEvidenceWorker({ runtimeFactory() {
    return {
      oauth: { async handle(input) { seen.push(input); return { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ status: "connected" }) }; } },
      evidence: { async handle() { throw new Error("should-not-run"); } },
    };
  } });
  const response = await worker.fetch(new Request("https://evidence.example/api/evidence/google/v1/status", { headers: { origin: "https://platform.example.org" } }), configuredEnv());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.deepEqual(await response.json(), { status: "connected" });
  assert.equal(seen[0].method, "GET");
});

test("worker rejects oversized JSON before constructing production services", async () => {
  let constructed = false;
  const worker = createEvidenceWorker({ runtimeFactory() { constructed = true; } });
  const response = await worker.fetch(new Request("https://evidence.example/api/evidence/google/v1/tickets", { method: "POST", body: "x".repeat(16_385), headers: { "content-length": "16385" } }), configuredEnv());
  assert.equal(response.status, 413);
  assert.equal(constructed, false);
});
