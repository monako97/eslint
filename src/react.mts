import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import hooks from 'eslint-plugin-react-hooks';

import base from './base.mjs';
import type { Linter } from './eslint.d.ts';

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
  // hooks.configs.flat['recommended-latest'],
  hooks.configs['recommended-latest'],
  reactCompiler.configs.recommended,
] as Linter.Config[];

export default config;
