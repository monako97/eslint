import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { nodeExternals } from 'rollup-plugin-node-externals';

import esmShim from './esm-shim.mjs';

// 添加自定义插件转换js扩展名为cjs
const jssToCjsExtension = () => ({
  name: 'js-to-cjs-extension',
  renderChunk(code) {
    // 专门替换模板字符串中的 `}.js` 为 `}.cjs`
    return code.replace(/}\.js`/g, '}.cjs`').replace(/\.\/worker/g, './worker.cjs');
  },
});

export default [
  // 生成 .d.ts 类型声明文件
  {
    input: 'src/index.mts',
    output: {
      file: 'lib/index.d.mts',
      format: 'es',
    },
    plugins: [
      dts(),
      {
        name: 'replace-declare-dts',
        renderChunk(code) {
          return code
            .replaceAll('declare class ', 'export class ')
            .replaceAll('declare namespace ', 'export namespace ');
        },
      },
    ],
  },
  {
    input: 'src/index.mts',
    output: {
      dir: 'lib',
      entryFileNames: '[name].mjs',
      format: 'es',
      interop: 'auto',
      esModule: true,
      exports: 'auto',
      generatedCode: {
        preset: 'es2015',
        privateFields: true,
        objectShorthand: true,
      },
      preserveModules: true,
      preserveModulesRoot: 'src',
      validate: true,
      sourcemap: false,
      inlineDynamicImports: false,
    },

    cache: true,
    preserveSymlinks: true,
    perf: true,
    plugins: [
      esmShim(),
      alias(),
      resolve({
        preferBuiltins: true,
        moduleDirectories: ['node_modules'],
        exportConditions: ['node', 'import'],
        extensions: ['.mjs', '.cjs', '.js', '.ts', '.json', '.node'],
        browser: false,
        mainFields: ['source', 'module', 'main'],
      }),
      nodeExternals({
        deps: false,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
        exclude: [
          'eslint',
          'eslint/use-at-your-own-risk',
          'eslint-config-prettier',
          'eslint-plugin-prettier',
          'eslint-plugin-prettier/recommended',
          'eslint-plugin-simple-import-sort',
          'globals',
          'prettier',
          'typescript-eslint',
          'typescript',
          'typescript/lib/tsserverlibrary',
          'core-js/full',
        ],
        include: [],
      }),
      json({
        preferConst: true,
        compact: true,
      }),
      typescript(),
      commonjs({
        requireReturnsDefault: 'auto',
        esmExternals: false,
        exclude: ['**/*.node', '**/*.d.ts'],
      }),
      jssToCjsExtension(),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  },
  {
    cache: true,
    preserveSymlinks: true,
    input: {
      worker: 'worker.cjs',
    },
    perf: true,
    output: {
      dir: 'lib/node_modules/eslint-plugin-prettier',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      interop: 'auto',
      esModule: false,
      exports: 'auto',
      preserveModules: true,
      preserveModulesRoot: 'node_modules/eslint-plugin-prettier',
      validate: true,
      sourcemap: false,
      inlineDynamicImports: false,
    },
    plugins: [
      alias(),
      nodeExternals({
        deps: false,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
        exclude: ['synckit', 'prettier'],
        include: [],
      }),
      resolve({
        preferBuiltins: true,
        exportConditions: ['node', 'import'],
        extensions: ['.mjs', '.cjs', '.js', '.ts', '.json', '.node'],
        browser: false,
        mainFields: ['source', 'module', 'main'],
      }),
      commonjs({
        requireReturnsDefault: 'auto',
        esmExternals: false,
        exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  },
  {
    cache: true,
    preserveSymlinks: true,
    input: {
      stylish: 'node_modules/eslint/lib/cli-engine/formatters/stylish.js',
      html: 'node_modules/eslint/lib/cli-engine/formatters/html.js',
      json: 'node_modules/eslint/lib/cli-engine/formatters/json.js',
      'json-with-metadata': 'node_modules/eslint/lib/cli-engine/formatters/json-with-metadata.js',
    },
    perf: true,
    output: {
      dir: 'lib/node_modules/eslint/lib/cli-engine/formatters',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      interop: 'auto',
      esModule: false,
      exports: 'auto',
      preserveModules: true,
      preserveModulesRoot: 'node_modules/eslint/lib/cli-engine',
      validate: true,
      sourcemap: false,
      inlineDynamicImports: false,
    },
    plugins: [
      alias(),
      nodeExternals({
        deps: false,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
        exclude: ['chalk'],
        include: [],
      }),
      resolve({
        preferBuiltins: true,
        exportConditions: ['node', 'import'],
        extensions: ['.mjs', '.cjs', '.js', '.ts', '.json', '.node'],
        browser: false,
        mainFields: ['source', 'module', 'main'],
      }),
      commonjs({
        requireReturnsDefault: false,
        esmExternals: false,
        exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
      }),
      {
        name: 'fix-formatters',
        renderChunk(code) {
          // 如果cli-engine/formatters/formatters-meta.json不存在，则复制
          const name = 'lib/node_modules/eslint/lib/cli-engine/formatters/formatters-meta.json';

          if (!existsSync(name)) {
            // 判断文件夹是否存在
            const dir = dirname(name);

            if (!existsSync(dir)) {
              mkdirSync(dir, { recursive: true });
            }
            writeFileSync(
              name,
              readFileSync(
                `node_modules/eslint/lib/cli-engine/formatters/formatters-meta.json`,
                'utf-8',
              ),
            );
          }
          // 替换exports.default = xxx为module.exports = xxx
          return code.replace(/exports\.default\s*=\s*(\w+);/, 'module.exports = $1;');
        },
      },
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  },
];
