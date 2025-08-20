import type { ReactNode } from 'react';
import type { DivProps } from 'react-html-props';
import { cn } from '../../lib/utils';

interface DividerProps extends DivProps {
  children?: ReactNode;
}

export default function Divider({ children, className, ...props }: DividerProps) {
  if (!children) {
    return (
      <div className={cn('flex-1 border-t w-full border-neutral-200 my-4', className)} {...props} />
    );
  }

  return (
    <div className={cn('relative flex my-1 items-center gap-2', className)} {...props}>
      <div className="flex-1 border-t-2 w-full border-neutral-100" />
      {children}
      <div className="flex-1 border-t-2 w-full border-neutral-100" />
    </div>
  );
}
