import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './script.js',
    format: 'cjs',
    sourcemap: false,
    strict: false,
  },
  treeshake: false,
  plugins: [
    typescript(),
    babel({
      presets: [
        [
          '@babel/env',
          {
            targets: {
              chrome: '39',
            },
            spec: true,
            debug: false,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-spread',
        '@babel/plugin-transform-parameters',
      ],
    }),
  ],
};
