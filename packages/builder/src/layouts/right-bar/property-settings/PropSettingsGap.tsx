import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type GapProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Input } from '../../../components/form';
import { Select } from '../../../components/form';

interface PropSettingsGapProps {
  field: FormField;
}

const defaultGap: GapProperty = {
  type: PropertyType.GAP,
  value: {
    value: 8,
    unit: 'px',
  },
};

export default function PropSettingsGap({ field }: PropSettingsGapProps) {
  const { updateFieldProps } = useSchemaStore();
  const gapProp = field.props.find(field => field.type === PropertyType.GAP);
  const [gap, setGap] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.GAP, value);
    },
    defaultValue: gapProp || defaultGap,
  });

  return (
    <SettingsFieldHorizontal label="Gap" divider>
      <div className="flex gap-2 items-center">
        <Input
          inputProps={{
            type: 'number',
          }}
          value={gap.value.value.toString()}
          onChange={(newValue) => {
            setGap(prev => ({
              ...prev,
              value: {
                ...prev.value,
                value: Number(newValue),
              },
            }));
          }}
        />
        <Select
          value={gap.value.unit}
          onChange={(newUnit) => {
            setGap(prev => ({
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
