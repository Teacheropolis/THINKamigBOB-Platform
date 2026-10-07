#!/usr/bin/env node
import { createHash, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import {
  PB002J_ACTIVITY_ID,
  PB002J_ACTIVITY_VERSION,
  PB002J_ALLOWED_HEADERS,
  PB002J_DIRECTIONS_URL,
  PB002J_SOURCE_SHA256,
  publicProjection,
  validateCatalog,
  validateClassContextId,
  validateConfiguration,
} from "../platform/scripts/pb-002j-classwide-contract.mjs";

const API_PREFIX = "/api/pb-002j/v1";
const MUTATION_PATHS = new Set([`${API_PREFIX}/configuration`, `${API_PREFIX}/withdrawals`]);
const OPTIONS_PATHS = new Set([`${API_PREFIX}/catalog`, ...MUTATION_PATHS]);

function send(response, status, body, origin) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
  });
  response.end(JSON.stringify(body));
}

async function bodyJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 64_000) throw new Error("request-too-large");
  }
  return JSON.parse(raw || "{}");
}

export async function createClassroomPrototypeService(options) {
  const {
    host = "127.0.0.1", port = 8783, platformOrigin, classContextId,
    catalogPath, approvedSourcePath, directionsUrl,
  } = options;
  if (!platformOrigin || !validateClassContextId(classContextId)) throw new Error("explicit-platform-origin-and-opaque-class-context-required");
  if (directionsUrl !== PB002J_DIRECTIONS_URL) throw new Error("directions-url-does-not-match-approved-record");
  const [catalogRaw, sourceBytes] = await Promise.all([readFile(catalogPath, "utf8"), readFile(approvedSourcePath)]);
  const catalog = JSON.parse(catalogRaw);
  if (!validateCatalog(catalog).ok) throw new Error("catalog-contract-mismatch");
  const sourceChecksum = createHash("sha256").update(sourceBytes).digest("hex");
  if (sourceChecksum !== PB002J_SOURCE_SHA256) throw new Error("approved-source-checksum-mismatch");

  const teacherKey = randomBytes(24).toString("base64url");
  let revision = 0;
  let configuration = null;
  let withdrawn = false;
  const completedRequests = new Map();

  const server = createServer(async (request, response) => {
    const origin = request.headers.origin;
    const url = new URL(request.url, `http://${request.headers.host ?? `${host}:${port}`}`);
    if (origin !== platformOrigin) return send(response, 403, { error: "origin-not-approved" }, platformOrigin);
    if (request.method === "OPTIONS") {
      if (!OPTIONS_PATHS.has(url.pathname)) return send(response, 404, { error: "not-found" }, platformOrigin);
      response.writeHead(204, {
        "Access-Control-Allow-Origin": platformOrigin,
        "Access-Control-Allow-Methods": url.pathname === `${API_PREFIX}/catalog` ? "GET, OPTIONS" : `${url.pathname.endsWith("configuration") ? "PUT" : "POST"}, OPTIONS`,
        "Access-Control-Allow-Headers": PB002J_ALLOWED_HEADERS.join(", "),
        "Access-Control-Max-Age": "600",
        Vary: "Origin",
      });
      return response.end();
    }
    const authorized = request.headers.authorization === `Bearer ${teacherKey}`;
    if (url.pathname === `${API_PREFIX}/health` && request.method === "GET") {
      return send(response, 200, { status: "ready", persistence: "memory-only", classContextId }, platformOrigin);
    }
    if (url.pathname === `${API_PREFIX}/projection` && request.method === "GET") {
      return send(response, 200, publicProjection({ revision, configuration, catalog, withdrawn }), platformOrigin);
    }
    if (url.pathname === `${API_PREFIX}/catalog` && request.method === "GET") {
      if (!authorized) return send(response, 401, { error: "teacher-key-required" }, platformOrigin);
      return send(response, 200, { revision, catalog }, platformOrigin);
    }
    if (!MUTATION_PATHS.has(url.pathname)) return send(response, 404, { error: "not-found" }, platformOrigin);
    if (!authorized) return send(response, 401, { error: "teacher-key-required" }, platformOrigin);
    const requestId = request.headers["x-pb-002j-request-id"];
    if (typeof requestId !== "string" || !/^[A-Za-z0-9-]{16,80}$/.test(requestId)) {
      return send(response, 400, { error: "valid-request-id-required" }, platformOrigin);
    }
    if (completedRequests.has(requestId)) return send(response, 200, completedRequests.get(requestId), platformOrigin);
    if (String(revision) !== request.headers["if-match"]) return send(response, 409, { error: "stale-revision", revision }, platformOrigin);
    try {
      const body = await bodyJson(request);
      if (url.pathname === `${API_PREFIX}/configuration` && request.method === "PUT") {
        const result = validateConfiguration(body, catalog, classContextId);
        if (!result.ok) return send(response, 422, { error: result.reason }, platformOrigin);
        configuration = result.configuration;
        withdrawn = false;
      } else if (url.pathname === `${API_PREFIX}/withdrawals` && request.method === "POST") {
        if (body.activityId !== PB002J_ACTIVITY_ID || body.activityVersion !== PB002J_ACTIVITY_VERSION) {
          return send(response, 422, { error: "unknown-or-unapproved-activity" }, platformOrigin);
        }
        configuration = null;
        withdrawn = true;
      } else {
        return send(response, 405, { error: "method-not-allowed" }, platformOrigin);
      }
      revision += 1;
      const result = { ok: true, revision, projection: publicProjection({ revision, configuration, catalog, withdrawn }) };
      completedRequests.set(requestId, result);
      return send(response, 200, result, platformOrigin);
    } catch (error) {
      return send(response, 400, { error: error.message === "request-too-large" ? error.message : "invalid-json" }, platformOrigin);
    }
  });

  return Object.freeze({
    teacherKey,
    listen: () => new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(port, host, () => resolve(server.address()));
    }),
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  });
}

function parseArguments(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index]?.replace(/^--/, "").replaceAll("-", "_");
    if (!key || !argv[index + 1]) throw new Error("all-startup-options-require-values");
    result[key] = argv[index + 1];
  }
  return {
    host: result.host,
    port: result.port ? Number(result.port) : undefined,
    platformOrigin: result.platform_origin,
    classContextId: result.class_context_id,
    catalogPath: result.catalog,
    approvedSourcePath: result.approved_source,
    directionsUrl: result.directions_url,
  };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const service = await createClassroomPrototypeService(options);
    const address = await service.listen();
    process.stdout.write(`PB-002J classroom prototype ready at http://${address.address}:${address.port}\n`);
    process.stdout.write(`Teacher key (memory only): ${service.teacherKey}\n`);
    process.stdout.write("Stopping this process clears all class-wide availability.\n");
    const shutdown = async () => { await service.close(); process.exit(0); };
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  } catch (error) {
    process.stderr.write(`PB-002J startup failed closed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
