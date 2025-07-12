import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsColor } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';
import ColorPicker2 from '../../../components/form/color-picker';
import { getColorObject, isColorValue, type Color, type PropertyDefinition, type PropValue } from '@efie-form/core';

interface PropsTemplateColorProps extends PropSettingsColor {
  fieldId: string;
}

export default function PropsTemplateColor({ fieldId, label, type }: PropsTemplateColorProps) {
  const fieldProperty = useSchemaStore(
    state => state.getFieldProperty(fieldId, type),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);

  const handleChange = (newColor: Color) => {
    updateFieldProperty(fieldId, {
      ...fieldProperty,
      value: newColor,
    } as PropertyDefinition);
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <ColorPicker2
        value={value}
        onChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: PropValue) {
  if (!isColorValue(value)) return getColorObject('#FFFFFF');

  return value;
}
