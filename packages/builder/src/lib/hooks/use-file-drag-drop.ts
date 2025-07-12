import { useState } from 'react';

export interface UseFileDragDropOptions {
  /** Callback function called when a valid file is selected */
  onFileSelect: (file: File) => void;
  /**
   * Array of accepted file types. Can be:
   * - MIME type prefixes (e.g., 'image/', 'video/', 'audio/')
   * - Specific MIME types (e.g., 'image/png', 'application/pdf')
   * - File extensions (e.g., '.pdf', '.txt', 'pdf', 'txt')
   * If empty array, accepts all file types
   */
  acceptedFileTypes?: string[];
}

export interface UseFileDragDropReturn {
  /** Whether a drag operation is currently active */
  dragActive: boolean;
  /** Whether the currently dragged file(s) are valid according to acceptedFileTypes */
  isDraggedFileValid: boolean | undefined;
  /** Handler for drag events (dragenter, dragover, dragleave) */
  handleDrag: (e: React.DragEvent) => void;
  /** Handler for drop events */
  handleDrop: (e: React.DragEvent) => void;
  /** Handler for file input change events */
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Hook for handling drag and drop file uploads with flexible file type validation
 * and real-time feedback about dragged file validity
 *
 * @example
 * // Accept only images with validation feedback
 * const { dragActive, isDraggedFileValid, handleDrag, handleDrop } = useFileDragDrop({
 *   onFileSelect: (file) => console.log('Image selected:', file),
 *   acceptedFileTypes: ['image/']
 * });
 *
 * // Use validation state for UI feedback
 * if (dragActive && isDraggedFileValid === true) {
 *   // Show "valid file" styling
 * } else if (dragActive && isDraggedFileValid === false) {
 *   // Show "invalid file" styling
 * }
 *
 * @example
 * // Accept specific file types
 * const hook = useFileDragDrop({
 *   onFileSelect: handleFile,
 *   acceptedFileTypes: ['application/pdf', '.docx', 'txt']
 * });
 *
 * @example
 * // Accept all file types
 * const hook = useFileDragDrop({
 *   onFileSelect: handleFile,
 *   acceptedFileTypes: []
 * });
 */

export function useFileDragDrop({
  onFileSelect,
  acceptedFileTypes = [],
}: UseFileDragDropOptions): UseFileDragDropReturn {
  const [dragActive, setDragActive] = useState(false);
  const [isDraggedFileValid, setIsDraggedFileValid] = useState<boolean>();

  const isValidFileType = (file: File): boolean => {
    // If no file types specified, accept all files
    if (acceptedFileTypes.length === 0) {
      return true;
    }

    // Check if file type matches any of the accepted types
    return acceptedFileTypes.some((type) => {
      // Handle MIME type prefixes (e.g., 'image/', 'video/')
      if (type.endsWith('/')) {
        return file.type.startsWith(type);
      }
      // Handle specific MIME types (e.g., 'image/png', 'application/pdf')
      if (type.includes('/')) {
        return file.type === type;
      }
      // Handle file extensions (e.g., '.pdf', '.txt', 'pdf', 'txt')
      const extension = type.startsWith('.') ? type : `.${type}`;
      return file.name.toLowerCase().endsWith(extension.toLowerCase());
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);

      // Check if the dragged files are valid
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setIsDraggedFileValid(isValidFileType(file));
      }
      else if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        // During dragover, files might not be available, but we can check items
        const item = e.dataTransfer.items[0];
        if (item.kind === 'file') {
          // We can't fully validate without the actual file, but we can check MIME type
          const isValid = acceptedFileTypes.length === 0
            || acceptedFileTypes.some((type) => {
              if (type.endsWith('/')) {
                return item.type.startsWith(type);
              }
              if (type.includes('/')) {
                return item.type === type;
              }
              // Can't validate extensions without filename during dragover
              return false;
            });
          setIsDraggedFileValid(isValid);
        }
      }
    }
    else if (e.type === 'dragleave') {
      setDragActive(false);
      setIsDraggedFileValid(undefined);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setIsDraggedFileValid(undefined);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  return {
    dragActive,
    isDraggedFileValid,
    handleDrag,
    handleDrop,
    handleFileInputChange,
  };
}
