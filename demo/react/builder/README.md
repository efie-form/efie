# React Form Builder Demo

A demonstration application showcasing the [@efie-form/builder](../../../packages/builder) and [@efie-form/react](../../../packages/react) packages in action.

## Features

- 🎨 **Visual Form Builder**: Full-featured drag-and-drop form builder interface
- 📱 **Responsive Design**: Optimized for desktop and mobile devices  
- 🔄 **Real-time Preview**: See form changes instantly as you build
- 💾 **Schema Export/Import**: Save and load form schemas as JSON
- 🎯 **Form Rendering**: Render built forms with the React renderer
- 🧪 **Testing Ground**: Perfect for testing new features and capabilities

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# From the project root
pnpm install

# Or install dependencies for this demo specifically
cd demo/react/builder
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Or from the project root
pnpm dev:react-builder-demo
```

The demo will be available at `http://localhost:5173`

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Usage Guide

### 1. Building Forms

1. **Drag Fields**: Drag field types from the sidebar to the canvas
2. **Configure Properties**: Click on fields to edit their properties in the right panel
3. **Arrange Layout**: Organize fields using the layout system (blocks, rows, columns)
4. **Preview**: Use the preview toggle to see how your form will look to users

### 2. Field Types

The demo includes all supported field types:
- Text inputs (text, email, password, url, tel)
- Numbers and ranges
- Dates and times
- Selections (select, radio, checkbox)
- File uploads
- Text areas

### 3. Advanced Features

- **Undo/Redo**: Use Ctrl+Z / Ctrl+Y or the toolbar buttons
- **Form Settings**: Configure form title, description, and submission settings
- **Schema Export**: Download form schemas as JSON files
- **Schema Import**: Load existing schemas from JSON files

## Code Examples

### Basic Form Builder Setup

```tsx
import React, { useRef } from 'react';
import { FormBuilder, FormBuilderRef } from '@efie-form/builder';
import '@efie-form/builder/styles.css';

function App() {
  const builderRef = useRef<FormBuilderRef>(null);

  const handleSave = () => {
    const schema = builderRef.current?.getSchema();
    console.log('Form schema:', schema);
  };

  return (
    <div className="app">
      <header>
        <button onClick={handleSave}>Save Form</button>
      </header>
      
      <FormBuilder
        ref={builderRef}
        onSchemaChange={(schema) => {
          console.log('Schema updated:', schema);
        }}
      />
    </div>
  );
}
```

### Form Rendering

```tsx
import React from 'react';
import { Form } from '@efie-form/react';

function FormRenderer({ schema }) {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      config={{
        showRequiredIndicator: true,
        validateOnBlur: true
      }}
    />
  );
}
```

## Customization

### Styling

The demo uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the `tailwind.config.js` file
2. Adding custom CSS in `src/index.css`
3. Using CSS variables for theme customization

### Configuration

Environment variables can be set in `.env.local`:

```env
# API endpoints
VITE_API_BASE_URL=http://localhost:3000

# Feature flags
VITE_ENABLE_PREVIEW=true
VITE_ENABLE_EXPORT=true
```

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **@efie-form/builder**: Form builder core
- **@efie-form/react**: React form components

## File Structure

```
demo/react/builder/
├── public/              # Static assets
├── src/
│   ├── components/      # Demo-specific components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── package.json
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Contributing

This demo serves as both a showcase and a testing ground for new features. When contributing:

1. Test new features in this demo first
2. Update the demo when adding new field types or capabilities
3. Ensure the demo works on all supported browsers
4. Add examples for new APIs or configuration options

## Troubleshooting

### Common Issues

**Form builder not loading**
- Check browser console for errors
- Ensure all dependencies are installed
- Verify Node.js version (18+)

**Styles not applied correctly**
- Make sure to import the CSS: `import '@efie-form/builder/styles.css'`
- Check for conflicting CSS rules

**TypeScript errors**
- Ensure TypeScript version compatibility
- Check that all type definitions are up to date

## License

MIT License - see the [LICENSE](../../../LICENSE) file for details.

## Related

- [Form Demo](../form) - Demonstrates form rendering
- [Vue Builder Demo](../../vue/builder) - Vue.js version
- [Main Documentation](../../../README.md) - Full project documentation

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
