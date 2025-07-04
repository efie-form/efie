import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements, type ElementDropTargetEventBasePayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isNewField } from '../../lib/field-type-guard';
import { useSchemaStore } from '../../lib/state/schema.state';
import { getDefaultField } from '../../lib/get-default-field';

interface BottomDropAreaProps {
  parentId: string;
  totalChildren: number;
}

export default function BottomDropArea({ parentId, totalChildren }: BottomDropAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { addField } = useSchemaStore();
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDrop = (payload: ElementDropTargetEventBasePayload) => {
    const { source } = payload;
    setIsDraggedOver(false);

    if (!isNewField(source.data)) {
      console.warn('Only new fields can be dropped in the bottom drop area');
      return;
    }

    const defaultField = getDefaultField({
      type: source.data.type,
      formKey: source.data.formKey,
    });

    addField(defaultField, parentId, totalChildren);
  };

  useEffect(() => {
    const element = ref.current;

    invariant(element, 'Bottom drop area element is not defined');

    return dropTargetForElements({
      element,
      onDrop: handleDrop,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
    });
  });

  return (
    <div
      ref={ref}
      className="min-h-64 w-full h-full relative"
    >

      {isDraggedOver && (
        <div
          className="absolute z-[999] left-0 right-0 h-1 bg-primary-400 rounded-full top-0 -translate-y-1/2"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-400 rounded-full px-3 py-1">
            <p className="typography-body3 text-neutral-50">Drop here</p>
          </div>
        </div>
      )}
    </div>
  );
}
