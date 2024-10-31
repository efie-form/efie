import type { FormFieldRow } from '@efie-form/core';

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
