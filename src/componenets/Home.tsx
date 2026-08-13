import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import me from "../assets/image5.png";
import resume from "../assets/Kumar_Anurag.pdf";
import { Block } from "./UITheme";

const animations = {
  h1: {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
  },
};

const blurb =
  "As a novice full-stack web developer, I'm poised to embark on a journey of learning and growth, aspiring to contribute my technical acumen to cutting-edge projects.";

type WindowCardProps = {
  className?: string;
  linkClass?: string;
  headingClass?: string;
};

/** The mockup window, shown wide on desktop and stacked below 1367px. */
const WindowCard = ({
  className = "",
  linkClass = "",
  headingClass = "",
}: WindowCardProps) => (
  <div
    className={`flex-col items-center justify-center rounded-[5px] border
                border-accent bg-[var(--ui-bg)] shadow-window w-[80%] ${className}`}
  >
    <div
      className="flex h-4 w-full flex-row items-center justify-between border-b
                 border-accent bg-accent px-2 py-2"
    >
      <div className="flex flex-row items-center justify-between">
        <span className="-mx-[2px] rounded-full bg-dot-red p-1" />
        <span className="-mx-[2px] rounded-full bg-dot-yellow p-1" />
        <span className="-mx-[2px] rounded-full bg-dot-green p-1" />
      </div>
      <div
        className={`flex items-center justify-center gap-2 font-semibold ${linkClass}`}
      >
        <a
          href={resume}
          download
          className="text-canvas underline transition-colors hover:text-ink"
        >
          Download Resume
        </a>
        <a
          href="#contact"
          className="text-canvas transition-colors hover:text-ink"
        >
          Contact
        </a>
      </div>
    </div>

    <article className="flex w-full flex-col px-2">
      <h3 className={`font-bold tracking-[2px] ${headingClass}`}>What I Do</h3>
      <p className="py-2 text-[1.5rem] mq-1100:text-[1.2rem] mq-900:text-[1.1rem] mq-600:text-[1.2rem] mq-425:text-base">
        {blurb}
      </p>
    </article>
  </div>
);

const Home = () => (
  <Block
    id="home"
    label="home"
    className="flex h-[90%] w-full mq-1367:h-screen mq-1100:h-[110vh]
               mq-600:h-auto mq-600:flex-col-reverse"
  >
    <section
      className="w-full pl-page mq-1367:pl-page-md mq-1100:pl-page-base
                 mq-900:pl-page-sm mq-600:flex mq-600:flex-col mq-600:items-center
                 mq-600:pl-page-sm mq-600:text-center"
    >
      <div className="h-full border-t border-ink-15 pt-12 mq-600:border-none mq-600:pt-6">
        <motion.h1
          {...animations.h1}
          className="font-display text-display font-black mq-1100:text-display-sm mq-600:hidden"
        >
          Hi, I Am <br /> Kumar Anurag Sahu
        </motion.h1>

        <Typewriter
          options={{
            strings: ["A Developer", "A Creator", "A Collaborator"],
            autoStart: true,
            loop: true,
            cursor: "",
            wrapperClassName: "block my-2 h-2 tracking-[5px] mq-600:-my-1",
          }}
        />

        <div className="my-7 flex w-[70%] items-center gap-8 mq-900:w-full mq-900:gap-4 mq-600:flex-col">
          <a
            href="mailto:kumarkas1515@gmail.com"
            className="bg-accent px-5 py-2 text-canvas transition-colors hover:bg-accent-hover"
          >
            Hire Me
          </a>
          <a
            href="#work"
            className="flex items-center text-[1.2rem] font-semibold text-slate dev:text-[var(--ui-fg)]"
          >
            Projects <BsArrowUpRight />
          </a>
        </div>

        <WindowCard
          className="flex h-auto mq-1367:hidden"
          linkClass="text-base"
          headingClass="-mt-8 text-[2rem]"
        />
      </div>
    </section>

    <section className="relative flex w-full flex-col items-center justify-end gap-2 overflow-x-hidden border-t border-ink-15 mq-600:border-none">
      <div className="h-[38vmax] w-[38vmax] overflow-hidden rounded-full bg-accent mq-1367:h-[25vmax] mq-1367:w-[25vmax]">
        <img
          src={me}
          alt="Anurag"
          className="h-[40vmax] w-[40vmax] object-cover mq-1367:h-[25vmax] mq-1367:w-[25vmax]"
        />
      </div>

      <motion.h1
        {...animations.h1}
        className="hidden font-display font-black mq-600:block mq-600:py-3
                   mq-600:text-center mq-600:text-display-xs"
      >
        Hi, I Am <br /> Kumar Anurag Sahu
      </motion.h1>

      <WindowCard
        className="mb-4 hidden h-fit mq-1367:flex"
        linkClass="mq-1100:gap-[7px] mq-1100:text-[0.8rem] mq-900:text-[0.7rem] mq-786:text-[0.68rem] mq-425:text-[0.65rem]"
        headingClass="mt-2 text-[2rem] mq-900:text-[1.6rem] mq-600:text-[1.7rem] mq-425:text-[1.5rem]"
      />
    </section>

    <BsChevronDown className="absolute bottom-[5%] left-1/2 -translate-x-1/2 animate-chevron text-[4rem] text-slate mq-600:text-[2rem] dev:text-accent-soft" />
  </Block>
);

export default Home;
