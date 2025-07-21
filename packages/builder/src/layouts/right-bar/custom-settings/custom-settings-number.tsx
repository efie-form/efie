import type { FieldCustomConfigNumber, FieldCustomProp } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';
import NumberInput from '../../../components/form/number';

interface CustomSettingsNumberProps {
  fieldId: string;
  config: FieldCustomConfigNumber;
}

export default function CustomSettingsNumber({ fieldId, config }: CustomSettingsNumberProps) {
  const fieldProperty = useSchemaStore(state => state.findFieldCustomProperty(fieldId, config.id));
  const updateFieldCustomProperty = useSchemaStore(state => state.updateFieldCustomProperty);
  const value = isCustomNumberValue(fieldProperty?.value) ? fieldProperty.value : config.defaultValue || 0;

  return (
    <SettingsFieldVertical label={config.label} divider>
      <NumberInput
        value={value}
        onChange={newValue => updateFieldCustomProperty(fieldId, config.id, {
          type: config.type,
          id: config.id,
          value: newValue,
          dataType: config.dataType,
        })}
      />
    </SettingsFieldVertical>
  );
}

function isCustomNumberValue(value: FieldCustomProp['value']): value is number {
  return typeof value === 'number';
}
