import { fieldIcons } from '../../../lib/fields-tab/fields';
import { cn } from '../../../lib/utils';
import { type ElementType } from 'react';
import type { FormFieldType } from '@efie-form/core';
import { useDraggable } from '../../../components/dnd-kit';
import { DragOverlay } from '@dnd-kit/core';
import { useDndStore } from '../../../lib/state/dnd.state';
import { FIELDS_NAME } from '../../../lib/constant';
import generateFieldItems from '../../../lib/generateFieldItems';

function FieldsTab() {
  const { action, draggedType } = useDndStore();

  return (
    <div className="px-4 py-2">
      {generateFieldItems().map((group) => (
        <div key={group.id} className="mb-4">
          <p className="text-neutral-700 typography-body2">{group.label}</p>
          <div className="flex flex-col gap-1.5 mt-3">
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
  formKey?: string;
  disabled?: boolean;
}

function FieldItem({ Icon, type, label, formKey, disabled }: FieldItemProps) {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: `new-field-${type}`,
    data: {
      action: 'new',
      type,
      formKey,
    },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex items-center gap-2 px-4 transform py-1.5 bg-neutral-100/30 border border-neutral-100/30 border-opacity-0 rounded-md text-neutral-800',
        {
          'hover:border-primary-400 hover:bg-primary-100 hover:bg-neutral-100/70 hover:text-primary':
            !disabled,
          'cursor-not-allowed text-neutral-400 bg-neutral-100/20': disabled,
        }
      )}
    >
      <Icon />
      <span className="typography-body3">{label}</span>
    </div>
  );
}

export default FieldsTab;
