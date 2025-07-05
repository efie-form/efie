import { PropertyType, type ParagraphFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface ParagraphSettingsProps {
  field: ParagraphFormField;
}

function ParagraphSettings({ field }: ParagraphSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: 'size', type: PropertyType.FONT_SIZE, label: 'Font Size' },
          { template: 'color', type: PropertyType.COLOR, label: 'Text Color' },
          { template: 'select', type: PropertyType.TEXT_ALIGN, label: 'Text Alignment', options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ] },
        ]}
      />
    </div>
  );
}

export default ParagraphSettings;
