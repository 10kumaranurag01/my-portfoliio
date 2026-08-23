import { Window, triggerClass, triggerClassPrimary } from "./crt";
import {
  profile,
  summary,
  experience,
  resumeFile,
  resumeFileName,
} from "../data/resume";

// The h1 is mandated copy that names no employer, so the hero states the
// placeable fact underneath it. Chosen by the "Present" marker in the period
// rather than by position: `experience` splits one job into several clusters,
// so index 0 only happens to be current today and resume edits reorder it.
const currentRole =
  experience.find((entry) => entry.period.includes("Present")) ?? experience[0];

// The right-hand panel used to be a typewriter animation of invented boot
// telemetry ("booting kandyr agent runtime...", "status: ok"). PRODUCT.md names
// fake typing animations as an anti-reference by name, and the panel was the
// largest above-the-fold element after the h1 while carrying zero role-fit
// information. Same terminal frame, same prompt glyphs, but it now prints the
// workstreams of the current role, straight out of resume.ts — the one thing
// this fold was missing. Nothing here animates, so nothing here needs a
// prefers-reduced-motion branch.
const currentClusters = experience
  .filter((entry) => entry.company === currentRole.company && entry.cluster)
  .map((entry) => entry.cluster);

const Home = () => (
  <section
    id="home"
    className="scroll-mt-nav grid min-h-[calc(100vh-theme(spacing.nav))]
               grid-cols-[1.15fr_1fr] items-center gap-8 px-page py-12
               mq-1367:px-page-md mq-1100:px-page-base mq-900:grid-cols-1
               mq-900:gap-6 mq-900:px-page-sm mq-900:py-8"
  >
    <div className="flex flex-col items-start gap-4">
      {/* Reads as a stated role, not a decorative pill: normal tracking and
          body size, because it is the first concrete fact on the page. */}
      <p className="text-sm uppercase tracking-widest text-cyan">
        {profile.title}
      </p>

      <h1
        className="max-w-[18ch] text-display font-bold uppercase
                   text-phosphor-bright text-glow mq-900:text-display-sm
                   mq-600:text-display-xs"
      >
        A Creative AI Engineer, Tuning the Core Architecture.
      </h1>

      <p className="text-sm text-phosphor">
        <span className="text-cyan" aria-hidden="true">
          {"›"}
        </span>{" "}
        {currentRole.company} &middot; {currentRole.period}
      </p>

      {/* phosphor-dim is reserved for meta at the page centre; this is the
          recruiter's one paragraph of body copy, sitting at the left gutter. */}
      <p className="max-w-[68ch] text-sm text-phosphor">{summary}</p>

      <div
        className="flex flex-wrap items-center gap-4
                   mq-600:w-full mq-600:flex-col mq-600:items-stretch"
      >
        <a href="#work" className={`${triggerClass} text-center`}>
          [ INSPECT WORK ]
        </a>
        {/* order-first below 600px: stacked, the two triggers are the same
            shape and only the fill tells them apart, so the primary leads the
            reading order instead of following the secondary.
            download is the intent; target/rel stay as the fallback path for
            the case where a browser ignores it and navigates instead. It
            carries the filename because a bare `download` takes the name from
            the URL, which for a Vite asset is the content-hashed one. Same
            three attributes on all three resume links (Header, Home,
            Footer). */}
        <a
          href={resumeFile}
          download={resumeFileName}
          target="_blank"
          rel="noreferrer"
          className={`${triggerClassPrimary} text-center mq-600:order-first`}
        >
          [ DOWNLOAD RESUME ]
        </a>
      </div>
    </div>

    {/* titleAs="p": as an <h3> this panel's title landed between the h1 and the
        first section's h2 and broke the outline. The workstreams below are the
        same strings Work prints as its card subheads, so this is a preview of
        that section, not a second source. */}
    <Window title="~/current-scope" titleAs="p">
      <ul className="flex flex-col gap-1 text-sm text-phosphor">
        {currentClusters.map((cluster) => (
          <li key={cluster} className="flex gap-2">
            <span className="text-cyan" aria-hidden="true">
              ›
            </span>
            <span>{cluster}</span>
          </li>
        ))}
      </ul>
    </Window>
  </section>
);

export default Home;
