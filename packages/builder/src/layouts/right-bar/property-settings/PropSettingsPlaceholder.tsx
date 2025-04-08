import {
  PropertyType,
  type FormField,
  type PlaceholderProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface PropSettingsPlaceholderProps {
  field: FormField;
}

const defaultPlaceholder: PlaceholderProperty = {
  type: PropertyType.PLACEHOLDER,
  value: 'Placeholder',
};

export default function PropSettingsPlaceholder({
  field,
}: PropSettingsPlaceholderProps) {
  const { updateFieldProps } = useSchemaStore();
  const placeholderProp = field.props.find(
    field => field.type === PropertyType.PLACEHOLDER,
  );
  const [placeholder, setPlaceholder] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.PLACEHOLDER, value);
    },
    defaultValue: placeholderProp || defaultPlaceholder,
  });

  return (
    <SettingsFieldVertical label="Placeholder" divider>
      <Input
        value={placeholder.value}
        onChange={(newValue) => {
          setPlaceholder(() => ({
            type: PropertyType.PLACEHOLDER,
            value: newValue,
          }));
        }}
      />
    </SettingsFieldVertical>
  );
}
