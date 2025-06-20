import { useCallback } from 'react';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsNumber } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';
import { isNumberValue, type PropertyDefinition, type PropValue } from '@efie-form/core';

interface PropsTemplateNumberProps extends PropSettingsNumber {
  fieldId: string;
}

export default function PropsTemplateNumber({ fieldId, label, type, placeholder }: PropsTemplateNumberProps) {
  const fieldProperty = useSchemaStore(useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);

  const handleChange = (newValue: string) => {
    const trimmedValue = newValue.trim().replaceAll(',', '');
    const parsedValue = Number.parseFloat(trimmedValue);
    if (Number.isNaN(parsedValue)) {
      updateFieldProperty(fieldId, { type } as PropertyDefinition);
    }
    else {
      updateFieldProperty(fieldId, { type, value: parsedValue } as PropertyDefinition);
    }
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(props?: PropValue) {
  if (!isNumberValue(props)) return '';

  return props.toLocaleString();
}
