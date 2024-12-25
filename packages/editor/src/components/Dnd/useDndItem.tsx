import type { FormFieldType } from '@efie-form/core';
import { useDraggable } from '../../lib/dndKit.tsx';

interface UseDndItemProps {
  id: string;
  type: FormFieldType;
  index: number;
  parentId: string;
}

const acceptTypes = {
  default: [
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
  ],
  block: ['block'],
};

function useDndItem({ id, type, index, parentId }: UseDndItemProps) {
  const { listeners, attributes, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type,
      index,
      parentId,
      id,
      action: 'move',
    },
  });

  const dragHandlerProps = {
    ...listeners,
  };

  return {
    dragHandlerProps,
    attributes: {
      ...attributes,
      style: {
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        backgroundColor: transform ? 'white' : undefined,
        zIndex: transform ? 100 : undefined,
      },
      ref: setNodeRef,
      'data-dnd-id': id,
      'data-dnd-type': type,
    },
  };
}

export default useDndItem;
