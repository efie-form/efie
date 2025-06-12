import { PropertyType, type ParagraphFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import DynamicSettings from '../DynamicSettings';

interface ParagraphSettingsProps {
  field: ParagraphFormField;
}

function ParagraphSettings({ field }: ParagraphSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <DynamicSettings
          fieldId={field.id}
          settings={[
            { template: 'size', type: PropertyType.FONT_SIZE, label: 'Font Size' },
            { template: 'color', type: PropertyType.COLOR, label: 'Text Color' },
          ]}
        />
        <PropSettingsTextAlign field={field} />
      </div>
    </div>
  );
}

export default ParagraphSettings;
