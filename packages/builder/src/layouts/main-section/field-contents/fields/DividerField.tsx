import {
  colorToStyle,
  PropertyType,
  widthToStyle,
  type DividerFormField,
  sizeToStyle,
} from '@efie-form/core';
import { getFieldProp } from '../../../../lib/utils';

interface DividerFieldProps {
  field: DividerFormField;
}

function DividerField({ field }: DividerFieldProps) {
  const width = getFieldProp(field, PropertyType.WIDTH);
  const dividerHeight = getFieldProp(field, PropertyType.DIVIDER_HEIGHT);
  const color = getFieldProp(field, PropertyType.COLOR);
  const style = getFieldProp(field, PropertyType.BORDER_STYLE);

  return (
    <div className="py-1">
      <hr
        className="my-4 mx-auto"
        style={{
          width: widthToStyle(width),
          borderStyle: style?.value,
          borderColor: colorToStyle(color),
          borderTopWidth: sizeToStyle(dividerHeight?.value),
        }}
      />
    </div>
  );
}

export default DividerField;
