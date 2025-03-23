import {
  PropertyType,
  type ColorProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { ColorPicker } from '../../../components/form';

interface PropSettingsColorProps {
  field: FormField;
}

const defaultColor: ColorProperty = {
  type: PropertyType.COLOR,
  value: '#000000',
};

export default function PropSettingsColor({ field }: PropSettingsColorProps) {
  const { updateFieldProps } = useSchemaStore();
  const colorProp = field.props.find(
    (field) => field.type === PropertyType.COLOR
  );
  const [color, setColor] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.COLOR, value);
    },
    value: colorProp || defaultColor,
  });

  return (
    <SettingsFieldHorizontal label="Color" divider>
      <ColorPicker
        value={color?.value}
        onChange={(newColor) => {
          setColor((prev) => ({
            ...prev,
            value: newColor,
          }));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
