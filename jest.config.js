module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  setupFilesAfterEnv: ["./jest.setup.js"]
};
