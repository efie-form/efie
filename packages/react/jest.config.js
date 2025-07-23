/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/lib/__tests__/setup-tests.ts'],
  moduleNameMapper: {
    '^@efie-form/core$': '<rootDir>/../core/lib',
  },
  testMatch: ['<rootDir>/lib/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    '!lib/**/*.d.ts',
    '!lib/**/__tests__/**',
    '!lib/**/*.test.{js,jsx,ts,tsx}',
    '!lib/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};

export default jestConfig;
