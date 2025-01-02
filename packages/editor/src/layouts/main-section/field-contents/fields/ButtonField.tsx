import type { FormFieldButton } from '@efie-form/core';
import { cn } from '../../../../lib/utils.ts';

interface ButtonFieldProps {
  field: FormFieldButton;
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function ButtonField({ field }: ButtonFieldProps) {
  return (
    <div className={cn('p-2', alignMap[field.props.align])}>
      <button
        style={{
          backgroundColor: field.props.bgColor,
          color: field.props.color,
          paddingTop: field.props.padding.top,
          paddingRight: field.props.padding.right,
          paddingBottom: field.props.padding.bottom,
          paddingLeft: field.props.padding.left,
          width: field.props.fullWidth ? '100%' : 'auto',
          borderTopLeftRadius: field.props.border.radius.topLeft,
          borderTopRightRadius: field.props.border.radius.topRight,
          borderBottomRightRadius: field.props.border.radius.bottomRight,
          borderBottomLeftRadius: field.props.border.radius.bottomLeft,
        }}
      >
        {field.props.label}
      </button>
    </div>
  );
}

export default ButtonField;
