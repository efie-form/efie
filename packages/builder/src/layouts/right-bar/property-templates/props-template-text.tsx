import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface PropsTemplateTextProps<T extends string> {
  label: string;
  placeholder?: string;
  value: T;
  onChange: (value: T) => void;
}

export default function PropsTemplateText<T extends string>({ label, placeholder, value, onChange }: PropsTemplateTextProps<T>) {
  return (
    <SettingsFieldVertical label={label} divider>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={((newValue) => {
          onChange(newValue as T);
        })}
      />
    </SettingsFieldVertical>
  );
}
