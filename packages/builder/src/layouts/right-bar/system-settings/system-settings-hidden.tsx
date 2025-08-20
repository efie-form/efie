import { type FieldSystemConfigHidden, isBooleanValue } from '@efie-form/core';
import { Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface SystemSettingsHiddenProps {
  fieldId: string;
  config: FieldSystemConfigHidden;
}

export default function SystemSettingsHidden({ fieldId, config }: SystemSettingsHiddenProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  return (
    <SettingsFieldHorizontal label={config.label} divider>
      <Switch
        checked={isBooleanValue(fieldProperty?.value) ? fieldProperty.value : false}
        onChange={(newValue) =>
          updateFieldProperty(fieldId, {
            type: config.type,
            value: newValue,
          })
        }
      />
    </SettingsFieldHorizontal>
  );
}
