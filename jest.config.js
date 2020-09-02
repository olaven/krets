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
  collectCoverageFrom: ["src/**/*"],
  coverageThreshold: {
    global: { //TODO: way to low. should be at 50, and further increased once project is more stable 
      branches: 30,
      functions: 30,
      lines: 50,
      statements: 50
    }
  },
};