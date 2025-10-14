import 'core-js/full';
export type {
  AST,
  ConfigWithExtends,
  ConfigWithExtendsArray,
  ExtendsElement,
  InfiniteArray,
  Linter,
  Rule,
  RuleTester,
  Scope,
  SimpleExtendsElement,
  SourceCode,
} from './eslint.d.ts';

let globalIgnoreCount = 0;

export function globalIgnores(ignorePatterns: string[], name?: string) {
  if (!Array.isArray(ignorePatterns)) {
    throw new TypeError('ignorePatterns must be an array');
  }

  if (ignorePatterns.length === 0) {
    throw new TypeError('ignorePatterns must contain at least one pattern');
  }

  const id = globalIgnoreCount++;

  return {
    name: name || `globalIgnores ${id}`,
    ignores: ignorePatterns,
  };
}

// export { defineConfig, globalIgnores } from '@eslint/config-helpers';
export { ESLint, loadESLint } from 'eslint';
