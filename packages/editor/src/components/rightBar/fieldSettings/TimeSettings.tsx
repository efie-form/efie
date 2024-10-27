import type { FormFieldTime } from '../../../types/formSchema.ts';

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
