import { Input } from '../../../components/form';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropsTemplateNumberProps {
  label: string;
  placeholder?: string;
  value?: number;
  onChange: (newValue?: number) => void;
}

export default function PropsTemplateNumber({ label, placeholder, value, onChange }: PropsTemplateNumberProps) {
  const handleChange = (newValue: string) => {
    const trimmedValue = newValue.trim().replaceAll(',', '');
    const parsedValue = Number.parseFloat(trimmedValue);
    if (Number.isNaN(parsedValue)) {
      onChange();
    }
    else {
      onChange(parsedValue);
    }
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Input
        placeholder={placeholder}
        value={value?.toLocaleString() || ''}
        onChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}
