import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsImageUrl } from '../../../types/prop-settings.type';
import { useCallback, useRef, useState } from 'react';
import { isStringValue, type PropertyDefinition } from '@efie-form/core';
import { MdDelete, MdOutlineImage } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { cn } from '../../../lib/utils';
import { useFileDragDrop } from '../../../lib/hooks/useFileDragDrop';

interface PropsTemplateImageUrlProps extends PropSettingsImageUrl {
  fieldId: string;
}

export default function PropsTemplateImageUrl({
  label,
  placeholder,
  type,
  fieldId,
}: PropsTemplateImageUrlProps) {
  const fieldProperty = useSchemaStore(
    useCallback(
      state => state.getFieldProperty(fieldId, type),
      [fieldId, type],
    ),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>();

  const handleChange = useCallback((newValue: string) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
    setImageError(false);
    setIsLoading(false);
  }, [fieldId, type, updateFieldProperty]);

  const handleFileSelect = useCallback((file: File) => {
    // TODO: Implement S3 upload functionality
    // For now, create a local URL for preview
    const localUrl = URL.createObjectURL(file);
    handleChange(localUrl);
  }, [handleChange]);

  const { dragActive, isDraggedFileValid, handleDrag, handleDrop, handleFileInputChange } = useFileDragDrop({
    onFileSelect: handleFileSelect,
    acceptedFileTypes: ['image/'], // Only accept image files for this component
  });

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    handleChange('');
  }, [handleChange]);

  // Check image size
  const checkImageSize = (url: string) => {
    setIsLoading(true);
    const img = new globalThis.Image();
    img.addEventListener('load', () => {
      setImageDimensions({ width: img.width, height: img.height });
      setIsLoading(false);
    });
    img.addEventListener('error', () => {
      setIsLoading(false);
      setImageError(true);
      setImageDimensions(undefined);
    });
    img.src = url;
  };

  const hasImage = value && value.trim() && !imageError;

  return (
    <SettingsFieldVertical label={label} divider>
      <div className="space-y-3">
        <div className="flex gap-2">
          {/* URL Input */}
          <Input
            placeholder={placeholder || 'Enter image URL...'}
            value={value}
            onChange={handleChange}
          />
          {hasImage
            && (
              <button
                onClick={handleRemoveImage}
                className="flex items-center gap-2 text-danger hover:text-danger-600 typography-body4 transition-colors"
              >
                <MdDelete size={16} />
              </button>
            )}
        </div>

        {/* Upload/Drop Zone */}
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
            {
              'border-primary-400 bg-primary-50': dragActive && isDraggedFileValid === true,
              'border-danger-400 bg-danger-50': dragActive && isDraggedFileValid === false,
              'border-neutral-400 bg-neutral-50': dragActive && isDraggedFileValid === undefined,
              'border-neutral-300 hover:border-neutral-400': !dragActive,
            },
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={hasImage ? undefined : handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {hasImage && (
            <>
              <div className="relative group cursor-pointer" onClick={handleUploadClick}>
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded-lg p-2"
                  onLoad={() => checkImageSize(value)}
                  onError={() => setImageError(true)}
                />
              </div>
            </>
          )}
          {!hasImage && (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <FaImage size={32} className="text-neutral-400 mb-2" />
              {dragActive && isDraggedFileValid === true && (
                <p className="text-primary-600 typography-body3 text-center mb-1">
                  ✅ Drop to upload image
                </p>
              )}
              {dragActive && isDraggedFileValid === false && (
                <p className="text-red-600 typography-body3 text-center mb-1">
                  ❌ Only image files are allowed
                </p>
              )}
              {!dragActive && (
                <>
                  <p className="text-neutral-600 typography-body3 text-center mb-1">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-neutral-400 typography-body4 text-center">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Image Status/Info */}
        {isLoading && (
          <div className="flex items-center gap-2 text-neutral-500 typography-body4">
            <MdOutlineImage size={16} />
            <span>Loading image...</span>
          </div>
        )}

        {imageError && (
          <div className="flex items-center gap-2 text-danger typography-body4">
            <MdOutlineImage size={16} />
            <span>Failed to load image</span>
          </div>
        )}

        {!isLoading && !imageError && hasImage && (
          <div className="flex items-center gap-2 text-success typography-body4">
            <MdOutlineImage size={16} />
            <span>Image loaded successfully</span>
            {imageDimensions && (
              <span className="ml-2 text-xs text-neutral-500">
                {imageDimensions.width}
                {' × '}
                {imageDimensions.height}
                px
              </span>
            )}
          </div>
        )}
      </div>
    </SettingsFieldVertical>
  );
}

const getValue = (props?: PropertyDefinition) => {
  if (!isStringValue(props)) return '';
  return props.value;
};
