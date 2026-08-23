import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  RainbowBar,
  triggerClassSm,
  triggerClassPrimary,
  triggerClassSmPrimary,
} from "./crt";
import { profile, protocols, resumeFile, resumeFileName } from "../data/resume";

type MenuProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

// The two components below are siblings under `App`, so they share no ref.
// These ids are how the panel finds its trigger again (focus return) and how
// the trigger names the thing it controls.
const MENU_TOGGLE_ID = "nav-menu-toggle";
const MENU_PANEL_ID = "nav-menu";

// Terminal-path presentation, shared verbatim between the desktop bar and the
// mobile menu so the two never diverge. `href` targets the section id the
// later tasks own; `label` is the stylised path segment shown to the
// visitor; `aria` is the plain accessible name (the "~/" prefix reads as
// "tilde slash" to a screen reader, so it doesn't belong in the a11y tree).
const NAV_LINKS = [
  { label: "home", href: "#home", aria: "Home" },
  { label: "work", href: "#work", aria: "Work" },
  { label: "stack", href: "#capabilities", aria: "Stack" },
  { label: "contact", href: "#contact", aria: "Contact" },
] as const;

// Single source of the contact email: found by protocol, never hardcoded.
const emailProtocol = protocols.find((entry) => entry.protocol === "mailto");

// `py-1` is a pointer-target size, not visual rhythm: the text alone is ~15px
// tall, under WCAG 2.5.8's 24px minimum. These links are flex items, so the
// padding is real box height. `text-phosphor` rather than `-dim` because the
// fixed CRT vignette is at its darkest over the header band, where dim
// measures 2.23:1. `text-sm` is pinned rather than inherited: unset, these
// resolved to the 16px root default, so five secondary nav links out-sized the
// resume CTA sitting right next to them.
const navLinkClass =
  "py-1 text-sm text-phosphor tracking-wide transition-colors hover:text-cyan hover:text-glow-cyan";

const Header = ({ setMenuOpen, menuOpen }: MenuProps) => (
  <nav className="sticky top-0 z-[60] w-full">
    <RainbowBar height="thin" />

    <div
      className="flex h-12 w-full items-center justify-between gap-2 border-b
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
        {NAV_LINKS.map(({ label, href, aria }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            aria-label={aria}
            className={navLinkClass}
          >
            ~/{label}
          </a>
        ))}
      </div>

      {/* Never hidden: the resume link is the page's success criterion, so it
          survives every breakpoint. Only the nav links and the email collapse
          into the menu. `shrink-0` makes the brand name truncate instead. */}
      <div className="flex shrink-0 items-center gap-4 mq-900:gap-2">
        {emailProtocol && (
          <a
            href={emailProtocol.href ?? undefined}
            aria-label="Email"
            className={`${navLinkClass} mq-786:hidden`}
          >
            ~/email
          </a>
        )}

        {/* `download` carries the filename explicitly: bare `download` takes it
            from the URL, and `resumeFile` is a bundled asset whose URL is
            content-hashed, so the recruiter would save `Kumar_Anurag-C3MKz8vz.pdf`.
            The new tab is the fallback for browsers that ignore `download` on a
            PDF and hand it to their viewer instead. Same three attributes on
            every resume link across the site. */}
        <a
          href={resumeFile}
          download={resumeFileName}
          target="_blank"
          rel="noreferrer"
          aria-label="Download resume PDF"
          className={triggerClassSmPrimary}
        >
          [ RESUME ]
        </a>

        {/* In the flow of the bar, not `fixed`, so it can't land on top of the
            resume link. The open panel covers it; the panel carries its own
            close control. */}
        <button
          type="button"
          id={MENU_TOGGLE_ID}
          className="hidden h-5 w-5 items-center justify-center border-none
                     bg-transparent text-2xl text-phosphor hover:text-cyan
                     mq-786:flex"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls={MENU_PANEL_ID}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <AiOutlineMenu aria-hidden="true" />
        </button>
      </div>
    </div>
  </nav>
);

export const Headerphone = ({ menuOpen, setMenuOpen }: MenuProps) => {
  // Off-screen via transform when closed; also drop every control out of the
  // tab order so the hidden panel can't be reached by keyboard.
  const tabIndex = menuOpen ? undefined : -1;
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Which of the two ways this panel closes just happened. Dismissal (CLOSE,
  // Escape) owes the visitor focus back on the trigger; navigation does not —
  // restoring it there threw them back to the top of the header right after
  // they picked a section, and reset the browser's sequential-focus starting
  // point away from the anchor target.
  const restoreFocusOnClose = useRef(true);

  // Everything an overlay owes the keyboard, in one effect: focus in, Tab
  // trapped, Escape out, no scrolling the page behind it, focus back on the
  // trigger. The trap is what earns `aria-modal`: the panel is an opaque
  // full-viewport fill, so anything still reachable behind it would take a
  // focus ring the visitor cannot see.
  useEffect(() => {
    if (!menuOpen) return;

    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      // Static markup: every focusable in here is an <a href> or a <button>.
      const focusables = panel?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!panel || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // Clicking the panel's own background drops activeElement to <body>, so
      // "outside the panel" is a reachable state even without a stray Tab.
      if (!panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (restoreFocusOnClose.current) {
        document.getElementById(MENU_TOGGLE_ID)?.focus();
      }
      restoreFocusOnClose.current = true;
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div
      id={MENU_PANEL_ID}
      ref={panelRef}
      role="dialog"
      aria-modal={menuOpen}
      aria-label="Menu"
      // overflow-y-auto because h-screen is a cap, not a promise: the content
      // is ~564px and overflows a landscape phone or any text zoom past ~115%,
      // and the body scroll lock above means nothing else can scroll to bring
      // the [ RESUME ] link at the bottom into reach.
      className={`fixed top-0 z-[100] flex h-screen w-full flex-col gap-6
                  overflow-y-auto overscroll-contain bg-void px-page-sm py-6
                  transition-transform duration-500 motion-reduce:transition-none
                  ${menuOpen ? "translate-y-0" : "-translate-y-[200%]"}`}
      aria-hidden={!menuOpen}
    >
      <RainbowBar height="thin" className="absolute inset-x-0 top-0" />

      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 text-display-xs uppercase tracking-widest text-phosphor-bright">
          {profile.name}
        </p>
        <button
          type="button"
          ref={closeRef}
          tabIndex={tabIndex}
          onClick={() => setMenuOpen(false)}
          className={`${triggerClassSm} shrink-0`}
        >
          [ CLOSE ]
        </button>
      </div>

      {/* Same `// LABEL` divider as every SectionShell, and the same "›" prompt
          glyph as the rest of the site: the panel is a surface of the system,
          not a separate mobile skin. A <p> rather than an <h2>, because
          Headerphone renders before <main>: an h2 here made the document's
          first heading a level 2 sitting above the page's own h1, and the
          dialog already has an accessible name from aria-label. */}
      <div>
        <p className="text-2xs uppercase tracking-widest text-phosphor-bright">
          <span className="text-cyan" aria-hidden="true">
            //
          </span>{" "}
          NAV
        </p>
        <RainbowBar height="thin" className="mt-2" />
      </div>

      <div className="flex flex-col items-start gap-4">
        {NAV_LINKS.map(({ label, href, aria }) => (
          <a
            key={href}
            href={href}
            tabIndex={tabIndex}
            onClick={(event) => {
              restoreFocusOnClose.current = false;
              setMenuOpen(false);
              // Blur rather than focus the section: the panel takes
              // aria-hidden in this same commit, and leaving focus on a link
              // inside an aria-hidden subtree is invalid. Moving focus to the
              // target section instead would need tabIndex={-1} on elements
              // owned by the section components, which this file cannot add.
              // Nothing is lost by blurring: following the hash sets the
              // browser's sequential-focus starting point to the target, so
              // the next Tab still continues from the section, not the top.
              event.currentTarget.blur();
            }}
            aria-label={aria}
            className={navLinkClass}
          >
            <span className="text-cyan" aria-hidden="true">
              ›
            </span>{" "}
            ~/{label}
          </a>
        ))}

        {emailProtocol && (
          <a
            href={emailProtocol.href ?? undefined}
            tabIndex={tabIndex}
            aria-label="Email"
            className={navLinkClass}
          >
            <span className="text-cyan" aria-hidden="true">
              ›
            </span>{" "}
            ~/email
          </a>
        )}
      </div>

      <a
        href={resumeFile}
        download={resumeFileName}
        target="_blank"
        rel="noreferrer"
        tabIndex={tabIndex}
        aria-label="Download resume PDF"
        className={`${triggerClassPrimary} self-start`}
      >
        [ RESUME ]
      </a>
    </div>
  );
};

export default Header;
