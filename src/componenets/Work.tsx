import { SectionShell, Window } from "./crt";
import { experience, type ExperienceCluster } from "../data/resume";

const chipClass = "border border-line px-1 text-2xs text-cyan";

type Tenure = {
  company: string;
  role: string;
  period: string;
  clusters: ExperienceCluster[];
};

// One card per tenure, not per resume subhead. `experience` splits the current
// job into four topic clusters that share a company, a role and a period, so
// rendering it one-entry-per-card printed the same three lines four times over
// and a fifteen-second skim read five employers where there are two. The
// clusters are subheads inside the card now, which is what they are in the
// resume. Keyed on company + role + period so the grouping follows the data
// rather than a hardcoded company name.
const tenures = experience.reduce<Tenure[]>((acc, entry) => {
  const open = acc[acc.length - 1];
  if (
    open &&
    open.company === entry.company &&
    open.role === entry.role &&
    open.period === entry.period
  ) {
    open.clusters.push(entry);
    return acc;
  }
  acc.push({
    company: entry.company,
    role: entry.role,
    period: entry.period,
    clusters: [entry],
  });
  return acc;
}, []);

const Work = () => (
  <SectionShell id="work" index="01" label="SELECTED WORK">
    <div className="flex flex-col gap-4">
      {tenures.map((tenure) => (
        // Window's title is the card's <h3>, so the company name is both the
        // marked-up heading and a visible one. The role takes the display size
        // under it: it is the fact a recruiter is matching against, and it is
        // now printed once per employer instead of once per cluster.
        <Window
          key={`${tenure.company}-${tenure.period}`}
          title={tenure.company}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <p
                className="text-display-xs uppercase tracking-widest
                           text-phosphor-bright text-glow mq-600:text-lg"
              >
                {tenure.role}
              </p>
              <p className="text-sm text-cyan">{tenure.period}</p>
            </div>

            {tenure.clusters.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex flex-col gap-2 ${
                  index > 0 ? "border-t border-line pt-3" : ""
                }`}
              >
                {entry.cluster && (
                  <h4 className="text-sm uppercase tracking-widest text-phosphor">
                    {entry.cluster}
                  </h4>
                )}

                <div className="flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <span key={tech} className={chipClass}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 75ch cap: unbounded, these bullets ran ~114 characters a
                    line at 1440px, in the densest block on the page. */}
                <ul className="flex max-w-[75ch] flex-col gap-2 text-sm text-phosphor">
                  {entry.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2">
                      <span className="text-cyan" aria-hidden="true">
                        ›
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Window>
      ))}
    </div>
  </SectionShell>
);

export default Work;
