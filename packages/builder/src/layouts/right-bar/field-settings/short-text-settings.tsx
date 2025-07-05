import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
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

export default ShortTextSettings;
