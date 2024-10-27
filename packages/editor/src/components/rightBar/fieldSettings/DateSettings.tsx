import type { FormFieldDate } from '../../../types/formSchema.ts';

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
