# Rule Engine Implementation Guide

## Overview

The Rule Engine provides efficient evaluation of form rules for dynamic field behavior like visibility and required states. It's designed for high performance with memoization and dependency tracking.

## Core Components

### 1. RuleEngine (Core Package)

The main rule evaluation engine located in `@efie-form/core/engine/rule-engine`.

**Key Features:**
- Dependency tracking: Only re-evaluates rules when relevant fields change
- Memoization: Caches rule results until dependencies change
- Efficient evaluation: Handles complex condition trees and operator logic
- Type-safe: Full TypeScript support with proper type definitions

### 2. React Hooks (React Package)

#### `useRuleEngine(options)`
Primary hook for rule engine integration.

```typescript
import { useRuleEngine } from '@efie-form/react';

const ruleEngine = useRuleEngine({
  schema: formSchema,
  fieldValues: currentValues,
  fieldStates: fieldStates, // optional
  environmentVariables: envVars, // optional
  debounceMs: 100 // optional, default 100ms
});
```

#### `useFieldRuleState(fieldId)`
Simplified hook for field-specific rule state.

```typescript
import { useFieldRuleState } from '@efie-form/react';

const { required, visible, hidden } = useFieldRuleState('field-id');
```

### 3. React Providers

#### `FormRuleProvider`
Context provider that manages rule engine state for an entire form.

```tsx
import { FormRuleProvider } from '@efie-form/react';

<FormRuleProvider
  schema={schema}
  fieldValues={values}
  fieldStates={states}
  environmentVariables={env}
>
  {/* Your form components */}
</FormRuleProvider>
```

#### `FormRenderer`
Complete form renderer with integrated rule engine.

```tsx
import { FormRenderer } from '@efie-form/react';

<FormRenderer
  schema={schema}
  components={fieldComponents}
  fieldValues={values}
  onFieldChange={handleFieldChange}
  fieldStates={states}
  environmentVariables={env}
/>
```

## Usage Examples

### Basic Rule Integration

```tsx
import React, { useState } from 'react';
import { FormRuleProvider, useFieldRuleState } from '@efie-form/react';
import type { FormSchema } from '@efie-form/core';

// Custom field component that respects rules
function MyTextField({ fieldId, value, onChange, label }) {
  const { required, visible } = useFieldRuleState(fieldId);
  
  if (!visible) return null;
  
  return (
    <div>
      <label>
        {label} {required && '*'}
      </label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

// Form with rule engine
function MyForm({ schema }: { schema: FormSchema }) {
  const [values, setValues] = useState({});
  
  const handleChange = (fieldId: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };
  
  return (
    <FormRuleProvider
      schema={schema}
      fieldValues={values}
    >
      {schema.form.fields.map(field => (
        <MyTextField
          key={field.id}
          fieldId={field.id}
          value={values[field.id] || ''}
          onChange={(value) => handleChange(field.id, value)}
          label={getFieldLabel(field)}
        />
      ))}
    </FormRuleProvider>
  );
}
```

### Advanced Integration with Field Providers

```tsx
import React, { useState } from 'react';
import { 
  FormRuleProvider, 
  useFormRuleContext,
  ShortTextProvider 
} from '@efie-form/react';

// Enhanced field provider that uses rule engine
function EnhancedShortTextProvider({ field, Component, value, onChange }) {
  const ruleEngine = useFormRuleContext();
  
  return (
    <ShortTextProvider
      field={field}
      Component={Component}
      value={value}
      onChange={onChange}
      ruleEngine={ruleEngine}
    />
  );
}
```

### Direct Rule Engine Usage

```tsx
import React, { useState, useEffect } from 'react';
import { useRuleEngine } from '@efie-form/react';

function FormWithDirectRuleEngine({ schema }) {
  const [values, setValues] = useState({});
  const [fieldStates, setFieldStates] = useState({});
  
  const ruleEngine = useRuleEngine({
    schema,
    fieldValues: values,
    fieldStates,
    environmentVariables: { userId: '123' }
  });
  
  // React to rule changes
  useEffect(() => {
    console.log('Field updates:', ruleEngine.fieldUpdates);
    console.log('Custom actions:', ruleEngine.customActions);
  }, [ruleEngine.fieldUpdates, ruleEngine.customActions]);
  
  return (
    <div>
      {/* Your form rendering logic */}
      {schema.form.fields.map(field => {
        const isVisible = ruleEngine.getFieldVisible(field.id);
        const isRequired = ruleEngine.getFieldRequired(field.id);
        
        if (!isVisible) return null;
        
        return (
          <FieldComponent
            key={field.id}
            field={field}
            required={isRequired}
            value={values[field.id]}
            onChange={(value) => setValues(prev => ({ ...prev, [field.id]: value }))}
          />
        );
      })}
    </div>
  );
}
```

## Performance Optimization

### Dependency Tracking
The rule engine automatically tracks which fields each rule depends on. When a field value changes, only rules that reference that field are re-evaluated.

### Debouncing
Rule evaluation is debounced by default (100ms) to prevent excessive re-evaluation during rapid user input.

### Memoization
Rule results are cached until their dependencies change, ensuring consistent performance even with complex rule sets.

### Best Practices

1. **Use FormRuleProvider**: Wrap your form in `FormRuleProvider` for automatic rule management
2. **Batch updates**: When updating multiple field values, batch them in a single state update
3. **Optimize field states**: Only track field states that are actually used in rules
4. **Environment variables**: Use environment variables for dynamic values that don't change frequently

## Rule Syntax Examples

### Simple Visibility Rule
```json
{
  "id": "show-address",
  "enabled": true,
  "when": {
    "logic": "all",
    "children": [
      {
        "left": { "kind": "fieldValue", "field": "needs-shipping" },
        "operator": "equal",
        "right": { "kind": "constant", "value": true }
      }
    ]
  },
  "actions": [
    {
      "id": "action-1",
      "type": "show_fields",
      "fields": ["shipping-address"]
    }
  ]
}
```

### Complex Conditional Logic
```json
{
  "id": "complex-validation",
  "enabled": true,
  "when": {
    "logic": "any",
    "children": [
      {
        "logic": "all",
        "children": [
          {
            "left": { "kind": "fieldValue", "field": "age" },
            "operator": "greater_than_or_equal",
            "right": { "kind": "constant", "value": 18 }
          },
          {
            "left": { "kind": "fieldValue", "field": "country" },
            "operator": "equal",
            "right": { "kind": "constant", "value": "US" }
          }
        ]
      },
      {
        "left": { "kind": "fieldValue", "field": "guardian-consent" },
        "operator": "equal",
        "right": { "kind": "constant", "value": true }
      }
    ]
  },
  "actions": [
    {
      "id": "action-2",
      "type": "set_required",
      "fields": ["photo-id"],
      "value": true
    }
  ]
}
```

## Testing

### Unit Testing Rules
```typescript
import { RuleEngine } from '@efie-form/core';

describe('RuleEngine', () => {
  it('should show field when condition is met', () => {
    const engine = new RuleEngine();
    engine.updateSchema(schemaWithRules);
    
    const result = engine.evaluateRules({
      fields: {
        'trigger-field': {
          value: 'trigger-value',
          valid: true,
          visible: true,
          // ... other required properties
        }
      },
      env: {},
      now: new Date(),
      today: new Date()
    });
    
    expect(result.fieldUpdates).toContainEqual({
      fieldId: 'target-field',
      visible: true
    });
  });
});
```

### Integration Testing
```typescript
import { render, fireEvent } from '@testing-library/react';
import { FormRuleProvider } from '@efie-form/react';

test('field visibility changes based on rules', () => {
  const { getByTestId, queryByTestId } = render(
    <FormRuleProvider schema={schema} fieldValues={{}}>
      <TestForm />
    </FormRuleProvider>
  );
  
  // Initially hidden
  expect(queryByTestId('conditional-field')).not.toBeInTheDocument();
  
  // Trigger condition
  fireEvent.change(getByTestId('trigger-field'), { target: { value: 'show' } });
  
  // Should now be visible
  expect(getByTestId('conditional-field')).toBeInTheDocument();
});
```

## Migration Guide

### From Basic Field Providers
1. Wrap your form in `FormRuleProvider`
2. Update field providers to accept `ruleEngine` prop
3. Use `useFieldRuleState` for field-specific rule state

### From Custom Rule Logic
1. Replace custom visibility/required logic with rule engine
2. Define rules in schema format
3. Use provided hooks instead of manual state management

## Troubleshooting

### Common Issues

**Rules not triggering:**
- Check field dependencies are correctly identified
- Verify rule syntax matches expected format
- Ensure field values are properly typed

**Performance issues:**
- Reduce debounce time if rules feel sluggish
- Check for circular dependencies in rules
- Optimize field state tracking

**Type errors:**
- Ensure JsonValue compatibility for field values
- Use proper type assertions for File objects
- Check rule operand types match operators
