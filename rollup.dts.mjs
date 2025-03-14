import dts from 'rollup-plugin-dts';

export default {
  input: {
    index: 'src/index.mts',
    react: 'src/react.mts',
    base: 'src/base.mts',
    solid: 'src/solid.mts',
    vue: 'src/vue.mts',
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
