import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
  input: 'src/package.js',
  output: {
    dir: 'output',
    format: 'esm'
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
  ],
};