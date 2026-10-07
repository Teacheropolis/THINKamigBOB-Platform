import { createDurableEvidenceRepositories } from "../google/evidence-google-durable-repositories.mjs";
import { createD1AtomicStore } from "./evidence-d1-atomic-store.mjs";

export function createD1EvidenceRepositories({ database, namespace, now, random } = {}) {
  const store = createD1AtomicStore({ database, now });
  return createDurableEvidenceRepositories({ store, namespace, now, random });
}

