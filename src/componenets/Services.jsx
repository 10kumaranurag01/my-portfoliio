import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import redux from "../assets/redux.png";
import sass from "../assets/sass.png";
import chakraui from "../assets/chakraui.png";
import vscode from "../assets/vscode.png";
import npm from "../assets/npm.png";
import git from "../assets/git.png";
import vg2 from "../assets/vg2.png";
import vg3 from "../assets/vg3.jpg";
import tailwind from "../assets/tailwindcss.png";
import nextjs from "../assets/next2.png"

const Services = () => {
  return (
    <div id="services">
      <section>
        <article>
          <h4>More about me</h4>
          <p>
            My name is Kumar Anurag, and I'm a programming enthusiast with
            experience in ReactJS. I've built some basic projects such as a
            simple website and a crypto app, which helped me develop my skills
            with ReactJS and Redux Toolkit. I'm also proficient in building
            responsive designs. I'm always eager to learn new technologies and
            aspire to become a skilled frontend developer in the future.
          </p>
        </article>
        <aside>
          <h3>EXPERTISE: Frontend Development</h3>
          <div className="technologies">
            <p>Technologies</p>
            <div className="imgWrapper1">
              <img src={html} alt="html" />
              <img src={css} alt="css" />
              <img src={js} alt="js" />
              <img src={tailwind} alt="tailwind" />
              <img src={sass} alt="sass" />
              <img src={chakraui} alt="chakraui" />
              <img src={react} alt="react" />
              <img src={redux} alt="redux" />
              <img src={nextjs} alt="nextjs" />
            </div>
          </div>
          <div className="tools">
            <p>Tools</p>
            <div className="imgWrapper2">
              <img src={vscode} alt="vscode" />
              <img src={git} alt="git" />
              <img src={npm} alt="npm" />
            </div>
          </div>
        </aside>
        <a
          href={require("../assets/Kumar_Anurag.pdf")}
          download
          style={{ textDecoration: "underline" }}
        >
          Download Resume
        </a>
      </section>
      <section>
        <img src={vg2} alt="vg" />
      </section>
    </div>
  );
};

export default Services;
