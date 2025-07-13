import Select from '../../../components/form/select';
import SettingsFieldHorizontal from '../property-layouts/settings-field-horizontal';

interface PropsSettingsSelectProps {
  label: string;
  value: string;
  onChange: (newValue?: string) => void;
  options: { value: string | number; label: string }[];
}

export default function PropsSettingsSelect({
  label,
  onChange,
  value,
  options,
}: PropsSettingsSelectProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue === '' ? undefined : newValue);
  };

  // Convert options to string-only format for the Select component
  const stringOptions = options.map(option => ({
    value: String(option.value),
    label: option.label,
  }));

  return (
    <SettingsFieldHorizontal label={label} divider>
      <Select
        value={value}
        onChange={handleChange}
        options={stringOptions}
        className="w-full"
      />
    </SettingsFieldHorizontal>
  );
}
