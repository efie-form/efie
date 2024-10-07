import useThrottle from './useThrottle.ts';
import type { DragEvent } from 'react';
import { useDragStore } from '../state/drag.state.ts';
import { DATASET_FORM_FIELD } from '../constant.ts';
import insertField from '../insertField.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '../../types/formSchema.ts';
import getDropPosition from '../getDropPosition.ts';
import useDragDirection from './useDragDirection.ts';

export default function useDropZone() {
  const { dragType, draggingNewFieldType } = useDragStore();
  const { getValues, setValue } = useFormContext<FormSchema>();
  const { registerDragEvent, direction } = useDragDirection();

  const dragOverHandler = useThrottle((e: DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget()) return;
    if (!isHTMLElement(e.target)) return;
    registerDragEvent(e);
    if (dragType === 'new') {
      const result = getDropPosition(e.target, direction);
      console.log(result);
    }
  }, 150);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragOverHandler(e);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isValidDropTarget()) return;
    if (dragType === 'new' && draggingNewFieldType) {
      const result = getDropPosition(e.target, direction);
      if (!result) return;

      if (result === 'root') {
        const newFields = insertField(
          getValues('form.fields'),
          draggingNewFieldType,
          'root',
          getValues('form.fields').length
        );
        setValue('form.fields', newFields);
      }

      if (result !== 'root') {
        const newFields = insertField(
          getValues('form.fields'),
          draggingNewFieldType,
          result.parentId,
          result.index
        );
        setValue('form.fields', newFields);
      }
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

const isHTMLElement = (e: EventTarget | null): e is HTMLElement =>
  e instanceof HTMLElement;
