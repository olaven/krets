require("dotenv").config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "./__tests__/api/apiTestUtils.ts",
    "./__tests__/frontend/frontendTestUtils.tsx",
    "./__tests__/database/databaseTestUtils.tsx",
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
};