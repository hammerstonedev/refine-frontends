import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'umd'
  },
  plugins: [
    commonjs(),
    vue(),
    babel({ 
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    postcss({
      extensions: [ '.css' ],
      extract: true,
      modules: true,
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
      open: true,
      openPage: '/',
      host: 'localhost',
      port: 3003,
      contentBase: ['./example'],
    }),
    livereload({
        watch: ['./example'],
        exts: ['html', 'js', 'css', 'vue'],
    }),
  ],
};