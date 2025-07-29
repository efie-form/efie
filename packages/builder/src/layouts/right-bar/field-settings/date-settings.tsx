import type { DateFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface DateSettingsProps {
  field: DateFormField;
}

function DateSettings({ field }: DateSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default DateSettings;
