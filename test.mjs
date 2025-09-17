import { ESLint } from '@moneko/eslint';
import { transform } from '@moneko/eslint/babel-core';
import BabelPluginReactCompiler, { runBabelPluginReactCompiler } from '@moneko/eslint/react-compiler';

const jsx = `import { useEffect, useState, createElement } from 'react';

const App = () => {
    const [a, setA]= useState(1);
    useEffect(() => {
        console.log(a);
    }, [])
    return createElement('div', {}, 'csa');
}

export default App;
`;
transform(jsx,
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

const result = runBabelPluginReactCompiler(jsx, 'index.tsx', 'typescript', {});

console.log(result.code);
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
    // process.exit(1);
  }
} catch (error) {
  console.log(error);
}

import { transformAsync } from '@moneko/eslint/babel-core';
import BabelPresetEnv from '@moneko/eslint/babel-preset-env';
import BabelPresetTypescript from '@moneko/eslint/babel-typescript';
import jsxDomTransform from 'babel-plugin-jsx-dom-expressions';
import BabelPluginSolidRefresh from 'solid-refresh/babel';


const jsxDomExpressions = {
  moduleName: 'solid-js/web',
  builtIns: [
    'For',
    'Show',
    'Switch',
    'Match',
    'Suspense',
    'SuspenseList',
    'Portal',
    'Index',
    'Dynamic',
    'ErrorBoundary',
  ],
  contextToCustomElements: true,
  wrapConditionals: true,
  generate: 'dom',
  hydratable: false,
};

const solidres = await transformAsync(`import { createEffect, mergeProps } from 'solid-js';
import { customElement, noShadowDOM } from 'solid-element';

import type { CustomElement } from '..';
import type { JSXElement } from '../basic-config';
import theme, { ColorScheme } from '../theme';

function Provider(props: ProviderProps) {
  const { baseStyle, scheme, setScheme } = theme;

  createEffect(() => {
    props.onScheme?.(scheme());
  });
  createEffect(() => {
    if (props.scheme) {
      setScheme(props.scheme);
    }
  });
  return (
    <>
      <style textContent={baseStyle()} />
      <slot />
    </>
  );
}
export interface ProviderProps {
  /** 主题, 等同于使用 setScheme
   * @default 'auto'
   */
  scheme?: keyof typeof ColorScheme;
  /** 包裹的子项 */
  children?: JSXElement;
  /** 响应 scheme 变化 */
  onScheme?(scheme: keyof typeof ColorScheme): void;
}
export type ProviderElement = CustomElement<ProviderProps, 'onScheme'>;

Provider.registry = () => {
  customElement<ProviderProps>('n-provider', (_, opt) => {
    noShadowDOM();
    const el = opt.element;
    const props = mergeProps(
      {
        onScheme(scheme: keyof typeof ColorScheme) {
          el.dispatchEvent(
            new CustomEvent('scheme', {
              detail: scheme,
            }),
          );
        },
      },
      _,
    );

    return <Provider {...props} />;
  });
};
export default Provider;
`, {
  sourceFileName: 'index.s.ts',
  filename: 'index.s.tsx',
  sourceMaps: 'inline',
  cloneInputAst: false,
  ast: false,
  configFile: false,
  babelrc: false,
  presets: [
    [
      BabelPresetEnv,
      {
        modules: false,
      },
    ],
    [BabelPresetTypescript, {
      
    }],
  ],
  plugins: [
    [jsxDomTransform, {...jsxDomExpressions, }],
    [
      BabelPluginSolidRefresh,
      {
        bundler: 'webpack5',
      },
    ],
  ]
});

console.log(solidres)