import { cn } from '../../../../lib/utils';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import {
  type ButtonFormField,
  borderRadiusToStyle,
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
  const { getFieldProps } = useSchemaStore();
  const bgColor = getFieldProps(field.id, PropertyType.BG_COLOR);
  const color = getFieldProps(field.id, PropertyType.COLOR);
  const padding = getFieldProps(field.id, PropertyType.PADDING);
  const borderRadius = getFieldProps(field.id, PropertyType.BORDER_RADIUS);
  const align = getFieldProps(field.id, PropertyType.TEXT_ALIGN);
  const width = getFieldProps(field.id, PropertyType.WIDTH);
  const label = getFieldProps(field.id, PropertyType.LABEL);

  return (
    <div className={cn('p-2', align ? alignMap[align.value] : '')}>
      <button
        style={{
          padding: paddingToStyle(padding),
          backgroundColor: bgColor?.value,
          borderRadius: borderRadiusToStyle(borderRadius),
          color: color?.value,
          width: widthToStyle(width),
        }}
      >
        {label?.value}
      </button>
    </div>
  );
}

export default ButtonField;
