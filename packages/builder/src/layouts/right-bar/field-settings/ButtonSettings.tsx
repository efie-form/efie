import type { ButtonFormField } from '@efie-form/core';
import PropSettingsPadding from '../property-settings/PropSettingsPadding';
import PropSettingsBorderRadius from '../property-settings/PropSettingsBorderRadius';
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
          { template: 'text', type: 'label', label: 'Label', placeholder: 'Enter button label' },
          { template: 'color', type: 'color', label: 'Text Color' },
          { template: 'color', type: 'bgColor', label: 'Background Color' },
          { template: 'size', type: 'width', label: 'Width' },
        ]}
      />
      <PropSettingsPadding field={field} />
      <PropSettingsBorderRadius field={field} />
      <PropSettingsTextAlign field={field} />
    </div>
  );
}

export default ButtonSettings;
