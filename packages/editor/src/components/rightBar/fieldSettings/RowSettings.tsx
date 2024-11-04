import type { FormFieldRow } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface RowSettingsProps {
  field: FormFieldRow;
  fieldKey: FieldKeyPrefix;
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
