import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "platform");
const destination = path.join(root, "public-site", "platform");
const sharedCharacterSource = path.join(root, "assets", "images", "characters");
const sharedCharacterDestination = path.join(destination, "assets", "images", "characters");
const publicClientId = "42889983876-krlc3beis1nc9f5sblrab11t2n4nmo19.apps.googleusercontent.com";

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const directory of ["assets", "data", "printable-lessons", "scripts", "styles"]) {
  await cp(path.join(source, directory), path.join(destination, directory), { recursive: true });
}
await mkdir(sharedCharacterDestination, { recursive: true });
for (const file of [
  "bob-active-poses-1.png",
  "bob-active-poses-2.png",
  "bob-idle-poses-2.png",
  "bob-idle-poses.png",
  "bob-voice-meter-states.png",
  "bob-walk-left.png",
  "bob-walk-right.png",
  "bob-unlocks-01.webp",
  "bob-unlocks-02.webp",
  "bob-unlocks-03.webp",
  "bob-unlocks-04.webp",
  "bob-unlocks-05.webp",
  "bob-unlocks-06.webp",
  "bob-unlocks-07.webp",
  "bob-unlocks-08.webp",
]) {
  await cp(path.join(sharedCharacterSource, file), path.join(sharedCharacterDestination, file));
}

const sourceIndex = await readFile(path.join(source, "index.html"), "utf8");
const publicIndex = sourceIndex
  .replace('name="thinkamigbob-production-identity" content="disabled"', 'name="thinkamigbob-production-identity" content="enabled"')
  .replace('name="thinkamigbob-student-access" content="disabled"', 'name="thinkamigbob-student-access" content="enabled"')
  .replace('name="thinkamigbob-google-signin-client-id" content=""', `name="thinkamigbob-google-signin-client-id" content="${publicClientId}"`)
  .replace(/\.\/scripts\/platform-app\.mjs\?v=[^"']+/, './scripts/platform-app.bundle.js?v=cloudflare-20261021-66');

if (!publicIndex.includes('name="thinkamigbob-student-access" content="enabled"')) {
  throw new Error("student-access-must-be-enabled");
}
await writeFile(path.join(destination, "index.html"), publicIndex);
