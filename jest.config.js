const {defaults} = require('jest-config');

module.exports = {
  testEnvironment: "jsdom",
  "transform": {
    "^[^.]+.vue$": "@vue/vue2-jest",
    "\\.m?js$": "babel-jest"
  },
  "moduleFileExtensions": [...defaults.moduleFileExtensions, 'vue'],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/config/CSSStub.js",
  },
  "setupFiles": [
    "<rootDir>/tests/setup.js",
  ],
}
