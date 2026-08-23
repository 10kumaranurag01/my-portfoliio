/**
 * Single source of truth for the design tokens.
 *
 * Three deliberate overrides (not `extend`) so the system is enforced rather
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
      // sticky header height (RainbowBar 4px + h-12 96px), the one place
      // that number is allowed to live — see scroll-mt-nav usages.
      nav: "100px",
      // page gutters kept viewport-relative, as the original layout was
      page: "13.33vmax",
      "page-md": "7vmax",
      "page-base": "5vmax",
      // fixed, not vmax: in portrait vmax keys off HEIGHT, so "1vmax" resolved
      // to 8.44px on a 390x844 phone — the gutter shrank as the screen
      // narrowed, which is backwards. This is the narrowest-viewport gutter.
      "page-sm": "16px",
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",

      mute: "#8a8a96",

      // CRT design system (retro-ai-crt-overhaul), see
      // docs/superpowers/plans/retro-ai-crt-overhaul.md
      //
      // No pure #000 anywhere: neutrals are tinted toward the brand hue, so
      // the page base carries a trace of phosphor green. The luminance shift
      // off #000000 is negligible, so no contrast ratio below changes.
      void: "#000402",
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
        // Decorative only: dividers, table rules, card borders.
        DEFAULT: "#3a3a46",
        bright: "#4d4d5c",
        // Interactive boundaries: buttons, inputs, anything clickable.
        // 4.03:1 on void and 3.77:1 on carbon, which clears WCAG 1.4.11's
        // 3:1 bar for non-text UI components. The old #23232b was 1.35:1,
        // so buttons did not read as buttons.
        strong: "#6b6b7d",
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
        "glow-cyan": "0 0 8px #66e8ff, 0 0 24px #66e8ff66",
      },
      keyframes: {
        scan: {
          from: { transform: "translate3d(0, -100%, 0)" },
          to: { transform: "translate3d(0, 100vh, 0)" },
        },
        drift: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(0, 64px, 0)" },
        },
      },
      animation: {
        scan: "scan 7s linear infinite",
        drift: "drift 20s linear infinite",
      },
    },
  },
  plugins: [],
};
