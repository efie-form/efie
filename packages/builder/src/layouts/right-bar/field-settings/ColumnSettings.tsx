import { type ColumnFormField } from '@efie-form/core';
import PropSettingsWidth from '../property-settings/PropSettingsWidth';
import { FaTrash } from 'react-icons/fa';
import Button from '../../../components/elements/Button';

interface ColumnSettingsProps {
  field: ColumnFormField;
  onRemove: () => void;
}

function ColumnSettings({ field, onRemove }: ColumnSettingsProps) {
  return (
    <div className="mb-4">
      <PropSettingsWidth field={field} />
      <div className="flex justify-center mt-4 px-2">
        <Button onClick={onRemove} startIcon={FaTrash} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ColumnSettings;
