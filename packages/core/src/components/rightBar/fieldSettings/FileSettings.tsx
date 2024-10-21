import type { FormFieldFile } from '../../../types/formSchema.ts';

interface FileSettingsProps {
  field: FormFieldFile;
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
