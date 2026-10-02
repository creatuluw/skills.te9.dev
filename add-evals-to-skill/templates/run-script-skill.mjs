/**
 * evals-runner voor __SKILLNAAM__ (gegenereerd door add-evals-to-skill).
 *
 * Usage: node evals/run.mjs [--suite static|live|judge|all]
 * (alleen de suites die je in cases.mjs definieert draaien mee)
 * Exit 0 = geen FAIL.
 *
 * PAS OP paden: inputs van de gebruiker/CWD resolven; skill-eigen assets
 * tegen deze script-map. Dependencies van het target-project komen via
 * createRequire(process.cwd()).
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES } from './cases.mjs';

const arg = (n) => {
	const i = process.argv.indexOf('--' + n);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const suite = arg('suite') ?? 'all';
const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ctx = { skillDir, cwd: process.cwd() };
const gekozen = CASES.filter((c) => (suite === 'all' ? c.suite !== 'judge' : c.suite === suite));

let pass = 0,
	fail = 0;
for (const c of gekozen) {
	const label = `[${c.suite}] ${c.id}`;
	try {
		const r = await c.run(ctx);
		if (r.pass) {
			pass++;
			console.log(`PASS  ${label} — ${c.naam}\n        ${r.details ?? ''}`);
		} else {
			fail++;
			console.log(`FAIL  ${label} — ${c.naam}\n        ${r.details ?? ''}`);
		}
	} catch (e) {
		fail++;
		console.log(`FAIL  ${label} — ${c.naam}\n        case crashte: ${String(e.message).slice(0, 200)}`);
	}
}
console.log(`\n${pass} PASS · ${fail} FAIL`);
process.exit(fail ? 1 : 0);
