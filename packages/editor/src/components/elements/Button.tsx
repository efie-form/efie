import type { ReactNode } from 'react';
import type { ButtonPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils.ts';

interface ButtonProps extends ButtonPropsWithoutRef {
  children: ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'bg-primary text-white hover:text-primary-50 typography-button2 px-4 py-1.5 rounded-md text-center hover:bg-primary-600 active:translate-x-[0.5px] active:translate-y-[0.5px]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
