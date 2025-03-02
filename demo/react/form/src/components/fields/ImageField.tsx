import type { ImageFieldProps } from '@efie-form/react';

function ImageField({
  src,
  alt,
  textAlign,
  height,
  width,
  objectFit,
}: ImageFieldProps) {
  return (
    <img
      src={src}
      width={width}
      height={height}
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
