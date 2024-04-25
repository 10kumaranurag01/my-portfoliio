import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import redux from "../assets/redux.png";
import sass from "../assets/sass.png";
import chakraui from "../assets/chakraui.png";
import mongodb from "../assets/MongoDB_Logomark_ForestGreen.png";
import vscode from "../assets/vscode.png";
import npm from "../assets/npm.png";
import git from "../assets/git.png";
import vg2 from "../assets/vg2.png";
import vg3 from "../assets/vg3.jpg";
import tailwind from "../assets/tailwindcss.png";
import nextjs from "../assets/next2.png";
import postgreSQL from "../assets/icons8-postgresql-48.png";
import express from "../assets/icons8-express-js-40.png";
import cloudflare from "../assets/icons8-cloudflare-provides-content-delivery-network-services,-ddos-mitigation.-48.png";
import prisma from "../assets/icons8-prisma-orm-48.png";
import turborepo from "../assets/turborepo-icon_.png";
import ts from "../assets/icons8-typescript-48.png";
import docker from "../assets/icons8-docker-48.png";
import postman from "../assets/icons8-postman-is-the-only-complete-api-development-environment-48.png";
import hopscotch from "../assets/56705483.png"
import node from "../assets/icons8-nodejs-48.png"
import github from "../assets/github-mark-white.png"

const Services = () => {
  return (
    <div id="services">
      <section>
        <article>
          <h4>More about me</h4>
          <p>
            As a budding full-stack web developer, I'm deeply passionate about
            creating immersive digital experiences. Proficient in a variety of
            technologies, I specialize in utilizing React for dynamic front-end
            development, while harnessing the power of MongoDB and PostgreSQL
            for robust database management. Leveraging Cloudflare Workers for
            scalable serverless computing and Prisma ORM for efficient database
            access, I ensure seamless performance and reliability. With
            expertise in Next.js and Express, I adeptly handle server-side
            rendering and API integration. Embracing modern development
            practices, I work within monorepo structures, utilizing Tailwind CSS
            for streamlined styling. Eager to continue learning and
            collaborating, I'm excited to contribute to cutting-edge projects
            and drive innovation in the ever-evolving landscape of web
            development.
          </p>
        </article>
        <aside>
          <h3>EXPERTISE: Full Stack Development</h3>
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
              <img height={40} width={22} src={mongodb} alt="mongodb" />
              <img height={48} width={48} src={postgreSQL} alt="postgreSQL" />
              <img height={48} width={48} src={express} alt="express" />
              <img src={cloudflare} alt="cloudflare" />
              <img src={prisma} alt="prisma" />
              <img height={48} width={48} src={turborepo} alt="turborepo" />
              <img src={docker} alt="docker" />
            </div>
          </div>
          <div className="tools">
            <p>Tools</p>
            <div className="imgWrapper2">
              <img height={48} width={48} src={vscode} alt="vscode" />
              <img height={48} width={48} src={git} alt="git" />
              <img height={48} width={48} src={github} alt="github" />
              <img height={48} width={48} src={npm} alt="npm" />
              <img src={postman} alt="postman" />
              <img height={48} width={48} src={hopscotch} alt="hopscotch" />
              <img height={48} width={48} src={ts} alt="typescript" />
              <img height={48} width={48} src={node} alt="node" />
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
