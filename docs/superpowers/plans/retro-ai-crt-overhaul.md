# Plan — Retro-AI CRT Portfolio Overhaul

## Spec (authority)

The binding spec is the user's request: rebuild this portfolio in a retro-futuristic
CRT hardware aesthetic ("shader.se"-adjacent) themed as an elite AI Software Engineer
site, with **all** personal/employment/skills content sourced **only** from the LaTeX
resume reproduced verbatim in `docs/superpowers/plans/resume-source.tex`.

Mandated by the spec, non-negotiable:

- Base layer solid matte pitch-black `#000000`; deep charcoal window containers.
- A 6-stripe retro neon rainbow block (Red, Orange, Yellow, Green, Cyan, Blue) used
  for branding bars and dividers.
- Crisp monospaced terminal typography; text in a glowing phosphor green / cyan
  spectrum.
- A global root wrapper simulating a vintage monitor: inner vignette, rounded bezel
  corners, faint performance-optimised vertical scanline animation.
- A background matrix grid layer (neural-net / token-stream feel).
- Hero headline **verbatim**: `A Creative AI Engineer, Tuning the Core Architecture.`
- Hero paired with a live terminal prompt typing telemetry / a greeting using the
  name from the resume.
- Selected Work: responsive carousel using hardware-accelerated transitions,
  controlled by minimal text triggers **verbatim**: `Previous model`,
  `Inspect Weights`, `Next model`.
- Capabilities/Tech Stack: modular layout of resume skills styled as terminal system
  metrics.
- Contact/Footer: structured terminal grid of communication protocols from the resume
  header.
- Fully responsive mobile + desktop; compiles clean; performant CSS transforms; DRY.

## Preflight rulings (made before Task 1 — see ledger)

**R1 — "deep learning skills (e.g. PyTorch, Transformers, Agentic Frameworks, MLOps,
CUDA)".** The resume contains none of PyTorch, Transformers, MLOps or CUDA. The spec's
own CRITICAL INPUT CONSTRAINT ("Do not drop or hallucinate any metrics or technical
bullet points") is the stronger, explicitly-flagged requirement, so those examples are
read as illustrative of _styling_, not as content to add. **Capabilities renders the
four resume `\skillline` groups verbatim and nothing else.** Cost if wrong: the user
wanted aspirational ML skills listed; fixable by editing one array in
`src/data/resume.ts`.

**R2 — "\section{Projects}" does not exist in the resume.** The resume has
`PROFESSIONAL EXPERIENCE` only: REUDAN INTERNATIONAL with four `\subhead` clusters,
plus the CLEVERATTI internship. **Selected Work = 5 carousel entries** — the four
Reudan subheads, then Cleveratti. The three-year-old `projects` array currently in
`Work.tsx` is deleted per the constraint. Cost if wrong: the user has side projects
they wanted shown; they add entries to `resume.ts`.

**R3 — HuggingFace.** Not in the resume header. Contact protocols are exactly:
email, phone, location, LinkedIn, GitHub, portfolio. No invented handles.

**R4 — the existing `design`/`dev` dual layout mode is removed.** A light "design"
mode directly contradicts the mandated solid pitch-black base. `UITheme.tsx`, the
`design:`/`dev:` Tailwind variants, the `--ui-*` mode tokens and the neon pointer all
go. Cost if wrong: recoverable from git history.

**R5 — the Firebase contact form is kept**, restyled as a terminal form. It is working
functionality the spec never asked to remove; the spec adds a protocol grid beside it.
Cost if wrong: delete one component subtree.

**R6 — tech-icon PNG assets in `src/assets` become unimported.** Capabilities is
text/terminal-metric per spec. Unimported files are not bundled, so they cost nothing;
they stay on disk rather than being deleted in a rewrite commit.

**R7 — no new dependencies.** The carousel is a CSS `translate3d` track (spec:
"hardware-accelerated transitions", "performant CSS transforms"). `typewriter-effect`
and `react-icons` are already installed and are used. `framer-motion` is dropped from
the code; Task 9 removes it from `package.json` if nothing imports it.

**R8 — no invented proficiency metrics.** "Terminal system metrics" is a visual
instruction. Bars/percentages implying skill level would be fabricated data. Metrics
displayed are real derived counts (group index, item count).

**R9 — no new git worktree.** Work happens on the current `rehaul/major` branch, which
is already isolated from `main`, and `node_modules` is installed there.

**R10 — Task 2 is additive, not a replacement.** The first draft of this plan had Task
2 delete the `--ui-*` mode system and the old palette, which would have left Tasks 2-8
unable to satisfy Global Constraint 9 (`typecheck` green per task). Instead Task 2
_adds_ the CRT palette, fonts, motion and `.crt-*` layers alongside the existing
tokens, and **Task 9 deletes the old system** once nothing references it. Every task
therefore compiles. On the one name collision (`mute`) the new value wins immediately —
old components shift colour but never break. Cost if wrong: a few intermediate commits
ship a larger-than-final palette and a duplicate font request.

**R11 — the `Services.tsx` → `Capabilities.tsx` rename moves entirely into Task 9.**
Task 7 rewrites the _contents_ of `src/componenets/Services.tsx` in place, so
`App.tsx`'s existing import keeps resolving; Task 9 renames the file and updates the
import in one commit. Cost if wrong: none, it is a mechanical rename either way.

**R12 — corrected skill-item counts.** The first draft mis-stated the `\skillline`
group sizes. Counted from the LaTeX they are **10 / 11 / 18 / 21 = 60 items**, not
9 / 11 / 18 / 25 = 63. The corrected numbers are authoritative below.

## Global Constraints (bind every task; reviewers check these)

1. **Resume is the only content source.** Every name, title, date, company, bullet,
   skill, credential, phone number, URL and email rendered anywhere on the site must
   appear in `docs/superpowers/plans/resume-source.tex`. No invented metrics, no
   invented technologies, no invented projects, no placeholder lorem.
2. **All resume content ships.** Nothing from SUMMARY, CORE SKILLS, PROFESSIONAL
   EXPERIENCE or EDUCATION & CERTIFICATIONS may be dropped. Every bullet in the
   resume must be reachable in the UI.
3. **One data module.** `src/data/resume.ts` is the single source of resume content.
   No component hardcodes resume strings. (Exception: the mandated verbatim UI
   strings — the hero headline and the three carousel triggers — are UI copy, not
   resume data, and live in their components.)
4. **Design tokens only.** Colours, spacing, fonts, shadows and animations come from
   `tailwind.config.js` / the `--crt-*` custom properties. `theme.colors` and
   `theme.spacing` remain **overrides** (not `extend`), so an off-palette class
   generates no CSS. Arbitrary values (`text-[#0f0]`, `p-[13px]`) are permitted only
   where a token genuinely cannot express the value, and must be rare.
5. **Directory `src/componenets/` is misspelled on disk. Do not rename it.**
6. **Animation respects `prefers-reduced-motion: reduce`** — scanline, grid drift,
   flicker, caret blink and carousel transitions all reduce to static/instant.
7. **Only compositor-friendly animation.** Animate `transform` and `opacity` only.
   Never animate `top`/`left`/`width`/`height`/`background-position`. Overlay layers
   are `position: fixed; inset: 0; pointer-events: none;` and `aria-hidden="true"`.
8. **Accessibility.** Interactive controls are real `<button>`/`<a>` with accessible
   names; the carousel is keyboard operable; decorative layers are hidden from a11y;
   phosphor-on-black body text keeps contrast ≥ 4.5:1; focus is visible.
9. **Verification per task:** `npm run typecheck`, `npm run lint`, `npm run
format:check` must all pass before a task reports DONE. `npm run build` is run by
   Task 9 (and by any task that changes build config).
10. **No new runtime dependencies.**
11. Every section wrapper keeps its anchor `id` and is reachable from the nav.

## Design system (locked here; Tasks 4-8 consume it, they do not redesign it)

### Palette (`theme.colors`, override)

| Token                                                                 | Value                                                       | Use                                          |
| --------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| `void`                                                                | `#000000`                                                   | page base, matte black                       |
| `carbon.DEFAULT`                                                      | `#0b0b0e`                                                   | window container fill                        |
| `carbon.raised`                                                       | `#141419`                                                   | nested panel / hover fill                    |
| `carbon.sunk`                                                         | `#050507`                                                   | inset wells, code strips                     |
| `phosphor.DEFAULT`                                                    | `#7dffb0`                                                   | primary body text                            |
| `phosphor.bright`                                                     | `#ccffdf`                                                   | headings, emphasis                           |
| `phosphor.dim`                                                        | `#4e9c6d`                                                   | secondary text                               |
| `cyan.DEFAULT`                                                        | `#66e8ff`                                                   | links, active state, accents                 |
| `cyan.dim`                                                            | `#3d8b9c`                                                   | secondary accent                             |
| `amber`                                                               | `#ffc857`                                                   | warn / highlight chips                       |
| `mute`                                                                | `#6f6f7a`                                                   | disabled, meta text                          |
| `line`                                                                | `#23232b`                                                   | 1px borders                                  |
| `line.bright`                                                         | `#3a3a46`                                                   | hover borders                                |
| `bar.red` `bar.orange` `bar.yellow` `bar.green` `bar.cyan` `bar.blue` | `#ff5f56` `#ff9f43` `#ffd93d` `#3ddc84` `#4dd8e6` `#4d7cff` | the mandated 6-stripe rainbow, in this order |
| `white` `black` `transparent` `current`                               | —                                                           | keep                                         |

### Type

- One family: JetBrains Mono (400/500/700), loaded via `<link>` in `index.html`
  (preconnect + stylesheet), not a CSS `@import`. `font-mono` is the stack;
  `fontFamily.sans` and `fontFamily.display` alias the same stack so nothing falls
  back to a proportional face.
- `fontSize` extras: `display` `3.5rem/1.02`, `display-sm` `2.5rem/1.06`,
  `display-xs` `1.75rem/1.1`, `2xs` `0.6875rem/1.4`.
- Headings uppercase with wide tracking; body normal case.

### Spacing / breakpoints

Unchanged from today: 8px metric (`1` = 8px … plus `0.5` = 4px and the `page*`
viewport gutters), max-width breakpoints `mq-1367 … mq-425` listed widest first.

### Motion (`keyframes` / `animation`)

| Name      | What                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| `scan`    | sweep bar: `translate3d(0, -100%, 0)` → `translate3d(0, 100vh, 0)`, ~7s linear infinite |
| `drift`   | matrix grid: `translate3d(0,0,0)` → `translate3d(0, 64px, 0)`, ~20s linear infinite     |
| `caret`   | terminal cursor opacity 1 → 0, 1s steps(2) infinite                                     |
| `flicker` | overlay opacity 0.06 → 0.09, 4s ease-in-out infinite alternate                          |

### CRT layers (`src/styles/app.css`, `@layer components`)

- `.crt-scanlines` — fixed overlay: static `repeating-linear-gradient` fine lines
  (3px period, ~6% black) **plus** one translucent sweep bar animated with `scan`.
  `will-change: transform` on the sweep element only.
- `.crt-grid` — fixed matrix grid: two `linear-gradient`s at 32px, phosphor at ~4%
  alpha, animated with `drift`, plus a radial mask so it fades toward the edges.
- `.crt-vignette` — fixed `box-shadow: inset 0 0 <big> rgba(0,0,0,.9)` +
  radial-gradient darkening the corners.
- `.crt-bezel` — fixed rounded frame: `border-radius: 20px` (12px under `mq-600`),
  `box-shadow: inset 0 0 0 1px` line + a soft phosphor inner glow.
- All four: `position: fixed; inset: 0; pointer-events: none;` and inside a single
  `prefers-reduced-motion: reduce` block that sets `animation: none`.

### Shared primitives (Task 3, in `src/componenets/crt/`)

- `<CRTScreen>` — root wrapper. Renders `children` then the four fixed overlay
  layers. **It creates no scroll container** (body scroll is preserved so the sticky
  header keeps working).
- `<RainbowBar>` — the 6 stripes, `flex`, each `flex-1`. Props: `height` (`"thin"`
  4px | `"thick"` 8px), `className`.
- `<Window>` — charcoal container: `bg-carbon`, `border border-line`, rounded, with a
  title strip showing a monospace path label and three chrome dots. Slots: `title`,
  `meta` (right-aligned), `children`.
- `<SectionShell>` — `<section id>` + heading block (`// 01 — SELECTED WORK` style
  index + label) + `<RainbowBar>` divider + children. Replaces the old `Block`.

## Task 1 — Resume data module

**Files:** create `src/data/resume.ts`. Also create
`docs/superpowers/plans/resume-source.tex` containing the LaTeX verbatim (reference
copy so later tasks and reviewers can diff content against it).

Export typed, frozen data. Types are declared in the same file.

```ts
export type ContactProtocol = {
  protocol: string; // "mailto" | "tel" | "geo" | "linkedin" | "github" | "https"
  value: string; // the address text
  href: string | null; // null for geo
};

export type ExperienceCluster = {
  id: string; // slug, stable, used as carousel key
  company: string;
  role: string;
  period: string;
  cluster: string; // the \subhead, or "" when the role has no subheads
  bullets: string[]; // verbatim resume bullets, whitespace-normalised to one line
  stack: string[]; // technologies named IN those bullets, no additions
};

export type SkillGroup = { id: string; label: string; items: string[] };
export type Credential = {
  title: string;
  org: string;
  period: string;
  note?: string;
};
```

Content (all verbatim from the LaTeX, `--` → `—`, `\&` → `&`, LaTeX line-wrapping
collapsed to single spaces):

- `profile`: `name` `KUMAR ANURAG SAHU`, `title` `Software Engineer — GenAI / Agentic AI`,
  `location` `Bhubaneshwar, India`.
- `summary`: the full SUMMARY paragraph, one string.
- `protocols`: 6 entries in this order — `mailto`/`kumarkas1515@gmail.com`,
  `tel`/`+91 9078943749`, `geo`/`Bhubaneshwar, India` (href `null`),
  `linkedin`/`linkedin.com/in/kumar-anurag-858948207`
  (href `https://www.linkedin.com/in/kumar-anurag-858948207/`),
  `github`/`github.com/10kumaranurag01` (href `https://github.com/10kumaranurag01/`),
  `https`/`myportfolio.anuragg.top` (href `https://myportfolio.anuragg.top`).
- `skillGroups`: 4 groups, labels and items exactly as the four `\skillline` calls —
  `Generative AI & LLMs` (10 items), `RAG & Retrieval` (11), `Agentic AI & Reliability`
  (18), `Engineering & Cloud` (21); **60 items total** (R12). Split on commas; keep
  parenthesised expansions
  attached to their item (e.g. `Large Language Models (LLMs)`,
  `Server-Sent Events (SSE)`).
- `experience`: 5 `ExperienceCluster` entries, in this order:
  1. `genai-agentic` — REUDAN INTERNATIONAL / `Software Engineer — GenAI / Agentic AI`
     / `November 2024 — Present` / cluster `Generative AI & Agentic AI` / its 5 bullets.
  2. `rag-vector-docai` — same company/role/period / cluster
     `RAG, Vector Search & Document AI` / its 2 bullets.
  3. `guardrails-eval` — same / cluster `AI Guardrails, Safety & Evaluation` / its 3 bullets.
  4. `fullstack-eventdriven` — same / cluster
     `Full-Stack AI Product & Event-Driven Platform` / its 2 bullets.
  5. `cleveratti-mern` — CLEVERATTI SKILLS PVT LIMITED /
     `Junior Full Stack Developer Intern` / `May 2024 — August 2024` / cluster `""` /
     its 1 bullet.
     `stack` per entry is drawn only from technologies literally named in that entry's
     bullets (e.g. entry 2: `LlamaParse`, `Mistral`, `MongoDB Atlas Vector Search`,
     `Voyage`, `kNN`, `RAG`).
- `credentials`: `Bachelor of Technology (B.Tech), Computer Science` / `SIET, Dhenkanal`
  / `2020 — 2024`; and `Full Stack Web Development Course` / `100xDevs` /
  `Issued September 2024` / note `Credential ID: 0FFKL29X`.
- `resumeFile`: re-export the existing `src/assets/Kumar_Anurag.pdf` import so
  components link one symbol.

No JSX in this file. `as const` / `Object.freeze` on the exported arrays.

**Done when:** `npm run typecheck`, `npm run lint`, `npm run format:check` pass, and
every bullet, skill item, protocol and credential in the LaTeX appears exactly once in
the module.

## Task 2 — Design system: Tailwind config, CRT stylesheet, document head

**Files:** `tailwind.config.js`, `src/styles/app.css`, `index.html`.

**This task is additive (R10).** Nothing existing is deleted here — the old `--ui-*`
tokens, `[data-ui]` rules, `.ui-block*`, `.neon-cursor`, `.tok-*`, the old palette
entries and the `design`/`dev` `addVariant` plugin all stay until Task 9. That keeps
every intermediate commit compiling.

1. `tailwind.config.js` — **add** the palette table above to the existing `colors`
   override, keeping the current entries in place. On the single name collision,
   `mute`, the new value `#6f6f7a` wins. Keep `spacing` and `screens` exactly as they
   are. Point `fontFamily.sans` / `display` / `mono` all at the single JetBrains Mono
   stack. Add the `fontSize` extras and the `boxShadow` entries (`glow`: phosphor
   `0 0 8px`, `0 0 24px` at low alpha; `glow-cyan` likewise; keep `window` and
   `neon`). Add the `scan`, `drift`, `caret`, `flicker` keyframes/animations, keeping
   the existing three. Leave the `plugin` import and the `design`/`dev` variants alone.
2. `src/styles/app.css` — keep everything currently in the file, including the font
   `@import` and the whole `[data-ui]` system. Add:
   - `@layer base`: `html { color-scheme: dark; }`; override the existing `body` rule
     so it reads `background: theme(colors.void); color:
theme(colors.phosphor.DEFAULT); font-family: theme(fontFamily.mono);` (the old
     `--ui-bg`/`--ui-fg` declarations can be replaced in place — they are style values,
     not referenced by any component); a visible `:focus-visible` ring in `cyan`;
     `::selection` phosphor-on-carbon. Neutralise the `[data-ui="design"] body::before`
     grid so it cannot fight the CRT grid layer.
   - `--crt-*` custom properties on `:root` for the layer tunables (scanline period,
     grid step `32px`, bezel radius, vignette strength).
   - `@layer components`: `.crt-scanlines`, `.crt-scanlines::before` (static lines),
     `.crt-sweep`, `.crt-grid`, `.crt-vignette`, `.crt-bezel`, `.text-glow`
     (phosphor text-shadow), `.text-glow-cyan`, plus one
     `@media (prefers-reduced-motion: reduce) { .crt-sweep, .crt-grid { animation: none } }`.
     Total added CSS should stay well under ~150 lines — the layers are four small
     rules, not a framework.
3. `index.html` — `<html lang="en">` unchanged; add
   `<link rel="preconnect" href="https://fonts.googleapis.com">` +
   `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
   the JetBrains Mono `400;500;700` stylesheet link with `display=swap`. Set
   `<meta name="theme-color" content="#000000">` (already correct), fix the
   description to the resume's role line (the current one says "Full Satck Web
   Developer"), and set `<title>Kumar Anurag Sahu — Software Engineer, GenAI /
Agentic AI</title>`.

Because the task is additive, the app still compiles. Do not touch any component file;
Tasks 3-9 own those.

**Done when:** the config and stylesheet carry the design-system additions above,
and `npm run typecheck`, `npm run lint`, `npm run format:check` all pass.

## Task 3 — CRT framework and shared primitives

**Files:** create `src/componenets/crt/CRTScreen.tsx`, `RainbowBar.tsx`,
`Window.tsx`, `SectionShell.tsx`, and `index.ts` re-exporting all four.

Implement exactly the four primitives described under "Shared primitives" above.

- `CRTScreen` — `{ children }`. Returns a fragment: `{children}` then
  `<div className="crt-grid" aria-hidden />`, `<div className="crt-scanlines"
aria-hidden><div className="crt-sweep" /></div>`, `<div className="crt-vignette"
aria-hidden />`, `<div className="crt-bezel" aria-hidden />`. No wrapper div that
  could create a scroll/stacking container over the sticky header. Overlay z-index
  sits above content but below the mobile menu.
- `RainbowBar` — `{ height?: "thin" | "thick"; className?: string }`. Six `<span>`s
  in the mandated order, `flex-1`, `aria-hidden`.
- `Window` — `{ title: string; meta?: ReactNode; className?: string; children }`.
  Title strip: three chrome dots using `bar.red`/`bar.yellow`/`bar.green`, then the
  `title` in `text-2xs uppercase tracking-widest text-phosphor-dim`, then `meta`
  pushed right. Body: `bg-carbon` with `border border-line`, rounded, `p-3`
  (`p-2` under `mq-600`).
- `SectionShell` — `{ id: string; index: string; label: string; className?: string;
children }`. Renders `<section id={id}>` with a heading row
  (`<span className="text-cyan">// {index}</span> {label}` as an `<h2>`), a
  `<RainbowBar height="thin" />` divider, then children. Page gutters:
  `px-page mq-1367:px-page-md mq-1100:px-page-base mq-900:px-page-sm`, vertical
  rhythm `py-10 mq-900:py-6`.

Keep each file small; no props beyond those listed (YAGNI).

**Done when:** `npm run typecheck`, `npm run lint` and `npm run format:check` all pass.

## Task 4 — Header and mobile menu

**File:** rewrite `src/componenets/Header.tsx` (keep the `Header` default export and
the named `Headerphone` export and their `MenuProps` shape — `App.tsx` is rewritten in
Task 9 and depends on them).

- Nav links become: `HOME` `#home`, `WORK` `#work`, `STACK` `#capabilities`,
  `CONTACT` `#contact`.
- Sticky top bar: `<RainbowBar height="thin" />` flush at the very top, then the bar
  itself `bg-void/90 backdrop-blur border-b border-line`, `h-12`.
- Brand reads `KUMAR ANURAG SAHU` on desktop and `K. ANURAG` under `mq-900`
  (both from `resume.profile.name`, not typed literals — derive the short form).
- Links styled as terminal paths (`~/home`) in `text-phosphor-dim`, hover
  `text-cyan text-glow-cyan`.
- Right side: a single `<a>` to `resume.protocols` mailto entry, labelled `[ EMAIL ]`,
  and a `RESUME` link to `resume.resumeFile` with `target="_blank" rel="noreferrer"`.
- Remove the `LayoutToggle` import and every `dev:`/`design:` class (R4).
- Mobile menu (`Headerphone`) keeps the translate-based show/hide, restyled to
  `bg-void` with a rainbow bar and the same links; ensure it sits above the CRT
  overlays and that the hamburger button has `aria-expanded` and an accessible label.

**Done when:** `npm run typecheck` passes for this file, `npm run lint` and
`npm run format:check` pass, and no `data-ui`/`design:`/`dev:` reference remains in it.

## Task 5 — Hero + live terminal

**File:** rewrite `src/componenets/Home.tsx`.

Layout: left-aligned, full-viewport-minus-header (`min-h-[calc(100vh-96px)]`),
two columns on desktop (`grid-cols-[1.15fr_1fr]`), stacked under `mq-900`.

Left column:

- Eyebrow: `resume.profile.title` in `text-2xs uppercase tracking-[0.3em] text-cyan`.
- `<h1>` **verbatim**: `A Creative AI Engineer, Tuning the Core Architecture.` —
  `text-display` (`display-sm` under `mq-900`, `display-xs` under `mq-600`),
  `font-bold uppercase text-phosphor-bright text-glow`, `max-w-[18ch]`.
- `resume.summary` rendered beneath in `text-phosphor-dim`, `max-w-[68ch]`,
  `text-sm` (Global Constraint 2 — the summary must ship somewhere and this is it).
- Two actions: `[ INSPECT WORK ]` → `#work`, `[ DOWNLOAD RESUME ]` →
  `resume.resumeFile`.

Right column: a `<Window title="~/kandyr/agent --stream">` containing the live
terminal. Use the already-installed `typewriter-effect` to type a telemetry boot
sequence, then loop. Lines are built from `resume` data only — e.g. operator name,
role, location, the count of registered skill groups, the four side-effect classes
(`read`, `write`, `external`, `artifact`) and the guardrail terms, all of which appear
in the resume bullets. Prefix each line with a `>` in `text-cyan`, and render a
`animate-caret` block cursor after the last line. Under
`prefers-reduced-motion: reduce`, render the finished lines statically instead of
typing (check via `window.matchMedia` once on mount).

**Done when:** headline string matches character-for-character, `npm run typecheck`
for this file, `npm run lint` and `npm run format:check` pass.

## Task 6 — Selected Work carousel

**File:** rewrite `src/componenets/Work.tsx`. Delete the old `projects` array and its
remote image URLs (R2).

Data: `resume.experience` (5 entries).

Structure — one `SectionShell id="work" index="02" label="SELECTED WORK"` containing:

- A viewport `<div className="overflow-hidden">` wrapping a track
  `<div style={{ transform: `translate3d(-${index * 100}%,0,0)` }}
className="flex transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform">`.
  Each slide is `className="w-full shrink-0"` and holds a `<Window>` whose `title` is
  the company and whose `meta` is `NN / 05`.
- Slide body: cluster name as the headline (`text-display-xs`), role + period line,
  the `stack` chips (`border border-line px-1 text-2xs text-cyan`), and the bullets.
  Bullets are collapsed to the first 2 by default; `Inspect Weights` toggles the full
  list for the active slide (Global Constraint 2 is satisfied because every bullet is
  reachable via that toggle — the toggle must be reachable on every slide).
- Controls row, text exactly: `Previous model`, `Inspect Weights`, `Next model`.
  Real `<button>`s, `disabled` at the ends (or wrap — pick wrap, and then never
  disable; state which in a comment). Plus 5 dot buttons with
  `aria-label={`Go to model ${n}`}` and `aria-current` on the active one.
- Keyboard: `ArrowLeft`/`ArrowRight` on the carousel container (`tabIndex={0}`,
  `role="group"`, `aria-roledescription="carousel"`).
- Touch: pointerdown/pointerup horizontal delta > 40px advances. ~12 lines, no
  library.
- Non-active slides get `aria-hidden` and `inert`-equivalent handling via
  `tabIndex={-1}` on their focusable children — or simply render controls outside the
  track and make slide content non-focusable except links. Prefer the simple route.

Under `prefers-reduced-motion: reduce` the track transition is `none` (handle in CSS
via the global reduced-motion block or a `motion-reduce:transition-none` utility).

**Done when:** the three trigger strings match verbatim, all 13 resume bullets across
the 5 entries are reachable, `npm run typecheck` for this file, `npm run lint` and
`npm run format:check` pass.

## Task 7 — Capabilities / tech stack

**File:** rewrite the contents of `src/componenets/Services.tsx` in place as the
Capabilities section. **Do not rename the file and do not create a new one** — Task 9
owns the rename to `Capabilities.tsx` and the matching `App.tsx` import (R11). The
default export may be named `Capabilities` internally; `App.tsx` imports it as a
default, so the binding name is free.

`SectionShell id="capabilities" index="03" label="CAPABILITIES"`.

Render `resume.skillGroups` as four `<Window>` panels in a responsive grid
(`grid-cols-2` desktop, `grid-cols-1` under `mq-900`), each panel:

- `title` = the group label uppercased; `meta` = `MODULES: {items.length}` and
  `{index+1}/4` (R8 — real counts only, no invented percentages). The four counts are
  10, 11, 18, 21 (R12).
- Body: the items as a terminal listing, each row
  `<span className="text-cyan">›</span> {item}`, in a two-column
  `columns-2 mq-600:columns-1` flow so the 25-item group does not run long.
- A `RainbowBar height="thin"` at the panel foot as the divider motif.

Drop every `src/assets` icon import and the resume-download block that lived here
(the resume link now lives in the header and hero). Do not delete the PNG files (R6).

**Done when:** all 60 resume skill items render, no icon imports remain, and
`npm run typecheck`, `npm run lint`, `npm run format:check` pass.

## Task 8 — Contact and footer

**Files:** rewrite `src/componenets/Contact.tsx` and `src/componenets/Footer.tsx`.

`Contact` — `SectionShell id="contact" index="04" label="CONTACT"`, two columns
(`grid-cols-2`, stacked under `mq-900`):

- Left `<Window title="~/protocols">`: the structured terminal grid. A real
  `<table>` (or a `grid grid-cols-[auto_1fr]`) with a header row
  `PROTOCOL` / `ADDRESS`, one row per `resume.protocols` entry, protocol name in
  `text-cyan`, value as an `<a>` when `href` is non-null. Below it, a `credentials`
  strip is _not_ here — it goes in the footer.
- Right `<Window title="~/transmit">`: the existing Firebase form (R5), preserved
  logic — `addDoc(collection(db, "contacts"), { name, email, message })`,
  `react-hot-toast` success/error, disabled-button guard. Restyle: inputs
  `bg-carbon-sunk border border-line text-phosphor placeholder:text-mute`, focus ring
  `cyan`; message becomes a `<textarea rows={4}>`; submit button reads
  `[ TRANSMIT ]` and `[ SENDING... ]` while disabled. Add `<label className="sr-only">`
  (or `aria-label`) per field. Drop `framer-motion` and the `vg.png` aside.
- Keep `toast.error` on failure; replace the bare `console.log(error)` with
  `console.error(error)`.

`Footer` — full-width `bg-void border-t border-line`:

- A `RainbowBar height="thick" />` across the top.
- Three columns (stacked under `mq-786`): identity (`resume.profile.name`, title,
  location); `EDUCATION & CERTIFICATIONS` from `resume.credentials` (Global
  Constraint 2); protocol shortlinks (github, linkedin, mailto) with `react-icons`
  glyphs and accessible names.
- Bottom strip: a monospace line, no hardcoded year drift — `© {new Date().getFullYear()}`.
- Delete the hardcoded remote avatar URL.

**Done when:** the form still writes to Firestore with unchanged field names, all six
protocols and both credentials render, `npm run typecheck` for these files,
`npm run lint` and `npm run format:check` pass.

## Task 9 — Wire up, delete dead code, verify

**Files:** `src/App.tsx`, `src/componenets/UITheme.tsx` (delete),
`src/componenets/Services.tsx` → `src/componenets/Capabilities.tsx` (rename),
`tailwind.config.js`, `src/styles/app.css`, `package.json`, `CLAUDE.md`.

This is the task that pays off R10 and R11 — it removes the old system Task 2
deliberately left standing, and performs the rename Task 7 deliberately skipped.

1. Rename `src/componenets/Services.tsx` to `src/componenets/Capabilities.tsx` with
   `git mv` (R11).
2. `App.tsx`: wrap everything in `<CRTScreen>`; render `Headerphone`, `Header`,
   `Home`, `Work`, `Capabilities`, `Contact`, `Footer`, `Toaster`. Drop the
   `UIThemeProvider` import and wrapper. Configure `<Toaster toastOptions>` so toasts
   match the theme (carbon background, phosphor text) — one small object, not a
   component.
3. Delete `src/componenets/UITheme.tsx` (R4). Then strip the old system that Task 2
   left in place:
   - `tailwind.config.js`: remove the `design`/`dev` `addVariant` plugin and the now
     unused `plugin` import (`plugins: []`); remove the superseded palette entries
     (`accent`, `canvas`, `slate`, `ink`, `teal`, `smoke`, `rule`, `dot`), the
     superseded `boxShadow` (`window`, `neon`) and the superseded keyframes/animations
     (`animateSvg`, `upanddown`, `upupdowndown`, `chevron`, `float`, `float-lg`) —
     **only** once nothing in `src/` references them.
   - `src/styles/app.css`: remove the Google Fonts `@import` line (the `<link>` in
     `index.html` replaced it), the `--ui-*` custom properties, every `[data-ui]`
     rule, `.ui-block*`, `.ui-block-label`, `.neon-cursor*` and `.tok-*`.
4. Grep `src/` and confirm zero remaining hits for: `UITheme`, `Block`,
   `LayoutToggle`, `useUITheme`, `data-ui`, `design:`, `dev:`, `ui-block`,
   `neon-cursor`, `tok-`, `framer-motion`, and the old palette classes (`accent`,
   `canvas`, `slate`, `ink-`, `teal`, `smoke`, `rule`, `dot-`, `font-display`,
   `animate-float`, `animate-chevron`). Fix any survivor.
5. `package.json`: remove `framer-motion` if nothing imports it (R7); run
   `npm install` to update the lockfile. Leave `typewriter-effect`, `react-icons`,
   `firebase`, `react-hot-toast`.
6. Full verification, all four, output pasted into the report:
   `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`.
7. Sanity-check the built CSS size — a `dist/assets/index-*.css` around ~3 kB means
   PostCSS did not run and every utility died (see CLAUDE.md); it should be tens of kB.
8. Update `CLAUDE.md`: rewrite the "Styling", "Layout modes", "Content locations" and
   "Removed in the Vite/TypeScript migration" sections to describe the new system
   (CRT layers, `src/data/resume.ts` as the content source, the removed dual-mode
   mechanic). Do not touch the note about `src/componenets/` being misspelled.

**Done when:** all four commands pass with output shown, and the greps in steps 2-3
return nothing.
