import {
  type ColumnFormField,
  type FieldConfigColumn,
  FieldType,
  PropertyType,
  SizeType,
} from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface ColumnSettingsProps {
  field: ColumnFormField;
}

function ColumnSettings({ field }: ColumnSettingsProps) {
  const config = useSettingsStore((state) => state.config[FieldType.COLUMN]);

  return (
    <div className="mb-4">
      <FieldSettings config={withColumnWidthSettings(config.properties)} fieldId={field.id} />
    </div>
  );
}

export default ColumnSettings;

function withColumnWidthSettings(props: FieldConfigColumn['properties']) {
  if (props.some((prop) => prop.type === PropertyType.COLUMN_WIDTH)) {
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
