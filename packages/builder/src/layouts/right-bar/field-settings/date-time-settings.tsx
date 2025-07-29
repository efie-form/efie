import type { DateTimeFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default DateTimeSettings;
