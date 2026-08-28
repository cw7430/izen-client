import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import tanstackQuery from '@tanstack/eslint-plugin-query';

import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,

  reactHooks.configs.flat.recommended,

  reactRefresh.configs.vite,

  {
    extends: [tanstackQuery],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
