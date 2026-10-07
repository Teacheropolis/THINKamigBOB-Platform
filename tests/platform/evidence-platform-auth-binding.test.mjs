import test from "node:test";
import assert from "node:assert/strict";
import { createPlatformAuthBindingClient, PLATFORM_AUTH_INTERNAL_PATHS } from "../../platform/integrations/cloudflare/evidence-platform-auth-binding.mjs";

test("platform auth uses the private service binding and reuses one request-scoped session", async () => {
  const calls = [];
  const binding = {
    async fetch(request) {
      calls.push(request);
      const path = new URL(request.url).pathname;
      if (path === PLATFORM_AUTH_INTERNAL_PATHS.session) return Response.json({ teacher: { id: "teacher-1" }, student: null });
      return Response.json({ authorized: true });
    },
  };
  const request = new Request("https://evidence.example/api", { headers: { cookie: "session=private", authorization: "Bearer private", "x-untrusted-role": "teacher" } });
  const client = createPlatformAuthBindingClient({ binding, request });
  assert.deepEqual(await client.authenticateTeacher(), { id: "teacher-1" });
  assert.equal(await client.authenticateStudent(), null);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].headers.get("cookie"), "session=private");
  assert.equal(calls[0].headers.has("x-untrusted-role"), false);
  assert.equal(await client.authorizeClass({ teacherId: "teacher-1", classId: "class-1" }), true);
  assert.equal(new URL(calls[1].url).origin, "https://platform-auth.internal");
});

test("platform auth fails closed for invalid identities and oversized responses", async () => {
  const invalid = createPlatformAuthBindingClient({ binding: { fetch: async () => Response.json({ teacher: { id: "" } }) }, request: new Request("https://evidence.example") });
  assert.equal(await invalid.authenticateTeacher(), null);
  const oversized = createPlatformAuthBindingClient({ binding: { fetch: async () => new Response("{}", { headers: { "content-length": "20000" } }) }, request: new Request("https://evidence.example") });
  await assert.rejects(oversized.authenticateTeacher(), /platform-auth-response-too-large/);
});

