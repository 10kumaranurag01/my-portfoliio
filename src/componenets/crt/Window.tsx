import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
};

/** Charcoal window chrome: traffic-light dots + title strip over a body. */
export const Window = ({ title, meta, children }: WindowProps) => (
  <div className="rounded border border-line bg-carbon p-3 mq-600:p-2">
    <div className="mb-2 flex min-w-0 items-center gap-2">
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="h-1 w-1 rounded-full bg-bar-red" />
        <span className="h-1 w-1 rounded-full bg-bar-yellow" />
        <span className="h-1 w-1 rounded-full bg-bar-green" />
      </span>
      <h3 className="truncate text-2xs uppercase tracking-widest text-phosphor-dim">
        {title}
      </h3>
      {meta && <span className="ml-auto text-2xs text-mute">{meta}</span>}
    </div>
    {children}
  </div>
);
