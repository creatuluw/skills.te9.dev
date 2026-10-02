/**
 * app-tour-demo — verify: open the built player headless, let it auto-play to
 * the end card, and assert the invariants that matter:
 *   · every step completes (dots), end card appears
 *   · every click lands exactly on its target (max deviation < 2.5px — the
 *     scale-factor bug guard)
 *   · zero page/console errors
 * Exit code 0 = geslaagd. Runs at 2x to keep the check quick.
 *
 * Usage: node verify.mjs --demo demo-tour.html
 */
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Playwright komt uit het target-project (CWD), niet uit de skill-map
const { chromium } = createRequire(process.cwd() + '/package.json')('@playwright/test');

const HIER = dirname(fileURLToPath(import.meta.url));
const arg = (naam) => {
	const i = process.argv.indexOf('--' + naam);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const bestand = 'file:///' + resolve(process.cwd(), arg('demo') ?? 'demo-tour.html').replace(/\\/g, '/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } }); // <1440: schaalfactor < 1
const fouten = [];
page.on('pageerror', (e) => fouten.push('PAGEERROR: ' + e.message));
page.on('console', (m) => m.type() === 'error' && fouten.push('CONSOLE: ' + m.text()));

await page.goto(bestand);
await page.waitForTimeout(2500);
// pauzeer vóór instrumenteren — autoplay start zodra frame 0 geladen is
await page.click('#btn-pauze');
await page.evaluate(() => {
	window.__dev = [];
	const origFlits = window.flits;
	window.flits = (el) => {
		const doel = window.doelPositie(el);
		window.__dev.push(
			Math.hypot(parseFloat(cursor.style.left) + 11 - doel.x, parseFloat(cursor.style.top) + 11 - doel.y)
		);
		origFlits(el);
	};
});
await page.click('#btn-pauze');
await page.selectOption('#snelheid', '2');

const klaar = await page
	.waitForSelector('#eind.open', { timeout: 300000 })
	.then(() => true)
	.catch(() => false);
const res = await page.evaluate(() => ({
	dots: document.querySelectorAll('.stap-dot.klaar').length,
	stappen: STAPPEN.length,
	dev: window.__dev
}));
await browser.close();

const maxDev = Math.max(...res.dev, 0);
console.log('eind-kaart:', klaar ? 'JA' : 'NEE', '· dots:', res.dots, '/', res.stappen);
console.log('kliks:', res.dev.length, '· max afwijking:', maxDev.toFixed(1), 'px');
console.log('fouten:', fouten.length ? fouten.slice(0, 5).join(' | ') : 'geen');
const ok = klaar && fouten.length === 0 && res.dots === res.stappen && maxDev < 2.5;
console.log(ok ? 'GESLAAGD' : 'GEFAALD');
process.exit(ok ? 0 : 1);
