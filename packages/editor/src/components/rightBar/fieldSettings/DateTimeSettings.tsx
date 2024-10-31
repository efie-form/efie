import type { FormFieldDateTime } from '@efie-form/core';

interface DateTimeSettingsProps {
  field: FormFieldDateTime;
  fieldKey: string;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default DateTimeSettings;
