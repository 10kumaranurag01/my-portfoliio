import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // Last: turns off every rule Prettier already handles.
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // UITheme.tsx deliberately keeps the whole layout-mode mechanic in one
      // file, hook included. That costs fast refresh on that one file only.
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true, allowExportNames: ["useUITheme"] },
      ],
    },
  },
);
