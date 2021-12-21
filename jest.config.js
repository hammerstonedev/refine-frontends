const {defaults} = require('jest-config');

module.exports = {
  "transform": {
    "^[^.]+.vue$": "rollup-jest",
    "\\.m?js$": "rollup-jest"
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
