import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';

interface FieldKeyPropertyProps {
  fieldKey: string;
}

function FieldKeyProperty({ fieldKey }: FieldKeyPropertyProps) {
  return (
    <SettingsFieldVertical label="Field Key">
      <Controller
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChange={onChange} />
        )}
        name={`${fieldKey}.id`}
      />
    </SettingsFieldVertical>
  );
}

export default FieldKeyProperty;
