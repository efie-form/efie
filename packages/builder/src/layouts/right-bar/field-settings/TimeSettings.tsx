import type { TimeFormField } from '@efie-form/core';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';

interface TimeSettingsProps {
  field: TimeFormField;
}

function TimeSettings({ field }: TimeSettingsProps) {
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

export default TimeSettings;
