import { PropertyType, PropSettingsTemplate, type ButtonFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

function ButtonSettings({ field }: ButtonSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: PropSettingsTemplate.TEXT, type: PropertyType.LABEL, label: 'Label', placeholder: 'Enter button label' },
          { template: PropSettingsTemplate.BUTTON_ACTION, type: PropertyType.BUTTON_ACTION, label: 'Button Action' },
        ]}
      />
    </div>
  );
}

export default ButtonSettings;
