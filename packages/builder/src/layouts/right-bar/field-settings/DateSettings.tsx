import type { DateFormField } from '@efie-form/core';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
interface DateSettingsProps {
  field: DateFormField;
}

function DateSettings({ field }: DateSettingsProps) {
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

export default DateSettings;
