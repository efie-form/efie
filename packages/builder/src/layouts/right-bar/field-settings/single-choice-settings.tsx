import type { SingleChoiceFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface SingleChoiceSettingsProps {
  field: SingleChoiceFormField;
}

function SingleChoiceSettings({ field }: SingleChoiceSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default SingleChoiceSettings;
