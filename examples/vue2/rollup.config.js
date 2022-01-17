import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import vue from 'rollup-plugin-vue2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

module.exports = {
  input: 'main.js',
  output: {
    format: 'iife',
    dir: 'example',
    entryFileNames: 'App.js',
    sourcemap: 'inline',
    name: 'App',
  },
  plugins: [
    vue(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    postcss({
      extensions: [ '.css' ],
      extract: true,
      config: {
        path: './postcss.config.js'
      },
    }),
    resolve({
      extensions: ['.js', '.vue'],
    }),
    serve({
      host: 'localhost',
      port: 8080,
      contentBase: ['./example'],
    }),
    livereload({
        watch: './example/*',
        exts: ['html', 'js', 'css', 'vue'],
    }),
  ],
};