import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import redux from "../assets/redux.png";
import sass from "../assets/sass.png";
import chakraui from "../assets/chakraui.png";
import mongodb from "../assets/icons8-mongodb-a-cross-platform-document-oriented-database-program-48.png";
import vscode from "../assets/vscode.png";
import npm from "../assets/npm.png";
import git from "../assets/git.png";
import vg2 from "../assets/vg2.png";
import tailwind from "../assets/tailwindcss.png";
import nextjs from "../assets/next2.png";
import postgreSQL from "../assets/icons8-postgresql-48.png";
import express from "../assets/icons8-express-js-40.png";
import cloudflare from "../assets/icons8-cloudflare-provides-content-delivery-network-services,-ddos-mitigation.-48.png";
import prisma from "../assets/icons8-prisma-orm-48.png";
import turborepo from "../assets/turborepo-icon_.png";
import ts from "../assets/icons8-typescript-48 (1).png";
import docker from "../assets/icons8-docker-48.png";
import postman from "../assets/icons8-postman-is-the-only-complete-api-development-environment-48.png";
import node from "../assets/nodejs.png";
import github from "../assets/github-mark-white.png";
import resume from "../assets/Kumar_Anurag.pdf";
import { Block } from "./UITheme";

const technologies = [
  [html, "html"],
  [css, "css"],
  [js, "js"],
  [tailwind, "tailwind"],
  [sass, "sass"],
  [chakraui, "chakraui"],
  [react, "react"],
  [redux, "redux"],
  [nextjs, "nextjs"],
  [mongodb, "mongodb"],
  [postgreSQL, "postgreSQL"],
  [express, "express"],
  [cloudflare, "cloudflare"],
  [prisma, "prisma"],
  [turborepo, "turborepo"],
  [docker, "docker"],
];

const tools = [
  [vscode, "vscode"],
  [git, "git"],
  [github, "github"],
  [npm, "npm"],
  [postman, "postman"],
  [ts, "typescript"],
  [node, "node"],
];

const iconRow = "my-1 flex flex-wrap items-center rounded-lg bg-slate-deep p-1";
const icon = "h-6 w-6 p-0.5 transition-transform hover:scale-[1.2]";

const Services = () => (
  <Block
    id="services"
    label="services"
    className="mt-2 flex h-screen w-full flex-row items-center justify-between gap-2
               overflow-hidden bg-slate pl-page text-white
               mq-1367:p-page-md mq-1100:p-[7.8vmax_5vmax]
               mq-900:h-screen mq-900:p-[0_6.5vmax]
               mq-786:h-[160vh] mq-786:w-full mq-786:flex-col mq-786:p-[2vmax_5vmax]
               mq-600:h-[150vh] mq-425:h-[170vh]"
  >
    <section className="flex w-1/2 flex-col items-start justify-center gap-2 mq-1367:h-[90%] mq-900:my-4 mq-786:w-full">
      <article className="border-b-2 border-smoke pb-2 mq-786:text-center">
        <h4 className="mb-2 text-[2rem] font-semibold tracking-[1px] mq-425:text-[1.7rem]">
          More about me
        </h4>
        <p className="text-[0.9rem] tracking-[1px] mq-786:text-base mq-425:text-[0.9rem]">
          As a budding full-stack web developer, I'm deeply passionate about
          creating immersive digital experiences. Proficient in a variety of
          technologies, I specialize in utilizing React for dynamic front-end
          development, while harnessing the power of MongoDB and PostgreSQL for
          robust database management. Leveraging Cloudflare Workers for scalable
          serverless computing and Prisma ORM for efficient database access, I
          ensure seamless performance and reliability. With expertise in Next.js
          and Express, I adeptly handle server-side rendering and API
          integration. Embracing modern development practices, I work within
          monorepo structures, utilizing Tailwind CSS for streamlined styling.
          Eager to continue learning and collaborating, I'm excited to contribute
          to cutting-edge projects and drive innovation in the ever-evolving
          landscape of web development.
        </p>
      </article>

      <aside className="flex flex-col items-start justify-center gap-2 mq-786:w-full mq-786:text-center">
        <h3 className="text-[1.2rem] font-extrabold mq-786:w-full mq-786:text-center">
          EXPERTISE: Full Stack Development
        </h3>

        <div className="mq-786:w-full">
          <p className="my-2 text-[1.05rem]">Technologies</p>
          <div className={`${iconRow} justify-between`}>
            {technologies.map(([src, alt]) => (
              <img key={alt} src={src} alt={alt} className={icon} />
            ))}
          </div>
        </div>

        <div className="mq-786:w-full">
          <p className="my-2 text-[1.05rem]">Tools</p>
          <div className={`${iconRow} justify-evenly mq-786:w-full`}>
            {tools.map(([src, alt]) => (
              <img key={alt} src={src} alt={alt} className={icon} />
            ))}
          </div>
        </div>
      </aside>

      <a
        href={resume}
        download
        className="text-[0.8rem] text-canvas underline transition-colors hover:text-accent"
      >
        Download Resume
      </a>
    </section>

    <section className="flex w-1/2 items-center justify-center mq-786:w-full">
      <img
        src={vg2}
        alt="vg"
        className="m-0.5 h-[35vmax] w-full bg-transparent
                   mq-786:-mt-5 mq-786:h-[57vmax] mq-786:w-[90%]
                   mq-600:h-[45vmax] mq-600:w-[80%] mq-425:h-[42vmax] mq-425:w-full"
      />
    </section>
  </Block>
);

export default Services;
