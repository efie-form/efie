import type { FormFieldColumn } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
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
