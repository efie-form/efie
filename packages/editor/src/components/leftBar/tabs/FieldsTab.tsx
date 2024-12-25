import { fieldGroup, fieldIcons } from '../../../lib/fields.ts';
import { cn } from '../../../lib/utils.ts';
import type { ElementType } from 'react';
import type { FormFieldType } from '@efie-form/core';
import { useDraggable } from '../../../lib/dndKit.tsx';
import { DragOverlay } from '@dnd-kit/core';
import { useDndStore } from '../../../lib/state/dnd.state.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';

function FieldsTab() {
  const { action, draggedType } = useDndStore();

  return (
    <div className="px-4 py-2">
      {fieldGroup.map((group) => (
        <div key={group.id} className="mb-4">
          <p className="text-neutral-700 text-lg">{group.label}</p>
          <div className="flex flex-col gap-1.5 mt-3">
            {group.children.map((field) => (
              <FieldItem
                key={field.type}
                label={field.label}
                type={field.type}
                Icon={field.Icon}
              />
            ))}
          </div>
        </div>
      ))}
      {action === 'new' && draggedType && (
        <DragOverlay>
          <FieldItem
            Icon={fieldIcons[draggedType]}
            type={draggedType}
            label={FIELDS_NAME[draggedType]}
          />
        </DragOverlay>
      )}
    </div>
  );
}

interface FieldItemProps {
  Icon: ElementType;
  type: FormFieldType;
  label: string;
}

function FieldItem({ Icon, type, label }: FieldItemProps) {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: `new-field-${type}`,
    data: {
      action: 'new',
      type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex items-center gap-2 px-4 transform py-1.5 bg-neutral-100/30 border border-neutral-100/30 border-opacity-0 rounded-md text-neutral-800',
        'hover:border-primary-400 hover:bg-primary-100 hover:bg-neutral-100/70 hover:text-primary'
      )}
    >
      <Icon />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default FieldsTab;
