module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/config/CSSStub.js",
  },
  "setupFiles": [
    "<rootDir>/tests/setup.js",
  ],
}
