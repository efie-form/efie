import { type ColumnFormField, PropertyType } from '@efie-form/core';
import { FaTrash } from 'react-icons/fa';
import Button from '../../../components/elements/button';
import DynamicSettings from '../dynamic-settings';

interface ColumnSettingsProps {
  field: ColumnFormField;
  onRemove: () => void;
}

function ColumnSettings({ field, onRemove }: ColumnSettingsProps) {
  return (
    <div className="mb-4">
      <DynamicSettings
        fieldId={field.id}
        settings={[{ template: 'size', type: PropertyType.WIDTH, label: 'Width' }]}
      />
      <div className="mt-4 flex justify-center px-2">
        <Button onClick={onRemove} startIcon={FaTrash} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ColumnSettings;
