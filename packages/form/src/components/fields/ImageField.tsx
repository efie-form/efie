import type { ImageFieldProps } from '@efie-form/react/types/FieldProps.ts';

function ImageField({
  src,
  alt,
  textAlign,
  height,
  width,
  objectFit,
}: ImageFieldProps) {
  return <img src={src} width={width} height={height} alt={alt} />;
}

export default ImageField;
