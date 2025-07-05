import { PropertyType, type DateTimeFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';
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
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default DateTimeSettings;
