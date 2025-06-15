# Efie Form

[![GitHub license](https://img.shields.io/github/license/pwkang/efie)](https://github.com/pwkang/efie/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@efie-form/core)](https://www.npmjs.com/package/@efie-form/core)
[![GitHub issues](https://img.shields.io/github/issues/pwkang/efie)](https://github.com/pwkang/efie/issues)

A framework-agnostic form builder package for creating dynamic forms in any JavaScript environment, including React, Vue, and more. It provides both a visual form builder and headless rendering capabilities for maximum customization.

## Description

Efie Form simplifies the process of building and managing forms in your web applications. It offers a declarative way to define form structures and handles form rendering, validation, and submission. Its framework-agnostic design allows you to use it in any JavaScript project, regardless of the framework you're using. The headless rendering capability gives you complete control over the form's appearance and behavior, enabling you to tailor it to your specific design requirements.

## Features

- 🧩 **Visual Form Builder**: Drag-and-drop interface for creating forms with real-time preview
- 📝 **Headless Form Rendering**: Render forms created with the form builder in any framework
- 🔌 **Extensible Architecture**: Customize form fields with your own components
- 🎨 **Themeable**: Style forms to match your application's design system
- 🌐 **Responsive Design**: Works seamlessly on all screen sizes
- 🧰 **Rich Field Types**: Support for text, number, date, file, select, checkbox, radio, and more
- 🔄 **Undo/Redo**: Full undo/redo functionality with configurable history limit
- 💾 **Schema Export/Import**: Save and load form schemas as JSON
- 🎯 **TypeScript Support**: Comprehensive TypeScript definitions for type safety
- 🏗️ **Layout System**: Advanced layout capabilities with blocks, rows, and columns

## Packages

This is a monorepo containing the following packages:

- **[@efie-form/core](./packages/core)**: Core functionality and utilities used by all framework implementations
- **[@efie-form/builder](./packages/builder)**: The visual form builder implementation with drag-and-drop interface
- **[@efie-form/react](./packages/react)**: React components for form building and rendering
- **[@efie-form/vue](./packages/vue)**: Vue components for form building and rendering (coming soon)

## Quick Start

### Installation

```bash
# For React applications
npm install @efie-form/react @efie-form/builder

# For Vue applications (coming soon)
npm install @efie-form/vue @efie-form/builder

# For framework-agnostic usage
npm install @efie-form/core
```

### Basic Usage with React

```tsx
import React from 'react';
import { FormBuilder } from '@efie-form/builder';
import { Form } from '@efie-form/react';

// Form Builder Component
function MyFormBuilder() {
  const handleSave = (schema) => {
    console.log('Form schema:', schema);
    // Save schema to your backend
  };

  return (
    <FormBuilder
      onSave={handleSave}
      // Optional: Load existing schema
      // initialSchema={existingSchema}
    />
  );
}

// Form Renderer Component
function MyForm({ schema }) {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}
```

See individual package READMEs for detailed documentation and examples.

## Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Form Schema Documentation](./docs/schema.md)
- [CI/CD Documentation](./docs/ci-cd.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Development

This project uses a monorepo structure managed with [pnpm workspaces](https://pnpm.io/workspaces) and [Nx](https://nx.dev/).

### Prerequisites

- Node.js 18 or higher
- pnpm 8 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/pwkang/efie.git
cd efie

# Install dependencies
pnpm install

# Start the development server (form builder demo)
pnpm dev

# Start React builder demo
pnpm dev:react-builder-demo
```

### Available Scripts

```bash
# Development
pnpm dev                    # Start iframe demo server
pnpm dev:react-builder-demo # Start React builder demo
pnpm tw                     # Start Tailwind CSS watcher

# Testing
pnpm test                   # Run all tests
pnpm test:builder           # Run builder package tests
pnpm test:coverage          # Run tests with coverage

# Linting
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix ESLint issues

# Building
pnpm build                  # Build all packages
pnpm build:packages         # Build only packages (exclude demos)

# Release
pnpm changeset              # Create a changeset
pnpm version-packages       # Version packages
pnpm release                # Build and publish packages
```

### Project Structure

```
efie/
├── packages/
│   ├── core/               # Core utilities and types
│   ├── builder/            # Visual form builder
│   ├── react/              # React components
│   ├── vue/                # Vue components (coming soon)
│   └── iframe/             # Iframe demo
├── demo/
│   ├── react/              # React demos
│   └── vue/                # Vue demos
├── docs/                   # Documentation
└── scripts/                # Build and utility scripts
```

## Testing

The project uses Jest for testing with comprehensive coverage reporting:

- **Unit Tests**: Components and utilities are thoroughly tested
- **Integration Tests**: End-to-end form building and rendering scenarios
- **Coverage Reports**: Automated coverage reporting with Codecov integration

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Submitting pull requests
- Coding standards and conventions

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Tests**: Automated testing on Node.js 18 and 20
- **Linting**: ESLint checks on all pull requests
- **Coverage**: Coverage reports uploaded to Codecov
- **Build**: Automated builds for all packages
- **Release**: Automated package publishing with changesets

## Community

- [GitHub Issues](https://github.com/pwkang/efie/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/pwkang/efie/discussions) - Community discussions and Q&A

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
- Drag and drop functionality powered by [@dnd-kit](https://dndkit.com/)
- Monorepo managed with [Nx](https://nx.dev/) and [pnpm](https://pnpm.io/)
