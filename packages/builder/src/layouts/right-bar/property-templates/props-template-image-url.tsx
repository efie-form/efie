import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineImage } from 'react-icons/md';
import { useFileDragDrop } from '../../../lib/hooks/use-file-drag-drop';
import { getImageFileInfo } from './utils-image-info';
import { cn } from '../../../lib/utils';

interface PropsTemplateImageUrlProps {
  value?: string;
  onChange: (newValue: string) => void;
  label: string;
  placeholder?: string;
}

export default function PropsTemplateImageUrl({
  label,
  placeholder,
  value,
  onChange,
}: PropsTemplateImageUrlProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>();
  const dimensionString = imageDimensions
    ? `${imageDimensions.width} × ${imageDimensions.height}`
    : undefined;
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number }>();

  // Helper handlers for drag events to allow multiple statements
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrag(e);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrag(e);
  };
  const handleDropWithHover = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrop(e);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setImageError(false);
    // setIsLoading(false);
  };

  const handleFileSelect = (file: File) => {
    // Store file information
    setFileInfo({
      name: file.name,
      size: file.size,
    });

    // TODO: Implement S3 upload functionality
    // For now, create a local URL for preview
    const localUrl = URL.createObjectURL(file);
    handleChange(localUrl);
  };

  const { handleDrag, handleDrop, handleFileInputChange, dragActive, isDraggedFileValid } = useFileDragDrop({
    onFileSelect: handleFileSelect,
    acceptedFileTypes: ['image/'], // Only accept image files for this component
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Check image size
  const checkImageSize = (url: string) => {
    const img = new globalThis.Image();
    img.addEventListener('load', () => {
      setImageDimensions({ width: img.width, height: img.height });
    });
    img.addEventListener('error', () => {
      setImageError(true);
      setImageDimensions(undefined);
    });
    img.src = url;
  };

  // Effect: when value changes and is a URL, fetch image info
  useEffect(() => {
    if (!value) return;
    const fetchInfo = async () => {
      try {
        const info = await getImageFileInfo(value, fileInfo);
        if (info) {
          setFileInfo({ name: info.name, size: info.size });
          setImageDimensions(info.dimensions);
        }
        else {
          setFileInfo(undefined);
          setImageDimensions(undefined);
        }
      }
      catch {
        setFileInfo(undefined);
        setImageDimensions(undefined);
      }
    };
    fetchInfo();
  }, [value]);

  const hasImage = value && value.trim() && !imageError;

  return (
    <SettingsFieldVertical label={label} divider>
      <div className="flex flex-col gap-2">
        {/* Input field below preview/info */}
        <Input
          placeholder={placeholder || 'Enter image URL...'}
          value={value}
          onChange={handleChange}
          className="w-full min-w-0"
        />
        {/* Preview, upload, file info, and dimensions in a single box */}
        <div
          className={cn(
            'flex items-center group gap-3 border border-dashed rounded-lg p-2 bg-neutral-50 relative cursor-pointer',
            'hover:border-primary hover:bg-primary-300/10 transition-colors duration-200',
            // isHovered && 'border-primary-400',
            // imageError && 'border-danger-400',
            // hasImage && !imageError && 'border-success-400',
            // !isHovered && !imageError && !(hasImage && !imageError) && 'border-neutral-200',
            {
              'border-danger-400 bg-danger-50/20': dragActive && !isDraggedFileValid,
              'border-success-400 bg-success-50/20': dragActive && isDraggedFileValid,
            },
          )}
          onClick={handleUploadClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDrag}
          onDrop={handleDropWithHover}
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          {/* Preview */}
          {hasImage && (
            <div className="grid grid-cols-3">
              <div
                className="resize flex items-center justify-center bg-neutral-100/30 border border-neutral-200 rounded aspect-square p-1"
              >
                <img
                  src={value}
                  alt="Preview"
                  className="object-contain max-w-full max-h-full"
                  onLoad={() => checkImageSize(value)}
                  onError={() => setImageError(true)}
                  draggable={false}
                />
              </div>
              <div className="col-span-2 px-2 flex flex-col justify-center">
                {fileInfo && (
                  <p className="truncate text-xs text-neutral-800 font-medium" title={fileInfo.name}>{fileInfo.name}</p>
                )}
                {!!fileInfo && fileInfo.size > 0 && (
                  <p className="text-xs text-neutral-500 truncate" title={formatFileSize(fileInfo.size)}>
                    {formatFileSize(fileInfo.size)}
                  </p>
                )}
                {/* Image dimensions (right aligned) */}
                {hasImage && imageDimensions && (
                  <p className="text-xs text-neutral-400">
                    {dimensionString}
                  </p>
                )}
              </div>
            </div>
          )}
          {!hasImage && (
            <div className="py-2 text-center w-full">
              <div className="flex justify-center">
                <MdOutlineImage
                  size={64}
                  className={cn('text-neutral-200 mb-2 group-hover:text-primary-300',
                    {
                      'text-danger-400': dragActive && !isDraggedFileValid,
                      'text-success-200': dragActive && isDraggedFileValid,
                    },
                  )}
                />
              </div>
              <p className={cn(
                'typography-body3 text-neutral-600 font-medium',
                'group-hover:text-primary-400',
                {
                  'text-danger-600': dragActive && !isDraggedFileValid,
                  'text-success-600': dragActive && isDraggedFileValid,
                })}
              >
                Click or drag to upload
              </p>
              <p className={cn(
                'typography-body4 text-neutral-400',
                'group-hover:text-primary-300',
                {
                  'text-danger': dragActive && !isDraggedFileValid,
                  'text-success': dragActive && isDraggedFileValid,
                })}
              >
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
          {dragActive && !isDraggedFileValid && (
            <div className="absolute inset-0 bg-danger-100/30 border border-danger-400 rounded-lg flex items-center justify-center">
            </div>
          )}
        </div>
      </div>
    </SettingsFieldVertical>
  );
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
