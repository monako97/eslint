import 'core-js/full';
export type {
  AST,
  Linter,
  Rule,
  RuleTester,
  Scope,
  SourceCode,
  ConfigWithExtends,
  ConfigWithExtendsArray,
  InfiniteArray,
  SimpleExtendsElement,
  ExtendsElement,
} from './eslint.d.ts';
export { ESLint, loadESLint } from 'eslint';
export { defineConfig, globalIgnores } from 'eslint/config';
