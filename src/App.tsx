import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { CRTScreen, triggerClass } from "./componenets/crt";
import Header, { Headerphone } from "./componenets/Header";
import Home from "./componenets/Home";
import Work from "./componenets/Work";
import Capabilities from "./componenets/Capabilities";
import Contact from "./componenets/Contact";
import Footer from "./componenets/Footer";

// Matches the CRT palette (tailwind.config.js): carbon background, phosphor
// text, a line border. react-hot-toast renders its own inline style, so the
// theme has to be supplied as literal values here rather than Tailwind
// classes.
const toastOptions = {
  style: {
    background: "#0b0b0e", // colors.carbon.DEFAULT
    color: "#7dffb0", // colors.phosphor.DEFAULT
    border: "1px solid #3a3a46", // colors.line.DEFAULT
  },
};

const MAIN_ID = "main";

// Hidden until focused, then pinned into the header's left gutter. z-300
// because the CRT overlays are `position: fixed` at z-index 200/201/202
// (app.css) — anything lower reveals the link behind the scanlines and bezel.
//
// focus:px-3 / focus:py-1 are NOT a redundant copy of triggerClass's padding:
// Tailwind compiles `.focus\:not-sr-only:focus` with `padding: 0` at
// specificity (0,2,0), which beats triggerClass's plain `.px-3` / `.py-1`
// (0,1,0) the moment the link is focused. Restating them under the same
// `focus:` variant matches that specificity and keeps the text off its border.
const skipLinkClass = `${triggerClass} sr-only focus:not-sr-only focus:fixed focus:left-page-sm focus:top-1 focus:z-[300] focus:border-cyan focus:bg-carbon focus:px-3 focus:py-1 focus:text-cyan`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CRTScreen>
      <a href={`#${MAIN_ID}`} className={skipLinkClass}>
        Skip to content
      </a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Headerphone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* tabIndex -1 so the skip link moves focus here and not just the scroll
          position; scroll-mt-nav clears the sticky header on landing, same as
          every section. */}
      <main id={MAIN_ID} tabIndex={-1} className="scroll-mt-nav">
        <Home />
        <Work />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
      {/* Bottom-center: the submit button is at the page bottom, so a toast at
          the viewport top lands ~600px off-screen from where the visitor is
          looking. */}
      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </CRTScreen>
  );
}

export default App;
