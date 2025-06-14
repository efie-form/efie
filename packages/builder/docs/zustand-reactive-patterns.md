# Zustand Reactive Patterns Guide

This guide explains how to use Zustand's reactive features effectively in the form builder, addressing the question: "Does Zustand have features like useContext or global useState?"

## Answer: Yes! Zustand provides powerful reactive capabilities

Zustand automatically triggers re-renders when subscribed state changes, similar to `useContext` or global `useState`. Here are the key patterns:

## 1. Direct Subscription with Selectors (Recommended)

```tsx
// ✅ GOOD: Direct subscription - automatically re-renders when property changes
const fieldProperty = useSchemaStore(
  useCallback(
    (state) => state.getFieldProperty(fieldId, type),
    [fieldId, type]
  )
);
```

**Benefits:**
- Automatic re-renders when the specific property changes
- Optimized performance (only re-renders when selected data changes)
- No manual effect management needed

## 2. Subscribe to Specific Parts of State

```tsx
// Subscribe to a specific field
const field = useSchemaStore(
  useCallback(
    (state) => state.getFieldById(fieldId),
    [fieldId]
  )
);

// Subscribe to multiple store values
const { updateFieldProperty, schema } = useSchemaStore((state) => ({
  updateFieldProperty: state.updateFieldProperty,
  schema: state.schema,
}));
```

## 3. Custom Hooks for Complex Reactive Logic

See `useFieldProperty.ts` for a comprehensive example that combines:
- Direct subscription
- Local state for immediate UI feedback
- Debounced updates
- Automatic synchronization

```tsx
const {
  localValue,
  updateValue,
  exists,
} = useFieldProperty(fieldId, propertyType, {
  defaultValue: '',
  debounceMs: 300,
});
```

## 4. Subscription Patterns Comparison

### ❌ AVOID: Manual effect-based subscriptions
```tsx
// Don't do this - unnecessary complexity
const { getFieldProperty } = useSchemaStore();
const [value, setValue] = useState('');

useEffect(() => {
  const property = getFieldProperty(fieldId, type);
  setValue(property?.value || '');
}, [getFieldProperty, fieldId, type]); // This doesn't work as expected
```

### ✅ PREFER: Direct subscriptions
```tsx
// Do this instead - automatic reactivity
const fieldProperty = useSchemaStore(
  (state) => state.getFieldProperty(fieldId, type)
);
const value = fieldProperty?.value || '';
```

## 5. Performance Optimization

### Use `useCallback` for selectors
```tsx
// ✅ Optimized - selector is memoized
const fieldProperty = useSchemaStore(
  useCallback(
    (state) => state.getFieldProperty(fieldId, type),
    [fieldId, type]
  )
);
```

### Avoid subscribing to large objects
```tsx
// ❌ Re-renders on any schema change
const schema = useSchemaStore((state) => state.schema);

// ✅ Only re-renders when specific field changes
const field = useSchemaStore((state) => state.getFieldById(fieldId));
```

## 6. Common Patterns in the Codebase

### Pattern 1: Property Management
```tsx
// From useFieldLabel.ts
export function useFieldLabel(field: FormField) {
  const { updateFieldProps } = useSchemaStore();
  const labelProp = getFieldProp(field, PropertyType.LABEL);
  
  const [localLabel, setLocalLabel] = useState(labelProp?.value || '');
  // ... rest of the logic
}
```

### Pattern 2: Schema Watching
```tsx
// From useWatchSchema.ts
export default function useWatchSchema(callback: (schema: FormSchema) => void) {
  const { schema, currentHistoryIndex } = useSchemaStore();
  
  useEffect(() => {
    callback(schema);
  }, [currentHistoryIndex]); // Triggers on history changes
}
```

### Pattern 3: Settings Management
```tsx
// From settings.state.ts
const { selectedFieldId, setSelectedFieldId } = useSettingsStore();
```

## 7. Best Practices

1. **Use selectors for specific data**: Subscribe only to what you need
2. **Memoize selectors**: Use `useCallback` to prevent unnecessary re-renders
3. **Combine local state for UI responsiveness**: Use local state for immediate feedback, sync with store
4. **Debounce store updates**: Prevent excessive updates during user input
5. **Use custom hooks**: Encapsulate complex reactive logic in reusable hooks

## 8. Migration Guide

If you have components using manual subscriptions, migrate them:

### Before (Manual)
```tsx
const { getFieldProperty } = useSchemaStore();
const fieldProperty = getFieldProperty(fieldId, type);
const [value, setValue] = useState(getValue(fieldProperty));

useEffect(() => {
  console.log(value);
}, [fieldProperty?.value]); // This doesn't trigger on store changes
```

### After (Reactive)
```tsx
const fieldProperty = useSchemaStore(
  useCallback(
    (state) => state.getFieldProperty(fieldId, type),
    [fieldId, type]
  )
);
const [localValue, setLocalValue] = useState(getValue(fieldProperty));

// Automatically syncs when store changes
const currentValue = getValue(fieldProperty);
if (localValue !== currentValue) {
  setLocalValue(currentValue);
}
```

## 9. Advanced Patterns

### Conditional Subscriptions
```tsx
const fieldProperty = useSchemaStore(
  useCallback(
    (state) => {
      if (!fieldId) return undefined;
      return state.getFieldProperty(fieldId, type);
    },
    [fieldId, type]
  )
);
```

### Multiple Store Subscriptions
```tsx
const formData = useSchemaStore((state) => state.schema);
const selectedField = useSettingsStore((state) => state.selectedFieldId);
```

This reactive approach eliminates the need for manual effect management and provides automatic updates throughout your component tree, similar to React Context but with better performance and simpler APIs.
