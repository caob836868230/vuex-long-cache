const pkg = require('./package.json');
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  output: {
    name: 'vuexLongCache',
    file: pkg.main,
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ["@babel/preset-env", {
          "targets": {
            "browsers": [
              "last 2 versions",
              "Android >= 4.4",
              "ios >= 7",
              "ie >= 9"
            ],
          },
          "modules": false
        }]
      ]
    }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
};