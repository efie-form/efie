import { cn, getFieldProp } from '../../../../lib/utils';
import {
  type ButtonFormField,
  borderRadiusToStyle,
  colorToStyle,
  paddingToStyle,
  PropertyType,
  widthToStyle,
} from '@efie-form/core';
interface ButtonFieldProps {
  field: ButtonFormField;
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function ButtonField({ field }: ButtonFieldProps) {
  const bgColor = getFieldProp(field, PropertyType.BACKGROUND_COLOR);
  const color = getFieldProp(field, PropertyType.COLOR);
  const padding = getFieldProp(field, PropertyType.PADDING);
  const borderRadius = getFieldProp(field, PropertyType.BORDER_RADIUS);
  const align = getFieldProp(field, PropertyType.TEXT_ALIGN);
  const width = getFieldProp(field, PropertyType.WIDTH);
  const label = getFieldProp(field, PropertyType.LABEL);

  return (
    <div className={cn('p-2', align ? alignMap[align.value] : '')}>
      <button
        style={{
          padding: paddingToStyle(padding?.value),
          backgroundColor: bgColor?.value.hex,
          borderRadius: borderRadiusToStyle(borderRadius?.value),
          color: colorToStyle(color?.value),
          width: widthToStyle(width?.value),
        }}
      >
        {label?.value}
      </button>
    </div>
  );
}

export default ButtonField;
