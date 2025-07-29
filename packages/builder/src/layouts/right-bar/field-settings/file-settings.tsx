import type { FileFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface FileSettingsProps {
  field: FileFormField;
}

function FileSettings({ field }: FileSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default FileSettings;
