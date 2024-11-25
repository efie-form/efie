import type { ReactNode } from 'react';

interface DndContextProps {
  children: ReactNode;
}

function DndContext({ children }: DndContextProps) {
  return <div>{children}</div>;
}

export default DndContext;
