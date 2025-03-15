import type { FormFieldParagraph } from '@efie-form/core';
import { textAlignMap } from '../../../../lib/constant';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface ParagraphFieldProps {
  field: FormFieldParagraph;
}

function ParagraphField({ field }: ParagraphFieldProps) {
  const { updateFieldProps } = useSchemaStore();

  const { selectedFieldId } = useSettingsStore();

  return (
    <div
      style={{
        textAlign: textAlignMap[field.props.textAlign],
        fontSize: `${field.props.font.size}px`,
        color: field.props.color,
      }}
    >
      <RichTextEditor
        value={field.props.content}
        onChange={(value) => updateFieldProps(field.id, 'props.content', value)}
        active={selectedFieldId === field.id}
      />
    </div>
  );
}

export default ParagraphField;
