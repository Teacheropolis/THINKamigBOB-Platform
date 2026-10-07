import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createMessageLibrary } from "../../platform/scripts/message-library.mjs";

const memoryStorage = () => { const data = new Map(); return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)) }; };

test("saved messages can be assigned by class and weekday", () => {
  const library = createMessageLibrary({ storage: memoryStorage(), now: () => 42 });
  const saved = library.save({ title: "Monday welcome", text: "Open your notebook", color: "yellow", size: "huge", style: "bold" });
  assert.equal(saved.ok, true);
  library.assign("class-preview-1", "Monday", saved.message.id);
  assert.equal(library.assigned("class-preview-1", "Monday").text, "Open your notebook");
  assert.equal(library.assigned("class-preview-1", "Tuesday"), null);
});

test("teacher UI owns library, weekday assignment, and automatic timer loading", () => {
  const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
  assert.match(app, /Saved Message Library/);
  assert.match(app, /Save Current Message for Later/);
  assert.match(app, /data-message-assignment/);
  assert.match(app, /starts with this class timer on each weekday/);
  assert.match(app, /messageLibrary\.assigned\(classId, occurrence\.weekday\)/);
  assert.match(app, /teacherMemo\.save\(assigned\.text, assigned\)/);
  assert.match(app, /Create and Save a Message/);
  assert.match(app, /Save Message to Shared Library/);
  assert.match(app, /Messages saved here also appear in the Today-page Saved Message Library/);
  assert.match(app, /data-action="save-class-message"/);
  assert.match(app, /data-class-message-title/);
  assert.match(app, /data-class-message-text/);
  assert.match(app, /messageLibrary\.save\(\{/);
});
