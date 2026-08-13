import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { CRTScreen } from "./componenets/crt";
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
    border: "1px solid #23232b", // colors.line.DEFAULT
  },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CRTScreen>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Headerphone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home />
      <Work />
      <Capabilities />
      <Contact />
      <Footer />
      <Toaster toastOptions={toastOptions} />
    </CRTScreen>
  );
}

export default App;
