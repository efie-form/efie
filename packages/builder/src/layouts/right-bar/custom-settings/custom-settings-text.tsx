import type { FieldCustomConfigText } from '@efie-form/core';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface CustomSettingsTextProps {
  fieldId: string;
  config: FieldCustomConfigText;
}

export default function CustomSettingsText({ fieldId, config }: CustomSettingsTextProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.findFieldCustomProperty(fieldId, config.id),
  );
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldCustomProperty);
  const value = isCustomTextValue(fieldProperty?.value) ? fieldProperty.value : '';

  return (
    <SettingsFieldVertical label={config.label} divider>
      <Input
        value={value}
        onChange={(newValue) =>
          updateFieldProperty(fieldId, config.id, {
            type: config.type,
            id: config.id,
            value: newValue,
            dataType: config.dataType,
          })
        }
      />
    </SettingsFieldVertical>
  );
}

function isCustomTextValue(value: unknown): value is string {
  return typeof value === 'string';
}
