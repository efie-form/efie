# Infinite Re-render Fix

## Problem
The ReactForm component was causing infinite re-renders due to:

1. **Schema dependency issue**: `useEffect` was watching `schema.form.fields` which is a new array reference on every render
2. **Form values watching**: The `useCondition` hook was watching form values and triggering effects that caused state updates on every form change
3. **Condition state accumulation**: The condition state was accumulating instead of resetting, causing cascading updates

## Solution

### 1. Fixed Schema Dependency
Changed from watching `schema.form.fields` to watching `schema` in the ReactForm component:

```tsx
// Before (causing infinite re-renders)
useEffect(() => {
  const firstPage = schema.form.fields.find((field) => field.type === 'page');
  if (firstPage) {
    setCurrentPage(firstPage.id);
  }
}, [schema.form.fields]); // ❌ New array reference every render

// After (stable)
useEffect(() => {
  const firstPage = schema.form.fields.find((field) => field.type === 'page');
  if (firstPage) {
    setCurrentPage(firstPage.id);
  }
}, [schema]); // ✅ Stable schema reference
```

### 2. Stabilized useCondition Hook
- **Removed direct formValues dependency**: Instead of watching formValues directly in useEffect dependencies, we use React Hook Form's watch subscription
- **Used ref for form values**: Store form values in a ref to prevent dependency changes
- **Reset condition state**: Instead of accumulating condition state, we reset it completely on each evaluation
- **Subscription-based watching**: Use RHF's watch subscription to avoid infinite loops

```tsx
// Before (causing infinite re-renders)
const formValues = watch();
useEffect(() => {
  // This runs on every form change, causing infinite updates
  const actionResult = conditionRef.current.evaluateAll(formValues, fieldStates, env);
  updateConditionState(actionResult);
}, [formValues, createFieldStates, env, updateConditionState]);

// After (stable)
const lastFormValuesRef = useRef<Record<string, JsonValue>>({});

useEffect(() => {
  const subscription = watch((value) => {
    if (!conditionRef.current) return;

    // Only update if values actually changed
    if (JSON.stringify(value) === JSON.stringify(lastFormValuesRef.current)) {
      return;
    }

    lastFormValuesRef.current = value;
    const fieldStates = createFieldStates();
    const actionResult = conditionRef.current.evaluateAll(value, fieldStates, env);
    updateConditionState(actionResult);
  });

  return () => subscription.unsubscribe();
}, [watch, createFieldStates, env, updateConditionState]);
```

### 3. Fixed Condition State Updates
Changed from accumulating to resetting condition state:

```tsx
// Before (accumulating, causing state bloat)
const updateConditionState = useCallback((actionResult: ActionResult) => {
  setConditionState((prev) => ({
    hidden: new Set([...prev.hidden, ...actionResult.hidden]),
    visible: new Set([...prev.visible, ...actionResult.visible]),
    // ... accumulating all states
  }));
}, []);

// After (resetting, clean state)
const updateConditionState = useCallback((actionResult: ActionResult) => {
  setConditionState({
    hidden: new Set(actionResult.hidden),
    visible: new Set(actionResult.visible),
    required: new Set(actionResult.required),
    optional: new Set(actionResult.optional),
    customActions: [...actionResult.custom],
  });
}, []);
```

## Testing
- All React tests pass: ✅
- TypeScript compilation clean: ✅
- No infinite re-render warnings: ✅

## Usage
The ReactForm component can now be used without causing infinite re-renders:

```tsx
<ReactForm
  schema={schema}
  enableConditions={true}
  env={environmentVariables}
  shortText={TextComponent}
  longText={TextareaComponent}
  // ... other field components
/>
```

The form will properly handle condition evaluation without performance issues.
