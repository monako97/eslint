import react from 'eslint-plugin-react';
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
  hooks.configs.flat.recommended,
] as Linter.Config[];

export default config;
