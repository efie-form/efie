import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type FontSizeProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Input } from '../../../components/form';
import { Select } from '../../../components/form';

interface PropSettingsFontSizeProps {
  field: FormField;
}

const defaultFontSize: FontSizeProperty = {
  type: PropertyType.FONT_SIZE,
  value: {
    value: 16,
    unit: 'px',
  },
};

export default function PropSettingsFontSize({
  field,
}: PropSettingsFontSizeProps) {
  const { updateFieldProps } = useSchemaStore();
  const fontSizeProp = field.props.find(
    field => field.type === PropertyType.FONT_SIZE,
  );
  const [fontSize, setFontSize] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.FONT_SIZE, value);
    },
    defaultValue: fontSizeProp || defaultFontSize,
  });

  return (
    <SettingsFieldHorizontal label="Font Size" divider>
      <div className="flex gap-2 items-center">
        <Input
          inputProps={{
            type: 'number',
          }}
          value={fontSize.value.value.toString()}
          onChange={(newValue) => {
            setFontSize(prev => ({
              ...prev,
              value: {
                ...prev.value,
                value: Number(newValue),
              },
            }));
          }}
        />
        <Select
          value={fontSize.value.unit}
          onChange={(newUnit) => {
            setFontSize(prev => ({
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
