import { useDraggable } from '@form-builder/components/dnd-kit/dnd-kit.type.tsx';
import type { FormFieldType } from '@lib/InputType';

interface UseDndItemProps {
  id: string;
  type: FormFieldType;
}

function useDndItem({ id, type }: UseDndItemProps) {
  const { listeners, attributes, setNodeRef, transform } = useDraggable({
    id,
    data: {
      id,
      action: 'move',
      type,
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
    },
  };
}

export default useDndItem;
