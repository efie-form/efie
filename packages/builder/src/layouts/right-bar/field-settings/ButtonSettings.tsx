import { PropertyType, type ButtonFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import DynamicSettings from '../DynamicSettings';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

function ButtonSettings({ field }: ButtonSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: 'text', type: PropertyType.LABEL, label: 'Label', placeholder: 'Enter button label' },
          { template: 'color', type: PropertyType.COLOR, label: 'Text Color' },
          { template: 'color', type: PropertyType.BG_COLOR, label: 'Background Color' },
          { template: 'size', type: PropertyType.WIDTH, label: 'Width' },
          { template: 'borderRadius', type: PropertyType.BORDER_RADIUS, label: 'Border Radius' },
          { template: 'padding', type: PropertyType.PADDING, label: 'Padding' },
        ]}
      />
      <PropSettingsTextAlign field={field} />
    </div>
  );
}

export default ButtonSettings;
