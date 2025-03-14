import type { ReactNode } from 'react';
import { useDroppable } from './dnd-kit.type.tsx';
import type { DivProps } from 'react-html-props';
import { useDndStore } from '../../lib/state/dnd.state.ts';
import { cn } from '../../lib/utils.ts';
import { FormFieldType } from '../../../InputType';

interface DroppableProps extends DivProps {
  id: string;
  type: FormFieldType;
  children: ReactNode;
}

const fieldDroppable: FormFieldType[] = [
  FormFieldType.SHORT_TEXT,
  FormFieldType.LONG_TEXT,
  FormFieldType.NUMBER,
  FormFieldType.SINGLE_CHOICE,
  FormFieldType.MULTIPLE_CHOICES,
  FormFieldType.DATE,
  FormFieldType.TIME,
  FormFieldType.DATE_TIME,
  FormFieldType.FILE,
  FormFieldType.BUTTON,
  FormFieldType.DIVIDER,
  FormFieldType.HEADER,
  FormFieldType.PARAGRAPH,
  FormFieldType.IMAGE,
  FormFieldType.ROW,
  FormFieldType.BLOCK,
  FormFieldType.COLUMN,
];
// Record< A, B >
// A can be dropped on B
const droppable: Record<FormFieldType, FormFieldType[]> = {
  [FormFieldType.PAGE]: [],
  [FormFieldType.COLUMN]: [],
  [FormFieldType.BLOCK]: [FormFieldType.PAGE, FormFieldType.BLOCK],
  [FormFieldType.BUTTON]: fieldDroppable,
  [FormFieldType.DATE]: fieldDroppable,
  [FormFieldType.DATE_TIME]: fieldDroppable,
  [FormFieldType.DIVIDER]: fieldDroppable,
  [FormFieldType.FILE]: fieldDroppable,
  [FormFieldType.HEADER]: fieldDroppable,
  [FormFieldType.IMAGE]: fieldDroppable,
  [FormFieldType.LONG_TEXT]: fieldDroppable,
  [FormFieldType.MULTIPLE_CHOICES]: fieldDroppable,
  [FormFieldType.ROW]: fieldDroppable,
  [FormFieldType.NUMBER]: fieldDroppable,
  [FormFieldType.PARAGRAPH]: fieldDroppable,
  [FormFieldType.SHORT_TEXT]: fieldDroppable,
  [FormFieldType.TIME]: fieldDroppable,
  [FormFieldType.SINGLE_CHOICE]: fieldDroppable,
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
