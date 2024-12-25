import LeftBar from './leftBar/LeftBar.tsx';
import LeftToolbar from './toolbars/LeftToolbar.tsx';
import LayoutSwitcher from './toolbars/LayoutSwitcher.tsx';
import FormContent from './FormContent.tsx';
import RightBar from './rightBar/RightBar.tsx';
import Preview from './toolbars/Preview.tsx';
import { useDndStore } from '../lib/state/dnd.state.ts';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import moveField from '../lib/moveField.ts';
import type { DragEndEvent, DragMoveEvent, DragStartEvent } from './dnd-kit';
import { customCollisionDetectionAlgorithm } from '../lib/customCollisionDetectionAlgorithm.ts';
import insertField from '../lib/insertField.ts';
import { DndContext } from './dnd-kit';

function FormBuilder() {
  const {
    setDirection,
    direction,
    setAction,
    setDraggedType,
    clearDraggingState,
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
    setAction(e.active.data.current.action);
    setDraggedType(e.active.data.current.type);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    const newDirection = e.delta.y > prevMouseY ? 'down' : 'up';

    if (direction !== newDirection)
      setDirection(e.delta.y > prevMouseY ? 'down' : 'up');

    setPrevMouseY(e.delta.y);
  };

  return (
    <DndContext
      collisionDetection={customCollisionDetectionAlgorithm}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
    >
      <div className="flex h-screen w-screen">
        <div className="w-80 bg-neutral-50">
          <LeftBar />
        </div>
        <div className="min-w-[40rem] flex-1 bg-primary-50 flex flex-col h-full">
          <div className="h-14 flex justify-between px-4 items-center">
            <LeftToolbar />
            <div className="flex gap-4 items-center">
              <Preview />
              <LayoutSwitcher />
            </div>
          </div>
          <div className="h-full overflow-y-scroll">
            <FormContent />
          </div>
        </div>
        <div className="w-96 bg-neutral-50 overflow-hidden">
          <RightBar />
        </div>
      </div>
    </DndContext>
  );
}

export default FormBuilder;
