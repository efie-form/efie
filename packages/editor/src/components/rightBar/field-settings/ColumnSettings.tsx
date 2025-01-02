import { FormSchema, type FormFieldColumn } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import Input from '../../form/Input.tsx';
import { useFormContext } from 'react-hook-form';
import genFieldKey from '../../../lib/genFieldKey.ts';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
  onRemove: () => void;
}

function ColumnSettings({ field, fieldKey, onRemove }: ColumnSettingsProps) {
  const { setValue } = useFormContext<FormSchema>();

  return (
    <div className="mb-4">
      <SettingsFieldHorizontal label="Column Width">
        <Input
          value={field.props.width.toString()}
          onChange={(newValue) => {
            setValue(genFieldKey(fieldKey, 'props.width'), Number(newValue));
          }}
          inputProps={{
            type: 'number',
            min: 1,
          }}
          suffix="%"
          suffixType="text"
        />
        <button onClick={onRemove}>Delete</button>
      </SettingsFieldHorizontal>
    </div>
  );
}

export default ColumnSettings;
