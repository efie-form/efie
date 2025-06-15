# React Form Renderer Demo

A demonstration application showcasing the [@efie-form/react](../../../packages/react) form rendering capabilities. This demo shows how to render forms created with the Efie Form builder.

## Features

- 📝 **Form Rendering**: Render forms from JSON schemas
- 🎨 **Styled Components**: Beautiful, responsive form layouts
- ✅ **Validation**: Real-time form validation and error handling
- 🔄 **State Management**: Efficient form state management
- 📱 **Responsive Design**: Works seamlessly on all device sizes
- 🎯 **TypeScript Support**: Full type safety and IntelliSense

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# From the project root
pnpm install

# Or install dependencies for this demo specifically
cd demo/react/form
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

The demo will be available at `http://localhost:5174`

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Usage Guide

### 1. Loading Form Schemas

The demo includes several example form schemas:
- **Contact Form**: Basic contact information form
- **Registration Form**: User registration with validation
- **Survey Form**: Multi-step survey with various field types
- **Complex Layout**: Advanced layout with blocks and columns

### 2. Form Interaction

- **Fill Forms**: Enter data in the rendered form fields
- **Validation**: See real-time validation feedback
- **Submission**: Submit forms and view the collected data
- **Reset**: Clear form data and start over

### 3. Schema Switching

Use the schema selector to switch between different example forms and see how they render.

## Code Examples

### Basic Form Rendering

```tsx
import React, { useState } from 'react';
import { Form } from '@efie-form/react';
import type { FormSchema } from '@efie-form/core';

const schema: FormSchema = {
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
      required: true
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

function MyForm() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const handleChange = (data) => {
    setFormData(data);
    console.log('Form data changed:', data);
  };

  return (
    <Form
      schema={schema}
      data={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      config={{
        showRequiredIndicator: true,
        validateOnBlur: true,
        validateOnChange: false
      }}
    />
  );
}
```

### Advanced Form Configuration

```tsx
import React from 'react';
import { Form } from '@efie-form/react';

function AdvancedForm({ schema }) {
  return (
    <Form
      schema={schema}
      config={{
        // Validation settings
        showRequiredIndicator: true,
        validateOnBlur: true,
        validateOnChange: false,
        showValidationSummary: true,
        
        // UI settings
        showProgressBar: true,
        enableAutoSave: true,
        autoSaveDelay: 2000,
        
        // Accessibility
        enableA11y: true,
        announceErrors: true,
        
        // Styling
        theme: 'default',
        size: 'medium',
        variant: 'outlined'
      }}
      
      // Custom field components
      fieldComponents={{
        'custom-rating': CustomRatingField,
        'custom-signature': CustomSignatureField
      }}
      
      // Event handlers
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      onFieldChange={handleFieldChange}
      onFieldFocus={handleFieldFocus}
      onFieldBlur={handleFieldBlur}
      
      // Submission handling
      submitButton={{
        text: 'Submit Form',
        loading: isSubmitting,
        disabled: !isValid
      }}
    />
  );
}
```

### Custom Field Components

```tsx
import React from 'react';
import { FieldComponent } from '@efie-form/react';

const CustomRatingField: FieldComponent = ({ 
  field, 
  value, 
  onChange, 
  error 
}) => {
  return (
    <div className="rating-field">
      <label>{field.label}</label>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className={`star ${value >= rating ? 'active' : ''}`}
            onClick={() => onChange(rating)}
          >
            ⭐
          </button>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
```

## Customization

### Styling

The demo uses Tailwind CSS for styling. Customize the form appearance by:

1. **CSS Variables**: Override CSS variables for quick theme changes
2. **Tailwind Classes**: Use Tailwind utilities for custom styling
3. **Custom CSS**: Add custom styles in `src/index.css`

```css
:root {
  --efie-primary-color: #3b82f6;
  --efie-error-color: #ef4444;
  --efie-border-radius: 0.5rem;
  --efie-font-family: 'Inter', sans-serif;
}
```

### Configuration

Environment variables in `.env.local`:

```env
# API endpoints
VITE_API_BASE_URL=http://localhost:3000
VITE_FORM_ENDPOINT=/api/forms

# Feature flags
VITE_ENABLE_AUTO_SAVE=true
VITE_ENABLE_VALIDATION=true
VITE_ENABLE_PROGRESS_BAR=true
```

## Form Schemas

The demo includes several example schemas located in `src/schemas/`:

- `contact.json` - Simple contact form
- `registration.json` - User registration form
- `survey.json` - Multi-page survey
- `complex.json` - Complex layout example

### Schema Structure

```typescript
interface FormSchema {
  title?: string;
  description?: string;
  fields: FormField[];
  layout: FormLayout;
  settings?: FormSettings;
}

interface FormField {
  id: string;
  type: InputType;
  label: string;
  required?: boolean;
  props?: Record<string, any>;
  validation?: ValidationRule[];
}
```

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **@efie-form/react**: Form rendering components
- **@efie-form/core**: Core utilities

## File Structure

```
demo/react/form/
├── public/              # Static assets
├── src/
│   ├── components/      # Demo components
│   ├── schemas/         # Example form schemas
│   ├── styles/          # Custom styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── tailwind.config.js   # Tailwind configuration
└── vite.config.ts       # Vite configuration
```

## Testing

Run the form renderer with different schemas to test:

1. **Field Types**: Verify all field types render correctly
2. **Validation**: Test validation rules and error messages
3. **Layout**: Check responsive behavior and layout options
4. **Submission**: Test form submission and data handling
5. **Accessibility**: Verify keyboard navigation and screen reader support

## Contributing

This demo helps validate the form rendering capabilities. When contributing:

1. Test new field types and configurations
2. Verify accessibility improvements
3. Test responsive behavior on different screen sizes
4. Validate performance with large forms

## Troubleshooting

### Common Issues

**Form not rendering**
- Check the schema structure is valid
- Ensure all required fields are present
- Verify field types are supported

**Validation not working**
- Check validation rules in the schema
- Ensure field IDs are unique
- Verify required fields are marked correctly

**Styling issues**
- Import the CSS: `import '@efie-form/react/styles.css'`
- Check for CSS conflicts
- Verify Tailwind configuration

## License

MIT License - see the [LICENSE](../../../LICENSE) file for details.

## Related

- [Builder Demo](../builder) - Form builder interface
- [Vue Form Demo](../../vue/form) - Vue.js version (coming soon)
- [API Documentation](../../../docs/api-reference.md) - Complete API reference

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
