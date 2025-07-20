import { isBooleanValue, type FieldSystemConfigRequired } from '@efie-form/core';
import { Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface SystemSettingsRequiredProps {
  fieldId: string;
  config: FieldSystemConfigRequired;
}

export default function SystemSettingsRequired({ fieldId, config }: SystemSettingsRequiredProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <Switch
        checked={isBooleanValue(fieldProperty?.value) ? fieldProperty.value : false}
        onChange={newValue => updateFieldProperty(fieldId, {
          type: config.type,
          value: newValue,
        })}
      />
    </SettingsFieldHorizontal>
  );
}
