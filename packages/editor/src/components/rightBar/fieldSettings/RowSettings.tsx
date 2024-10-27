import type { FormFieldRow } from '../../../types/formSchema.ts';

interface RowSettingsProps {
  field: FormFieldRow;
  fieldKey: string;
}

function RowSettings({ field }: RowSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default RowSettings;
