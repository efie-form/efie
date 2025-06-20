import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsText } from '../../../types/prop-settings.type';
import { useCallback } from 'react';
import { isStringValue, type PropertyDefinition, type PropValue } from '@efie-form/core';

interface PropsTemplateTextProps extends PropSettingsText {
  fieldId: string;
}

export default function PropsTemplateText({ label, placeholder, type, fieldId }: PropsTemplateTextProps) {
  const fieldProperty = useSchemaStore(
    useCallback(
      state => state.getFieldProperty(fieldId, type),
      [fieldId, type],
    ),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);

  const handleChange = useCallback((newValue: string) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  }, [fieldId, type, updateFieldProperty]);

  return (
    <SettingsFieldVertical label={label} divider>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </SettingsFieldVertical>
  );
}

const getValue = (props?: PropValue) => {
  if (!isStringValue(props)) return '';

  return props;
};
