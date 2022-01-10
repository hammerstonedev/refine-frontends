module.exports = {
  transpileDependencies: ['@hammerstone/refine-vue'],
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
/*const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: path.resolve('./node_modules/vue/dist/vue.runtime.esm.js'),
        "vue-demi": path.resolve('./node_modules/vue-demi/lib/index.mjs')
      },
    },
  },
};*/