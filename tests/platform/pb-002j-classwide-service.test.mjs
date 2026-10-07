import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClassroomPrototypeService } from "../../scripts/start-classroom-prototype.mjs";

test("Technology B startup fails closed when the approved source checksum is wrong", async () => {
  const directory = await mkdtemp(join(tmpdir(), "pb002j-service-"));
  const catalogPath = new URL("../../platform/data/pb-002j-single-activity-catalog.v1.json", import.meta.url).pathname;
  const sourcePath = join(directory, "wrong-source.pptx");
  await writeFile(sourcePath, "not the approved corrected source");
  await assert.rejects(createClassroomPrototypeService({
    host: "127.0.0.1", port: 0,
    platformOrigin: "http://127.0.0.1:8782",
    classContextId: "class_context_2026_A",
    catalogPath,
    approvedSourcePath: sourcePath,
    directionsUrl: "https://docs.google.com/presentation/d/1GzkVODaIdAweiSCuFxJC3NOAQEE8GmwdMO7z05Inx64/edit?usp=drivesdk",
  }), /approved-source-checksum-mismatch/);
});

test("service source declares the bounded endpoints and exact-origin CORS", async () => {
  const source = await import("node:fs/promises").then(({ readFile }) => readFile(new URL("../../scripts/start-classroom-prototype.mjs", import.meta.url), "utf8"));
  for (const endpoint of ["/health", "/catalog", "/projection", "/configuration", "/withdrawals"]) assert.match(source, new RegExp(endpoint));
  assert.match(source, /origin !== platformOrigin/);
  assert.doesNotMatch(source, /Access-Control-Allow-Origin[^\n]+\*/);
  assert.match(source, /teacher-key-required/);
  assert.match(source, /stale-revision/);
});
