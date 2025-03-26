import {
  PropertyType,
  textAlignToStyle,
  widthToStyle,
  type ImageFormField,
} from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { DEFAULT_IMAGE_URL } from '../../../../lib/constant';
interface ImageFieldProps {
  field: ImageFormField;
}

function ImageField({ field }: ImageFieldProps) {
  const { getFieldProps } = useSchemaStore();
  const textAlign = getFieldProps(field.id, PropertyType.TEXT_ALIGN);
  const src = getFieldProps(field.id, PropertyType.SRC);
  const alt = getFieldProps(field.id, PropertyType.ALT);
  const width = getFieldProps(field.id, PropertyType.WIDTH);
  const objectFit = getFieldProps(field.id, PropertyType.OBJECT_FIT);

  return (
    <div
      style={{
        textAlign: textAlignToStyle(textAlign),
      }}
    >
      <img
        src={src?.value || DEFAULT_IMAGE_URL}
        alt={alt?.value}
        className="text-neutral-800 inline-block"
        style={{
          width: widthToStyle(width),
          objectFit: objectFit?.value,
        }}
      />
    </div>
  );
}

export default ImageField;
