import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { cn } from '../../lib/utils';
import { useSchemaStore } from '../../lib/state/schema.state';
import { getDefaultField } from '../../lib/get-default-field';
import isNewField from '../../lib/is-new-field';

interface EmptyAreaProps {
  parentId?: string;
}

export default function EmptyArea({ parentId }: EmptyAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { addField } = useSchemaStore();

  useEffect(() => {
    const el = ref.current;

    invariant(el, 'EmptyArea element is not defined');

    return dropTargetForElements({
      element: el,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: ({ source }) => {
        setIsDraggedOver(false);
        if (!isNewField(source.data)) {
          console.warn('Invalid source data on drop');
          return;
        }

        const defaultField = getDefaultField({
          type: source.data.type,
          formKey: source.data.formKey,
        });

        addField(defaultField, parentId, 0);
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn('h-full px-4 flex justify-center typography-body3 items-center min-h-32 bg-neutral-50 rounded-md text-center border-2 border-dashed', {
        'border-neutral-300': !isDraggedOver,
        'border-primary-400 bg-primary-100 text-primary-800': isDraggedOver,
      })}
    >
      <p className={cn('typography-body3 transition-colors',
        isDraggedOver ? 'text-primary-800' : 'text-neutral-800',
      )}
      >
        Drag and drop fields here
      </p>
    </div>
  );
}
