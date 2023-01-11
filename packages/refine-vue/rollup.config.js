import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
import vue2 from 'rollup-plugin-vue2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer'

let vueVersion = process.env.ROLLUP_VUE_VERSION;
let isVue2 = vueVersion === '2';

let vuePlugin = isVue2
  ? vue2({
      needMap: false,
    })
  : vue();

let vueDemiShim = isVue2
  ? {}
  : {
      resolveId(id) {
        if (id === './vue-demi-shim') {
          // For Vue3, point the shim at the actual VueDemi
          // library. In Vue2 we don't use it at all.
          return { id: 'vue-demi' };
        }
      },
    };

module.exports = {
  input: 'src/package.js',
  external: ['vue', '@vue/composition-api', 'vue2-datepicker', 'vue-demi'],
  output: [
    {
      file: `dist/vue${vueVersion}/refine-vue.esm.js`,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `dist/vue${vueVersion}/refine-vue.esm.min.js`,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: `dist/vue${vueVersion}/refine-vue.cjs.js`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `dist/vue${vueVersion}/refine-vue.cjs.min.js`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    // analyze({
    //   summaryOnly: true
    // }),
    vueDemiShim,
    vuePlugin,
    // postcss({
    //   extensions: ['.css'],
    //   extract: true,
    //   config: {
    //     path: './postcss.config.js',
    //   },
    // }),
    resolve({
      extensions: ['.js', '.vue'],
    }),
    alias({
      '@': __dirname + '/src',
    }),
    terser(),
  ],
};
