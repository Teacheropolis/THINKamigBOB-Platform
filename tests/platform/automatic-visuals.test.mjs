import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { AUTOMATIC_VISUAL_CATALOG, matchAutomaticVisual } from "../../platform/scripts/automatic-visuals.mjs";

test("descriptive words select an existing catalog image", () => {
  assert.match(matchAutomaticVisual({ title: "Design a Space Bedroom" }).src, /sky-banner-rocket\.png$/);
  assert.match(matchAutomaticVisual({ type: "Builder" }).src, /builder-header\.png$/);
  assert.match(matchAutomaticVisual({ type: "Workshop" }).src, /workshop-room-background\.png$/);
});

test("unknown resources use an honest category fallback with generated alt text", () => {
  const result = matchAutomaticVisual({ title: "Uncatalogued idea", type: "Activity" });
  assert.equal(result.matched, false);
  assert.match(result.src, /start mission button\.png$/);
  assert.match(result.alt, /visual support$/);
  assert.ok(AUTOMATIC_VISUAL_CATALOG.every((item) => item.file.startsWith("../assets/images/")));
});

test("student resources and full-screen missions render automatic visual support", async () => {
  const app = await readFile(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
  const css = await readFile(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");
  assert.match(app, /matchAutomaticVisual\(\{ title: active\.title, type: active\.type \}\)/);
  assert.match(app, /class="platform-automatic-resource-visual"/);
  assert.match(app, /class="platform-automatic-mission-visual"/);
  assert.match(css, /\.platform-automatic-resource-visual/);
  assert.match(css, /\.platform-automatic-mission-visual/);
});
