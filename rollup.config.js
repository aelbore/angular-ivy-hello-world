import resolve from 'rollup-plugin-node-resolve';
import buildOptimizer from '@angular-devkit/build-optimizer/src/build-optimizer/rollup-plugin.js';
import filesize from 'rollup-plugin-filesize';

import { terser } from 'rollup-plugin-terser';

const uglifyOptions = {
  safari10: true,
  output: {
    ascii_only: true,
    comments: false,
    webkit: true,
  },
  compress: {
    pure_getters: true,
    passes: 3,
    global_defs: {
      ngDevMode: false,
    },
  }
}

export default {
  input: '.tmp/src/index.js',
  treeshake: true,
  output: {
    file: 'dist/card.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: [
    resolve(),
    buildOptimizer({
      sideEffectFreeModules: [
        `node_modules/@angular/core/`,
        `node_modules/@angular/platform-browser/`,
        `node_modules/@angular/common/`,
        `node_modules/@angular/compiler/`,
        `node_modules/rxjs/`,
      ]
    }),
    terser(uglifyOptions),
    filesize()
  ]
}