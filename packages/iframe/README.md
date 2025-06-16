# @efie-form/iframe

A standalone iframe-embeddable form builder demo for the [Efie Form](https://github.com/pwkang/efie) ecosystem.

> **📦 Demo Package**: This is a demo application showing how to embed the Efie Form builder in an iframe. It's not published as a package. For production use, consider the framework-specific packages:

## For End Users

- **React**: [@efie-form/react](https://www.npmjs.com/package/@efie-form/react) - React components and hooks
- **Vue**: [@efie-form/vue](https://www.npmjs.com/package/@efie-form/vue) - Vue components and composables  
- **Other Frameworks**: Coming soon

## For Developers

This demo shows how to:
- Embed the form builder in an iframe
- Handle postMessage communication between iframe and parent
- Export and import form schemas

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Key Features
- Cross-origin iframe communication via postMessage API
- Real-time schema export
- Responsive design for various iframe sizes

### Message API Example

```javascript
// Listen for messages from the iframe
window.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'SCHEMA_CHANGED':
      console.log('Form schema updated:', event.data.schema);
      break;
    case 'READY':
      console.log('Form builder is ready');
      break;
  }
});
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.
