import {
  PropertyType,
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
  const content = getFieldProp(field, PropertyType.CONTENT);

  return (
    <div>
      <RichTextEditor
        value={content?.value.jsonContent || {}}
        onChange={() => {}}
        active={selectedFieldId === field.id}
      />
    </div>
  );
}

export default HeadingField;
