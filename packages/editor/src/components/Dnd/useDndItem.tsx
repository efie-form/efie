import type { FormFieldType } from '@efie-form/core';

interface UseDndItemProps {
  id: string;
  type: FormFieldType;
}

function useDndItem({ id, type }: UseDndItemProps) {
  return {
    attributes: {
      'data-dnd-id': id,
      'data-dnd-type': type,
    },
  };
}

export default useDndItem;
