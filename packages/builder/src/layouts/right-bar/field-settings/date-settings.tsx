import { type DateFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface DateSettingsProps {
  field: DateFormField;
}

function DateSettings({ field }: DateSettingsProps) {
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

export default DateSettings;
