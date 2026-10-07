import { createGoogleDriveEvidenceClient, createGoogleTokenClient, MAX_PRODUCTION_EVIDENCE_BYTES } from "../google/evidence-google-api-clients.mjs";
import { createGoogleConnectionHealthService } from "../google/evidence-google-connection-health.mjs";
import { createGoogleOAuthHttpHandler } from "../google/evidence-google-oauth-http.mjs";
import { createGoogleEvidenceOAuthService } from "../google/evidence-google-oauth-service.mjs";
import { createGoogleProductionEvidenceHttpHandler } from "../google/evidence-google-production-http.mjs";
import { createEncryptedTeacherTokenVault } from "../google/evidence-google-token-vault.mjs";
import { createD1EvidenceRepositories } from "./evidence-d1-repositories.mjs";
import { createPlatformAuthBindingClient } from "./evidence-platform-auth-binding.mjs";

const API_PREFIX = "/api/evidence/google/v1/";
const PUBLIC_HEALTH_PATH = `${API_PREFIX}health`;
const MAX_JSON_BYTES = 16_384;

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
}

function configurationReady(env) {
  return env?.PRODUCTION_ENABLED === "true" && typeof env?.EVIDENCE_DB?.prepare === "function" && typeof env?.PLATFORM_AUTH?.fetch === "function" && Boolean(env?.PLATFORM_ORIGIN && env?.DASHBOARD_URL && env?.GOOGLE_OAUTH_CLIENT_ID && env?.GOOGLE_OAUTH_CLIENT_SECRET && env?.GOOGLE_OAUTH_REDIRECT_URI && env?.TOKEN_ENCRYPTION_KEY);
}

async function requestBody(request, path) {
  if (!["POST", "PUT", "PATCH"].includes(request.method)) return Buffer.alloc(0);
  const maximum = path.endsWith("/uploads") ? MAX_PRODUCTION_EVIDENCE_BYTES : MAX_JSON_BYTES;
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > maximum) throw Object.assign(new Error("request-too-large"), { status: 413 });
  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length > maximum) throw Object.assign(new Error("request-too-large"), { status: 413 });
  return bytes;
}

function toResponse(result) {
  return new Response(result.body, { status: result.status, headers: { ...result.headers, "X-Content-Type-Options": "nosniff" } });
}

function buildRuntime(env, request) {
  const auth = createPlatformAuthBindingClient({ binding: env.PLATFORM_AUTH, request });
  const repositories = createD1EvidenceRepositories({ database: env.EVIDENCE_DB });
  const tokenVault = createEncryptedTeacherTokenVault({ key: env.TOKEN_ENCRYPTION_KEY, repository: repositories.tokenRepository });
  const tokenClient = createGoogleTokenClient();
  const driveClient = createGoogleDriveEvidenceClient({ tokenClient, clientId: env.GOOGLE_OAUTH_CLIENT_ID, clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET });
  const oauthService = createGoogleEvidenceOAuthService({
    clientId: env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI,
    stateStore: repositories.oauthStateStore,
    tokenClient,
    tokenVault,
    driveClient,
    connectionStore: repositories.connectionStore,
  });
  return {
    oauth: createGoogleOAuthHttpHandler({ enabled: true, platformOrigin: env.PLATFORM_ORIGIN, dashboardUrl: env.DASHBOARD_URL, authenticateTeacher: () => auth.authenticateTeacher(), oauthService, healthService: createGoogleConnectionHealthService({ tokenVault, googleClient: driveClient }) }),
    evidence: createGoogleProductionEvidenceHttpHandler({ enabled: true, platformOrigin: env.PLATFORM_ORIGIN, authenticateTeacher: () => auth.authenticateTeacher(), authenticateStudent: () => auth.authenticateStudent(), authorizeClass: (scope) => auth.authorizeClass(scope), connectionStore: repositories.connectionStore, tokenVault, driveClient, launchStore: repositories.launchStore, ticketStore: repositories.ticketStore }),
  };
}

export function createEvidenceWorker({ runtimeFactory = buildRuntime } = {}) {
  return Object.freeze({
    async fetch(request, env) {
      const url = new URL(request.url);
      if ((url.pathname === "/health" || url.pathname === PUBLIC_HEALTH_PATH) && request.method === "GET") return json(200, { ok: true, productionReady: configurationReady(env) });
      if (!url.pathname.startsWith(API_PREFIX)) return json(404, { error: "not-found" });
      if (!configurationReady(env)) return json(503, { status: "setup-required", productionEvidenceEnabled: false });
      try {
        const body = await requestBody(request, url.pathname);
        const input = { method: request.method, url: request.url, headers: Object.fromEntries(request.headers), body };
        const runtime = runtimeFactory(env, request);
        const result = await runtime.oauth.handle(input) || await runtime.evidence.handle(input);
        return result ? toResponse(result) : json(404, { error: "not-found" });
      } catch (error) {
        const status = Number(error?.status) || 500;
        console.error(JSON.stringify({ event: "evidence-api-error", path: url.pathname, status, reason: status === 413 ? "request-too-large" : "internal-error" }));
        return json(status, { error: status === 500 ? "evidence-service-unavailable" : "request-too-large" });
      }
    },
  });
}

export default createEvidenceWorker();
