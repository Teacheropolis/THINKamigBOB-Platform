import { GOOGLE_OAUTH_ENDPOINTS, GOOGLE_OAUTH_REQUIRED_SCOPE } from "../../scripts/evidence-google-oauth-readiness.mjs";

function json(status, body, extraHeaders = {}) {
  return Object.freeze({ status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders }, body: JSON.stringify(body) });
}

function redirect(location) {
  return Object.freeze({ status: 303, headers: { Location: location, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" }, body: "" });
}

function safeDashboardRedirect(dashboardUrl, result) {
  const url = new URL(dashboardUrl);
  url.searchParams.set("googleDrive", result);
  return url.href;
}

function sameOrigin(request, platformOrigin) {
  return String(request.headers?.origin || "") === platformOrigin;
}

export function createGoogleOAuthHttpHandler({ enabled = false, platformOrigin, dashboardUrl, authenticateTeacher, oauthService, healthService } = {}) {
  let origin;
  let dashboard;
  try { origin = new URL(platformOrigin); dashboard = new URL(dashboardUrl); } catch { throw new Error("production-platform-urls-required"); }
  if (origin.protocol !== "https:" || dashboard.protocol !== "https:" || origin.origin !== dashboard.origin) throw new Error("same-origin-https-platform-required");
  if (typeof authenticateTeacher !== "function") throw new Error("teacher-session-authenticator-required");
  if (enabled && (typeof oauthService?.start !== "function" || typeof oauthService?.callback !== "function" || typeof oauthService?.disconnect !== "function" || typeof healthService?.check !== "function")) throw new Error("configured-oauth-and-health-services-required");

  return Object.freeze({
    async handle(request) {
      const requestUrl = new URL(request.url, origin);
      const path = requestUrl.pathname;
      if (!Object.values(GOOGLE_OAUTH_ENDPOINTS).includes(path)) return null;
      if (!enabled) return json(503, { status: "setup-required", scope: GOOGLE_OAUTH_REQUIRED_SCOPE });

      if (path === GOOGLE_OAUTH_ENDPOINTS.callback && request.method === "GET") {
        if (requestUrl.searchParams.get("error")) return redirect(safeDashboardRedirect(dashboard, "not-authorized"));
        try {
          const result = await oauthService.callback({ code: requestUrl.searchParams.get("code"), state: requestUrl.searchParams.get("state") });
          return redirect(safeDashboardRedirect(dashboard, result.ok ? "connected" : "connection-failed"));
        } catch {
          return redirect(safeDashboardRedirect(dashboard, "connection-failed"));
        }
      }

      const teacher = await authenticateTeacher(request);
      if (!teacher?.id) return json(401, { error: "authenticated-teacher-required" });

      if (path === GOOGLE_OAUTH_ENDPOINTS.status && request.method === "GET") {
        const health = await healthService.check({ teacherId: teacher.id });
        return json(200, { ...health, scope: GOOGLE_OAUTH_REQUIRED_SCOPE });
      }

      if (!sameOrigin(request, origin.origin)) return json(403, { error: "same-origin-request-required" });
      if (path === GOOGLE_OAUTH_ENDPOINTS.start && request.method === "POST") {
        const started = await oauthService.start({ teacherId: teacher.id });
        return redirect(started.authorizationUrl);
      }
      if (path === GOOGLE_OAUTH_ENDPOINTS.disconnect && request.method === "POST") {
        const result = await oauthService.disconnect({ teacherId: teacher.id });
        return json(200, { status: result.status, evidenceFilesDeleted: false, revocationPending: result.revocationPending === true });
      }
      return json(405, { error: "method-not-allowed" }, { Allow: path === GOOGLE_OAUTH_ENDPOINTS.status ? "GET" : "POST" });
    },
  });
}
