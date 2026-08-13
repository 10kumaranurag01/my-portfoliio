import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header, { Headerphone } from "./componenets/Header";
import Home from "./componenets/Home";
import Work from "./componenets/Work";
import Services from "./componenets/Services";
import Contact from "./componenets/Contact";
import Footer from "./componenets/Footer";
import { UIThemeProvider } from "./componenets/UITheme";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <UIThemeProvider>
      <Headerphone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home />
      <Services />
      <Work />
      <Contact />
      <Footer />
      <Toaster />
    </UIThemeProvider>
  );
}

export default App;
