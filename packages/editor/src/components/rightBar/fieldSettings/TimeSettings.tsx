import type { FormFieldTime } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface TimeSettingsProps {
  field: FormFieldTime;
  fieldKey: FieldKeyPrefix;
}

function TimeSettings({ field }: TimeSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default TimeSettings;
