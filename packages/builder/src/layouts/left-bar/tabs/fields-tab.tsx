import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { FieldType } from '@efie-form/core';
import { type ElementType, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import generateFieldItems from '../../../lib/generate-field-items';
import { cn } from '../../../lib/utils';

function FieldsTab() {
  return (
    <div className="px-4 py-2 @container">
      {generateFieldItems().map((group) => (
        <div key={group.id} className="mb-4">
          <p className="typography-body2 text-neutral-700">{group.label}</p>
          <div className="mt-3 grid grid-cols-1 @min-[250px]:grid-cols-2 @sm:grid-cols-3 gap-1.5">
            {group.children.map((field) => (
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
        'flex transform cursor-grab items-center gap-2 rounded-md border border-neutral-100/30 border-opacity-0 bg-neutral-100/30 px-4 py-1.5 text-neutral-800',
        {
          'hover:border-primary-400 hover:bg-neutral-100/70 hover:bg-primary-100 hover:text-primary':
            !disabled,
          'cursor-not-allowed bg-neutral-100/20 text-neutral-400': disabled,
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
