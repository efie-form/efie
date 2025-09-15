import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  type ElementDropTargetGetFeedbackArgs,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Operation,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import type { FormField } from '@efie-form/core';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';

interface UseDragAndDropProps {
  field?: FormField;
  fieldRef: React.RefObject<HTMLDivElement>;
  dragHandlerRef: React.RefObject<HTMLDivElement>;
  handleDrop: (payload: ElementDropTargetEventBasePayload) => void;
  canDrop: (args: ElementDropTargetGetFeedbackArgs) => boolean;
  childIndex: number;
  parentId: string;
}

export function useDragAndDrop({
  field,
  fieldRef,
  dragHandlerRef,
  handleDrop,
  canDrop,
  childIndex,
  parentId,
}: UseDragAndDropProps) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [operation, setOperation] = useState<Operation>('reorder-after');

  const onChange = ({ self, location }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    if (location.current.dropTargets[0].element !== self.element) {
      setIsDraggedOver(false);
      return;
    }

    invariant(instruction, 'Instruction data should be defined');
    setOperation(instruction.operation);
    setIsDraggedOver(true);
  };

  useEffect(() => {
    const el = fieldRef.current;
    const dragEl = dragHandlerRef.current;

    invariant(el, 'RenderField element is not defined');
    if (!field) return;

    const fn = [
      dropTargetForElements({
        getData: ({ element, input }) => {
          const data = {
            id: field.sys.id,
          };
          return attachInstruction(data, {
            input,
            element,
            operations: {
              'reorder-before': 'available',
              'reorder-after': 'available',
              combine: 'not-available',
            },
          });
        },
        element: el,
        onDragEnter: onChange,
        onDragLeave: () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsDraggedOver(false);
            });
          });
        },
        canDrop,
        onDrag: onChange,
        onDrop: (payload) => {
          setIsDraggedOver(false);
          handleDrop(payload);
        },
      }),
    ];

    if (dragEl) {
      fn.push(
        draggable({
          element: el,
          dragHandle: dragEl,
          getInitialData: () => ({
            action: 'drag',
            type: field.sys.type,
            id: field.sys.id,
          }),
        }),
      );
    }

    return combine(...fn);
  }, [field?.sys.id, field?.sys.type, handleDrop, childIndex, parentId, canDrop, onChange]);

  return {
    isDraggedOver,
    operation,
  };
}
