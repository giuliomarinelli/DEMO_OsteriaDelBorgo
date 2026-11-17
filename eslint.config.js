import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";

const tsFiles = ["**/*.ts", "**/*.tsx"];
export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "server/**",
      ".scaffold/**",
      ".wrangler/**",
      "artifacts/**",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  ...qwikEslint9Plugin.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
