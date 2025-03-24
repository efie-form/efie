import {
  PropertyType,
  type FormField,
  type LabelProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface PropSettingsLabelProps {
  field: FormField;
}

const defaultLabel: LabelProperty = {
  type: PropertyType.LABEL,
  value: 'Label',
};

export default function PropSettingsLabel({ field }: PropSettingsLabelProps) {
  const { updateFieldProps } = useSchemaStore();
  const labelProp = field.props.find(
    (field) => field.type === PropertyType.LABEL
  );
  const [label, setLabel] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.LABEL, value);
    },
    defaultValue: labelProp || defaultLabel,
  });

  return (
    <SettingsFieldVertical label="Label" divider>
      <Input
        value={label.value}
        onChange={(newValue) => {
          setLabel(() => ({
            type: PropertyType.LABEL,
            value: newValue,
          }));
        }}
      />
    </SettingsFieldVertical>
  );
}
