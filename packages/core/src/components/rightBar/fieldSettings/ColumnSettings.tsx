import type { FormFieldColumn } from '../../../types/formSchema.ts';

interface ColumnSettingsProps {
  field: FormFieldColumn;
}

function ColumnSettings({ field }: ColumnSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default ColumnSettings;
