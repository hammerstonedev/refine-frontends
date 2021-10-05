module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/config/CSSStub.js",
  },
}
