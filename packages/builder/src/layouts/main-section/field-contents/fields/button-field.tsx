import IconExternal from '../../../../components/icons/icon-external';
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
  const action = getFieldProp(field, PropertyType.BUTTON_ACTION);
  const style = {
    display: 'inline-block',
    padding: paddingToStyle(padding?.value),
    backgroundColor: bgColor?.value.hex,
    borderRadius: borderRadiusToStyle(borderRadius?.value),
    color: colorToStyle(color?.value),
    width: widthToStyle(width?.value),
  };

  return (
    <div className={cn('p-2', align ? alignMap[align.value] : '')}>
      {action?.value.action === 'hyperlink'
        ? (
            <a
              href={action.value.url}
              target={action.value.target || '_self'}
              style={style}
            >
              <span className="flex gap-2 items-center">
                {label?.value}
                { action.value.target === '_blank' && (
                  <span aria-hidden="true">
                    <IconExternal />
                  </span>
                )}
              </span>
            </a>
          )
        : (
            <button style={style}>
              {label?.value}
            </button>
          )}
    </div>
  );
}

export default ButtonField;
