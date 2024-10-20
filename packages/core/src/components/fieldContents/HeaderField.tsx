import type { FormFieldHeader } from '../../types/formSchema.ts';
import { textAlignMap } from '../../lib/constant.ts';

interface HeaderFieldProps {
  field: FormFieldHeader;
}

function HeaderField({ field }: HeaderFieldProps) {
  const Tag = field.props.tag || 'h1';

  return (
    <Tag
      style={{
        fontSize: `${field.props.font.size}px`,
        textAlign: textAlignMap[field.props.textAlign],
      }}
    >
      {field.props.text}
    </Tag>
  );
}

export default HeaderField;
