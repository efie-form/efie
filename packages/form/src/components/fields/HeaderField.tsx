import type { HeaderFieldProps } from '@efie-form/react/types/FieldProps.ts';

function HeaderField({ text }: HeaderFieldProps) {
  return <h1>{text}</h1>;
}

export default HeaderField;
