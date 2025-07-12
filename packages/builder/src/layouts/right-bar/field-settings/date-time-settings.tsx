import { PropertyType, PropSettingsTemplate, type DateTimeFormField } from '@efie-form/core';
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
          { template: PropSettingsTemplate.FORM_KEY },
          { template: PropSettingsTemplate.TEXT, label: 'Label', type: PropertyType.LABEL },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default DateTimeSettings;
