import {
  PropertyType,
  type FormField,
  type MultipleProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Switch from '../../../components/form/Switch';

const defaultMultiple: MultipleProperty = {
  type: PropertyType.MULTIPLE,
  value: false,
};

interface PropSettingsMultipleProps {
  field: FormField;
}

export default function PropSettingsMultiple({
  field,
}: PropSettingsMultipleProps) {
  const { updateFieldProps, getFieldProps } = useSchemaStore();
  const multipleProp = getFieldProps(field.id, PropertyType.MULTIPLE);
  const [multiple, setMultiple] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.MULTIPLE, value);
    },
    defaultValue: multipleProp || defaultMultiple,
  });

  return (
    <SettingsFieldVertical label="Multiple files" divider>
      <Switch
        checked={multiple.value}
        onChange={(newValue) => {
          setMultiple({
            type: PropertyType.MULTIPLE,
            value: newValue,
          });
        }}
      />
    </SettingsFieldVertical>
  );
}
