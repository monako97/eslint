export {
  compile,
  compileProgram,
  CompilerDiagnostic,
  type CompilerDiagnosticDetail,
  type CompilerDiagnosticOptions,
  CompilerError,
  CompilerErrorDetail,
  type CompilerErrorDetailOptions,
  type CompilerPipelineValue,
  CompilerSuggestionOperation,
  default,
  Effect,
  type EnvironmentConfig,
  ErrorSeverity,
  type ExternalFunction,
  findDirectiveDisablingMemoization,
  findDirectiveEnablingMemoization,
  type Hook,
  type LintRule,
  LintRules,
  type Logger,
  type LoggerEvent,
  OPT_IN_DIRECTIVES,
  OPT_OUT_DIRECTIVES,
  parseConfigPragmaAsString,
  parseConfigPragmaForTests,
  parsePluginOptions,
  type PluginOptions,
  printFunctionWithOutlined,
  printHIR,
  printReactiveFunction,
  printReactiveFunctionWithOutlined,
  ProgramContext,
  // runBabelPluginReactCompiler,
  type SourceLocation,
  validateEnvironmentConfig,
  ValueKind,
  ValueReason,
} from 'babel-plugin-react-compiler';

import { type BabelFileResult, transformFromAstSync} from '@babel/core';
import { parse } from '@babel/parser';
import BabelPluginReactCompiler, { type PluginOptions } from 'babel-plugin-react-compiler';
import BabelPluginFbt from 'babel-plugin-fbt';
import BabelPluginFbtRuntime from 'babel-plugin-fbt-runtime';

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
