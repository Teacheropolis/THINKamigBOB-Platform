import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../../platform/integrations/cloudflare/auth-migrations/0003_platform_audit.sql", import.meta.url), "utf8");
const maintenanceMigration = readFileSync(new URL("../../platform/integrations/cloudflare/auth-migrations/0004_audit_retention_status.sql", import.meta.url), "utf8");

test("authentication audit schema is append-oriented and privacy minimized", () => {
  assert.match(migration, /CREATE TABLE IF NOT EXISTS platform_audit_events/);
  for (const event of ["TEACHER_SESSION_ISSUED", "STUDENT_SESSION_ISSUED", "SESSION_REVOKED", "CLASSROOM_CREATED"]) assert.match(migration, new RegExp(event));
  for (const forbidden of ["password", "class_code", "student_code", "google_token", "refresh_token", "file_name", "evidence_content"]) assert.doesNotMatch(migration.toLowerCase(), new RegExp(forbidden));
  assert.doesNotMatch(migration, /ON DELETE CASCADE/i);
  assert.match(migration, /platform_audit_events_occurred_at/);
});

test("retention maintenance schema stores no student or audit event content", () => {
  assert.match(maintenanceMigration, /CREATE TABLE IF NOT EXISTS platform_maintenance_status/);
  assert.match(maintenanceMigration, /last_success_at/);
  assert.match(maintenanceMigration, /last_deleted_count/);
  for (const forbidden of ["actor_id", "class_id", "student", "teacher", "token", "filename", "evidence", "event_type"]) assert.doesNotMatch(maintenanceMigration.toLowerCase(), new RegExp(forbidden));
});
