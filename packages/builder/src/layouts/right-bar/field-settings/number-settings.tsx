import { PropertyType, PropSettingsTemplate, type NumberFormField } from '@efie-form/core';
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
          { template: PropSettingsTemplate.FORM_KEY },
          { template: PropSettingsTemplate.TEXT, label: 'Label', type: PropertyType.LABEL },
          { template: PropSettingsTemplate.TEXT, label: 'Placeholder', type: PropertyType.PLACEHOLDER },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default NumberSettings;
