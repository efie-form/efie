import { HeaderFieldProps } from '@efie-form/react';

function HeaderField({ text, tag }: HeaderFieldProps) {
  const Tag = tag || 'h1';

  return <Tag>{text}</Tag>;
}

export default HeaderField;
