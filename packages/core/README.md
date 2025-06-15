# @efie-form/core

[![Version](https://img.shields.io/npm/v/@efie-form/core.svg?style=flat-square)](https://npmjs.com/package/@efie-form/core)
[![License](https://img.shields.io/npm/l/@efie-form/core.svg?style=flat-square)](https://npmjs.com/package/@efie-form/core)
[![Downloads](https://img.shields.io/npm/dm/@efie-form/core.svg?style=flat-square)](https://npmjs.com/package/@efie-form/core)

The core package of [Efie Form](https://github.com/pwkang/efie), providing framework-agnostic utilities, types, and business logic for building dynamic forms.

## Features

- 🔧 **Framework Agnostic**: Core utilities that work with any JavaScript framework
- 🎯 **TypeScript Support**: Comprehensive type definitions for type safety
- 📋 **Schema Management**: Complete form schema validation and manipulation
- 🎨 **Color System**: Built-in color utilities and theming support
- 🔍 **Input Validation**: Robust value validation and type checking
- 📦 **Lightweight**: Minimal dependencies, maximum flexibility

## Installation

```bash
npm install @efie-form/core
```

## Usage

### Form Schema

The core package provides utilities for working with form schemas:

```typescript
import { FormSchema, validateSchema, createDefaultSchema } from '@efie-form/core';

// Create a default schema
const schema = createDefaultSchema();

// Validate a schema
const isValid = validateSchema(schema);

// Example schema structure
const customSchema: FormSchema = {
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      props: {
        placeholder: 'Enter your full name'
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      validation: {
        email: true
      }
    }
  ],
  layout: {
    blocks: [
      {
        id: 'block-1',
        rows: [
          {
            id: 'row-1',
            columns: [
              { id: 'col-1', fieldIds: ['name'] },
              { id: 'col-2', fieldIds: ['email'] }
            ]
          }
        ]
      }
    ]
  }
};
```

### Input Types and Validation

```typescript
import { InputType, validateValue, isValidInputType } from '@efie-form/core';

// Check if input type is valid
const isValid = isValidInputType('text'); // true
const isInvalid = isValidInputType('invalid'); // false

// Validate field values
const textValidation = validateValue('Hello', 'text'); // true
const numberValidation = validateValue('123', 'number'); // true
const emailValidation = validateValue('test@example.com', 'email'); // true
```

### Color Utilities

```typescript
import { colors, getColorValue } from '@efie-form/core';

// Access predefined colors
console.log(colors.primary[500]); // Primary color shade
console.log(colors.success[300]); // Success color shade

// Get color value with fallback
const primaryColor = getColorValue('primary', 500, '#000000');
```

### Constants and Configuration

```typescript
import { 
  DEFAULT_FORM_TITLE,
  DEFAULT_FORM_DESCRIPTION,
  SUPPORTED_INPUT_TYPES,
  VALIDATION_RULES
} from '@efie-form/core';

// Use predefined constants
console.log(DEFAULT_FORM_TITLE); // "Untitled Form"
console.log(SUPPORTED_INPUT_TYPES); // Array of all supported input types
```

## API Reference

### Types

- `FormSchema` - Complete form schema structure
- `FormField` - Individual field configuration
- `FormLayout` - Layout configuration with blocks, rows, and columns
- `InputType` - Supported input field types
- `ValidationRule` - Field validation configuration
- `FieldProps` - Field-specific properties

### Functions

- `createDefaultSchema()` - Creates a new default form schema
- `validateSchema(schema)` - Validates a form schema structure
- `validateValue(value, type)` - Validates a field value against its type
- `isValidInputType(type)` - Checks if input type is supported
- `getColorValue(color, shade, fallback)` - Gets color value with fallback

### Constants

- `DEFAULT_FORM_TITLE` - Default form title
- `DEFAULT_FORM_DESCRIPTION` - Default form description
- `SUPPORTED_INPUT_TYPES` - Array of supported input types
- `VALIDATION_RULES` - Available validation rules
- `colors` - Predefined color palette

## Framework Integration

This core package is designed to be used with framework-specific packages:

- **React**: Use with [@efie-form/react](../react)
- **Vue**: Use with [@efie-form/vue](../vue) (coming soon)
- **Builder**: Use with [@efie-form/builder](../builder) for visual form building

## TypeScript

This package is written in TypeScript and includes comprehensive type definitions. No additional `@types` packages are needed.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.
