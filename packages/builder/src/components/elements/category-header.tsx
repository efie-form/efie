import type { ReactNode } from 'react';

interface CategoryHeaderProps {
  children?: ReactNode;
}

export default function CategoryHeader({ children }: CategoryHeaderProps) {
  return (
    <div className="bg-neutral-100 px-4 py-2">
      <p className="typography-body3 text-neutral-800 uppercase">{children}</p>
    </div>
  );
}
