import type { FormFieldFile } from '@efie-form/core';

interface FileSettingsProps {
  field: FormFieldFile;
  fieldKey: string;
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
