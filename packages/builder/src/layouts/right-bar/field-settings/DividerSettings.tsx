import { PropertyType, type DividerFormField } from '@efie-form/core';
import PropSettingsHeight from '../property-settings/PropSettingsHeight';
import PropSettingsColor from '../property-settings/PropSettingsColor';
import PropSettingsBorderStyle from '../property-settings/PropSettingsBorderStyle';
import DynamicSettings from '../DynamicSettings';

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
        <DynamicSettings
          fieldId={field.id}
          settings={[
            { template: 'width', type: PropertyType.WIDTH, label: 'Width' },
          ]}
        />
        <PropSettingsHeight field={field} />
        <PropSettingsBorderStyle field={field} />
        <PropSettingsColor field={field} />
      </div>
    </div>
  );
}

export default DividerSettings;
