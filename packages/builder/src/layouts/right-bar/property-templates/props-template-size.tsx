import { isSizeValue, type PropertyDefinition, type PropValue, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsSize } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropsTemplateSizeProps extends PropSettingsSize {
  fieldId: string;
}

export function PropsTemplateSize({ fieldId, label, type }: PropsTemplateSizeProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);

  const handleChange = (newValue: Size) => {
    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <SizeInput value={value} onChange={handleChange} />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: PropValue): Size {
  if (!isSizeValue(value))
    return {
      type: 'auto',
    };
  return value;
}
