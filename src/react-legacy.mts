import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import hooks from 'eslint-plugin-react-hooks-5';

import base from './base.mjs';
import type { Linter } from './eslint.js';

const config = [
  ...base.configs.recommended,
  react.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  hooks.configs['recommended-latest'],
  reactCompiler.configs.recommended,
] as Linter.Config[];

export default config;
