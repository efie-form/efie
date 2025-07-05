import { PropertyType, type LongTextFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface LongTextSettingsProps {
  field: LongTextFormField;
}

function LongTextSettings({ field }: LongTextSettingsProps) {
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

export default LongTextSettings;
