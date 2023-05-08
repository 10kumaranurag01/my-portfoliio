import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import me from "../assets/image5.png";

const Home = () => {
  const animations = {
    h1: {
      initial: {
        x: "-100%",
        opacity: 0,
      },
      whileInView: {
        x: 0,
        opacity: 1,
      },
    },

    button: {
      initial: {
        y: "-100%",
        opacity: 0,
      },
      whileInView: {
        y: 0,
        opacity: 1,
      },
    },
  };

  return (
    <div id="home">
      <section>
        <div>
          <motion.h1 {...animations.h1}>
            Hi, I Am <br /> Kumar Anurag Sahu
          </motion.h1>

          <Typewriter
            options={{
              strings: ["A Developer", "A Creator", "A Collaborator"],
              autoStart: true,
              loop: true,
              cursor: "",
              wrapperClassName: "typewriterpara",
            }}
          />

          <div>
            <a href="mailto:kumarkas1515+portfolio@gmail.com">Hire Me</a>
            <a href="#work">
              Projects <BsArrowUpRight />
            </a>
          </div>

          <div className="window">
            <div className="navWrapper">
              <div className="dotWrapper">
                <div className="dot" style={{ backgroundColor: "red" }}>
                  {" "}
                </div>
                <div className="dot" style={{ backgroundColor: "yellow" }}>
                  {" "}
                </div>
                <div className="dot" style={{ backgroundColor: "green" }}>
                  {" "}
                </div>
              </div>
              <div>
                <a
                  href={require("../assets/Deedy_CV.pdf")}
                  download
                  style={{ textDecoration: "underline" }}
                >
                  Download Resume
                </a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <article>
              <h3>What I Do</h3>
              <p>
                Experienced 3rd year student proficient in React JS with a
                passion for building dynamic and responsive web applications.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="imageWrapper">
          <img src={me} alt="Anurag" />
        </div>
        <motion.h1 {...animations.h1} className="altH1">
          Hi, I Am <br /> Kumar Anurag Sahu
        </motion.h1>
        <div className="altWindow">
          <div className="navWrapper">
            <div className="dotWrapper">
              <div className="dot" style={{ backgroundColor: "red" }}>
                {" "}
              </div>
              <div className="dot" style={{ backgroundColor: "yellow" }}>
                {" "}
              </div>
              <div className="dot" style={{ backgroundColor: "green" }}>
                {" "}
              </div>
            </div>
            <div className="navLinksWrapper">
              <a
                href={require("../assets/Deedy_CV.pdf")}
                download
                style={{ textDecoration: "underline" }}
              >
                Download Resume
              </a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <article>
            <h3>What I Do</h3>
            <p className="altWindowArticleP">
              Experienced 3rd year student proficient in React JS with a passion
              for building dynamic and responsive web applications.
            </p>
          </article>
        </div>
      </section>
      <BsChevronDown />
    </div>
  );
};

export default Home;
