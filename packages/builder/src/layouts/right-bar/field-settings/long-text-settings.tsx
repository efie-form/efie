import type { LongTextFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface LongTextSettingsProps {
  field: LongTextFormField;
}

function LongTextSettings({ field }: LongTextSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default LongTextSettings;
