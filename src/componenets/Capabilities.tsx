import { SectionShell, Window, RainbowBar } from "./crt";
import { skillGroups } from "../data/resume";

// Terminal listing: `MODULES:` and the `n/total` ordinal are the only two
// numbers here, both derived from `skillGroups` — no invented skill levels,
// percentages, or year counts.
const Capabilities = () => (
  <SectionShell id="capabilities" index="02" label="CAPABILITIES">
    <div className="grid grid-cols-2 gap-4 mq-900:grid-cols-1">
      {skillGroups.map((group, index) => (
        <Window
          key={group.id}
          title={group.label.toUpperCase()}
          meta={`MODULES: ${group.items.length} · ${index + 1}/${skillGroups.length}`}
        >
          <ul className="columns-2 gap-x-4 mq-600:columns-1">
            {group.items.map((item) => (
              <li
                key={item}
                className="mb-1 flex gap-2 break-inside-avoid text-sm text-phosphor"
              >
                <span className="text-cyan" aria-hidden="true">
                  ›
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <RainbowBar height="thin" className="mt-3" />
        </Window>
      ))}
    </div>
  </SectionShell>
);

export default Capabilities;
