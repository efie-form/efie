import type { DragEvent, ReactNode } from 'react';
import { useState } from 'react';
import useThrottle from '../../lib/hooks/useThrottle.ts';
import { useDndStore } from '../../lib/state/dnd.state.ts';
import type { FormFieldType } from '@efie-form/core';
import getHoverFieldId from '../../lib/getHoverFieldId.ts';

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
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [prevMouseY, setPrevMouseY] = useState(0);

  const { draggedType, clearDraggedType } = useDndStore();
  const isAccepted = !accepts || (accepts && accepts.includes(draggedType!));

  const onDragOverHandler = useThrottle((e: DragEvent<HTMLDivElement>) => {
    setPrevMouseY(e.clientY);
    const mouseDirection = e.clientY > prevMouseY ? 1 : 0;
    const id = getHoverFieldId(e.target as HTMLElement, accepts);
    if (!id) {
      setDropIndex(items.length);
      return;
    }
    const index = items.indexOf(id);
    if (index !== -1) {
      setDropIndex(index + mouseDirection);
    }
  }, 150);

  return (
    <div
      data-dnd-id={id}
      onDragOver={(e) => {
        if (!isAccepted) return;
        e.stopPropagation();
        e.preventDefault();
        onDragOverHandler(e);
      }}
      onDrop={(e) => {
        if (!isAccepted) return;
        e.stopPropagation();
        clearDraggedType();
        if (draggedType && onNewFieldDrop)
          onNewFieldDrop?.(draggedType, dropIndex ?? items.length);
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default DndDropzone;
