import { PropertyType, type BlockFormField } from '@efie-form/core';
import PropSettingsPadding from '../property-settings/PropSettingsPadding';
import PropSettingsMargin from '../property-settings/PropSettingsMargin';
import PropSettingsBorderRadius from '../property-settings/PropSettingsBorderRadius';
import PropSettingsShadow from '../property-settings/PropSettingsShadow';
import DynamicSettings from '../DynamicSettings';

interface BlockSettingsProps {
  field: BlockFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Spacing
      </div>
      <DynamicSettings
        settings={[
          { template: 'color', label: 'Background Color', type: PropertyType.BG_COLOR },
          { template: 'color', label: 'Text Color', type: PropertyType.COLOR },
          { template: 'borderRadius', label: 'Border Radius', type: PropertyType.BORDER_RADIUS },
        ]}
        fieldId={field.id}
      />
      <PropSettingsPadding field={field} />
      <PropSettingsMargin field={field} />
      <PropSettingsBorderRadius field={field} />
      <PropSettingsShadow field={field} />
      {/* <PropSettingsBgColor field={field} /> */}
      {/* <PropSettingsColor field={field} /> */}
    </div>
  );
}

export default BlockSettings;
