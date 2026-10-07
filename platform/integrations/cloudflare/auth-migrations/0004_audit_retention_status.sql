CREATE TABLE IF NOT EXISTS platform_maintenance_status (
  task_key TEXT PRIMARY KEY NOT NULL CHECK (task_key IN ('audit-retention')),
  last_success_at INTEGER NOT NULL,
  last_deleted_count INTEGER NOT NULL CHECK (last_deleted_count >= 0 AND last_deleted_count <= 1000),
  last_cutoff INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
