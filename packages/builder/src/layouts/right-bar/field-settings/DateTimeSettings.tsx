import type { DateTimeFormField } from '@efie-form/core';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsRequired field={field} />
    </div>
  );
}

export default DateTimeSettings;
