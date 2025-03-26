import {
  colorToStyle,
  fontSizeToStyle,
  PropertyType,
  textAlignToStyle,
  type ContentFormField,
} from '@efie-form/core';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface ParagraphFieldProps {
  field: ContentFormField;
}

function ParagraphField({ field }: ParagraphFieldProps) {
  const { getFieldProps } = useSchemaStore();
  const fontSize = getFieldProps(field.id, PropertyType.FONT_SIZE);
  const textAlign = getFieldProps(field.id, PropertyType.TEXT_ALIGN);
  const color = getFieldProps(field.id, PropertyType.COLOR);
  const content = getFieldProps(field.id, PropertyType.CONTENT);
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
