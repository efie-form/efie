import { useState } from 'react';

export interface UseFileDragDropOptions {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
}

export interface UseFileDragDropReturn {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useFileDragDrop({
  onFileSelect,
  acceptedFileTypes = [],
}: UseFileDragDropOptions): UseFileDragDropReturn {
  const [dragActive, setDragActive] = useState(false);

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
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  return {
    dragActive,
    handleDrag,
    handleDrop,
    handleFileInputChange,
  };
}
