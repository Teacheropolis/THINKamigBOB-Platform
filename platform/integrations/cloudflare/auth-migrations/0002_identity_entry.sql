CREATE TABLE IF NOT EXISTS platform_teacher_identities (
  teacher_id TEXT PRIMARY KEY NOT NULL,
  google_subject_hash TEXT UNIQUE NOT NULL,
  hosted_domain TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_class_entry (
  class_id TEXT PRIMARY KEY NOT NULL,
  class_name TEXT NOT NULL,
  class_code_hash TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_student_entries (
  student_id TEXT PRIMARY KEY NOT NULL,
  class_id TEXT NOT NULL REFERENCES platform_class_entry(class_id),
  display_label TEXT NOT NULL,
  student_code_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE (class_id, student_code_hash)
);

CREATE INDEX IF NOT EXISTS platform_student_entries_class
  ON platform_student_entries (class_id, status);
