/**
 * app-tour-demo — eval-runner.
 *
 * Evals volgen de OpenAI-best-practices: taak-specifiek, geautomatiseerd waar
 * kan (executable graders), negatieve cases, pass/fail boven open scoring,
 * en een optionele LLM-rechter mét rubric en redenering.
 *
 * Usage (vanuit het target-project, zodat Playwright en echte demo-artifacts
 * gevonden worden):
 *   node <skill>/evals/run.mjs                    # static + live
 *   node <skill>/evals/run.mjs --suite static     # alleen snelle checks
 *   node <skill>/evals/run.mjs --suite judge      # alleen de LLM-rechter
 *   node <skill>/evals/run.mjs --demos pad/naar/docs/demos
 *
 * Exit 0 = alles geslaagd (SKIP telt niet als falen); exit 1 = ≥1 FAIL.
 */
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, vindRealArtifacts } from './cases.mjs';

const arg = (naam) => {
	const i = process.argv.indexOf('--' + naam);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const suite = arg('suite') ?? 'all';
const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// echte artifacts zoeken: --demos, anders <cwd>/docs/demos, anders omhoog lopen
let demosDir = arg('demos');
if (arg('demos') === undefined) {
	for (let d = process.cwd(), i = 0; i < 8; i++, d = resolve(d, '..')) {
		const kandidaat = resolve(d, 'docs', 'demos');
		if (existsSync(kandidaat)) { demosDir = kandidaat; break; }
		demosDir = kandidaat;
	}
}
const demosOk = demosDir && existsSync(demosDir);

const tmpDir = resolve(skillDir, 'evals', '.tmp');
rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });

const real = vindRealArtifacts(demosOk ? demosDir : null);
console.log(`evals — suite: ${suite} · demos: ${demosOk ? demosDir : '(geen)'}`);
console.log(`  echte artifacts: ${real.assets.length} assets · ${real.steps.length} steps · ${real.players.length} spelers\n`);

const ctx = { skillDir, fixturesDir: resolve(skillDir, 'evals', 'fixtures'), tmpDir, demosDir, real };
const gekozen = CASES.filter((c) => suite === 'all' ? c.suite !== 'judge' : c.suite === suite);

let pass = 0, fail = 0;
for (const c of gekozen) {
	const label = `[${c.suite}] ${c.id}`;
	try {
		const r = await c.run(ctx);
		if (r.pass) { pass++; console.log(`PASS  ${label} — ${c.naam}\n        ${r.details ?? ''}`); }
		else { fail++; console.log(`FAIL  ${label} — ${c.naam}\n        ${r.details ?? ''}`); }
	} catch (e) {
		fail++;
		console.log(`FAIL  ${label} — ${c.naam}\n        case crashte: ${String(e.message).slice(0, 200)}`);
	}
}

rmSync(tmpDir, { recursive: true, force: true });
console.log(`\n${pass} PASS · ${fail} FAIL`);
process.exit(fail ? 1 : 0);
