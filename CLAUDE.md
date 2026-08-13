# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                       # dev server on http://localhost:3000
npm run build                   # production build to /build
npm test                        # Jest watch mode (react-scripts test)
npm test -- --testPathPattern=Contact --watchAll=false   # single test file, no watch
```

Create React App (`react-scripts` 5) — no separate lint step; ESLint (`react-app` config) runs as part of `start`/`build` and surfaces warnings in the terminal and browser console. No test files exist yet.

Deploys via Vercel (`.vercel` is gitignored); no deploy config is committed.

## Architecture

Single-page portfolio site. Plain JavaScript + JSX, no TypeScript, no router. `src/index.js` mounts `App`, which wraps everything in `UIThemeProvider` and renders a fixed list of section components top to bottom. Navigation is anchor links (`#home`, `#services`, `#work`, `#contact`) against `id`s on the section wrappers — adding a "page" means adding a section component + an `id` + an entry in the `navLinks` array in `Header.jsx`.

**`src/componenets/` is misspelled on disk.** Every import depends on it. Don't rename it as a drive-by cleanup.

### Styling — Tailwind, tokens enforced by override

All styling is Tailwind utilities in JSX. `src/styles/app.css` is the only stylesheet, imported once in `index.js`; it holds the `@tailwind` directives, the `--ui-*` custom properties, and a small `@layer components` block. There are no SCSS files and no CSS modules.

**Tailwind is wired through CRA's built-in support, which is gated on the literal existence of `tailwind.config.js` in the project root** (`node_modules/react-scripts/config/webpack.config.js:72`). If that file is renamed (`.cjs`, `.mjs`, `.ts`) or moved, react-scripts silently swaps Tailwind out of its PostCSS chain: the build still succeeds, but `@tailwind`/`@apply` ship to the browser unprocessed and every utility class dies. Symptom is a ~3 kB `main.*.css` instead of ~22 kB. CRACO is deliberately *not* used — it was tried and its `style.postcss` override did not reach the loader on react-scripts 5.

`tailwind.config.js` overrides (not extends) three scales, so the system is enforced rather than merely offered:

- **`spacing`** — 8px metric only: `1` = 8px, `2` = 16px, … plus a `0.5` = 4px half-step and the viewport page gutters (`page`, `page-md`, `page-base`, `page-sm`). Off-grid values must be written as arbitrary values (`p-[13px]`), which makes them visible in review. Ported values from the old SCSS were snapped to the nearest multiple of 8, so a few sizes moved by a pixel or two (nav height 100px → 96px, footer avatar 100px → 96px).
- **`colors`** — project palette only, so a stray `bg-blue-500` generates no CSS instead of shipping an off-palette colour. Primary accent is `accent` = `#ff79c6` (this replaced the previous orange `#f26440` everywhere).
- **`screens`** — the site's breakpoints are all max-width and named `mq-1367`, `mq-1100`, `mq-900`, `mq-786`, `mq-600`, `mq-425`, listed widest first so narrower queries win. There are no `sm:`/`md:`/`lg:` variants; `mq-900:gap-2` means "at 900px and below".

Font sizes larger than Tailwind's defaults are `text-display`, `text-display-sm`, `text-display-xs`. The old keyframes are `animate-chevron`, `animate-float`, `animate-float-lg`.

### Layout modes

`src/componenets/UITheme.jsx` holds the whole mechanic in one file:

- `UIThemeProvider` — owns the mode (`"design"` | `"dev"`), persists it to `localStorage` under `ui-layout-mode`, and writes it to `<html data-ui="...">`. Also renders the neon pointer and updates its `--nx`/`--ny` from `pointermove` directly on the DOM node, so pointer movement never re-renders React.
- `useUITheme()` — `{ mode, setMode, toggleMode }`.
- `LayoutToggle` — the switch, mounted in both `Header` and `Headerphone`.
- `Block` — section shell. Replaces the section's root `<div id=...>` rather than wrapping it, so it adds no DOM depth. Renders the per-mode chrome and the code-style label.

Because the mode lives on `<html>`, **mode-dependent styling is CSS, not conditional JSX**. Two ways to hook it:

- `design:` / `dev:` Tailwind variants (registered as a plugin in `tailwind.config.js`) — e.g. `dev:bg-[var(--ui-panel)]`.
- the `--ui-*` custom properties in `app.css`, which are redefined under `[data-ui="dev"]`. Anything that should invert between modes (page background, body text) reads `var(--ui-bg)` / `var(--ui-fg)` instead of a palette token. Surfaces that stay dark in both modes (`bg-slate` on Services and the Contact aside, `bg-ink` on the footer) use palette tokens directly.

Design mode draws its 8px canvas grid on `body::before`, keyed to `--ui-step` so the grid *is* the spacing metric. The neon pointer only takes over `cursor` behind `@media (pointer: fine) and (prefers-reduced-motion: no-preference)`.

Not built yet: the raw-source snippet overlays for dev mode. The syntax-token classes (`.tok-tag`, `.tok-attr`, `.tok-str`, `.tok-punct`) exist and are currently only used by the `Block` label.

### Firebase

`src/firebase.js` initializes the app and exports `db` (Firestore only — no Auth, no Storage). The config is hardcoded, not env-driven. The only write path is `Contact.jsx`, which `addDoc`s `{name, email, message}` into the `contacts` collection and reports via `react-hot-toast`. Anyone can post to that collection; access control lives in Firestore security rules on the Firebase console, not in this repo.

### Content locations

Content is hardcoded in JSX, not fetched:

- **Projects** — the `projects` array at the top of `Work.jsx` (`{title, img, url, blurb}`). Add a project by adding an entry; the card chrome is written once.
- **Tech icons** — the `technologies` and `tools` arrays in `Services.jsx`, built from ~24 individual asset imports, some with spaces or commas in the filename.
- **Resume** — `src/assets/Kumar_Anurag.pdf`, imported as a module in `Home.jsx` and `Services.jsx`. Replacing the file is enough; all three links follow.
- Local images are ES-module imports from `src/assets`; several project screenshots in `Work.jsx` and the avatar in `Footer.jsx` are hardcoded remote URLs (ibb.co, pixabay, githubusercontent) that can rot.

### Dead code

`Timeline.jsx` and `Testimonial.jsx` are not rendered by `App.js` and were not migrated — they still carry class names from the deleted SCSS, so they would render unstyled. `src/assets/data.json` was only ever read by `Timeline.jsx`, so nothing reads it now. Delete all three together, or migrate them, but don't assume they feed the live page.
