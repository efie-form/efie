import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type TextAlignProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsAlignProps {
  field: FormField;
}

type TextAlign = 'left' | 'center' | 'right';

const defaultAlign: TextAlignProperty = {
  type: PropertyType.TEXT_ALIGN,
  value: 'left',
};

const ALIGN_OPTIONS: Array<{ value: TextAlign; label: string }> = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export default function PropSettingsAlign({ field }: PropSettingsAlignProps) {
  const { updateFieldProps } = useSchemaStore();
  const alignProp = field.props.find(
    field => field.type === PropertyType.TEXT_ALIGN,
  );
  const [align, setAlign] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.TEXT_ALIGN, value);
    },
    defaultValue: alignProp || defaultAlign,
  });

  return (
    <SettingsFieldHorizontal label="Align" divider>
      <Select
        value={align.value}
        onChange={(newValue) => {
          setAlign(() => ({
            type: PropertyType.TEXT_ALIGN,
            value: newValue as TextAlign,
          }));
        }}
        options={ALIGN_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
