import { type LayoutFormField } from '@efie-form/core';
import PropSettingsWidth from '../property-settings/PropSettingsWidth';

interface ColumnSettingsProps {
  field: LayoutFormField;
}

function ColumnSettings({ field }: ColumnSettingsProps) {
  return (
    <div className="mb-4">
      <PropSettingsWidth field={field} />
    </div>
  );
}

export default ColumnSettings;
