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

interface HeaderFieldProps {
  field: ContentFormField;
}

function HeaderField({ field }: HeaderFieldProps) {
  const { selectedFieldId } = useSettingsStore();
  const { getFieldProps } = useSchemaStore();
  const fontSize = getFieldProps(field.id, PropertyType.FONT_SIZE);
  const textAlign = getFieldProps(field.id, PropertyType.TEXT_ALIGN);
  const color = getFieldProps(field.id, PropertyType.COLOR);
  const content = getFieldProps(field.id, PropertyType.CONTENT);

  return (
    <div
      style={{
        fontSize: fontSizeToStyle(fontSize),
        textAlign: textAlignToStyle(textAlign),
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

export default HeaderField;
