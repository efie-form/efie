import type { FieldSystemConfigPlaceholder } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';
import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface SystemSettingsPlaceholderProps {
  fieldId: string;
  config: FieldSystemConfigPlaceholder;
}

export default function SystemSettingsPlaceholder({ fieldId, config }: SystemSettingsPlaceholderProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  return (
    <SettingsFieldVertical label={config.label} divider>
      <Input
        value={fieldProperty?.value}
        onChange={newValue => updateFieldProperty(fieldId, {
          type: config.type,
          value: newValue,
        })}
      />
    </SettingsFieldVertical>
  );
}
