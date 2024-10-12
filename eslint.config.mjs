import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals: globals.es2015 }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
