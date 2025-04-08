import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type HeightProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Input } from '../../../components/form';
import { Select } from '../../../components/form';

interface PropSettingsHeightProps {
  field: FormField;
}

const defaultHeight: HeightProperty = {
  type: PropertyType.HEIGHT,
  value: {
    value: 40,
    unit: 'px',
  },
};

export default function PropSettingsHeight({ field }: PropSettingsHeightProps) {
  const { updateFieldProps } = useSchemaStore();
  const heightProp = field.props.find(
    field => field.type === PropertyType.HEIGHT,
  );
  const [height, setHeight] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.HEIGHT, value);
    },
    defaultValue: heightProp || defaultHeight,
  });

  return (
    <SettingsFieldHorizontal label="Height" divider>
      <div className="flex gap-2 items-center">
        <Input
          inputProps={{
            type: 'number',
          }}
          value={height.value.value.toString()}
          onChange={(newValue) => {
            setHeight(prev => ({
              ...prev,
              value: {
                ...prev.value,
                value: Number(newValue),
              },
            }));
          }}
        />
        <Select
          value={height.value.unit}
          onChange={(newUnit) => {
            setHeight(prev => ({
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
            { value: '%', label: '%' },
          ]}
        />
      </div>
    </SettingsFieldHorizontal>
  );
}
