import type { FormFieldColumn } from '@efie-form/core';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  fieldKey: string;
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
