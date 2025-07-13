import { PropSettingsTemplate } from '@efie-form/core';
import type { SettingsConfig } from '../../types/settings-config.type';
import PropsSettingsPadding from './property-settings/props-settings-padding';
import { useSchemaStore } from '../../lib/state/schema.state';

interface CustomSettingsProps {
  fieldId: string;
  settings?: SettingsConfig[];
}

export default function CustomSettings({ fieldId, settings }: CustomSettingsProps) {
  return (
    <>
      {settings?.map(settings => (
        <SettingsType key={settings.id} settings={settings} fieldId={fieldId} />
      ))}
    </>
  );
}

interface SettingsProps {
  settings: SettingsConfig;
  fieldId: string;
}

function SettingsType({ settings, fieldId }: SettingsProps) {
  const template = settings.type;
  const fieldProperty = useSchemaStore(state => state.getFieldCustomProperty(fieldId, settings.id));
  switch (template) {
    case PropSettingsTemplate.PADDING: {
      return (
        <PropsSettingsPadding
          label={settings.label}
          onChange={() => {}}
          value={{
            top: { type: 'length', value: 0, unit: 'px' },
            right: { type: 'length', value: 0, unit: 'px' },
            bottom: { type: 'length', value: 0, unit: 'px' },
            left: { type: 'length', value: 0, unit: 'px' },
          }}
        />
      );
    }
    default: {
      return <></>;
    }
  }
}
