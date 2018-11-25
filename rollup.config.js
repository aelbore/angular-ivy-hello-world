import resolve from 'rollup-plugin-node-resolve';
import buildOptimizer from '@angular-devkit/build-optimizer';
import uglify from 'rollup-plugin-uglify';

const uglifyOptions = {
  warnings: false,
  output: {
    ascii_only: true,
    comments: false,
    webkit: true,
  },
  mangle: false,
  compress: {
    global_defs: {
      ngDevMode: false,
    }
  }
}

export default {
  input: 'dist/app.js',
  output: {
    file: 'public/app.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    resolve(),
    optimizer({
			sideEffectFreeModules: ['']
		}),
    uglify.uglify(uglifyOptions)
  ]
}


function optimizer(options) {
	return {
	  name: 'build-optimizer',
	  transform(content, id) {
      let isSideEffectFree = false;
      if(id.indexOf('node_modules/@angular') > -1 || id.indexOf('node_modules/rxjs') > -1){
        isSideEffectFree = true;
      }
      const { content: code, sourceMap: map } = buildOptimizer.buildOptimizer({
        content, inputFilePath: id, emitSourceMap: true, isSideEffectFree,
      });

      return { code, map };
	  }
	}
}