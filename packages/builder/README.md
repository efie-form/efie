# @efie-form/builder

[![Version](https://img.shields.io/npm/v/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)
[![License](https://img.shields.io/npm/l/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)
[![Downloads](https://img.shields.io/npm/dm/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)

A powerful visual form builder component for creating dynamic forms with drag-and-drop functionality. Part of the [Efie Form](https://github.com/pwkang/efie) ecosystem.

## Features

- 🎨 **Visual Form Builder**: Intuitive drag-and-drop interface for form creation
- 🔄 **Undo/Redo**: Full history management with configurable limits
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Real-time Preview**: See form changes instantly as you build
- 🏗️ **Advanced Layouts**: Support for complex layouts with blocks, rows, and columns
- 🔧 **Field Customization**: Rich property panels for configuring field behavior
- 💾 **Schema Export**: Export forms as JSON schemas for rendering
- 🎨 **Themeable**: Fully customizable appearance with CSS variables
- ⚡ **Performance Optimized**: Built with Zustand for efficient state management
- 🧰 **Rich Field Types**: Support for 15+ field types including text, email, date, file upload, and more

## Installation

```bash
npm install @efie-form/builder
```

## Basic Usage

### React Integration

```tsx
import React, { useRef } from 'react';
import { FormBuilder, FormBuilderRef } from '@efie-form/builder';
import '@efie-form/builder/styles.css'; // Import required styles

function MyFormBuilder() {
  const formBuilderRef = useRef<FormBuilderRef>(null);

  const handleSave = () => {
    const schema = formBuilderRef.current?.getSchema();
    if (schema) {
      console.log('Form schema:', schema);
      // Save to your backend or state management
    }
  };

  const handleLoad = () => {
    // Load existing schema
    const existingSchema = {
      // ... your form schema
    };
    formBuilderRef.current?.loadSchema(existingSchema);
  };

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <button onClick={handleSave}>Save Form</button>
        <button onClick={handleLoad}>Load Form</button>
      </div>
      
      <FormBuilder
        ref={formBuilderRef}
        onSchemaChange={(schema) => {
          console.log('Schema updated:', schema);
        }}
        // Optional: Customize the builder
        config={{
          maxHistoryStates: 50,
          showPreview: true,
          allowedFieldTypes: ['text', 'email', 'number', 'textarea']
        }}
      />
    </div>
  );
}
```

### Standalone Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@efie-form/builder/dist/styles.css">
</head>
<body>
  <div id="form-builder"></div>
  
  <script type="module">
    import { createFormBuilder } from '@efie-form/builder';
    
    const builder = createFormBuilder({
      container: document.getElementById('form-builder'),
      onSchemaChange: (schema) => {
        console.log('Schema updated:', schema);
      }
    });
    
    // Get current schema
    const schema = builder.getSchema();
    
    // Load existing schema
    builder.loadSchema(existingSchema);
  </script>
</body>
</html>
```

## Advanced Configuration

### Builder Options

```tsx
<FormBuilder
  ref={formBuilderRef}
  config={{
    // History management
    maxHistoryStates: 100,
    
    // UI customization
    showPreview: true,
    showToolbar: true,
    showPropertyPanel: true,
    
    // Field restrictions
    allowedFieldTypes: [
      'text', 'email', 'number', 'textarea',
      'select', 'radio', 'checkbox', 'date'
    ],
    
    // Layout options
    maxColumns: 4,
    allowNestedBlocks: true,
    
    // Validation
    enforceRequired: true,
    validateOnChange: true
  }}
  
  // Custom field templates
  fieldTemplates={{
    text: {
      label: 'Custom Text Field',
      icon: 'text-icon',
      defaultProps: {
        placeholder: 'Enter text...'
      }
    }
  }}
  
  // Event handlers
  onSchemaChange={(schema) => console.log('Schema changed:', schema)}
  onFieldSelect={(fieldId) => console.log('Field selected:', fieldId)}
  onFieldAdd={(field) => console.log('Field added:', field)}
  onFieldRemove={(fieldId) => console.log('Field removed:', fieldId)}
/>
```

### Custom Styling

The builder uses CSS variables for theming. Override these in your CSS:

```css
:root {
  /* Primary colors */
  --efie-primary-50: #eff6ff;
  --efie-primary-500: #3b82f6;
  --efie-primary-600: #2563eb;
  
  /* Layout */
  --efie-sidebar-width: 280px;
  --efie-property-panel-width: 320px;
  
  /* Spacing */
  --efie-spacing-xs: 0.25rem;
  --efie-spacing-sm: 0.5rem;
  --efie-spacing-md: 1rem;
  --efie-spacing-lg: 1.5rem;
  
  /* Typography */
  --efie-font-family: 'Inter', sans-serif;
  --efie-font-size-sm: 0.875rem;
  --efie-font-size-base: 1rem;
}

/* Custom field styling */
.efie-field-wrapper {
  transition: all 0.2s ease;
}

.efie-field-wrapper:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## Supported Field Types

The builder supports the following field types out of the box:

| Field Type | Description | Properties |
|------------|-------------|------------|
| `text` | Single-line text input | placeholder, maxLength, pattern |
| `textarea` | Multi-line text input | placeholder, rows, maxLength |
| `email` | Email address input | placeholder, validation |
| `number` | Numeric input | min, max, step, placeholder |
| `password` | Password input | placeholder, minLength |
| `date` | Date picker | min, max, format |
| `time` | Time picker | min, max, step |
| `datetime-local` | Date and time picker | min, max |
| `select` | Dropdown selection | options, multiple |
| `radio` | Radio button group | options, inline |
| `checkbox` | Checkbox input | checked, value |
| `file` | File upload | accept, multiple, maxSize |
| `url` | URL input | placeholder, validation |
| `tel` | Telephone input | placeholder, validation |
| `range` | Range slider | min, max, step |

## API Reference

### FormBuilder Component

```tsx
interface FormBuilderProps {
  ref?: RefObject<FormBuilderRef>;
  config?: BuilderConfig;
  fieldTemplates?: FieldTemplateMap;
  onSchemaChange?: (schema: FormSchema) => void;
  onFieldSelect?: (fieldId: string | null) => void;
  onFieldAdd?: (field: FormField) => void;
  onFieldRemove?: (fieldId: string) => void;
}
```

### FormBuilderRef

```tsx
interface FormBuilderRef {
  getSchema(): FormSchema;
  loadSchema(schema: FormSchema): void;
  reset(): void;
  undo(): boolean;
  redo(): boolean;
  addField(field: FormField): void;
  removeField(fieldId: string): void;
  updateField(fieldId: string, updates: Partial<FormField>): void;
  selectField(fieldId: string | null): void;
}
```

### BuilderConfig

```tsx
interface BuilderConfig {
  maxHistoryStates?: number;
  showPreview?: boolean;
  showToolbar?: boolean;
  showPropertyPanel?: boolean;
  allowedFieldTypes?: InputType[];
  maxColumns?: number;
  allowNestedBlocks?: boolean;
  enforceRequired?: boolean;
  validateOnChange?: boolean;
}
```

## State Management

The builder uses [Zustand](https://github.com/pmndrs/zustand) for state management with reactive patterns. Key stores include:

- **Schema Store**: Manages form schema, fields, and layout
- **Settings Store**: Handles UI settings and configuration
- **History Store**: Manages undo/redo functionality

For advanced customization, you can access these stores directly:

```tsx
import { useSchemaStore, useSettingsStore } from '@efie-form/builder';

function CustomComponent() {
  const schema = useSchemaStore(state => state.schema);
  const addField = useSchemaStore(state => state.addField);
  const settings = useSettingsStore(state => state.settings);
}
```

## Performance Considerations

The builder is optimized for performance with:

- **Selective Re-renders**: Components only re-render when relevant data changes
- **Virtualization**: Large field lists are virtualized for smooth scrolling
- **Debounced Updates**: Property changes are debounced to prevent excessive updates
- **Memoized Computations**: Complex calculations are memoized

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.
