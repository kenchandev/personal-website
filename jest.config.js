module.exports = {
  displayName: "client",
  moduleFileExtensions: ["js"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
