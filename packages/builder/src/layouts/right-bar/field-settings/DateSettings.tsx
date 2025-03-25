import type { DateTimeFormField } from '@efie-form/core';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
interface DateSettingsProps {
  field: DateTimeFormField;
}

function DateSettings({ field }: DateSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsPlaceholder field={field} />
      <PropSettingsRequired field={field} />
    </div>
  );
}

export default DateSettings;
