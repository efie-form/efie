import type { FormFieldParagraph } from '../../types/formSchema.ts';
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
      }}
    >
      {field.props.text}
    </div>
  );
}

export default ParagraphField;
