import type { ColumnFormField } from '@efie-form/core';
import RenderField from '../render-field';
import EmptyArea from '../../empty-area';
import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

interface ColumnsFieldProps {
  field: ColumnFormField;
}

function ColumnsField({ field }: ColumnsFieldProps) {
  const hasChildren = field.children.length > 0;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasChildren) return;
    const el = ref.current;
    invariant(el, 'ColumnsField element is not defined');

    return dropTargetForElements({
      element: el,
      onDragEnter: () => {
        // Handle drag enter
      },
      onDragLeave: () => {
        // Handle drag leave
      },
      onDrop: ({ source, location }) => {
        if (location.current.dropTargets[0].element !== el) {
          return;
        }
        if (!source.data.action || source.data.action !== 'new') {
          console.warn('Invalid source data on drop');
          return;
        }
        // Handle adding new field logic here
      },
    });
  }, [hasChildren]);

  return (
    <>
      {hasChildren && (
        <div ref={ref}>
          {field.children.map((child, index) => (
            <RenderField
              key={`${field.id}-${child.id}`}
              field={child}
              parentId={field.id}
              childIndex={index}
            />
          ))}
        </div>
      )}
      {!hasChildren && (
        <div className="p-2">
          <EmptyArea parentId={field.id} />
        </div>
      )}
    </>
  );
}

export default ColumnsField;
