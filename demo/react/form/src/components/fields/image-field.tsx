import type { ImageFieldProps } from '@efie-form/react';

function ImageField({
  src,
  alt,
}: ImageFieldProps) {
  return (
    <img
      src={src}
      alt={alt}
      width="100%"
      height="auto"
      style={{
        display: 'block',
      }}
    />
  );
}

export default ImageField;
