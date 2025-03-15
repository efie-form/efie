import type { FormFieldImage } from '@efie-form/core';
import { textAlignMap } from '../../../../lib/constant';

interface ImageFieldProps {
  field: FormFieldImage;
}

const DEFAULT_IMAGE_URL =
  'https://via.assets.so/img.jpg?w=720&h=120&t=Image+Placeholder&tc=#555555&bg=#aaaaaa';

function ImageField({ field }: ImageFieldProps) {
  return (
    <div
      style={{
        textAlign: textAlignMap[field.props.textAlign],
      }}
    >
      <img
        src={field.props.src || DEFAULT_IMAGE_URL}
        alt={field.props.alt}
        className="text-neutral-800 inline-block"
        style={{
          width: field.props.width.autoWidth
            ? 'auto'
            : `${field.props.width.value}%`,
          objectFit: field.props.objectFit,
        }}
      />
    </div>
  );
}

export default ImageField;
