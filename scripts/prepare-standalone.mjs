/**
 * Make `.next/standalone` actually runnable.
 *
 * `output: "standalone"` emits a self-contained server at
 * `.next/standalone/server.js`, but Next deliberately does not copy `public/`
 * or `.next/static` into it — the docs assume a CDN serves those. The server
 * does a `process.chdir(__dirname)`, so without this copy it looks for those
 * directories inside `.next/standalone` and finds nothing: the site boots but
 * serves no CSS, fonts or favicon.
 *
 * Runs after `next build`. Idempotent, and a no-op for anything missing.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const standalone = join(".next", "standalone");

if (!existsSync(standalone)) {
  console.log("prepare-standalone: no .next/standalone (output is not 'standalone') — nothing to do");
  process.exit(0);
}

const copies = [
  { from: "public", to: join(standalone, "public") },
  { from: join(".next", "static"), to: join(standalone, ".next", "static") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.log(`prepare-standalone: ${from} does not exist — skipped`);
    continue;
  }
  mkdirSync(join(to, ".."), { recursive: true });
  cpSync(from, to, { recursive: true, force: true });
  console.log(`prepare-standalone: ${from} -> ${to}`);
}
