CREATE TABLE IF NOT EXISTS platform_sessions (
  session_hash TEXT PRIMARY KEY NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student')),
  user_id TEXT NOT NULL,
  class_id TEXT,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revoked_at INTEGER,
  CHECK ((role = 'teacher' AND class_id IS NULL) OR (role = 'student' AND class_id IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS platform_sessions_expiration
  ON platform_sessions (expires_at)
  WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS platform_class_teachers (
  teacher_id TEXT NOT NULL,
  class_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (teacher_id, class_id)
);

CREATE INDEX IF NOT EXISTS platform_class_teachers_class
  ON platform_class_teachers (class_id, status);

