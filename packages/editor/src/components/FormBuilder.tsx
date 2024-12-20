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
import { DndContext } from '../lib/dndKit.tsx';
import { customCollisionDetectionAlgorithm } from '../lib/customCollisionDetectionAlgorithm.ts';

function FormBuilder() {
  const { setDirection, direction } = useDndStore();
  const { getValues, setValue } = useFormContext<FormSchema>();

  const [prevMouseY, setPrevMouseY] = useState(0);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-80 bg-neutral-50 overflow-hidden">
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
          <DndContext
            collisionDetection={customCollisionDetectionAlgorithm}
            onDragEnd={(e) => {
              if (!direction || !e.active.data.current || !e.over?.data.current)
                return;
              const newFields = moveField({
                fields: getValues('form.fields'),
                direction,
                fieldId: e.active.data.current.id,
                dropFieldId: e.over.data.current.id,
              });
              if (!newFields) return;
              setValue('form.fields', newFields);
            }}
            onDragMove={(e) => {
              const newDirection = e.delta.y > prevMouseY ? 'down' : 'up';

              if (direction !== newDirection)
                setDirection(e.delta.y > prevMouseY ? 'down' : 'up');

              setPrevMouseY(e.delta.y);
            }}
          >
            <FormContent />
          </DndContext>
        </div>
      </div>
      <div className="w-96 bg-neutral-50 overflow-hidden">
        <RightBar />
      </div>
    </div>
  );
}

export default FormBuilder;
