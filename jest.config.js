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
};