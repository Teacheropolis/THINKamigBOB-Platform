import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createEvidenceGovernanceDraft, EVIDENCE_GOVERNANCE_STATUS } from "../../platform/scripts/evidence-governance.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");

test("governance draft requires every bounded policy choice", () => {
  const draft = createEvidenceGovernanceDraft();
  assert.equal(draft.read().status, EVIDENCE_GOVERNANCE_STATUS.DRAFT_REQUIRED);
  assert.equal(draft.save({}).ok, false);
  const result = draft.save({ retention: "End of school year", deletionAuthority: "Administrator approval required", recovery: "Move to recoverable trash before permanent deletion", exportRule: "Teacher export offered before deletion" });
  assert.equal(result.ok, true);
  assert.equal(draft.read().status, EVIDENCE_GOVERNANCE_STATUS.DRAFT_SAVED);
});

test("teacher governance UI is explicitly non-enforcing and non-destructive", () => {
  assert.match(app, /Evidence Governance Draft/);
  assert.match(app, /does not delete, move, export, or change any Drive file/);
  assert.match(app, /School and legal approval are still required/);
  assert.doesNotMatch(app, /data-action="evidence-(?:delete|purge|trash)/);
});
