#!/usr/bin/env node
/**
 * te9-docs Clay-ify post-processor for pele-rendered flowcharts.
 *
 * pele gives layout (node positions, edge routing); this step restores the
 * Clay ring grammar on top of it (ADR-0007):
 *   - uniform ring radii (labels OUTSIDE, mono caps; optional sub-label below)
 *   - supporting nodes become small filled gray dots
 *   - the deliverable (double circle in the source) stays a double ring
 *   - edges become plain trimmed hairlines (no arrowheads)
 *   - legend row at the top-left
 *   - collision-safe canvas: computes the true drawn bounds (including the
 *     outside labels) and extends/translates the viewBox so nothing collides
 *     with the legend band or clips at the edges
 *
 * Usage:
 *   node clayify.mjs --in figure.svg --spec figure.json [--out figure.svg]
 *
 * Spec JSON: { "nodes": { "<id>": { "label": "UPPER", "sub": "...",
 *                                   "fill": true } },
 *              "legend": [ { "type": "ring|dot|dbl|fill", "label": "..." } ],
 *              "r": 17 }
 *
 * "fill": true renders the node as a FILLED clay ring — the deck's `klaar`
 * convention (filled = the station that works / here-now), carried into
 * figures. Legend glyph type "fill" decodes it.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const input = arg('--in'), specFile = arg('--spec'), output = arg('--out') || input;
if (!input || !specFile) {
  console.error('Usage: node clayify.mjs --in figure.svg --spec figure.json [--out out.svg]');
  process.exit(2);
}

let svg, spec;
try {
  svg = readFileSync(resolve(input), 'utf8');
  spec = JSON.parse(readFileSync(resolve(specFile), 'utf8'));
} catch (err) { console.error(err.message); process.exit(2); }

const R = spec.r ?? 17;
const nodes = new Map();
// drawn-bounds tracking (label boxes extend beyond pele's node geometry)
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const labHalf = (t) => String(t).length * 3.8;   // ~7.6px per char at 11px mono, half-width

// 1. nodes -> uniform rings / dots, labels OUTSIDE
svg = svg.replace(
  /<g class="pele-node ([^"]*)" data-id="([^"]*)" transform="translate\(([-\d.]+),([-\d.]+)\)">.*?<\/g>/gs,
  (m, cls, id, xs, ys) => {
    const x = +xs, y = +ys;
    nodes.set(id, { cls, x, y });
    const s = (spec.nodes && spec.nodes[id]) || {};
    const label = s.label || id.toUpperCase();
    const isDbl = cls.includes('dbl-circ');
    const isSupport = cls.includes('support');
    const isFill = s.fill === true;
    let inner;
    if (isSupport) {
      inner = `<circle cx="${x}" cy="${y}" r="5" fill="#87867F"/>`;
    } else if (isFill) {
      inner = `<circle cx="${x}" cy="${y}" r="${R}" fill="#FE6C2D" stroke="#FE6C2D" stroke-width="2"/>`;
    } else if (isDbl) {
      inner = `<circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="#FE6C2D" stroke-width="2"/>`
            + `<circle cx="${x}" cy="${y}" r="${R - 4}" fill="none" stroke="#FE6C2D" stroke-width="1.5"/>`;
    } else {
      inner = `<circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="#FE6C2D" stroke-width="2"/>`;
    }
    const labY = y - (isSupport ? 16 : R + 9);
    const subY = y + (isSupport ? 18 : R + 22);
    // bounds: label above (its own width), sub below
    minX = Math.min(minX, x - labHalf(label), x - labHalf(s.sub || ''));
    maxX = Math.max(maxX, x + labHalf(label), x + labHalf(s.sub || ''));
    minY = Math.min(minY, labY - 12);
    maxY = Math.max(maxY, subY + 12, y + (isSupport ? 5 : R) + 2);
    let out = `<g class="clay-node" data-id="${id}">${inner}`
            + `<text class="clay-lab" x="${x}" y="${labY}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="600" fill="#141413">${label}</text>`;
    if (s.sub) out += `<text class="clay-sub" x="${x}" y="${subY}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" fill="#87867F">${s.sub}</text>`;
    return out + '</g>';
  }
);

// 2. edges -> plain trimmed hairlines between uniform boundaries (no arrowheads)
svg = svg.replace(
  /<g class="pele-edge" data-id="L_([A-Za-z0-9]+)_([A-Za-z0-9]+)_\d+"([^>]*)>(.*?)<\/g>/gs,
  (m, src, dst, attrs, inner) => {
    const a = nodes.get(src), b = nodes.get(dst);
    if (!a || !b) return m;
    const trim = (n) => (n.cls && n.cls.includes('support')) ? 7 : R + 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const x1 = a.x + ux * trim(a), y1 = a.y + uy * trim(a);
    const x2 = b.x - ux * trim(b), y2 = b.y - uy * trim(b);
    return `<g class="clay-edge"${attrs}><path d="M${x1.toFixed(2)},${y1.toFixed(2)}L${x2.toFixed(2)},${y2.toFixed(2)}" fill="none"/></g>`;
  }
);

// 3. collision-safe canvas: translate content clear of the legend band (top 40px)
//    and extend the viewBox for label overhang left/right/bottom.
const LEGEND_BAND = 44;
const vb = svg.match(/viewBox="([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)"/);
if (vb) {
  let [, vx, vy, vw, vh] = vb.map(Number);
  const dy = Math.max(0, LEGEND_BAND - minY);
  const ox = Math.min(0, minX - 12);
  const right = Math.max(0, maxX - (vx + vw) + 12);
  const bottom = Math.max(0, (maxY + dy) - (vy + vh) + 12);
  // wrap all content (after the root's optional <style>) in a translate group
  const styleEnd = svg.indexOf('</style>');
  const insertAt = styleEnd >= 0 ? svg.indexOf('>', styleEnd) + 1 : svg.indexOf('>') + 1;
  const closeAt = svg.lastIndexOf('</svg>');
  const inner = svg.slice(insertAt, closeAt);
  svg = svg.slice(0, insertAt) + `<g transform="translate(0 ${dy})">` + inner + `</g>` + svg.slice(closeAt);
  const nvx = ox, nvy = vy, nvw = Math.max(vw - ox + right, 100), nvh = vh + dy + bottom;
  svg = svg.replace(/viewBox="[\d.-]+ [\d.-]+ [\d.-]+ [\d.-]+"/,
    `viewBox="${nvx} ${nvy} ${nvw} ${nvh}"`);
  // keep width/height attrs in sync with the adapted viewBox (rasterizers
  // and aspect-ratio calculations read these, not the viewBox)
  svg = svg.replace(/width="[\d.-]+"/, `width="${Math.round(nvw)}"`);
  svg = svg.replace(/height="[\d.-]+"/, `height="${Math.round(nvh)}"`);
}

// 4. legend → emitted as header markup (NOT drawn into the SVG): the plate
//    header carries the decoding key; the body stays diagram-only.
if (Array.isArray(spec.legend) && spec.legend.length) {
  const g = (t) => t === 'dot'
    ? '<svg class="lg-g" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4" fill="#87867F"/></svg>'
    : t === 'dbl'
    ? '<svg class="lg-g" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="#FE6C2D" stroke-width="2"/><circle cx="7" cy="7" r="2.5" fill="none" stroke="#FE6C2D" stroke-width="1.5"/></svg>'
    : t === 'fill'
    ? '<svg class="lg-g" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="#FE6C2D" stroke="#FE6C2D" stroke-width="1.5"/></svg>'
    : '<svg class="lg-g" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="#FE6C2D" stroke-width="2"/></svg>';
  const items = spec.legend.map((it) => `<span class="lg">${g(it.type)}${it.label}</span>`).join('');
  writeFileSync(resolve(output) + '.legend.html',
    `<div class="fig-legend">${items}</div>`, 'utf8');
  console.log('legend markup -> ' + output + '.legend.html');
}

// 5. self-contained Clay dark flip INSIDE the svg — the fullscreen new-tab
//    view must be Clay-correct without the document's stylesheet (base paint
//    lives in presentation attributes; the class rules only flip fills)
const svgStyle = `
  <style>
    @media (prefers-color-scheme: dark){
      .clay-lab{fill:#F0EEE6;}
      .clay-sub{fill:#A5A39B;}
    }
  </style>`;
svg = svg.replace(/(<svg[^>]*>)/, `$1${svgStyle}`);

writeFileSync(resolve(output), svg, 'utf8');
console.log(`Clay-ified ${nodes.size} nodes -> ${output}`);
