import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type BorderStyleProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsBorderStyleProps {
  field: FormField;
}

const defaultBorderStyle: BorderStyleProperty = {
  type: PropertyType.BORDER_STYLE,
  value: 'solid',
};

const BORDER_STYLE_OPTIONS = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'double', label: 'Double' },
  { value: 'groove', label: 'Groove' },
  { value: 'ridge', label: 'Ridge' },
  { value: 'inset', label: 'Inset' },
  { value: 'outset', label: 'Outset' },
  { value: 'none', label: 'None' },
  { value: 'hidden', label: 'Hidden' },
];

export default function PropSettingsBorderStyle({
  field,
}: PropSettingsBorderStyleProps) {
  const { updateFieldProps } = useSchemaStore();
  const borderStyleProp = field.props.find(
    (field) => field.type === PropertyType.BORDER_STYLE
  );
  const [borderStyle, setBorderStyle] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BORDER_STYLE, value);
    },
    defaultValue: borderStyleProp || defaultBorderStyle,
  });

  return (
    <SettingsFieldHorizontal label="Border Style" divider>
      <Select
        value={borderStyle.value}
        onChange={(newValue) => {
          setBorderStyle((prev) => ({
            ...prev,
            value: newValue,
          }));
        }}
        options={BORDER_STYLE_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
