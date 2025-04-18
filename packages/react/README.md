# @efie-form/react

[![Version](https://img.shields.io/npm/v/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)
[![License](https://img.shields.io/npm/l/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)

A React component library for building dynamic forms with drag-and-drop functionality. This package is part of the [efie-form](https://npmjs.com/package/efie-form) ecosystem.

## Features

- 🧩 **Form Builder**: Drag-and-drop interface for creating forms
- 📝 **Headless Form**: Render headless forms created with the form builder
- 🔌 **Extensible**: Customize form fields with your own components
- 🎨 **Themeable**: Style forms to match your application's design
- 🌐 **Responsive**: Works on all screen sizes
- 🧰 **Rich Field Types**: Support for text, number, date, file, and more

## Installation

```bash
# With npm
$ npm install @efie-form/react

# With yarn
$ yarn add @efie-form/react

# With pnpm
$ pnpm add @efie-form/react
```

## Usage

### FormBuilder Component

The `FormBuilder` component provides a drag-and-drop interface for creating forms. It uses an iframe to render the form builder UI.

```tsx
import { useRef } from 'react';
import { FormBuilder, FormBuilderRef, FormSchema } from '@efie-form/react';

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
        formInputs={[
          // Optional: Custom input fields
          {
            id: 'custom_field',
            label: 'Custom Field',
            type: 'short_text',
          }
        ]}
      />
    </div>
  );
};
```

### ReactForm Component

The `ReactForm` component renders a form based on a schema created with the FormBuilder.

```tsx
import { ReactForm, FormSchema } from '@efie-form/react';
import { MyCustomTextField, MyCustomNumberField } from './my-components';

const App = () => {
  // Form schema from your database or state
  const schema: FormSchema = {
    // Your form schema
  };

  return (
    <ReactForm
      schema={schema}
      // Provide your custom components for each field type
      shortText={MyCustomTextField}
      number={MyCustomNumberField}
      // ... other field types
    />
  );
};
```

## API Reference

### Components

#### `FormBuilder`

A component that renders a form builder interface.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `height` | `number` | Yes | Height of the form builder in pixels |
| `schema` | `FormSchema` | No | Initial form schema |
| `formInputs` | `BuilderCustomInput[]` | No | Custom input fields |
| `formKeyNonEditable` | `boolean` | No | Prevent editing form keys |
| `inputNonReusable` | `boolean` | No | Prevent reusing input fields |

**Ref Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getSchema()` | `FormSchema` | Get the current form schema |

#### `ReactForm`

A component that renders a form based on a schema.

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

## Examples

Check out the demo applications in the repository for complete examples:

- Form Builder Demo: `demo/react/builder`
- Form Renderer Demo: `demo/react/form`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
