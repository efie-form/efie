import type { ContentFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsColor from '../property-settings/PropSettingsColor';
import PropSettingsTag from '../property-settings/PropSettingsTag';
import PropSettingsFontSize from '../property-settings/PropSettingsFontSize';

interface HeaderSettingsProps {
  field: ContentFormField;
}

function HeaderSettings({ field }: HeaderSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <PropSettingsFontSize field={field} />
        <PropSettingsTag field={field} />
        <PropSettingsTextAlign field={field} />
        <PropSettingsColor field={field} />
      </div>
    </div>
  );
}

export default HeaderSettings;
