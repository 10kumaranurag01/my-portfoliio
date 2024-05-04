import Header from "./componenets/Header";
import Home from "./componenets/Home";
import Work from "./componenets/Work";
import Timeline from "./componenets/Timeline";
import Services from "./componenets/Services";
import Testimonial from "./componenets/Testimonial";
import Contact from "./componenets/Contact";
import Footer from "./componenets/Footer";
import { Headerphone } from "./componenets/Header";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  console.log(ratio);
  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    }

    window.addEventListener("resize", resizeRatio);

    return () => {
      window.removeEventListener("resize", resizeRatio);
    }
  }, [ratio])


  return (
    <>
      <Headerphone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home ratio={ratio} />
      <Services />
      <Work />
      <Contact />
      <Footer />
      <Toaster />
    </>
  )
}

export default App;
