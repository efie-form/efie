# React Version Compatibility

This document explains how the Efie Form React package handles compatibility between React 18 and React 19.

## Context Provider Changes in React 19

React 19 introduced a simplified syntax for Context Providers. Instead of using `Context.Provider`, you can now use the Context directly:

### React 18 (Current)
```jsx
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>
```

### React 19+ (New)
```jsx
<ThemeContext value={theme}>
  {children}
</ThemeContext>
```

## Our Solution

Since Efie Form supports both React 18 and React 19 as peer dependencies, we've implemented a compatibility layer that automatically detects the React version and uses the appropriate syntax.

### Implementation

1. **Version Detection**: `packages/react/lib/utils/react-version.ts`
   - Detects if React version is 19 or higher
   - Uses `React.version` to determine the major version

2. **FormProvider Component**: `packages/react/lib/components/form-provider.tsx`
   - Wrapper component that handles both React versions
   - Uses `createElement` to avoid TypeScript JSX syntax issues
   - Falls back to React 18 syntax by default

3. **Updated Form Component**: `packages/react/lib/form.tsx`
   - Now uses the new `FormProvider` instead of directly using `FormContext.Provider`

### Usage

The API remains the same for consumers:

```jsx
import { ReactForm } from '@efie-form/react';

function App() {
  return <ReactForm schema={mySchema} />;
}
```

Or if using the provider directly:

```jsx
import { FormProvider } from '@efie-form/react';

function CustomForm({ schema, children }) {
  return (
    <FormProvider schema={schema}>
      {children}
    </FormProvider>
  );
}
```

### Benefits

1. **Seamless Compatibility**: Works with both React 18 and 19 without code changes
2. **Future-Proof**: Automatically uses the newer, cleaner syntax when available
3. **Type Safety**: Maintains TypeScript support across versions
4. **Performance**: No runtime overhead in React 18, leverages optimizations in React 19

### Technical Details

- The version detection happens at runtime, not build time
- TypeScript types may lag behind React features, so we use `createElement` with careful type assertions
- The ESLint disable comment is necessary for the React 19 compatibility type assertion
- All existing functionality remains unchanged
