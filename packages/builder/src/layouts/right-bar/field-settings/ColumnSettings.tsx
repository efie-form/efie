import { PropertyType, type FormFieldColumn } from '@efie-form/core';
import Input from '../../../components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface ColumnSettingsProps {
  field: FormFieldColumn;
  onRemove: () => void;
}

function ColumnSettings({ field, onRemove }: ColumnSettingsProps) {
  const { updateFieldProps, getFieldProps } = useSchemaStore();
  const width = getFieldProps(field.id, PropertyType.WIDTH);

  return (
    <div className="mb-4">
      <SettingsFieldHorizontal label="Column Width">
        <Input
          value={width?.value.toString()}
          onChange={(newValue) => {
            // updateFieldProps(field.id, 'props.width', Number(newValue));
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
