import { PropertyType, type BlockFormField } from '@efie-form/core';
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
          { template: 'margin', label: 'Marg|in', type: PropertyType.MARGIN },
          { template: 'padding', label: 'Padding', type: PropertyType.PADDING },
        ]}
        fieldId={field.id}
      />
      <PropSettingsShadow field={field} />
    </div>
  );
}

export default BlockSettings;
