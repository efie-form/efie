import type { ElementType, ReactNode } from 'react';
import type { ButtonPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonPropsWithoutRef {
  children: ReactNode;
  startIcon?: ElementType;
  endIcon?: ElementType;
  variant?: 'primary' | 'secondary';
}

function Button({
  children,
  className,
  startIcon: StartIcon,
  endIcon: EndIcon,
  disabled,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn('button typography-button3', className, variant, {
        disabled,
      })}
      {...props}
    >
      {StartIcon && (
        <span>
          <StartIcon />
        </span>
      )}
      {children}
      {EndIcon && (
        <span>
          <EndIcon />
        </span>
      )}
    </button>
  );
}

export default Button;
