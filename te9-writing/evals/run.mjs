/**
 * evals runner for te9-writing (structure follows add-evals-to-skill).
 *
 * Usage: node evals/run.mjs [--suite static|all]
 * Exit 0 = no FAIL.
 *
 * Paths: user inputs resolve against CWD; skill assets resolve against this
 * script's directory (skillDir), never mixed.
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
const chosen = CASES.filter((c) => (suite === 'all' ? c.suite !== 'judge' : c.suite === suite));

let pass = 0, fail = 0;
for (const c of chosen) {
	const label = `[${c.suite}] ${c.id}`;
	try {
		const r = await c.run(ctx);
		if (r.pass) {
			pass++;
			console.log(`PASS  ${label} — ${c.name}\n        ${r.details ?? ''}`);
		} else {
			fail++;
			console.log(`FAIL  ${label} — ${c.name}\n        ${r.details ?? ''}`);
		}
	} catch (e) {
		fail++;
		console.log(`FAIL  ${label} — ${c.name}\n        case crashed: ${String(e.message).slice(0, 200)}`);
	}
}
console.log(`\n${pass} PASS · ${fail} FAIL`);
process.exit(fail ? 1 : 0);
