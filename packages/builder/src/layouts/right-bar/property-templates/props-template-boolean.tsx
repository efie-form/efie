import { isBooleanValue, type PropertyDefinition, type PropValue } from '@efie-form/core';
import { Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsBoolean } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropTemplateBoolean extends PropSettingsBoolean {
  fieldId: string;
}

export default function PropsTemplateBoolean({ label, fieldId, type }: PropTemplateBoolean) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  const value = getValue(fieldProperty?.value);

  const handleChange = (newValue: boolean) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Switch checked={value} onChange={handleChange} />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: PropValue) {
  if (!isBooleanValue(value)) return false;

  return value;
}
