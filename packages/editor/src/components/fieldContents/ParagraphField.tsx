import type { FormFieldParagraph } from '@efie-form/core';
import { textAlignMap } from '../../lib/constant.ts';

interface ParagraphFieldProps {
  field: FormFieldParagraph;
}

function ParagraphField({ field }: ParagraphFieldProps) {
  return (
    <div
      style={{
        textAlign: textAlignMap[field.props.textAlign],
        fontSize: `${field.props.font.size}px`,
        color: field.props.color,
      }}
    >
      {field.props.text}
    </div>
  );
}

export default ParagraphField;
