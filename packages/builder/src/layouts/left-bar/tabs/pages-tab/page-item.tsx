import { useSortable } from '@dnd-kit/sortable';
import type { PageFormField } from '@efie-form/core';
import { type CSSProperties, useState } from 'react';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';
import { MdOutlineDragIndicator } from 'react-icons/md';
import EditableText from '../../../../components/elements/editable-text';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { cn } from '../../../../lib/utils';

interface PageItemProps {
  page: PageFormField;
  onDelete: () => void;
  isCurrentPage: boolean;
  onSelect: () => void;
}

export default function PageItem({ page, onDelete, isCurrentPage, onSelect }: PageItemProps) {
  const { schema, renameField } = useSchemaStore();
  const field = useSchemaStore((s) => s.getFieldById(page.sys.id));
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: page.sys.id,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  const handleRename = (newName: string) => {
    if (!field) return;
    renameField(field.sys.id, newName);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      role="button"
      className={cn(
        'group relative flex w-full items-center justify-between px-1 py-2 hover:bg-neutral-100',
        isDragging ? 'z-50 cursor-grabbing' : 'cursor-pointer',
        {
          'bg-neutral-200': isDragging,
          'bg-neutral-100!': isCurrentPage,
        },
      )}
      onClick={onSelect}
      onKeyDown={onSelect}
      tabIndex={0}
      onMouseLeave={() => setDeleteConfirm(false)}
    >
      <div className="flex items-center">
        <span
          className={cn('invisible me-2 group-hover:visible', {
            'cursor-grab': !isDragging,
          })}
          {...listeners}
        >
          <MdOutlineDragIndicator />
        </span>
        <EditableText
          defaultValue={field?.sys.name}
          onSave={handleRename}
          className="typography-body3 text-neutral-900"
          fallback="Untitled page"
        />
      </div>
      <span className="invisible flex gap-2 pe-2 group-hover:visible">
        {deleteConfirm ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                onDelete();
                setDeleteConfirm(false);
              }}
              aria-label="Confirm delete"
            >
              <FaCheck className="text-success" size={14} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setDeleteConfirm(false);
              }}
              aria-label="Cancel delete"
            >
              <FaXmark className="text-danger" size={14} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(true);
            }}
            disabled={schema?.form.fields.length === 1}
            aria-label="Delete page"
          >
            <FaTrash
              className={cn('text-danger', {
                'cursor-not-allowed opacity-50': schema?.form.fields.length === 1,
              })}
              size={12}
            />
          </button>
        )}
      </span>
    </div>
  );
}
