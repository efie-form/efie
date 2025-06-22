/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/lib/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(color-convert)/)',
  ],
  testMatch: [
    '<rootDir>/lib/**/*.{test,spec}.{js,ts}',
  ],
  collectCoverageFrom: [
    'lib/**/*.{js,ts}',
    '!lib/**/*.d.ts',
    '!lib/index.ts',
    '!lib/**/__tests__/**',
    '!lib/**/*.test.{js,ts}',
    '!lib/**/*.spec.{js,ts}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        verbatimModuleSyntax: false,
      },
    }],
  },
};

export default jestConfig;
