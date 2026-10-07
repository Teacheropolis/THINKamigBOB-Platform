import test from "node:test";
import assert from "node:assert/strict";
import { createWhiteboardObject, duplicateWhiteboardObject, hitTestObjects, moveWhiteboardObject, objectBounds, resizeWhiteboardObject } from "../../platform/scripts/whiteboard-objects.mjs";

test("whiteboard objects can be selected, moved, resized, and duplicated", () => {
  const rectangle = createWhiteboardObject("rectangle", { x: 20, y: 30, width: 100, height: 80 });
  assert.equal(hitTestObjects([rectangle], { x: 50, y: 50 }).id, rectangle.id);
  assert.equal(moveWhiteboardObject(rectangle, 10, 15).x, 30);
  assert.equal(resizeWhiteboardObject(rectangle, 160, 120).width, 160);
  const duplicate = duplicateWhiteboardObject(rectangle);
  assert.notEqual(duplicate.id, rectangle.id);
  assert.equal(duplicate.x, rectangle.x + 24);
});

test("freehand paths retain editable bounds", () => {
  const path = createWhiteboardObject("path", { points: [{ x: 10, y: 20 }, { x: 50, y: 70 }] });
  assert.deepEqual(objectBounds(path), { x: 10, y: 20, width: 40, height: 50 });
  assert.equal(moveWhiteboardObject(path, 5, 7).points[0].x, 15);
  assert.equal(resizeWhiteboardObject(path, 80, 100).points[1].x, 90);
});

test("workshop 3D shapes use the shared editable object model", () => {
  for (const type of ["cube", "rectangular-prism", "cylinder", "cone", "pyramid", "sphere"]) {
    const shape = createWhiteboardObject(type, { x: 10, y: 20, width: 120, height: 90 });
    assert.equal(shape.type, type);
    assert.equal(resizeWhiteboardObject(shape, 180, 140).height, 140);
  }
});

test("CAD dimensions remain movable and resizable objects", () => {
  const dimension = createWhiteboardObject("dimension", { x: 20, y: 30, width: 200, height: 0, label: "Width", unit: "cm" });
  assert.equal(dimension.type, "dimension");
  assert.equal(moveWhiteboardObject(dimension, 10, 5).x, 30);
  assert.equal(resizeWhiteboardObject(dimension, 250, 20).width, 250);
  assert.ok(objectBounds({ ...dimension, annotationOffset: 80 }).height >= 80);
  assert.ok(objectBounds(dimension).width >= 240);
});
