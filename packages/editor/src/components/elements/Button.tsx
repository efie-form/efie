import type { ElementType, ReactNode } from 'react';
import type { ButtonPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils.ts';

interface ButtonProps extends ButtonPropsWithoutRef {
  children: ReactNode;
  StartIcon?: ElementType;
  EndIcon?: ElementType;
}

function Button({
  children,
  className,
  StartIcon,
  EndIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'bg-primary flex justify-center text-white hover:text-primary-50 typography-button2 px-4 py-1.5 rounded-md text-center hover:bg-primary-600 active:translate-x-[0.5px] active:translate-y-[0.5px] items-center gap-2',
        className
      )}
      {...props}
    >
      {StartIcon && <StartIcon />}
      {children}
      {EndIcon && <EndIcon />}
    </button>
  );
}

export default Button;
