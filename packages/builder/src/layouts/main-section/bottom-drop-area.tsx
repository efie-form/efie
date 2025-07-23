import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { attachInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import useDropField from '../../lib/hooks/use-drop-field';

interface BottomDropAreaProps {
  parentId: string;
  totalChildren: number;
}

export default function BottomDropArea({ parentId, totalChildren }: BottomDropAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { handleDrop } = useDropField({
    index: totalChildren,
    parentId,
  });

  useEffect(() => {
    const element = ref.current;

    invariant(element, 'Bottom drop area element is not defined');

    return dropTargetForElements({
      element,
      getData: ({ element, input }) => {
        return attachInstruction(
          {},
          {
            element,
            input,
            operations: {
              'reorder-before': 'available',
              'reorder-after': 'not-available',
              combine: 'not-available',
            },
          },
        );
      },
      onDrop: (payload) => {
        setIsDraggedOver(false);
        handleDrop(payload);
      },
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
    });
  }, [handleDrop]);

  return (
    <div ref={ref} className="relative h-full min-h-64 w-full">
      {isDraggedOver && (
        <div className="-translate-y-1/2 absolute top-0 right-0 left-0 z-[999] h-1 rounded-full bg-primary-400">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-primary-400 px-3 py-1">
            <p className="typography-body3 text-neutral-50">Drop here</p>
          </div>
        </div>
      )}
    </div>
  );
}
