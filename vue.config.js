module.exports = {
  configureWebpack: {
    externals: {
      "@vue/composition-api": {
        commonjs: "@vue/composition-api",
        commonjs2: "@vue/composition-api",
        amd: "@vue/composition-api",
      },
      "vue2-datepicker": {
        commonjs: "vue2-datepicker",
        commonjs2: "vue2-datepicker",
        amd: "vue2-datepicker",
      },
      "core-js": {
        commonjs: "core-js",
        commonjs2: "core-js",
        amd: "core-js",
      },
      "date-fns/esm": {
        commonjs: "date-fns",
        commonjs2: "date-fns",
        amd: "date-fns",
      },
      "vue": {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
      },
      optimization: {
        concatenateModules: true,
      },
    }
  }
};
