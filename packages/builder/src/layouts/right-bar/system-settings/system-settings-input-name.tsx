import type { FieldSystemConfigInputName } from '@efie-form/core';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface SystemSettingsFormKeyProps {
  fieldId: string;
  config: FieldSystemConfigInputName;
}

export default function SystemSettingsInputName({ fieldId, config }: SystemSettingsFormKeyProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <Input
        value={fieldProperty?.value || ''}
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
