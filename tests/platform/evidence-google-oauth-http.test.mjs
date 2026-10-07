import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createGoogleOAuthHttpHandler } from "../../platform/integrations/google/evidence-google-oauth-http.mjs";
import { GOOGLE_OAUTH_ENDPOINTS, GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../platform/scripts/evidence-google-oauth-readiness.mjs";

const origin = "https://platform.example.org";
const dashboardUrl = `${origin}/platform/index.html#/teacher/dashboard`;
const pilotBroker = readFileSync(new URL("../../platform/scripts/evidence-upload-broker.mjs", import.meta.url), "utf8");

function request(path, { method = "GET", originHeader = origin, authenticated = true } = {}) {
  return { method, url: `${origin}${path}`, headers: originHeader ? { origin: originHeader } : {}, authenticated };
}

function fixture({ enabled = true } = {}) {
  const calls = [];
  const oauthService = {
    start({ teacherId }) { calls.push(["start", teacherId]); return { authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?state=safe" }; },
    async callback({ code, state }) { calls.push(["callback", code, state]); return code && state ? { ok: true } : { ok: false }; },
    async disconnect({ teacherId }) { calls.push(["disconnect", teacherId]); return { status: "not-connected", evidenceFilesDeleted: false, revocationPending: false }; },
  };
  const healthService = { async check({ teacherId }) { calls.push(["status", teacherId]); return { status: "connected", action: null }; } };
  const handler = createGoogleOAuthHttpHandler({ enabled, platformOrigin: origin, dashboardUrl, authenticateTeacher: async (value) => value.authenticated ? { id: "teacher-1" } : null, oauthService, healthService });
  return { calls, handler };
}

test("disabled production endpoints fail closed without leaking configuration", async () => {
  const { handler } = fixture({ enabled: false });
  const response = await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.status));
  assert.equal(response.status, 503);
  assert.deepEqual(JSON.parse(response.body), { status: "setup-required", scope: GOOGLE_OAUTH_REQUIRED_SCOPE });
  assert.equal(response.headers["Cache-Control"], "no-store");
});

test("status requires an authenticated teacher and returns no tokens", async () => {
  const { handler } = fixture();
  assert.equal((await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.status, { authenticated: false }))).status, 401);
  const response = await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.status));
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body), { status: "connected", action: null, scope: GOOGLE_OAUTH_REQUIRED_SCOPE });
  assert.equal(response.body.includes("token"), false);
});

test("connect and disconnect require same-origin POST requests", async () => {
  const { handler, calls } = fixture();
  assert.equal((await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.start, { method: "POST", originHeader: "https://evil.example" }))).status, 403);
  const start = await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.start, { method: "POST" }));
  assert.equal(start.status, 303);
  assert.match(start.headers.Location, /^https:\/\/accounts\.google\.com\//);
  const disconnect = await handler.handle(request(GOOGLE_OAUTH_ENDPOINTS.disconnect, { method: "POST" }));
  assert.equal(disconnect.status, 200);
  assert.deepEqual(JSON.parse(disconnect.body), { status: "not-connected", evidenceFilesDeleted: false, revocationPending: false });
  assert.deepEqual(calls.map((call) => call[0]), ["start", "disconnect"]);
});

test("Google callback relies on single-use state service and redirects safely", async () => {
  const { handler, calls } = fixture();
  const success = await handler.handle(request(`${GOOGLE_OAUTH_ENDPOINTS.callback}?code=code-1&state=state-1`, { originHeader: "", authenticated: false }));
  assert.equal(success.status, 303);
  assert.match(success.headers.Location, /googleDrive=connected/);
  assert.equal(success.headers.Location.includes("code-1"), false);
  assert.deepEqual(calls[0], ["callback", "code-1", "state-1"]);
  const denied = await handler.handle(request(`${GOOGLE_OAUTH_ENDPOINTS.callback}?error=access_denied`, { originHeader: "", authenticated: false }));
  assert.match(denied.headers.Location, /googleDrive=not-authorized/);
});

test("HTTP boundary requires a same-origin HTTPS production dashboard", () => {
  assert.throws(() => createGoogleOAuthHttpHandler({ platformOrigin: "http://127.0.0.1:8784", dashboardUrl: "http://127.0.0.1:8784/platform", authenticateTeacher() {} }), /same-origin-https-platform-required/);
  assert.throws(() => createGoogleOAuthHttpHandler({ platformOrigin: origin, dashboardUrl: "https://other.example/platform", authenticateTeacher() {} }), /same-origin-https-platform-required/);
});

test("local fictional broker exposes production routes only as setup-required", () => {
  assert.match(pilotBroker, /productionOAuthEnabled: false/);
  assert.match(pilotBroker, /requestUrl\.pathname\.startsWith\("\/api\/evidence\/google\/v1\/"\)/);
});
