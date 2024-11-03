import type { FormFieldDateTime } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface DateTimeSettingsProps {
  field: FormFieldDateTime;
  fieldKey: FieldKeyPrefix;
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
