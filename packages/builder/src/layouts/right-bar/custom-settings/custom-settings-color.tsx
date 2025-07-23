import {
  type Color,
  type FieldCustomConfigColor,
  type FieldCustomProp,
  getColorObject,
  isColor,
} from '@efie-form/core';
import { ColorPicker } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface CustomSettingsColorProps {
  fieldId: string;
  config: FieldCustomConfigColor;
}

export default function CustomSettingsColor({ fieldId, config }: CustomSettingsColorProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.findFieldCustomProperty(fieldId, config.id),
  );
  const updateFieldCustomProperty = useSchemaStore((state) => state.updateFieldCustomProperty);
  const value = isCustomColorValue(fieldProperty?.value)
    ? fieldProperty.value
    : config.defaultValue || getColorObject('#000000');

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <ColorPicker
        value={value}
        onChange={(newValue) =>
          updateFieldCustomProperty(fieldId, config.id, {
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

function isCustomColorValue(value: FieldCustomProp['value']): value is Color {
  return isColor(value);
}
