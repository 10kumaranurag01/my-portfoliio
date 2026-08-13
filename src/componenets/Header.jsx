import { AiOutlineMenu } from "react-icons/ai";
import { LayoutToggle } from "./UITheme";

const navLinks = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

const emailBtn = `border border-ink-60 px-4 py-1 bg-[var(--ui-bg)] cursor-pointer
  text-[var(--ui-fg)] tracking-[1px] font-medium transition-colors
  hover:bg-ink hover:text-white dev:border-[var(--ui-line)]`;

const Header = ({ setMenuOpen, menuOpen }) => (
  <>
    <nav
      className="sticky top-0 z-[60] flex h-12 w-full items-center justify-between
                 bg-[var(--ui-bg)] px-page mq-1367:px-page-md
                 mq-1100:px-page-base mq-900:px-page-sm"
    >
      <h2 className="text-[2rem] mq-900:text-[1.8rem]">Anurag.</h2>

      <div className="flex items-center gap-4 mq-900:gap-2 mq-786:hidden">
        {navLinks.map(([label, href]) => (
          <a
            key={href}
            onClick={() => setMenuOpen(false)}
            href={href}
            className="font-medium tracking-[1px] text-[var(--ui-fg)]
                       transition-colors hover:text-accent"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 mq-786:hidden">
        <LayoutToggle />
        <a href="mailto:kumarkas1515@gmail.com">
          <button className={emailBtn}>Email</button>
        </a>
      </div>
    </nav>

    <button
      className="fixed right-4 top-4 z-[150] hidden h-5 w-5 border-none bg-transparent
                 text-[1.4rem] text-slate hover:text-accent
                 mq-786:block dev:text-accent-soft"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Open menu"
    >
      <AiOutlineMenu />
    </button>
  </>
);

export const Headerphone = ({ menuOpen, setMenuOpen }) => (
  <div
    className={`fixed top-0 z-[100] flex h-screen w-full flex-col items-center
                justify-center gap-6 bg-slate p-page-base transition-transform
                duration-500 ${menuOpen ? "translate-y-0" : "-translate-y-[200%]"}`}
  >
    <h2 className="text-[2rem] text-white">Anurag.</h2>

    <div className="flex flex-col items-center gap-4">
      {navLinks.map(([label, href]) => (
        <a
          key={href}
          onClick={() => setMenuOpen(false)}
          href={href}
          className="font-medium tracking-[1px] text-white transition-colors
                     hover:text-accent"
        >
          {label}
        </a>
      ))}
    </div>

    <LayoutToggle />

    <a href="mailto:kumarkas1515@gmail.com">
      <button className="border border-ink-60 bg-canvas px-4 py-1 font-medium tracking-[1px] text-ink transition-colors hover:bg-ink hover:text-white">
        Email
      </button>
    </a>
  </div>
);

export default Header;
