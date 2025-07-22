import { FieldType, PropertyType, SizeType, type ColumnFormField, type FieldConfigColumn } from '@efie-form/core';
import FieldSettings from '../field-settings';
import { useSettingsStore } from '../../../lib/state/settings.state';

interface ColumnSettingsProps {
  field: ColumnFormField;
}

function ColumnSettings({ field }: ColumnSettingsProps) {
  const config = useSettingsStore(state => state.config[FieldType.COLUMN]);

  return (
    <div className="mb-4">
      <FieldSettings config={withColumnWidthSettings(config.properties)} fieldId={field.id} />
    </div>
  );
}

export default ColumnSettings;

function withColumnWidthSettings(props: FieldConfigColumn['properties']) {
  if (props.some(prop => prop.type === PropertyType.COLUMN_WIDTH)) {
    return props;
  }
  return [
    {
      type: PropertyType.COLUMN_WIDTH,
      label: 'Column Width',
      value: { type: SizeType.PERCENTAGE, value: 100 },
    },
    ...props,
  ];
}
