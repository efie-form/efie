import { type LongTextFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

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
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default LongTextSettings;
