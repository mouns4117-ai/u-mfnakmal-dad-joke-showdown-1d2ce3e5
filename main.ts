// Dad Joke Showdown — one dad joke, written to /output/entry.txt.
// Node 22, stdlib only. Deterministic: the same joke every run.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke turns on "put his foot down": literal (a flamingo stands on one
// foot, so stopping means putting it down) and idiomatic (a father being firm).
// One sentence, punchline at the end, told the way a father would at the table.
const JOKE =
  "I told my son to stop impersonating a flamingo. He had to put his foot down.";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200 || JOKE.includes("\n")) {
    throw new Error(`joke outside the 1-200 gate: ${chars} characters`);
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
}

main();
