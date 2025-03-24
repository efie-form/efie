import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type MarginProperty,
  type FormField,
} from '@efie-form/core';
import SettingsField4Sizes from '../property-layouts/SettingsField4SidesNew';

interface PropSettingsMarginProps {
  field: FormField;
}

const defaultMargin: MarginProperty = {
  type: PropertyType.MARGIN,
  value: {
    top: { value: 0, unit: 'px' },
    right: { value: 0, unit: 'px' },
    bottom: { value: 0, unit: 'px' },
    left: { value: 0, unit: 'px' },
  },
};

export default function PropSettingsMargin({ field }: PropSettingsMarginProps) {
  const { updateFieldProps } = useSchemaStore();
  const marginProp = field.props.find(
    (field) => field.type === PropertyType.MARGIN
  );
  const [margin, setMargin] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.MARGIN, value);
    },
    value: marginProp || defaultMargin,
  });

  return (
    <SettingsField4Sizes
      label="Margin"
      allSizeLabel="Margin"
      onChange={(value) => {
        setMargin(() => ({
          type: PropertyType.MARGIN,
          value,
        }));
      }}
      sizes={[
        {
          key: 'top',
          label: 'Top',
          value: margin.value.top.value,
          unit: margin.value.top.unit,
        },
        {
          key: 'right',
          label: 'Right',
          value: margin.value.right.value,
          unit: margin.value.right.unit,
        },
        {
          key: 'left',
          label: 'Left',
          value: margin.value.left.value,
          unit: margin.value.left.unit,
        },
        {
          key: 'bottom',
          label: 'Bottom',
          value: margin.value.bottom.value,
          unit: margin.value.bottom.unit,
        },
      ]}
    />
  );
}
