import type { FormFieldDate } from '@efie-form/core';

interface DateSettingsProps {
  field: FormFieldDate;
  fieldKey: string;
}

function DateSettings({ field }: DateSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default DateSettings;
