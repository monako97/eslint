import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { nodeExternals } from 'rollup-plugin-node-externals';

import esmShim from './esm-shim.mjs';

const mini = terser({
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
});
const resolvePlugin = resolve({
  preferBuiltins: true,
  exportConditions: ['node', 'import'],
  extensions: ['.mjs', '.cjs', '.js', '.ts', '.json', '.node'],
  browser: false,
  mainFields: ['source', 'module', 'main'],
});
const aliasPlugin = alias();

export default [
  // {
  //   cache: true,
  //   preserveSymlinks: true,
  //   input: {
  //     worker: 'worker.mjs',
  //   },
  //   perf: true,
  //   output: {
  //     dir: 'lib/node_modules/eslint-plugin-prettier',
  //     entryFileNames: '[name].mjs',
  //     format: 'es',
  //     interop: 'auto',
  //     esModule: true,
  //     exports: 'auto',
  //     generatedCode: {
  //       preset: 'es2015',
  //       privateFields: true,
  //       objectShorthand: true,
  //     },
  //     preserveModules: true,
  //     preserveModulesRoot: 'node_modules/eslint-plugin-prettier',
  //     validate: true,
  //     sourcemap: false,
  //     inlineDynamicImports: false,
  //   },
  //   plugins: [
  //     esmShim(),
  //     aliasPlugin,
  //     nodeExternals({
  //       deps: false,
  //       devDeps: true,
  //       peerDeps: true,
  //       optDeps: true,
  //       exclude: ['synckit', 'prettier'],
  //       include: [],
  //     }),
  //     resolvePlugin,
  //     commonjs({
  //       esmExternals: false,
  //       ignoreDynamicRequires: true,
  //       requireReturnsDefault: 'auto',
  //       esmExternals: false,
  //       exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
  //     }),
  //     mini,
  //   ],
  // },
  // {
  //   cache: true,
  //   preserveSymlinks: true,
  //   input: {
  //     worker: 'worker.cjs',
  //   },
  //   perf: true,
  //   output: {
  //     dir: 'lib/node_modules/eslint-plugin-prettier',
  //     entryFileNames: '[name].cjs',
  //     format: 'cjs',
  //     interop: 'auto',
  //     esModule: false,
  //     exports: 'auto',
  //     preserveModules: true,
  //     preserveModulesRoot: 'node_modules/eslint-plugin-prettier',
  //     validate: true,
  //     sourcemap: false,
  //     inlineDynamicImports: false,
  //   },
  //   plugins: [
  //     aliasPlugin,
  //     nodeExternals({
  //       deps: false,
  //       devDeps: true,
  //       peerDeps: true,
  //       optDeps: true,
  //       exclude: ['synckit', 'prettier'],
  //       include: [],
  //     }),
  //     resolvePlugin,
  //     commonjs({
  //       requireReturnsDefault: 'auto',
  //       esmExternals: false,
  //       exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
  //     }),
  //     mini,
  //   ],
  // },
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
      aliasPlugin,
      nodeExternals({
        deps: false,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
        exclude: ['chalk'],
        include: [],
      }),
      resolvePlugin,
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
      mini,
    ],
  },
];
