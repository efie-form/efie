import { FieldType, type ShortTextFormField } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';
import FieldNameSettings from '../settings/form-name-settings';

interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const config = useSettingsStore((state) => state.config[FieldType.SHORT_TEXT]);

  return (
    <div>
      <FieldNameSettings fieldId={field.id} />
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default ShortTextSettings;
