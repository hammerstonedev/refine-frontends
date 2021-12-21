import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

module.exports = {
  input: 'src/package.js',
  external: [
    'vue',
    '@vue/composition-api',
    'vue2-datepicker',
  ],
  output: [
    {
        file: pkg.main,
        format: 'umd',
        name: 'refine-vue2',
        sourcemap: true,
        exports: "named",
        globals: {
          'vue': 'Vue',
          '@vue/composition-api': 'VueCompositionAPI',
          'vue2-datepicker': 'DatePicker',
        }
    },
    {
        file: pkg.module,
        format: 'es',
        exports: "named",
        name: 'refine-vue2',
        sourcemap: true,
    },
  ],
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