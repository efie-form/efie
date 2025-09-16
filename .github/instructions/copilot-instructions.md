# Efie Form - AI Coding Instructions

Efie Form is a framework-agnostic form builder library with visual editor capabilities. Understanding the architecture and patterns below will make you immediately productive in this codebase.

## Architecture Overview

**Monorepo Structure**: pnpm workspaces with 4 core packages:
- `@efie-form/core`: Framework-agnostic types, constants, and business logic
- `@efie-form/builder`: React-based visual form builder (Zustand + Tailwind)
- `@efie-form/react`: React runtime components for rendering forms
- `@efie-form/vue`: Vue runtime components (preview)

**Data Flow**: Schema-driven architecture where forms are JSON configurations that flow from builder → runtime rendering. The `FormField` union type in `packages/core/lib/types/form-field.type.ts` defines all possible field configurations.

## Critical Development Patterns

### Field Type System
Each field type requires updates across multiple files. Follow the guide in `.github/instructions/adding-field-types.instructions.md` when adding new fields. Key files:
- `packages/core/lib/constants/field-type.ts` - Field type constants
- `packages/core/lib/types/form-field.type.ts` - TypeScript interfaces
- `packages/builder/src/lib/get-default-field.ts` - Default field factories
- `packages/builder/src/layouts/main-section/field-contents/fields/` - Field rendering components

### Zustand State Management (Builder)
Use direct subscription with selectors for performance:
```tsx
const fieldProperty = useSchemaStore(
  useCallback((state) => state.getFieldProperty(fieldId, type), [fieldId, type])
);
```
**Avoid** manual `useEffect` subscriptions. State is split between `useSchemaStore` (form data) and `useSettingsStore` (editor settings).

### Component Patterns
- **Preferred**: Each component handles its own logic internally
- **Avoid**: Helper functions that build complex data structures for rendering
- **Rule**: Max one level of ternary operators (`a ? b : c`); use switch statements for complex conditions

## Development Workflow

### Essential Commands
```bash
# Development with hot reload across packages
pnpm watch

# Type checking (required before commits)
pnpm type-check:packages

# Testing with coverage
pnpm test:coverage

# Lint and format (uses Biome, not Prettier)
pnpm lint:fix
```

### Testing Approach
- Jest + React Testing Library for builder components
- Tests in `__tests__` directories alongside source
- Mock external dependencies in `src/__mocks__/`
- Focus on state mutations and component behavior, not styling

### Build System
- Individual packages use `tsup` for bundling
- Nx for task orchestration and caching
- Watch mode handles cross-package dependencies automatically

## Package-Specific Knowledge

### @efie-form/core
- Pure TypeScript, no framework dependencies
- Exports field types, property definitions, and utility functions
- `PropertyType` enum defines all configurable field properties
- Default schema in `lib/default-schema.ts`

### @efie-form/builder
- Three-panel layout: LeftBar (fields) | MainSection (canvas) | RightBar (settings)
- Zustand stores split by concern: schema manipulation vs. editor state
- Field components in `layouts/main-section/field-contents/fields/` handle inline editing
- Custom `cn()` utility for conditional Tailwind classes with `tailwind-merge`

### Styling Conventions
- Tailwind CSS with custom color tokens (`primary-*`, `success-*`, `neutral-*`, `danger-*`)
- Typography classes: `typography-body1`, `typography-body2`, etc.
- Use `cn()` utility from `@/lib/utils` for conditional styling
- Component-specific styles over global CSS

## Integration Points

- **Framework Adapters**: Runtime packages provide framework-specific components that consume core schemas
- **IFrame Embedding**: Builder served via iframe for cross-framework integration
- **Schema Export/Import**: JSON serialization enables headless rendering in any environment
- **Property System**: Extensible property definitions allow custom field configurations


