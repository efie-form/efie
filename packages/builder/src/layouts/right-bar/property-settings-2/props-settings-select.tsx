import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import Select from '../../../components/form/Select';
import type { PropSettingsSelect } from '../../../types/prop-settings.type';
import { isStringValue, type PropertyDefinition } from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

interface PropsSettingsSelectProps extends PropSettingsSelect {
  fieldId: string;
}

export default function PropsSettingsSelect({
  fieldId,
  type,
  label,
  options,
}: PropsSettingsSelectProps) {
  const fieldProperty = useSchemaStore(
    useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]),
  );
  const value = getValue(fieldProperty);

  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  const handleChange = useCallback(
    (newValue: string) => {
      updateFieldProperty(fieldId, {
        type,
        value: newValue === '' ? undefined : newValue,
      } as PropertyDefinition);
    },
    [fieldId, type, updateFieldProperty],
  );

  // Convert options to string-only format for the Select component
  const stringOptions = options.map(option => ({
    value: String(option.value),
    label: option.label,
  }));

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Select
        value={value}
        onChange={handleChange}
        options={stringOptions}
        className="w-full"
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(
  fieldProperty: PropertyDefinition | undefined,
): string | undefined {
  if (!isStringValue(fieldProperty)) return undefined;
  return fieldProperty.value ? String(fieldProperty.value) : undefined;
}
