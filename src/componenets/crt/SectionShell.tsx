import type { ReactNode } from "react";
import { RainbowBar } from "./RainbowBar";

type SectionShellProps = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
};

/** Section wrapper: anchor id, `// NN LABEL` heading, rainbow divider. */
export const SectionShell = ({
  id,
  index,
  label,
  children,
}: SectionShellProps) => (
  <section
    id={id}
    className="scroll-mt-nav px-page py-10 mq-1367:px-page-md mq-1100:px-page-base mq-900:px-page-sm mq-900:py-6"
  >
    <h2 className="text-display-xs uppercase tracking-widest text-phosphor-bright">
      <span className="text-cyan" aria-hidden="true">
        // {index}
      </span>{" "}
      {label}
    </h2>
    <RainbowBar height="thin" className="mt-2 mb-6" />
    {children}
  </section>
);
