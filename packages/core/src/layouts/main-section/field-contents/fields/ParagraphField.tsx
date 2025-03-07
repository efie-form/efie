import type { FormFieldParagraph } from '../../../../../../core-old';
import { textAlignMap } from '../../../../lib/constant.ts';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state.ts';
import { useSchemaStore } from '../../../../lib/state/schema.state.ts';

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
