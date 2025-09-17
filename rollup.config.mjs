import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeExternals } from 'rollup-plugin-node-externals';
import { exclude } from './exclude.mjs';

import esmShim from './esm-shim.mjs';

// 添加自定义插件转换js扩展名为cjs
const jssToCjsExtension = {
  name: 'js-to-cjs-extension',
  renderChunk(code) {
    // 专门替换模板字符串中的 `}.js` 为 `}.cjs`
    return code
      .replace(/}\.js`/g, '}.cjs`')
      .replace(/\.\/worker/g, './worker.cjs')
      .replace(".resolve('vue-eslint-parser')", '.resolve("../../../vue-eslint-parser/index.mjs")')
      .replace(".resolve('./base')", '.resolve("./base.mjs")')
      .replace(
        ".resolve('./vue2-strongly-recommended')",
        '.resolve("./vue2-strongly-recommended.mjs")',
      )
      .replace(
        ".resolve('./vue3-strongly-recommended')",
        '.resolve("./vue3-strongly-recommended.mjs")',
      )
      .replace(".resolve('./vue3-essential')", '.resolve("./vue3-essential.mjs")')
      .replace(".resolve('./vue2-essential')", '.resolve("./vue2-essential.mjs")');
  },
};

const resolvePlugin = resolve({
  preferBuiltins: true,
  exportConditions: ['node', 'import'],
  extensions: ['.mjs', '.cjs', '.js', '.ts', '.json', '.node'],
  browser: false,
  mainFields: ['source', 'module', 'main'],
});
const aliasPlugin = alias();

export default {
  input: {
    index: 'src/index.mts',
    react: 'src/react.mts',
    base: 'src/base.mts',
    solid: 'src/solid.mts',
    vue: 'src/vue.mts',
    'react-compiler': 'src/react-compiler.mts',
    'babel-core': 'src/babel-core.mts',
    'babel-typescript': 'src/babel-typescript.mts',
    'babel-preset-env': 'src/babel-preset-env.mts',
    'babel-parser': 'src/babel-parser.mts',
  },
  output: {
    dir: 'lib',
    entryFileNames: '[name].mjs',
    format: 'es',
    interop: 'auto',
    esModule: true,
    exports: 'named',
    generatedCode: {
      preset: 'es2015',
      objectShorthand: false,
    },
    preserveModules: true,
    preserveModulesRoot: 'src',
    validate: true,
    sourcemap: false,
    inlineDynamicImports: false,
    externalLiveBindings: true,
    systemNullSetters: false,
  },
  cache: true,
  preserveSymlinks: true,
  perf: false,
  plugins: [
    esmShim(),
    aliasPlugin,
    resolvePlugin,
    nodeExternals({
      deps: false,
      devDeps: true,
      peerDeps: true,
      optDeps: true,
      exclude: exclude,
      include: [],
    }),
    json({
      preferConst: true,
      compact: true,
    }),
    typescript({
      outDir: 'lib',
    }),
    commonjs({
      requireReturnsDefault: 'auto',
      esmExternals: true,
      exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
      ignore: ['react', 'vue', 'solid-js'],
      ignoreDynamicRequires: true,
    }),
    jssToCjsExtension,
    terser(),
  ],
};
