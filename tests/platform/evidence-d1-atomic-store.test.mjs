import test from "node:test";
import assert from "node:assert/strict";
import { createD1AtomicStore } from "../../platform/integrations/cloudflare/evidence-d1-atomic-store.mjs";
import { createD1EvidenceRepositories } from "../../platform/integrations/cloudflare/evidence-d1-repositories.mjs";

function fakeD1() {
  const rows = new Map();
  return {
    rows,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async first() {
              const key = values[0];
              if (sql.startsWith("SELECT")) return rows.get(key) || null;
              if (sql.startsWith("DELETE") && sql.includes("RETURNING")) {
                const row = rows.get(key) || null;
                rows.delete(key);
                return row;
              }
              throw new Error(`unexpected-first:${sql}`);
            },
            async run() {
              if (sql.startsWith("INSERT")) {
                rows.set(values[0], { value_json: values[1], expires_at: values[2], updated_at: values[3] });
                return { success: true, meta: { changes: 1 } };
              }
              if (sql.startsWith("DELETE") && sql.includes("storage_key = ?1")) {
                const changed = rows.delete(values[0]) ? 1 : 0;
                return { success: true, meta: { changes: changed } };
              }
              if (sql.startsWith("DELETE") && sql.includes("SELECT storage_key")) {
                let changed = 0;
                for (const [key, row] of rows) {
                  if (changed >= values[1]) break;
                  if (row.expires_at !== null && row.expires_at <= values[0]) { rows.delete(key); changed += 1; }
                }
                return { success: true, meta: { changes: changed } };
              }
              throw new Error(`unexpected-run:${sql}`);
            },
          };
        },
      };
    },
  };
}

test("D1 store persists values and removes expired records", async () => {
  let clock = 1000;
  const database = fakeD1();
  const store = createD1AtomicStore({ database, now: () => clock });
  await store.put("launch", { activity: "Bridge" }, { expiresAt: 1100 });
  assert.deepEqual(await store.get("launch"), { activity: "Bridge" });
  clock = 1100;
  assert.equal(await store.get("launch"), null);
  assert.equal(database.rows.has("launch"), false);
});

test("D1 take atomically returns and deletes a record", async () => {
  const database = fakeD1();
  const first = createD1AtomicStore({ database, now: () => 1000 });
  const second = createD1AtomicStore({ database, now: () => 1000 });
  await first.put("ticket", { studentId: "student-1" }, { expiresAt: 2000 });
  const results = await Promise.all([first.take("ticket"), second.take("ticket")]);
  assert.equal(results.filter(Boolean).length, 1);
  assert.equal(database.rows.has("ticket"), false);
});

test("D1 store fails closed for malformed records and invalid input", async () => {
  const database = fakeD1();
  const store = createD1AtomicStore({ database, now: () => 1000 });
  database.rows.set("broken", { value_json: "{", expires_at: null });
  await assert.rejects(store.get("broken"), /corrupt-d1-storage-record/);
  await assert.rejects(store.put("", {}), /valid-storage-key-required/);
  await assert.rejects(store.put("large", "x".repeat(128 * 1024 + 1)), /valid-storage-value-required/);
});

test("D1 cleanup is bounded and reports deleted records", async () => {
  const database = fakeD1();
  const store = createD1AtomicStore({ database, now: () => 2000 });
  await store.put("expired-1", 1, { expiresAt: 1000 });
  await store.put("expired-2", 2, { expiresAt: 1000 });
  await store.put("live", 3, { expiresAt: 3000 });
  assert.equal(await store.cleanupExpired({ limit: 1 }), 1);
  assert.equal(database.rows.size, 2);
  await assert.rejects(store.cleanupExpired({ limit: 501 }), /valid-cleanup-limit-required/);
});

test("D1 repository factory gives production repositories the atomic store", async () => {
  const database = fakeD1();
  const repositories = createD1EvidenceRepositories({ database, now: () => 1000, random: (length) => Buffer.alloc(length, 4) });
  const issued = await repositories.ticketStore.issue({ teacherId: "teacher-1", studentId: "student-1", folderId: "folder-1", activity: "Bridge" });
  assert.equal((await repositories.ticketStore.consume(issued.token, "image/png")).ok, true);
  assert.equal((await repositories.ticketStore.consume(issued.token, "image/png")).reason, "invalid-or-used-ticket");
});

