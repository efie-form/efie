import {
  colorToStyle,
  PropertyType,
  type DividerFormField,
} from '@efie-form/core';
import { getFieldProp } from '../../../../lib/utils';

interface DividerFieldProps {
  field: DividerFormField;
}

function DividerField({ field }: DividerFieldProps) {
  const width = getFieldProp(field, PropertyType.WIDTH);
  const height = getFieldProp(field, PropertyType.HEIGHT);
  const color = getFieldProp(field, PropertyType.COLOR);
  const style = getFieldProp(field, PropertyType.BORDER_STYLE);

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
