import {
  colorToStyle,
  fontSizeToStyle,
  PropertyType,
  textAlignToStyle,
  type ContentFormField,
} from '@efie-form/core';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { getFieldProp } from '../../../../lib/utils';

interface ParagraphFieldProps {
  field: ContentFormField;
}

function ParagraphField({ field }: ParagraphFieldProps) {
  const fontSize = getFieldProp(field, PropertyType.FONT_SIZE);
  const textAlign = getFieldProp(field, PropertyType.TEXT_ALIGN);
  const color = getFieldProp(field, PropertyType.COLOR);
  const content = getFieldProp(field, PropertyType.CONTENT);
  const { selectedFieldId } = useSettingsStore();

  return (
    <div
      style={{
        textAlign: textAlignToStyle(textAlign),
        fontSize: fontSizeToStyle(fontSize),
        color: colorToStyle(color),
      }}
    >
      <RichTextEditor
        value={content?.value || {}}
        onChange={() => {}}
        active={selectedFieldId === field.id}
      />
    </div>
  );
}

export default ParagraphField;
