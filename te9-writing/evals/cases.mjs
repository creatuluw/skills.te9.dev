/**
 * eval-cases for te9-writing (structure follows add-evals-to-skill).
 * Each case: { id, suite, name, run(ctx) → { pass, details } }.
 * ctx = { skillDir (te9-writing dir), cwd (where invoked from) }
 *
 * Deterministic-first: everything a script can check is a script check.
 * The linter IS the product surface here, so its contract is the suite.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';

function lint(ctx, args, opts = {}) {
	const f = join(ctx.skillDir, 'scripts', 'lint.mjs');
	try {
		const stdout = execFileSync('node', [f, ...args], { stdio: 'pipe', encoding: 'utf8', ...opts });
		return { code: 0, stdout };
	} catch (e) {
		return { code: e.status ?? 1, stdout: e.stdout ?? '', stderr: e.stderr ?? '' };
	}
}

const lintJson = (ctx, fixture, extra = []) => {
	const r = lint(ctx, ['--json', join(ctx.skillDir, 'evals', 'fixtures', fixture), ...extra]);
	return { code: r.code, report: JSON.parse(r.stdout) };
};

export const CASES = [
	{
		id: 'skillmd-spec',
		suite: 'static',
		name: 'SKILL.md follows the agentskills.io spec (frontmatter, name↔dir, description)',
		run: ({ skillDir }) => {
			const md = readFileSync(join(skillDir, 'SKILL.md'), 'utf8');
			const fm = /^---\n([\s\S]*?)\n---\n/.exec(md);
			const problems = [];
			if (!fm) problems.push('no frontmatter');
			else {
				const name = /^name:\s*(.+)$/m.exec(fm[1])?.[1]?.trim();
				const desc = /^description:\s*(\S.*)$/m.exec(fm[1])?.[1];
				if (!name) problems.push('name missing');
				else {
					if (name !== basename(skillDir)) problems.push(`name "${name}" ≠ dir "${basename(skillDir)}"`);
					if (name.length > 64) problems.push('name > 64 chars');
					if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) problems.push('name has invalid chars');
				}
				if (!desc) problems.push('description missing');
				else if (desc.length > 1024) problems.push(`description ${desc.length} > 1024 chars`);
			}
			return { pass: problems.length === 0, details: problems.join(' · ') || 'spec ok' };
		}
	},
	{
		id: 'lint-clean-on-style',
		suite: 'static',
		name: 'linter passes Patrick-style prose clean (0 hard, exit 0)',
		run: (ctx) => {
			const { code, report } = lintJson(ctx, 'patrick-post.md');
			const pass = code === 0 && report.hard.length === 0;
			return { pass, details: pass ? `${report.words} words clean` : `exit ${code}, hard: ${report.hard.map((h) => h.category + ':' + h.phrase).join(', ')}` };
		}
	},
	{
		id: 'lint-flags-slop',
		suite: 'static',
		name: 'linter flags a slop text hard (exit 1) with the expected categories present',
		run: (ctx) => {
			const { code, report } = lintJson(ctx, 'slop-post.md');
			const cats = new Set(report.hard.map((h) => h.category));
			const need = ['throat-clearing', 'filler', 'ai-vocab', 'colon-reveal', 'parallelism', 'chat-artifact', 'generic-conclusion', 'vague-attribution', 'false-range', 'copula-avoid'];
			const missing = need.filter((c) => !cats.has(c));
			const pass = code === 1 && report.hard.length >= 10 && missing.length === 0;
			return { pass, details: pass ? `${report.hard.length} hard findings, all expected categories` : `exit ${code}, ${report.hard.length} hard, missing: ${missing.join(', ') || 'none'}` };
		}
	},
	{
		id: 'lint-masks-quoted-code',
		suite: 'static',
		name: 'linter exempts fenced/blockquoted/quoted examples but catches the same phrase in prose',
		run: (ctx) => {
			const { code, report } = lintJson(ctx, 'masking.md');
			const ok = code === 1 && report.hard.length === 1 && report.hard[0].line === 9 && /worth noting/.test(report.hard[0].phrase);
			return { pass: ok, details: ok ? 'exactly 1 hard at L9' : `exit ${code}, hard: ${JSON.stringify(report.hard.map((h) => h.line + ':' + h.phrase))}` };
		}
	},
	{
		id: 'lint-strict-advisory',
		suite: 'static',
		name: 'advisories do not fail by default but do with --strict',
		run: (ctx) => {
			const plain = lintJson(ctx, 'advisory.md');
			const strict = lintJson(ctx, 'advisory.md', ['--strict']);
			const pass = plain.code === 0 && plain.report.advisory.length > 0 && strict.code === 1;
			return { pass, details: pass ? `plain exit 0 (${plain.report.advisory.length} advisory), strict exit 1` : `plain exit ${plain.code}, strict exit ${strict.code}` };
		}
	},
	{
		id: 'lint-rejects-missing-file',
		suite: 'static',
		name: 'bad input is rejected loudly (missing file → exit 2 + error message)',
		run: (ctx) => {
			const r = lint(ctx, [join(ctx.skillDir, 'evals', 'fixtures', 'does-not-exist.md')]);
			const msg = (r.stderr ?? '') + (r.stdout ?? '');
			const pass = r.code === 2 && /cannot read/i.test(msg);
			return { pass, details: pass ? 'exit 2 with clear message' : `exit ${r.code}: ${msg.split('\n')[0].slice(0, 100)}` };
		}
	},
	{
		id: 'skillmd-lints-clean',
		suite: 'static',
		name: 'dogfood: SKILL.md itself has 0 hard findings under its own linter',
		run: (ctx) => {
			const r = lint(ctx, ['--json', join(ctx.skillDir, 'SKILL.md')]);
			const rep = JSON.parse(r.stdout || '{}');
			const pass = (rep.hard ?? []).length === 0;
			return { pass, details: pass ? `0 hard findings (${(rep.advisory ?? []).length} advisory)` : `hard: ${JSON.stringify((rep.hard ?? []).map((h) => h.category + ':' + h.phrase))}` };
		}
	}
];
