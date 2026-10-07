import { createHash, randomBytes } from "node:crypto";
import { GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../scripts/evidence-google-oauth-readiness.mjs";

export const GOOGLE_AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const DEFAULT_OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

function base64url(bytes) {
  return Buffer.from(bytes).toString("base64url");
}

function requireTeacherId(value) {
  const teacherId = String(value || "").trim();
  if (!teacherId || teacherId.length > 120) throw new Error("valid-teacher-session-required");
  return teacherId;
}

export function createGoogleOAuthStateStore({ now = () => Date.now(), ttlMs = DEFAULT_OAUTH_STATE_TTL_MS, random = (length) => randomBytes(length) } = {}) {
  const records = new Map();
  return Object.freeze({
    issue({ teacherId }) {
      const owner = requireTeacherId(teacherId);
      const state = base64url(random(32));
      const verifier = base64url(random(48));
      const challenge = base64url(createHash("sha256").update(verifier).digest());
      records.set(state, { teacherId: owner, verifier, expiresAt: now() + ttlMs });
      return Object.freeze({ state, challenge, expiresInMs: ttlMs });
    },
    consume(state) {
      const key = String(state || "");
      const record = records.get(key);
      records.delete(key);
      if (!record) return { ok: false, reason: "invalid-or-used-state" };
      if (now() > record.expiresAt) return { ok: false, reason: "expired-state" };
      return { ok: true, value: { ...record } };
    },
  });
}

function validateConfiguration({ clientId, clientSecret, redirectUri, stateStore, tokenClient, tokenVault, driveClient, connectionStore }) {
  let redirect;
  try { redirect = new URL(redirectUri); } catch { throw new Error("valid-production-redirect-required"); }
  if (redirect.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(redirect.hostname)) throw new Error("valid-production-redirect-required");
  if (!clientId || !clientSecret) throw new Error("server-oauth-credentials-required");
  if (typeof stateStore?.issue !== "function" || typeof stateStore?.consume !== "function") throw new Error("oauth-state-store-required");
  if (typeof tokenClient?.exchange !== "function" || typeof tokenClient?.revoke !== "function") throw new Error("google-token-client-required");
  if (typeof tokenVault?.save !== "function" || typeof tokenVault?.status !== "function" || typeof tokenVault?.readForRevocation !== "function" || typeof tokenVault?.delete !== "function") throw new Error("encrypted-token-vault-required");
  if (typeof tokenVault?.use !== "function" || typeof driveClient?.ensureEvidenceFolder !== "function") throw new Error("google-drive-folder-service-required");
  if (typeof connectionStore?.save !== "function" || typeof connectionStore?.delete !== "function") throw new Error("durable-connection-store-required");
  return redirect.href;
}

export function createGoogleEvidenceOAuthService(configuration) {
  const { clientId, clientSecret, stateStore, tokenClient, tokenVault, driveClient, connectionStore } = configuration;
  const redirectUri = validateConfiguration(configuration);

  return Object.freeze({
    async status({ teacherId }) {
      const owner = requireTeacherId(teacherId);
      const value = await tokenVault.status({ teacherId: owner });
      return Object.freeze({ status: value?.connected ? "connected" : value?.reconnectRequired ? "reconnect-required" : "not-connected", scope: GOOGLE_OAUTH_REQUIRED_SCOPE, folderName: value?.folderName || null });
    },
    async start({ teacherId }) {
      const owner = requireTeacherId(teacherId);
      const proof = await stateStore.issue({ teacherId: owner });
      const url = new URL(GOOGLE_AUTHORIZATION_ENDPOINT);
      url.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: "code", scope: GOOGLE_OAUTH_REQUIRED_SCOPE, access_type: "offline", include_granted_scopes: "true", prompt: "consent", state: proof.state, code_challenge: proof.challenge, code_challenge_method: "S256" }).toString();
      return Object.freeze({ authorizationUrl: url.href, expiresInMs: proof.expiresInMs });
    },
    async callback({ code, state }) {
      if (!String(code || "").trim()) return { ok: false, reason: "authorization-code-required" };
      const proof = await stateStore.consume(state);
      if (!proof.ok) return proof;
      const tokens = await tokenClient.exchange({ code: String(code), verifier: proof.value.verifier, clientId, clientSecret, redirectUri });
      const scopes = new Set(String(tokens.scope || "").split(/\s+/).filter(Boolean));
      if (!scopes.has(GOOGLE_OAUTH_REQUIRED_SCOPE) || !tokens.refreshToken) return { ok: false, reason: "required-drive-file-access-not-granted" };
      await tokenVault.save({ teacherId: proof.value.teacherId, refreshToken: tokens.refreshToken, scope: GOOGLE_OAUTH_REQUIRED_SCOPE });
      try {
        const folder = await tokenVault.use({ teacherId: proof.value.teacherId, operation: (refreshToken) => driveClient.ensureEvidenceFolder({ refreshToken }) });
        await connectionStore.save({ teacherId: proof.value.teacherId, folderId: folder.id, folderName: folder.name });
      } catch (error) {
        await tokenVault.delete({ teacherId: proof.value.teacherId });
        try { await tokenClient.revoke({ token: tokens.refreshToken }); } catch { /* The local token record is still removed. */ }
        throw error;
      }
      return { ok: true, status: "connected", teacherId: proof.value.teacherId };
    },
    async disconnect({ teacherId }) {
      const owner = requireTeacherId(teacherId);
      const token = await tokenVault.readForRevocation({ teacherId: owner });
      let revocationPending = false;
      try { if (token) await tokenClient.revoke({ token }); } catch { revocationPending = true; }
      await Promise.all([tokenVault.delete({ teacherId: owner }), connectionStore.delete({ teacherId: owner })]);
      return { ok: true, status: "not-connected", evidenceFilesDeleted: false, revocationPending };
    },
  });
}
