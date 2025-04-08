import { ColorPicker } from '../../../components/form';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import {
  PropertyType,
  type BgColorProperty,
  type FormField,
} from '@efie-form/core';

interface PropSettingsBgColorProps {
  field: FormField;
}

const defaultBgColor: BgColorProperty = {
  type: PropertyType.BG_COLOR,
  value: '#ffffff',
};

export default function PropSettingsBgColor({
  field,
}: PropSettingsBgColorProps) {
  const { updateFieldProps } = useSchemaStore();
  const bgColorProp = field.props.find(
    field => field.type === PropertyType.BG_COLOR,
  );
  const [bgColor, setBgColor] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BG_COLOR, value);
    },
    defaultValue: bgColorProp || defaultBgColor,
  });

  return (
    <SettingsFieldHorizontal label="Background Color" divider>
      <ColorPicker
        value={bgColor?.value}
        onChange={(newColor) => {
          setBgColor(prev => ({
            ...prev,
            value: newColor,
          }));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
