// Example usage of useFileDragDrop hook with different file types and validation feedback

import { useFileDragDrop } from './useFileDragDrop';

// Example 1: Accept only images with validation feedback
export const useImageDragDropWithFeedback = () => {
  const { dragActive, isDraggedFileValid, handleDrag, handleDrop, handleFileInputChange } = useFileDragDrop({
    onFileSelect: (file) => {
      console.log('Image selected:', file.name, file.type);
      // Handle image upload
    },
    acceptedFileTypes: ['image/'], // Accepts image/png, image/jpeg, image/gif, etc.
  });

  // You can use the validation state to provide user feedback
  const getDropZoneMessage = () => {
    if (!dragActive) {
      return 'Drag & drop an image here';
    }
    if (isDraggedFileValid === true) {
      return '✅ Drop to upload image';
    }
    if (isDraggedFileValid === false) {
      return '❌ Only image files are allowed';
    }
    return 'Drop file here';
  };

  return {
    dragActive,
    isDraggedFileValid,
    handleDrag,
    handleDrop,
    handleFileInputChange,
    message: getDropZoneMessage(),
  };
};

// Example 2: Accept specific document types
export const useDocumentDragDrop = () => {
  return useFileDragDrop({
    onFileSelect: (file) => {
      console.log('Document selected:', file.name);
      // Handle document upload
    },
    acceptedFileTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.txt',
      '.md',
    ],
  });
};

// Example 3: Accept media files (video and audio)
export const useMediaDragDrop = () => {
  return useFileDragDrop({
    onFileSelect: (file) => {
      console.log('Media file selected:', file.name);
      // Handle media upload
    },
    acceptedFileTypes: ['video/', 'audio/'], // Accepts all video and audio types
  });
};

// Example 4: Accept specific file extensions
export const useCodeDragDrop = () => {
  return useFileDragDrop({
    onFileSelect: (file) => {
      console.log('Code file selected:', file.name);
      // Handle code file upload
    },
    acceptedFileTypes: ['.js', '.ts', '.tsx', '.jsx', '.py', '.java', '.cpp'],
  });
};

// Example 5: Accept all file types
export const useAnyFileDragDrop = () => {
  return useFileDragDrop({
    onFileSelect: (file) => {
      console.log('File selected:', file.name);
      // Handle any file upload
    },
    acceptedFileTypes: [], // Empty array accepts all file types
  });
};

// Example 6: Mixed file type validation
export const useMixedDragDrop = () => {
  return useFileDragDrop({
    onFileSelect: (file) => {
      console.log('Mixed file selected:', file.name);
      // Handle mixed file types
    },
    acceptedFileTypes: [
      'image/', // All images
      'application/pdf', // Specific PDF type
      '.txt', // Text files by extension
      'csv', // CSV files (without dot)
    ],
  });
};
