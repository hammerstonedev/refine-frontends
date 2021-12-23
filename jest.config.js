module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": ["babel-jest"],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/config/CSSStub.js",
  },
  setupFiles: [
    "<rootDir>/tests/setup.js",
  ],
}
