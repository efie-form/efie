import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from './dnd-kit.type';
import { DndContext } from './index';
import { customCollisionDetectionAlgorithm } from './customCollisionDetectionAlgorithm';
import moveField from '../../lib/moveField';
import insertField from '../../lib/insertField';
import { useDndStore } from '../../lib/state/dnd.state';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useSchemaStore } from '../../lib/state/schema.state';
import type { FormField } from '@efie-form/core';
import { getDefaultField } from '../../lib/getDefaultField';

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
  const { schema, setFields } = useSchemaStore();

  const [prevMouseY, setPrevMouseY] = useState(0);

  const handleDragEnd = (e: DragEndEvent) => {
    clearDraggingState();
    if (!direction || !e.active.data.current || !e.over?.data.current) return;
    let newFields;
    const fieldType = e.active.data.current.type;
    const dropFieldType = e.over.data.current.type;

    if (e.active.data.current.action === 'move') {
      newFields = moveField({
        fields: schema.form.fields,
        fieldType,
        direction,
        fieldId: e.active.data.current.id,
        dropFieldId: e.over.data.current.id,
        dropFieldType,
      });
    }
    if (e.active.data.current.action === 'new') {
      const newField = getDefaultField({
        type: fieldType,
        formKey: e.active.data.current.formKey,
      });

      newFields = insertField({
        fields: schema.form.fields,
        direction,
        dropFieldId: e.over.data.current.id,
        dropFieldType,
        newFieldType: fieldType,
        newField,
      });
    }
    if (!newFields) return;
    setFields(newFields);
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
    for (const field of schema.form.fields) {
      findFieldElemAndUpdateRect(field);
    }
  };

  const findFieldElemAndUpdateRect = (field: FormField) => {
    const elem = document.querySelector(`#${field.id}`);
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
      for (const child of field.children) {
        findFieldElemAndUpdateRect(child);
      }
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
