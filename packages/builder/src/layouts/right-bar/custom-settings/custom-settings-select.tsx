import type { FieldCustomConfigSelect } from '@efie-form/core';
import { Select } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface CustomSettingsSelectProps {
  fieldId: string;
  config: FieldCustomConfigSelect;
}

export default function CustomSettingsSelect({ fieldId, config }: CustomSettingsSelectProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.findFieldCustomProperty(fieldId, config.id),
  );
  const updateFieldCustomProperty = useSchemaStore((state) => state.updateFieldCustomProperty);
  const value = isCustomSelectValue(fieldProperty?.value) ? fieldProperty.value : '';

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <Select
        value={value}
        onChange={(newValue) =>
          updateFieldCustomProperty(fieldId, config.id, {
            type: config.type,
            id: config.id,
            value: newValue,
            dataType: config.dataType,
          })
        }
        options={config.options.map((option) =>
          typeof option === 'string' ? { label: option, value: option } : option,
        )}
        className="w-full"
      />
    </SettingsFieldHorizontal>
  );
}

function isCustomSelectValue(value: unknown): value is string {
  return typeof value === 'string';
}
