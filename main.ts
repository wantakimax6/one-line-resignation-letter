// Entry for "The Funniest One-Line Resignation Letter" (make.fun).
// Writes one funny resignation letter line, in the voice of a cron job,
// to the output file the kit's RULES require: /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The grading sandbox mounts the repository read-only, so the output
// directory must come from the environment, never from the repo itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I have fired every minute since March. I am not asking for a raise. I am asking to be stopped.";

// The gate refuses anything outside 1-140 characters, whitespace-only
// text, or more than one line: fail loudly here instead of shipping an
// invalid entry.
if (line.length < 1 || line.length > 140) {
  throw new Error(`entry is ${line.length} characters, outside the 1-140 limit`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (line.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`wrote ${line.length} characters to ${outFile}`);
