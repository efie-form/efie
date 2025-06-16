# Efie Form

[![GitHub license](https://img.shields.io/github/license/efie-form/efie)](https://github.com/pwkang/efie/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/efie-form)](https://www.npmjs.com/package/@efie-form/core)

A powerful, framework-agnostic form builder that lets you create dynamic forms visually and render them in any JavaScript environment. Build once, use everywhere.

## Features

### 🎨 Visual Form Builder

- **Drag-and-Drop Interface**: Intuitive visual editor for creating forms without code
- **Real-Time Preview**: See your forms as you build them
- **Rich Field Types**: Text, number, date, file, select, checkbox, radio, and more
- **Advanced Layout System**: Organize fields with blocks, rows, and columns
- **Undo/Redo Support**: Full history management with configurable limits

### 🔧 Headless Rendering

- **Framework Agnostic**: Use with React, Vue, Angular, or vanilla JavaScript
- **Complete Customization**: Full control over appearance and behavior
- **Schema-Driven**: Export and import form configurations as JSON
- **Type Safety**: Comprehensive TypeScript support

### 🎯 Developer Experience

- **Extensible Architecture**: Create custom field types and components
- **Themeable**: Style forms to match your design system
- **Responsive Design**: Works seamlessly across all screen sizes
- **Modern Tooling**: Built with TypeScript, Tailwind CSS, and modern development practices

## Supported Frameworks

| Framework   | Status       | Package                |
|-------------|--------------|------------------------|
| **React**   | ✅ Available | `@efie-form/react`     |
| **Vue**     | 🚧 Coming Soon | `@efie-form/vue`      |
| **Angular** | 🚧 Coming Soon   | `@efie-form/angular`   |
| **Vanilla JS** | 🚧 Coming Soon | `@efie-form/vanilla`     |

## Quick Start

### Installation

For most users, install the framework-specific package:

```bash
# React users
npm install @efie-form/react

# Vue users (coming soon)
npm install @efie-form/vue

# Angular users (coming soon)
npm install @efie-form/angular

# Vanilla JS users (coming soon)
npm install @efie-form/vanilla
```

> **Note**: `@efie-form/core` and `@efie-form/builder` are internal packages used by the framework integrations. You typically don't need to install them directly unless you're building custom framework integrations or need access to lower-level APIs.

### Documentation

See individual package READMEs for detailed documentation and examples.

- [React](https://www.npmjs.com/package/@efie-form/react)
- Vue (coming soon)
- Angular (coming soon)
- Vanilla JS (coming soon)

## Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Form Schema Documentation](./docs/schema.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

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
