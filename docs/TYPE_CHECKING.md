# TypeScript Type Checking Scripts

This document describes the TypeScript type checking scripts available in the Efie Form monorepo.

## Available Scripts

### Root Level Scripts

- `pnpm type-check` - Runs TypeScript type checking on the entire workspace from the root tsconfig.json
- `pnpm type-check:watch` - Runs TypeScript type checking in watch mode on the entire workspace
- `pnpm type-check:packages` - Runs type checking only in the publishable packages (excludes iframe and efie-form meta package)
- `pnpm type-check:packages:watch` - Runs type checking in watch mode only in the publishable packages

### Package Level Scripts

Each package has its own type checking scripts:

#### Core Package (`@efie-form/core`)
- `pnpm --filter @efie-form/core run type-check`
- `pnpm --filter @efie-form/core run type-check:watch`

#### Builder Package (`@efie-form/builder`)
- `pnpm --filter @efie-form/builder run type-check`
- `pnpm --filter @efie-form/builder run type-check:watch`

#### React Package (`@efie-form/react`)
- `pnpm --filter @efie-form/react run type-check`
- `pnpm --filter @efie-form/react run type-check:watch`
- `pnpm --filter @efie-form/react run type-check:react18` - Type check with React 18 types
- `pnpm --filter @efie-form/react run type-check:react19` - Type check with React 19 types
- `pnpm --filter @efie-form/react run type-check:all` - Type check with both React 18 and 19

#### Iframe Package (`@efie-form/iframe`)
- `pnpm --filter @efie-form/iframe run type-check`
- `pnpm --filter @efie-form/iframe run type-check:watch`

## Usage Examples

### Check for TypeScript errors in all packages
```bash
pnpm type-check:packages
```

### Check for TypeScript errors in a specific package
```bash
pnpm --filter @efie-form/core run type-check
```

### Watch for TypeScript errors during development
```bash
pnpm type-check:watch
```

### Check React compatibility
```bash
pnpm --filter @efie-form/react run type-check:all
```

## What These Scripts Do

All type-check scripts use the `--noEmit` flag, which means:
- TypeScript will check for type errors without generating output files
- Faster execution since no files are written to disk
- Suitable for CI/CD pipelines and development workflow
- Catches compilation errors that would prevent successful builds

## CI/CD Integration

These scripts are ideal for continuous integration:

```yaml
# Example GitHub Actions step
- name: Type Check
  run: pnpm type-check:packages
```

## Development Workflow

1. **During active development**: Use watch mode scripts to get real-time feedback
   ```bash
   pnpm type-check:watch
   ```

2. **Before committing**: Run full type check to ensure no errors
   ```bash
   pnpm type-check:packages
   ```

3. **For specific package work**: Focus on individual packages
   ```bash
   pnpm --filter @efie-form/core run type-check:watch
   ```

## Notes

- The root level `type-check` script checks the entire workspace including demo apps, which may have more errors during development
- Package level scripts are more focused and typically have fewer errors
- Watch mode scripts will continue running until manually stopped (Ctrl+C)
- React package has special scripts for testing compatibility with different React versions
