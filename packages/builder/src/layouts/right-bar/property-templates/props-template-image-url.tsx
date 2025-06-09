import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsImageUrl } from '../../../types/prop-settings.type';
import { useCallback, useRef, useState } from 'react';
import { isStringValue, type PropertyDefinition } from '@efie-form/core';
import { MdOutlineCloudUpload, MdOutlineImage, MdDelete } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { cn } from '../../../lib/utils';

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
  const [dragActive, setDragActive] = useState(false);
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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    }
    else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, [handleFileSelect]);

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
        {/* URL Input */}
        <Input
          placeholder={placeholder || 'Enter image URL...'}
          value={value}
          onChange={handleChange}
        />

        {/* Upload/Drop Zone */}
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
            {
              'border-primary-400 bg-primary-50': dragActive,
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
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <MdOutlineCloudUpload size={24} className="text-gray-600" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleRemoveImage}
                className="mt-2 flex items-center gap-2 text-red-500 hover:text-red-600 typography-body4 transition-colors"
              >
                <MdDelete size={16} />
                <span>Remove image</span>
              </button>
            </>
          )}
          {!hasImage && (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <FaImage size={32} className="text-neutral-400 mb-2" />
              <p className="text-neutral-600 typography-body3 text-center mb-1">
                Click to upload or drag & drop
              </p>
              <p className="text-neutral-400 typography-body4 text-center">
                PNG, JPG, GIF up to 10MB
              </p>
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
