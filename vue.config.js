module.exports = {
  css: {
    extract: true
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        output: {
          libraryExport: 'default'
        },
        optimization: {
          concatenateModules: true,
        },
        externals: [
          {
            "@vue/composition-api": {
              commonjs: "@vue/composition-api",
              commonjs2: "@vue/composition-api",
              amd: "@vue/composition-api",
              umd: "@vue/composition-api",
            }
          }, { 
            "vue2-datepicker": {
              commonjs: "vue2-datepicker",
              commonjs2: "vue2-datepicker",
              amd: "vue2-datepicker",
              umd: "vue2-datepicker",
            }
          }, {  
            "vue": {
              commonjs: "vue",
              commonjs2: "vue",
              amd: "vue",
              umd: "vue",
            }
          }
        ],
      }
    } 
    return {};
  }
};
