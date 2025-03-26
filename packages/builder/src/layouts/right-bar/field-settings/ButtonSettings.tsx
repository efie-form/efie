import type { ButtonFormField } from '@efie-form/core';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsBgColor from '../property-settings/PropSettingsBgColor';
import PropSettingsColor from '../property-settings/PropSettingsColor';
import PropSettingsPadding from '../property-settings/PropSettingsPadding';
import PropSettingsBorderRadius from '../property-settings/PropSettingsBorderRadius';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsWidth from '../property-settings/PropSettingsWidth';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

function ButtonSettings({ field }: ButtonSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsLabel field={field} />
      <PropSettingsColor field={field} />
      <PropSettingsBgColor field={field} />
      <PropSettingsPadding field={field} />
      <PropSettingsBorderRadius field={field} />
      <PropSettingsWidth field={field} />
      <PropSettingsTextAlign field={field} />
    </div>
  );
}

export default ButtonSettings;
