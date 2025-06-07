import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsBoolean } from '../../../types/prop-settings.type';
import type { PropertyDefinition } from '@efie-form/core';
import { Switch } from '../../../components/form';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

interface PropTemplateBoolean extends PropSettingsBoolean {
  fieldId: string;
}

export default function PropsTemplateBoolean({ label, fieldId, type }: PropTemplateBoolean) {
  const fieldProperty = useSchemaStore(
    useCallback(
      state => state.getFieldProperty(fieldId, type),
      [fieldId, type],
    ),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  const value = getValue(fieldProperty);

  const handleChange = useCallback((newValue: boolean) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  }, [fieldId, updateFieldProperty]);

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Switch
        checked={value}
        onChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(props?: PropertyDefinition) {
  if (!props || !('value' in props)) return false;

  if (typeof props.value !== 'boolean') {
    console.warn('Expected boolean value for property, but got:', props.value);
    return false;
  }
  return props.value;
}
