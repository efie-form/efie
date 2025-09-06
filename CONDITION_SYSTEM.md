# Efie Form Condition System

The Efie Form library now includes a powerful, framework-agnostic condition system that allows you to create dynamic forms with field visibility, validation requirements, and custom actions based on user input.

## Architecture

The condition system consists of two main parts:

1. **@efie-form/core**: Framework-agnostic rule engine
2. **@efie-form/react**: React-specific hooks and providers

### Core Components

#### RuleEngine (`@efie-form/core`)

The core rule engine evaluates form conditions and returns actions to execute. It's designed to be framework-agnostic and can be used with React, Vue, or any other framework.

```typescript
import { RuleEngine } from '@efie-form/core';

const engine = new RuleEngine(schema);
const actions = engine.onChange('fieldId', 'newValue', context);
```

#### Condition Class (`@efie-form/core`)

A higher-level interface that wraps the RuleEngine for easier use:

```typescript
import { Condition } from '@efie-form/core';

const condition = new Condition({ schema });
const actions = condition.onChange('fieldId', 'newValue', formData, fieldStates);
```

## React Integration

### Setup

```tsx
import { ReactForm, ConditionProvider, useCondition } from '@efie-form/react';

function MyForm() {
  return (
    <ReactForm 
      schema={schemaWithRules}
      enableConditions={true}
      env={{ userRole: 'admin' }}
      // ... field components
    />
  );
}
```

### Hooks

#### useCondition

The main hook for managing form conditions:

```tsx
const conditionState = useCondition({
  schema,
  initialFieldStates,
  env: { userRole: 'admin' }
});

// Check field states
const isHidden = conditionState.isFieldHidden('fieldId');
const isRequired = conditionState.isFieldRequired('fieldId');
const customActions = conditionState.getCustomActions();
```

#### useFieldCondition

A helper hook for individual field providers:

```tsx
const { isVisible, isRequired, createChangeHandler } = useFieldCondition(field.id);

const handleChange = createChangeHandler(originalOnChange);
```

### Field Provider Integration

Field providers automatically handle condition logic when the `ConditionProvider` is available:

```tsx
function ShortTextProvider({ field, Component, value, onChange }) {
  const { isVisible, isRequired, createChangeHandler } = useFieldCondition(field.id);
  
  if (!isVisible) return null;
  
  const handleChange = createChangeHandler(onChange);
  
  return createElement(Component, {
    value,
    onChange: handleChange,
    required: isRequired,
    // ... other props
  });
}
```

## Schema Definition

### Rules Structure

```typescript
interface FormSchema {
  form: {
    fields: FormField[];
    rules?: Rule[];
    actionDefinitions?: CustomActionDefinition[];
  };
}

interface Rule {
  id: string;
  enabled?: boolean;
  triggers?: ('onChange' | 'onPageEnter' | 'onSubmit')[];
  when: ConditionTree;
  actions: Action[];
}
```

### Conditions

Conditions are defined using a tree structure that supports both `all` (AND) and `any` (OR) logic:

```typescript
interface ConditionTree {
  logic: 'all' | 'any';
  children: Array<ConditionTree | ConditionNode>;
}

interface ConditionNode {
  left?: Operand;
  operator?: Operator;
  right?: Operand | Operand[];
  options?: ConditionOptions;
}
```

### Operands

Various operand types are supported:

```typescript
type Operand = 
  | { kind: 'fieldValue'; field: string }
  | { kind: 'fieldState'; field: string; state: 'touched' | 'dirty' | 'valid' | 'visible' | 'enabled' | 'required' }
  | { kind: 'fieldLength'; field: string }
  | { kind: 'constant'; value: JsonPrimitive }
  | { kind: 'now' }
  | { kind: 'today' }
  | { kind: 'env'; name: string };
```

### Operators

Comprehensive set of operators for different data types:

- **Shared**: `is_filled`, `is_empty`, `is_valid`, `is_invalid`
- **String**: `equal`, `not_equal`, `contains`, `starts_with`, `ends_with`, etc.
- **Number**: `greater_than`, `less_than`, `between`, etc.
- **Date**: `before`, `after`, `on_or_before`, `on_or_after`
- **Boolean**: `is_true`, `is_false`
- **Options**: `in`, `not_in`

### Actions

Built-in actions include:

```typescript
type Action = 
  | ShowFieldsAction    // { type: 'show_fields', fields: string[] }
  | HideFieldsAction    // { type: 'hide_fields', fields: string[] }
  | SetRequiredAction   // { type: 'set_required', fields: string[], value: boolean }
  | SetOptionalAction   // { type: 'set_optional', fields: string[], value: boolean }
  | CustomAction;       // { type: 'custom', name: string, input?: JsonValue }
```

## Example Schema

```typescript
const conditionalSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'has_experience',
        type: 'single_choice',
        props: [
          { type: 'label', value: 'Do you have experience?' },
          { type: 'options', value: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]}
        ]
      },
      {
        id: 'experience_years',
        type: 'number',
        props: [
          { type: 'label', value: 'Years of experience?' }
        ]
      }
    ],
    rules: [
      {
        id: 'show_experience_years',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [{
            left: { kind: 'fieldValue', field: 'has_experience' },
            operator: 'equal',
            right: { kind: 'constant', value: 'yes' }
          }]
        },
        actions: [{
          id: 'show_years_action',
          type: 'show_fields',
          fields: ['experience_years']
        }]
      }
    ]
  }
};
```

## Custom Actions

Define custom actions for extensibility:

```typescript
const schema: FormSchema = {
  form: {
    // ... fields
    actionDefinitions: [
      {
        name: 'showPopup',
        title: 'Show Popup Message',
        description: 'Display a popup with custom message',
        inputSpec: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            type: { type: 'string', enum: ['info', 'warning', 'error'] }
          }
        }
      }
    ],
    rules: [
      {
        id: 'popup_rule',
        when: { /* condition */ },
        actions: [{
          id: 'popup_action',
          type: 'custom',
          name: 'showPopup',
          input: {
            message: 'Please review your answers',
            type: 'warning'
          }
        }]
      }
    ]
  }
};
```

Handle custom actions in your application:

```tsx
function MyForm() {
  const conditionState = useCondition({ schema });
  
  useEffect(() => {
    const customActions = conditionState.getCustomActions();
    customActions.forEach(action => {
      if (action.name === 'showPopup') {
        const { message, type } = action.input;
        showPopup(message, type);
      }
    });
  }, [conditionState.getCustomActions()]);
  
  // ... rest of component
}
```

## Performance Considerations

- Rules are cached and only re-evaluated when relevant fields change
- Field maps are cached for fast lookups
- Only fields referenced in rules trigger condition evaluation
- Use specific triggers (`onChange`, `onPageEnter`, `onSubmit`) to limit when rules run

## Framework Extensions

The core engine is designed to be framework-agnostic. To create Vue or other framework integrations:

1. Create framework-specific hooks/composables
2. Implement context providers for state management
3. Update field components to use condition states
4. Handle custom actions in framework-specific ways

## Migration

The condition system is designed to be backward compatible. Existing forms without rules will continue to work normally. To enable conditions:

1. Add rules to your schema
2. Wrap your form with condition providers
3. Update field components if needed
4. Handle custom actions

The `enableConditions` prop allows you to toggle the feature on/off as needed.
