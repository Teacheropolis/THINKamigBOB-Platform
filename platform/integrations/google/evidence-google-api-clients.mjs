import { GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../scripts/evidence-google-oauth-readiness.mjs";
import { randomBytes } from "node:crypto";

export const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
export const GOOGLE_REVOKE_ENDPOINT = "https://oauth2.googleapis.com/revoke";
export const GOOGLE_DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
export const GOOGLE_DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder";
export const EVIDENCE_FOLDER_PROPERTY = Object.freeze({ key: "thinkamigbobEvidenceRoot", value: "v1" });
export const EVIDENCE_FILE_PROPERTY = Object.freeze({ key: "thinkamigbobEvidence", value: "v1" });
export const PRODUCTION_EVIDENCE_IMAGE_TYPES = Object.freeze(["image/jpeg", "image/png", "image/webp"]);
export const MAX_PRODUCTION_EVIDENCE_BYTES = 8 * 1024 * 1024;

async function googleJson(response, fallback) {
  let body = {};
  try { body = await response.json(); } catch { /* Use the bounded fallback. */ }
  if (!response.ok) throw new Error(String(body.error || fallback).slice(0, 120));
  return body;
}

function formRequest(values) {
  return { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" }, body: new URLSearchParams(values).toString(), redirect: "error" };
}

export function createGoogleTokenClient({ fetchImpl = globalThis.fetch } = {}) {
  if (typeof fetchImpl !== "function") throw new Error("secure-fetch-required");
  return Object.freeze({
    async exchange({ code, verifier, clientId, clientSecret, redirectUri }) {
      const response = await fetchImpl(GOOGLE_TOKEN_ENDPOINT, formRequest({ code, code_verifier: verifier, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }));
      const body = await googleJson(response, "token-exchange-failed");
      return Object.freeze({ accessToken: body.access_token || null, refreshToken: body.refresh_token || null, expiresIn: Number(body.expires_in) || null, scope: body.scope || "", tokenType: body.token_type || null });
    },
    async refresh({ refreshToken, clientId, clientSecret }) {
      const response = await fetchImpl(GOOGLE_TOKEN_ENDPOINT, formRequest({ refresh_token: refreshToken, client_id: clientId, client_secret: clientSecret, grant_type: "refresh_token" }));
      const body = await googleJson(response, "token-refresh-failed");
      if (!body.access_token) throw new Error("access-token-missing");
      return Object.freeze({ accessToken: body.access_token, expiresIn: Number(body.expires_in) || null, scope: body.scope || GOOGLE_OAUTH_REQUIRED_SCOPE, tokenType: body.token_type || "Bearer" });
    },
    async revoke({ token }) {
      const response = await fetchImpl(GOOGLE_REVOKE_ENDPOINT, formRequest({ token }));
      if (!response.ok) {
        const body = await googleJson(response, "token-revocation-failed");
        return body;
      }
      return Object.freeze({ ok: true });
    },
  });
}

function bearer(accessToken, extra = {}) {
  return { Authorization: `Bearer ${accessToken}`, Accept: "application/json", ...extra };
}

function boundedProperty(value, fallback) {
  const clean = String(value || "").trim().replace(/[\u0000-\u001f]/g, " ");
  return (clean || fallback).slice(0, 100);
}

function safeFileName(value) {
  return boundedProperty(value, "evidence-image").replace(/[\\/]/g, "-");
}

function multipartBody(metadata, bytes, mimeType, boundary) {
  const before = Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`);
  const after = Buffer.from(`\r\n--${boundary}--\r\n`);
  return Buffer.concat([before, Buffer.from(bytes), after]);
}

export function createGoogleDriveEvidenceClient({ tokenClient, clientId, clientSecret, fetchImpl = globalThis.fetch, folderName = "THINKamigBOB Student Evidence" } = {}) {
  if (typeof tokenClient?.refresh !== "function" || typeof fetchImpl !== "function" || !clientId || !clientSecret) throw new Error("google-drive-client-configuration-required");
  const safeFolderName = String(folderName || "").trim();
  if (safeFolderName.length < 3 || safeFolderName.length > 80) throw new Error("valid-evidence-folder-name-required");

  async function access(refreshToken) {
    const refreshed = await tokenClient.refresh({ refreshToken, clientId, clientSecret });
    return refreshed.accessToken;
  }

  async function findFolder(accessToken) {
    const query = `mimeType = '${GOOGLE_DRIVE_FOLDER_MIME}' and trashed = false and appProperties has { key='${EVIDENCE_FOLDER_PROPERTY.key}' and value='${EVIDENCE_FOLDER_PROPERTY.value}' }`;
    const url = new URL(GOOGLE_DRIVE_FILES_ENDPOINT);
    url.search = new URLSearchParams({ q: query, spaces: "drive", fields: "files(id,name,mimeType,trashed)", pageSize: "2" }).toString();
    const response = await fetchImpl(url, { method: "GET", headers: bearer(accessToken), redirect: "error" });
    const body = await googleJson(response, "drive-folder-search-failed");
    return Array.isArray(body.files) ? body.files[0] || null : null;
  }

  async function createFolder(accessToken) {
    const url = new URL(GOOGLE_DRIVE_FILES_ENDPOINT);
    url.search = new URLSearchParams({ fields: "id,name,mimeType", ignoreDefaultVisibility: "true" }).toString();
    const response = await fetchImpl(url, { method: "POST", headers: bearer(accessToken, { "Content-Type": "application/json" }), body: JSON.stringify({ name: safeFolderName, mimeType: GOOGLE_DRIVE_FOLDER_MIME, appProperties: { [EVIDENCE_FOLDER_PROPERTY.key]: EVIDENCE_FOLDER_PROPERTY.value } }), redirect: "error" });
    return googleJson(response, "drive-folder-create-failed");
  }

  async function ensureEvidenceFolder({ refreshToken }) {
    const accessToken = await access(refreshToken);
    const existing = await findFolder(accessToken);
    const folder = existing || await createFolder(accessToken);
    return Object.freeze({ id: String(folder.id), name: String(folder.name || safeFolderName), created: !existing });
  }

  async function folderAccess(refreshToken, folderId) {
    const accessToken = await access(refreshToken);
    const id = String(folderId || "").trim();
    if (!id || id.length > 200) throw new Error("valid-evidence-folder-required");
    return { accessToken, folderId: id };
  }

  async function evidenceMetadata(accessToken, fileId) {
    const id = encodeURIComponent(String(fileId || "").trim());
    if (!id) throw new Error("valid-evidence-file-required");
    const url = new URL(`${GOOGLE_DRIVE_FILES_ENDPOINT}/${id}`);
    url.searchParams.set("fields", "id,name,mimeType,size,createdTime,parents,trashed,appProperties");
    const response = await fetchImpl(url, { method: "GET", headers: bearer(accessToken), redirect: "error" });
    return googleJson(response, "drive-evidence-metadata-failed");
  }

  function verifyEvidenceOwnership(file, folderId) {
    if (file?.trashed === true || !Array.isArray(file?.parents) || !file.parents.includes(folderId) || file?.appProperties?.[EVIDENCE_FILE_PROPERTY.key] !== EVIDENCE_FILE_PROPERTY.value) throw new Error("evidence-file-outside-managed-folder");
    if (!PRODUCTION_EVIDENCE_IMAGE_TYPES.includes(file.mimeType)) throw new Error("evidence-file-type-not-allowed");
  }

  return Object.freeze({
    ensureEvidenceFolder,
    async checkDriveAccess({ refreshToken }) {
      try {
        const folder = await ensureEvidenceFolder({ refreshToken });
        return Object.freeze({ ok: true, folderReady: true, folderId: folder.id });
      } catch (error) {
        if (["invalid_grant", "unauthorized_client", "access_denied"].includes(error?.message)) throw new Error("invalid_grant");
        if (error?.message === "insufficientPermissions" || error?.message === "insufficient_scope") throw new Error("insufficient-permission");
        throw error;
      }
    },
    async uploadEvidence({ refreshToken, folderId, bytes, mimeType, fileName, studentId, activity, evidenceType }) {
      const type = String(mimeType || "").toLowerCase();
      const content = Buffer.from(bytes || []);
      if (!PRODUCTION_EVIDENCE_IMAGE_TYPES.includes(type)) throw new Error("evidence-file-type-not-allowed");
      if (!content.length) throw new Error("empty-evidence-file");
      if (content.length > MAX_PRODUCTION_EVIDENCE_BYTES) throw new Error("evidence-file-too-large");
      const auth = await folderAccess(refreshToken, folderId);
      const metadata = {
        name: safeFileName(fileName),
        parents: [auth.folderId],
        appProperties: {
          [EVIDENCE_FILE_PROPERTY.key]: EVIDENCE_FILE_PROPERTY.value,
          studentId: boundedProperty(studentId, "student"),
          activity: boundedProperty(activity, "Evidence activity"),
          evidenceType: boundedProperty(evidenceType, "Photo"),
        },
      };
      const boundary = `thinkamigbob-${randomBytes(12).toString("hex")}`;
      const url = new URL("https://www.googleapis.com/upload/drive/v3/files");
      url.search = new URLSearchParams({ uploadType: "multipart", fields: "id,name,mimeType,size,createdTime,parents,appProperties", ignoreDefaultVisibility: "true" }).toString();
      const response = await fetchImpl(url, { method: "POST", headers: bearer(auth.accessToken, { "Content-Type": `multipart/related; boundary=${boundary}` }), body: multipartBody(metadata, content, type, boundary), redirect: "error" });
      const file = await googleJson(response, "drive-evidence-upload-failed");
      return Object.freeze({ id: String(file.id), name: String(file.name || metadata.name), mimeType: String(file.mimeType || type), size: Number(file.size) || content.length, createdTime: file.createdTime || null });
    },
    async listEvidence({ refreshToken, folderId }) {
      const auth = await folderAccess(refreshToken, folderId);
      const query = `'${auth.folderId.replaceAll("'", "\\'")}' in parents and trashed = false and appProperties has { key='${EVIDENCE_FILE_PROPERTY.key}' and value='${EVIDENCE_FILE_PROPERTY.value}' }`;
      const url = new URL(GOOGLE_DRIVE_FILES_ENDPOINT);
      url.search = new URLSearchParams({ q: query, spaces: "drive", fields: "files(id,name,mimeType,size,createdTime,appProperties)", orderBy: "createdTime desc", pageSize: "50" }).toString();
      const response = await fetchImpl(url, { method: "GET", headers: bearer(auth.accessToken), redirect: "error" });
      const body = await googleJson(response, "drive-evidence-list-failed");
      return Object.freeze((Array.isArray(body.files) ? body.files : []).map((file) => Object.freeze({ id: String(file.id), name: String(file.name || "Evidence"), mimeType: String(file.mimeType || ""), size: Number(file.size) || 0, createdTime: file.createdTime || null, studentId: file.appProperties?.studentId || "student", activity: file.appProperties?.activity || "Evidence activity", evidenceType: file.appProperties?.evidenceType || "Photo" })));
    },
    async getEvidenceContent({ refreshToken, folderId, fileId }) {
      const auth = await folderAccess(refreshToken, folderId);
      const file = await evidenceMetadata(auth.accessToken, fileId);
      verifyEvidenceOwnership(file, auth.folderId);
      const url = new URL(`${GOOGLE_DRIVE_FILES_ENDPOINT}/${encodeURIComponent(String(file.id))}`);
      url.searchParams.set("alt", "media");
      const response = await fetchImpl(url, { method: "GET", headers: bearer(auth.accessToken), redirect: "error" });
      if (!response.ok) throw new Error("drive-evidence-content-failed");
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length > MAX_PRODUCTION_EVIDENCE_BYTES) throw new Error("evidence-file-too-large");
      return Object.freeze({ bytes, mimeType: file.mimeType, name: String(file.name || "Evidence") });
    },
  });
}
