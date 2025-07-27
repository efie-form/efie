import {
  type FieldCustomConfigSize,
  type FieldCustomProp,
  isSize,
  type Size,
  SizeType,
} from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface CustomSettingsSizeProps {
  fieldId: string;
  config: FieldCustomConfigSize;
}

export default function CustomSettingsSize({ fieldId, config }: CustomSettingsSizeProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.findFieldCustomProperty(fieldId, config.id),
  );
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldCustomProperty);
  const value = isCustomSizeValue(fieldProperty?.value)
    ? fieldProperty.value
    : { type: SizeType.AUTO };

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <SizeInput
        value={value}
        onChange={(newValue) => {
          updateFieldProperty(fieldId, config.id, {
            type: config.type,
            id: config.id,
            value: newValue,
            dataType: config.dataType,
          });
        }}
      />
    </SettingsFieldHorizontal>
  );
}

function isCustomSizeValue(value: FieldCustomProp['value']): value is Size {
  return isSize(value);
}
