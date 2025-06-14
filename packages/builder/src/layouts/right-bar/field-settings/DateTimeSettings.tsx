import { PropertyType, type DateTimeFormField } from '@efie-form/core';
import DynamicSettings from '../DynamicSettings';
interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
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
