import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import pluginUrl from '@rollup/plugin-url';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import copy from 'rollup-plugin-copy';
import svgr from '@svgr/rollup';
import sourcemaps from 'rollup-plugin-sourcemaps';

import rollupTemplate from './util/rollupTemplate';

const plugins = [
  sourcemaps(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true,
  }),
  copy({
    targets: [
      { src: 'static/**/*', dest: 'build/public' },
    ]
  }),
  json(),
  svgr(),
  postcss({
    extract: true,
    plugins: [
      autoprefixer,
    ],
  }),
  external(),
  resolve(),
  pluginUrl({
  // by default, rollup-plugin-url will not handle font files
    include: ['**/*.woff', '**/*.woff2'],
    // setting infinite limit will ensure that the files
    // are always bundled with the code, not copied to /dist
    limit: Infinity,
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    inputSourceMap: false,
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],

  }),
  commonjs(),
  nodePolyfills(),
  html({
    title: 'Wordle Bookmark App',
    template: rollupTemplate,
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
  }),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push([serve({
    open: false,
    verbose: true,
    contentBase: ['build'],
    host: 'localhost',
    port: 4000,
  }),
  livereload(),
  ]);
} else {
  plugins.push(terser());
}
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      sourcemap: true,
      name: 'wordle-list',
    }
  ],
  plugins,
};
