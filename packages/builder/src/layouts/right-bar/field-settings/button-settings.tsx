import { PropertyType, type ButtonFormField } from '@efie-form/core';
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
          { template: 'text', type: PropertyType.LABEL, label: 'Label', placeholder: 'Enter button label' },
          { template: 'buttonAction', type: PropertyType.BUTTON_ACTION, label: 'Button Action' },
        ]}
      />
    </div>
  );
}

export default ButtonSettings;
