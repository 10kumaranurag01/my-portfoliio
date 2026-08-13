import plugin from "tailwindcss/plugin";

/**
 * Single source of truth for the design tokens.
 *
 * Two deliberate overrides (not `extend`) so the system is enforced rather
 * than merely available:
 *   - `spacing`  : 8px metric only. Every step is a multiple of 8 (plus a 4px
 *                  half-step and the vmax page gutters). Off-grid padding has
 *                  to be written as an arbitrary value, which makes it visible
 *                  in review.
 *   - `colors`   : project palette only. A stray `bg-blue-500` produces no CSS
 *                  instead of quietly shipping an off-palette colour.
 *   - `screens`  : the site's breakpoints are all max-width, listed widest
 *                  first so narrower queries win.
 */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    screens: {
      "mq-1367": { max: "1367px" },
      "mq-1100": { max: "1100px" },
      "mq-900": { max: "900px" },
      "mq-786": { max: "786px" },
      "mq-600": { max: "600px" },
      "mq-425": { max: "425px" },
    },

    spacing: {
      0: "0px",
      px: "1px",
      0.5: "4px", // half-step, for hairline offsets only
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      11: "88px",
      12: "96px",
      14: "112px",
      16: "128px",
      20: "160px",
      // page gutters kept viewport-relative, as the original layout was
      page: "13.33vmax",
      "page-md": "7vmax",
      "page-base": "5vmax",
      "page-sm": "1vmax",
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      // primary accent
      accent: {
        DEFAULT: "#ff79c6",
        hover: "#e85fae",
        deep: "#c73f8b",
        soft: "#ffa6d8",
      },

      canvas: { DEFAULT: "#fef2f2", sunk: "#f9e5e5" },
      slate: { DEFAULT: "#292b46", deep: "#202235" },
      ink: {
        DEFAULT: "#161616",
        60: "#16161698",
        15: "#16161622",
      },
      teal: { DEFAULT: "#286f6c", deep: "#174340" },
      mute: "#6f6f7a", // CRT value wins over the old design-mode `#a2a2a2`
      smoke: "#f5f5f5",
      rule: "#808080",

      // window chrome dots
      dot: { red: "#ff5f57", yellow: "#febc2e", green: "#28c840" },

      // CRT design system (retro-ai-crt-overhaul), see design-system.md
      void: "#000000",
      carbon: {
        DEFAULT: "#0b0b0e",
        raised: "#141419",
        sunk: "#050507",
      },
      phosphor: {
        DEFAULT: "#7dffb0",
        bright: "#ccffdf",
        dim: "#4e9c6d",
      },
      cyan: {
        DEFAULT: "#66e8ff",
        dim: "#3d8b9c",
      },
      amber: "#ffc857",
      line: {
        DEFAULT: "#23232b",
        bright: "#3a3a46",
      },
      // the mandated 6-stripe rainbow, in this order
      bar: {
        red: "#ff5f56",
        orange: "#ff9f43",
        yellow: "#ffd93d",
        green: "#3ddc84",
        cyan: "#4dd8e6",
        blue: "#4d7cff",
      },
    },

    extend: {
      fontFamily: {
        // Monospace-only: sans/display alias the same JetBrains Mono stack
        // so nothing falls back to a proportional face.
        sans: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        display: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.02" }],
        "display-sm": ["2.5rem", { lineHeight: "1.06" }],
        "display-xs": ["1.75rem", { lineHeight: "1.1" }],
        "2xs": ["0.6875rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        window: "0 0 7px #16161698",
        neon: "0 0 8px #ff79c6, 0 0 24px #ff79c680",
        glow: "0 0 8px #7dffb0, 0 0 24px #7dffb066",
        "glow-cyan": "0 0 8px #66e8ff, 0 0 24px #66e8ff66",
      },
      keyframes: {
        animateSvg: { to: { transform: "translate(-50%, -10px)" } },
        upanddown: { to: { transform: "translateY(-5px)" } },
        upupdowndown: { to: { transform: "translateY(-10px)" } },
        scan: {
          from: { transform: "translate3d(0, -100%, 0)" },
          to: { transform: "translate3d(0, 100vh, 0)" },
        },
        drift: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(0, 64px, 0)" },
        },
        caret: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        flicker: {
          from: { opacity: "0.06" },
          to: { opacity: "0.09" },
        },
      },
      animation: {
        chevron: "animateSvg 0.7s infinite linear alternate",
        float: "upanddown 0.7s infinite linear alternate",
        "float-lg": "upupdowndown 0.7s infinite linear alternate",
        scan: "scan 7s linear infinite",
        drift: "drift 20s linear infinite",
        caret: "caret 1s steps(2) infinite",
        flicker: "flicker 4s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    // Layout-mode variants: `design:` and `dev:` key off the data attribute
    // that UIThemeProvider writes onto <html>.
    plugin(({ addVariant }) => {
      addVariant("design", '[data-ui="design"] &');
      addVariant("dev", '[data-ui="dev"] &');
    }),
  ],
};
