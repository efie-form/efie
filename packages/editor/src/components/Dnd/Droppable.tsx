import type { FormFieldType } from '@efie-form/core';
import type { ReactNode } from 'react';
import { useDroppable } from '../../lib/dndKit.tsx';
import type { DivProps } from 'react-html-props';
import { useDndStore } from '../../lib/state/dnd.state.ts';
import { cn } from '../../lib/utils.ts';

interface DroppableProps extends DivProps {
  id: string;
  type: FormFieldType;
  children: ReactNode;
}

const fieldDroppable: FormFieldType[] = [
  'shortText',
  'longText',
  'number',
  'singleChoice',
  'multipleChoices',
  'date',
  'time',
  'dateTime',
  'file',
  'button',
  'divider',
  'header',
  'paragraph',
  'image',
  'row',
  'block',
  'column',
];
// Record< A, B >
// A can be dropped on B
const droppable: Record<FormFieldType, FormFieldType[]> = {
  page: [],
  column: [],
  block: ['page', 'block'],
  button: fieldDroppable,
  date: fieldDroppable,
  dateTime: fieldDroppable,
  divider: fieldDroppable,
  file: fieldDroppable,
  header: fieldDroppable,
  image: fieldDroppable,
  longText: fieldDroppable,
  multipleChoices: fieldDroppable,
  row: fieldDroppable,
  number: fieldDroppable,
  paragraph: fieldDroppable,
  shortText: fieldDroppable,
  time: fieldDroppable,
  singleChoice: fieldDroppable,
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
  console.log(draggedType);

  return (
    <div {...props} ref={setNodeRef} className={cn({}, className)}>
      {children}
    </div>
  );
}

export default Droppable;
