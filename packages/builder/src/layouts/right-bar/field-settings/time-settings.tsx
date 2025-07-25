import { PropertyType, type TimeFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

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
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default TimeSettings;
