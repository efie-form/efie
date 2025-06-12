import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { isWidthValue, type PropertyDefinition, type WidthHeightSize } from '@efie-form/core';
import SizeInput from '../../../components/form/SizeInput';
import type { PropSettingsSize } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

interface PropsTemplateSizeProps extends PropSettingsSize {
  fieldId: string;
}

export function PropsTemplateSize({ fieldId, label, type }: PropsTemplateSizeProps) {
  const fieldProperty = useSchemaStore(
    useCallback(
      state => state.getFieldProperty(fieldId, type),
      [fieldId, type],
    ),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty);

  const handleChange = useCallback((newValue: WidthHeightSize) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  }, [fieldId, type, updateFieldProperty]);

  return (
    <SettingsFieldHorizontal label={label} divider>
      <SizeInput
        value={value}
        onValueChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(props?: PropertyDefinition): WidthHeightSize {
  if (!isWidthValue(props)) return {
    type: 'auto',
  };
  return props.value;
}
