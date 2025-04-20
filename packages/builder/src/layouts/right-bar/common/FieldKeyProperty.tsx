import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { Controller } from 'react-hook-form';
import Input from '../../../components/form/Input';
import { useSettingsStore } from '../../../lib/state/settings.state';

interface FieldKeyPropertyProps {
  fieldKey: string;
  divider?: boolean;
}

function FieldKeyProperty({ fieldKey, divider }: FieldKeyPropertyProps) {
  const { formKeyEditable } = useSettingsStore();

  return (
    <SettingsFieldVertical label="Field Key" divider={divider}>
      <Controller
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChange={onChange} disabled={!formKeyEditable} />
        )}
        name={`${fieldKey}.id`}
      />
    </SettingsFieldVertical>
  );
}

export default FieldKeyProperty;
