// Shared terminal-trigger button/link styling. Was copy-pasted four times
// (Home, Work, Contact, Header) with Header carrying smaller padding — one
// definition each, callers compose extra classes on top.
export const triggerClass =
  "border border-line px-3 py-1 text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";

export const triggerClassSm =
  "border border-line px-2 py-0.5 text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";
