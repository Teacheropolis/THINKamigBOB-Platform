const HEALTH_PATHS = Object.freeze([
  Object.freeze({ service: "Identity", path: "/api/auth/v1/health" }),
  Object.freeze({ service: "Evidence", path: "/api/evidence/google/v1/health" }),
]);

function validOrigin(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" && !["localhost", "127.0.0.1", "::1"].includes(url.hostname) && url.origin === String(value).replace(/\/$/, "");
  } catch { return false; }
}

export async function runStagingSmokeTest({ origin, fetchImpl = globalThis.fetch, expectEnabled = false } = {}) {
  if (!validOrigin(origin)) return Object.freeze({ ok: false, reason: "public-https-staging-origin-required", checks: Object.freeze([]) });
  const checks = [];
  for (const target of HEALTH_PATHS) {
    try {
      const response = await fetchImpl(`${String(origin).replace(/\/$/, "")}${target.path}`, { method: "GET", headers: { accept: "application/json" }, redirect: "error" });
      const text = await response.text();
      let body;
      try { body = JSON.parse(text); } catch { body = null; }
      const safeHeaders = response.headers.get("cache-control") === "no-store" && response.headers.get("x-content-type-options") === "nosniff" && !response.headers.has("set-cookie");
      const safeBody = body && Object.keys(body).sort().join(",") === "ok,productionReady" && body.ok === true && body.productionReady === expectEnabled;
      checks.push(Object.freeze({ service: target.service, ok: response.status === 200 && safeHeaders && safeBody, status: response.status, safeHeaders, expectedReady: expectEnabled, reportedReady: body?.productionReady }));
    } catch {
      checks.push(Object.freeze({ service: target.service, ok: false, status: 0, safeHeaders: false, expectedReady: expectEnabled, reportedReady: null }));
    }
  }
  return Object.freeze({ ok: checks.every((check) => check.ok), mode: expectEnabled ? "enabled" : "disabled", checks: Object.freeze(checks) });
}

export const STAGING_HEALTH_PATHS = HEALTH_PATHS;

