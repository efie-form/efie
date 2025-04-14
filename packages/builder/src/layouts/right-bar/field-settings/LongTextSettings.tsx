import type { LongTextFormField } from '@efie-form/core';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';

interface LongTextSettingsProps {
  field: LongTextFormField;
}

function LongTextSettings({ field }: LongTextSettingsProps) {
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

export default LongTextSettings;
