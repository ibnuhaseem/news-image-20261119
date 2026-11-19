// news-image-20261119 — front page of Thursday 19 November 2026.
// The image is drawn at build time (frontpage.html rendered to entry.png);
// this program only places those bytes at /output/entry.png.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const from = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const to = join(outDir, "entry.png");

if (!existsSync(from)) throw new Error("entry.png missing from repo root");
const data = readFileSync(from);
mkdirSync(outDir, { recursive: true });
writeFileSync(to, data);
if (readFileSync(to).length !== data.length) {
  throw new Error("entry.png did not copy intact");
}
console.log(`entry.png (${data.length} bytes) -> ${to}`);
