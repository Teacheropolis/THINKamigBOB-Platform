CREATE TABLE IF NOT EXISTS platform_audit_events (
  event_id TEXT PRIMARY KEY NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('TEACHER_SESSION_ISSUED', 'STUDENT_SESSION_ISSUED', 'SESSION_REVOKED', 'CLASSROOM_CREATED')),
  actor_role TEXT NOT NULL CHECK (actor_role IN ('teacher', 'student')),
  actor_id TEXT NOT NULL,
  class_id TEXT,
  outcome TEXT NOT NULL CHECK (outcome IN ('success')),
  occurred_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS platform_audit_events_occurred_at
  ON platform_audit_events (occurred_at);

CREATE INDEX IF NOT EXISTS platform_audit_events_actor
  ON platform_audit_events (actor_role, actor_id, occurred_at);

CREATE INDEX IF NOT EXISTS platform_audit_events_class
  ON platform_audit_events (class_id, occurred_at)
  WHERE class_id IS NOT NULL;
