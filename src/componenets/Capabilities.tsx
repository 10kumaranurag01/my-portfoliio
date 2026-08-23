import { SectionShell, Window, triggerClassSm } from "./crt";
import { skillGroups } from "../data/resume";

// The reveal is weighted by group size, not flat. A flat five-per-card hid 40
// of 60 terms behind four clicks and made every card the same height and the
// same shape, which is the opposite of what "stack keywords in fifteen
// seconds" needs. The two lighter groups now print in full; only the 18- and
// 21-item tails are disclosed, and those cards are two-column, so ten leading
// items fill five rows before the trigger. The <details> keeps every term in
// the DOM for in-page search and for scrapers, and needs no JS.
const WIDE_LEADING = 10;

// Groups run from 10 to 21 items, so four equal cards were misreporting their
// weight — and half-width cards split into two columns squeezed labels like
// "Retrieval-Augmented Generation (RAG)" into a quarter of the row. Groups
// above the mean take the full row and keep two columns; the lighter ones
// share a row as single-column lists. The threshold is the data's own mean,
// so nothing here is hand-tuned to today's counts.
const meanSize =
  skillGroups.reduce((sum, group) => sum + group.items.length, 0) /
  skillGroups.length;

const SkillList = ({ items, wide }: { items: string[]; wide: boolean }) => (
  <ul className={wide ? "columns-2 gap-x-4 mq-600:columns-1" : ""}>
    {items.map((item) => (
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
);

// `MODULES:` is the group's full item count, which stays honest: the visible
// items plus the disclosure's own count add up to it. The old `n/total` card
// ordinal is gone — the cards are no longer a uniform enumerated set, and it
// was the one number here that told a reader nothing.
// label="STACK", id stays "capabilities": the header's nav prints `~/stack`,
// and the one place the site's own IA contradicted itself was a nav label that
// did not match the heading it lands on.
const Capabilities = () => (
  <SectionShell id="capabilities" index="02" label="STACK">
    <div className="grid grid-cols-2 gap-4 mq-900:grid-cols-1">
      {skillGroups.map((group) => {
        const wide = group.items.length > meanSize;
        const leading = wide ? WIDE_LEADING : group.items.length;
        const rest = group.items.slice(leading);
        return (
          // Wrapper carries the span because Window takes no className.
          // col-span-1 below 900px: the grid is one column there, and a
          // col-span-2 child would spawn an implicit second column.
          <div
            key={group.id}
            className={wide ? "col-span-2 mq-900:col-span-1" : ""}
          >
            <Window
              title={group.label.toUpperCase()}
              meta={`MODULES: ${group.items.length}`}
            >
              <SkillList items={group.items.slice(0, leading)} wide={wide} />
              {rest.length > 0 && (
                <details className="group mt-1">
                  {/* list-none plus the webkit rule drop the browser's default
                      triangle; the +/HIDE label is the disclosure state. */}
                  <summary
                    className={`${triggerClassSm} inline-block cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                  >
                    <span className="group-open:hidden">
                      [ + {rest.length} MORE ]
                    </span>
                    <span className="hidden group-open:inline">
                      [ HIDE {rest.length} ]
                    </span>
                  </summary>
                  <SkillList items={rest} wide={wide} />
                </details>
              )}
            </Window>
          </div>
        );
      })}
    </div>
  </SectionShell>
);

export default Capabilities;
