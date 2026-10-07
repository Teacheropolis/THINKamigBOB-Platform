CREATE TABLE IF NOT EXISTS evidence_runtime_store (
  storage_key TEXT PRIMARY KEY NOT NULL,
  value_json TEXT NOT NULL,
  expires_at INTEGER,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS evidence_runtime_store_expires_at
  ON evidence_runtime_store (expires_at)
  WHERE expires_at IS NOT NULL;

