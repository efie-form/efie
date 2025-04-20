import type { ParagraphFieldProps } from '@efie-form/react';

function ParagraphField({ text, font, textAlign }: ParagraphFieldProps) {
  return <p style={{ fontSize: `${font.size}${font.unit}`, fontWeight: font.weight, textAlign }}>{text}</p>;
}

export default ParagraphField;
