import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");
const config = readFileSync(new URL("../../platform/integrations/cloudflare/platform-identity-wrangler.example.jsonc", import.meta.url), "utf8");

test("entry screens distinguish disabled production identity from the fictional pilot", () => {
  assert.match(app, /Production sign-in foundation/);
  assert.match(app, /Teachers will sign in with Google/);
  assert.match(app, /Students will not sign in to Google/);
  assert.match(app, /Local fictional pilot/);
  assert.match(app, /Continue with Google<\/button>/);
  assert.match(css, /\.platform-production-entry/);
});

test("student entry deployment template includes a bounded class-keyed rate limit", () => {
  assert.match(config, /"name": "STUDENT_ENTRY_RATE_LIMIT"/);
  assert.match(config, /"limit": 10/);
  assert.match(config, /"period": 60/);
  assert.match(config, /"PRODUCTION_ENABLED": "false"/);
});

