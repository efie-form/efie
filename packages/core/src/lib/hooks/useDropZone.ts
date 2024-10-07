import useThrottle from './useThrottle.ts';
import type { DragEvent } from 'react';
import { useDragStore } from '../state/drag.state.ts';
import findDropPosition from '../findDropPosition.ts';
import { DATASET_FORM_FIELD } from '../constant.ts';
import insertField from '../insertField.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '../../types/formSchema.ts';

export default function useDropZone() {
  const { dragType, draggingNewFieldType } = useDragStore();
  const { getValues, setValue } = useFormContext<FormSchema>();

  const dragOverHandler = useThrottle((e: DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget()) return;
    const parentId = findDropPosition(e.target);
    console.log('dragOverHandler', parentId);
  }, 150);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragOverHandler(e);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isValidDropTarget()) return;
    const parentId = findDropPosition(e.target);
    if (dragType === 'new' && draggingNewFieldType && parentId) {
      const newFields = insertField(
        getValues('form.fields'),
        draggingNewFieldType,
        parentId,
        1
      );
      setValue('form.fields', newFields);
    }
  };

  return {
    onDragOver,
    onDrop,
    [DATASET_FORM_FIELD]: 'root',
  };
}

// the dragging item is something else
// e.g. file, text, etc.
const isValidDropTarget = () => !!useDragStore.getState().dragType;
