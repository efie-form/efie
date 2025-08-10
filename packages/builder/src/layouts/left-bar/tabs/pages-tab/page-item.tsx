import { useSortable } from '@dnd-kit/sortable';
import {
  isStringValue,
  type PageFormField,
  PropertyType,
  type PropValue,
  type PropValueString,
} from '@efie-form/core';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { cn } from '../../../../lib/utils';

interface PageItemProps {
  page: PageFormField;
  onDelete: () => void;
  isCurrentPage: boolean;
  onSelect: () => void;
}

export default function PageItem({ page, onDelete, isCurrentPage, onSelect }: PageItemProps) {
  const { schema } = useSchemaStore();
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: page.id,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldProperty = useSchemaStore((state) =>
    state.getFieldProperty(page.id, PropertyType.NAME),
  );
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);
  const name = getValue(fieldProperty?.value);

  const [inputName, setInputName] = useState(name);

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const handleRename = () => {
    updateFieldProperty(page.id, {
      type: PropertyType.NAME,
      value: inputName,
    });

    setEditMode(false);
  };

  const handleCancelRename = () => {
    setInputName(name);
    setEditMode(false);
  };

  return (
    <button
      style={style}
      key={page.id}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        'group relative flex w-full items-center justify-between px-1 py-2 hover:bg-neutral-100',
        isDragging ? 'z-50 cursor-grabbing' : 'cursor-pointer',
        {
          'bg-neutral-200': isDragging,
          '!bg-neutral-100': isCurrentPage,
        },
      )}
      onClick={onSelect}
      onDoubleClick={() => {
        setEditMode(true);
      }}
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
        {editMode ? (
          <input
            ref={inputRef}
            value={inputName}
            className="typography-body3 px-1 py-0.5 outline-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRename();
              } else if (e.key === 'Escape') {
                handleCancelRename();
              }
            }}
            onChange={(e) => setInputName(e.target.value)}
            onBlur={() => {
              handleRename();
            }}
          />
        ) : (
          <span className="typography-body3 text-neutral-900">{inputName}</span>
        )}
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
    </button>
  );
}

function getValue(value?: PropValue): PropValueString {
  if (isStringValue(value)) {
    return value;
  }
  return '';
}
