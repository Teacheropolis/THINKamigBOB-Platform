import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { customLetters as cursiveStrokeLetters } from "../../platform/scripts/cursive-strokes.mjs";

const app = readFileSync(new URL("../../platform/scripts/platform-app.mjs", import.meta.url), "utf8");
const css = readFileSync(new URL("../../platform/styles/platform.css", import.meta.url), "utf8");
const objects = readFileSync(new URL("../../platform/scripts/whiteboard-objects.mjs", import.meta.url), "utf8");

test("cursive coach covers every lowercase letter with ordered visible strokes", () => {
  assert.deepEqual(Object.keys(cursiveStrokeLetters), [..."abcdefghijklmnopqrstuvwxyz"]);
  for (const letter of "abcdefghijklmnopqrstuvwxyz") assert.ok(cursiveStrokeLetters[letter].paths.length >= 1, `${letter} needs a visible stroke`);
  for (const letter of "fgjpqy") assert.match(cursiveStrokeLetters[letter].paths.map(({ d }) => d).join(" "), /(?: 1[5-9](?:\.| )| 2[0-9](?:\.| ))/, `${letter} needs a descender below the baseline`);
  assert.ok(cursiveStrokeLetters.i.paths.some(({ dot }) => dot), "i needs a separate dot stroke");
  assert.ok(cursiveStrokeLetters.j.paths.some(({ dot }) => dot), "j needs a separate dot stroke");
});

test("Today workspace launches a browser-session classroom whiteboard", () => {
  for (const text of ["Open Whiteboard", "Close Whiteboard", "Pen", "Highlighter", "Eraser", "Line", "Rectangle", "Text", "Undo", "Redo", "Clear Board"]) {
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
  for (const text of ["Save Board", "Saved boards", "Load", "Delete", "Export PNG", "Present Board", "Show on Student Display", "Exit Presentation"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_LIBRARY_KEY/);
  assert.match(app, /data-whiteboard-image/);
  assert.match(app, /image\/\*/);
  assert.match(app, /link\.download/);
  assert.match(css, /data-presentation="true"/);
  assert.match(app, /action\.dataset\.action === "whiteboard-show-students"/);
  assert.match(app, /studentDisplayMode\.select\(STUDENT_DISPLAY_MODES\.MESSAGE, \{ hasMemo: true \}\)/);
  assert.match(app, /openClassroomPresentationWindow\(\)/);
  assert.match(css, /\.platform-whiteboard-library/);
  assert.match(css, /\.platform-whiteboard-library \.platform-whiteboard-library-primary \{ grid-column: span 4; \}/);
  assert.match(css, /\.platform-whiteboard-library \.platform-whiteboard-display-option \{[^}]*grid-column: span 4;/);
});

test("whiteboard accepts copied images from the system clipboard", () => {
  for (const text of ["Paste copied image", "Copied image pasted onto the board", "Ctrl+V", "Command+V"]) assert.match(app, new RegExp(text.replace(/[+]/g, "\\+")));
  assert.match(app, /navigator\.clipboard\?\.read/);
  assert.match(app, /document\.addEventListener\("paste"/);
  assert.match(app, /event\.clipboardData\?\.items/);
  assert.match(app, /item\.type\.startsWith\("image\/"\)/);
  assert.match(app, /addClipboardImageToWhiteboard\(blob\)/);
  assert.match(app, /readAsDataURL\(blob\)/);
});

test("whiteboard supports named, saved, and presentable pages", () => {
  for (const text of ["+ Add Page", "Duplicate", "Rename", "Delete Page", "Previous page", "Next page"]) assert.match(app, new RegExp(text.replace(/[+]/g, "\\+")));
  assert.match(app, /WHITEBOARD_PAGES_SESSION_KEY/);
  assert.match(app, /function openWhiteboardPage/);
  assert.match(app, /pages: structuredClone\(whiteboardPages\)/);
  assert.match(app, /data-whiteboard-page-tabs/);
  assert.match(app, /data-whiteboard-page-dock/);
  assert.match(app, /platform-whiteboard-page-dock-control/);
  assert.match(app, /Page thumbnails/);
  assert.match(app, /panelWidth = Math\.min\(menu\.matches\("\[data-whiteboard-more-menu\]"\) \? 448 : 240/);
  assert.match(app, /page\.thumbnail = preview\.toDataURL/);
  assert.match(app, /data-whiteboard-page-name/);
  assert.match(app, /whiteboard-page-rename-save/);
  assert.doesNotMatch(app, /window\.prompt\("Page name"/);
  assert.match(css, /\.platform-whiteboard-pages/);
  assert.match(css, /grid-area: pages/);
  assert.match(css, /data-page-dock="right"/);
  assert.match(css, /data-page-dock="hidden"/);
  assert.match(css, /\.platform-whiteboard-page-dock-control \{ position: fixed;[^}]*bottom: 0\.25rem; left: 0\.75rem;/);
  assert.match(css, /\.platform-whiteboard-status \{[^}]*text-align: center;/);
  assert.match(css, /overflow-x: hidden; overflow-y: auto;/);
  assert.match(css, /\.platform-whiteboard-page-rename\[hidden\]/);
  assert.match(css, /button\[aria-current="page"\]/);
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
  assert.match(css, /data-controls-dock="right"\] \.platform-whiteboard-library \{ display: grid; grid-template-columns: minmax\(0, 1fr\); grid-auto-rows: max-content;/);
  assert.match(css, /data-controls-dock="right"\] \.platform-whiteboard-controls \{[^}]*align-content: start;/);
});

test("hidden board menus retain a compact full drawing toolbox", () => {
  for (const tool of ["select", "lasso-select", "eraser", "fill", "pen", "calligraphy", "brush", "highlighter", "line", "arrow", "rectangle", "ellipse", "triangle", "cube", "rectangular-prism", "cylinder", "cone", "pyramid", "sphere", "pull-3d", "laser-dimension"]) {
    assert.match(app, new RegExp(`data-whiteboard-quick-tool="${tool}"`));
  }
  for (const menu of ["Select", "Erase", "Color", "Paint Can", "Pen", "Line", "Shapes", "3D Shapes", "Text", "Emoji", "Measure", "History", "Clipboard", "More"]) assert.match(app, new RegExp(`<small>${menu}</small>`));
  assert.doesNotMatch(app, /<select data-whiteboard-tool>/);
  assert.match(app, /<select data-whiteboard-tool hidden/);
  assert.match(app, /data-whiteboard-quick-tool="ruler-adjust">Adjust Ruler/);
  assert.doesNotMatch(app, /action\.closest\("details"\)\?\.removeAttribute\("open"\)/);
  assert.match(app, /menu\.addEventListener\("mouseleave", scheduleClose\)/);
  assert.match(app, /menu\.matches\(":hover, :focus-within"\)/);
  assert.match(app, /menu\.addEventListener\("mouseenter", \(\) => \{ cancelClose\(\); menu\.open = true; \}\)/);
  assert.match(app, /action\.dataset\.action === "whiteboard-quick-tool"/);
  assert.match(app, /data-whiteboard-primary-tool="text"/);
  assert.match(app, /data-action="whiteboard-activate-text"/);
  assert.doesNotMatch(app, />Place a text box<\/button>/);
  assert.match(app, /openWhiteboardTextEntry\(point, canvas\)/);
  assert.match(app, /data-whiteboard-text-entry/);
  assert.match(app, /Type directly on the board\. Press Enter or click elsewhere to finish; Escape cancels\./);
  assert.match(app, /entry\.addEventListener\("blur", \(event\) =>/);
  assert.match(app, /event\.key === "Enter" && !event\.shiftKey/);
  assert.match(app, /Text added at the selected spot\. Drag it to reposition it\./);
  assert.doesNotMatch(app, /directTools && tool !== "select" && selected/);
  assert.match(app, /button\.dataset\.whiteboardQuickTool === nextTool/);
  assert.match(css, /data-controls-hidden="true"\] \.platform-whiteboard-quick-actions \{ flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden;/);
  assert.match(css, /\.platform-whiteboard-quick-actions \{ position: relative;[^}]*z-index: 40;[^}]*flex-wrap: nowrap;[^}]*overflow-x: auto;/);
  assert.match(css, /button\[aria-pressed="true"\]/);
  assert.match(css, /\.platform-whiteboard-quick-menu > div/);
  assert.match(css, /\.platform-whiteboard-text-entry/);
  assert.match(app, /openWhiteboardRichTextEditor/);
  for (const command of ["bold", "italic", "underline"]) assert.match(app, new RegExp(`data-rich-command="${command}"`));
  assert.match(app, /data-rich-color/);
  assert.match(app, /data-rich-size/);
  assert.match(app, /data-rich-font/);
  for (const font of ["Arial", "Verdana", "Courier New", "Comic Sans MS", "School Cursive"]) assert.match(app, new RegExp(font));
  assert.doesNotMatch(app, /data-text-font="Georgia"|data-text-font="Trebuchet MS"/);
  assert.match(app, /whiteboardRichTextRuns/);
  assert.match(css, /\.platform-whiteboard-rich-editor/);
  assert.match(app, /measurePanel\?\.append\(\.\.\.measurementControls\)/);
  assert.match(app, /selectPanel\?\.append\(\.\.\.selectControls\)/);
  assert.match(app, /penPanel\?\.append\(\.\.\.penControls\)/);
  assert.match(app, /textPanel\?\.append\(\.\.\.textControls\)/);
  assert.match(app, /emojiPanel\?\.append\(\.\.\.emojiControls\)/);
  assert.match(app, /morePanel\?\.append\(\.\.\.drawingToolbar\.children\)/);
  assert.match(app, /drawingToolbar\.remove\(\)/);
  assert.match(css, /\.platform-whiteboard-tool-divider/);
  assert.match(css, /\.platform-whiteboard-more-panel/);
  assert.match(app, /--quick-menu-left/);
  assert.match(app, /--quick-menu-top/);
  assert.match(app, /bounds\.bottom - 1/);
  assert.match(css, /\.platform-whiteboard-quick-actions \{[^}]*height: 4\.15rem;[^}]*max-height: 4\.15rem;/);
  assert.match(css, /\.platform-whiteboard-quick-actions button \{[^}]*height: 3\.35rem;[^}]*max-height: 3\.35rem;/);
  assert.match(css, /\.platform-whiteboard-quick-menu\[open\] \{ z-index: 45; \}/);
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
  for (const text of ["Select and move", "Eraser", "Arrow", "Circle or oval", "Triangle", "Copy", "Paste", "Duplicate"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_OBJECT_SESSION_KEY/);
  assert.match(app, /hitTestObjects/);
  assert.match(app, /resizeWhiteboardObject/);
  assert.match(app, /serializableWhiteboardObjects/);
  assert.match(css, /\.platform-whiteboard-object-actions/);
  assert.match(app, /cloneEditableWhiteboardObject\(selected\)/);
  assert.match(app, /if \(tool === "select"\) \{ whiteboardSelectedObjectId = selected\?\.id/);
  assert.match(app, /event\.ctrlKey \|\| event\.metaKey/);
  assert.match(app, /\["c", "x", "d"\]\.includes\(shortcutKey\)/);
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

test("drawing and line tools can start over existing objects without moving them", () => {
  assert.doesNotMatch(app, /directTools && tool !== "select" && selected/);
  assert.match(app, /if \(tool === "select"\) \{ whiteboardSelectedObjectId = selected\?\.id/);
  assert.match(app, /const object = isDrawingStroke \? createWhiteboardObject/);
  assert.match(app, /completedTool === "line" && bisectWhiteboardShapeWithLine/);
});

test("whiteboard offers paint fill, calligraphy, and brush tools", () => {
  for (const text of ["Calligraphy pen", "Brush strokes", "Fill a closed shape with the selected color", "Shape filled.", "Use the Paint Can on a closed 2D or 3D shape."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /selected\.fillColor/);
  assert.match(app, /strokeStyle: tool/);
  assert.match(app, /drawWhiteboardPath/);
  assert.match(app, /object\.strokeStyle === "calligraphy"/);
  assert.match(app, /drawWhiteboardCalligraphyRibbon/);
  assert.match(app, /\[\.\.\.points\]\.reverse\(\)/);
  assert.match(app, /object\.strokeStyle === "brush"/);
  assert.match(app, /bristleOffsets/);
  assert.match(app, /tool === "brush" \? size \* 3/);
  assert.match(app, /if \(object\.fillColor && !object\.extruded3D\)/);
  assert.match(app, /data-whiteboard-line-size/);
  assert.match(app, /size\.dispatchEvent\(new Event\("input", \{ bubbles: true \}\)\)/);
});

test("eraser removes only its stroke area with its own adjustable thickness", () => {
  assert.match(app, />Eraser<\/button>/);
  assert.match(app, /data-whiteboard-eraser-size min="12" max="140" value="40"/);
  assert.match(app, /data-whiteboard-eraser-size-output/);
  assert.match(app, /strokeStyle: "eraser"/);
  assert.match(app, /object\.strokeStyle === "eraser"/);
  assert.match(app, /globalCompositeOperation = "destination-out"/);
  assert.match(app, /filter\(\(object\) => object\.strokeStyle !== "eraser"\)/);
  assert.match(app, /context\.lineWidth = object\.size \?\? 40/);
  assert.match(app, /Eraser stroke saved\. Use Undo to restore the erased area\./);
  assert.doesNotMatch(app, />Delete selected(?: object)?<\/button>/);
});

test("top toolbar starts with select erase color and paint can", () => {
  const selectIndex = app.indexOf("<small>Select</small>");
  const removeBackgroundIndex = app.indexOf("<small>Remove<br>Background</small>");
  const historyIndex = app.indexOf("<small>History</small>");
  const clipboardIndex = app.indexOf("<small>Clipboard</small>");
  const eraseIndex = app.indexOf("<small>Erase</small>");
  const colorIndex = app.indexOf("<small>Color</small>");
  const paintIndex = app.indexOf("<small>Paint Can</small>");
  assert.ok(selectIndex < removeBackgroundIndex && removeBackgroundIndex < historyIndex && historyIndex < clipboardIndex && clipboardIndex < eraseIndex && eraseIndex < colorIndex && colorIndex < paintIndex);
  assert.match(app, /class="platform-whiteboard-remove-background-button" data-action="whiteboard-remove-selection-background"/);
  assert.match(css, /\.platform-whiteboard-remove-background-button/);
  assert.match(app, /data-whiteboard-color-panel/);
  assert.match(app, /querySelector\("\[data-whiteboard-color-panel\]"\)\?\.append\(\.\.\.colorControls\)/);
  assert.match(app, /data-whiteboard-quick-tool="fill" title="Fill a closed shape with the selected color"/);
  assert.match(app, /data-whiteboard-primary-tool="select"/);
  assert.match(app, /menu\.querySelector\("summary"\)\?\.addEventListener\("click"/);
  assert.match(app, /const primaryTool = menu\.dataset\.whiteboardPrimaryTool/);
  assert.match(app, /primaryTool === "select" \? "Select and move is active\." : primaryTool === "text" \? "Text is active\. Click anywhere on the whiteboard to start typing\." : "Pen is active\./);
});

test("text tools provide fonts, formatting shortcuts, color, and corner scaling", () => {
  assert.match(app, /<select data-whiteboard-tool hidden/);
  assert.doesNotMatch(app, /<input type="hidden" data-whiteboard-tool/);
  assert.match(app, /requestAnimationFrame\(\(\) => \{ if \(entry\.isConnected\) entry\.focus\(\{ preventScroll: true \}\); \}\)/);
  assert.match(app, /if \(entry\.value\.trim\(\)\) \{ commit\(\); return; \}/);
  assert.match(app, /event\.relatedTarget\?\.closest\?\.\("\.platform-whiteboard-quick-actions"\)/);
  assert.match(app, /data-whiteboard-text-font/);
  assert.match(app, /data-whiteboard-text-color/);
  assert.match(app, /platform-whiteboard-font-examples/);
  assert.match(app, /data-action="whiteboard-choose-text-font"/);
  assert.match(app, /Aa Bb Cc/);
  assert.match(css, /\.platform-whiteboard-font-examples/);
  assert.match(css, /@font-face \{ font-family: "School Cursive"; src: url\("\.\.\/assets\/fonts\/PlaywriteUSTrad\.ttf"\)/);
  for (const command of ["bold", "italic", "underline"]) assert.match(app, new RegExp(`data-text-command="${command}"`));
  assert.match(app, /function formatSelectedWhiteboardText\(command\)/);
  assert.match(app, /\["b", "i", "u"\]\.includes\(shortcutKey\)/);
  assert.match(app, /\{ b: "bold", i: "italic", u: "underline" \}\[shortcutKey\]/);
  assert.match(app, /object\.type === "text" && !object\.emojiStamp/);
  assert.match(app, /resized\.textScale = Math\.max/);
  assert.match(app, /run\.size \* textScale/);
  assert.match(app, /function activateWhiteboardTextTool\(message/);
  assert.match(app, /action\.dataset\.action === "whiteboard-activate-text"/);
  assert.match(app, /activateWhiteboardTextTool\(\); return/);
  assert.match(app, /if \(event\.target\.closest\("\[data-whiteboard-text-font\]"\)\)/);
  assert.match(app, /if \(event\.target\.closest\("\[data-whiteboard-text-color\]"\)\)/);
  assert.match(app, /getAttribute\("aria-pressed"\) !== "true"/);
  assert.match(app, /data-whiteboard-cursive-lines/);
  for (const label of ["No lines", "Wide ruled", "Handwriting practice — 3 lines"]) assert.match(app, new RegExp(label));
  assert.match(app, /function drawWhiteboardCursiveGuides\(context, object\)/);
  assert.match(app, /object\.fontFamily !== "School Cursive"/);
  assert.match(app, /object\.cursiveGuide === "wide"/);
  assert.match(app, /context\.setLineDash\(\[7, 5\]\)/);
  assert.match(app, /drawWhiteboardCursiveGuides\(context, object\)/);
  assert.match(app, /function refreshPendingWhiteboardTextEntryStyle\(\)/);
  assert.match(app, /entry\.dataset\.cursiveGuide = guide/);
  assert.match(app, /entry\.style\.fontFamily/);
  assert.match(app, /entry\.addEventListener\("input", \(\) => \{ refreshPendingWhiteboardTextEntryStyle\(\); updateWhiteboardCursiveCoach\(\); scheduleReturnReminder\(\); \}\)/);
  assert.match(app, /const baseline = object\.height \/ 2 - Math\.max/);
  assert.match(css, /platform-whiteboard-text-entry\[data-cursive-guide="practice"\]/);
  assert.match(app, /size \* 1\.55 \* scaleY/);
  assert.match(css, /background-position: left 0\.08em, left 0\.55em, left 1\.02em/);
  assert.match(app, /data-whiteboard-cursive-coach/);
  assert.match(app, /Model strokes after typing/);
  assert.match(app, /function updateWhiteboardCursiveCoach\(\)/);
  assert.match(app, /platform-whiteboard-pencil-grip-photo/);
  assert.match(app, /proper-pencil-grip\.jpg/);
  assert.match(app, /5800/);
  assert.match(css, /platform-whiteboard-pencil-grip-photo/);
  assert.match(css, /object-position: 28% center/);
  assert.match(app, /CURSIVE_STROKE_LETTERS/);
  assert.match(app, /function showWhiteboardCursiveModel/);
  assert.match(app, /platform-whiteboard-cursive-model/);
  assert.doesNotMatch(app, /platform-whiteboard-cursive-connector/);
  assert.match(app, /const modeledLetters = \[\.\.\.text\]\.reduce/);
  assert.match(app, /connectsFromPrevious: sourceIndex > 0/);
  assert.match(app, /connectsToNext: sourceIndex < sourceCharacters\.length - 1/);
  assert.match(app, /platform-whiteboard-cursive-entry/);
  assert.match(app, /platform-whiteboard-cursive-incoming/);
  assert.match(app, /const entryStartX = entryEndX - 6/);
  assert.match(app, /if \(!isUppercase\) currentLetter\.insertAdjacentHTML\("afterbegin"/);
  assert.doesNotMatch(app, /platform-whiteboard-cursive-exit/);
  assert.match(app, /getPointAtLength\(0\)/);
  assert.match(app, /getPointAtLength\(lastDrawnPath\.getTotalLength\(\)\)/);
  assert.match(app, /currentLetter\.dataset\.cursiveExitX/);
  assert.match(app, /currentLetter\.dataset\.cursiveExitY/);
  assert.match(app, /How to begin at the baseline and form/);
  assert.match(app, /platform-whiteboard-cursive-guides/);
  assert.match(app, /y1="-4" y2="-4"/);
  assert.match(app, /y1="8" y2="8"/);
  assert.match(app, /y1="17" y2="17"/);
  assert.match(app, /previousLetter\.getBBox\(\)/);
  assert.match(app, /12 \+ entryStartX - previousEndpointX/);
  assert.match(app, /transform="translate\(12 8\)"/);
  assert.match(app, /const penSpeedMillisecondsPerUnit = 45/);
  assert.match(app, /const pauseAfterLetter = 800/);
  assert.match(app, /stroke\.getTotalLength\(\) \* penSpeedMillisecondsPerUnit/);
  assert.match(app, /elapsedDrawingTime \+ pauseAfterLetter/);
  assert.match(app, /previousLetter\.classList\.add\("is-fading"\)/);
  assert.match(app, /const playLetter = \(index\) =>/);
  assert.match(app, /Letter \$\{index \+ 1\} of \$\{modeledLetters\.length\}/);
  assert.match(app, /modelSvg\.insertAdjacentHTML\("beforeend"/);
  assert.match(app, /platform-whiteboard-cursive-capital/);
  assert.match(app, /\^\[A-Z\]\$/);
  assert.match(app, /coach\.style\.left = "8px"/);
  assert.match(app, /coach\.style\.top = "8px"/);
  assert.match(app, /Would you like to replay it once more/);
  assert.match(app, /function openPencilGripTutorial/);
  assert.match(app, /Open the pencil grip tutorial/);
  assert.match(app, /How to hold a pencil for cursive writing/);
  assert.match(app, /pathLength="1"/);
  assert.match(css, /animation: platform-cursive-pen-stroke var\(--stroke-duration, 900ms\) linear var\(--stroke-delay, 0ms\)/);
  assert.match(css, /platform-cursive-letter-fade/);
  assert.match(css, /platform-whiteboard-cursive-guides line\.is-midline/);
  assert.match(css, /stroke-dashoffset: 1; opacity: 0; animation: platform-cursive-pen-stroke/);
  assert.match(css, /from \{ opacity: 1; stroke-dashoffset: 1; \} to \{ opacity: 1; stroke-dashoffset: 0; \}/);
  assert.match(app, /10000/);
  assert.match(app, /Press Return to complete this line of text/);
  assert.match(app, /scheduleReturnReminder/);
  assert.match(css, /platform-whiteboard-return-reminder/);
  assert.match(css, /platform-whiteboard-cursive-dot/);
  assert.match(css, /overflow: visible/);
  assert.match(css, /@keyframes platform-cursive-stroke-reveal/);
  assert.match(css, /@keyframes platform-cursive-pen-stroke/);
  assert.match(app, /selected\.cursiveGuide = cursiveLines\.value/);
  assert.match(app, /function cancelPendingWhiteboardTextEntry\(\)/);
  assert.match(app, /data-whiteboard-primary-tool="pen"/);
  assert.match(app, /if \(nextTool !== "text"\) cancelPendingWhiteboardTextEntry\(\)/);
  assert.match(app, /action\.dataset\.action === "whiteboard-tool-select"\) \{ cancelPendingWhiteboardTextEntry\(\)/);
});

test("students can practice typed cursive by touch in a full-screen lined workspace", () => {
  for (const text of ["Let the student write this word by touch after typing", "Touch Writing Practice", "Wide ruled", "Handwriting practice — 3 lines", "No lines", "Your cursive model", "Show the modeled writing while I write", "Try without help", "Choose writing help to unlock", "Previous space", "Next space", "I'm done writing", "Your writing", "Bob's suggestion", "Rewatch model writing", "Trace the typed writing"]) assert.match(app, new RegExp(text.replace(/[?]/g, "\\?")));
  assert.match(app, /function openCursiveTouchPractice\(text\)/);
  assert.match(app, /data-cursive-touch-practice/);
  assert.match(app, /canvas\.addEventListener\("pointerdown"/);
  assert.match(app, /canvas\.addEventListener\("pointermove"/);
  assert.match(app, /canvas\.width \+= 800/);
  assert.match(app, /--touch-canvas-width/);
  assert.match(app, /if \(!helpChoice\) return/);
  assert.match(app, /showWhiteboardCursiveModel\(value, object, canvas, \(\) => openCursiveTouchPractice\(value\)\)/);
  assert.match(app, /const difficultToRead = totalInk/);
  assert.match(app, /difficultToRead \?/);
  assert.match(app, /object\.fontFamily === "School Cursive" && document\.querySelector\("\[data-whiteboard-touch-practice\]"\)\?\.checked/);
  assert.match(css, /\.platform-cursive-touch-practice \{ position: fixed; z-index: 500; inset: 0/);
  assert.match(css, /\.platform-cursive-touch-pages canvas/);
});

test("whiteboard embeds movable and resizable YouTube videos", () => {
  for (const text of ["Find a video on YouTube", "Paste Copied Link", "YouTube video link", "Add Video", "YouTube Video", "Drag to move", "YouTube video added"]) assert.match(app, new RegExp(text));
  assert.match(app, /function whiteboardYouTubeId\(value\)/);
  assert.match(app, /host === "youtu\.be"/);
  assert.match(app, /url\.searchParams\.get\("v"\)/);
  assert.match(app, /youtube-nocookie\.com\/embed/);
  assert.match(app, /navigator\.clipboard\.readText\(\)/);
  assert.match(app, /allowfullscreen/);
  assert.match(app, /function syncWhiteboardYouTubeOverlays/);
  assert.match(app, /createWhiteboardObject\("youtube"/);
  assert.match(objects, /"youtube"/);
  assert.match(css, /\.platform-whiteboard-youtube-overlay/);
  assert.match(css, /\[data-youtube-resize\]/);
});

test("whiteboard YouTube insertion stays link-only without opening a search tab", () => {
  assert.doesNotMatch(app, /whiteboard-search-youtube/);
  assert.doesNotMatch(app, /youtube\.com\/results\?search_query/);
});

test("dragging a selected object corner resizes regardless of the active tool", () => {
  assert.match(app, /activeSelected && activeSelected\.type !== "dimension"/);
  assert.match(app, /const activeSelected = whiteboardObjects\.find\(\(object\) => object\.id === whiteboardSelectedObjectId\)/);
  assert.match(app, /const activeResizeCorner = activeSelected && activeSelected\.type !== "dimension" \? whiteboardResizeCorner/);
  assert.match(app, /if \(!whiteboardDeleteNextObject && activeSelected && activeResizeCorner\)/);
  assert.match(app, /resize: true, resizeCorner: activeResizeCorner/);
  assert.match(app, /Drag the selected corner to resize the object\./);
});

test("color toolbar circle matches the selected drawing color", () => {
  assert.match(app, /data-whiteboard-color-chip style="--whiteboard-selected-color:#12384d"/);
  assert.match(app, /event\.target\.closest\("\[data-whiteboard-color\]"\)/);
  assert.match(app, /chip\.style\.setProperty\("--whiteboard-selected-color", whiteboardColor\.value\)/);
  assert.match(css, /background: var\(--whiteboard-selected-color, #12384d\)/);
  assert.match(css, /border-radius: 50%/);
  assert.match(app, /data-whiteboard-paint-can-icon style="--whiteboard-selected-color:#12384d"/);
  assert.match(app, /paintCan\.style\.setProperty\("--whiteboard-selected-color", whiteboardColor\.value\)/);
  assert.match(css, /platform-whiteboard-paint-can-body \{ fill: var\(--whiteboard-selected-color, #12384d\)/);
});

test("erase object removes a connected drawing or filled shape with one click", () => {
  assert.match(app, /data-whiteboard-quick-tool="erase-object">Erase object/);
  assert.match(app, /tool === "erase-object"/);
  assert.match(app, /connectedWhiteboardObjectIds\(selected\)/);
  assert.match(app, /!connectedIds\.has\(object\.id\)/);
  assert.match(app, /Connected objects/);
  assert.match(app, /Click a connected drawing, line, or filled shape to erase the whole object\./);
});

test("clicking blank whiteboard space clears the current object selection", () => {
  assert.match(app, /!selected && whiteboardSelectedObjectId/);
  assert.match(app, /whiteboardSelectedObjectId = ""; syncWhiteboardDimensionCompareControl\(\); renderWhiteboardObjects\(canvas\)/);
});

test("simple clicks do not leave accidental drawing dots", () => {
  assert.match(app, /function isAccidentalWhiteboardDot\(object\)/);
  assert.match(app, /object\.strokeStyle === "eraser" \|\| object\.emojiStamp/);
  assert.match(app, /Math\.hypot\(Number\(object\.width \?\? 0\), Number\(object\.height \?\? 0\)\) < 5/);
  assert.match(app, /whiteboardObjects = whiteboardObjects\.filter\(\(object\) => !isAccidentalWhiteboardDot\(object\)\)/);
  assert.match(app, /No mark added\. Drag on the board to draw a line or shape\./);
});

test("delete selected arms a one-click delete when nothing is selected", () => {
  assert.match(app, /let whiteboardDeleteNextObject = false/);
  assert.match(app, /!selected && action\.dataset\.action === "whiteboard-delete-object"/);
  assert.match(app, /Delete is ready\. Click the next object you want to remove\./);
  assert.match(app, /if \(whiteboardDeleteNextObject\)/);
  assert.match(app, /Object deleted\. Select and move is active again\./);
  assert.match(app, /whiteboardDeleteNextObject = false;\n\s+const selectTool/);
});

test("whiteboard provides a categorized movable emoji stamp tool", () => {
  for (const text of ["Choose an emoji stamp", "Faces and feelings", "STEM and school", "Animals", "Marks and symbols", "emoji stamped"]) assert.match(app, new RegExp(text));
  assert.match(app, /WHITEBOARD_EMOJI_STAMPS/);
  assert.match(app, /tool === "emoji-stamp"/);
  assert.match(app, /emojiStamp: true/);
  assert.match(app, /updated\.emojiStamp && whiteboardDrawing\.resize/);
  assert.match(app, /data-whiteboard-emoji-label>/);
  assert.match(app, /tool\.value = "emoji-stamp"/);
  assert.doesNotMatch(app, />Emoji stamp<\/button>/);
  assert.match(app, /emojiLabel\.hidden = false/);
  assert.match(css, /\.platform-whiteboard-toolbar label\[hidden\]/);
});

test("whiteboard lasso isolates work, removes its background, and downloads PNG", () => {
  for (const text of ["Lasso select for image", "Remove<br>Background", "Download Selection PNG", "Selection ready.", "whiteboard-selection.png", "Use Undo if light details were removed."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /whiteboardPointInPolygon/);
  assert.match(app, /whiteboardSelectionCanvas/);
  assert.match(app, /pixels\.data\[index \+ 3\] = 0/);
  assert.match(app, /backgroundRemoved: true/);
  assert.match(app, /data-whiteboard-lasso-actions hidden/);
  assert.equal((app.match(/data-action="whiteboard-remove-selection-background"/g) || []).length, 1);
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
  assert.match(css, /\.platform-whiteboard-surface \{ position: relative; grid-area: surface; min-height: 0; overflow: auto;/);
});

test("images and text rotate while text supports solid and highlighter backgrounds", () => {
  for (const text of ["Rotate left", "Rotate right", "Text background", "Transparent", "White", "Black", "Yellow highlighter", "Green highlighter", "Pink highlighter", "Blue highlighter"]) assert.match(app, new RegExp(text));
  assert.doesNotMatch(app, />Apply Text Background<\/button>/);
  assert.doesNotMatch(app, /placeholder="Type text for the board"/);
  assert.match(app, /text background selected\./);
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

test("push back to 2D is located in the Shapes dropdown", () => {
  assert.match(app, /data-whiteboard-shapes-panel/);
  assert.match(app, /const shapeControls = \[drawingToolbar\.querySelector\("\.platform-whiteboard-push-help-wrap"\)\]/);
  assert.match(app, /querySelector\("\[data-whiteboard-shapes-panel\]"\)\?\.append\(\.\.\.shapeControls\)/);
  assert.match(app, />Push Back to 2D<\/button>/);
});

test("selected shapes temporarily display angle and radius measurements", () => {
  assert.doesNotMatch(app, /data-whiteboard-shape-angle/);
  assert.doesNotMatch(app, /data-whiteboard-circle-radius/);
  assert.match(app, /function drawWhiteboardSelectionMeasurements\(context, object\)/);
  assert.match(app, /\["ellipse", "sphere", "hemisphere"\]\.includes\(object\.type\)/);
  assert.match(app, /label\(`r = \$\{Math\.round\(radius\)\}`/);
  assert.match(app, /object\.type === "triangle"/);
  assert.match(app, /label\(`\$\{degrees\}°`/);
  assert.match(app, /label\("90°"/);
  assert.match(app, /drawWhiteboardSelectionMeasurements\(context, selected\)/);
  assert.match(app, /rgba\(255,255,255,0\.96\)/);
  assert.match(app, /const outwardX = point\.x \/ length \* 32/);
  assert.match(app, /label\("90°", -bounds\.width \/ 2 - 24/);
});

test("selection corner handles update triangle angles and circle radius", () => {
  assert.match(app, /\["ellipse", "sphere", "hemisphere", "cube"\]\.includes\(object\.type\)/);
  assert.match(app, /const side = Math\.max\(12, Math\.max\(right - left, bottom - top\)\)/);
  assert.match(app, /if \(corner\.includes\("w"\)\) left = right - side/);
  assert.match(app, /resizeWhiteboardObjectFromCorner\(whiteboardDrawing\.original, whiteboardDrawing\.resizeCorner, dx, dy\)/);
});

test("selected 3D shapes show live angle and radius measurements outside their lines", () => {
  assert.match(app, /\["cylinder", "cone"\]\.includes\(object\.type\)/);
  assert.match(app, /label\(`r = \$\{Math\.round\(radius\)\}`, centerX, bounds\.y \+ bounds\.height \+ 34\)/);
  assert.match(app, /\["triangle", "pyramid", "cone", "triangular-prism"\]\.includes\(object\.type\)/);
  assert.match(app, /\["rectangle", "cube", "rectangular-prism"\]\.includes\(object\.type\)/);
});

test("every built-in 3D shape pushes back into one or more editable 2D shapes", () => {
  assert.match(app, /function flattenWhiteboard3DShape\(object\)/);
  for (const type of ["cube", "rectangular-prism", "cylinder", "cone", "pyramid", "sphere"]) assert.match(app, new RegExp(`type === "${type}"|"${type}"`));
  assert.match(app, /part\("rectangle"/);
  assert.match(app, /part\("ellipse"/);
  assert.match(app, /part\("triangle"/);
  assert.match(app, /whiteboardObjects\.splice\(selectedIndex, 1, \.\.\.flattened\)/);
  assert.match(app, /was unfolded into \$\{flattened\.length\} editable 2D shapes/);
});

test("whiteboard adds more 2D and 3D shapes and pulls connected shapes into a 3D assembly", () => {
  for (const shape of ["diamond", "pentagon", "hexagon", "star", "triangular-prism", "hexagonal-prism", "hemisphere"]) assert.match(app, new RegExp(`data-whiteboard-quick-tool="${shape}"`));
  assert.match(app, /function traceWhiteboardPolygon\(context, object, sides, innerRatio = 1\)/);
  assert.match(app, /WHITEBOARD_CLOSED_2D_SHAPES/);
  assert.match(app, /connectedWhiteboardObjectIds\(selected\)/);
  assert.match(app, /connected 2D shapes are now one 3D assembly/);
  assert.match(app, /idsToPull\.has\(object\.id\) \? makeWhiteboardObject3D\(object, depth\)/);
});

test("pulled 3D layers use a readable light-to-shadow gradient", () => {
  assert.match(app, /context\.createLinearGradient\(bounds\.x, bounds\.y/);
  assert.match(app, /gradient\.addColorStop\(0, object\.faceColors\?\.top \?\? "rgba\(255,255,255,0\.96\)"\)/);
  assert.match(app, /gradient\.addColorStop\(0\.34, object\.faceColors\?\.side \?\? object\.color \?\? "#287da0"\)/);
  assert.match(app, /gradient\.addColorStop\(1, object\.faceColors\?\.side \?\? "#082b3b"\)/);
  assert.match(app, /context\.globalAlpha = 0\.055 \+ 0\.045 \* ratio/);
  assert.match(app, /Math\.min\(14, Math\.ceil\(depth \/ 3\)\)/);
});

test("all closed shapes show angles or radius measurements", () => {
  assert.match(app, /r =/);
  assert.doesNotMatch(app, /label\(`d =/);
  assert.doesNotMatch(app, /label\(`C =/);
  assert.match(app, /\["diamond", "pentagon", "hexagon", "star", "hexagonal-prism"\]/);
  assert.match(app, /\["triangle", "pyramid", "cone", "triangular-prism"\]/);
  assert.doesNotMatch(app, /whiteboard-turn-3d-left/);
  assert.doesNotMatch(app, /whiteboard-turn-3d-right/);
});

test("English ruler and dimension calculations share the same 96 pixel inch", () => {
  assert.match(app, /whiteboardPixelsPerUnit\(metric \? "cm" : "in"\)/);
  assert.match(app, /in: 96/);
  assert.doesNotMatch(app, /metric \? 37\.8 : 72/);
});

test("ruler ticks reach its endpoint and written measurements include true-scale unit keys", () => {
  assert.match(app, /totalTicks = Math\.floor\(width \/ tickSpacing\)/);
  assert.match(app, /context\.moveTo\(width, 0\); context\.lineTo\(width, 12\)/);
  assert.match(app, /const drawUnitKey = \(unit, y, color\)/);
  assert.match(app, /const keyLength = whiteboardPixelsPerUnit\(unit\)/);
  assert.match(app, /drawUnitKey\(object\.unit, 39, object\.color \?\? "#b52222"\); drawUnitKey\(compareUnit, 71, "#1769aa"\)/);
});

test("comparison scale key is blue and 3D faces have independent colors", () => {
  assert.match(app, /drawUnitKey\(object\.unit, 39, object\.color \?\? "#b52222"\)/);
  assert.match(app, /drawUnitKey\(compareUnit, 71, "#1769aa"\)/);
  assert.match(app, /data-whiteboard-3d-front-color/);
  assert.match(app, /data-whiteboard-3d-side-color/);
  assert.match(app, /data-whiteboard-3d-top-color/);
  assert.match(app, /data-action="whiteboard-apply-all-3d-face-colors"/);
  assert.match(app, /selected\.faceColors = faceColors/);
  assert.match(app, /object\.faceColors\?\.front/);
  assert.match(app, /object\.faceColors\?\.side/);
  assert.match(app, /object\.faceColors\?\.top/);
});

test("all three 3D face colors can be chosen and applied together", () => {
  assert.match(app, /<legend>3D face colors<\/legend>/);
  assert.match(app, />Apply all face colors<\/button>/);
  assert.match(app, /const faceColors = \{ front:/);
  assert.match(app, /Front, side, and top or back face colors updated together/);
});

test("a line through a closed 2D or 3D shape bisects it into two editable fragments", () => {
  assert.match(app, /function bisectWhiteboardShapeWithLine\(line\)/);
  assert.match(app, /createWhiteboardObject\("shape-fragment"/);
  assert.match(app, /cutSide/);
  assert.match(app, /normalizedCut/);
  assert.match(app, /function drawWhiteboardShapeFragment\(context, object\)/);
  assert.match(app, /context\.clip\(\)/);
  assert.match(app, /completedTool === "line" && bisectWhiteboardShapeWithLine\(completedObject\)/);
  assert.match(app, /Shape divided into two independently editable objects along the line/);
});

test("selected split pieces show cut measurements and 3D pieces can return to 2D", () => {
  assert.match(app, /function whiteboardFragmentCutSegment\(object\)/);
  assert.doesNotMatch(app, /label\(`cut = /);
  assert.match(app, /label\(`\$\{acuteAngle\}°`/);
  assert.match(app, /\["ellipse", "cylinder", "sphere", "hemisphere", "cone"\]\.includes\(object\.sourceType\)/);
  assert.match(app, /if \(object\.type === "shape-fragment"\)/);
  assert.match(app, /const flatType = \{ cube: "rectangle"/);
});

test("chosen built-in 3D face colors use transparent fills with strong outlines", () => {
  assert.match(app, /if \(object\.faceColors\?\.\[face\]\)/);
  assert.match(app, /context\.globalAlpha = 0\.2/);
  assert.match(app, /context\.fillStyle = color; context\.beginPath\(\); fillTrace\(\); context\.fill\(\)/);
  assert.match(app, /context\.strokeStyle = color/);
  assert.match(app, /const strokeFace = \(face, trace, fillTrace = trace\)/);
});

test("round 3D face fills do not add straight top or bottom seams", () => {
  assert.match(app, /const strokeFace = \(face, trace, fillTrace = trace\)/);
  assert.match(app, /context\.beginPath\(\); fillTrace\(\); context\.fill\(\)/);
  assert.match(app, /context\.moveTo\(x \+ width, y \+ depth \/ 2\); context\.lineTo\(x \+ width, y \+ height - depth \/ 2\); \}, \(\) =>/);
  assert.match(app, /context\.moveTo\(x \+ width \/ 2, y\); context\.lineTo\(x \+ width, y \+ height - depth \/ 2\); \}, \(\) =>/);
});

test("3D shapes use gradient line layers without solid fills", () => {
  assert.match(app, /context\.strokeStyle = gradient/);
  assert.match(app, /if \(object\.fillColor && !object\.extruded3D\)/);
  assert.doesNotMatch(app, /globalAlpha = 0\.22; context\.fillStyle = object\.fillColor; context\.fill\(\)/);
});

test("selected text drawings and lines can be made 3D and restored to 2D", () => {
  assert.match(app, />Make selected object 3D<\/button>/);
  assert.match(app, /\.\.\.WHITEBOARD_CLOSED_2D_SHAPES, "text", "path", "line", "arrow"/);
  assert.match(app, /extruded3D: true, depth: normalizedDepth/);
  assert.match(app, /function drawWhiteboardExtrusion\(context, object\)/);
  assert.match(app, /const layers = Math\.max\(5, Math\.min\(14, Math\.ceil\(depth \/ 3\)\)\)/);
  assert.match(app, /drawWhiteboardExtrusion\(context, object\)/);
  assert.match(app, /Selected object is now 3D with thickness \$\{depth\}\. Use Push Back to 2D to reverse it\./);
  assert.match(app, /delete restored\.extruded3D/);
  assert.match(app, /The object was pushed back to its original 2D form\./);
});

test("3D conversion thickness can be chosen and adjusted", () => {
  assert.match(app, /3D thickness<input type="range" data-whiteboard-3d-depth min="10" max="120" value="24"/);
  assert.match(app, /data-whiteboard-3d-depth-output/);
  assert.match(app, /querySelector\("\[data-whiteboard-3d-depth\]"\)\?\.value \?\? 24/);
  assert.match(app, /selected\?\.original2DType/);
  assert.match(app, /selected\.depth = depth/);
  assert.match(app, /3D thickness set to \$\{depth\}/);
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
  for (const text of ["Make selected object 3D", "Push Back to 2D", "Select a shape, highlighted text box, drawing, or line to make it 3D.", "Rectangular Prism", "Cylinder", "Pyramid", "The object was pushed back to its original 2D form.", "Rotation is available for images, text, lines, arrows, and 2D or 3D shapes."]) assert.match(app, new RegExp(text.replace(/[.]/g, "\\.")));
  assert.match(app, /typeMap = \{ rectangle: "rectangular-prism", ellipse: "cylinder", triangle: "pyramid" \}/);
  assert.match(app, /original2DType: object\.type/);
  assert.match(app, /shapeLabel: true/);
  assert.match(app, /data-whiteboard-push-help/);
  assert.match(css, /\.platform-whiteboard-push-help/);
  assert.match(css, /\.platform-whiteboard-push-help::before/);
  assert.match(app, /const depth = Math\.max\(10, Math\.min\(120/);
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
