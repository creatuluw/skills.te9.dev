/**
 * Eigen evals van add-evals-to-skill — bewijzen dat analyze + scaffold werken.
 * Draai: node evals/run.mjs   (vanuit de skill-map)
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, cpSync, rmSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = dirname(fileURLToPath(import.meta.url));
const SKILL = resolve(HIER, '..');
const TMP = join(HIER, '.tmp');

const spawn = (script, args) => {
	try {
		const out = execFileSync('node', [join(SKILL, 'scripts', script), ...args], { stdio: 'pipe' }).toString();
		return { code: 0, out };
	} catch (e) {
		return { code: e.status ?? 1, out: ((e.stdout ?? '') + (e.stderr ?? '')).toString() };
	}
};
const analyse = (dir) => spawn('analyze.mjs', ['--skill', dir, '--json']);

export const CASES = [
	{
		id: 'analyze-instructie',
		suite: 'static',
		naam: 'analyze herkent een instruction-skill',
		run: () => {
			const r = analyse(join(HIER, 'fixtures', 'reken-instructie'));
			const j = JSON.parse(r.out);
			return {
				pass: r.code === 0 && j.smaak === 'instruction-skill' && !j.bestaandeEvals,
				details: `exit ${r.code} · smaak ${j.smaak} · problemen: ${j.problemen.join(', ') || 'geen'}`
			};
		}
	},
	{
		id: 'analyze-script',
		suite: 'static',
		naam: 'analyze herkent een script-skill',
		run: () => {
			const r = analyse(join(HIER, 'fixtures', 'herhaal-script'));
			const j = JSON.parse(r.out);
			return {
				pass: r.code === 0 && j.smaak === 'script-skill' && j.scripts.includes('herhaal.mjs'),
				details: `exit ${r.code} · smaak ${j.smaak} · scripts: ${j.scripts.join(', ')}`
			};
		}
	},
	{
		id: 'analyze-kapot',
		suite: 'static',
		naam: 'analyze wijst spec-schendingen af (negatieve case)',
		run: () => {
			const r = analyse(join(HIER, 'fixtures', 'kapot-frontmatter'));
			const j = JSON.parse(r.out);
			const genoeg = j.problemen.length >= 2; // naam-mismatch/hoofdletter + description ontbreekt
			return {
				pass: r.code === 2 && genoeg,
				details: `exit ${r.code} · problemen: ${j.problemen.join(' · ')}`
			};
		}
	},
	{
		id: 'scaffold-script-skill',
		suite: 'static',
		naam: 'scaffold geeft een draaiende suite aan een script-skill (kopie, eind-tot-eind)',
		run: () => {
			rmSync(TMP, { recursive: true, force: true });
			mkdirSync(TMP, { recursive: true });
			const doel = join(TMP, 'herhaal-script');
			cpSync(join(HIER, 'fixtures', 'herhaal-script'), doel, { recursive: true });
			const s = spawn('scaffold.mjs', ['--skill', doel]);
			const runBestaat = existsSync(join(doel, 'evals', 'run.mjs'));
			const sectie = readFileSync(join(doel, 'SKILL.md'), 'utf8').includes('## Evals');
			// gegenereerde suite moet direct groen draaien (placeholders incl.)
			let run = { code: -1, out: 'niet gedraaid' };
			try {
				run.out = execFileSync('node', [join(doel, 'evals', 'run.mjs')], { stdio: 'pipe' }).toString();
				run.code = 0;
			} catch (e) {
				run.out = ((e.stdout ?? '') + (e.stderr ?? '')).toString();
			}
			rmSync(TMP, { recursive: true, force: true });
			return {
				pass: s.code === 0 && runBestaat && sectie && run.code === 0,
				details: `scaffold exit ${s.code} · run.mjs ${runBestaat ? '✓' : '✗'} · sectie ${sectie ? '✓' : '✗'} · suite exit ${run.code}: ${run.out.trim().split('\n').pop() ?? ''}`
			};
		}
	},
	{
		id: 'scaffold-instructie-skill',
		suite: 'static',
		naam: 'scaffold geeft evals.json + grader aan een instruction-skill',
		run: () => {
			rmSync(TMP, { recursive: true, force: true });
			mkdirSync(TMP, { recursive: true });
			const doel = join(TMP, 'reken-instructie');
			cpSync(join(HIER, 'fixtures', 'reken-instructie'), doel, { recursive: true });
			const s = spawn('scaffold.mjs', ['--skill', doel]);
			const evalsJson = existsSync(join(doel, 'evals', 'evals.json'));
			const grader = existsSync(join(doel, 'evals', 'grade.mjs'));
			const naamOK = readFileSync(join(doel, 'evals', 'evals.json'), 'utf8').includes('"skill_name": "reken-instructie"');
			const sectie = readFileSync(join(doel, 'SKILL.md'), 'utf8').includes('## Evals');
			rmSync(TMP, { recursive: true, force: true });
			return {
				pass: s.code === 0 && evalsJson && grader && naamOK && sectie,
				details: `exit ${s.code} · evals.json ${evalsJson ? '✓' : '✗'} · grade.mjs ${grader ? '✓' : '✗'} · naam gevuld ${naamOK ? '✓' : '✗'} · sectie ${sectie ? '✓' : '✗'}`
			};
		}
	},
	{
		id: 'scaffold-weigert-tweede-keer',
		suite: 'static',
		naam: 'scaffold weigert wanneer evals/ al bestaat (negatieve case)',
		run: () => {
			rmSync(TMP, { recursive: true, force: true });
			mkdirSync(TMP, { recursive: true });
			const doel = join(TMP, 'herhaal-script');
			cpSync(join(HIER, 'fixtures', 'herhaal-script'), doel, { recursive: true });
			spawn('scaffold.mjs', ['--skill', doel]);
			const tweede = spawn('scaffold.mjs', ['--skill', doel]);
			rmSync(TMP, { recursive: true, force: true });
			return {
				pass: tweede.code === 3,
				details: `tweede scaffold exit ${tweede.code} (3 = geweigerd) — ${tweede.out.split('\n')[0].slice(0, 90)}`
			};
		}
	},
	{
		id: 'scaffold-weigert-kapot',
		suite: 'static',
		naam: 'scaffold weigert een spec-kapotte skill (negatieve case)',
		run: () => {
			const r = spawn('scaffold.mjs', ['--skill', join(HIER, 'fixtures', 'kapot-frontmatter')]);
			return { pass: r.code === 2, details: `exit ${r.code} — ${r.out.split('\n')[0].slice(0, 90)}` };
		}
	}
];
