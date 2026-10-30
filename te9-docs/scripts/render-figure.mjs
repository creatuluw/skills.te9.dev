#!/usr/bin/env node
/**
 * te9-docs build-time figure renderer.
 *
 * Renders a Mermaid source file to a static SVG string via pele, for inlining
 * into a document. Build-time only — finished documents never carry pele.
 *
 * Usage:
 *   node render-figure.mjs --input diagram.mmd [--output diagram.svg] [--id-prefix fig-1]
 *
 * Output guidance: the SVG's colors come from CSS variables — map them to the
 * Clay tokens in the document (e.g. set `--pele-*` variables on the figure
 * plate) rather than post-processing hex values by hand.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
function arg(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

const input = arg('--input');
if (!input) {
  console.error('Usage: node render-figure.mjs --input diagram.mmd [--output diagram.svg] [--id-prefix fig-1]');
  process.exit(2);
}

let source;
try {
  source = readFileSync(resolve(input), 'utf8');
} catch (err) {
  console.error(`Cannot read input: ${err.message}`);
  process.exit(2);
}

let pele;
try {
  pele = await import('pele');
} catch (err) {
  console.error('The pele package is not installed. Run once:  cd scripts && npm install');
  process.exit(3);
}

const options = {};
const idPrefix = arg('--id-prefix');
if (idPrefix) options.idPrefix = idPrefix;
// Smart sizing: render against the plate's real content width so pele adapts
// the LAYOUT (wraps labels, reduces spacing, switches direction) instead of
// the finished figure being scaled down after the fact.
const maxWidth = arg('--max-width');
if (maxWidth) {
  options.maxWidth = parseInt(maxWidth, 10);
  if (arg('--direction-breakpoint')) options.directionBreakpoint = parseInt(arg('--direction-breakpoint'), 10);
}

try {
  const { svg } = pele.render(source, options);
  const out = arg('--output');
  if (out) {
    writeFileSync(resolve(out), svg, 'utf8');
    console.log(`Wrote ${out} (${svg.length} bytes)`);
  } else {
    process.stdout.write(svg);
  }
} catch (err) {
  if (err && err.name === 'PeleError') {
    console.error(`Pele could not render the diagram: ${err.message}`);
    if (err.line) console.error(`  at line ${err.line}, column ${err.column}`);
    process.exit(1);
  }
  throw err;
}
