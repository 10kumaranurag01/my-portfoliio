import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SectionShell, Window } from "./crt";
import { experience } from "../data/resume";

const SWIPE_THRESHOLD = 40;
const SLIDE_COUNT = experience.length;

const triggerClass =
  "border border-line px-3 py-1 text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan";

const chipClass = "border border-line px-1 text-2xs text-cyan";

const pad = (value: number) => String(value).padStart(2, "0");

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);

  // Wrap, never disable: `Previous model` on the first slide goes to the
  // last, `Next model` on the last goes to the first. Both triggers are
  // mandated on every slide, so a disabled end state would leave a dead
  // control — wrapping keeps them live everywhere.
  const goTo = (index: number) => {
    setActiveIndex(((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  // Touch/trackpad swipe: a horizontal drag past the threshold advances one
  // slide in the drag direction. No drag-follow animation, no library.
  // Pointer capture keeps the up/cancel events routed here even if the
  // gesture ends outside the carousel; a real touch drag is rarely exactly
  // horizontal, so we only commit once the horizontal delta dominates the
  // vertical one (the container's `touch-pan-y` also leaves vertical page
  // scroll to the browser instead of fighting it).
  const resetPointerStart = () => {
    pointerStartX.current = null;
    pointerStartY.current = null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const startX = pointerStartX.current;
    const startY = pointerStartY.current;
    resetPointerStart();
    if (startX === null || startY === null) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX > SWIPE_THRESHOLD) goTo(activeIndex - 1);
    else if (deltaX < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
  };

  return (
    <SectionShell id="work" index="02" label="SELECTED WORK">
      <div
        className="flex flex-col gap-4 touch-pan-y"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected work, by resume entry"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetPointerStart}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500
                       ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform
                       motion-reduce:transition-none"
            style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
          >
            {experience.map((entry, index) => {
              const isActive = index === activeIndex;
              // `cluster` is the resume subheading; the Cleveratti entry has
              // none, so fall back to `role` — data-driven, no special case.
              const headline = entry.cluster || entry.role;

              return (
                <div
                  key={entry.id}
                  className="w-full shrink-0 px-0.5"
                  aria-hidden={!isActive}
                >
                  <Window
                    title={entry.company}
                    meta={`${pad(index + 1)} / ${pad(SLIDE_COUNT)}`}
                  >
                    <div className="flex flex-col gap-3">
                      <h3
                        className="text-display-xs uppercase tracking-widest
                                   text-phosphor-bright text-glow
                                   mq-600:text-lg"
                      >
                        {headline}
                      </h3>
                      <p className="text-2xs uppercase tracking-widest text-cyan">
                        {entry.role} &middot; {entry.period}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {entry.stack.map((tech) => (
                          <span key={tech} className={chipClass}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="flex flex-col gap-2 text-sm text-phosphor">
                        {entry.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex gap-2">
                            <span className="text-cyan" aria-hidden="true">
                              &gt;
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Window>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            className={triggerClass}
            onClick={() => goTo(activeIndex - 1)}
          >
            Previous model
          </button>
          <button
            type="button"
            className={triggerClass}
            onClick={() => goTo(activeIndex + 1)}
          >
            Next model
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {experience.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              aria-label={`Go to model ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex
                  ? "bg-cyan"
                  : "bg-line hover:bg-line-bright"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

export default Work;
