# my-portfoliio

Single-page portfolio for Kumar Anurag Sahu, built as a retro-CRT terminal:
phosphor green on near-black, scanlines, JetBrains Mono only. No router, no
test runner. `App` renders a fixed list of sections and navigation is anchor
links against their `id`s.

Stack: React 18, Vite 7, TypeScript in `strict` mode, Tailwind (with the
`colors`, `spacing` and `screens` scales overridden rather than extended, so an
off-palette utility emits no CSS), Firestore for the contact form.

## Commands

```bash
npm start          # dev server on http://localhost:3000 (alias of npm run dev)
npm run build      # tsc --noEmit, then production build to /dist
npm run preview    # serve the built /dist
npm run typecheck  # tsc --noEmit on its own
npm run lint       # eslint .
npm run format     # prettier --write .
```

CI (`.github/workflows/ci.yml`) runs `lint`, `format:check` and `build` on
Node 24.

## Content

`src/data/resume.ts` is the single source of every name, date, company,
bullet, skill and contact address on the site. Edit content there, not in
components. The resume PDF is `src/assets/Kumar_Anurag.pdf`, re-exported from
the same module: replace the file and both download links follow.

`src/componenets/` is misspelled on disk and every import depends on it. Leave
it alone.

## Deploy

Vercel, on push. `vercel.json` pins `framework: vite` and
`outputDirectory: dist` because the Vercel project predates the migration from
Create React App and its dashboard settings still point at CRA's `build`
directory; the file overrides them.
