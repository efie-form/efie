import { PropertyType, type TimeFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface TimeSettingsProps {
  field: TimeFormField;
}

function TimeSettings({ field }: TimeSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default TimeSettings;
