import type { HeadingFieldProps } from '@efie-form/react';

function HeadingField({ text, headingTag, font, textAlign }: HeadingFieldProps) {
  const Tag = headingTag || 'h1';

  return <Tag style={{ fontSize: `${font.size}${font.unit}`, fontWeight: font.weight, textAlign }}>{text}</Tag>;
}

export default HeadingField;
