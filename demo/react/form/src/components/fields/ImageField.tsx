import type { ImageFieldProps } from '@efie-form/react';

function ImageField({
  src,
  alt,
  textAlign,
  imageHeight,
  imageWidth,
  objectFit,
}: ImageFieldProps) {
  return (
    <img
      src={src}
      width={imageWidth}
      height={imageHeight}
      alt={alt}
      style={{
        objectFit,
        textAlign,
        display: 'block',
      }}
    />
  );
}

export default ImageField;
