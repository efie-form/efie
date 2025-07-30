import type { FieldSystemConfigFieldName } from '@efie-form/core';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface SystemSettingsFieldNameProps {
  fieldId: string;
  config: FieldSystemConfigFieldName;
}

export default function SystemSettingsFieldName({ fieldId, config }: SystemSettingsFieldNameProps) {
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
