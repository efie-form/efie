import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';
import { ColorPicker } from '../../../components/form';
import { type Color } from '@efie-form/core';

interface PropsTemplateColorProps {
  label: string;
  value: Color;
  onChange: (newColor: Color) => void;
}

export default function PropsTemplateColor({ label, value, onChange }: PropsTemplateColorProps) {
  return (
    <SettingsFieldHorizontal label={label} divider>
      <ColorPicker
        value={value}
        onChange={(newColor) => {
          onChange(newColor);
        }}
      />
    </SettingsFieldHorizontal>
  );
}
