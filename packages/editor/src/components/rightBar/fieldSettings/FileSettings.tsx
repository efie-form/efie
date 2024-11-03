import type { FormFieldFile } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface FileSettingsProps {
  field: FormFieldFile;
  fieldKey: FieldKeyPrefix;
}

function FileSettings({ field }: FileSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default FileSettings;
