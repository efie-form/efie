import type { FormFieldType } from '@efie-form/core';
import type { ReactNode } from 'react';
import { useDroppable } from '../../lib/dndKit.tsx';
import type { DivProps } from 'react-html-props';
import { useDndStore } from '../../lib/state/dnd.state.ts';

interface DroppableProps extends DivProps {
  id: string;
  type: FormFieldType;
  children: ReactNode;
}

function Droppable({ id, type, children, ...props }: DroppableProps) {
  const { action, draggedType } = useDndStore();
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type,
      id,
    },
    disabled: action === 'move' && draggedType === type,
  });

  return (
    <div {...props} ref={setNodeRef}>
      {children}
    </div>
  );
}

export default Droppable;
