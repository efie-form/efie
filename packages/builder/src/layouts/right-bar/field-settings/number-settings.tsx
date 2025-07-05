import { PropertyType, type NumberFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface NumberSettingsProps {
  field: NumberFormField;
}

function NumberSettings({ field }: NumberSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'text', label: 'Placeholder', type: PropertyType.PLACEHOLDER },
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default NumberSettings;
