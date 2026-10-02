/**
 * Eigen eval-suite van add-evals-to-skill (draai vanuit de skill-map).
 * Usage: node evals/run.mjs [--suite static]
 */
import { CASES } from './cases.mjs';

const arg = (n) => {
	const i = process.argv.indexOf('--' + n);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const suite = arg('suite') ?? 'all';
const gekozen = CASES.filter((c) => (suite === 'all' ? c.suite !== 'judge' : c.suite === suite));

let pass = 0,
	fail = 0;
for (const c of gekozen) {
	try {
		const r = await c.run({});
		if (r.pass) {
			pass++;
			console.log(`PASS  [${c.suite}] ${c.id} — ${c.naam}\n        ${r.details ?? ''}`);
		} else {
			fail++;
			console.log(`FAIL  [${c.suite}] ${c.id} — ${c.naam}\n        ${r.details ?? ''}`);
		}
	} catch (e) {
		fail++;
		console.log(`FAIL  [${c.suite}] ${c.id} — case crashte: ${String(e.message).slice(0, 200)}`);
	}
}
console.log(`\n${pass} PASS · ${fail} FAIL`);
process.exit(fail ? 1 : 0);
