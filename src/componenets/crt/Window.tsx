import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  meta?: ReactNode;
  /**
   * Element the title strip renders as. An unconditional `<h3>` put every
   * panel in the document outline, including the purely decorative hero
   * terminal, which broke the order to H1 -> H3 -> H2 (WCAG 1.3.1). That
   * panel passes "p" so it stays out of the outline entirely.
   */
  titleAs?: "h2" | "h3" | "p";
  children: ReactNode;
};

/**
 * Charcoal window chrome: a title strip over a body.
 *
 * The traffic-light dot triad is gone. Twelve instances meant 36 dots with no
 * state behind them, which made them the page's highest-count decoration and
 * the only non-systemic use of the `bar-*` rainbow. The 1px `line` border and
 * the monospace strip carry the chrome on their own.
 *
 * The title is `text-sm text-phosphor-bright`, not the old `text-2xs
 * text-phosphor-dim`: on Work it holds the company name, so an 11px dimmest
 * tier made the marked-up heading the least visible string in its own card.
 */
export const Window = ({
  title,
  meta,
  titleAs = "h3",
  children,
}: WindowProps) => {
  const Tag = titleAs;

  return (
    <div className="rounded border border-line bg-carbon p-3 mq-600:p-2">
      <div className="mb-2 flex min-w-0 items-center gap-2">
        <Tag className="truncate text-sm uppercase tracking-widest text-phosphor-bright">
          {title}
        </Tag>
        {meta && (
          <span className="ml-auto shrink-0 text-2xs text-phosphor-dim">
            {meta}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
