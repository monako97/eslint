export const exclude = [
  '@babel/core',
  '@babel/core/package.json',
  '@babel/code-frame',
  '@babel/generator',
  '@babel/helper-module-transforms',
  '@babel/helpers',
  '@babel/parser',
  '@babel/template',
  '@babel/traverse',
  '@babel/types',
  '@jridgewell/remapping',
  'convert-source-map',
  'debug',
  'gensync',
  'json5',

  'jsx-ast-utils',
  'babel-plugin-react-compiler',
  'babel-plugin-react-compiler/package.json',
  'babel-plugin-fbt',
  'babel-plugin-fbt-runtime',
  'babel-plugin-fbt/dist/FbtConstants',

  '@babel/preset-typescript',
  '@babel/preset-typescript/package.json',
  '@babel/preset-env',
  '@babel/compat-data',
  '@babel/helper-compilation-targets',
  '@babel/helper-plugin-utils',
  '@babel/helper-validator-option',
  '@babel/plugin-bugfix-firefox-class-in-computed-class-key',
  '@babel/plugin-bugfix-safari-class-field-initializer-scope',
  '@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression',
  '@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining',
  '@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly',
  '@babel/plugin-proposal-private-property-in-object',
  '@babel/plugin-syntax-import-assertions',
  '@babel/plugin-syntax-import-attributes',
  '@babel/plugin-syntax-unicode-sets-regex',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-async-generator-functions',
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-transform-block-scoped-functions',
  '@babel/plugin-transform-block-scoping',
  '@babel/plugin-transform-class-properties',
  '@babel/plugin-transform-class-static-block',
  '@babel/plugin-transform-classes',
  '@babel/plugin-transform-computed-properties',
  '@babel/plugin-transform-destructuring',
  '@babel/plugin-transform-dotall-regex',
  '@babel/plugin-transform-duplicate-keys',
  '@babel/plugin-transform-duplicate-named-capturing-groups-regex',
  '@babel/plugin-transform-dynamic-import',
  '@babel/plugin-transform-explicit-resource-management',
  '@babel/plugin-transform-exponentiation-operator',
  '@babel/plugin-transform-export-namespace-from',
  '@babel/plugin-transform-for-of',
  '@babel/plugin-transform-function-name',
  '@babel/plugin-transform-json-strings',
  '@babel/plugin-transform-literals',
  '@babel/plugin-transform-logical-assignment-operators',
  '@babel/plugin-transform-member-expression-literals',
  '@babel/plugin-transform-modules-amd',
  '@babel/plugin-transform-modules-commonjs',
  '@babel/plugin-transform-modules-systemjs',
  '@babel/plugin-transform-modules-umd',
  '@babel/plugin-transform-named-capturing-groups-regex',
  '@babel/plugin-transform-new-target',
  '@babel/plugin-transform-nullish-coalescing-operator',
  '@babel/plugin-transform-numeric-separator',
  '@babel/plugin-transform-object-rest-spread',
  '@babel/plugin-transform-object-super',
  '@babel/plugin-transform-optional-catch-binding',
  '@babel/plugin-transform-optional-chaining',
  '@babel/plugin-transform-parameters',
  '@babel/plugin-transform-private-methods',
  '@babel/plugin-transform-private-property-in-object',
  '@babel/plugin-transform-property-literals',
  '@babel/plugin-transform-regenerator',
  '@babel/plugin-transform-regexp-modifiers',
  '@babel/plugin-transform-reserved-words',
  '@babel/plugin-transform-shorthand-properties',
  '@babel/plugin-transform-spread',
  '@babel/plugin-transform-sticky-regex',
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-typeof-symbol',
  '@babel/plugin-transform-unicode-escapes',
  '@babel/plugin-transform-unicode-property-regex',
  '@babel/plugin-transform-unicode-regex',
  '@babel/plugin-transform-unicode-sets-regex',
  '@babel/preset-modules',
  'babel-plugin-polyfill-corejs2',
  'babel-plugin-polyfill-corejs3',
  'babel-plugin-polyfill-regenerator',
  'core-js-compat',
  'semver',

  'eslint',
  'eslint/package.json',
  'eslint/config',
  'eslint/universal',
  'eslint/rules',
  'eslint/use-at-your-own-risk',
  '@eslint/config-helpers',
  'eslint-config-prettier',
  'eslint-config-prettier/prettier',
  'eslint-plugin-prettier',
  'eslint-plugin-prettier/recommended',
  'eslint-plugin-simple-import-sort',

  'eslint-plugin-react',
  'eslint-plugin-react-hooks',

  // legacy
  'eslint-plugin-react-hooks-5',
  'eslint-plugin-react-compiler',
  // legacy end

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
];

export function manualChunks(id) {
  if (id.includes('babel')) {
    return 'babel';
  }
  if (id.includes('eslint')) {
    return 'eslint';
  }
  if (id.includes('typescript')) {
    return 'typescript';
  }
  if (id.includes('core-js')) {
    return 'core-js';
  }
  if (id.includes('jiti')) {
    return 'jiti';
  }
  if (id.includes('prettier')) {
    return 'prettier';
  }
  if (id.includes('globals')) {
    return 'globals';
  }

  return null;
}
