import { ESLint } from '@moneko/eslint';

try {
  console.log('ESLint runing...');
  console.time('ESLint');
  const fix = false;
  const lint = new ESLint({
    cache: false,
    fix: false,
  });
  const results = await lint.lintFiles(['__tests__/*.ts', '__tests__/*.tsx']);
  const formatter = await lint.loadFormatter('stylish');
  const output = await formatter.format(results, {
    cwd: process.cwd(),
    ruleMeta: {},
  });

  if (fix) {
    await ESLint.outputFixes(results);
  }
  if (output) {
    process.stdout.write(output);
  }
  const hasErrors = results.some((result) => result.errorCount > 0);

  console.timeEnd('ESLint');
  if (hasErrors) {
    process.exit(1);
  }
} catch (error) {
  console.log(error);
}
