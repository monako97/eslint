import { type BabelFileResult, transformFromAstSync } from '@babel/core';
import { parse } from '@babel/parser';
import BabelPluginFbt from 'babel-plugin-fbt';
import BabelPluginFbtRuntime from 'babel-plugin-fbt-runtime';
import BabelPluginReactCompiler from 'babel-plugin-react-compiler';

import type { PluginOptions } from './types/react-compiler.d.ts';

export type {
  CompilerDiagnosticDetail,
  CompilerDiagnosticOptions,
  CompilerErrorDetailOptions,
  CompilerPipelineValue,
  EnvironmentConfig,
  ExternalFunction,
  Hook,
  LintRule,
  Logger,
  LoggerEvent,
  PluginOptions,
  SourceLocation,
} from './types/react-compiler.d.ts';
export {
  compile,
  compileProgram,
  CompilerDiagnostic,
  CompilerError,
  CompilerErrorDetail,
  CompilerSuggestionOperation,
  default,
  Effect,
  ErrorCategory,
  ErrorSeverity,
  findDirectiveDisablingMemoization,
  findDirectiveEnablingMemoization,
  LintRules,
  OPT_IN_DIRECTIVES,
  OPT_OUT_DIRECTIVES,
  parseConfigPragmaForTests,
  parsePluginOptions,
  printFunctionWithOutlined,
  printHIR,
  printReactiveFunction,
  printReactiveFunctionWithOutlined,
  ProgramContext,
  validateEnvironmentConfig,
  ValueKind,
  ValueReason,
} from 'babel-plugin-react-compiler';
export function runBabelPluginReactCompiler(
  text: string,
  file: string,
  language: 'flow' | 'typescript',
  options: Partial<PluginOptions> | null,
  includeAst: boolean = false,
): BabelFileResult {
  const ast = parse(text, {
    sourceFilename: file,
    plugins: [language, 'jsx'],
    sourceType: 'module',
  });
  const result = transformFromAstSync(ast, text, {
    ast: includeAst,
    filename: file,
    highlightCode: false,
    retainLines: true,
    plugins: [
      [BabelPluginReactCompiler, options],
      [BabelPluginFbt, {}],
      [BabelPluginFbtRuntime, {}],
    ],
    sourceType: 'module',
    configFile: false,
    babelrc: false,
  });

  return result;
}
