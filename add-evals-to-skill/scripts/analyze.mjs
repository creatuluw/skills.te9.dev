/**
 * add-evals-to-skill — analyze: report a target skill's shape and eval needs.
 * Usage: node analyze.mjs --skill <dir> [--json]
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, basename, join } from 'node:path';

const arg = (n) => {
	const i = process.argv.indexOf('--' + n);
	return i > 0 ? process.argv[i + 1] : undefined;
};
const dir = resolve(arg('skill') ?? '.');
const alsJson = process.argv.includes('--json');

function analyseer(dir) {
	const problemen = [];
	const info = { dir, naam: basename(dir) };

	if (!existsSync(dir) || !statSync(dir).isDirectory()) {
		problemen.push('map bestaat niet');
		return { info, problemen, smaak: null, bestaandeEvals: false };
	}
	const skillPad = join(dir, 'SKILL.md');
	if (!existsSync(skillPad)) {
		problemen.push('SKILL.md ontbreekt (verplicht volgens de agentskills.io-spec)');
		return { info, problemen, smaak: null, bestaandeEvals: false };
	}

	const inhoud = readFileSync(skillPad, 'utf8');
	info.regels = inhoud.split('\n').length;

	// frontmatter
	const fm = /^---\n([\s\S]*?)\n---\n/.exec(inhoud);
	if (!fm) {
		problemen.push('geen YAML-frontmatter');
	} else {
		const naam = /^name:\s*(.+)$/m.exec(fm[1])?.[1]?.trim();
		const beschrijving = /^description:\s*([\s\S]+?)(?=\n\w+:|\n*$)/m.exec(fm[1])?.[1]?.trim();
		if (!naam) problemen.push('frontmatter: name ontbreekt (verplicht)');
		else {
			info.frontmatterNaam = naam;
			if (naam !== info.naam) problemen.push(`name "${naam}" ≠ mapnaam "${info.naam}"`);
			if (naam.length > 64) problemen.push('name langer dan 64 tekens');
			if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(naam))
				problemen.push('name mag alleen kleine letters, cijfers en losse koppeltekens bevatten');
		}
		if (!beschrijving) problemen.push('frontmatter: description ontbreekt (verplicht)');
		else if (beschrijving.length > 1024) problemen.push('description langer dan 1024 tekens');
	}

	if (info.regels > 500)
		problemen.push(`SKILL.md is ${info.regels} regels (>500 aanbevolen) — verhuis detail naar references/`);

	// smaak: scripts met logica? templates?
	const heeft = (sub) => existsSync(join(dir, sub)) && statSync(join(dir, sub)).isDirectory();
	const lijst = (sub, exts) =>
		heeft(sub) ? readdirSync(join(dir, sub)).filter((f) => exts.some((e) => f.endsWith(e))) : [];
	const scripts = [...lijst('scripts', ['.mjs', '.js', '.cjs', '.py', '.sh']), ...lijst('', ['.mjs', '.py'])];
	const templates = lijst('templates', ['.html', '.md', '.json', '.txt', '.mjs', '.py']);

	// bestaande evals
	const bestaandeEvals = heeft('evals') || existsSync(join(dir, 'evals', 'evals.json'));

	const smaak =
		scripts.length > 0 || templates.length > 0
			? scripts.length > 0
				? 'script-skill'
				: 'script-skill (alleen templates)'
			: 'instruction-skill';

	return {
		info,
		problemen,
		smaak,
		scripts,
		templates,
		references: lijst('references', ['.md']),
		bestaandeEvals,
		advies: bestaandeEvals
			? 'heeft al evals/ — uitbreiden met nieuwe cases i.p.v. overschrijven'
			: problemen.length === 0
				? `scaffoldbaar als ${smaak}`
				: 'los eerst de spec-problemen op'
	};
}

const uitslag = analyseer(dir);
if (alsJson) console.log(JSON.stringify(uitslag, null, 2));
else {
	console.log('skill:', uitslag.info.dir);
	console.log('smaak:', uitslag.smaak ?? 'onbekend');
	console.log('scripts:', uitslag.scripts?.join(', ') || 'geen', '· templates:', uitslag.templates?.join(', ') || 'geen');
	console.log('bestaande evals:', uitslag.bestaandeEvals ? 'JA' : 'nee');
	console.log('spec-problemen:', uitslag.problemen.length ? uitslag.problemen.join(' · ') : 'geen');
	console.log('advies:', uitslag.advies);
}
process.exit(uitslag.problemen.length ? 2 : 0);
