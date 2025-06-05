import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from './dnd-kit.type';
import { DndContext } from './index';
import { customCollisionDetectionAlgorithm } from './customCollisionDetectionAlgorithm';
import { useDndStore } from '../../lib/state/dnd.state';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useSchemaStore } from '../../lib/state/schema.state';
import type { FormField } from '@efie-form/core';
import { FormFieldType } from '@efie-form/core';
import { getDefaultField } from '../../lib/getDefaultField';

interface DndContextProps {
  children: ReactNode;
}

// Helper function to determine if field should be dropped as child
const isDropOnChildren = (newType: FormFieldType, dropType: FormFieldType) => {
  if (newType !== FormFieldType.BLOCK && dropType === FormFieldType.BLOCK) return true;
  if (dropType === FormFieldType.COLUMN || dropType === FormFieldType.PAGE) return true;
  return false;
};

// Helper function to find drop location for addField
const findDropLocation = (
  dropFieldId: string,
  dropFieldType: FormFieldType,
  direction: 'up' | 'down',
  newFieldType: FormFieldType,
  schema: { form: { fields: FormField[] } },
  fieldMap: Map<string, FormField>,
  fieldParentMap: Map<string, string>,
) => {
  if (isDropOnChildren(newFieldType, dropFieldType)) {
    // Drop as child - add to the end of children
    return { parentId: dropFieldId, index: undefined };
  }
  else {
    // Drop as sibling - find parent and calculate index
    const dropField = fieldMap.get(dropFieldId);
    if (!dropField) return { parentId: undefined, index: undefined };

    const parentId = fieldParentMap.get(dropFieldId);
    if (parentId) {
      // Has parent - find index in parent's children
      const parent = fieldMap.get(parentId);
      if (!parent || !('children' in parent)) return { parentId: undefined, index: undefined };

      const siblingIndex = parent.children.findIndex((f: FormField) => f.id === dropFieldId);
      if (siblingIndex === -1) return { parentId: undefined, index: undefined };

      return {
        parentId,
        index: direction === 'up' ? siblingIndex : siblingIndex + 1,
      };
    }
    else {
      // Root level - find index in root fields
      const rootIndex = schema.form.fields.findIndex((f: FormField) => f.id === dropFieldId);
      if (rootIndex === -1) return { parentId: undefined, index: undefined };

      return {
        parentId: undefined,
        index: direction === 'up' ? rootIndex : rootIndex + 1,
      };
    }
  }
};

export default function DndProvider({ children }: DndContextProps) {
  const {
    setDirection,
    direction,
    setAction,
    setDraggedType,
    clearDraggingState,
    setOriginalRect,
  } = useDndStore();
  const { schema, addField, moveField, fieldMap, fieldParentMap } = useSchemaStore();

  const [prevMouseY, setPrevMouseY] = useState(0);

  const handleDragEnd = (e: DragEndEvent) => {
    clearDraggingState();
    if (!direction || !e.active.data.current || !e.over?.data.current) return;

    const fieldType = e.active.data.current.type;
    const dropFieldType = e.over.data.current.type;
    const dropFieldId = e.over.data.current.id;

    if (e.active.data.current.action === 'move') {
      // Use moveField from schema store
      const fieldId = e.active.data.current.id;
      const dropLocation = findDropLocation(dropFieldId, dropFieldType, direction, fieldType, schema, fieldMap, fieldParentMap);

      if (dropLocation.parentId !== undefined || dropLocation.index !== undefined) {
        moveField(fieldId, dropLocation.parentId || '', dropLocation.index || 0);
      }
    }

    if (e.active.data.current.action === 'new') {
      // Use addField from schema store
      const newField = getDefaultField({
        type: fieldType,
        formKey: e.active.data.current.formKey,
      });

      const dropLocation = findDropLocation(dropFieldId, dropFieldType, direction, fieldType, schema, fieldMap, fieldParentMap);
      addField(newField, dropLocation.parentId, dropLocation.index);
    }
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
