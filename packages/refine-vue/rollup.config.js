import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
import vue2 from 'rollup-plugin-vue2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

let vuePlugin;
if (process.env.ROLLUP_VUE_VERSION === '2') {
  vuePlugin = vue2;
} else {
  // don't even run vue3 build through babel
  vuePlugin = vue;
}

module.exports = {
  input: 'src/package.js',
  external: ['vue', '@vue/composition-api', 'vue2-datepicker', 'vue-demi'],
  output: [
    {
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    vuePlugin(),
    postcss({
      extensions: ['.css'],
      extract: true,
      config: {
        path: './postcss.config.js',
      },
    }),
    resolve({
      extensions: ['.js', '.vue'],
    }),
    alias({
      '@': __dirname + '/src',
    }),
  ],
};
