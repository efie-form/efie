import type { FormFieldType } from '@efie-form/core';

interface UseDndItemProps {
  id: string;
  type: FormFieldType;
}

function useDndItem({ id, type }: UseDndItemProps) {
  const dragHandlerProps = {
    draggable: true,
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log('drag start');
    },
  };

  return {
    dragHandlerProps,
    attributes: {
      'data-dnd-id': id,
      'data-dnd-type': type,
    },
  };
}

export default useDndItem;
