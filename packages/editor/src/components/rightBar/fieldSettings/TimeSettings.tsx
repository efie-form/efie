import type { FormFieldTime } from '@efie-form/core';

interface TimeSettingsProps {
  field: FormFieldTime;
  fieldKey: string;
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
