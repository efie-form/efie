import { isSizeValue, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropsTemplateSizeProps {
  label: string;
  value?: Size;
  onChange: (newValue: Size) => void;
}

export function PropsTemplateSize({ label, value, onChange }: PropsTemplateSizeProps) {
  const sizeValue = getValue(value);

  return (
    <SettingsFieldHorizontal label={label} divider>
      <SizeInput
        value={sizeValue}
        onChange={onChange}
      />
    </SettingsFieldHorizontal>
  );
}

function getValue(value?: Size): Size {
  if (!value || !isSizeValue(value)) return {
    type: 'auto',
  };
  return value;
}
