import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from './dnd-kit.type';
import { DndContext } from './dnd-kit.type';
import { customCollisionDetectionAlgorithm } from './customCollisionDetectionAlgorithm.ts';
import moveField from '../../lib/moveField.ts';
import insertField from '../../lib/insertField.ts';
import { useDndStore } from '../../lib/state/dnd.state.ts';
import { useFormContext } from 'react-hook-form';
import type { FormField, FormSchema } from '@efie-form/core';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface DndContextProps {
  children: ReactNode;
}

export default function DndProvider({ children }: DndContextProps) {
  const {
    setDirection,
    direction,
    setAction,
    setDraggedType,
    clearDraggingState,
    setOriginalRect,
  } = useDndStore();
  const { getValues, setValue } = useFormContext<FormSchema>();

  const [prevMouseY, setPrevMouseY] = useState(0);

  const handleDragEnd = (e: DragEndEvent) => {
    clearDraggingState();
    if (!direction || !e.active.data.current || !e.over?.data.current) return;
    let newFields;
    const fieldType = e.active.data.current.type;
    const dropFieldType = e.over.data.current.type;

    if (e.active.data.current.action === 'move') {
      newFields = moveField({
        fields: getValues('form.fields'),
        fieldType,
        direction,
        fieldId: e.active.data.current.id,
        dropFieldId: e.over.data.current.id,
        dropFieldType,
      });
    }
    if (e.active.data.current.action === 'new') {
      newFields = insertField({
        fields: getValues('form.fields'),
        direction,
        dropFieldId: e.over.data.current.id,
        dropFieldType,
        newFieldType: fieldType,
      });
    }
    if (!newFields) return;
    setValue('form.fields', newFields);
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (!e.active.data.current) return;
    updateAllFieldRect();
    setAction(e.active.data.current.action);
    setDraggedType(e.active.data.current.type);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (!e.active.data.current) return;
    const newDirection = e.delta.y > prevMouseY ? 'down' : 'up';

    if (direction !== newDirection)
      setDirection(e.delta.y > prevMouseY ? 'down' : 'up');

    setPrevMouseY(e.delta.y);
  };

  const updateAllFieldRect = () => {
    const fields = getValues('form.fields');
    fields.forEach(findFieldElemAndUpdateRect);
  };

  const findFieldElemAndUpdateRect = (field: FormField) => {
    const elem = document.getElementById(field.id);
    if (elem) {
      const rect = elem.getBoundingClientRect();
      setOriginalRect(field.id, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
    if ('children' in field) {
      field.children.forEach(findFieldElemAndUpdateRect);
    }
  };

  return (
    <DndContext
      collisionDetection={customCollisionDetectionAlgorithm}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      {children}
    </DndContext>
  );
}
