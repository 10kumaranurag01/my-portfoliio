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

Single-page portfolio site. Plain JavaScript + JSX, no TypeScript, no router. `src/index.js` mounts `App`, which renders a fixed list of section components top to bottom. Navigation is anchor links (`#home`, `#services`, `#work`, `#contact`) against `id`s on the section wrappers — adding a "page" means adding a section component + an `id` + a nav link in `Header.jsx`.

**`src/componenets/` is misspelled on disk.** Every import depends on it. Don't rename it as a drive-by cleanup.

### Styling — global SCSS, tag/ID selectors

All styling is one global stylesheet: `src/styles/app.scss` is imported once in `index.js` and `@import`s every partial. No CSS modules, no per-component imports.

- `statics.scss` — all variables: colors (`$color1`…`$color6_2`), fonts (`$text1`, `$text2`), vmax-based spacing scale (`$p`, `$p_md`, `$p_base`, `$p_sm`…). Use these rather than literals.
- One partial per section (`home.scss`, `work.scss`, …) matching the component.
- `mediaquery.scss` — **all** responsive overrides for **all** sections live here, not next to the base rules. A layout change usually needs an edit in the section partial *and* in `mediaquery.scss`, or the change silently disappears below 1367px.
- `animations.scss` — shared CSS keyframes.

Selectors are element- and ID-based (`#home > section:first-of-type`, `aside`, `article`, `> img`) with very few class names. Reordering or wrapping markup inside a section breaks its styles even when the JSX looks fine.

### Animations

Framer Motion, used per-component: each component declares a local `animations` object literal and spreads it into `motion.*` elements (`<motion.form {...animations.form}>`). Follow that pattern instead of introducing shared variants.

### Firebase

`src/firebase.js` initializes the app and exports `db` (Firestore only — no Auth, no Storage). The config is hardcoded, not env-driven. The only write path is `Contact.jsx`, which `addDoc`s `{name, email, message}` into the `contacts` collection and reports via `react-hot-toast`. Anyone can post to that collection; access control lives in Firestore security rules on the Firebase console, not in this repo.

### Content locations

Content is hardcoded in JSX, not data-driven:

- **Projects** live as repeated `.workItem` blocks inside `Work.jsx`. Add a project by copying a block there.
- `src/assets/data.json` (`projects[]`) is consumed only by `Timeline.jsx` — and `Timeline` is not rendered by `App.js`. Editing `data.json` changes nothing visible.
- **Resume** is `src/assets/Kumar_Anurag.pdf`, linked in three places via `require(...)` (`Home.jsx` ×2, `Services.jsx`). Replacing the resume means replacing that file; all three links follow.
- Local images are ES-module imports from `src/assets`; several project screenshots in `Work.jsx` and the avatar in `Footer.jsx` are hardcoded remote URLs (ibb.co, pixabay, githubusercontent) that can rot.
- Tech-stack icons are ~25 individual imports at the top of `Services.jsx`, some with spaces/commas in the filename.

### Known dead code

`App.js` imports `Timeline` and `Testimonial` but renders neither, and passes a `ratio` prop to `Home`, which ignores it (`Home` takes no props). The `ratio` state + resize listener in `App.js` and its `console.log` are therefore inert. Safe to remove if touching `App.js`; don't assume they feed anything.
