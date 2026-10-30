# BASE-CSS — the canonical shared layer of every composed document

**v2 compose edition.** This is the shared Clay grammar — tokens, base type,
kicker, masthead, wayfinding nav, section rhythm, folds, the figure plate with
pele theming, colophon, responsive, dark flip, print — extracted once from the
most refined v1 template (`13-management-report.html`, contract v0.1) with its
type-specific sections stripped.

## Rules

- **Copy this block verbatim** into the composed document's `<style>`, then add
  the type's own sections **after** it, per the type's block grammar in
  `TYPES.md`. Never re-derive the shared layer; never edit it inside a
  document.
- The page column (`.wrap`, 1000px here) is the **one structural cap** —
  sections, grids, panels and text fill their parents; no measure caps.
- Extending this base itself (new shared rules) is a suite convention change:
  MINOR bump + CHANGELOG line, decided at a review gate.
- Worked examples of finished documents on this grammar:
  `assets/examples/` (the founding trio).

```css
  /* ══════════ BASE-CSS — shared layer (from 13-management-report.html v0.1) ══════════ */
  :root{
    --ivory:#FAF9F5; --slate:#141413; --white:#FFFFFF;
    --clay:#FE6C2D; --clay-ink:#B8430F; --clay-soft:#FDEBE0;
    --oat:#E3DACC; --olive:#788C5D; --olive-ink:#55673C; --olive-soft:#EEF2E6;
    --rust:#B04A3F; --rust-soft:#F8ECE9;
    --gray-100:#F0EEE6; --gray-300:#D1CFC5; --gray-500:#87867F; --muted:#67665F; --body:#3D3D3A;
    --serif:ui-serif, Georgia, serif;
    --sans:system-ui, -apple-system, sans-serif;
    --mono:ui-monospace, "SF Mono", Menlo, monospace;
    --radius-panel:12px; --radius-chip:999px;
    --border:1.5px solid var(--gray-300);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  @media (prefers-reduced-motion: reduce){
    html{scroll-behavior:auto;}
  }
  body{background:var(--ivory); color:var(--slate); font-family:var(--sans);
       font-size:15.5px; line-height:1.6; -webkit-font-smoothing:antialiased;}
  h1,h2,h3{font-family:var(--serif); font-weight:500; letter-spacing:-.01em;}
  a{color:var(--clay-ink); text-decoration:none; border-bottom:1px dotted var(--clay-ink);}
  a:hover{border-bottom-style:solid;}
  a:focus-visible, summary:focus-visible{outline:2px solid var(--clay-ink); outline-offset:2px;}
  code{font-family:var(--mono); font-size:.92em; background:var(--gray-100);
       border-radius:4px; padding:1px 5px;}

  /* ---------- kicker — pill + meta, the shared hero grammar ---------- */
  .kicker{display:flex; align-items:baseline; gap:12px; flex-wrap:wrap;}
  .pill{font-family:var(--mono); font-size:11px; text-transform:uppercase;
        letter-spacing:.06em; color:var(--muted); background:var(--gray-100);
        border:var(--border); border-radius:var(--radius-chip); padding:5px 11px;
        white-space:nowrap;}
  .pill b{color:var(--clay-ink); font-weight:500;}
  .kicker-meta{font-family:var(--mono); font-size:11px; text-transform:uppercase;
               letter-spacing:.18em; color:var(--muted);}
  .page-no{margin-left:auto; font-family:var(--mono); font-size:11px;
           letter-spacing:.18em; color:var(--muted); white-space:nowrap;}
  .type-label{display:inline-block; margin-top:24px; font-family:var(--mono); font-size:11px;
              text-transform:uppercase; letter-spacing:.06em; color:var(--muted);
              background:var(--gray-100); border:var(--border);
              border-radius:var(--radius-chip); padding:5px 11px;}

  /* ---------- masthead — the hero directly on ivory ---------- */
  .masthead{padding:56px 24px 0;}
  .masthead-inner{max-width:1000px; margin:0 auto;}
  h1{font-size:clamp(44px, 6.5vw, 80px); line-height:1.05; margin-top:20px; max-width:16ch;}
  h1 em{font-style:italic; color:var(--clay-ink);}
  .lede{margin-top:26px; font-size:17.5px; line-height:1.6; color:var(--body); border-left:3px solid var(--clay); padding:4px 0 4px 20px;}
  .lede b{color:var(--slate); font-weight:600;}
  .meta-row{display:flex; flex-wrap:wrap; gap:32px; margin-top:36px; padding-top:22px;
            border-top:1px solid var(--gray-300);}
  .meta-row dt{font-family:var(--mono); font-size:10px; letter-spacing:.18em;
               text-transform:uppercase; color:var(--muted); margin-bottom:4px;}
  .meta-row dd{font-weight:500; color:var(--slate);}

  /* ---------- jump nav — mono pill strip (wayfinding) ---------- */
  nav.part-index{margin-top:30px;}
  .index-title{font-family:var(--mono); font-size:10px; letter-spacing:.18em;
               text-transform:uppercase; color:var(--muted); margin-bottom:10px;}
  .index-links{display:flex; flex-wrap:wrap; gap:8px;}
  .index-links a{font-family:var(--mono); font-size:11px; letter-spacing:.06em;
                 text-transform:uppercase; color:var(--muted); background:var(--white);
                 border:var(--border); border-bottom:var(--border);
                 border-radius:var(--radius-chip); padding:5px 11px;}
  .index-links a b{color:var(--clay-ink); font-weight:500; margin-right:4px;}
  .index-links a:hover{background:var(--clay-soft); border-color:var(--clay);
                       border-bottom-color:var(--clay);}

  /* ---------- layout — section rhythm convention ---------- */
  .wrap{max-width:1000px; margin:0 auto; padding:20px 24px 90px;}
  section{margin-top:40px; padding-top:40px; border-top:1px solid var(--gray-300);
          scroll-margin-top:24px;}
  h2{font-size:28px; line-height:1.15; margin:16px 0 16px;}
  h2 + *{margin-top:0;}
  .sec-kick{display:inline-block; font-family:var(--mono); font-size:10px;
            text-transform:uppercase; letter-spacing:.18em; color:var(--muted);
            background:var(--gray-100); border:var(--border);
            border-radius:var(--radius-chip); padding:4px 11px;}
  .section-lede{font-size:16.5px; color:var(--body);}
  .section-lede + *{margin-top:24px;}
  /* :target — the section's top hairline thickens to a 3px clay rule
     and its pill flips clay-soft. Border, rule and chip move as one. JS-free. */
  section:target{border-top:3px solid var(--clay); padding-top:38px;}
  section:target .sec-kick{background:var(--clay-soft); border-color:var(--clay);
                           color:var(--clay-ink);}

  /* ---------- folds — JS-free disclosure, deck grammar ---------- */
  details.fold{margin-top:16px;}
  details.fold summary{cursor:pointer; list-style:none; font-family:var(--mono);
                       font-size:11px; letter-spacing:.08em; text-transform:uppercase;
                       color:var(--clay-ink);}
  details.fold summary::-webkit-details-marker{display:none;}
  details.fold summary::before{content:"+ "; color:var(--clay-ink); font-weight:600;}
  details.fold[open] summary::before{content:"− ";}
  details.fold[open] summary{margin-bottom:12px;}
  details.fold .fold-body{padding-top:2px;}
  /* the oat note plate — fold bodies, method notes, asides */
  .example{background:var(--oat); border:1px solid var(--gray-300);
           border-radius:8px; padding:14px 16px; font-size:13.5px; color:var(--body);}
  .example .etype{font-family:var(--mono); font-size:10px; letter-spacing:.14em;
                  text-transform:uppercase; color:var(--muted); display:block;
                  margin-bottom:5px;}
  .example b{color:var(--slate); font-weight:600;}
  .example p + p{margin-top:8px;}
  .example ul{margin:6px 0 0 18px;}
  .example li{margin-top:3px;}

  /* ---------- figure — the plate: header / legend / body / footer ---------- */
  .fig{margin-top:22px; background:var(--gray-100); border:var(--border);
       border-radius:var(--radius-panel); position:relative; overflow:hidden;}
  .fig-h{display:flex; align-items:center; justify-content:space-between; gap:12px;
         padding:10px 14px;}
  .fig-id{font-family:var(--mono); font-size:10px; letter-spacing:.18em;
          text-transform:uppercase; color:var(--muted);}
  .fig-fs{font-family:var(--mono); font-size:10px; text-transform:uppercase;
          letter-spacing:.14em; color:var(--muted); background:var(--white);
          border:var(--border); border-radius:999px; padding:4px 10px; cursor:pointer;}
  .fig-fs:hover{color:var(--clay-ink); border-color:var(--clay);}
  .fig-fs:focus-visible{outline:2px solid var(--clay); outline-offset:2px;}
  .fig-legend{display:flex; flex-wrap:wrap; gap:6px 18px; padding:0 14px 9px;
              border-bottom:1px solid var(--gray-300); font-family:var(--mono);
              font-size:10px; letter-spacing:.06em; text-transform:uppercase;
              color:var(--muted);}
  .fig-legend .lg{display:inline-flex; align-items:center; gap:6px;}
  .fig-legend .lg-g{flex:none;}
  .fig-b{padding:20px 18px;}
  .fig-b svg{display:block; width:auto; max-width:100%; height:auto; margin:0 auto;}
  .fig-f{padding:10px 14px; border-top:1px solid var(--gray-300);
         font-family:var(--mono); font-size:10px; letter-spacing:.18em;
         text-transform:uppercase; color:var(--muted); text-align:center;}

  /* pele theming — the Clay mapping lives in document CSS, never inline
     in the SVG (inline var() indirection fails to resolve and paints
     edge-label chips black). */
  .fig svg{--pele-fg:var(--slate); --pele-fg-on-light:var(--body); --pele-muted:var(--gray-500);
           --pele-line:var(--gray-300); --pele-bg:transparent; --pele-surface:transparent;
           --pele-surface-alt:transparent; --pele-border:var(--gray-300); --pele-accent:var(--clay);
           --pele-radius:4px;
           --pele-font:system-ui,-apple-system,sans-serif;
           --pele-font-mono:ui-monospace,"SF Mono",Menlo,monospace;}
  .fig svg .pele-title{display:none;}
  .fig svg .pele-edge-label rect{fill:transparent;}
  .fig svg .pele-edge-label text{fill:var(--body); font-size:12.5px;}

  /* ---------- colophon ---------- */
  .colophon p.statement{font-size:14.5px; color:var(--body);}
  .colophon .row{display:flex; flex-wrap:wrap; gap:8px 24px; margin-top:20px;
                 font-family:var(--mono); font-size:11px; letter-spacing:.06em;
                 text-transform:uppercase; color:var(--muted);}

  @media (max-width:860px){
    .masthead{padding:36px 16px 0;}
    .wrap{padding:12px 16px 72px;}
    .meta-row{gap:20px;}
  }

  /* ---------- dark mode — the token flip, carried wholesale ---------- */
  @media (prefers-color-scheme: dark){
    :root{
      --ivory:#191817; --slate:#F0EEE6; --white:#201F1D;
      --clay-ink:#FE6C2D; --clay-soft:#3A241A;
      --oat:#4A4438; --olive-ink:#A9BC8B; --olive-soft:#262D1E;
      --rust:#D98A80; --rust-soft:#3A2622;
      --gray-100:#232220; --gray-300:#3D3D3A; --gray-500:#87867F; --muted:#A5A39B; --body:#D6D4CC;
    }
    /* ink panels flip to light — add the type's on-ink color
       supplements here, per its block grammar */
  }

  /* ---------- print — light paper, folds forced open, states neutral ---------- */
  @media print{
    body{background:#FFFFFF; color:#141413;}
    :root{
      --ivory:#FFFFFF; --slate:#141413; --white:#FFFFFF; --body:#3D3D3A;
      --gray-100:#F5F4F0; --gray-300:#D1CFC5; --gray-500:#87867F; --muted:#67665F;
      --clay-ink:#B8430F; --clay-soft:#FDEBE0;
      --olive-ink:#55673C; --olive-soft:#EEF2E6;
      --rust:#B04A3F; --rust-soft:#F8ECE9;
    }
    nav.part-index{display:none;}
    .wrap{padding:0 24px;}
    .masthead{padding:0 24px;}
    section{margin-top:36px; padding-top:24px;}
    .fig, .example, table{break-inside:avoid;}
    section:target{border-top:1px solid var(--gray-300); padding-top:24px;}
    section:target .sec-kick{background:var(--gray-100); border-color:var(--gray-300);
                             color:var(--muted);}
    details.fold > *:not(summary){display:block !important;}
    details.fold summary::before{content:"− ";}
  }
```

## What the composed document adds

1. **A head contract comment** restating the type's contract block from
   `TYPES.md` (ADR-0010).
2. **Type sections after this base** — the type's own blocks (band, ledger,
   matrix…), built on these tokens and classes, per its block grammar.
3. **The body** — masthead, wayfinding nav, sections in the type's frozen
   order, colophon with the DOC ID row.
4. **Whitelisted scripts only** (the FULLSCREEN listener on figure plates —
   see `WHITELIST.md`).
