import { PropertyType, type PageFormField } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { useSortable } from '@dnd-kit/sortable';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { cn, getFieldProp } from '../../../../lib/utils';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';

interface PageItemProps {
  page: PageFormField;
  onDelete: () => void;
  isCurrentPage: boolean;
  onSelect: () => void;
}

export default function PageItem({
  page,
  onDelete,
  isCurrentPage,
  onSelect,
}: PageItemProps) {
  const { schema, updateFieldProps } = useSchemaStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: page.id,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameProp = getFieldProp(page, PropertyType.NAME);
  const [inputName, setInputName] = useState(nameProp?.value);

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px` : undefined,
    transition,
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const handleRename = () => {
    updateFieldProps(page.id, PropertyType.NAME, {
      type: PropertyType.NAME,
      value: inputName,
    });
    setEditMode(false);
  };

  const handleCancelRename = () => {
    setInputName(nameProp?.value);
    setEditMode(false);
  };

  return (
    <li
      style={style}
      key={page.id}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        'relative px-1 py-2 flex items-center justify-between group hover:bg-neutral-100',
        isDragging ? 'cursor-grabbing relative z-50' : 'cursor-pointer',
        {
          'bg-neutral-200': isDragging,
          '!bg-neutral-100': isCurrentPage,
        }
      )}
      onClick={() => onSelect()}
      onDoubleClick={() => {
        setEditMode(true);
      }}
      onMouseLeave={() => setDeleteConfirm(false)}
    >
      <div className="flex items-center">
        <span
          className={cn('me-2 invisible group-hover:visible', {
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
      <span className="pe-2 invisible group-hover:visible flex gap-2">
        {deleteConfirm ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();

                onDelete();
                setDeleteConfirm(false);
              }}
            >
              <FaCheck className="text-success" size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();

                setDeleteConfirm(false);
              }}
            >
              <FaXmark className="text-danger" size={14} />
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(true);
            }}
            disabled={schema.form.fields.length === 1}
          >
            <FaTrash
              className={cn('text-danger', {
                'opacity-50 cursor-not-allowed':
                  schema.form.fields.length === 1,
              })}
              size={12}
            />
          </button>
        )}
      </span>
    </li>
  );
}
