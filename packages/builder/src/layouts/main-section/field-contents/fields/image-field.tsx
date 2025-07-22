import {
  PropertyType,
  type ImageFormField,
} from '@efie-form/core';
import { DEFAULT_IMAGE_URL } from '../../../../lib/constant';
import { getFieldProp } from '../../../../lib/utils';
interface ImageFieldProps {
  field: ImageFormField;
}

function ImageField({ field }: ImageFieldProps) {
  const src = getFieldProp(field, PropertyType.IMAGE_SRC);

  return (
    <div>
      <img
        src={src?.value || DEFAULT_IMAGE_URL}
        alt=""
        className="text-neutral-800 inline-block w-full"
      />
    </div>
  );
}

export default ImageField;
