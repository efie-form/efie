import type { FieldSystemConfigLabel } from '@efie-form/core';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface SystemSettingsLabelProps {
  fieldId: string;
  config: FieldSystemConfigLabel;
}

export default function SystemSettingsLabel({ fieldId, config }: SystemSettingsLabelProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  return (
    <SettingsFieldVertical label={config.label} divider>
      <Input
        value={fieldProperty?.value}
        onChange={(newValue) =>
          updateFieldProperty(fieldId, {
            type: config.type,
            value: newValue,
          })
        }
      />
    </SettingsFieldVertical>
  );
}
