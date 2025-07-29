import { FieldType, type ShortTextFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const config = useSettingsStore((state) => state.config[FieldType.SHORT_TEXT]);

  return (
    <div>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default ShortTextSettings;
