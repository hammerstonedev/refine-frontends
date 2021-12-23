import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

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
        },
    },
    {
        file: pkg.module,
        format: 'es',
        exports: "named",
        name: 'refine-vue2',
        sourcemap: true,
        plugins: [getBabelOutputPlugin({ 
          presets: [['@babel/env', { modules: 'umd' }]] 
        })]
    },
  ],
  plugins: [
    commonjs(),
    vue(),
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
  ],
};