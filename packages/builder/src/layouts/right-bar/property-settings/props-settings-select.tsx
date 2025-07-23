import { isStringValue, type PropertyDefinition, type PropValue } from '@efie-form/core';
import Select from '../../../components/form/select';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsSelect } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropsSettingsSelectProps extends PropSettingsSelect {
  fieldId: string;
}

export default function PropsSettingsSelect({
  fieldId,
  type,
  label,
  options,
}: PropsSettingsSelectProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const value = getValue(fieldProperty?.value);

  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  const handleChange = (newValue: string) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue === '' ? undefined : newValue,
    } as PropertyDefinition);
  };

  // Convert options to string-only format for the Select component
  const stringOptions = options.map((option) => ({
    value: String(option.value),
    label: option.label,
  }));

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Select value={value} onChange={handleChange} options={stringOptions} className="w-full" />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: PropValue) {
  if (!isStringValue(value)) return '';
  return value ? String(value) : '';
}
