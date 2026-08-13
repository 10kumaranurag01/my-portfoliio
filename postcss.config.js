// Vite has no CRA-style auto-detection of tailwind.config.js — the PostCSS
// chain is declared here instead.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
