/**
 * add-evals-to-skill — scaffold: generate evals/ for a target skill and
 * append an Evals section to its SKILL.md.
 *
 * Usage: node scaffold.mjs --skill <dir> [--force]
 * Refuses when: SKILL.md spec-problemen (fix first) of evals/ bestaat (extend instead).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HIER = dirname(fileURLToPath(import.meta.url));
const arg = (n) => {
	const i = process.argv.indexOf('--' + n);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const dir = resolve(arg('skill') ?? '.');
const force = process.argv.includes('--force');

// 1) analyse (hergebruik analyze.mjs) — netjes afvangen: exit 2 = spec-problemen
let analyse;
try {
	analyse = JSON.parse(execFileSync('node', [join(HIER, 'analyze.mjs'), '--skill', dir, '--json']).toString());
} catch (e) {
	console.error('STOP — los eerst de spec-problemen op:');
	const uit = ((e.stdout ?? '') + (e.stderr ?? '')).toString();
	try {
		for (const p of JSON.parse(uit).problemen ?? []) console.error('  - ' + p);
	} catch {
		console.error(uit.split('\n').slice(0, 3).join('\n'));
	}
	process.exit(2);
}
if (analyse.problemen.length) {
	console.error('STOP — los eerst de spec-problemen op:');
	for (const p of analyse.problemen) console.error('  - ' + p);
	process.exit(2);
}
if (analyse.bestaandeEvals && !force) {
	console.error('STOP — evals/ bestaat al: uitbreiden met nieuwe cases i.p.v. regenereren (of --force).');
	process.exit(3);
}
const naam = analyse.info.frontmatterNaam ?? analyse.info.naam;
const isScript = analyse.smaak !== 'instruction-skill';
console.log(`scaffold ${naam} · smaak: ${analyse.smaak}`);

const vul = (s) => s.replaceAll('__SKILLNAAM__', naam).replaceAll('__SKILLMAP__', dir.replaceAll('\\', '/'));
const schrijf = (pad, tekst) => {
	writeFileSync(pad, vul(tekst));
	console.log('  geschreven:', pad);
};

mkdirSync(join(dir, 'evals'), { recursive: true });

if (isScript) {
	mkdirSync(join(dir, 'evals', 'fixtures'), { recursive: true });
	schrijf(
		join(dir, 'evals', 'run.mjs'),
		readFileSync(join(HIER, '..', 'templates', 'run-script-skill.mjs'), 'utf8')
	);
	schrijf(
		join(dir, 'evals', 'cases.mjs'),
		readFileSync(join(HIER, '..', 'templates', 'cases-script-skill.mjs'), 'utf8')
	);
} else {
	mkdirSync(join(dir, 'evals', 'files'), { recursive: true });
	schrijf(
		join(dir, 'evals', 'evals.json'),
		readFileSync(join(HIER, '..', 'templates', 'evals.json'), 'utf8')
	);
	schrijf(
		join(dir, 'evals', 'grade.mjs'),
		readFileSync(join(HIER, '..', 'templates', 'grade.mjs'), 'utf8')
	);
}

// 2) Evals-sectie in SKILL.md (alleen als er nog geen is)
const skillPad = join(dir, 'SKILL.md');
const skillMd = readFileSync(skillPad, 'utf8');
if (/^## Evals$/m.test(skillMd)) {
	console.log('  SKILL.md heeft al een ## Evals-sectie — overgeslagen');
} else {
	const sectie = readFileSync(
		join(HIER, '..', 'templates', isScript ? 'sectie-script.md' : 'sectie-instructie.md'),
		'utf8'
	);
	writeFileSync(skillPad, skillMd.trimEnd() + '\n\n' + vul(sectie) + '\n');
	console.log('  ## Evals-sectie toegevoegd aan SKILL.md');
}
console.log('klaar — vervang nu de placeholders in cases.mjs/evals.json door echte cases (zie de add-evals-to-skill workflow).');
