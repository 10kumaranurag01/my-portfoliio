import type { IconType } from "react-icons";
import {
  AiOutlineArrowUp,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

const socials: [href: string, Icon: IconType, label: string][] = [
  ["https://www.linkedin.com/in/kumar-anurag-858948207/", AiFillLinkedin, "LinkedIn"],
  ["https://github.com/10kumaranurag01", AiFillGithub, "GitHub"],
  ["https://www.instagram.com/kumar_._anurag/", AiFillInstagram, "Instagram"],
];

const Footer = () => (
  <>
    <footer
      className="relative grid min-h-12 grid-cols-[10fr_3fr_1fr] items-center
                 justify-items-center bg-ink py-12 pl-page text-center text-white
                 mq-1367:pl-page-md mq-900:grid-cols-1 mq-900:pl-0"
    >
      <div className="w-full border-l-2 border-r-2 border-white mq-900:border-none">
        <img
          src="https://avatars.githubusercontent.com/u/81381360?s=400&u=63d7eda0704449fd4878de3d2768bb288ea1416a&v=4"
          alt="Founder"
          className="h-12 w-12 rounded-full object-contain"
        />
        <h2 className="m-2">Kumar Anurag Sahu</h2>
        <p className="text-[1.2rem] mq-900:mx-auto mq-900:my-4 mq-900:w-1/2">
          Direction is more important than speed.
        </p>
      </div>

      <aside>
        <h2>Social Media</h2>
        <article className="mt-2 flex items-center justify-between">
          {socials.map(([href, Icon, label]) => (
            <a key={href} href={href} target="blank" aria-label={label}>
              <Icon className="text-[2rem] text-white transition-colors hover:text-accent" />
            </a>
          ))}
        </article>
      </aside>

      <a
        href="#home"
        aria-label="Back to top"
        className="grid h-6 w-6 place-items-center rounded-full bg-white mq-900:m-2"
      >
        <AiOutlineArrowUp className="text-[2rem] text-accent" />
      </a>
    </footer>

    <div className="bg-ink px-0.5 text-mute">
      <p>Last Updated: 13th Sept 2024</p>
    </div>
  </>
);

export default Footer;
