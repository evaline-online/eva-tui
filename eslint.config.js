/** @type {import('eslint').Linter.Config} */
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: tsParser,
  },
  plugins: {
    "@typescript-eslint": tseslint,
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};