/**
 * app-tour-demo — capture: drive the real app with Playwright and capture
 * each tour stop as a full DOM+CSS snapshot (pixel-perfect by construction).
 *
 * EDIT ONLY THE DRAAIBOEK BLOCK BELOW for a new feature. Everything under it
 * is generic machinery (login, serialization, CSS union, font inlining).
 *
 * Requirements: Node 20+, Playwright (chromium) installed in the target repo,
 * a running dev server. Writes tour-assets.json next to the output.
 *
 * Usage:  node capture.mjs            (after editing the DRAAIBOEK)
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const HIER = dirname(fileURLToPath(import.meta.url));
// Incrementele tussenstand BUITEN het project: een wegschrijven binnen de
// vite-watch geeft HMR-hot-updates die de pagina halverwege een voor()-stap
// kunnen herladen ("Execution context was destroyed").
const TUSSENSTAND = resolve(tmpdir(), 'app-tour-demo-tour-assets.json');

// .env van het target-project laden (vóór het DRAAIBOEK — daar worden de
// env-waarden uitgelezen). Loopt vanuit de CWD omhoog tot een .env gevonden wordt.
for (let d = process.cwd(), i = 0; i < 8; i++, d = resolve(d, '..')) {
	if (existsSync(resolve(d, '.env'))) {
		for (const l of readFileSync(resolve(d, '.env'), 'utf8').split(/\r?\n/)) {
			const m = /^([A-Z0-9_]+)=(.*)$/.exec(l);
			if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
		}
		break;
	}
}

// ══════════════════════════ DRAAIBOEK — pas dit aan ══════════════════════════
const DRAAIBOEK = {
	// Waar draait de app + welke origin vervangt relatieve url's in de snapshots?
	base: 'http://localhost:7034',
	prod: 'https://kees.pippeloi.nl',

	// Inloggegevens (uit .env van het target-project — nooit hardcoden).
	// Extra accounts (bijv. admin): voeg zelf extra inloggen()-calls toe.
	login: {
		email: process.env.LOGIN_EMAIL_E2E,
		password: process.env.LOGIN_PASSWORD_E2E
	},

	// Map met .woff2-bestanden die als @font-face in de CSS zitten (base64-inline
	// want file:// kan geen /fonts laden). Leeg laten als de app geen lokale fonts heeft.
	fontsMap: 'static/fonts',

	// Optioneel: demo-data zaaien via de ÉCHTE API's (nooit direct naar de DB).
	// Krijgt helper { page, mut(path, method, data) } en geeft gegevens terug
	// die cleanup nodig heeft. mut doet fetch mét CSRF vanuit de pagina-context.
	seed: null, // async (h) => { ...; return { ids: [] }; }

	// Optioneel: zaaisel weer opruimen — demo's zijn netto-opruimend.
	// Let op: losse records (ritten, regels) overleven vaak hun parent-delete;
	// ruim die expliciet op via hun eigen lijst-endpoint.
	cleanup: null, // async (h, zaaisel) => { ... }

	// De tour-stops. Per frame:
	//   naam         uniek — zo verwijst steps.json ernaar
	//   url          waar naartoe (relatief aan base)
	//   wacht        ms na navigatie voordat het frame stabiel is (netwerk + render)
	//   voor         async (page) => {} — optionele voorbereiding: accordion openen,
	//                modal openen (NOOIT op 'Verwijderen' bevestigen), pill aanklikken
	//   anchors      [naam, '() => finder-expressie'] — de speler zoekt
	//                [data-demo-anchor="naam"] voor cursor-acties
	frames: [
		// VOORBEELD:
		// { naam: 'lijst', url: '/cases', wacht: 1800, voor: null, anchors: [
		//   ['nieuwe-knop', `() => [...document.querySelectorAll('button')].find(b => b.textContent.trim().startsWith('Nieuw'))`],
		//   ['eerste-rij', `() => document.querySelector('table tbody tr')`],
		// ]},
	]
};
// ═════════════════════════════════ tot hier ═══════════════════════════════════

const cssRegels = new Set();
const frames = [];
const browser = await chromium.launch();

async function inloggen(contextFabriek, email, wachtwoord) {
	const context = await contextFabriek();
	const login = await context.request.post('/api/auth/login', { data: { email, password: wachtwoord } });
	const body = await login.json();
	if (!body?.data) throw new Error('login mislukt: ' + JSON.stringify(body).slice(0, 200));
	const page = await context.newPage();
	await page.goto('/login');
	await page.evaluate(
		(d) => {
			localStorage.setItem('auth_data', JSON.stringify(d));
			localStorage.setItem('auth', 'true');
		},
		body.data
	);
	return { context, page };
}

const csrf = (page) =>
	page.evaluate(() => document.cookie.split('; ').find((c) => c.startsWith('csrf_token='))?.split('=')[1]);

async function mut(page, path, method, data) {
	const t = await csrf(page);
	return page.evaluate(
		async ({ path, method, data, t }) => {
			const res = await fetch(path, {
				method,
				headers: { ...(t ? { 'x-csrf-token': t } : {}), 'content-type': 'application/json' },
				body: data ? JSON.stringify(data) : undefined
			});
			return { status: res.status, body: await res.json().catch(() => null) };
		},
		{ path, method, data, t }
	);
}

// DOM+CSS-serialisatie — het contract van de speler:
//  · scripts/styles/links/noscript eruit (geen hydratatie in de snapshot)
//  · <!--CSS0--> marker vlak voor </head> (de speler injecteert daar de CSS-blob)
//  · anchors als data-demo-attributen vóór serialiseren
//  · scrollposities per scroll-container (pad = kind-indices vanaf body)
//  · relatieve src/href/srcset → absolute prod-origin
const SERIAL = ([anchors, PROD]) => {
	for (const [naam, vinden] of anchors) {
		try {
			const fn = eval('(' + vinden + ')');
			const el = typeof fn === 'function' ? fn() : fn; // eval geeft de functie — AANROEPEN
			if (el && el.setAttribute) el.setAttribute('data-demo-anchor', naam);
		} catch {}
	}
	const scrolls = [];
	(function wandel(el, pad) {
		for (let i = 0; i < el.children.length; i++) {
			const c = el.children[i];
			const p = [...pad, i];
			if (c.scrollTop > 4 || c.scrollLeft > 4) scrolls.push({ path: p, top: c.scrollTop, left: c.scrollLeft });
			wandel(c, p);
		}
	})(document.body, []);
	const doc = document.documentElement.cloneNode(true);
	doc.querySelectorAll('script, style, link, noscript').forEach((n) => n.remove());
	doc.querySelector('head')?.appendChild(document.createComment('CSS0'));
	const abs = (n, attr) => {
		const v = n.getAttribute(attr);
		if (v && v.startsWith('/')) n.setAttribute(attr, PROD + v);
	};
	doc.querySelectorAll('[src]').forEach((n) => abs(n, 'src'));
	doc.querySelectorAll('[href]').forEach((n) => abs(n, 'href'));
	doc.querySelectorAll('[srcset]').forEach((n) => abs(n, 'srcset'));
	const regels = [];
	for (const sheet of document.styleSheets) {
		try {
			for (const r of sheet.cssRules) regels.push(r.cssText);
		} catch {}
	}
	return { html: doc.outerHTML, scrolls, regels };
};

async function vang(page, naam, anchors) {
	const res = await page.evaluate(SERIAL, [anchors, DRAAIBOEK.prod]);
	res.regels.forEach((r) => cssRegels.add(r));
	frames.push({ naam, html: res.html, scrolls: res.scrolls });
	console.log(
		'frame',
		naam,
		'· anchors',
		anchors.filter(([n]) => res.html.includes('data-demo-anchor="' + n + '"')).length + '/' + anchors.length,
		'· css',
		res.regels.length
	);
}

// ---------- run ----------
const sessie = await inloggen(() => browser.newContext({ baseURL: DRAAIBOEK.base, viewport: { width: 1440, height: 900 } }), DRAAIBOEK.login.email, DRAAIBOEK.login.password);
const page = sessie.page;
// h.mut(path, method, data) — zoals gedocumenteerd in het DRAAIBOEK (page is gebonden)
const h = { page, mut: (pad, methode, data) => mut(page, pad, methode, data) };

let zaaisel = null;
try {
	if (DRAAIBOEK.seed) zaaisel = await DRAAIBOEK.seed(h);

	for (const f of DRAAIBOEK.frames) {
		await page.goto(f.url);
		await page.waitForTimeout(f.wacht ?? 1500);
		if (f.voor) await f.voor(page);
		await vang(page, f.naam, f.anchors ?? []);
		// incrementeel wegschrijven (vite-safe, zie TUSSENSTAND) — bij een crash
		// blijven eerdere frames bewaard op dat pad
		writeFileSync(TUSSENSTAND, JSON.stringify({ frames, css: [...cssRegels].join('\n') }));
	}
} finally {
	// netto-opruimend — óók bij een crash halverwege de frames (zaaisel blijft
	// anders achter in de gedeelde dev-DB); incrementele tour-assets blijft staan
	if (DRAAIBOEK.cleanup) {
		// pagina eerst weer gezond maken: een mid-capture navigatie/HMR-herlaad
		// kan de execution context hebben gesloopt waar cleanup op vertrouwt
		await page.goto('/login').catch(() => {});
		await page.waitForTimeout(500).catch(() => {});
		try {
			await DRAAIBOEK.cleanup(h, zaaisel);
		} catch (e) {
			console.error('CLEANUP MISLUKT — handmatig opruimen:', e?.message ?? e);
		}
	}
}
await browser.close();

// CSS-union over alle frames (Svelte/Vite injecteren per component eigen regels —
// één pagina alleen is dus niet genoeg) + fonts inline.
let css = [...cssRegels].join('\n');
if (DRAAIBOEK.fontsMap) {
	const map = resolve(HIER, DRAAIBOEK.fontsMap);
	if (!existsSync(map))
		throw new Error('fontsMap bestaat niet: ' + map + ' — pad is relatief aan de map van dit capture-script');
	const fontCache = {};
	css = css.replace(/url\((['"]?)([^'")]*fonts\/([^/'")]+\.woff2))\1\)/gi, (m, q, pad, bestand) => {
		fontCache[bestand] ??= readFileSync(resolve(map, bestand)).toString('base64');
		return `url(${q}data:font/woff2;base64,${fontCache[bestand]}${q})`;
	});
	console.log('fonts inline:', Object.keys(fontCache).join(', ') || 'geen');
}
css = css.replace(/url\((['"]?)(\/(?!\/)[^'")]+)\1\)/g, (m, q, pad) => `url(${q}${DRAAIBOEK.prod}${pad}${q})`);

writeFileSync(resolve(HIER, 'tour-assets.json'), JSON.stringify({ frames, css }));
console.log(frames.length, 'frames + css', Math.round(css.length / 1024) + 'kB', '→ tour-assets.json');
