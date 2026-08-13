import type { IconType } from "react-icons";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { RainbowBar } from "./crt";
import { profile, credentials, protocols } from "../data/resume";

// Order mandated by the brief: github, linkedin, mailto. Looked up by
// `protocol` field so the addresses stay single-sourced from resume.ts.
const SHORTLINKS: { protocol: string; Icon: IconType; label: string }[] = [
  { protocol: "github", Icon: AiFillGithub, label: "GitHub" },
  { protocol: "linkedin", Icon: AiFillLinkedin, label: "LinkedIn" },
  { protocol: "mailto", Icon: AiOutlineMail, label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-line bg-void">
    <RainbowBar height="thick" />

    <div
      className="grid grid-cols-3 gap-8 px-page py-10 mq-1367:px-page-md
                 mq-1100:px-page-base mq-900:px-page-sm mq-786:grid-cols-1
                 mq-786:gap-6 mq-786:py-6"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm uppercase tracking-widest text-phosphor-bright">
          {profile.name}
        </p>
        <p className="text-2xs uppercase tracking-widest text-cyan">
          {profile.title}
        </p>
        <p className="text-sm text-phosphor-dim">{profile.location}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xs tracking-widest text-phosphor-dim">
          EDUCATION &amp; CERTIFICATIONS
        </p>
        <ul className="flex flex-col gap-2">
          {credentials.map((credential) => (
            <li key={credential.title} className="text-sm text-phosphor">
              <p>{credential.title}</p>
              <p className="text-2xs text-mute">
                {credential.org} &middot; {credential.period}
              </p>
              {credential.note && (
                <p className="text-2xs text-mute">{credential.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xs tracking-widest text-phosphor-dim">CHANNELS</p>
        <div className="flex items-center gap-4">
          {SHORTLINKS.map(({ protocol, Icon, label }) => {
            const entry = protocols.find((item) => item.protocol === protocol);
            if (!entry?.href) return null;
            return (
              <a
                key={protocol}
                href={entry.href}
                aria-label={label}
                className="text-phosphor-dim transition-colors hover:text-cyan hover:shadow-glow-cyan"
              >
                <Icon aria-hidden="true" className="text-xl" />
              </a>
            );
          })}
        </div>
      </div>
    </div>

    <div
      className="border-t border-line px-page py-2 text-2xs text-mute
                 mq-1367:px-page-md mq-1100:px-page-base mq-900:px-page-sm"
    >
      <p>
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
    </div>
  </footer>
);

export default Footer;
