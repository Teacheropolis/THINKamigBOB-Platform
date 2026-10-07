#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { createEvidenceUploadBroker } from "../platform/scripts/evidence-upload-broker.mjs";
import { createEvidenceUploadTicketStore } from "../platform/scripts/evidence-upload-tickets.mjs";

export function createAppsScriptDriveClient({ endpoint, uploadToken, fetchImpl = globalThis.fetch }) {
  if (!endpoint || !uploadToken || typeof fetchImpl !== "function") throw new Error("apps-script-endpoint-and-runtime-secret-required");
  async function request(payload) {
    const response = await fetchImpl(endpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ uploadToken, ...payload }) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || "drive-request-failed");
    return result;
  }
  return Object.freeze({
    async uploadImage({ bytes, mimeType, fileName, activity, studentId, evidenceType }) {
      return (await request({ action: "upload", mimeType, dataBase64: bytes.toString("base64"), activity, studentId, evidenceType, fileName })).evidence;
    },
    async listImages() {
      return (await request({ action: "list" })).evidence;
    },
    async getImage({ fileId }) {
      const evidence = (await request({ action: "content", fileId })).evidence;
      return { bytes: Buffer.from(evidence.dataBase64, "base64"), mimeType: evidence.mimeType };
    },
  });
}

export async function createEvidencePilotService({ host = "127.0.0.1", port = 8784, platformOrigin = "http://127.0.0.1:8784", staticRoot = new URL("../", import.meta.url), destinationPath, uploadToken, teacherKey = randomBytes(24).toString("base64url"), fetchImpl } = {}) {
  if (!destinationPath || !uploadToken) throw new Error("destination-config-and-upload-secret-required");
  const destination = JSON.parse(await readFile(destinationPath, "utf8"));
  const ticketStore = createEvidenceUploadTicketStore();
  const driveClient = createAppsScriptDriveClient({ endpoint: destination.uploadEndpoint, uploadToken, fetchImpl });
  const broker = createEvidenceUploadBroker({ host, port, platformOrigin, teacherKey, ticketStore, folderId: destination.folderId, driveClient, staticRoot });
  return Object.freeze({ teacherKey, listen: broker.listen, close: broker.close });
}

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index]?.replace(/^--/, "").replaceAll("-", "_");
    if (!key || !argv[index + 1]) throw new Error("all-startup-options-require-values");
    values[key] = argv[index + 1];
  }
  return values;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const values = parseArguments(process.argv.slice(2));
    const service = await createEvidencePilotService({
      host: values.host,
      port: values.port ? Number(values.port) : undefined,
      platformOrigin: values.platform_origin,
      destinationPath: values.destination || new URL("../platform/data/evidence-drive-pilot-destination.v1.json", import.meta.url),
      uploadToken: process.env.EVIDENCE_APPS_SCRIPT_UPLOAD_TOKEN,
    });
    const address = await service.listen();
    process.stdout.write(`Evidence pilot ready at http://${address.address}:${address.port}\n`);
    process.stdout.write(`Teacher key (memory only): ${service.teacherKey}\n`);
    process.stdout.write("Stopping this process clears the launch and every unused ticket.\n");
    const shutdown = async () => { await service.close(); process.exit(0); };
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  } catch (error) {
    process.stderr.write(`Evidence pilot startup failed closed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
