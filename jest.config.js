require("dotenv").config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "./tests/api/apiTestUtils.ts",
    "./tests/frontend/frontendTestUtils.tsx",
    "./tests/database/databaseTestUtils.ts",
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: "src/**/*",
  coverageThreshold: {
    global: { //TODO: should be increased once project is more stable 
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
};