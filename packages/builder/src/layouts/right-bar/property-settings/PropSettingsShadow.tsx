import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldShadow from '../property-layouts/SettingsFieldShadow';
import {
  PropertyType,
  type BoxShadowProperty,
  type FormField,
} from '@efie-form/core';

interface PropSettingsShadowProps {
  field: FormField;
}

const defaultShadow: BoxShadowProperty = {
  type: PropertyType.BOX_SHADOW,
  value: [
    {
      x: { value: 0, unit: 'px' },
      y: { value: 0, unit: 'px' },
      blur: { value: 0, unit: 'px' },
      spread: { value: 0, unit: 'px' },
      color: '#000000',
      inset: false,
    },
  ],
};

export default function PropSettingsShadow({ field }: PropSettingsShadowProps) {
  const { updateFieldProps } = useSchemaStore();
  const shadowProp = field.props.find(
    (field) => field.type === PropertyType.BOX_SHADOW
  );
  const [shadow, setShadow] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BOX_SHADOW, value);
    },
    value: shadowProp || defaultShadow,
  });

  return <SettingsFieldShadow label="Shadow" field={field} divider />;
}
