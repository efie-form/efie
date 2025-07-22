import { type DateTimeFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
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

export default DateTimeSettings;
