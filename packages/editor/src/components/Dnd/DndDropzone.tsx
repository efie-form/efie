import type { DragEvent, ReactNode } from 'react';
import useThrottle from '../../lib/hooks/useThrottle.ts';
import { useDndStore } from '../../lib/state/dnd.state.ts';
import type { FormFieldType } from '@efie-form/core';

interface DndDroppableProps {
  children: ReactNode;
  items: string[];
  id: string;
  onNewFieldDrop?: (fieldType: FormFieldType, index: number) => void;
  accepts?: FormFieldType[];
  className?: string;
}

function DndDropzone({
  children,
  id,
  items,
  onNewFieldDrop,
  accepts,
  className,
}: DndDroppableProps) {
  const onDragOverHandler = useThrottle((e: DragEvent<HTMLDivElement>) => {
    console.log(`dropzone ${id},`, e);
  }, 150);
  const { draggedType } = useDndStore();
  const isAccepted = !accepts || (accepts && accepts.includes(draggedType!));

  return (
    <div
      dnd-id={id}
      onDragOver={(e) => {
        e.stopPropagation();
        if (!isAccepted) return;
        e.preventDefault();
        onDragOverHandler(e);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        if (!isAccepted) return;
        if (draggedType && onNewFieldDrop)
          onNewFieldDrop?.(draggedType, items.length);
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default DndDropzone;
