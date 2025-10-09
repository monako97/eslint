import dts from 'rollup-plugin-dts';

const config = {
  input: {
    index: 'src/index.mts',
    react: 'src/react.mts',
    'react-jsx': 'src/react-jsx.mts',
    base: 'src/base.mts',
    solid: 'src/solid.mts',
    vue: 'src/vue.mts',
    'react-compiler': 'src/react-compiler.mts',
    'babel-core': 'src/babel-core.mts',
    'babel-parser': 'src/babel-parser.mts',
    'babel-typescript': 'src/babel-typescript.mts',
    'babel-preset-env': 'src/babel-preset-env.mts',
  },
  output: {
    dir: 'lib',
    entryFileNames: '[name].d.mts',
    format: 'es',
  },
  plugins: [
    dts(),
    {
      name: 'replace-declare-dts',
      renderChunk(code) {
        return code
          .replaceAll('declare class ', 'export class ')
          .replaceAll('declare namespace ', 'export namespace ');
      },
    },
  ],
};

export default [
  config,
  {
    ...config,
    output: {
      dir: 'cjs',
      entryFileNames: '[name].d.cts',
      format: 'cjs',
    },
  }
];
