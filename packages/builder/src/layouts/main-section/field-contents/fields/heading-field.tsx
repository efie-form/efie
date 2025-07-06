import {
  colorToStyle,
  fontSizeToStyle,
  PropertyType,
  textAlignToStyle,
  type HeadingFormField,
} from '@efie-form/core';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { getFieldProp } from '../../../../lib/utils';

interface HeadingFieldProps {
  field: HeadingFormField;
}

function HeadingField({ field }: HeadingFieldProps) {
  const { selectedFieldId } = useSettingsStore();
  const fontSize = getFieldProp(field, PropertyType.FONT_SIZE);
  const textAlign = getFieldProp(field, PropertyType.TEXT_ALIGN);
  const color = getFieldProp(field, PropertyType.COLOR);
  const content = getFieldProp(field, PropertyType.CONTENT);

  return (
    <div
      style={{
        fontSize: fontSizeToStyle(fontSize),
        textAlign: textAlignToStyle(textAlign),
        color: colorToStyle(color?.value),
      }}
    >
      <RichTextEditor
        value={content?.value.jsonContent || {}}
        onChange={() => {}}
        active={selectedFieldId === field.id}
      />
    </div>
  );
}

export default HeadingField;
