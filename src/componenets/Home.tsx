import { useState } from "react";
import Typewriter from "typewriter-effect";
import { Window, triggerClass } from "./crt";
import { profile, summary, skillGroups, resumeFile } from "../data/resume";

// Escapes &/</> before a value goes into TELEMETRY_HTML below — see that
// comment for why: typeString() round-trips this string through innerHTML,
// which re-escapes any of these three characters in text position.
const esc = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

// Boot-sequence telemetry. Every fact traces back to resume.ts — the two
// framing lines ("booting..."/"status: ok") are terminal chrome, everything
// else is the operator name, role, location, a live-computed skill-group
// count, or a technical term lifted verbatim from an experience bullet.
const TELEMETRY_LINES = [
  "booting kandyr agent runtime...",
  `operator: ${esc(profile.name)}`,
  `role: ${esc(profile.title)}`,
  `location: ${esc(profile.location)}`,
  `skill groups registered: ${skillGroups.length}`,
  "side-effects: read / write / external / artifact",
  "guardrails: fail-closed guardrails, tenant-isolation",
  "channel: tool registry, SSE streaming",
  "status: ok",
];

// Typed once at module scope: the "›" prompt glyph gets its own cyan span,
// the rest of each line inherits the terminal's default phosphor colour.
// "›" (not ">") because typeString() parses this HTML through a detached
// element and types back its *serialised* innerHTML — which escapes a
// literal ">" in text position to "&gt;" and then types that out literally,
// entity and all. "›" isn't touched by HTML serialisation, so it survives
// the round-trip. It's also already this site's prompt glyph (Capabilities.tsx).
// The same round-trip is why every interpolated value above goes through
// `esc`: none of profile.name/title/location contains "&"/"<"/">" today, but
// skillGroups[].label already does ("Generative AI & LLMs"), and the comment
// above invites pulling more resume data into these lines later.
const TELEMETRY_HTML = TELEMETRY_LINES.map(
  (line) => `<span class="text-cyan">›</span> ${line}`,
).join("<br />");

const Home = () => {
  // Checked once, synchronously, on first render — not a listener, so the
  // typewriter never gets a live preference change mid-loop.
  const [prefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <section
      id="home"
      className="scroll-mt-nav grid min-h-[calc(100vh-theme(spacing.nav))]
                 grid-cols-[1.15fr_1fr] items-center gap-8 px-page py-12
                 mq-1367:px-page-md mq-1100:px-page-base mq-900:grid-cols-1
                 mq-900:gap-6 mq-900:px-page-sm mq-900:py-8"
    >
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xs uppercase tracking-[0.3em] text-cyan">
          {profile.title}
        </p>

        <h1
          className="max-w-[18ch] text-display font-bold uppercase
                     text-phosphor-bright text-glow mq-900:text-display-sm
                     mq-600:text-display-xs"
        >
          A Creative AI Engineer, Tuning the Core Architecture.
        </h1>

        <p className="max-w-[68ch] text-sm text-phosphor-dim">{summary}</p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#work" className={triggerClass}>
            [ INSPECT WORK ]
          </a>
          <a
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
            className={triggerClass}
          >
            [ DOWNLOAD RESUME ]
          </a>
        </div>
      </div>

      <Window title="~/kandyr/agent --stream" meta="loop">
        {prefersReducedMotion ? (
          <div className="flex flex-col gap-1 text-sm text-phosphor">
            {TELEMETRY_LINES.map((line) => (
              <p key={line}>
                <span className="text-cyan">{"›"}</span> {line}
              </p>
            ))}
            <span
              className="inline-block h-4 w-2 bg-phosphor"
              aria-hidden="true"
            />
          </div>
        ) : (
          <>
            {/* Decorative, endlessly-looping typing animation: hidden from
                assistive tech so it can't be announced on every repeat. */}
            <div aria-hidden="true" className="text-sm text-phosphor">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(TELEMETRY_HTML)
                    .pauseFor(1600)
                    .deleteAll(1)
                    .pauseFor(400)
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 18,
                  cursor: "",
                  skipAddStyles: true,
                }}
              />
              <span className="inline-block h-4 w-2 animate-caret bg-phosphor" />
            </div>
            {/* Static equivalent of the animation above, read once. */}
            <p className="sr-only">{TELEMETRY_LINES.join("; ")}.</p>
          </>
        )}
      </Window>
    </section>
  );
};

export default Home;
