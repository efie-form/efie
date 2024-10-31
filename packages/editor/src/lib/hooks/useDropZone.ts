import useThrottle from './useThrottle.ts';
import type { DragEvent } from 'react';
import { useEffect, useState } from 'react';
import { useDragStore } from '../state/drag.state.ts';
import { DATASET_DROP_ZONE, DROP_ZONE_TYPE } from '../constant.ts';
import insertField from '../insertField.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import getDropPosition from '../getDropPosition.ts';
import useDragDirection from './useDragDirection.ts';
import moveField from '../moveFields.ts';
import { displayPlaceholder } from '../displayPlaceholder.ts';
import defaultFieldProps from '../defaultFieldProps.ts';

export default function useDropZone() {
  const {
    dragType,
    draggingNewFieldType,
    movingFieldId,
    setDragType,
    setMovingFieldId,
  } = useDragStore();
  const { getValues, setValue } = useFormContext<FormSchema>();
  const { registerDragEvent, direction } = useDragDirection();
  const [dragPosition, setDragPosition] =
    useState<ReturnType<typeof getDropPosition>>(null);

  const dragOverHandler = useThrottle((e: DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget()) return;
    if (!isHTMLElement(e.target)) return;
    registerDragEvent(e);
    const result = getDropPosition(e.target, direction, movingFieldId);
    if (!result) return;

    if (
      dragPosition?.parentId !== result.parentId ||
      dragPosition?.index !== result.index
    ) {
      setDragPosition(result);
    }
  }, 150);

  useEffect(() => {
    if (!dragPosition) return;

    displayPlaceholder(
      getValues('form.fields'),
      dragPosition.parentId,
      dragPosition.index,
      movingFieldId
    );
  }, [dragPosition]);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragOverHandler(e);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isValidDropTarget()) return;
    const result = getDropPosition(e.target, direction, movingFieldId);
    if (!result) return;

    if (dragType === 'new' && draggingNewFieldType) {
      const newFields = insertField(
        getValues('form.fields'),
        defaultFieldProps[draggingNewFieldType](),
        result.dropZoneType,
        result.parentId,
        result.index
      );
      setValue('form.fields', newFields);
    }

    if (dragType === 'move' && movingFieldId) {
      const newFields = moveField(
        getValues('form.fields'),
        movingFieldId,
        result.parentId,
        result.index
      );
      setValue('form.fields', newFields);
    }

    setDragType(null);
    setMovingFieldId(null);
  };

  return {
    onDragOver,
    onDrop,
    [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.root,
  };
}

// the dragging item is something else
// e.g. file, text, etc.
const isValidDropTarget = () => !!useDragStore.getState().dragType;

const isHTMLElement = (e: EventTarget | null): e is HTMLElement =>
  e instanceof HTMLElement;
