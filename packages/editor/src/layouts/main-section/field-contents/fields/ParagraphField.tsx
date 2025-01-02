import type { FormFieldParagraph } from '@efie-form/core';
import { textAlignMap } from '../../../../lib/constant.ts';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import { Controller } from 'react-hook-form';
import { useSettingsStore } from '../../../../lib/state/settings.state.ts';

interface ParagraphFieldProps {
  field: FormFieldParagraph;
  fieldKey: FieldKeyPrefix;
}

function ParagraphField({ field, fieldKey }: ParagraphFieldProps) {
  const { selectedFieldId } = useSettingsStore();

  return (
    <div
      style={{
        textAlign: textAlignMap[field.props.textAlign],
        fontSize: `${field.props.font.size}px`,
        color: field.props.color,
      }}
    >
      <Controller
        render={({ field: { value, onChange } }) => (
          <RichTextEditor
            value={value}
            onChange={onChange}
            active={selectedFieldId === field.id}
          />
        )}
        name={`${fieldKey}.props.content`}
      />
    </div>
  );
}

export default ParagraphField;
