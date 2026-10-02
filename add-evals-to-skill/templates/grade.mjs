/**
 * Grader-aggregator voor prompt-cases (gegenereerd door add-evals-to-skill).
 *
 * Verwacht per iteration-workspace:
 *   <workspace>/eval-*/with_skill/grading.json   { "assertion_results": [{text,passed,evidence}], … }
 *   <workspace>/eval-*/without_skill/grading.json
 *   (optioneel) timing.json: { "total_tokens": n, "duration_ms": n }
 *
 * Usage: node evals/grade.mjs --workspace <iteration-map>
 * Schrijft <workspace>/benchmark.json met pass-rates en de delta.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const arg = (n) => {
	const i = process.argv.indexOf('--' + n);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const ws = resolve(arg('workspace') ?? '.');
if (!existsSync(ws)) {
	console.error('workspace bestaat niet: ' + ws);
	process.exit(1);
}

const stats = (vals) => {
	if (!vals.length) return { n: 0 };
	const gem = vals.reduce((a, b) => a + b, 0) / vals.length;
	const afw = Math.sqrt(vals.reduce((a, b) => a + (b - gem) ** 2, 0) / vals.length);
	return { mean: +gem.toFixed(2), stddev: +afw.toFixed(2), n: vals.length };
};

const resultaat = { run_summary: {}, gegenereerd: new Date().toISOString() };
for (const configuratie of ['with_skill', 'without_skill']) {
	const passRates = [];
	const tokens = [];
	const seconden = [];
	for (const map of readdirSync(ws, { withFileTypes: true })) {
		if (!map.isDirectory() || !map.name.startsWith('eval-')) continue;
		const pad = join(ws, map.name, configuratie);
		const grading = join(pad, 'grading.json');
		if (!existsSync(grading)) continue;
		const g = JSON.parse(readFileSync(grading, 'utf8'));
		const results = g.assertion_results ?? [];
		if (!results.length) continue;
		passRates.push(results.filter((r) => r.passed).length / results.length);
		const timing = join(pad, 'timing.json');
		if (existsSync(timing)) {
			const t = JSON.parse(readFileSync(timing, 'utf8'));
			if (t.total_tokens) tokens.push(t.total_tokens);
			if (t.duration_ms) seconden.push(t.duration_ms / 1000);
		}
	}
	resultaat.run_summary[configuratie] = {
		pass_rate: stats(passRates),
		tokens: stats(tokens),
		time_seconds: stats(seconden)
	};
}

const d = resultaat.run_summary;
if (d.with_skill && d.without_skill) {
	resultaat.delta = {
		pass_rate: +(d.with_skill.pass_rate.mean - d.without_skill.pass_rate.mean).toFixed(2),
		tokens: d.with_skill.tokens.mean && d.without_skill.tokens.mean
			? +(d.with_skill.tokens.mean - d.without_skill.tokens.mean).toFixed(0)
			: null,
		time_seconds: d.with_skill.time_seconds.mean && d.without_skill.time_seconds.mean
			? +(d.with_skill.time_seconds.mean - d.without_skill.time_seconds.mean).toFixed(1)
			: null
	};
}
writeFileSync(join(ws, 'benchmark.json'), JSON.stringify(resultaat, null, 2));
console.log(JSON.stringify(resultaat.run_summary, null, 2));
console.log('delta:', JSON.stringify(resultaat.delta ?? {}));
console.log('→ ' + join(ws, 'benchmark.json'));
