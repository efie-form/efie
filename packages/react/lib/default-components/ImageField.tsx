import type { ImageFieldProps } from '../../types/FieldProps';

/**
 * Default Image Field component
 * 
 * An image element
 */
function ImageField({
  id,
  src,
  alt,
  objectFit,
  textAlign,
  width,
  height,
}: ImageFieldProps) {
  const containerStyle = {
    textAlign,
  };

  const imageStyle = {
    objectFit,
    width,
    height,
  };

  return (
    <div id={id} style={containerStyle} className="efie-field-image-container">
      <img
        src={src}
        alt={alt}
        style={imageStyle}
        className="efie-field-image"
      />
    </div>
  );
}

export default ImageField;
