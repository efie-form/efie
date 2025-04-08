import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type FontWeightProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsFontWeightProps {
  field: FormField;
}

const defaultFontWeight: FontWeightProperty = {
  type: PropertyType.FONT_WEIGHT,
  value: 400,
};

const FONT_WEIGHT_OPTIONS = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' },
];

export default function PropSettingsFontWeight({
  field,
}: PropSettingsFontWeightProps) {
  const { updateFieldProps } = useSchemaStore();
  const fontWeightProp = field.props.find(
    field => field.type === PropertyType.FONT_WEIGHT,
  );
  const [fontWeight, setFontWeight] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.FONT_WEIGHT, value);
    },
    defaultValue: fontWeightProp || defaultFontWeight,
  });

  return (
    <SettingsFieldHorizontal label="Font Weight" divider>
      <Select
        value={fontWeight.value.toString()}
        onChange={(newValue) => {
          setFontWeight(prev => ({
            ...prev,
            value: Number(newValue),
          }));
        }}
        options={FONT_WEIGHT_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
