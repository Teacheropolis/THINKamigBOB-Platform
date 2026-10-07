const DEFAULT_TABLE = "evidence_runtime_store";
const MAX_KEY_LENGTH = 512;
const MAX_VALUE_LENGTH = 128 * 1024;

function requireDatabase(database) {
  if (typeof database?.prepare !== "function") throw new Error("d1-database-binding-required");
  return database;
}

function requireTableName(tableName) {
  const value = String(tableName || "");
  if (!/^[a-z][a-z0-9_]{0,62}$/.test(value)) throw new Error("invalid-d1-table-name");
  return value;
}

function requireKey(key) {
  const value = String(key || "");
  if (!value || value.length > MAX_KEY_LENGTH) throw new Error("valid-storage-key-required");
  return value;
}

function serialize(value) {
  const encoded = JSON.stringify(value);
  if (encoded === undefined || encoded.length > MAX_VALUE_LENGTH) throw new Error("valid-storage-value-required");
  return encoded;
}

function deserialize(row) {
  if (!row || typeof row.value_json !== "string") return null;
  try {
    return JSON.parse(row.value_json);
  } catch {
    throw new Error("corrupt-d1-storage-record");
  }
}

function expiration(options = {}) {
  const value = options.expiresAt;
  if (value === undefined || value === null) return null;
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error("valid-expiration-required");
  return value;
}

export function createD1AtomicStore({ database, tableName = DEFAULT_TABLE, now = () => Date.now() } = {}) {
  const db = requireDatabase(database);
  const table = requireTableName(tableName);

  async function remove(key) {
    await db.prepare(`DELETE FROM ${table} WHERE storage_key = ?1`).bind(requireKey(key)).run();
  }

  return Object.freeze({
    async get(key) {
      const storageKey = requireKey(key);
      const row = await db.prepare(`SELECT value_json, expires_at FROM ${table} WHERE storage_key = ?1 LIMIT 1`).bind(storageKey).first();
      if (!row) return null;
      if (row.expires_at !== null && Number(row.expires_at) <= now()) {
        await remove(storageKey);
        return null;
      }
      return deserialize(row);
    },

    async put(key, value, options = {}) {
      const updatedAt = now();
      await db.prepare(`INSERT INTO ${table} (storage_key, value_json, expires_at, updated_at)
        VALUES (?1, ?2, ?3, ?4)
        ON CONFLICT(storage_key) DO UPDATE SET
          value_json = excluded.value_json,
          expires_at = excluded.expires_at,
          updated_at = excluded.updated_at`)
        .bind(requireKey(key), serialize(value), expiration(options), updatedAt)
        .run();
    },

    delete: remove,

    async take(key) {
      const row = await db.prepare(`DELETE FROM ${table} WHERE storage_key = ?1 RETURNING value_json, expires_at`).bind(requireKey(key)).first();
      if (!row || (row.expires_at !== null && Number(row.expires_at) <= now())) return null;
      return deserialize(row);
    },

    async cleanupExpired({ limit = 100 } = {}) {
      if (!Number.isSafeInteger(limit) || limit < 1 || limit > 500) throw new Error("valid-cleanup-limit-required");
      const result = await db.prepare(`DELETE FROM ${table} WHERE storage_key IN (
        SELECT storage_key FROM ${table} WHERE expires_at IS NOT NULL AND expires_at <= ?1 LIMIT ?2
      )`).bind(now(), limit).run();
      return Number(result?.meta?.changes || 0);
    },
  });
}

