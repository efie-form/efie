import type { FormFieldColumn } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import Input from '../../form/Input.tsx';
import { Controller } from 'react-hook-form';
import genFieldKey from '../../../lib/genFieldKey.ts';
import SettingsFieldHorizontal from '../../layouts/SettingsFieldHorizontal.tsx';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
  onRemove: () => void;
}

function ColumnSettings({ fieldKey, onRemove }: ColumnSettingsProps) {
  return (
    <div className="mb-4">
      <SettingsFieldHorizontal label="Column Width">
        <Controller
          key={`${fieldKey}.props.width`}
          render={({ field: { onChange, value } }) => (
            <Input
              inputProps={{
                type: 'number',
                min: 1,
              }}
              value={value}
              onChange={onChange}
              suffix="%"
              suffixType="text"
            />
          )}
          name={genFieldKey(fieldKey, 'props.width')}
        />
        <button onClick={onRemove}>Delete</button>
      </SettingsFieldHorizontal>
    </div>
  );
}

export default ColumnSettings;
