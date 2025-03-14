# @moneko/eslint

[![npm version](https://img.shields.io/npm/v/@moneko/eslint.svg)](https://www.npmjs.com/package/@moneko/eslint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个功能强大、规则完善的 ESLint 配置包，旨在提高 JavaScript/TypeScript 代码质量和一致性。

## 特性

- 针对现代 JavaScript 和 TypeScript 项目的优化配置
- 集成 Prettier 用于代码格式化
- 智能的 import 排序规则
- 完善的代码质量和代码风格规则集
- 基于 ESLint 平面配置系统 (eslint.config.mjs)

## 安装

使用 npm:

```bash
npm install --save-dev @moneko/eslint
```

使用 yarn:

```bash
yarn add --dev @moneko/eslint
```

使用 pnpm:

```bash
pnpm add -D @moneko/eslint
```

## 快速开始

在项目根目录创建 `eslint.config.mjs` 文件:

```js
import base from '@moneko/eslint/base';

export default base.configs.recommended;
```

## 可用配置

此包提供以下几种预设配置:

- `base` - 基础配置，适用于大多数 JavaScript/TypeScript 项目
- `react` - react配置，适用于大多数 react 项目
- `vue` - vue 配置，适用于大多数 vue 项目
- `solid` - solidjs 配置，适用于大多数 solidjs 项目

## 自定义配置

您可以通过扩展默认配置并覆盖规则来自定义配置:

```js
import react from '@moneko/eslint/react'; // 使用 react 规则

export default [
  ...react,
  {
    rules: {
      // 您的自定义规则
      'no-console': 'warn',
    },
  },
];
```

## 功能特点

- **智能导入排序**: 使用 `eslint-plugin-simple-import-sort` 自动组织和排序导入语句
- **代码格式化**: 与 Prettier 无缝集成，确保代码风格一致
- **TypeScript 支持**: 针对 TypeScript 项目的特定规则和类型检查集成
- **Modern JavaScript**: 支持最新的 ECMAScript 特性和语法
- **开箱即用**: 内置有 React、Vue、Solid JS、Typescript 等语法规则

## Nodejs API 使用

```yaml
# .prettierrc.yaml
printWidth: 100
singleQuote: true
bracketSameLine: false
```

```javascript
// eslint.config.mjs
import react from '@moneko/eslint/react';

export default react;
```

```javascript
// nodejs api
import { ESLint } from '@moneko/eslint';

try {
  console.log('ESLint runing...');
  console.time('ESLint');
  const fix = false; // fix
  const lint = new ESLint({
    cache: true,
    fix: fix,
  });
  const results = await lint.lintFiles(['__tests__/*.ts', '__tests__/*.tsx']);
  const formatter = await lint.loadFormatter('stylish');
  const output = await formatter.format(results);

  if (fix) {
    await ESLint.outputFixes(results);
  }
  if (output) {
    process.stdout.write(output);
  }
  const hasErrors = results.some((result) => result.errorCount > 0);

  console.timeEnd('ESLint');
  if (hasErrors) {
    process.exit(1);
  }
} catch (error) {
  console.log(error);
}
```

## 许可证

MIT

## 作者

moneko
