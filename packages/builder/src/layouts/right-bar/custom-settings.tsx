import type { SettingsConfig } from '../../types/settings-config.type';

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
  console.log('fieldProperty', fieldProperty);
}
