/**
 * Eval-cases voor app-tour-demo. Zie run.mjs voor de runner en SKILL.md §Evals
 * voor het beleid. Elke case: { id, suite, naam, run(ctx) → { pass, details } }.
 * Weggelaten data → gooi een Skip (geen FAIL): de suite moet overleven op
 * projecten zonder bestaande tours.
 *
 * ctx = { skillDir, fixturesDir, tmpDir, demosDir, real: {assets, steps, players} }
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const lees = (p) => readFileSync(p, 'utf8');
const json = (p) => JSON.parse(lees(p));

function wandel(dir, uit) {
	for (const ent of readdirSync(dir, { withFileTypes: true })) {
		const p = resolve(dir, ent.name);
		if (ent.isDirectory()) wandel(p, uit);
		else if (ent.name === 'tour-assets.json') uit.assets.push(p);
		else if (ent.name === 'steps.json') uit.steps.push(p);
		else if (/tour\.html$/.test(ent.name) && ent.name !== 'declaraties-demo.html') uit.players.push(p);
	}
}

export function vindRealArtifacts(demosDir) {
	const real = { assets: [], steps: [], players: [] };
	if (demosDir && existsSync(demosDir)) wandel(demosDir, real);
	return real;
}

const checkNawerking = (stappen, label) => {
	const issues = [];
	if (!Array.isArray(stappen) || stappen.length === 0) return [`geen stappen in ${label}`];
	for (const [i, s] of stappen.entries()) {
		const waar = `${label} stap ${i} (${s.f ?? '?'})`;
		if (!s.cap || !s.cap.trim()) issues.push(`${waar}: cap ontbreekt`);
		const tekst = (s.tekst ?? '').trim();
		if (tekst.length < 20 || tekst.length > 240)
			issues.push(`${waar}: tekst ${tekst.length} tekens (buiten 20-240)`);
		if (s.act === 'click' && !s.klaar) issues.push(`${waar}: click-stap zonder klaar-regel`);
		for (const veld of ['cap', 'tekst', 'klaar'])
			if ((s[veld] ?? '').includes('—') || (s[veld] ?? '').includes('–'))
				issues.push(`${waar}: ${veld} bevat een em-gedachte-streep (gebruik een koppelteken)`);
	}
	return issues;
};

export const CASES = [
	{
		id: 'template-markers',
		suite: 'static',
		naam: 'player-template draagt alle 6 markers onaangetast',
		run: ({ skillDir }) => {
			const t = lees(resolve(skillDir, 'templates', 'player.html'));
			const nodig = ['__FRAMES__', '__CSS__', '__STAPPEN__', '__EINDTEKST__', '__PAGINATITEL__', '__BADGE__'];
			const missend = nodig.filter((m) => !t.includes(m));
			return { pass: missend.length === 0, details: missend.length ? 'missend: ' + missend.join(', ') : nodig.length + ' markers aanwezig' };
		}
	},
	{
		id: 'build-mini',
		suite: 'static',
		naam: 'build maakt een werkende speler uit de mini-fixtures',
		run: (ctx) => {
			const uit = resolve(ctx.tmpDir, 'mini-tour.html');
			const out = execFileSync('node', [
				resolve(ctx.skillDir, 'scripts', 'build.mjs'),
				'--assets', resolve(ctx.fixturesDir, 'mini-assets.json'),
				'--steps', resolve(ctx.fixturesDir, 'mini-steps.json'),
				'--out', uit
			]).toString();
			const html = lees(uit);
			const missend = ['__FRAMES__', '__CSS__', '__STAPPEN__', '__EINDTEKST__', '__PAGINATITEL__', '__BADGE__'].filter((m) => html.includes(m));
			return {
				pass: existsSync(uit) && missend.length === 0 && html.includes('Mini - rondleiding'),
				details: out.trim() + (missend.length ? ' · niet-vervangen markers: ' + missend.join(', ') : '')
			};
		}
	},
	{
		id: 'build-rejects-bad',
		suite: 'static',
		naam: 'build weigert stappen die naar ontbrekende frames verwijzen (negatieve case)',
		run: (ctx) => {
			try {
				execFileSync('node', [
					resolve(ctx.skillDir, 'scripts', 'build.mjs'),
					'--assets', resolve(ctx.fixturesDir, 'mini-assets.json'),
					'--steps', resolve(ctx.fixturesDir, 'bad-steps.json'),
					'--out', resolve(ctx.tmpDir, 'mag-niet-bestaan.html')
				], { stdio: 'pipe' });
				return { pass: false, details: 'build sloot af met exit 0 — de validatie ontbreekt of werkt niet' };
			} catch (e) {
				const msg = (e.stderr?.toString() ?? '') + (e.stdout?.toString() ?? '');
				return { pass: msg.includes('ontbrekende frames'), details: 'correct geweigerd: ' + msg.split('\n')[0].slice(0, 120) };
			}
		}
	},
	{
		id: 'escape-script-tags',
		suite: 'static',
		naam: 'build escaped </script> in frame-inhoud (<\\/script>)',
		run: (ctx) => {
			const html = lees(resolve(ctx.tmpDir, 'mini-tour.html'));
			const datalijn = html.slice(html.indexOf('const FRAMES'), html.indexOf('const CSS'));
			const ontsnapt = datalijn.includes('<\\/script>');
			const zonderEscapes = datalijn.split('<\\/script>').join('');
			const rauw = zonderEscapes.includes('</script>');
			return {
				pass: ontsnapt && !rauw,
				details: `ontsnapt: ${ontsnapt} · rauw aanwezig: ${rauw}`
			};
		}
	},
	{
		id: 'narration-rubric',
		suite: 'static',
		naam: 'nawerking-rubric: cap+tekst per stap, klaar per klik, geen em-strepen, lengte 20-240',
		run: (ctx) => {
			const bronnen = [resolve(ctx.fixturesDir, 'mini-steps.json'), ...ctx.real.steps];
			const perBron = bronnen.filter(existsSync).map((p) => {
				const stappen = json(p).stappen ?? json(p);
				return checkNawerking(stappen, p.split(/[\\/]/).pop());
			});
			const issues = perBron.flat();
			return { pass: issues.length === 0, details: issues.length ? issues.slice(0, 8).join(' · ') : `${bronnen.length} steps-bestanden schoon` };
		}
	},
	{
		id: 'frame-gebruik',
		suite: 'static',
		naam: 'elke stap verwijst naar een bestaand frame en elk frame komt voorbij',
		run: (ctx) => {
			const issues = [];
			for (const assetsPad of [resolve(ctx.fixturesDir, 'mini-assets.json'), ...ctx.real.assets]) {
				if (!existsSync(assetsPad)) continue;
				const naam = assetsPad.split(/[\\/]/).pop();
				const map = resolve(dirname(assetsPad), 'steps.json');
				if (!existsSync(map)) continue;
				const frames = json(assetsPad).frames.map((f) => f.naam);
				const stappen = json(map).stappen ?? json(map);
				for (const [i, s] of stappen.entries()) if (!frames.includes(s.f)) issues.push(`${naam} stap ${i}: onbekend frame ${s.f}`);
				for (const f of frames) if (!stappen.some((s) => s.f === f)) issues.push(`${naam}: frame ${f} wordt door geen enkele stap gebruikt`);
			}
			return { pass: issues.length === 0, details: issues.length ? issues.slice(0, 8).join(' · ') : 'frames ↔ stappen consistent' };
		}
	},
	{
		id: 'css-invariants',
		suite: 'static',
		naam: 'css-blob: geen relatieve url(/, fonts inline als base64',
		run: (ctx) => {
			const issues = [];
			for (const p of ctx.real.assets) {
				const css = json(p).css ?? '';
				if (/url\((['"]?)\/(?!\/)/.test(css)) issues.push(p + ': bevat nog url(/…)');
				if (!css.includes('data:font/woff2;base64')) issues.push(p + ': geen inline fonts');
			}
			return { pass: issues.length === 0, details: issues.length ? issues.slice(0, 5).join(' · ') : ctx.real.assets.length + ' assets schoon' };
		}
	},
	{
		id: 'player-structuur',
		suite: 'static',
		naam: 'gebouwde spelers: ondertitel + klaar-systeem + anchors + inline fonts',
		run: (ctx) => {
			const issues = [];
			for (const p of ctx.real.players) {
				const h = lees(p);
				for (const [naam, naald] of [
					['ondertitel-balk', 'id="ondertitel"'],
					['klaar-functie', 'function toonKlaar'],
					['cursor-schaalbewust', 'function doelPositie'],
					['inline fonts', 'data:font/woff2;base64'],
					['anchors', 'data-demo-anchor']
				])
					if (!h.includes(naald)) issues.push(`${p.split(/[\\/]/).pop()}: mist ${naam}`);
			}
			return { pass: issues.length === 0, details: issues.length ? issues.slice(0, 5).join(' · ') : ctx.real.players.length + ' spelers compleet' };
		}
	},
	{
		id: 'live-cases-tour',
		suite: 'live',
		naam: 'cases-tour speelt foutloos tot de eind-kaart (executable eval)',
		run: async (ctx) => await liveCheck(ctx, 'cases-tour.html')
	},
	{
		id: 'live-declaraties-tour',
		suite: 'live',
		naam: 'declaraties-tour speelt foutloos tot de eind-kaart (executable eval)',
		run: async (ctx) => await liveCheck(ctx, 'declaraties-tour.html')
	},
	{
		id: 'judge-narration',
		suite: 'judge',
		naam: 'LLM-rechter beoordeelt de nawerking tegen de rubric (pass/fail + redenen)',
		run: async (ctx) => {
			const { chromium } = (await import('node:module')).createRequire(process.cwd() + '/package.json')('@playwright/test');
			const RUBRIEK = `Je beoordeelt de ondertiteling van een productdemo-speler (NL, publiek: gewone collega's).
Beoordeel streng maar eerlijk. Antwoord met STRICT JSON en niets anders:
{"redenering": "<korte afweging>", "pass": <boolean>, "issues": [<string>]}
Rubric — pass=true alleen als ALLES geldt:
1. Elke stap-tekst zegt wat er gedaan wordt ÉN welk doel het heeft (niet alleen "wat").
2. Elke actie (anchor+click/type) wordt gevolgd door een resultaat-regel (klaar) die benoemt wat het opleverde.
3. Gewone, concrete taal - geen tech-jargon, geen Engelstalige termen waar Nederlands kan.
4. Zinnen van gemiddelde lengte (max ~40 woorden), leesbaar als ondertitel.
5. Scherm-tot-scherm-overgangen worden uitgelegd (hoe je op het volgende scherm komt).
6. Geen em-gedachte-strepen (—), alleen koppeltekens.`;
			if (!ctx.real.steps.length) return { pass: false, details: 'geen steps.json gevonden om te beoordelen' };
			const browser = await chromium.launch();
			try {
				const context = await browser.newContext({ baseURL: process.env.APPD_JUDGE_BASE ?? 'http://localhost:7034' });
				// login via .env (zelfde loop als capture.mjs)
				for (let d = process.cwd(), i = 0; i < 8; i++, d = resolve(d, '..')) {
					if (existsSync(resolve(d, '.env'))) {
						const env = Object.fromEntries(
							lees(resolve(d, '.env'))
								.split(/\r?\n/)
								.filter((l) => /^[A-Z0-9_]+=/.test(l))
								.map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)])
						);
						const login = await context.request.post('/api/auth/login', {
							data: { email: env.LOGIN_EMAIL, password: env.LOGIN_PASSWORD }
						});
						const body = await login.json();
						if (!body?.data) throw new Error('judge-login mislukt');
						const page = await context.newPage();
						await page.goto('/login');
						await page.evaluate((d) => {
							localStorage.setItem('auth_data', JSON.stringify(d));
							localStorage.setItem('auth', 'true');
						}, body.data);
						const stappen = ctx.real.steps.flatMap((p) => (json(p).stappen ?? json(p)).map((s) => ({ f: s.f, cap: s.cap, tekst: s.tekst, act: s.act ?? null, klaar: s.klaar ?? null })));
						const antwoord = await page.evaluate(async ({ RUBRIEK, stappen }) => {
							const csrf = document.cookie.split('; ').find((c) => c.startsWith('csrf_token='))?.split('=')[1];
							const res = await fetch('/api/chat/deepseek/complete', {
								method: 'POST',
								headers: { 'content-type': 'application/json', ...(csrf ? { 'x-csrf-token': csrf } : {}) },
								body: JSON.stringify({
										messages: [
											{ role: 'system', content: RUBRIEK },
											{ role: 'user', content: 'Beoordeel deze stappen:\n' + JSON.stringify(stappen) }
										],
										temperature: 0,
										// service-contract is camelCase; 'none' = reasoning uit (anders eet GLM het budget leeg)
										maxTokens: 4000,
										reasoningEffort: 'none',
										responseFormat: { type: 'json_object' }
										})
							});
							return await res.json();
						}, { RUBRIEK, stappen });
						const tekst = antwoord?.content ?? antwoord?.choices?.[0]?.message?.content ?? '';
						if (!tekst.trim())
							return {
								pass: false,
								details: 'rechter gaf lege content (finishReason: ' + (antwoord?.finishReason ?? '?') + ') — verhoog maxTokens of zet reasoningEffort uit'
							};
						let vonnis;
						const blok = tekst.match(/\{[\s\S]*\}/); // grootste blok van eerste tot laatste accolade
						try {
							vonnis = JSON.parse(blok ? blok[0] : tekst);
						} catch {
							// fallback: laatste platte object mét pass-kenmerk (redenering kan accolades bevatten)
							const plat = tekst.match(/\{[^{}]*"pass"[^{}]*\}/s);
							try {
								vonnis = JSON.parse(plat[0]);
							} catch {
								return { pass: false, details: 'rechter gaf geen parseerbaar JSON: ' + tekst.slice(0, 160) };
							}
						}
						const ok = vonnis.pass === true || vonnis.pass === 'true';
						const issues = (vonnis.issues ?? []).slice(0, 5).join(' · ');
						return {
							pass: ok,
							details: issues || (ok ? 'rubric gehaald' : 'rechter oordeelde pass=' + JSON.stringify(vonnis.pass) + ' zonder issues')
						};
					}
				}
				return { pass: false, details: 'geen .env gevonden voor judge-login' };
			} finally {
				await browser.close();
			}
		}
	}
];

async function liveCheck(ctx, bestand) {
	if (!existsSync(resolve(ctx.demosDir, bestand)) && !ctx.real.players.some((p) => p.endsWith(bestand)))
		return { pass: false, details: bestand + ' niet gevonden' };
	const doel = ctx.real.players.find((p) => p.endsWith(bestand)) ?? resolve(ctx.demosDir, bestand);
	try {
		const out = execFileSync('node', [resolve(ctx.skillDir, 'scripts', 'verify.mjs'), '--demo', doel], {
			stdio: 'pipe',
			timeout: 300000
		}).toString();
		return { pass: out.includes('GESLAAGD'), details: out.trim().split('\n').slice(0, 3).join(' · ') };
	} catch (e) {
		const out = ((e.stdout ?? '') + (e.stderr ?? '')).toString();
		return { pass: false, details: out.trim().split('\n').slice(0, 3).join(' · ') || String(e.message).slice(0, 120) };
	}
}
