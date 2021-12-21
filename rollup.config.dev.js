import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

module.exports = {
  input: 'src/main.js',
  output: {
    dir: 'example',
    entryFileNames: 'App.js',
    format: 'iife',
    sourcemap: 'inline',
    name: 'App',
  },
  plugins: [
    commonjs(),
    vue(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    babel({ 
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
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
    alias({
      "@": __dirname + '/src'
    }),
    serve({
      host: 'localhost',
      port: 8080,
      contentBase: ['./example'],
    }),
    livereload({
        watch: ['./example/dist'],
        exts: ['html', 'js', 'css', 'vue'],
    }),
  ],
};