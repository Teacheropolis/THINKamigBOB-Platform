const SESSION_PATH = "/internal/evidence/v1/session";
const CLASS_PATH = "/internal/evidence/v1/authorize-class";

function requireBinding(binding) {
  if (typeof binding?.fetch !== "function") throw new Error("platform-auth-service-binding-required");
  return binding;
}

function forwardedHeaders(request) {
  const headers = new Headers();
  const source = request?.headers instanceof Headers ? request.headers : new Headers(request?.headers || {});
  for (const name of ["authorization", "cookie", "user-agent"]) {
    const value = source.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("accept", "application/json");
  return headers;
}

async function boundedJson(response) {
  if (!response?.ok) return null;
  const length = Number(response.headers?.get?.("content-length") || 0);
  if (length > 16_384) throw new Error("platform-auth-response-too-large");
  const text = await response.text();
  if (text.length > 16_384) throw new Error("platform-auth-response-too-large");
  try { return JSON.parse(text); } catch { throw new Error("invalid-platform-auth-response"); }
}

function identity(value, fields) {
  if (!value || typeof value !== "object") return null;
  const result = {};
  for (const field of fields) {
    const item = String(value[field] || "").trim();
    if (!item || item.length > 120) return null;
    result[field] = item;
  }
  return Object.freeze(result);
}

export function createPlatformAuthBindingClient({ binding, request } = {}) {
  const service = requireBinding(binding);
  let sessionPromise;

  function session() {
    sessionPromise ||= service.fetch(new Request(`https://platform-auth.internal${SESSION_PATH}`, {
      method: "GET",
      headers: forwardedHeaders(request),
    })).then(boundedJson);
    return sessionPromise;
  }

  return Object.freeze({
    async authenticateTeacher() {
      return identity((await session())?.teacher, ["id"]);
    },
    async authenticateStudent() {
      return identity((await session())?.student, ["id", "classId"]);
    },
    async authorizeClass({ teacherId, classId }) {
      const teacher = identity({ id: teacherId }, ["id"]);
      const classroom = String(classId || "").trim();
      if (!teacher || !classroom || classroom.length > 120) return false;
      const response = await service.fetch(new Request(`https://platform-auth.internal${CLASS_PATH}`, {
        method: "POST",
        headers: new Headers({ ...Object.fromEntries(forwardedHeaders(request)), "content-type": "application/json" }),
        body: JSON.stringify({ teacherId: teacher.id, classId: classroom }),
      }));
      return (await boundedJson(response))?.authorized === true;
    },
  });
}

export const PLATFORM_AUTH_INTERNAL_PATHS = Object.freeze({ session: SESSION_PATH, authorizeClass: CLASS_PATH });

