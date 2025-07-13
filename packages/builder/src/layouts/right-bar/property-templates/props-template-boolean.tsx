import { Switch } from '../../../components/form';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropTemplateBoolean {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export default function PropsTemplateBoolean({ label, value, onChange }: PropTemplateBoolean) {
  const handleChange = (newValue: boolean) => {
    onChange(newValue);
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Switch
        checked={value}
        onChange={handleChange}
      />
    </SettingsFieldHorizontal>
  );
}
