/**
 * app-tour-demo — build: render the demo player from captured assets + a
 * steps file, using the skill's own player template (no donor player needed).
 *
 * Usage:
 *   node build.mjs --assets tour-assets.json --steps steps.json --out demo.html \
 *                  --titel "Feature - rondleiding" --badge "Feature" --eindtekst "…"
 *   (titel/badge/eindtekst may also live in steps.json as { titel, badge, eindtekst })
 *
 * steps.json shape:
 * {
 *   "titel": "…", "badge": "…", "eindtekst": "…",
 *   "stappen": [
 *     { "f": "frame-naam", "cap": "korte cap", "tekst": "ondertitel: wat + doel",
 *       "tour": ["anchor","anchor"],            // cursor glijdt erlangs (hover)
 *       "anchor": "anchor", "act": "click",     // of "type" + "text"
 *       "klaar": "✓-resultaatregel na de actie" }
 *   ]
 * }
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = dirname(fileURLToPath(import.meta.url));
const arg = (naam) => {
	const i = process.argv.indexOf('--' + naam);
	return i > 0 ? process.argv[i + 1] : undefined;
};

const assetsPad = resolve(process.cwd(), arg('assets') ?? 'tour-assets.json');
const stepsPad = resolve(process.cwd(), arg('steps') ?? 'steps.json');
const uitPad = resolve(process.cwd(), arg('out') ?? 'demo-tour.html');

const { frames, css } = JSON.parse(readFileSync(assetsPad, 'utf8'));
const steps = JSON.parse(readFileSync(stepsPad, 'utf8'));
const STAPPEN = steps.stappen ?? steps.steps ?? steps;

const frameNamen = new Set(frames.map((f) => f.naam));
const onbekend = [...new Set(STAPPEN.map((s) => s.f))].filter((f) => !frameNamen.has(f));
if (onbekend.length) throw new Error('stappen verwijzen naar ontbrekende frames: ' + onbekend.join(', '));

// </ in JSON moet <\/ worden, anders breekt het de <script>-tag van de speler
const J = (v) => JSON.stringify(v).replace(/<\//g, '<\\/');

const template = readFileSync(resolve(HIER, '..', 'templates', 'player.html'), 'utf8');
const uit = template
	.replace('__PAGINATITEL__', steps.titel ?? 'Demo')
	.replace('__BADGE__', steps.badge ?? 'Demo')
	.replace('__FRAMES__', J(frames.map((f) => ({ name: f.naam, html: f.html, scrolls: f.scrolls }))))
	.replace('__CSS__', J([css]))
	.replace('__STAPPEN__', J(STAPPEN))
	.replace('__EINDTEKST__', JSON.stringify(steps.eindtekst ?? 'Klaar.'));

writeFileSync(resolve(HIER, uitPad), uit);
console.log(
	uitPad + ':',
	(uit.length / 1024).toFixed(0),
	'kB ·',
	frames.length,
	'frames ·',
	STAPPEN.length,
	'stappen ·',
	STAPPEN.filter((s) => s.klaar).length,
	'resultaatregels'
);
