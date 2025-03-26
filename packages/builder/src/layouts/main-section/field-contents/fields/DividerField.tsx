import {
  colorToStyle,
  PropertyType,
  type DividerFormField,
} from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface DividerFieldProps {
  field: DividerFormField;
}

function DividerField({ field }: DividerFieldProps) {
  const { getFieldProps } = useSchemaStore();
  const width = getFieldProps(field.id, PropertyType.WIDTH);
  const height = getFieldProps(field.id, PropertyType.HEIGHT);
  const color = getFieldProps(field.id, PropertyType.COLOR);
  const style = getFieldProps(field.id, PropertyType.BORDER_STYLE);

  return (
    <div className="py-1">
      <hr
        className="my-4 mx-auto"
        style={{
          width: `${width?.value.value}%`,
          borderStyle: style?.value,
          borderColor: colorToStyle(color),
          borderTopWidth: `${height?.value.value}px`,
        }}
      />
    </div>
  );
}

export default DividerField;
