import {
  PropertyType,
  textAlignToStyle,
  widthToStyle,
  type ImageFormField,
} from '@efie-form/core';
import { DEFAULT_IMAGE_URL } from '../../../../lib/constant';
import { getFieldProp } from '../../../../lib/utils';
interface ImageFieldProps {
  field: ImageFormField;
}

function ImageField({ field }: ImageFieldProps) {
  const textAlign = getFieldProp(field, PropertyType.TEXT_ALIGN);
  const src = getFieldProp(field, PropertyType.SRC);
  const alt = getFieldProp(field, PropertyType.ALT);
  const width = getFieldProp(field, PropertyType.WIDTH);
  const objectFit = getFieldProp(field, PropertyType.OBJECT_FIT);

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
          width: widthToStyle(width?.value),
          objectFit: objectFit?.value,
        }}
      />
    </div>
  );
}

export default ImageField;
