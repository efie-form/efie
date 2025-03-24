import type { LayoutFormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import PropSettingsBgColor from '../property-settings/PropSettingsBgColor';
import PropSettingsColor from '../property-settings/PropSettingsColor';
import PropSettingsPadding from '../property-settings/PropSettingsPadding';
import PropSettingsMargin from '../property-settings/PropSettingsMargin';
import PropSettingsBorderRadius from '../property-settings/PropSettingsBorderRadius';
import PropSettingsShadow from '../property-settings/PropSettingsShadow';

interface BlockSettingsProps {
  field: LayoutFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Spacing
      </div>
      <PropSettingsPadding field={field} />
      <PropSettingsMargin field={field} />
      <PropSettingsBorderRadius field={field} />
      <PropSettingsShadow field={field} />
      <PropSettingsBgColor field={field} />
      <PropSettingsColor field={field} />
    </div>
  );
}

export default BlockSettings;
