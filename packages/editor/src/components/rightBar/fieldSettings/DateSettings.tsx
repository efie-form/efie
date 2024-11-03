import type { FormFieldDate } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface DateSettingsProps {
  field: FormFieldDate;
  fieldKey: FieldKeyPrefix;
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
