import type { NumberFormField } from '@efie-form/core';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';

interface NumberSettingsProps {
  field: NumberFormField;
}

function NumberSettings({ field }: NumberSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <PropSettingsFormKey field={field} />
        <PropSettingsLabel field={field} />
        <PropSettingsPlaceholder field={field} />
        <PropSettingsRequired field={field} />
      </div>
    </div>
  );
}

export default NumberSettings;
