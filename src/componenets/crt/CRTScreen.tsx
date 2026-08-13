import type { ReactNode } from "react";

type CRTScreenProps = {
  children: ReactNode;
};

/**
 * Root CRT overlay. Renders `children` followed by the four fixed overlay
 * layers (matrix grid, scanlines + sweep, vignette, bezel). Returns a
 * fragment — no wrapper element — so it creates no scroll/stacking
 * container over the sticky header; the fixed layers stack via the
 * `.crt-*` z-index rules in app.css.
 */
export const CRTScreen = ({ children }: CRTScreenProps) => (
  <>
    {children}
    <div className="crt-grid" aria-hidden="true" />
    <div className="crt-scanlines" aria-hidden="true">
      <div className="crt-sweep" />
    </div>
    <div className="crt-vignette" aria-hidden="true" />
    <div className="crt-bezel" aria-hidden="true" />
  </>
);
