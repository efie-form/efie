import { cn } from '../../../lib/utils';
import { useEffect, useRef, useState, type ElementType } from 'react';
import type { FieldType } from '@efie-form/core';
import generateFieldItems from '../../../lib/generate-field-items';
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

function FieldsTab() {
  return (
    <div className="px-4 py-2">
      {generateFieldItems().map(group => (
        <div key={group.id} className="mb-4">
          <p className="text-neutral-700 typography-body2">{group.label}</p>
          <div className="flex flex-col gap-1.5 mt-3">
            {group.children.map(field => (
              <FieldItem
                key={field.type}
                label={field.label}
                type={field.type}
                Icon={field.Icon}
                formKey={field.formKey}
                disabled={field.disabled}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface FieldItemProps {
  Icon: ElementType;
  type: FieldType;
  label: string;
  formKey?: string;
  disabled?: boolean;
}

function FieldItem({ Icon, label, disabled, type, formKey }: FieldItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    invariant(!!el, 'FieldItem element is not defined');

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
      getInitialData: () => ({
        action: 'new',
        type,
        formKey,
      }),
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 px-4 transform py-1.5 bg-neutral-100/30 border border-neutral-100/30 border-opacity-0 rounded-md text-neutral-800 cursor-grab',
        {
          'hover:border-primary-400 hover:bg-primary-100 hover:bg-neutral-100/70 hover:text-primary':
            !disabled,
          'cursor-not-allowed text-neutral-400 bg-neutral-100/20': disabled,
          'opacity-70': dragging,
        },
      )}
    >
      <Icon />
      <span className="typography-body3">{label}</span>
    </div>
  );
}

export default FieldsTab;
