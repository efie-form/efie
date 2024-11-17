import type { FormFieldHeader } from '@efie-form/core';
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
        color: field.props.color,
      }}
    >
      {field.props.text}
    </Tag>
  );
}

export default HeaderField;
