import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Global UI layout mode.
 *
 *   "design" — Figma-canvas treatment: 8px guideline grid, dashed mockup
 *              guides around each block, neon pointer.
 *   "dev"    — source treatment: dark modular container blocks, monospaced
 *              type, code-style block labels.
 *
 * The mode lives on <html data-ui="...">, so all mode-dependent styling is
 * CSS (see src/styles/app.css and the `design:` / `dev:` Tailwind variants).
 * Components only need this context to render the toggle.
 */

const MODES = ["design", "dev"];
const STORAGE_KEY = "ui-layout-mode";

const UIThemeContext = createContext(null);

const readStoredMode = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return MODES.includes(stored) ? stored : "design";
  } catch {
    // private mode / storage disabled
    return "design";
  }
};

export const UIThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(readStoredMode);
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-ui", mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // non-fatal: the mode still applies for this visit
    }
  }, [mode]);

  // Neon pointer: write coordinates straight to the node so pointermove never
  // triggers a React render.
  useEffect(() => {
    if (mode !== "design") return undefined;

    const move = (e) => {
      const node = cursorRef.current;
      if (!node) return;
      node.style.setProperty("--nx", `${e.clientX}px`);
      node.style.setProperty("--ny", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mode]);

  const toggleMode = useCallback(
    () => setMode((m) => (m === "design" ? "dev" : "design")),
    []
  );

  return (
    <UIThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
      <div ref={cursorRef} className="neon-cursor" aria-hidden="true" />
    </UIThemeContext.Provider>
  );
};

export const useUITheme = () => {
  const ctx = useContext(UIThemeContext);
  if (!ctx) throw new Error("useUITheme must be used inside <UIThemeProvider>");
  return ctx;
};

/** Mode switch. `compact` drops the label for the phone nav. */
export const LayoutToggle = ({ compact = false }) => {
  const { mode, toggleMode } = useUITheme();
  const next = mode === "design" ? "dev" : "design";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={`Switch to ${next} layout`}
      title={`Switch to ${next} layout`}
      className="flex items-center gap-1 border border-ink-60 px-2 py-1 font-mono
                 text-xs uppercase tracking-widest transition-colors
                 hover:border-accent hover:text-accent
                 dev:border-accent/60 dev:text-accent"
    >
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full bg-accent shadow-neon"
      />
      {!compact && <span>{mode}</span>}
    </button>
  );
};

/**
 * Section shell. Renders the per-mode chrome (dashed guides in design mode,
 * container block + code label in dev mode) around an existing section.
 */
export const Block = ({ id, label, className = "", children }) => (
  <div id={id} className={`ui-block ${className}`}>
    <span className="ui-block-label">
      <span className="tok-punct">&lt;</span>
      <span className="tok-tag">section</span>{" "}
      <span className="tok-attr">id</span>
      <span className="tok-punct">=</span>
      <span className="tok-str">"{label || id}"</span>
      <span className="tok-punct">&gt;</span>
    </span>
    {children}
  </div>
);
