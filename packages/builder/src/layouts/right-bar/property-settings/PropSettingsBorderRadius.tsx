import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type BorderRadiusProperty,
  type FormField,
} from '@efie-form/core';
import SettingsField4Sizes from '../property-layouts/SettingsField4SidesNew';

interface PropSettingsBorderRadiusProps {
  field: FormField;
}

const defaultBorderRadius: BorderRadiusProperty = {
  type: PropertyType.BORDER_RADIUS,
  value: {
    topLeft: { value: 0, unit: 'px' },
    topRight: { value: 0, unit: 'px' },
    bottomRight: { value: 0, unit: 'px' },
    bottomLeft: { value: 0, unit: 'px' },
  },
};

export default function PropSettingsBorderRadius({
  field,
}: PropSettingsBorderRadiusProps) {
  const { updateFieldProps } = useSchemaStore();
  const borderRadiusProp = field.props.find(
    (field) => field.type === PropertyType.BORDER_RADIUS
  );
  const [borderRadius, setBorderRadius] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BORDER_RADIUS, value);
    },
    value: borderRadiusProp || defaultBorderRadius,
  });

  return (
    <SettingsField4Sizes
      label="Border Radius"
      allSizeLabel="Border Radius"
      onChange={(value) => {
        setBorderRadius(() => ({
          type: PropertyType.BORDER_RADIUS,
          value,
        }));
      }}
      sizes={[
        {
          key: 'topLeft',
          label: 'Top Left',
          value: borderRadius.value.topLeft.value,
          unit: borderRadius.value.topLeft.unit,
        },
        {
          key: 'topRight',
          label: 'Top Right',
          value: borderRadius.value.topRight.value,
          unit: borderRadius.value.topRight.unit,
        },
        {
          key: 'bottomLeft',
          label: 'Bottom Left',
          value: borderRadius.value.bottomLeft.value,
          unit: borderRadius.value.bottomLeft.unit,
        },
        {
          key: 'bottomRight',
          label: 'Bottom Right',
          value: borderRadius.value.bottomRight.value,
          unit: borderRadius.value.bottomRight.unit,
        },
      ]}
    />
  );
}
