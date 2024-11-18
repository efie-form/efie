import type { ImageFieldProps } from '@efie-form/react/types/FieldProps.ts';

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
      }}
    />
  );
}

export default ImageField;
