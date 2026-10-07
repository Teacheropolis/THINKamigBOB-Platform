import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createEvidenceGovernanceSimulation, GOVERNANCE_SIMULATION_STATUS } from "../../platform/scripts/evidence-governance-simulation.mjs";

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const broker = readFileSync(new URL("../../platform/scripts/evidence-upload-broker.mjs", import.meta.url), "utf8");

test("simulation requires a reason and export safeguard", () => {
  const simulation = createEvidenceGovernanceSimulation({ storage: memoryStorage() });
  assert.equal(simulation.submit({ evidenceId: "e1", evidenceLabel: "Photo", reason: "", exportOffered: true }).reason, "reason-required");
  assert.equal(simulation.submit({ evidenceId: "e1", evidenceLabel: "Photo", reason: "Retention ended", exportOffered: false }).reason, "export-required");
});

test("simulation supports approval for recoverable trash with an audit trail", () => {
  const simulation = createEvidenceGovernanceSimulation({ storage: memoryStorage(), now: () => "2026-09-27T00:00:00.000Z" });
  assert.equal(simulation.submit({ evidenceId: "e1", evidenceLabel: "Photo", reason: "Retention ended", exportOffered: true }).ok, true);
  assert.equal(simulation.read().status, GOVERNANCE_SIMULATION_STATUS.PENDING_ADMIN);
  assert.equal(simulation.decide({ decision: "approve", reviewer: "Fictional administrator", note: "Policy requirements met" }).ok, true);
  const result = simulation.read();
  assert.equal(result.status, GOVERNANCE_SIMULATION_STATUS.APPROVED_FOR_TRASH);
  assert.deepEqual(result.audit.map((item) => item.action), ["REQUEST_SUBMITTED", "ADMIN_APPROVED"]);
});

test("simulation supports rejection and cancel without changing evidence", () => {
  const simulation = createEvidenceGovernanceSimulation({ storage: memoryStorage() });
  simulation.submit({ evidenceId: "e1", evidenceLabel: "Photo", reason: "Request", exportOffered: true });
  assert.equal(simulation.cancel().ok, true);
  assert.equal(simulation.read().status, GOVERNANCE_SIMULATION_STATUS.CANCELED);
  assert.equal(simulation.reset().ok, true);
  simulation.submit({ evidenceId: "e2", evidenceLabel: "Screenshot", reason: "Request", exportOffered: true });
  simulation.decide({ decision: "reject", reviewer: "Fictional administrator", note: "Retention not complete" });
  assert.equal(simulation.read().status, GOVERNANCE_SIMULATION_STATUS.REJECTED);
});

test("teacher simulation UI is explicit and no Drive mutation route exists", () => {
  assert.match(app, /Governance Enforcement Simulation/);
  assert.match(app, /this workflow never deletes, trashes, moves, or exports a real Google Drive file/);
  assert.match(app, /Approve Recoverable Trash/);
  assert.doesNotMatch(broker, /action\s*===?\s*["'](?:delete|trash|move|export)["']/);
});
