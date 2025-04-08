import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type BorderWidthProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Input } from '../../../components/form';
import { Select } from '../../../components/form';

interface PropSettingsBorderWidthProps {
  field: FormField;
}

const defaultBorderWidth: BorderWidthProperty = {
  type: PropertyType.BORDER_WIDTH,
  value: {
    value: 1,
    unit: 'px',
  },
};

export default function PropSettingsBorderWidth({
  field,
}: PropSettingsBorderWidthProps) {
  const { updateFieldProps } = useSchemaStore();
  const borderWidthProp = field.props.find(
    field => field.type === PropertyType.BORDER_WIDTH,
  );
  const [borderWidth, setBorderWidth] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BORDER_WIDTH, value);
    },
    defaultValue: borderWidthProp || defaultBorderWidth,
  });

  return (
    <SettingsFieldHorizontal label="Border Width" divider>
      <div className="flex gap-2 items-center">
        <Input
          inputProps={{
            type: 'number',
          }}
          value={borderWidth.value.value.toString()}
          onChange={(newValue) => {
            setBorderWidth(prev => ({
              ...prev,
              value: {
                ...prev.value,
                value: Number(newValue),
              },
            }));
          }}
        />
        <Select
          value={borderWidth.value.unit}
          onChange={(newUnit) => {
            setBorderWidth(prev => ({
              ...prev,
              value: {
                ...prev.value,
                unit: newUnit,
              },
            }));
          }}
          options={[
            { value: 'px', label: 'px' },
            { value: 'em', label: 'em' },
            { value: 'rem', label: 'rem' },
          ]}
        />
      </div>
    </SettingsFieldHorizontal>
  );
}
