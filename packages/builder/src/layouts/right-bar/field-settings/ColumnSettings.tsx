import { type ColumnFormField } from '@efie-form/core';
import { FaTrash } from 'react-icons/fa';
import Button from '../../../components/elements/Button';
import DynamicSettings from '../DynamicSettings';

interface ColumnSettingsProps {
  field: ColumnFormField;
  onRemove: () => void;
}

function ColumnSettings({ field, onRemove }: ColumnSettingsProps) {
  return (
    <div className="mb-4">
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: 'size', type: 'width', label: 'Width' },
        ]}
      />
      <div className="flex justify-center mt-4 px-2">
        <Button onClick={onRemove} startIcon={FaTrash} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ColumnSettings;
