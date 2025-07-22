import type { ElementType } from 'react';
import type { ButtonPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonPropsWithoutRef {
  variant?: 'primary' | 'secondary' | 'danger';
  Icon: ElementType;
}

function IconButton({
  className,
  Icon,
  disabled,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn('icon-button typography-button3', className, variant, {
        disabled,
      })}
      {...props}
    >
      <Icon />
    </button>
  );
}

export default IconButton;
