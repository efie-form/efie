import type { ReactNode } from 'react';
import { useDroppable } from './dnd-kit.type';
import type { DivProps } from 'react-html-props';
import { useDndStore } from '../../lib/state/dnd.state';
import { cn } from '../../lib/utils';
import { FieldType } from '@efie-form/core';

interface DroppableProps extends DivProps {
  id: string;
  type: FieldType;
  children: ReactNode;
}

const fieldDroppable: FieldType[] = [
  FieldType.SHORT_TEXT,
  FieldType.LONG_TEXT,
  FieldType.NUMBER,
  FieldType.SINGLE_CHOICE,
  FieldType.MULTIPLE_CHOICES,
  FieldType.DATE,
  FieldType.TIME,
  FieldType.DATE_TIME,
  FieldType.FILE,
  FieldType.BUTTON,
  FieldType.DIVIDER,
  FieldType.HEADER,
  FieldType.PARAGRAPH,
  FieldType.IMAGE,
  FieldType.ROW,
  FieldType.BLOCK,
  FieldType.COLUMN,
];
// Record< A, B >
// A can be dropped on B
const droppable: Record<FieldType, FieldType[]> = {
  [FieldType.PAGE]: [],
  [FieldType.COLUMN]: [],
  [FieldType.BLOCK]: [FieldType.PAGE, FieldType.BLOCK],
  [FieldType.BUTTON]: fieldDroppable,
  [FieldType.DATE]: fieldDroppable,
  [FieldType.DATE_TIME]: fieldDroppable,
  [FieldType.DIVIDER]: fieldDroppable,
  [FieldType.FILE]: fieldDroppable,
  [FieldType.HEADER]: fieldDroppable,
  [FieldType.IMAGE]: fieldDroppable,
  [FieldType.LONG_TEXT]: fieldDroppable,
  [FieldType.MULTIPLE_CHOICES]: fieldDroppable,
  [FieldType.ROW]: fieldDroppable,
  [FieldType.NUMBER]: fieldDroppable,
  [FieldType.PARAGRAPH]: fieldDroppable,
  [FieldType.SHORT_TEXT]: fieldDroppable,
  [FieldType.TIME]: fieldDroppable,
  [FieldType.SINGLE_CHOICE]: fieldDroppable,
};

function Droppable({
  id,
  type,
  children,
  className,
  ...props
}: DroppableProps) {
  const { draggedType } = useDndStore();
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type,
      id,
    },
    disabled: !!draggedType && !droppable[draggedType].includes(type),
  });

  return (
    <div {...props} id={id} ref={setNodeRef} className={cn({}, className)}>
      {children}
    </div>
  );
}

export default Droppable;
