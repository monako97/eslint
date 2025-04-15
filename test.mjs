import { ESLint } from '@moneko/eslint';
import { transform } from '@moneko/eslint/babel-core';
import { BabelPluginReactCompiler } from '@moneko/eslint/react-compiler';

console.log(transform);
console.log(BabelPluginReactCompiler);

transform(
  `import { useEffect, useState, createElement } from 'react';

const App = () => {
    const [a, setA]= useState(1);
    useEffect(() => {
        console.log(a);
    }, [])
    return createElement('div', {}, 'csa');
}

export default App;
`,
  {
    sourceFileName: 'index.tsx',
    filename: 'index.tsx',
    plugins: [[BabelPluginReactCompiler, {}]],
    sourceMaps: 'inline',
    cloneInputAst: false,
    ast: false,
    configFile: false,
    babelrc: false,
  },
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result === null) {
      console.log(new Error(`Failed to transform "index.tsx"`));
      return;
    }
    console.log(null, result.code || '', result.map === null ? void 0 : result.map);
  },
);

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
