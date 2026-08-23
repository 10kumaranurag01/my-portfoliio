# Product

## Register

brand

## Users

Recruiters and hiring managers, mostly non-engineers, arriving from a resume link, a job application, or LinkedIn. They are skimming, not reading: they want role fit, company names, dates, stack keywords, and a downloadable resume inside the first fifteen seconds. Many will be on a laptop between calls; a meaningful share arrive on a phone. Secondary visitors are the engineers those recruiters forward the link to, who will judge whether the site itself is well built.

The job to be done: decide "is this person worth a call?" fast, then get the resume and a contact address without hunting.

## Product Purpose

A single-page portfolio for Kumar Anurag that presents the resume as a live artifact rather than an attachment. All content is sourced from `src/data/resume.ts`, so the site and the PDF never drift. Success is a recruiter reaching the resume download or the contact form without scrolling back up, and remembering the site afterwards.

## Brand Personality

Retro-CRT terminal: phosphor green on matte black, scanlines, a six-stripe rainbow bar, JetBrains Mono only. Three words: **exact, built, unfashionable.** The voice is an instrument panel, not a costume: the terminal styling is a real system (enforced Tailwind token overrides, one stylesheet, one font family), not a skin. It should read as someone who cares about how things are made, and who is not chasing the current portfolio aesthetic.

This voice is locked. Critique judges execution inside the CRT lane rather than proposing a different aesthetic.

## Anti-references

- **Generic AI/SaaS template portfolio.** Gradient hero text, three identical icon-heading-body cards, Inter, purple-blue glow, hero metric row.
- **Corporate / LinkedIn-flavored.** Safe beige professionalism, stock photography, hedged copy.
- **Costume-y hacker theme.** Matrix rain, fake typing animations, green-on-black used as decoration rather than as a system. The CRT layer must stay subordinate to the content, never perform.

## Design Principles

1. **The medium is the evidence.** The site's own build quality is the strongest claim on the page. Nothing may ship that a reviewing engineer would call sloppy.
2. **Resume data has one home.** Every string a visitor reads comes from `src/data/resume.ts` and traces to the source resume. No component invents facts.
3. **Skimmable before atmospheric.** A recruiter must get name, role, and the resume link before any CRT effect earns their attention. Effects never cost legibility.
4. **Tokens over vibes.** Spacing, colour, and breakpoints are overridden scales in `tailwind.config.js`; off-system values must be written as arbitrary values so they are visible in review.
5. **Unfashionable on purpose.** When a choice is between the current portfolio convention and the terminal logic, take the terminal logic.

## Accessibility & Inclusion

WCAG 2.1 AA is the bar. Contrast ratios (phosphor and cyan on `void`, `mute` meta text), keyboard operability of the stack section's `<details>` disclosures, the mobile nav panel, and the contact form, visible focus indicators against a dark background, and correct heading order are treated as blocking issues. `prefers-reduced-motion: reduce` must disable the scanline sweep and grid drift; it currently does in `src/styles/app.css`, and any new motion must join that block.
