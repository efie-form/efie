import { type FormFieldColumn } from '@efie-form/core';
import Input from '../../../components/form/Input.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  onRemove: () => void;
}

function ColumnSettings({ field, onRemove }: ColumnSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div className="mb-4">
      <SettingsFieldHorizontal label="Column Width">
        <Input
          value={field.props.width.toString()}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.width', Number(newValue));
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
