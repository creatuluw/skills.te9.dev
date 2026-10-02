#!/usr/bin/env node
/**
 * lint.mjs — deterministic AI-tell & style linter for te9-writing.
 * Zero dependencies. Node 20+.
 *
 * Two tiers:
 *   HARD     AI tells that must never ship (exit 1 if any)
 *   ADVISORY style/structure review points (exit 1 only with --strict)
 *
 * Code fences, inline code, quoted spans, and blockquote lines are masked
 * before scanning (quoted examples are exempt by default, per unslop).
 * Usage:
 *   node lint.mjs <file>          human report
 *   node lint.mjs --json <file>   JSON report
 *   echo "text" | node lint.mjs   stdin
 *   node lint.mjs --strict <file> advisories also fail
 * Exit codes: 0 clean · 1 findings · 2 usage error.
 */
import { readFileSync } from 'node:fs';

// --- catalog ---------------------------------------------------------------
// id, regex (use /g), why (shown to the agent), fix (replacement advice)
const HARD = [
	{ id: 'throat-clearing', re: /\b(?:here'?s the thing|it turns out|let me be clear|the truth is|let'?s be real|let'?s dive in|let'?s unpack|let'?s explore|let'?s examine|let'?s break this down|let'?s take a look|this is where it gets interesting|buckle up|here'?s why)\b/gi,
		why: 'throat-clearing AI opener', fix: 'delete; start at the content' },
	{ id: 'emphasis-crutch', re: /\b(?:full stop|let that sink in|make no mistake|read that again|this cannot be overstated)\b\.?/gi,
		why: 'manufactured importance', fix: 'delete; let content carry it' },
	{ id: 'emphasis-real', re: /\b(?:the|that|this)\s+(?:struggle|stakes|pain|threat|risk|danger|fear|hype|magic|hustle|grind)\s+(?:is|are|was|were)\s+(?:very\s|so\s|all too\s)?real\b/gi,
		why: '"X is real" significance inflation', fix: 'name the concrete consequence' },
	{ id: 'ai-vocab', re: /\b(?:delve|delving|delved|tapestry|underscore[sd]?|underscoring|multifaceted|paramount|notwithstanding|aforementioned|henceforth|burgeoning|garner(?:ed|s|ing)?|intricate(?:ly)?|interplay|seamless(?:ly)?|utilize[sd]?|robust(?:ly|ness)?|pivotal|comprehensive(?:ly)?|leverage[sd]?|leveraging|synerg(?:y|ies|istic|ies)|fosters?|fostering|bolster(?:s|ing)?|spearhead(?:s|ing)?|streamline[sd]?|game[- ]changer|cutting-edge|state-of-the-art|best-in-class|world-class|thought leader(?:ship)?|low-hanging fruit|navigating the complexit(?:y|ies)|sheds light|strike[sd]? a balance|paints? a picture|double-edged sword|ever-evolving|ever-changing)\b/gi,
		why: 'AI/business vocabulary', fix: 'plain equivalent: use, show, help, strong, full, important' },
	{ id: 'jargon-phrase', re: /\b(?:moving forward|circle back|touch base|on the same page|level up|double down|take a step back|deep dive|lean into|disrupt(?:ing)? the)\b/gi,
		why: 'business jargon', fix: 'say the plain action' },
	{ id: 'filler', re: /\b(?:it'?s worth noting(?: that)?|it is (?:important|worth) to note(?: that)?|needless to say|it goes without saying|at the end of the day|the bottom line is|the key takeaway|at its core|in a world where|in an era of|the reality is|it'?s clear that|what'?s clear is|due to the fact that|at this point in time|in the event that|in today'?s\s+[\w-]+)\b/gi,
		why: 'empty filler phrase', fix: 'cut, or the two-word plain form' },
	{ id: 'filler-opener', re: /(?:^|[.!?]\s+|\n)(?:interestingly|importantly|crucially|fundamentally),/gi,
		why: 'sentence-initial filler adverb', fix: 'cut — show it instead' },
	{ id: 'parallelism', re: /\b(?:not only\b[^.!?\n]{0,80}\bbut also|not merely\b|not just\b[^.!?\n]{0,60}\b(?:but|they'?re|it'?s)\b|it'?s not (?:just|only|merely) about|(?:isn'?t|aren'?t)\s+(?:a |an |the )?[^,.!?\n]{2,45},\s+(?:it'?s|that'?s|they'?re)\s)/gi,
		why: 'negative parallelism ("not X but Y")', fix: 'state the claim once, directly' },
	{ id: 'colon-reveal', re: /\bthe\s+(?:answer|secret|key|trick|truth|reality|problem|solution|takeaway|lesson|difference|reason)\s+(?:is|was|isn'?t)\s*:/gi,
		why: 'colon-reveal drumroll', fix: 'give the answer, drop the drumroll' },
	{ id: 'meta', re: /\b(?:let me explain|to put it simply|in other words|pro tip|hot take|unpopular opinion|spoiler alert|plot twist|here'?s the deal)\b/gi,
		why: 'meta-commentary', fix: 'just do the thing' },
	{ id: 'copula-avoid', re: /\b(?:serve[sd]? as a|stand[sd]? as a|constitute[sd]? a|functions? as a|operates? as a)\b/gi,
		why: 'copula avoidance', fix: '"is"' },
	{ id: 'significance', re: /\b(?:stands? as a testament|pivotal moment|indelible mark|rich tapestry|cornerstone of)\b/gi,
		why: 'significance inflation', fix: 'name what actually happened' },
	{ id: 'vague-attribution', re: /\b(?:experts argue|industry reports (?:say|suggest)|some critics|many believe|it is widely (?:regarded|accepted)|studies suggest)\b/gi,
		why: 'vague attribution', fix: 'name the source or drop the claim' },
	{ id: 'ing-analysis', re: /,\s+(?:highlighting|showcasing|underscoring|demonstrating|reflecting|signaling|signalling|paving the way(?: for)?)/gi,
		why: 'superficial trailing -ing analysis', fix: 'separate sentence with a real subject' },
	{ id: 'generic-conclusion', re: /\b(?:the future looks bright|only time will tell|exciting times lie ahead|one thing is certain|continues to evolve)\b/gi,
		why: 'generic AI conclusion', fix: 'end on the concrete next step' },
	{ id: 'chat-artifact', re: /\b(?:i hope this helps|happy to help|great question|as an ai language model|as of my (?:last knowledge update|knowledge cutoff)|based on my training data)\b/gi,
		why: 'chatbot artifact — instant LLM tell', fix: 'delete' },
	{ id: 'certainly', re: /(?:^|[.!?]\s+|\n)certainly!/gi,
		why: 'chatbot artifact', fix: 'delete' },
	{ id: 'reader-steering', re: /\b(?:here'?s what'?s (?:interesting|caught my eye|stood out)|worth (?:paying attention to|your time)|what nobody tells you|a problem nobody talks about|the insight everyone'?s missing)\b/gi,
		why: 'reader-steering / novelty inflation', fix: 'tell it straight' },
	{ id: 'false-range', re: /\b(?:ranging from\b[^.!?\n]{0,60}\bto|spanning everything from)\b/gi,
		why: 'false range', fix: 'the two examples that matter' },
	{ id: 'numbered-inflation', re: /\b(?:here are|these are|the top)\s+\d+\s+(?:reasons|things|takeaways|lessons|ways)\b|\bthree key takeaways\b/gi,
		why: 'numbered list inflation', fix: 'list as long as it needs, no count tease' },
	{ id: 'rhetorical-opener', re: /(?:^|\n)\s*(?:but\s+)?(?:so\s+)?(?:what does this mean for|so why should you care)\??/gi,
		why: 'formulaic rhetorical opener', fix: 'a real question hook from the topic' },
];

const ADVISORY = [
	{ id: 'wordy', re: /\b(?:in order to|in terms of|the fact that|prior to|subsequent to|a large number of|the vast majority of|is able to|has the ability to)\b/gi,
		why: 'wordy phrase', fix: 'to / for / cut / before / after / many / most / can' },
	{ id: 'soft-vocab', re: /\b(?:crucial|actionable|ecosystem|landscape|enhance[sd]?|crucially|navigate)\b/gi,
		why: 'soft AI/consulting vocabulary — confirm it earns its place', fix: 'plain word, or keep only if literal' },
];

// --- masking ---------------------------------------------------------------
/** Replace fenced code, inline code, quoted spans, blockquote lines with
 *  same-length spaces (unslop default: quoted examples are exempt). */
function mask(text) {
	const masks = [/```[\s\S]*?```/g, /~~~[\s\S]*?~~~/g, /`[^`\n]+`/g, /"[A-Za-z][^"\n]*"/g, /^[ \t]*>.*$/gm];
	let out = text;
	for (const m of masks) out = out.replace(m, (s) => s.replace(/[^\n]/g, ' '));
	return out;
}

// --- findings --------------------------------------------------------------
function lineCol(text, index) {
	const before = text.slice(0, index);
	const line = (before.match(/\n/g) || []).length + 1;
	const col = index - (before.lastIndexOf('\n') + 1) + 1;
	return { line, col };
}

function scan(masked, patterns) {
	const findings = [];
	for (const p of patterns) {
		const re = new RegExp(p.re.source, p.re.flags.includes('g') ? p.re.flags : p.re.flags + 'g');
		let m;
		while ((m = re.exec(masked)) !== null) {
			if (m[0].trim().length === 0) continue; // masked span
			const { line, col } = lineCol(masked, m.index);
			findings.push({ line, col, category: p.id, phrase: m[0].slice(0, 80), why: p.why, fix: p.fix });
			if (m.index === re.lastIndex) re.lastIndex++; // zero-length guard
		}
	}
	findings.sort((a, b) => a.line - b.line || a.col - b.col);
	return findings;
}

// --- structural advisories -------------------------------------------------
function structure(masked) {
	const out = [];
	const lines = masked.split('\n');

	// em-dash usage: this voice uses parentheses/commas, not em-dashes
	const emdashLines = lines
		.map((l, i) => (/\u2014/.test(l) ? i + 1 : 0))
		.filter(Boolean);
	if (emdashLines.length) {
		out.push({ line: emdashLines[0], category: 'em-dash', phrase: `${emdashLines.length} line(s): ${emdashLines.slice(0, 5).join(', ')}${emdashLines.length > 5 ? '…' : ''}`,
			why: 'LLM-overused punctuation', fix: 'parentheses, commas, or two sentences' });
	}

	// sentence stats (strip heading markers, skip blank/list-marker-only lines)
	const prose = masked
		.replace(/^#{1,6}[ \t]*/gm, '')
		.replace(/^[ \t]*[-*+][ \t]+/gm, '')
		.replace(/^[ \t]*\d+\.[ \t]+/gm, '');
	const sentences = prose
		.split(/(?<=[.!?])\s+/)
		.map((s) => s.trim())
		.filter((s) => /[a-zA-Z]/.test(s) && s.split(/\s+/).length > 2);
	const lens = sentences.map((s) => s.split(/\s+/).length);
	if (lens.length) {
		const avg = lens.reduce((a, b) => a + b, 0) / lens.length;
		const sd = Math.sqrt(lens.reduce((a, b) => a + (b - avg) ** 2, 0) / lens.length);
		if (avg > 24)
			out.push({ line: 1, category: 'long-sentences', phrase: `avg ${avg.toFixed(1)} words/sentence`, why: 'style target is 15–20', fix: 'split the longest sentences' });
		if (lens.length >= 6 && sd < 4.5)
			out.push({ line: 1, category: 'uniform-length', phrase: `stdev ${sd.toFixed(1)} over ${lens.length} sentences`, why: 'uniform sentence length is an LLM tell', fix: 'mix short punches with longer explanation' });
		// passive-voice heuristic
		const passive = (prose.match(/\b(?:am|is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?\w+(?:ed|en)\b/gi) || []).length;
		if (passive / lens.length > 0.15 && passive >= 3)
			out.push({ line: 1, category: 'passive-heavy', phrase: `~${passive} passive-looking constructions`, why: 'style target is 85% active voice', fix: 'make the actor the subject' });
	}

	// paragraph length
	let para = [];
	let start = 1;
	lines.forEach((l, i) => {
		if (l.trim() === '') {
			if (para.length) {
				const sents = para.join(' ').split(/(?<=[.!?])\s+/).filter((s) => /[a-zA-Z]/.test(s));
				if (sents.length > 5)
					out.push({ line: start, category: 'long-paragraph', phrase: `${sents.length} sentences`, why: 'style is 1–4 sentence paragraphs', fix: 'split it' });
			}
			para = [];
			start = i + 2;
		} else para.push(l);
	});
	return out;
}

// --- CLI -------------------------------------------------------------------
const args = process.argv.slice(2);
const json = args.includes('--json');
const strict = args.includes('--strict');
const file = args.find((a) => !a.startsWith('--'));

let text;
if (file) {
	try { text = readFileSync(file, 'utf8'); }
	catch { console.error(`lint: cannot read file: ${file}`); process.exit(2); }
} else if (!process.stdin.isTTY) {
	text = readFileSync(0, 'utf8');
} else {
	console.error('usage: node lint.mjs [--json] [--strict] <file>   (or pipe text via stdin)');
	process.exit(2);
}

const masked = mask(text);
const hard = scan(masked, HARD);
const advisory = [...scan(masked, ADVISORY), ...structure(masked)];
const words = (masked.match(/\S+/g) || []).length;

if (json) {
	console.log(JSON.stringify({ file: file ?? 'stdin', words, hard, advisory, exit: (hard.length || (strict && advisory.length)) ? 1 : 0 }, null, 2));
} else {
	const pad = (s, n) => String(s).padEnd(n);
	for (const f of hard) console.log(`HARD     L${pad(f.line, 4)}${pad(f.category, 20)}"${f.phrase}"  → ${f.fix}`);
	for (const f of advisory) console.log(`ADVISORY L${pad(f.line, 4)}${pad(f.category, 20)}${f.phrase}  → ${f.fix}`);
	console.log(`${file ?? 'stdin'}: ${words} words · ${hard.length} hard · ${advisory.length} advisory`);
}

process.exit(hard.length || (strict && advisory.length) ? 1 : 0);
