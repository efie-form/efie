import { useDragStore } from '../state/drag.state.ts';
import type { FormFieldType } from '../../types/formSchema.ts';

export default function useNewField() {
  const { setDragType, setDraggingNewFieldType } = useDragStore();

  const onDragEnd = () => {
    setDragType(null);
  };

  const registerProps = (id: FormFieldType) => {
    const onDragStart = () => {
      setDragType('new');
      setDraggingNewFieldType(id);
    };

    return {
      draggable: true,
      onDragStart,
      onDragEnd,
    };
  };

  return {
    registerProps,
  };
}
