# @efie-form/iframe

A standalone iframe-embeddable form builder demo for [Efie Form](https://github.com/pwkang/efie). This package provides a complete form builder interface that can be embedded in any web application via iframe.

## Features

- 🖼️ **Iframe Embeddable**: Easy integration into any web application
- 🎨 **Standalone Interface**: Complete form builder UI without external dependencies
- 🔄 **Real-time Preview**: Live preview of forms as they're being built
- 💾 **Schema Export**: Export form schemas via postMessage API
- 🌐 **Cross-origin Ready**: Designed for cross-origin iframe communication
- 📱 **Responsive**: Optimized for various iframe sizes

## Usage

### Direct Iframe Embedding

```html
<iframe
  src="https://your-domain.com/iframe-builder"
  width="100%"
  height="600"
  frameborder="0"
  allow="clipboard-write"
></iframe>
```

### PostMessage Communication

The iframe communicates with the parent window using the postMessage API:

```javascript
// Listen for messages from the iframe
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://your-domain.com') return;
  
  switch (event.data.type) {
    case 'SCHEMA_CHANGED':
      console.log('Form schema updated:', event.data.schema);
      break;
      
    case 'FORM_SAVED':
      console.log('Form saved:', event.data.schema);
      // Handle form save
      break;
      
    case 'READY':
      console.log('Form builder is ready');
      // Optionally load existing schema
      event.source.postMessage({
        type: 'LOAD_SCHEMA',
        schema: existingSchema
      }, event.origin);
      break;
  }
});

// Send commands to the iframe
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({
  type: 'LOAD_SCHEMA',
  schema: {
    // Your form schema
  }
}, 'https://your-domain.com');
```

### Available Messages

#### From Parent to Iframe

```typescript
// Load a form schema
{
  type: 'LOAD_SCHEMA',
  schema: FormSchema
}

// Reset the form builder
{
  type: 'RESET'
}

// Trigger save
{
  type: 'SAVE'
}

// Update configuration
{
  type: 'UPDATE_CONFIG',
  config: BuilderConfig
}
```

#### From Iframe to Parent

```typescript
// Builder is ready
{
  type: 'READY'
}

// Schema changed
{
  type: 'SCHEMA_CHANGED',
  schema: FormSchema
}

// Form saved
{
  type: 'FORM_SAVED',
  schema: FormSchema
}

// Field selected
{
  type: 'FIELD_SELECTED',
  fieldId: string | null
}

// Error occurred
{
  type: 'ERROR',
  error: string
}
```

## Development

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Environment Variables

Create a `.env` file for configuration:

```env
# API endpoints (optional)
VITE_API_BASE_URL=https://api.example.com

# Allowed origins for postMessage
VITE_ALLOWED_ORIGINS=https://example.com,https://app.example.com

# Builder configuration
VITE_MAX_HISTORY_STATES=50
VITE_AUTO_SAVE_DELAY=2000
```

### Customization

The iframe can be customized through URL parameters:

```html
<iframe src="https://your-domain.com/iframe-builder?theme=dark&hidePreview=true&maxColumns=3"></iframe>
```

#### Available Parameters

- `theme`: `light` | `dark` - Color theme
- `hidePreview`: `true` | `false` - Hide the preview panel
- `hideToolbar`: `true` | `false` - Hide the toolbar
- `maxColumns`: `number` - Maximum columns in layout
- `allowedFields`: Comma-separated list of allowed field types

## Security Considerations

### Content Security Policy

Ensure your CSP allows iframe embedding:

```http
Content-Security-Policy: frame-ancestors 'self' https://trusted-domain.com;
```

### Origin Validation

Always validate the origin of postMessage events:

```javascript
window.addEventListener('message', (event) => {
  // Validate origin
  const allowedOrigins = ['https://trusted-domain.com'];
  if (!allowedOrigins.includes(event.origin)) {
    return;
  }
  
  // Process message
});
```

### Data Sanitization

Sanitize any data received from the iframe before using it in your application.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Deployment

### Build

```bash
pnpm build
```

### Static Hosting

The built files can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

### Docker

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
