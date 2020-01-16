module.exports = {
  displayName: "client",
  moduleFileExtensions: ["js"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  coverageThreshold: {
    global: {
      statements: 4,
      branches: 7,
      functions: 6,
      lines: 4
    }
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  collectCoverageFrom: ["<rootDir>/assets/scripts/**/*.js"],
  coveragePathIgnorePatterns: ["__fixtures__"]
};
