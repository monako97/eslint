import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeExternals } from 'rollup-plugin-node-externals';

import { exclude } from './exclude.mjs';

// 添加自定义插件转换js扩展名为cjs
const jssToCjsExtension = {
  name: 'js-to-cjs-extension',
  renderChunk(code) {
    // 专门替换模板字符串中的 `}.js` 为 `}.cjs`
    return code
      .replace(/}\.js`/g, '}.cjs`')
      .replace(/\.\/worker/g, './worker.cjs')
      .replace(".resolve('vue-eslint-parser')", '.resolve("../../../vue-eslint-parser/index.cjs")')
      .replace(".resolve('./base')", '.resolve("./base.cjs")')
      .replace(
        ".resolve('./vue2-strongly-recommended')",
        '.resolve("./vue2-strongly-recommended.cjs")',
      )
      .replace(
        ".resolve('./vue3-strongly-recommended')",
        '.resolve("./vue3-strongly-recommended.cjs")',
      )
      .replace(".resolve('./vue3-essential')", '.resolve("./vue3-essential.cjs")')
      .replace(".resolve('./vue2-essential')", '.resolve("./vue2-essential.cjs")');
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
    'react-jsx': 'src/react-jsx.mts',
    'react-legacy': 'src/react-legacy.mts',
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
    dir: 'cjs',
    entryFileNames: '[name].cjs',
    format: 'cjs',
    interop: 'auto',
    esModule: true,
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
    validate: true,
    generatedCode: {
      preset: 'es5',
      objectShorthand: false,
    },
    sourcemap: false,
    inlineDynamicImports: false,
    externalLiveBindings: true,
    systemNullSetters: false,
  },
  cache: true,
  preserveSymlinks: true,
  perf: false,
  plugins: [
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
      outDir: 'cjs',
    }),
    commonjs({
      requireReturnsDefault: 'auto',
      esmExternals: false,
      exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
      ignore: ['react', 'vue', 'solid-js'],
      ignoreDynamicRequires: true,
    }),
    jssToCjsExtension,
    terser(),
  ],
};
