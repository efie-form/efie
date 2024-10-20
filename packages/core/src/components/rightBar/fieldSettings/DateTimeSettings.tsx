import type { FormFieldDateTime } from '../../../types/formSchema.ts';

interface DateTimeSettingsProps {
  field: FormFieldDateTime;
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
