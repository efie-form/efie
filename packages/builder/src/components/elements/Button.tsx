import type { ElementType, ReactNode } from 'react';
import type { ButtonPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonPropsWithoutRef {
  children: ReactNode;
  startIcon?: ElementType;
  endIcon?: ElementType;
}

function Button({
  children,
  className,
  startIcon: StartIcon,
  endIcon: EndIcon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn('button typography-button2', className, {
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
