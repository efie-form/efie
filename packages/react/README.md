# @efie-form/react

[![Version](https://img.shields.io/npm/v/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)
[![License](https://img.shields.io/npm/l/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)

This package is part of [efie-form](https://npmjs.com/package/efie-form), a form library for building forms with Drag & Drop. The React package provides React components for building and rendering forms created with the Efie Form Builder.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
  - [FormBuilder](#formbuilder)
  - [ReactForm](#reactform)
  - [StatefulForm](#statefulform)
- [Default Components](#default-components)
- [Form State Management](#form-state-management)
- [Examples](#examples)

## Installation

```bash
# With npm
$ npm install @efie-form/react

# With yarn
$ yarn add @efie-form/react

# With pnpm
$ pnpm add @efie-form/react
```

## Components

### FormBuilder

The `FormBuilder` component allows you to embed the form builder in your React application. Users can create and edit forms using a drag-and-drop interface.

```tsx
import { useRef, useState } from 'react';
import { FormBuilder, FormBuilderRef, FormFieldType } from '@efie-form/react';

function App() {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(600);

  const handleSave = () => {
    const schema = formBuilderRef.current?.getSchema();
    console.log(schema);
    // Save schema to your database
  };

  return (
    <div>
      <button onClick={handleSave}>Save Form</button>

      <FormBuilder
        ref={formBuilderRef}
        height={height}
        schema={existingSchema} // Optional: Load an existing schema
        formKeyNonEditable // Optional: Prevent editing form keys
        inputNonReusable // Optional: Prevent reusing input fields
        formInputs={[
          {
            id: 'text_field',
            label: 'Text Field',
            type: FormFieldType.SHORT_TEXT,
          },
          // Add more custom input fields
        ]}
      />
    </div>
  );
}
```

#### FormBuilder Props

| Name                | Description                                           | Type                  | Default |
| ------------------- | ----------------------------------------------------- | --------------------- | ------- |
| `ref`               | Reference to access the form builder methods          | `FormBuilderRef`      | -       |
| `height`            | Height of the form builder in pixels                  | `number`              | -       |
| `schema`            | Initial form schema                                   | `FormSchema`          | -       |
| `formInputs`        | Custom input fields to show in the builder            | `BuilderCustomInput[]`| `[]`    |
| `formKeyNonEditable`| Prevent editing form field keys                       | `boolean`             | `false` |
| `inputNonReusable`  | Prevent reusing input fields                          | `boolean`             | `false` |

#### FormBuilderRef Methods

| Method       | Description                      | Parameters           | Return Type  |
| ------------ | -------------------------------- | -------------------- | ------------ |
| `getSchema`  | Get the current form schema      | -                    | `FormSchema` |

### ReactForm

The `ReactForm` component renders a form based on a form schema. You need to provide your own field components for each field type.

```tsx
import { ReactForm, FormSchema } from '@efie-form/react';
import { MyTextInput, MySelectField } from './my-components';

function App() {
  const schema: FormSchema = {
    // Your form schema
  };

  return (
    <ReactForm
      schema={schema}
      shortText={MyTextInput}
      singleChoice={MySelectField}
      // Provide components for all field types you use
    />
  );
}
```

### StatefulForm

The `StatefulForm` component is an enhanced version of `ReactForm` that includes built-in state management. It also provides default components for all field types, so you don't need to create your own.

```tsx
import { StatefulForm, FormSchema } from '@efie-form/react';

function App() {
  const schema: FormSchema = {
    // Your form schema
  };

  const handleChange = (values) => {
    console.log('Form values:', values);
  };

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // Submit values to your API
  };

  return (
    <StatefulForm
      schema={schema}
      onChange={handleChange}
      onSubmit={handleSubmit}
      useDefaultComponents={true} // Use the built-in components
      // You can override specific components if needed
      // shortText={MyCustomTextInput}
    />
  );
}
```

#### StatefulForm Props

| Name                  | Description                                      | Type                          | Default |
| --------------------- | ------------------------------------------------ | ----------------------------- | ------- |
| `schema`              | Form schema                                      | `FormSchema`                  | -       |
| `initialValues`       | Initial form values                              | `Record<string, any>`         | -       |
| `onChange`            | Callback when form values change                 | `(values: Record<string, any>) => void` | - |
| `validate`            | Form validation function                         | `(values: Record<string, any>) => Record<string, string>` | - |
| `onSubmit`            | Callback when form is submitted                  | `(values: Record<string, any>) => void` | - |
| `useDefaultComponents`| Whether to use default field components          | `boolean`                     | `true`  |
| `...fieldComponents`  | Custom field components to override defaults      | `Partial<FieldPropsMap>`       | -       |

## Default Components

The library includes default components for all field types. You can use them directly or as a reference for creating your own components.

```tsx
import {
  ShortTextField,
  LongTextField,
  NumberField,
  // ... other components
} from '@efie-form/react';

// Or import all default components
import { DefaultComponents } from '@efie-form/react';
```

## Form State Management

The library provides hooks and components for form state management:

### useFormState

```tsx
import { useFormState } from '@efie-form/react';

function MyForm() {
  const {
    values,
    errors,
    setValue,
    setValues,
    resetForm,
    validateForm,
    setError,
    clearErrors,
  } = useFormState({
    initialValues: { name: '', email: '' },
    onChange: (values) => console.log(values),
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) errors.name = 'Name is required';
      return errors;
    },
  });

  // Use the form state in your form
}
```

### FormStateProvider

```tsx
import { FormStateProvider, useFormStateContext } from '@efie-form/react';

function MyForm() {
  return (
    <FormStateProvider
      initialValues={{ name: '', email: '' }}
      onChange={(values) => console.log(values)}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.name) errors.name = 'Name is required';
        return errors;
      }}
    >
      <MyFormFields />
    </FormStateProvider>
  );
}

function MyFormFields() {
  const { values, errors, setValue } = useFormStateContext();

  // Access form state from context
}
```

## Examples

### Basic Form with Default Components

```tsx
import { StatefulForm, FormSchema } from '@efie-form/react';

const schema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'page1',
        type: 'page',
        props: { name: 'Page 1' },
        children: [
          {
            id: 'name',
            type: 'shortText',
            props: [
              { type: 'label', value: 'Name' },
              { type: 'required', value: true },
            ],
          },
          {
            id: 'email',
            type: 'shortText',
            props: [
              { type: 'label', value: 'Email' },
              { type: 'required', value: true },
            ],
          },
        ],
      },
    ],
    rules: [],
  },
};

function App() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <StatefulForm
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}
```

### Custom Validation

```tsx
import { StatefulForm, FormSchema } from '@efie-form/react';

function App() {
  const validateForm = (values) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  return (
    <StatefulForm
      schema={schema}
      validate={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
```

### Custom Field Components

```tsx
import { ReactForm, FormSchema, type ShortTextFieldProps } from '@efie-form/react';

// Custom text field component
function CustomTextField({
  id,
  value,
  onChange,
  label,
  required,
  placeholder,
  errors,
}: ShortTextFieldProps) {
  return (
    <div className="my-custom-field">
      <label htmlFor={id}>{label}{required && '*'}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {errors?.message && <div className="error">{errors.message}</div>}
    </div>
  );
}

function App() {
  return (
    <ReactForm
      schema={schema}
      shortText={CustomTextField}
      // Other custom components
    />
  );
}
```
