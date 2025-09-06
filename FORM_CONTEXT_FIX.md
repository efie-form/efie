# Form Context Fix

## Issue
The error "Cannot destructure property 'watch' of '(0, useFormContext)(...) as it is null" was occurring because the `useCondition` hook was being called before the React Hook Form `FormProvider` was available in the component tree.

## Root Cause
In the original implementation:

```tsx
function ReactForm({ schema, enableConditions = true, env, ...props }: ReactFormProps) {
  // ❌ useCondition was called here, BEFORE FormProvider was rendered
  const conditionState = useCondition({ schema, env });

  return (
    <FormProvider {...methods}>
      {/* FormProvider wraps content but useCondition already ran */}
    </FormProvider>
  );
}
```

The `useCondition` hook internally calls `useFormContext()` which expects to be inside a `FormProvider` context, but it was being called during the parent component's render, before the `FormProvider` was mounted.

## Solution
Restructured the component to ensure `useCondition` is called within the `FormProvider` context:

```tsx
function FormContent({ schema, enableConditions, env, currentPage, setCurrentPage, ...props }) {
  // ✅ useCondition is now called INSIDE FormProvider context
  const conditionState = useCondition({ schema, env });
  
  // ... rest of component
}

function ReactForm({ schema, enableConditions = true, env, ...props }: ReactFormProps) {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <FormContent 
        schema={schema} 
        enableConditions={enableConditions} 
        env={env} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        {...props} 
      />
    </FormProvider>
  );
}
```

## Key Changes
1. **Separated components**: Split `ReactForm` into two components - `ReactForm` (provider wrapper) and `FormContent` (consumer)
2. **Proper hook placement**: `useCondition` is now called inside `FormContent`, which is rendered within `FormProvider`
3. **Resolved naming conflict**: Renamed local state `page`/`setPage` to `currentPage`/`setCurrentPage` to avoid conflict with the `page` prop from `FieldPropsMap`

## Result
- ✅ Form context is properly available when `useCondition` runs
- ✅ Condition system works correctly with React Hook Form
- ✅ All form providers can access form context for field conditions
- ✅ Tests pass and TypeScript compiles without errors

This fix ensures that all condition-related functionality works properly within the React Hook Form ecosystem.
