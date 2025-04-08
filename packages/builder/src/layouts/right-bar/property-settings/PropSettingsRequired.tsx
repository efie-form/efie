import {
  PropertyType,
  type FormField,
  type RequiredProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Switch } from '../../../components/form';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

interface PropSettingsRequiredProps {
  field: FormField;
}

const defaultRequired: RequiredProperty = {
  type: PropertyType.REQUIRED,
  value: false,
};

export default function PropSettingsRequired({
  field,
}: PropSettingsRequiredProps) {
  const { updateFieldProps } = useSchemaStore();
  const requiredProp = field.props.find(
    field => field.type === PropertyType.REQUIRED,
  );
  const [required, setRequired] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.REQUIRED, value);
    },
    defaultValue: requiredProp || defaultRequired,
  });

  return (
    <SettingsFieldHorizontal label="Required" divider>
      <Switch
        checked={required.value}
        onChange={(newValue) => {
          setRequired(prev => ({
            ...prev,
            value: newValue,
          }));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
