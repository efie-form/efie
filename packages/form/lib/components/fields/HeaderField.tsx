import type { HeaderFieldProps } from '@efie-form/react/types/FieldProps.ts';

function HeaderField({ text, font, tag, textAlign }: HeaderFieldProps) {
  const Tag = tag || 'h1';

  return <Tag>{text}</Tag>;
}

export default HeaderField;
