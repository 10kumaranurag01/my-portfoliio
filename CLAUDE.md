# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                       # dev server on http://localhost:3000 (alias of `npm run dev`)
npm run build                   # tsc --noEmit, then production build to /dist
npm run preview                 # serve the built /dist
npm run typecheck               # tsc --noEmit on its own
npm run lint                    # eslint .
npm run format                  # prettier --write .
npm run format:check            # prettier --check . (CI-shaped, writes nothing)
```

Vite 7 + `@vitejs/plugin-react`, TypeScript in `strict` mode. `build` runs `tsc --noEmit` first; lint and format stay separate from it locally, and `.github/workflows/ci.yml` runs `lint`, `format:check` and `build` on every PR and on pushes to `main` (Node 24, `npm ci`). There is no test runner and no test files exist, so nothing runs tests in CI. Vercel builds independently of this workflow — a red CI run does not block a deploy.

ESLint 9 flat config in `eslint.config.js` (`js.configs.recommended` + `typescript-eslint` recommended + `react-hooks` + `react-refresh`, scoped to `src/**/*.{ts,tsx}`). `eslint-config-prettier` is extended **last**, so ESLint owns correctness and Prettier owns formatting with no overlapping rules — don't add `eslint-plugin-prettier`, formatting violations are not lint errors here. `typescript-eslint`'s type-checked configs are not enabled; the plain `recommended` set runs without a program, which keeps `npm run lint` fast.

Prettier runs on defaults (`.prettierrc` is `{}`), which already matched the codebase — double quotes, semicolons, 2-space, 80 columns. It does not reflow the contents of the multi-line Tailwind `className` strings, since those are string literals.

Deploys via Vercel (`.vercel` is gitignored). `vercel.json` pins `framework: vite` and `outputDirectory: dist`, because the Vercel project predates the migration and its dashboard settings still pointed at CRA's `build` directory — the deploy failed with `No Output Directory named "build" found`. `vercel.json` takes precedence over the dashboard, so the fix lives in the repo rather than in project settings. If someone later switches the dashboard preset to Vite, this file becomes redundant but stays harmless.

## Architecture

Single-page portfolio site. TypeScript + TSX, no router. `index.html` lives in the project root (Vite convention) and loads `/src/main.tsx`, which mounts `App`; `App` wraps a fixed list of section components in `<CRTScreen>` and renders them top to bottom: `Header`, `Headerphone`, `Home`, `Work`, `Capabilities`, `Contact`, `Footer`, `Toaster`. Navigation is anchor links (`#home`, `#work`, `#capabilities`, `#contact`) against `id`s on the section wrappers — adding a "page" means adding a section component + an `id` + an entry in the `NAV_LINKS` array in `Header.tsx`.

`public/` is Vite's static-copy directory: files there are served from `/` verbatim (`/favicon.ico`, `/manifest.json`). Anything imported from `src/assets` goes through the bundler and gets hashed instead.

**`src/componenets/` is misspelled on disk.** Every import depends on it. Don't rename it as a drive-by cleanup.

### Styling — Tailwind, retro-CRT tokens enforced by override

All styling is Tailwind utilities in TSX. `src/styles/app.css` is the only stylesheet, imported once in `main.tsx`; it holds the `@tailwind` directives, the `--crt-*` custom properties, and a `@layer components` block with the CRT overlay layers. There are no SCSS files and no CSS modules.

Tailwind is wired through `postcss.config.js` (tailwindcss + autoprefixer), which Vite picks up automatically. If that file goes missing the build still succeeds but ships `@tailwind`/`@apply` unprocessed and every utility class dies — symptom is a ~3 kB `dist/assets/index-*.css` instead of tens of kB (currently ~16 kB). `package.json` is `"type": "module"`, so `postcss.config.js` and `tailwind.config.js` are both ESM (`export default`, not `module.exports`).

`tailwind.config.js` overrides (not extends) three scales, so the system is enforced rather than merely offered:

- **`spacing`** — 8px metric only: `1` = 8px, `2` = 16px, … plus a `0.5` = 4px half-step, a `nav` = 100px token for the sticky header's height (used as `scroll-mt-nav` on every section and in `min-h-[calc(100vh-theme(spacing.nav))]` on the hero, so the 100px lives in one place), and the viewport page gutters (`page`, `page-md`, `page-base`, `page-sm`). Off-grid values must be written as arbitrary values (`p-[13px]`), which makes them visible in review.
- **`colors`** — project palette only, so a stray `bg-blue-500` generates no CSS instead of shipping an off-palette colour. The palette is the retro-CRT set: `void` (page base, matte black), `carbon` / `carbon-raised` / `carbon-sunk` (window chrome fills), `phosphor` / `phosphor-bright` / `phosphor-dim` (body text and headings), `cyan` / `cyan-dim` (links, active state), `amber` (warn/highlight), `mute` (disabled/meta text), `line` / `line-bright` (1px borders), and `bar-red`/`bar-orange`/`bar-yellow`/`bar-green`/`bar-cyan`/`bar-blue` (the mandated 6-stripe rainbow, in that order). There is no `accent` token any more — the previous pink/orange accent system and its `canvas`/`slate`/`ink`/`teal`/`smoke`/`rule`/`dot` colours were removed wholesale in the retro-CRT overhaul (see "Removed" below).
- **`screens`** — the site's breakpoints are all max-width and named `mq-1367`, `mq-1100`, `mq-900`, `mq-786`, `mq-600`, `mq-425`, listed widest first so narrower queries win. There are no `sm:`/`md:`/`lg:` variants; `mq-900:gap-2` means "at 900px and below".

One family, monospace-only: JetBrains Mono (400/500/700), loaded via `<link>` in `index.html` (preconnect + stylesheet), not a CSS `@import`. `fontFamily.sans`/`display`/`mono` all alias the same stack so nothing falls back to a proportional face. Font sizes larger than Tailwind's defaults are `text-display`, `text-display-sm`, `text-display-xs`, plus a `text-2xs` for meta/label text. `.text-glow` / `.text-glow-cyan` (the phosphor/cyan text-shadow utilities used on headings) are hand-written `text-shadow` rules in `app.css` (around `:142-148`), not generated from a token; `boxShadow.glow` / `glow-cyan` are unrelated and back the unused `shadow-glow` / `shadow-glow-cyan` box-_shadow_ utilities instead.

`tailwind.config.js`'s `keyframes`/`animation` define four entries — `scan` (scanline sweep, drives `.crt-sweep`), `drift` (matrix grid, drives `.crt-grid`), `caret` (terminal cursor blink, used by `Home`'s boot telemetry) — plus `flicker`, which is unused: nothing renders a flicker overlay, so it's dead but harmless (kept per the "unused tokens are free" policy below). The `@media (prefers-reduced-motion: reduce)` block in `app.css` sets `animation: none` on the two animated CRT layers and `scroll-behavior: auto` on `html` (anchor-nav scrolling is otherwise `smooth`). `plugins: []`; there is no Tailwind plugin registered.

### CRT shell

The portfolio used to ship a light-themed `design`/`dev` dual-layout mode (toggle button, `<html data-ui="...">`, neon cursor, `design:`/`dev:` Tailwind variants) alongside the CRT rebuild so every intermediate commit kept compiling. That mechanic — `src/componenets/UITheme.tsx`, its `UIThemeProvider`/`useUITheme`/`LayoutToggle`/`Block` exports, the `--ui-*` custom properties, and the `design:`/`dev:` variant plugin — has been deleted; there is now exactly one visual theme.

`App.tsx` renders the section list directly, wrapped in `<CRTScreen>` (`src/componenets/crt/CRTScreen.tsx`). `CRTScreen` returns a fragment — it adds no wrapper element, so it creates no scroll or stacking container over the sticky header — and renders four fixed, `aria-hidden`, `pointer-events: none` overlay layers after its children: `.crt-grid` (drifting matrix grid, `z-index: -1`), `.crt-scanlines` (static fine lines plus an animated sweep bar, `z-index: 200`), `.crt-vignette` (corner darkening, `z-index: 201`), `.crt-bezel` (rounded inset frame, `z-index: 202`). All four are defined in `app.css`'s `@layer components` and tuned by the `--crt-*` custom properties declared on `:root`.

Four more shared primitives live in `src/componenets/crt/` (all re-exported from `crt/index.ts`):

- `RainbowBar` — the 6 `bar-*` stripes, `flex`, each `flex-1`; `height` is `"thin"` (4px) or `"thick"` (8px).
- `Window` — the charcoal container used for every card/panel: `bg-carbon`, `border border-line`, rounded, a title strip with three chrome dots plus a monospace `title` (rendered as an `<h3>`, so every panel/card has a real heading) and optional `meta` label.
- `SectionShell` — the section wrapper: `<section id>`, `scroll-mt-nav` (so anchor-nav landings clear the sticky header) + a `// NN LABEL` heading (a space, not an em dash) + a `RainbowBar` divider + children. This replaces the old `Block`.
- `triggerClass` / `triggerClassSm` — plain string constants for the terminal-style `[ LABEL ]` trigger buttons/links (bordered, uppercase, cyan hover-glow), shared by `Home`, `Work`, `Contact` and `Header`'s email link so the class string doesn't get copy-pasted again; `Sm` is `Header`'s smaller `px-2 py-0.5` padding.

Every mode-dependent CSS hook (`design:`/`dev:` variants, `--ui-*` properties, `.ui-block*`, `.neon-cursor*`, `.tok-*`) is gone along with the components that used it — styling is one static Tailwind config now, no data-attribute branching.

### Firebase

`src/firebase.ts` initializes the app and exports `db` (Firestore only — no Auth, no Storage). The config is hardcoded, not env-driven. The only write path is `Contact.tsx`, which `addDoc`s `{name, email, message}` into the `contacts` collection and reports via `react-hot-toast`. Anyone can post to that collection; access control lives in Firestore security rules on the Firebase console, not in this repo.

### Content locations

`src/data/resume.ts` is the single source of resume content — every name, title, date, company, bullet, skill and contact address rendered anywhere on the site is exported from here, traced back to the resume in `docs/superpowers/plans/resume-source.tex`. No component hardcodes resume strings (the mandated verbatim UI copy — the hero headline and the carousel's three trigger labels — is UI copy, not resume data, and stays in its component). What it exports and who reads it:

- `profile` — name, title, location. Read by `Header`, `Home`, `Footer`.
- `summary` — the one-paragraph bio. Read by `Home`.
- `protocols` — contact addresses (`mailto`, `tel`, `geo`, `linkedin`, `github`, `https`), each `{protocol, value, href}` with `href: null` for `geo`. Read by `Header` (email + resume link), `Contact` (the protocol table), `Footer` (the channel icons).
- `skillGroups` — the capability lists. Read by `Capabilities` and referenced by `Home`'s boot telemetry (`skillGroups.length`).
- `experience` — the work-history carousel entries (`{id, company, role, period, cluster, bullets, stack}`). Read by `Work`.
- `credentials` — education/certifications. Read by `Footer`.
- `resumeFile` — re-exported module import of `src/assets/Kumar_Anurag.pdf`. Read by `Header` and `Home`. Replacing the PDF is enough; both links follow.

Local images are ES-module imports from `src/assets`; the `src/componenets/crt/` primitives and section components otherwise use only Tailwind utilities and `react-icons`, no other image assets.

### Removed in the Vite/TypeScript migration

`Timeline.jsx`, `Testimonial.jsx` and `src/assets/data.json` were unrendered dead code carrying class names from the deleted SCSS; they were dropped rather than converted. `react-scripts`, `sass`, `web-vitals` and the `@testing-library/*` packages went with them (nothing imported them, and there was no `reportWebVitals` call or test file). Recover any of it from the history if it turns out to be wanted.

The retro-CRT overhaul that followed removed the rest of the pre-existing system: `Services.tsx` was renamed to `Capabilities.tsx` (the component itself was already rewritten); `src/componenets/UITheme.tsx` and the whole `design`/`dev` dual-layout mode were deleted (see "CRT shell" above); the superseded `tailwind.config.js` palette entries (`accent`, `canvas`, `slate`, `ink`, `teal`, `smoke`, `rule`, `dot`), `boxShadow` entries (`window`, `neon`) and keyframes/animations (`animateSvg`/`chevron`, `upanddown`/`float`, `upupdowndown`/`float-lg`) were removed once nothing in `src/` referenced them; and the `framer-motion` dependency was dropped from `package.json` once its last import was replaced. `src/assets` still holds several dozen now-unimported PNGs, a stray JPG and `Deedy_CV.pdf` from before the rewrite — unimported files aren't bundled, so they were left on disk rather than cleaned up.
