import solid from 'eslint-plugin-solid/configs/typescript';

import base from './base.mjs';
import type { Linter } from './eslint.d.ts';

const config = [...base.configs.recommended, solid] as Linter.Config[];

export default config;
