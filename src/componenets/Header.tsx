import type { Dispatch, SetStateAction } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RainbowBar } from "./crt";
import { profile, protocols, resumeFile } from "../data/resume";

type MenuProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

// Terminal-path presentation, shared verbatim between the desktop bar and the
// mobile menu so the two never diverge. `href` targets the section id the
// later tasks own; `label` is the path segment shown to the visitor.
const NAV_LINKS = [
  { label: "home", href: "#home" },
  { label: "work", href: "#work" },
  { label: "stack", href: "#capabilities" },
  { label: "contact", href: "#contact" },
] as const;

// Single source of the contact email: found by protocol, never hardcoded.
const emailProtocol = protocols.find((entry) => entry.protocol === "mailto");

const navLinkClass =
  "text-phosphor-dim tracking-wide transition-colors hover:text-cyan hover:text-glow-cyan";

const actionLinkClass =
  "text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:text-cyan hover:text-glow-cyan";

const emailLinkClass =
  "border border-line px-2 py-0.5 text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";

const Header = ({ setMenuOpen, menuOpen }: MenuProps) => (
  <>
    <nav className="sticky top-0 z-[60] w-full">
      <RainbowBar height="thin" />

      <div
        className="flex h-12 w-full items-center justify-between border-b
                   border-line bg-void/90 px-page backdrop-blur
                   mq-1367:px-page-md mq-1100:px-page-base mq-900:px-page-sm"
      >
        <p
          className="min-w-0 truncate text-sm uppercase tracking-widest
                     text-phosphor-bright mq-900:text-2xs"
        >
          {profile.name}
        </p>

        <div className="flex items-center gap-4 mq-900:gap-2 mq-786:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              ~/{label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 mq-900:gap-2 mq-786:hidden">
          {emailProtocol && (
            <a
              href={emailProtocol.href ?? undefined}
              className={emailLinkClass}
            >
              [ EMAIL ]
            </a>
          )}
          <a
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
            className={actionLinkClass}
          >
            RESUME
          </a>
        </div>
      </div>
    </nav>

    <button
      type="button"
      className="fixed right-4 top-4 z-[150] hidden h-5 w-5 border-none
                 bg-transparent text-2xl text-phosphor hover:text-cyan
                 mq-786:block"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      <AiOutlineMenu aria-hidden="true" />
    </button>
  </>
);

export const Headerphone = ({ menuOpen, setMenuOpen }: MenuProps) => {
  // Off-screen via transform when closed; also drop every link out of the
  // tab order so the hidden panel can't be reached by keyboard.
  const tabIndex = menuOpen ? undefined : -1;

  return (
    <div
      className={`fixed top-0 z-[100] flex h-screen w-full flex-col
                  items-center justify-center gap-6 bg-void p-page-base
                  transition-transform duration-500 motion-reduce:transition-none
                  ${menuOpen ? "translate-y-0" : "-translate-y-[200%]"}`}
      aria-hidden={!menuOpen}
    >
      <RainbowBar height="thin" className="absolute inset-x-0 top-0" />

      <p className="text-center text-display-xs uppercase tracking-widest text-phosphor-bright">
        {profile.name}
      </p>

      <div className="flex flex-col items-center gap-4">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            tabIndex={tabIndex}
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            ~/{label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {emailProtocol && (
          <a
            href={emailProtocol.href ?? undefined}
            tabIndex={tabIndex}
            className={emailLinkClass}
          >
            [ EMAIL ]
          </a>
        )}
        <a
          href={resumeFile}
          target="_blank"
          rel="noreferrer"
          tabIndex={tabIndex}
          className={actionLinkClass}
        >
          RESUME
        </a>
      </div>
    </div>
  );
};

export default Header;
