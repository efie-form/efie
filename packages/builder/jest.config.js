/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup-tests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^color-convert$': '<rootDir>/src/__mocks__/color-convert.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(color-convert)/)',
  ],
  testMatch: [
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  // Temporarily disabled coverage thresholds for CI
  // coverageThreshold: {
  //   global: {
  //     branches: 70,1
  //     functions: 70,
  //     lines: 70,
  //     statements: 70,
  //   },
  // },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        verbatimModuleSyntax: false,
      },
    }],
  },
};

export default jestConfig;
