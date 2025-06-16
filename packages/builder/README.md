# @efie-form/builder

[![Version](https://img.shields.io/npm/v/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)
[![License](https://img.shields.io/npm/l/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)
[![Downloads](https://img.shields.io/npm/dm/@efie-form/builder.svg?style=flat-square)](https://npmjs.com/package/@efie-form/builder)

Internal form builder package for the [Efie Form](https://github.com/pwkang/efie) ecosystem.

> **⚠️ Internal Package**: This package contains internal builder logic and components. **Do not install this package directly**. Instead, use the framework-specific packages:

## For End Users

- **React**: [@efie-form/react](https://www.npmjs.com/package/@efie-form/react) - Complete React integration with form builder
- **Vue**: [@efie-form/vue](https://www.npmjs.com/package/@efie-form/vue) - Vue components and composables  
- **Other Frameworks**: Coming soon

## For Maintainers

This package provides the visual form builder component used internally by framework-specific packages.

### Key Components
- `FormBuilder` - Main visual form builder component
- `useSchemaStore` - Zustand store for form schema management  
- `useSettingsStore` - Zustand store for builder settings

### Development
- Built with React, TypeScript, and Tailwind CSS
- Uses Zustand for state management
- Comprehensive test coverage with Jest

### Documentation
- [Zustand Reactive Patterns](docs/zustand-reactive-patterns.md) - State management patterns used in the builder
- [Demo Applications](../../demo/react/builder) - Usage examples for development

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.
