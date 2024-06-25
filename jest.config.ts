/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**/*.ts"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  setupFiles: ["<rootDir>/testSetup.js"],
};

export default config;
