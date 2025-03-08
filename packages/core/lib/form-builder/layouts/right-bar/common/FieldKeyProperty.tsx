import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { Controller } from 'react-hook-form';
import Input from '@form-builder/components/form/Input';

interface FieldKeyPropertyProps {
  fieldKey: string;
  divider?: boolean;
}

function FieldKeyProperty({ fieldKey, divider }: FieldKeyPropertyProps) {
  return (
    <SettingsFieldVertical label="Field Key" divider={divider}>
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
