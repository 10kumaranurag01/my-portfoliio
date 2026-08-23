import type { IconType } from "react-icons";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { RainbowBar, triggerClassPrimary } from "./crt";
import {
  profile,
  credentials,
  protocols,
  isExternalProtocol,
  resumeFile,
  resumeFileName,
} from "../data/resume";

// Order mandated by the brief: github, linkedin, mailto. Looked up by
// `protocol` field so the addresses stay single-sourced from resume.ts.
const SHORTLINKS: { protocol: string; Icon: IconType; label: string }[] = [
  { protocol: "github", Icon: AiFillGithub, label: "GitHub" },
  { protocol: "linkedin", Icon: AiFillLinkedin, label: "LinkedIn" },
  { protocol: "mailto", Icon: AiOutlineMail, label: "Email" },
];

// inline-flex so the box hugs the 20px icon: the glow was drawn around the
// inline line box before, not the icon. The padding is the WCAG 2.5.8 hit
// area (20px icon + 2x4px = 28px) and leaves the icon's own size alone.
const channelLinkClass =
  "inline-flex p-0.5 text-phosphor transition-colors hover:text-cyan hover:shadow-glow-cyan";

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
        <p className="text-sm text-phosphor">{profile.location}</p>
      </div>

      {/* Column labels and the location are resume facts, so they take
          `phosphor`. Only the credential sub-lines and the copyright below stay
          `phosphor-dim`, and those are genuine meta. The whole footer sits in
          the left/right gutter, which the CRT vignette's mask does not cover —
          see the alpha budget in app.css before dimming anything here.

          The credential sub-lines are `text-sm`, not the `text-2xs` of the
          heading above them: degree, institution and dates are content a
          recruiter reads, not a label. `phosphor` vs `phosphor-dim` is what
          keeps the title above its meta once both are the same size. */}
      <div className="flex flex-col gap-2">
        <p className="text-2xs tracking-widest text-phosphor">
          EDUCATION &amp; CERTIFICATIONS
        </p>
        <ul className="flex flex-col gap-2">
          {credentials.map((credential) => (
            <li key={credential.title} className="text-sm text-phosphor">
              <p>{credential.title}</p>
              <p className="text-sm text-phosphor-dim">
                {credential.org} &middot; {credential.period}
              </p>
              {credential.note && (
                <p className="text-sm text-phosphor-dim">{credential.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-start gap-2">
        <p className="text-2xs tracking-widest text-phosphor">CHANNELS</p>
        <div className="flex items-center gap-4">
          {SHORTLINKS.map(({ protocol, Icon, label }) => {
            const entry = protocols.find((item) => item.protocol === protocol);
            if (!entry?.href) return null;
            // Shared with Contact's protocol table via `isExternalProtocol`
            // in resume.ts, so the two can't disagree on this again.
            const isExternal = isExternalProtocol(protocol);
            return (
              <a
                key={protocol}
                href={entry.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={label}
                className={channelLinkClass}
              >
                <Icon aria-hidden="true" className="text-xl" />
              </a>
            );
          })}
        </div>

        {/* Peak-end: a visitor who read to the bottom on a phone gets the
            resume here instead of scrolling back to the header. Attributes
            match the other two resume links (Header, Home): the named
            download, because a bare `download` saves the content-hashed
            filename Vite emits, plus target/rel as the navigate fallback. */}
        <a
          href={resumeFile}
          download={resumeFileName}
          target="_blank"
          rel="noreferrer"
          className={triggerClassPrimary}
        >
          [ DOWNLOAD RESUME ]
        </a>
      </div>
    </div>

    <div
      className="border-t border-line px-page py-2 text-2xs text-phosphor-dim
                 mq-1367:px-page-md mq-1100:px-page-base mq-900:px-page-sm"
    >
      <p>
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
    </div>
  </footer>
);

export default Footer;
