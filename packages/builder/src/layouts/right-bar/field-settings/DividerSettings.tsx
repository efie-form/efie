import type { DividerFormField } from '@efie-form/core';
import PropSettingsWidth from '../property-settings/PropSettingsWidth';
import PropSettingsHeight from '../property-settings/PropSettingsHeight';
import PropSettingsColor from '../property-settings/PropSettingsColor';
import PropSettingsBorderStyle from '../property-settings/PropSettingsBorderStyle';

interface DividerSettingsProps {
  field: DividerFormField;
}

function DividerSettings({ field }: DividerSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <PropSettingsWidth field={field} />
        <PropSettingsHeight field={field} />
        <PropSettingsBorderStyle field={field} />
        <PropSettingsColor field={field} />
      </div>
    </div>
  );
}

export default DividerSettings;
