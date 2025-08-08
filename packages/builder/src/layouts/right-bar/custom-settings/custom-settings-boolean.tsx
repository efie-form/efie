import type { FieldCustomConfigBoolean } from '@efie-form/core';
import { Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface CustomSettingsBooleanProps {
  fieldId: string;
  config: FieldCustomConfigBoolean;
}

export default function CustomSettingsBoolean({ fieldId, config }: CustomSettingsBooleanProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.findFieldCustomProperty(fieldId, config.id),
  );
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldCustomProperty);
  const rawValue = fieldProperty?.value;
  const value = rawValue !== undefined && isCustomBooleanValue(rawValue) ? rawValue : false;

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <Switch
        checked={value}
        onChange={(newValue) =>
          updateFieldProperty(fieldId, config.id, {
            type: config.type,
            id: config.id,
            value: newValue,
            dataType: config.dataType,
          })
        }
      />
    </SettingsFieldHorizontal>
  );
}

function isCustomBooleanValue(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
