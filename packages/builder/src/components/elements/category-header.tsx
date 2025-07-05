import type { ReactNode } from 'react';

interface CategoryHeaderProps {
  children?: ReactNode;

}

export default function CategoryHeader({ children }: CategoryHeaderProps) {
  return (
    <div className="px-4 py-2 bg-neutral-100">
      <p className="typography-body3 uppercase text-neutral-800">
        {children}
      </p>
    </div>
  );
}
