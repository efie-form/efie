import { type ImageFormField, PropertyType } from '@efie-form/core';
import { DEFAULT_IMAGE_URL } from '../../../../lib/constant';
import { getFieldProp } from '../../../../lib/utils';

interface ImageFieldProps {
  field: ImageFormField;
}

function ImageField({ field }: ImageFieldProps) {
  const src = getFieldProp(field, PropertyType.SRC);
  const alt = getFieldProp(field, PropertyType.ALT);

  return (
    <div>
      <img
        src={src?.value || DEFAULT_IMAGE_URL}
        alt={alt?.value}
        className="inline-block w-full text-neutral-800"
      />
    </div>
  );
}

export default ImageField;
