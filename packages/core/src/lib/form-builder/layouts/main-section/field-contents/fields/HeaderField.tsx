import type { FormFieldHeader } from '@lib/types/formSchema.type.ts';
import { textAlignMap } from '@form-builder/lib/constant';
import { RichTextEditor } from '@form-builder/components/rich-text-editor';
import { useSettingsStore } from '@form-builder/lib/state/settings.state';

interface HeaderFieldProps {
  field: FormFieldHeader;
}

function HeaderField({ field }: HeaderFieldProps) {
  const { selectedFieldId } = useSettingsStore();

  return (
    <div
      style={{
        fontSize: `${field.props.font.size}px`,
        textAlign: textAlignMap[field.props.textAlign],
        color: field.props.color,
      }}
    >
      <RichTextEditor
        value={field.props.content}
        onChange={() => {}}
        active={selectedFieldId === field.id}
      />
    </div>
  );
}

export default HeaderField;
