import { PropertyType, type DateFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';
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
