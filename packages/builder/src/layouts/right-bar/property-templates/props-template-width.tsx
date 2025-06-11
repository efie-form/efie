import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { isWidthValue, type PropertyDefinition, type WidthHeightSize } from '@efie-form/core';
import SizeInput from '../../../components/form/SizeInput';
import type { PropSettingsWidth } from '../../../types/prop-settings.type';

interface PropsTemplateWidthProps extends PropSettingsWidth {
  fieldId: string;
}

export function PropsTemplateWidth({ fieldId, label, type }: PropsTemplateWidthProps) {
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
    <div className="p-4 border-b border-neutral-100">
      <div className="space-y-4">
        <h3 className="typography-body2 font-medium text-neutral-800">{label}</h3>
        <SizeInput
          value={value}
          onValueChange={handleChange}
        />
      </div>
    </div>
  );
}

function getValue(props?: PropertyDefinition): WidthHeightSize {
  if (!isWidthValue(props)) return {
    type: 'auto',
  };
  return props.value;
}
