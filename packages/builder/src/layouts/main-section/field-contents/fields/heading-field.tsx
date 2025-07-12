import {
  PropertyType,
  type HeadingFormField,
} from '@efie-form/core';
import { RichTextEditor } from '../../../../components/rich-text-editor';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface HeadingFieldProps {
  field: HeadingFormField;
}

function HeadingField({ field }: HeadingFieldProps) {
  const content = useSchemaStore(state => state.getFieldProperty(field.id, PropertyType.CONTENT));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const { selectedFieldId } = useSettingsStore();
  const config = useSettingsStore(state => state.config.heading);

  return (
    <div>
      <RichTextEditor
        value={content?.value.jsonContent || {}}
        onChange={(newContent) => {
          updateFieldProperty(field.id, {
            type: PropertyType.CONTENT,
            value: { jsonContent: newContent },
          });
        }}
        active={selectedFieldId === field.id}
        options={{
          bold: config?.formats.bold,
          italic: config?.formats.italic,
          underline: config?.formats.underline,
          strike: config?.formats.strikethrough,
          link: config?.formats.link,
          heading: config?.formats.heading,
          fontSize: config?.formats.fontSize,
          align: config?.formats.align,
          list: config?.formats.list,
          superscript: config?.formats.superscript,
          subscript: config?.formats.subscript,
        }}
      />
    </div>
  );
}

export default HeadingField;
