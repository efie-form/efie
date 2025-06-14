# useFileDragDrop Hook

A flexible React hook for handling drag and drop file uploads with real-time file type validation and visual feedback.

## Features

- ✅ **Universal File Support**: Handles any file type (images, documents, videos, etc.)
- 🎯 **Flexible Validation**: Supports MIME types, file extensions, and prefixes
- 🔄 **Real-time Feedback**: Validates files during drag operations
- 🎨 **Visual Feedback**: Provides validation state for UI styling
- 📝 **TypeScript Support**: Fully typed with comprehensive interfaces
- 🔧 **Easy Integration**: Drop-in replacement for basic file handling

## Installation

The hook is located at `src/lib/hooks/useFileDragDrop.ts` in the builder package.

## Basic Usage

```typescript
import { useFileDragDrop } from '../lib/hooks/useFileDragDrop';

const MyComponent = () => {
  const { dragActive, isDraggedFileValid, handleDrag, handleDrop, handleFileInputChange } = useFileDragDrop({
    onFileSelect: (file) => {
      console.log('File selected:', file.name);
      // Handle file upload
    },
    acceptedFileTypes: ['image/'] // Accept all image types
  });

  return (
    <div
      className={`drop-zone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {dragActive && isDraggedFileValid === true && (
        <p>✅ Drop to upload</p>
      )}
      {dragActive && isDraggedFileValid === false && (
        <p>❌ Invalid file type</p>
      )}
      {!dragActive && (
        <p>Drag files here</p>
      )}
    </div>
  );
};
```

## API Reference

### Parameters

```typescript
interface UseFileDragDropOptions {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
}
```

- **`onFileSelect`**: Callback function called when a valid file is selected
- **`acceptedFileTypes`** *(optional)*: Array of accepted file types. If empty, accepts all files.

### Return Value

```typescript
interface UseFileDragDropReturn {
  dragActive: boolean;
  isDraggedFileValid: boolean | undefined;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

- **`dragActive`**: Whether a drag operation is currently active
- **`isDraggedFileValid`**: Validation state of the currently dragged file
  - `true`: File is valid
  - `false`: File is invalid
  - `undefined`: No file being dragged or validation pending
- **`handleDrag`**: Handler for drag events (dragenter, dragover, dragleave)
- **`handleDrop`**: Handler for drop events
- **`handleFileInputChange`**: Handler for file input change events

## File Type Validation

The hook supports three validation formats:

### 1. MIME Type Prefixes
```typescript
acceptedFileTypes: ['image/', 'video/', 'audio/']
```
Accepts all files with MIME types starting with the prefix.

### 2. Specific MIME Types
```typescript
acceptedFileTypes: ['image/png', 'application/pdf', 'text/plain']
```
Accepts only exact MIME type matches.

### 3. File Extensions
```typescript
acceptedFileTypes: ['.pdf', '.docx', '.txt', 'csv'] // With or without dots
```
Validates based on file extensions.

### 4. Mixed Validation
```typescript
acceptedFileTypes: ['image/', 'application/pdf', '.txt', 'csv']
```
Combines multiple validation strategies.

## Examples

### Image Upload with Validation Feedback
```typescript
const ImageUploader = () => {
  const { dragActive, isDraggedFileValid, handleDrag, handleDrop } = useFileDragDrop({
    onFileSelect: (file) => uploadImage(file),
    acceptedFileTypes: ['image/']
  });

  return (
    <div
      className={cn('border-2 border-dashed rounded-lg p-8', {
        'border-green-400 bg-green-50': dragActive && isDraggedFileValid,
        'border-red-400 bg-red-50': dragActive && !isDraggedFileValid,
        'border-gray-300': !dragActive,
      })}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* UI content */}
    </div>
  );
};
```

### Document Upload
```typescript
const DocumentUploader = () => {
  const hook = useFileDragDrop({
    onFileSelect: (file) => uploadDocument(file),
    acceptedFileTypes: ['application/pdf', '.docx', '.txt']
  });

  return <DropZone {...hook} />;
};
```

### Accept All Files
```typescript
const UniversalUploader = () => {
  const hook = useFileDragDrop({
    onFileSelect: (file) => uploadFile(file),
    acceptedFileTypes: [] // Empty array accepts all files
  });

  return <DropZone {...hook} />;
};
```

## Integration with File Input

```typescript
const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileInputChange, ...dragProps } = useFileDragDrop({
    onFileSelect: handleFile,
    acceptedFileTypes: ['image/']
  });

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <DropZone 
        {...dragProps} 
        onClick={() => fileInputRef.current?.click()}
      />
    </div>
  );
};
```

## Migration from useImageDragDrop

The new hook is a drop-in replacement:

```typescript
// Old
const { dragActive, handleDrag, handleDrop } = useImageDragDrop({
  onFileSelect: handleFile
});

// New
const { dragActive, isDraggedFileValid, handleDrag, handleDrop } = useFileDragDrop({
  onFileSelect: handleFile,
  acceptedFileTypes: ['image/']
});
```

## Best Practices

1. **Provide Visual Feedback**: Use `isDraggedFileValid` to show validation state
2. **Clear Messaging**: Show different messages for valid/invalid files
3. **Consistent Styling**: Use consistent colors for valid/invalid states
4. **Fallback Input**: Always provide a file input as fallback
5. **Error Handling**: Handle file selection errors gracefully

## Browser Support

The hook works in all modern browsers that support:
- HTML5 Drag and Drop API
- File API
- React 16.8+ (hooks)
