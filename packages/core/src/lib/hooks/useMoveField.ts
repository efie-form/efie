import { useDragStore } from '../state/drag.state.ts';

function useMoveField() {
  const { setDragType, setMovingFieldId } = useDragStore();

  const onDragEnd = () => {
    setDragType(null);
    setMovingFieldId(null);
  };

  const registerProps = (id: string) => {
    const onDragStart = (e: React.DragEvent) => {
      e.stopPropagation();
      setDragType('move');
      setMovingFieldId(id);
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

export default useMoveField;
