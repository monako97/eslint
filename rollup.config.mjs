import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeExternals } from 'rollup-plugin-node-externals';

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
  },
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
    aliasPlugin,
    resolvePlugin,
    nodeExternals({
      deps: false,
      devDeps: true,
      peerDeps: true,
      optDeps: true,
      exclude: [
        '@babel/core',
        'babel-plugin-react-compiler',
        '@babel/preset-typescript',
        '@babel/preset-typescript/package.json',
        '@babel/preset-env',
        "@babel/compat-data",
        "@babel/helper-compilation-targets",
        "@babel/helper-plugin-utils",
        "@babel/helper-validator-option",
        "@babel/plugin-bugfix-firefox-class-in-computed-class-key",
        "@babel/plugin-bugfix-safari-class-field-initializer-scope",
        "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression",
        "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining",
        "@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly",
        "@babel/plugin-proposal-private-property-in-object",
        "@babel/plugin-syntax-import-assertions",
        "@babel/plugin-syntax-import-attributes",
        "@babel/plugin-syntax-unicode-sets-regex",
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-async-generator-functions",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-block-scoped-functions",
        "@babel/plugin-transform-block-scoping",
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-class-static-block",
        "@babel/plugin-transform-classes",
        "@babel/plugin-transform-computed-properties",
        "@babel/plugin-transform-destructuring",
        "@babel/plugin-transform-dotall-regex",
        "@babel/plugin-transform-duplicate-keys",
        "@babel/plugin-transform-duplicate-named-capturing-groups-regex",
        "@babel/plugin-transform-dynamic-import",
        "@babel/plugin-transform-explicit-resource-management",
        "@babel/plugin-transform-exponentiation-operator",
        "@babel/plugin-transform-export-namespace-from",
        "@babel/plugin-transform-for-of",
        "@babel/plugin-transform-function-name",
        "@babel/plugin-transform-json-strings",
        "@babel/plugin-transform-literals",
        "@babel/plugin-transform-logical-assignment-operators",
        "@babel/plugin-transform-member-expression-literals",
        "@babel/plugin-transform-modules-amd",
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-transform-modules-systemjs",
        "@babel/plugin-transform-modules-umd",
        "@babel/plugin-transform-named-capturing-groups-regex",
        "@babel/plugin-transform-new-target",
        "@babel/plugin-transform-nullish-coalescing-operator",
        "@babel/plugin-transform-numeric-separator",
        "@babel/plugin-transform-object-rest-spread",
        "@babel/plugin-transform-object-super",
        "@babel/plugin-transform-optional-catch-binding",
        "@babel/plugin-transform-optional-chaining",
        "@babel/plugin-transform-parameters",
        "@babel/plugin-transform-private-methods",
        "@babel/plugin-transform-private-property-in-object",
        "@babel/plugin-transform-property-literals",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-transform-regexp-modifiers",
        "@babel/plugin-transform-reserved-words",
        "@babel/plugin-transform-shorthand-properties",
        "@babel/plugin-transform-spread",
        "@babel/plugin-transform-sticky-regex",
        "@babel/plugin-transform-template-literals",
        "@babel/plugin-transform-typeof-symbol",
        "@babel/plugin-transform-unicode-escapes",
        "@babel/plugin-transform-unicode-property-regex",
        "@babel/plugin-transform-unicode-regex",
        "@babel/plugin-transform-unicode-sets-regex",
        "@babel/preset-modules",
        "babel-plugin-polyfill-corejs2",
        "babel-plugin-polyfill-corejs3",
        "babel-plugin-polyfill-regenerator",
        "core-js-compat",
        "semver",

        'eslint',
        'eslint/package.json',
        'eslint/use-at-your-own-risk',
        'eslint-config-prettier',
        'eslint-config-prettier/prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-prettier/recommended',
        'eslint-plugin-simple-import-sort',

        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-react-compiler',

        'eslint-plugin-solid',
        'eslint-plugin-solid/configs/typescript',

        'eslint-plugin-vue',
        'vue-eslint-parser',

        'globals',
        'prettier',
        'typescript-eslint',
        'typescript',
        'typescript/lib/tsserverlibrary',
        'core-js/full',
        'jiti',
        'jiti/package.json',
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
      exclude: ['**/*.node', '**/*.d.ts', '**/*.json'],
      ignore: ['react', 'vue', 'solid-js'],
      ignoreDynamicRequires: true,
    }),
    jssToCjsExtension,
    mini,
  ],
};
