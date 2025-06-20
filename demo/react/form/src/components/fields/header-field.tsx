import type { HeaderFieldProps } from '@efie-form/react';

function HeaderField({ text, headingTag, font, textAlign }: HeaderFieldProps) {
  const Tag = headingTag || 'h1';

  return <Tag style={{ fontSize: `${font.size}${font.unit}`, fontWeight: font.weight, textAlign }}>{text}</Tag>;
}

export default HeaderField;
