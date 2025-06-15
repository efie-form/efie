# @efie-form/efie-form

[![Version](https://img.shields.io/npm/v/@efie-form/efie-form.svg?style=flat-square)](https://npmjs.com/package/@efie-form/efie-form)
[![License](https://img.shields.io/npm/l/@efie-form/efie-form.svg?style=flat-square)](https://npmjs.com/package/@efie-form/efie-form)

> **Deprecated**: This package has been restructured into separate framework-specific packages. Please use the new packages instead.

## Migration Guide

This package has been split into multiple focused packages for better maintainability and framework-specific optimizations:

### New Packages

- **[@efie-form/core](../core)**: Core utilities and types (framework-agnostic)
- **[@efie-form/builder](../builder)**: Visual form builder component
- **[@efie-form/react](../react)**: React components for form building and rendering
- **[@efie-form/vue](../vue)**: Vue components (coming soon)

### How to Migrate

If you were using this package, please migrate to the appropriate framework-specific package:

#### For React Applications

```bash
# Remove old package
npm uninstall @efie-form/efie-form

# Install new packages
npm install @efie-form/react @efie-form/builder
```

#### For Vue Applications (Coming Soon)

```bash
# Remove old package
npm uninstall @efie-form/efie-form

# Install new packages
npm install @efie-form/vue @efie-form/builder
```

#### For Framework-Agnostic Usage

```bash
# Remove old package
npm uninstall @efie-form/efie-form

# Install core package
npm install @efie-form/core
```

### Breaking Changes

- Package structure has been completely reorganized
- Import paths have changed
- Some API methods may have been renamed or moved

### Support

This package will no longer receive updates. Please migrate to the new packages for:

- Bug fixes
- New features
- Security updates
- Community support

For help with migration, please:

1. Check the new package documentation
2. Open an issue in the [main repository](https://github.com/pwkang/efie/issues)
3. Ask questions in [GitHub Discussions](https://github.com/pwkang/efie/discussions)

## License

MIT License - see the [LICENSE](LICENSE) file for details.
