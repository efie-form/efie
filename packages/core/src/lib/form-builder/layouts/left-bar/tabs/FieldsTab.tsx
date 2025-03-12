import { fieldIcons } from '@form-builder/lib/fields-tab/fields';
import { cn } from '@form-builder/lib/utils';
import { type ElementType } from 'react';
import type { FormFieldType } from '@lib/InputType';
import { useDraggable } from '@form-builder/components/dnd-kit/dnd-kit.type.tsx';
import { DragOverlay } from '@dnd-kit/core';
import { useDndStore } from '@form-builder/lib/state/dnd.state';
import { FIELDS_NAME } from '@form-builder/lib/constant';
import { useSettingsStore } from '@form-builder/lib/state/settings.state';
import generateFieldItems from '@form-builder/lib/generateFieldItems';

function FieldsTab() {
  const { action, draggedType } = useDndStore();
  const { formInputs } = useSettingsStore();

  return (
    <div className="px-4 py-2">
      {generateFieldItems({ formInputs }).map((group) => (
        <div key={group.id} className="mb-4">
          <p className="text-neutral-700 typography-body2">{group.label}</p>
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
      <span className="typography-body3">{label}</span>
    </div>
  );
}

export default FieldsTab;
