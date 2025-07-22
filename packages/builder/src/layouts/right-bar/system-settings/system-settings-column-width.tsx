import { isSizeValue, type FieldSystemConfigColumnWidth, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface SystemSettingsColumnWidthProps {
  fieldId: string;
  config: FieldSystemConfigColumnWidth;
}

export function SystemSettingsColumnWidth({ fieldId, config }: SystemSettingsColumnWidthProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <SizeInput
        value={getValue(fieldProperty?.value)}
        onChange={(newValue) => {
          updateFieldProperty(fieldId, {
            type: config.type,
            value: newValue,
          });
        }}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: Size): Size {
  if (!value || !isSizeValue(value)) return {
    type: 'auto',
  };
  return value;
}
