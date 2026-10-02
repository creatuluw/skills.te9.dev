/**
 * eval-cases voor __SKILLNAAM__ (gegenereerd door add-evals-to-skill).
 * Elke case: { id, suite, naam, run(ctx) → { pass, details } }.
 * ctx = { skillDir (map van __SKILLNAAM__), cwd (waarvandaan gedraaid) }
 *
 * De skeleton-cases hieronder zijn een STARTPUNT. Vervang de TODO's door
 * echte cases die de concrete faalwijzen van dit skill bewaken:
 * deterministische checks eerst, één negatieve case, en alleen een
 * LLM-rechter (suite 'judge') voor wat echt semantisch is.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

export const CASES = [
	{
		id: 'skillmd-spec',
		suite: 'static',
		naam: 'SKILL.md voldoet aan de agentskills.io-spec (frontmatter, naam↔map)',
		run: ({ skillDir }) => {
			const md = readFileSync(join(skillDir, 'SKILL.md'), 'utf8');
			const fm = /^---\n([\s\S]*?)\n---\n/.exec(md);
			const problemen = [];
			if (!fm) problemen.push('geen frontmatter');
			else {
				const naam = /^name:\s*(.+)$/m.exec(fm[1])?.[1]?.trim();
				const desc = /^description:\s*(\S)/m.exec(fm[1]);
				if (!naam) problemen.push('name ontbreekt');
				else if (naam !== '__SKILLNAAM__') problemen.push(`name "${naam}" ≠ mapnaam "__SKILLNAAM__"`);
				if (!desc) problemen.push('description ontbreekt');
			}
			return { pass: problemen.length === 0, details: problemen.join(' · ') || 'spec ok' };
		}
	},
	{
		id: 'script-contract',
		suite: 'static',
		naam: 'TODO: hoofdstcript van __SKILLNAAM__ houdt zijn contract',
		run: (ctx) => {
			// TODO vervang dit door de échte contract-check, bijvoorbeeld:
			//   1. draai het script met een minimale fixture uit evals/fixtures/
			//   2. assert: exit 0, verwacht outputbestand bestaat en is geldig
			//   3. assert: structuur-invarianten van de output (velden, markup, …)
			// Voorbeeld-vorm:
			//   const uit = execFileSync('node', [join(ctx.skillDir, 'scripts', '…'), '--…'], { stdio: 'pipe' });
			//   const ok = existsSync(join(ctx.cwd, '…'));
			//   return { pass: ok, details: ok ? 'output aanwezig' : 'output ontbreekt' };
			return { pass: true, details: 'PLACEHOLDER — nog geen echte check; pas aan of verwijder deze case' };
		}
	},
	{
		id: 'negatief-case',
		suite: 'static',
		naam: 'TODO: slechte input wordt geweigerd (en niet stil geaccepteerd)',
		run: (ctx) => {
			// TODO vervang door een echte negatieve case: verzin de kapotte input
			// die dit skill per ongeluk zou kunnen accepteren (ontbrekend veld,
			// verkeerde verwijzing, kapot bestand in evals/fixtures/) en assert
			// dat het script faalt mét duidelijke foutmelding:
			//   try {
			//     execFileSync('node', [script, '--input', 'evals/fixtures/kapot.json'], { stdio: 'pipe' });
			//     return { pass: false, details: 'exit 0 bij kapotte input — validatie ontbreekt' };
			//   } catch (e) {
			//     const msg = (e.stderr ?? '') + (e.stdout ?? '');
			//     return { pass: /verwacht|ongeldige|ontbreekt/i.test(msg), details: msg.split('\n')[0].slice(0, 120) };
			//   }
			return { pass: true, details: 'PLACEHOLDER — nog geen echte check' };
		}
	}
	// Optioneel een LLM-rechter (draai expliciet met --suite judge):
	// {
	//   id: 'judge-output',
	//   suite: 'judge',
	//   naam: 'LLM-rechter beoordeelt de output tegen de rubric (pass/fail + redenering)',
	//   run: async (ctx) => { /* rubric + aanroep van jouw LLM-endpoint;
	//     pass/fail oordeel, redenering BINNEN het JSON-vonnis */ }
	// }
];
