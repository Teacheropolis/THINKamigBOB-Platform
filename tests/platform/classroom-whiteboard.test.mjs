import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");

test("Today workspace launches a browser-session classroom whiteboard", () => {
  for (const text of ["Open Whiteboard", "Close Whiteboard", "Pen", "Highlighter", "Eraser", "Line", "Rectangle", "Add Text", "Undo", "Redo", "Clear Board"]) {
    assert.match(app, new RegExp(text));
  }
  assert.match(app, /data-whiteboard-canvas/);
  assert.match(app, /WHITEBOARD_SESSION_KEY/);
  assert.match(app, /sessionStorage\.setItem\(WHITEBOARD_SESSION_KEY/);
  assert.match(app, /pointerdown/);
  assert.match(app, /pointermove/);
  assert.match(css, /\.platform-classroom-whiteboard \{ position: fixed;/);
  assert.match(css, /touch-action: none/);
});

test("whiteboard clear requires confirmation and Escape closes safely", () => {
  assert.match(app, /data-whiteboard-clear-confirmation/);
  assert.match(app, /whiteboard-confirm-clear/);
  assert.match(app, /#platform-classroom-whiteboard:not\(\[hidden\]\)/);
});

test("whiteboard explains student Chromebook and teacher cross-platform commands", () => {
  for (const text of ["Whiteboard keyboard help", "Students:", "student Chromebooks", "Chromebook or Windows", "Command", "Mac", "Backspace", "Close Help"]) assert.match(app, new RegExp(text));
  assert.match(app, /data-action="whiteboard-keyboard-help"/);
  assert.match(app, /data-whiteboard-keyboard-help/);
  assert.match(app, /keyboardHelp\.hidden = true/);
  assert.match(css, /\.platform-whiteboard-keyboard-help/);
  assert.match(css, /\.platform-whiteboard-keyboard-help kbd/);
});

test("whiteboard supports reusable boards, images, export, and presentation", () => {
  for (const text of ["Save Board", "Saved boards", "Load", "Delete", "Export PNG", "Present Board", "Exit Presentation"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_LIBRARY_KEY/);
  assert.match(app, /data-whiteboard-image/);
  assert.match(app, /image\/\*/);
  assert.match(app, /link\.download/);
  assert.match(css, /data-presentation="true"/);
  assert.match(css, /\.platform-whiteboard-library/);
});

test("whiteboard menus collapse and dock around the canvas", () => {
  for (const text of ["Menu position", "Top", "Left side", "Right side", "Bottom", "Hide Board Menus", "Show Board Menus"]) assert.match(app, new RegExp(text));
  assert.match(app, /data-whiteboard-controls/);
  assert.match(app, /applyWhiteboardControlsLayout/);
  assert.match(app, /controlsDock: whiteboardControlsDock/);
  assert.match(css, /data-controls-dock="left"/);
  assert.match(css, /data-controls-dock="right"/);
  assert.match(css, /data-controls-dock="bottom"/);
  assert.match(css, /data-controls-hidden="true"/);
});

test("hidden board menus retain a compact full drawing toolbox", () => {
  for (const tool of ["select", "lasso-select", "eraser", "fill", "pen", "calligraphy", "brush", "highlighter", "line", "arrow", "rectangle", "ellipse", "triangle", "cube", "rectangular-prism", "cylinder", "cone", "pyramid", "sphere", "pull-3d", "emoji-stamp", "laser-dimension"]) {
    assert.match(app, new RegExp(`data-whiteboard-quick-tool="${tool}"`));
  }
  for (const menu of ["Pen", "Line", "Shapes", "3D Shapes"]) assert.match(app, new RegExp(`<small>${menu}</small>`));
  assert.doesNotMatch(app, /data-whiteboard-quick-tool="ruler-adjust"/);
  assert.match(app, /action\.closest\("details"\)\?\.removeAttribute\("open"\)/);
  assert.match(app, /action\.dataset\.action === "whiteboard-quick-tool"/);
  assert.match(app, /button\.dataset\.whiteboardQuickTool === nextTool/);
  assert.match(css, /data-controls-hidden="true"\] \.platform-whiteboard-quick-actions \{ flex-wrap: wrap;/);
  assert.match(css, /button\[aria-pressed="true"\]/);
  assert.match(css, /\.platform-whiteboard-quick-menu > div/);
});

test("saved boards support repeating weekdays or a specific calendar date", () => {
  for (const text of ["No schedule", "Repeats weekly", "Specific date", "Choose the specific date before saving."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /data-whiteboard-schedule-type/);
  assert.match(app, /data-whiteboard-date/);
  assert.match(app, /whiteboardScheduleLabel/);
  assert.match(app, /Every \$\{board\.day\}/);
  assert.match(css, /\.platform-whiteboard-library label\[hidden\] \{ display: none !important; \}/);
  assert.match(app, /whiteboardScheduleType\.value === "weekly"/);
});

test("every whiteboard element remains an editable object", () => {
  for (const text of ["Select and move", "Eraser object", "Arrow", "Circle or oval", "Triangle", "Copy", "Paste", "Duplicate", "Delete selected"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_OBJECT_SESSION_KEY/);
  assert.match(app, /hitTestObjects/);
  assert.match(app, /resizeWhiteboardObject/);
  assert.match(app, /serializableWhiteboardObjects/);
  assert.match(css, /\.platform-whiteboard-object-actions/);
  assert.match(app, /cloneEditableWhiteboardObject\(selected\)/);
  assert.match(app, /Object selected directly\. Drag to move it without changing tools/);
  assert.match(app, /Measurement selected directly\. Drag its red line or label/);
  assert.match(app, /event\.ctrlKey \|\| event\.metaKey/);
  assert.match(app, /\["c", "v", "x", "d"\]\.includes\(shortcutKey\)/);
  assert.match(app, /Press Ctrl\+V or Command\+V/);
  assert.match(app, /textarea, \[contenteditable='true'\], input:not/);
  assert.match(app, /data-whiteboard-context-menu/);
  assert.match(app, /contextmenu/);
  assert.match(app, /copySelectedWhiteboardObjectAsImage/);
  assert.match(app, /new ClipboardItem/);
  for (const text of ["Cut Image", "Paste Image", "Object cut.", "Selected object duplicated."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /pasteWhiteboardClipboard\(whiteboardContextPoint\)/);
  assert.match(app, /shortcutKey === "x"/);
  assert.match(app, /shortcutKey === "d"/);
  assert.match(app, /event\.key === "Backspace" \|\| event\.key === "Delete"/);
  assert.match(app, /Selected object deleted\. Use Undo to restore it/);
  assert.match(app, /deleteSelectedWhiteboardObject/);
  assert.match(app, /data-action="whiteboard-tool-select"/);
  assert.match(app, /canvas\.focus\(\{ preventScroll: true \}\)/);
  assert.match(app, /whiteboardResizeCorner/);
  assert.match(app, /resizeWhiteboardObjectFromCorner/);
  assert.match(css, /\.platform-whiteboard-quick-actions/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.platform-whiteboard-context-menu/);
});

test("whiteboard offers paint fill, calligraphy, and brush tools", () => {
  for (const text of ["Calligraphy pen", "Brush strokes", "Paint can — fill shape", "Shape filled.", "Use the Paint Can on a closed 2D or 3D shape."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /selected\.fillColor/);
  assert.match(app, /strokeStyle: tool/);
  assert.match(app, /drawWhiteboardPath/);
  assert.match(app, /object\.strokeStyle === "calligraphy"/);
  assert.match(app, /drawWhiteboardCalligraphyRibbon/);
  assert.match(app, /\[\.\.\.points\]\.reverse\(\)/);
  assert.match(app, /object\.strokeStyle === "brush"/);
  assert.match(app, /bristleOffsets/);
  assert.match(app, /tool === "brush" \? size \* 3/);
  assert.match(app, /if \(object\.fillColor\)/);
});

test("whiteboard provides a categorized movable emoji stamp tool", () => {
  for (const text of ["Emoji stamp", "Choose an emoji stamp", "Faces and feelings", "STEM and school", "Animals", "Marks and symbols", "emoji stamped"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_EMOJI_STAMPS/);
  assert.match(app, /tool === "emoji-stamp"/);
  assert.match(app, /emojiStamp: true/);
  assert.match(app, /updated\.emojiStamp && whiteboardDrawing\.resize/);
  assert.match(app, /data-whiteboard-emoji-label hidden/);
  assert.match(app, /emojiLabel\.hidden = whiteboardTool\.value !== "emoji-stamp"/);
  assert.match(css, /\.platform-whiteboard-toolbar label\[hidden\]/);
});

test("whiteboard lasso isolates work, removes its background, and downloads PNG", () => {
  for (const text of ["Lasso select for image", "Remove Selection Background", "Download Selection PNG", "Selection ready.", "whiteboard-selection.png", "Use Undo if light details were removed."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /whiteboardPointInPolygon/);
  assert.match(app, /whiteboardSelectionCanvas/);
  assert.match(app, /pixels\.data\[index \+ 3\] = 0/);
  assert.match(app, /backgroundRemoved: true/);
  assert.match(app, /data-whiteboard-lasso-actions hidden/);
  assert.match(app, /lassoActions\.hidden = whiteboardTool\.value !== "lasso-select"/);
  assert.match(css, /\.platform-whiteboard-lasso-actions/);
});

test("scheduled boards can become automatic Student Display visuals", () => {
  for (const text of ["Automatically show this board on the Student Display when its schedule begins", "Choose a weekly schedule or specific date for automatic Student Display use.", "Student Display"]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /scheduledWhiteboardFor/);
  assert.match(app, /board\.studentDisplay === true/);
  assert.match(app, /whiteboardStudentDisplayImage/);
  assert.match(app, /teacherMemo\.save\(memo\.text \|\| board\.title/);
  assert.match(css, /\.platform-whiteboard-display-option/);
});

test("whiteboard supports workshop graph paper and measurement rulers", () => {
  for (const text of ["Graph paper", "Inches", "Centimeters", "Millimeters", "English ruler — inches", "Metric ruler — centimeters"]) assert.match(app, new RegExp(text));
  assert.match(app, /drawWhiteboardGrid/);
  assert.match(app, /drawWhiteboardRuler/);
  assert.match(app, /WHITEBOARD_VIEW_SESSION_KEY/);
  assert.match(app, /gridUnit: whiteboardGridUnit/);
  assert.match(app, /rulerUnit: whiteboardRulerUnit/);
});

test("measurement view can zoom and the ruler can move, rotate, extend, and change sides", () => {
  for (const text of ["Move, rotate, or extend ruler", "Both sides", "One side", "Zoom set to"]) assert.match(app, new RegExp(text));
  assert.match(app, /data-whiteboard-zoom/);
  assert.match(app, /whiteboardZoom = Math\.min\(300/);
  assert.match(app, /whiteboardRulerLocalPoint/);
  assert.match(app, /mode: nearRotate \? "rotate" : nearExtend \? "extend" : "move"/);
  assert.match(app, /whiteboardRuler\.angle = Math\.atan2/);
  assert.match(app, /whiteboardRuler\.length = Math\.max/);
  assert.match(app, /Ruler selected directly\. Drag to place it where you want/);
  assert.match(css, /\.platform-whiteboard-surface \{ grid-area: surface; min-height: 0; overflow: auto;/);
});

test("images and text rotate while text supports solid and highlighter backgrounds", () => {
  for (const text of ["Rotate left", "Rotate right", "Text background", "Transparent", "White", "Black", "Yellow highlighter", "Green highlighter", "Pink highlighter", "Blue highlighter", "Apply Text Background"]) assert.match(app, new RegExp(text));
  assert.match(app, /selected\.rotation =/);
  assert.match(app, /context\.rotate\(object\.rotation \?\? 0\)/);
  assert.match(app, /whiteboardTextBackground/);
  assert.match(app, /selected\.background =/);
  assert.match(app, /rgba\(255, 226, 88, 0\.62\)/);
});

test("whiteboard includes editable three-dimensional workshop shapes", () => {
  for (const text of ["3D shapes", "Cube", "Rectangular prism", "Cylinder", "Cone", "Pyramid", "Sphere"]) assert.match(app, new RegExp(text));
  assert.match(app, /drawWhiteboard3DShape/);
  assert.match(app, /object\.type === "cylinder"/);
  assert.match(app, /object\.type === "sphere"/);
  assert.match(app, /closed 2D or 3D shape/);
});

test("CAD laser selects two points, asks concise questions, and creates dimensions", () => {
  for (const text of ["Laser measure — select 2 points", "Label this CAD measurement", "What are you measuring?", "Add my own answer", "Measurement unit", "Add CAD Dimension", "Laser point 1 selected.", "Two points selected."]) assert.match(app, new RegExp(text.replace(/[?]/g, "\\?")));
  assert.match(app, /createWhiteboardObject\("dimension"/);
  assert.match(app, /whiteboardDimensionValue/);
  assert.match(app, /drawWhiteboardDimension/);
  assert.match(app, /drawWhiteboardLaserPreview/);
  assert.match(app, /createRadialGradient/);
  assert.match(app, /Move the glowing laser to the second point/);
  assert.match(app, /suggestedWhiteboardDimensionLabel/);
  assert.match(app, /Try again\. Tip:/);
  assert.match(app, /The most logical answer is/);
  assert.match(css, /\.platform-whiteboard-measurement-tip/);
  assert.match(app, /whiteboardRulerUnit = unit === "in" \? "english" : "metric"/);
  assert.match(app, /dimensionLabel\.value !== "custom"/);
  assert.match(css, /\.platform-whiteboard-question/);
});

test("measurement graph paper automatically includes a CAD title bar", () => {
  assert.match(app, /drawWhiteboardTitleBar/);
  assert.match(app, /if \(whiteboardGridUnit === "plain"\) return/);
  for (const text of ["English · inches", "Metric · centimeters", "Metric · millimeters", "Workshop Drawing", "Major: 1 in · Minor: 1\/4 in", "Major: 1 cm · Minor: 1 mm"]) assert.match(app, new RegExp(text));
  assert.match(app, /whiteboardDrawingTitle = whiteboardTitle\.value\.trim\(\)/);
  assert.match(app, /drawWhiteboardTitleBar\(context, canvas\)/);
});

test("geometric shapes rotate and 2D shapes can be pulled into 3D", () => {
  for (const text of ["Pull selected 2D shape into 3D", "Push Back to 2D", "Choose Pull into 3D, then drag a rectangle, oval, or triangle.", "Rectangular Prism", "Cylinder", "Pyramid", "The shape was pushed back to its original 2D form.", "Rotation is available for images, text, lines, arrows, and 2D or 3D shapes."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /typeMap = \{ rectangle: "rectangular-prism", ellipse: "cylinder", triangle: "pyramid" \}/);
  assert.match(app, /original2DType: whiteboardDrawing\.original\.type/);
  assert.match(app, /shapeLabel: true/);
  assert.match(app, /data-whiteboard-push-help/);
  assert.match(css, /\.platform-whiteboard-push-help/);
  assert.match(css, /\.platform-whiteboard-push-help::before/);
  assert.match(app, /depth: Math\.max\(10, Math\.min\(120/);
  assert.match(app, /object\.rotation && !\["text", "image", "path", "dimension"\]/);
  assert.match(app, /object\.depth \?\?/);
});

test("CAD dimensions show an interactive comparison in another unit", () => {
  for (const text of ["“This is the same as…” unit", "Millimeters", "Centimeters", "Meters", "Inches", "Feet", "Yards", "This is the same as"]) assert.match(app, new RegExp(text));
  assert.match(app, /compareUnit: unit === "mm" \? "cm"/);
  assert.match(app, /whiteboardDimensionValue\(object, compareUnit\)/);
  assert.match(app, /selected\.compareUnit = dimensionCompare\.value/);
  assert.match(app, /syncWhiteboardDimensionCompareControl/);
  assert.match(app, /annotationOffset/);
  assert.match(app, /Drag the red measurement to the object perimeter/);
  for (const text of ["Bob asks:", "Do you want to compare this measurement to other measurements in the real world?", "Compare measurements with Bob", "The comparison beneath the measurement updates automatically."]) assert.match(app, new RegExp(text.replace(/[?]/g, "\\?")));
  assert.match(app, /WHITEBOARD_BOB_MEASUREMENT_COACH_KEY/);
  assert.match(app, /showWhiteboardBobMeasurementCoach/);
  assert.match(css, /\.platform-whiteboard-bob-coach\[data-state="collapsed"\]/);
  assert.match(app, /data-whiteboard-compare-unit/);
  assert.match(app, /compareUnit\.dataset\.bobHighlight/);
  assert.match(css, /\.platform-whiteboard-compare-unit\[data-bob-highlight="true"\]::after/);
  assert.match(css, /@keyframes platform-compare-arrow-pulse/);
});
