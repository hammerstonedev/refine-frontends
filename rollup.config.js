import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';

module.exports = {
  input: 'src/package.js',
  external: [
    'vue',
    '@vue/composition-api',
    'vue2-datepicker',
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: "named",
      name: 'refine-vue2',
      sourcemap: true,
    },
  ],
  plugins: [
    vue(),
    babel({
      babelHelpers: "bundled",
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
  ],
};