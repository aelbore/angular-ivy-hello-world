import resolve from 'rollup-plugin-node-resolve';
import buildOptimizer from '@angular-devkit/build-optimizer';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const uglifyOptions = {
  mangle: true,
  compress: {
    pure_getters: true,
    passes: 3,
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
    resolve({jsnext: true, module: true}),
    optimizer(),
    uglify.uglify(uglifyOptions),
    filesize()
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