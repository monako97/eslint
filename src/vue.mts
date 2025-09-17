import base from './base.mjs';
import pluginVue from 'eslint-plugin-vue';

import type { Linter } from './eslint.d.ts';

const config = [
  ...base.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
] as Linter.Config[];

export default config;
