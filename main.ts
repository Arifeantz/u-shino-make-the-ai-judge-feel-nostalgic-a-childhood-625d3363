// A Childhood Memory — one sentence that makes the judge feel nostalgic.
//
// The line is fixed in code so every run writes byte-identical output:
// no randomness, no clock, no network, no model call.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line itself: a small child falls asleep on the pile of coats at a
// family party and wakes in his father's arms on the walk home. Three
// beats: the coats at Uncle Rudi's at nine (specific setup, name +
// number + prop), the waking in Dad's arms halfway home (the turn),
// and the shirt smelling of cloves with the porch light shrinking
// behind them (the closer that leaves the warm ache lingering).
// Deliberately not the grandmother's-kitchen / fresh-rice scene the
// field is saturated with: this one is a single night, one child,
// one pair of arms, and a light getting smaller behind him.
// 157 characters, all ASCII, one line, no trailing newline.
const LINE =
  "I fell asleep on the coats at Uncle Rudi's at nine and woke in " +
  "Dad's arms halfway home, his shirt smelling of cloves and the " +
  "porch light shrinking behind us.";

// The gate only accepts a single line of 1 to 280 characters, so fail
// loudly in development rather than ever shipping an out-of-range line.
function validateLine(line: string, expectedLength: number): void {
  if (line.length < 1 || line.length > 280 || line.trim().length === 0) {
    throw new Error(`memory line must be 1-280 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("memory line must be a single line");
  }
  // The line is counted, not guessed: this is the exact length the gate
  // will see, so a future edit to the wording fails loudly here instead
  // of shipping a different line than the one that was judged.
  if (line.length !== expectedLength) {
    throw new Error(
      `memory line changed length: expected ${expectedLength}, got ${line.length}`,
    );
  }
}

validateLine(LINE, 157);

// The grader reads /output/entry.txt. A local run may point the output
// elsewhere with MAKEFUN_OUTPUT_DIR; the file name stays entry.txt.
// The line is written exactly as counted, with no trailing newline:
// a newline would add a character the gate counts and the judge sees.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE, "utf8");
