import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type AutoWidthProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Switch } from '../../../components/form';

interface PropSettingsAutoWidthProps {
  field: FormField;
}

const defaultAutoWidth: AutoWidthProperty = {
  type: PropertyType.AUTO_WIDTH,
  value: true,
};

export default function PropSettingsAutoWidth({
  field,
}: PropSettingsAutoWidthProps) {
  const { updateFieldProps } = useSchemaStore();
  const autoWidthProp = field.props.find(
    (field) => field.type === PropertyType.AUTO_WIDTH
  );
  const [autoWidth, setAutoWidth] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.AUTO_WIDTH, value);
    },
    defaultValue: autoWidthProp || defaultAutoWidth,
  });

  return (
    <SettingsFieldHorizontal label="Auto Width" divider>
      <Switch
        checked={autoWidth.value}
        onChange={(newValue) => {
          setAutoWidth(() => ({
            type: PropertyType.AUTO_WIDTH,
            value: newValue,
          }));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
