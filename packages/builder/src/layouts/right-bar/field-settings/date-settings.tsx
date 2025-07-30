import type { DateFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';
import FieldNameSettings from '../settings/form-name-settings';

interface DateSettingsProps {
  field: DateFormField;
}

function DateSettings({ field }: DateSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldNameSettings fieldId={field.id} />
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default DateSettings;
