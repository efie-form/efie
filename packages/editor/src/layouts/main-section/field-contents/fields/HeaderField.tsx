import type { FormFieldHeader } from '@efie-form/core';
import { textAlignMap } from '../../../../lib/constant.ts';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import { Controller } from 'react-hook-form';
import { useSettingsStore } from '../../../../lib/state/settings.state.ts';

interface HeaderFieldProps {
  field: FormFieldHeader;
  fieldKey: FieldKeyPrefix;
}

function HeaderField({ field, fieldKey }: HeaderFieldProps) {
  const { selectedFieldId } = useSettingsStore();
  return (
    <div
      style={{
        fontSize: `${field.props.font.size}px`,
        textAlign: textAlignMap[field.props.textAlign],
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

export default HeaderField;
