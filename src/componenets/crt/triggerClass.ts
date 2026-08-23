// Shared terminal-trigger button/link styling. Was copy-pasted four times
// (Home, Work, Contact, Header) with Header carrying smaller padding — one
// definition each, callers compose extra classes on top.
//
// Two tiers, and only two. `border-line-strong` (not decorative `border-line`)
// because a control's boundary is a non-text UI component under WCAG 1.4.11
// and has to clear 3:1; label text is `text-phosphor`, not `phosphor-dim`,
// because these are the things a visitor is meant to click.
export const triggerClass =
  "border border-line-strong px-3 py-1 text-2xs uppercase tracking-widest text-phosphor transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";

export const triggerClassSm =
  "border border-line-strong px-2 py-0.5 text-2xs uppercase tracking-widest text-phosphor transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";

// Amber is the site's only highlight tier and is reserved for the resume
// action, so the one metric PRODUCT.md names ("a recruiter reaching the resume
// download") has a mechanism to be the loudest thing on screen. Spending it
// anywhere else spends it everywhere.
//
// Filled by default, and `text-sm` rather than the `text-2xs` the secondary
// tier uses: outlined amber at 11px lost to the 14px nav links beside it on
// both size and contrast (phosphor is 16.80:1, amber 13.65:1), so hue was the
// only thing left carrying priority — which is nothing under deuteranopia.
// Fill is the tier signal; the hover inverts to the outline, and 13.65:1 holds
// in both directions so neither state is the legible one.
export const triggerClassPrimary =
  "border border-amber bg-amber px-3 py-1 text-sm font-medium uppercase tracking-widest text-void transition-colors hover:bg-transparent hover:text-amber";

export const triggerClassSmPrimary =
  "border border-amber bg-amber px-2 py-0.5 text-sm font-medium uppercase tracking-widest text-void transition-colors hover:bg-transparent hover:text-amber";
