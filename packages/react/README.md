# @efie-form/react

[![Version](https://img.shields.io/npm/v/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)
[![License](https://img.shields.io/npm/l/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)

A React component library for building dynamic forms with drag-and-drop functionality. This package is part of the [efie-form](https://npmjs.com/package/efie-form) ecosystem.

> **⚠️ Preview Stage**: This package is currently in preview and **not recommended for production use**. The API may change significantly before the stable release. Use at your own risk.

## Features

- 🧩 **Form Builder**: Drag-and-drop interface for creating forms
- 📝 **Headless Form**: Render headless forms created with the form builder
- 🔌 **Extensible**: Customize form fields with your own components
- 🎨 **Themeable**: Style forms to match your application's design
- 🌐 **Responsive**: Works on all screen sizes
- 🧰 **Rich Field Types**: Support for text, number, date, file, and more
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🔄 **Form State Management**: Compatible with popular form libraries like react-hook-form
- 🏗️ **Layout Components**: Support for complex layouts with blocks, rows, and columns

## Installation

```bash
# With npm
$ npm install @efie-form/react

# With yarn
$ yarn add @efie-form/react

# With pnpm
$ pnpm add @efie-form/react
```

## Quick Start

### 1. Form Builder

Create a form builder interface to design forms:

```tsx
import React, { useRef } from 'react';
import { FormBuilder, FormBuilderRef, FormSchema } from '@efie-form/react';

function MyFormBuilder() {
  const formBuilderRef = useRef<FormBuilderRef>(null);

  const handleSave = () => {
    const schema = formBuilderRef.current?.getSchema();
    if (schema) {
      console.log('Form schema:', schema);
      // Save to your backend
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save Form</button>
      <FormBuilder
        ref={formBuilderRef}
        height={600}
      />
    </div>
  );
}
```

### 2. Form Renderer

Render forms using the schema from the form builder:

```tsx
import React from 'react';
import { ReactForm, FormSchema } from '@efie-form/react';
import { useForm, FormProvider } from 'react-hook-form';

// Your custom field components
import { MyTextField, MyNumberField, MySelectField } from './components';

function MyFormRenderer({ schema }: { schema: FormSchema }) {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ReactForm
          schema={schema}
          shortText={MyTextField}
          number={MyNumberField}
          singleChoice={MySelectField}
          // ... other field types
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Detailed Usage

### FormBuilder Component

The `FormBuilder` component provides a drag-and-drop interface for creating forms. It uses an iframe to render the form builder UI.

#### Basic Usage

```tsx
import React, { useRef } from 'react';
import { FormBuilder, FormBuilderRef, FormSchema, FormFieldType } from '@efie-form/react';

const App = () => {
  const formBuilderRef = useRef<FormBuilderRef>(null);

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
        height={600} // Height of the form builder in pixels
        schema={existingSchema} // Optional: Load an existing form schema
        formKeyNonEditable={true} // Optional: Prevent editing form keys
        inputNonReusable={true} // Optional: Prevent reusing input fields
        maxHistories={50} // Optional: Limit the maximum undo history entries
        formInputs={[
          // Optional: Custom input fields
          {
            id: 'custom_field',
            label: 'Custom Field',
            type: FormFieldType.SHORT_TEXT,
          }
        ]}
      />
    </div>
  );
};
```

#### Advanced Configuration

```tsx
import React, { useRef, useState } from 'react';
import { FormBuilder, FormBuilderRef, FormSchema, FormFieldType } from '@efie-form/react';

const AdvancedFormBuilder = () => {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [currentSchema, setCurrentSchema] = useState<FormSchema | undefined>();

  const handleSave = async () => {
    const schema = formBuilderRef.current?.getSchema();
    if (schema) {
      try {
        // Save to your backend
        const response = await fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schema),
        });

        if (response.ok) {
          console.log('Form saved successfully');
          setCurrentSchema(schema);
        }
      } catch (error) {
        console.error('Failed to save form:', error);
      }
    }
  };

  const customInputs = [
    {
      id: 'employee_id',
      label: 'Employee ID',
      type: FormFieldType.SHORT_TEXT,
    },
    {
      id: 'department',
      label: 'Department',
      type: FormFieldType.SINGLE_CHOICE,
    },
    {
      id: 'salary_range',
      label: 'Salary Range',
      type: FormFieldType.NUMBER,
    },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <button onClick={handleSave}>Save Form</button>
        <span style={{ marginLeft: '1rem' }}>
          {currentSchema ? 'Form saved' : 'Unsaved changes'}
        </span>
      </div>

      <FormBuilder
        ref={formBuilderRef}
        height={600}
        schema={currentSchema}
        formInputs={customInputs}
        formKeyNonEditable={false}
        inputNonReusable={false}
        maxHistories={100}
      />
    </div>
  );
};
```

### ReactForm Component

The `ReactForm` component renders a form based on a schema created with the FormBuilder. It's completely headless, meaning you provide your own field components.

#### Basic Usage

```tsx
import React from 'react';
import { ReactForm, FormSchema } from '@efie-form/react';
import { useForm, FormProvider } from 'react-hook-form';

// Import your custom field components
import {
  MyTextField,
  MyNumberField,
  MySelectField,
  MyDateField,
  MyFileField,
  MyHeaderField,
  MyDividerField,
  MyBlockField,
} from './components/fields';

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: any) => void;
}

const FormRenderer = ({ schema, onSubmit }: FormRendererProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ReactForm
          schema={schema}
          shortText={MyTextField}
          longText={MyTextField}
          number={MyNumberField}
          singleChoice={MySelectField}
          multipleChoices={MySelectField}
          date={MyDateField}
          time={MyDateField}
          dateTime={MyDateField}
          file={MyFileField}
          header={MyHeaderField}
          paragraph={MyHeaderField}
          divider={MyDividerField}
          block={MyBlockField}
          // Layout components
          row={MyBlockField}
          column={MyBlockField}
          page={MyBlockField}
        />
        <button type="submit">Submit Form</button>
      </form>
    </FormProvider>
  );
};
```

#### Complete Example with Material-UI

```tsx
import React from 'react';
import { ReactForm, FormSchema, ShortTextFieldProps, NumberFieldProps } from '@efie-form/react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

// Custom field components using Material-UI
const ShortTextField = ({ id, name, fieldLabel, placeholder, required }: ShortTextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      {...register(name, { required })}
      id={id}
      label={fieldLabel}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

const NumberField = ({ id, name, fieldLabel, placeholder, required, min, max }: NumberFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      {...register(name, {
        required,
        min: min ? { value: min, message: `Minimum value is ${min}` } : undefined,
        max: max ? { value: max, message: `Maximum value is ${max}` } : undefined,
      })}
      id={id}
      label={fieldLabel}
      placeholder={placeholder}
      type="number"
      fullWidth
      margin="normal"
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

const MyFormApp = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const schema: FormSchema = {
    // Your form schema here
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ReactForm
            schema={schema}
            shortText={ShortTextField}
            number={NumberField}
            // ... other field types
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};
```

## Creating Custom Field Components

### Field Component Props

Each field type receives specific props from the form schema. Here are the interfaces for all field types:

#### Input Field Props

```tsx
import type {
  ShortTextFieldProps,
  LongTextFieldProps,
  NumberFieldProps,
  SingleChoiceFieldProps,
  MultipleChoicesFieldProps,
  DateFieldProps,
  TimeFieldProps,
  DateTimeFieldProps,
  FileFieldProps,
} from '@efie-form/react';

// Short Text Field
const MyShortTextField = ({
  id,
  name,
  fieldLabel,
  placeholder,
  required,
  disabled,
  errors
}: ShortTextFieldProps) => {
  // Your implementation
};

// Number Field with validation
const MyNumberField = ({
  id,
  name,
  fieldLabel,
  placeholder,
  required,
  disabled,
  min,
  max,
  errors
}: NumberFieldProps) => {
  // Your implementation
};

// Single Choice (Radio/Select)
const MySingleChoiceField = ({
  id,
  name,
  fieldLabel,
  required,
  disabled,
  options,
  errors
}: SingleChoiceFieldProps) => {
  // options is an array of { optionLabel: string, value: string }
};
```

#### Layout Component Props

```tsx
import type {
  BlockFieldProps,
  RowFieldProps,
  ColumnFieldProps,
  PageFieldProps,
} from '@efie-form/react';

// Block component for styling containers
const MyBlockField = ({
  id,
  children,
  blockBorderRadius,
  blockBoxShadow,
  blockBackgroundColor,
  blockColor,
  blockPadding,
  blockMargin
}: BlockFieldProps) => {
  return (
    <div
      id={id}
      style={{
        borderRadius: blockBorderRadius,
        boxShadow: blockBoxShadow,
        backgroundColor: blockBackgroundColor,
        color: blockColor,
        padding: blockPadding,
        margin: blockMargin,
      }}
    >
      {children}
    </div>
  );
};

// Row component for horizontal layouts
const MyRowField = ({ id, children }: RowFieldProps) => {
  return (
    <div id={id} style={{ display: 'flex', gap: '1rem' }}>
      {children}
    </div>
  );
};

// Column component for vertical layouts
const MyColumnField = ({ id, children, columnWidth }: ColumnFieldProps) => {
  return (
    <div id={id} style={{ flex: columnWidth || '1' }}>
      {children}
    </div>
  );
};
```

#### Display Component Props

```tsx
import type {
  HeaderFieldProps,
  ParagraphFieldProps,
  ImageFieldProps,
  DividerFieldProps,
  ButtonFieldProps,
} from '@efie-form/react';

// Header component
const MyHeaderField = ({
  id,
  text,
  headingTag,
  textAlign,
  font
}: HeaderFieldProps) => {
  const Tag = headingTag || 'h1';

  return (
    <Tag
      id={id}
      style={{
        textAlign,
        fontSize: `${font.size}${font.unit}`,
        fontWeight: font.weight,
      }}
    >
      {text}
    </Tag>
  );
};

// Divider component
const MyDividerField = ({
  id,
  dividerColor,
  dividerWidth,
  dividerStyle
}: DividerFieldProps) => {
  return (
    <hr
      id={id}
      style={{
        borderColor: dividerColor,
        borderWidth: `${dividerWidth}px`,
        borderStyle: dividerStyle,
      }}
    />
  );
};
```

### Integration with Form Libraries

#### React Hook Form Integration

```tsx
import { useFormContext } from 'react-hook-form';
import type { ShortTextFieldProps } from '@efie-form/react';

const ShortTextField = ({
  id,
  name,
  fieldLabel,
  placeholder,
  required
}: ShortTextFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{fieldLabel}</label>
      <input
        {...register(name, {
          required: required ? `${fieldLabel} is required` : false
        })}
        id={id}
        placeholder={placeholder}
        type="text"
      />
      {errors[name] && (
        <span style={{ color: 'red' }}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};
```

#### Formik Integration

```tsx
import { useField } from 'formik';
import type { ShortTextFieldProps } from '@efie-form/react';

const ShortTextField = ({
  id,
  name,
  fieldLabel,
  placeholder,
  required
}: ShortTextFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={id}>{fieldLabel}</label>
      <input
        {...field}
        id={id}
        placeholder={placeholder}
        type="text"
      />
      {meta.touched && meta.error && (
        <span style={{ color: 'red' }}>{meta.error}</span>
      )}
    </div>
  );
};
```

## API Reference

### Components

#### `FormBuilder`

A component that renders a form builder interface using an iframe.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `height` | `number` | Yes | - | Height of the form builder in pixels |
| `schema` | `FormSchema` | No | `undefined` | Initial form schema to load |
| `formInputs` | `BuilderCustomInput[]` | No | `[]` | Custom input fields to add to the builder |
| `formKeyNonEditable` | `boolean` | No | `false` | Prevent editing form keys |
| `inputNonReusable` | `boolean` | No | `false` | Prevent reusing input fields |
| `maxHistories` | `number` | No | `50` | Maximum number of undo history entries to keep |

**Ref Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getSchema()` | `FormSchema \| undefined` | Get the current form schema |

**Example:**

```tsx
const formBuilderRef = useRef<FormBuilderRef>(null);

// Get schema
const schema = formBuilderRef.current?.getSchema();
```

#### `ReactForm`

A headless component that renders a form based on a schema. You must provide your own field components.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `FormSchema` | Yes | Form schema to render |
| `shortText` | `ElementType<ShortTextFieldProps>` | No | Component for short text fields |
| `longText` | `ElementType<LongTextFieldProps>` | No | Component for long text fields |
| `number` | `ElementType<NumberFieldProps>` | No | Component for number fields |
| `singleChoice` | `ElementType<SingleChoiceFieldProps>` | No | Component for single choice fields |
| `multipleChoices` | `ElementType<MultipleChoicesFieldProps>` | No | Component for multiple choice fields |
| `date` | `ElementType<DateFieldProps>` | No | Component for date fields |
| `time` | `ElementType<TimeFieldProps>` | No | Component for time fields |
| `dateTime` | `ElementType<DateTimeFieldProps>` | No | Component for date-time fields |
| `file` | `ElementType<FileFieldProps>` | No | Component for file fields |
| `divider` | `ElementType<DividerFieldProps>` | No | Component for divider fields |
| `header` | `ElementType<HeaderFieldProps>` | No | Component for header fields |
| `paragraph` | `ElementType<ParagraphFieldProps>` | No | Component for paragraph fields |
| `image` | `ElementType<ImageFieldProps>` | No | Component for image fields |
| `row` | `ElementType<RowFieldProps>` | No | Component for row layout |
| `column` | `ElementType<ColumnFieldProps>` | No | Component for column layout |
| `block` | `ElementType<BlockFieldProps>` | No | Component for block layout |
| `page` | `ElementType<PageFieldProps>` | No | Component for page layout |
| `button` | `ElementType<ButtonFieldProps>` | No | Component for button fields |

**Note:** If a field type is not provided, those fields will not render. This allows you to selectively support only the field types you need.

### Types

#### `FormSchema`

The schema structure returned by the FormBuilder and used by ReactForm:

```tsx
interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
    rules: RootRule[];
  };
}
```

#### `BuilderCustomInput`

Custom input configuration for the FormBuilder:

```tsx
interface BuilderCustomInput {
  id: string;
  label: string;
  type: FormFieldType;
}

// Example
const customInputs: BuilderCustomInput[] = [
  {
    id: 'employee_id',
    label: 'Employee ID',
    type: FormFieldType.SHORT_TEXT,
  },
  {
    id: 'department',
    label: 'Department',
    type: FormFieldType.SINGLE_CHOICE,
  },
];
```

#### `FormFieldType`

Enum of all available field types:

```tsx
enum FormFieldType {
  SHORT_TEXT = 'short_text',
  LONG_TEXT = 'long_text',
  NUMBER = 'number',
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICES = 'multiple_choices',
  DATE = 'date',
  TIME = 'time',
  DATE_TIME = 'date_time',
  FILE = 'file',
  HEADER = 'header',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',
  DIVIDER = 'divider',
  BUTTON = 'button',
  BLOCK = 'block',
  ROW = 'row',
  COLUMN = 'column',
  PAGE = 'page',
}
```

## Complete Examples

### Full Application Example

```tsx
import React, { useState, useRef } from 'react';
import {
  FormBuilder,
  ReactForm,
  FormBuilderRef,
  FormSchema,
  ShortTextFieldProps,
  NumberFieldProps,
  SingleChoiceFieldProps,
} from '@efie-form/react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

// Custom field components
const TextField = ({ id, name, fieldLabel, placeholder, required }: ShortTextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id}>{fieldLabel}</label>
      <input
        {...register(name, { required })}
        id={id}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.5rem' }}
      />
      {errors[name] && <span style={{ color: 'red' }}>This field is required</span>}
    </div>
  );
};

const NumberField = ({ id, name, fieldLabel, min, max }: NumberFieldProps) => {
  const { register } = useFormContext();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id}>{fieldLabel}</label>
      <input
        {...register(name)}
        id={id}
        type="number"
        min={min}
        max={max}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
};

const SelectField = ({ id, name, fieldLabel, options }: SingleChoiceFieldProps) => {
  const { register } = useFormContext();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id}>{fieldLabel}</label>
      <select {...register(name)} id={id} style={{ width: '100%', padding: '0.5rem' }}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState<'builder' | 'form'>('builder');
  const [formSchema, setFormSchema] = useState<FormSchema | undefined>();
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const methods = useForm();

  const handleSaveForm = () => {
    const schema = formBuilderRef.current?.getSchema();
    if (schema) {
      setFormSchema(schema);
      setCurrentView('form');
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentView('builder')}
          style={{ marginRight: '1rem' }}
        >
          Form Builder
        </button>
        <button
          onClick={() => setCurrentView('form')}
          disabled={!formSchema}
        >
          Preview Form
        </button>
      </nav>

      {currentView === 'builder' && (
        <div>
          <h2>Form Builder</h2>
          <button onClick={handleSaveForm} style={{ marginBottom: '1rem' }}>
            Save & Preview Form
          </button>
          <FormBuilder
            ref={formBuilderRef}
            height={600}
            schema={formSchema}
          />
        </div>
      )}

      {currentView === 'form' && formSchema && (
        <div>
          <h2>Form Preview</h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
              <ReactForm
                schema={formSchema}
                shortText={TextField}
                longText={TextField}
                number={NumberField}
                singleChoice={SelectField}
              />
              <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Submit Form
              </button>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default App;
```

### Best Practices

#### 1. Form State Management

Always wrap your ReactForm with a form library provider:

```tsx
import { FormProvider, useForm } from 'react-hook-form';

const MyApp = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ReactForm schema={schema} {...fieldComponents} />
      </form>
    </FormProvider>
  );
};
```

#### 2. Error Handling

Implement proper error handling in your field components:

```tsx
const TextField = ({ name, required, fieldLabel }: ShortTextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <input
        {...register(name, {
          required: required ? `${fieldLabel} is required` : false,
        })}
      />
      {errors[name] && (
        <span className="error">{errors[name]?.message}</span>
      )}
    </div>
  );
};
```

#### 3. Layout Components

Implement layout components to support complex form structures:

```tsx
const BlockField = ({ children, blockBackgroundColor, blockPadding }: BlockFieldProps) => {
  return (
    <div
      style={{
        backgroundColor: blockBackgroundColor,
        padding: blockPadding,
        marginBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
};
```

#### 4. TypeScript Usage

Use proper TypeScript types for better development experience:

```tsx
import type {
  FormSchema,
  ShortTextFieldProps,
  NumberFieldProps
} from '@efie-form/react';

interface MyFormProps {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => void;
}

const MyForm: React.FC<MyFormProps> = ({ schema, onSubmit }) => {
  // Implementation
};
```

## Demo Applications

Check out the demo applications in the repository for complete examples:

- **Form Builder Demo**: `demo/react/builder` - Shows how to implement the FormBuilder
- **Form Renderer Demo**: `demo/react/form` - Shows how to implement ReactForm with Material-UI

## Troubleshooting

### Common Issues

1. **Fields not rendering**: Make sure you've provided the corresponding field component prop to ReactForm
2. **Form validation not working**: Ensure you're using a form library like react-hook-form and wrapping with FormProvider
3. **Layout issues**: Implement proper layout components (block, row, column) for complex forms
4. **TypeScript errors**: Import the correct prop types from '@efie-form/react'

### Performance Tips

1. **Memoize field components** to prevent unnecessary re-renders
2. **Use React.lazy** for code splitting if you have many field types
3. **Implement proper key props** when rendering dynamic forms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
