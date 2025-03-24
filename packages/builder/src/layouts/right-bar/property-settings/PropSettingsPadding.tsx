import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides';
import {
  PropertyType,
  type PaddingProperty,
  type FormField,
} from '@efie-form/core';
import SettingsField4Sizes from '../property-layouts/SettingsField4SidesNew';

interface PropSettingsPaddingProps {
  field: FormField;
}

const defaultPadding: PaddingProperty = {
  type: PropertyType.PADDING,
  value: {
    top: { value: 0, unit: 'px' },
    right: { value: 0, unit: 'px' },
    bottom: { value: 0, unit: 'px' },
    left: { value: 0, unit: 'px' },
  },
};

export default function PropSettingsPadding({
  field,
}: PropSettingsPaddingProps) {
  const { updateFieldProps } = useSchemaStore();
  const paddingProp = field.props.find(
    (field) => field.type === PropertyType.PADDING
  );
  const [padding, setPadding] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.PADDING, value);
    },
    defaultValue: paddingProp || defaultPadding,
  });

  return (
    <SettingsField4Sizes
      label="Padding"
      allSizeLabel="Padding"
      onChange={(value) => {
        setPadding(() => ({
          type: PropertyType.PADDING,
          value,
        }));
      }}
      sizes={[
        {
          key: 'top',
          label: 'Top',
          value: padding.value.top.value,
          unit: padding.value.top.unit,
        },
        {
          key: 'right',
          label: 'Right',
          value: padding.value.right.value,
          unit: padding.value.right.unit,
        },
        {
          key: 'left',
          label: 'Left',
          value: padding.value.left.value,
          unit: padding.value.left.unit,
        },
        {
          key: 'bottom',
          label: 'Bottom',
          value: padding.value.bottom.value,
          unit: padding.value.bottom.unit,
        },
      ]}
    />
  );
}
