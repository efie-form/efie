# CI/CD Setup

This document describes the Continuous Integration and Continuous Deployment setup for the Efie Form Builder project.

## Overview

The project uses GitHub Actions for automated testing, linting, and building. The CI/CD pipeline is designed to ensure code quality and prevent regressions.

## Workflows

### 1. Test Workflow (`.github/workflows/test-simple.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**What it does:**
- Sets up Node.js 20
- Installs dependencies using pnpm
- Runs all tests
- Generates coverage reports
- Uploads coverage to Codecov (optional)

**Commands used:**
- `pnpm test` - Runs Jest tests for the builder package
- `pnpm test:coverage` - Runs tests with coverage reporting

### 2. Comprehensive CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**What it does:**
- **Lint Job**: Runs ESLint on all code
- **Test Job**: Runs tests on Node.js 18 and 20 (matrix build)
- **Build Job**: Builds all packages

**Features:**
- Dependency caching for faster builds
- Matrix builds for multiple Node.js versions
- Sequential job execution (lint → test → build)

### 3. Advanced Test Workflow (`.github/workflows/test.yml`)

**Features:**
- Matrix builds for Node.js 18 and 20
- Coverage reporting with Codecov integration
- Dependency caching

### 4. Existing Lint Workflow (`.github/workflows/lint.yml`)

**Triggers:**
- Pull requests to `main` branch

**What it does:**
- Runs ESLint on all code changes

## Package Scripts

The following npm scripts are available in the root `package.json`:

```json
{
  "scripts": {
    "test": "nx test @efie-form/builder",
    "test:builder": "nx test @efie-form/builder", 
    "test:coverage": "nx test @efie-form/builder --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Test Configuration

### Jest Configuration (`packages/builder/jest.config.js`)

- **Test Environment**: Node.js
- **Test Files**: `src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}`
- **Coverage**: HTML, LCOV, and text reports
- **Coverage Directory**: `packages/builder/coverage/`
- **Module Mapping**: `@/*` maps to `src/*`

### Coverage Settings

- **Reports**: Text, LCOV, HTML
- **Thresholds**: Currently disabled for CI (can be enabled later)
- **Exclusions**: Test files, type definitions, and index files

## Current Test Status

- **Total Test Suites**: 4
- **Total Tests**: 48 (all passing)
- **Coverage**: ~15.66% (focused on state management)
- **Test Files**:
  - `field-actions.test.ts`
  - `history-actions.test.ts` 
  - `property-actions.test.ts`
  - `schema-state.test.ts`

## Running Tests Locally

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
cd packages/builder && pnpm test:watch

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Codecov Integration

The project is set up to upload coverage reports to Codecov. To enable this:

1. Add your repository to Codecov
2. Add the `CODECOV_TOKEN` secret to your GitHub repository settings
3. The workflow will automatically upload coverage reports

## Future Improvements

1. **Increase Test Coverage**: Add more unit tests for components and utilities
2. **Integration Tests**: Add tests for component interactions
3. **E2E Tests**: Consider adding Playwright or Cypress for end-to-end testing
4. **Performance Tests**: Add performance benchmarks
5. **Visual Regression Tests**: Consider adding visual testing tools
6. **Deployment**: Add deployment workflows for staging and production

## Troubleshooting

### Common Issues

1. **Tests hanging**: This can happen with NX when running `nx run-many`. Use specific package tests instead.
2. **Coverage threshold failures**: Adjust thresholds in `jest.config.js` or disable temporarily.
3. **TypeScript errors in coverage**: Some files may have type issues that only surface during coverage collection.

### Debugging

```bash
# Run tests with verbose output
cd packages/builder && npx jest --verbose

# Run specific test file
cd packages/builder && npx jest src/__tests__/field-actions.test.ts

# Debug test with Node.js debugger
cd packages/builder && node --inspect-brk node_modules/.bin/jest --runInBand
```
