import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormFieldPage, FormSchema } from '@efie-form/core';
import defaultFieldProps from '../../../lib/defaultFieldProps.ts';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { useSettingsStore } from '../../../lib/state/settings.state.ts';
import { cn } from '../../../lib/utils.ts';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import Button from '../../elements/Button.tsx';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';

function PagesTab() {
  const { watch } = useFormContext<FormSchema>();
  const { insert, fields, move, remove } = useFieldArray({
    keyName: '_id',
    name: 'form.fields',
  });
  const { setPage, page } = useSettingsStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const pages = watch('form.fields').filter((field) => field.type === 'page');

  const handleAddNewPage = () => {
    const newPage = defaultFieldProps.page({
      name: `Page ${pages.length + 1}`,
    });
    insert(fields.length, newPage);
  };

  const handleDragEnd = (props: DragEndEvent) => {
    const { active, over } = props;
    if (!active || !over || active.id === over.id) return;

    const activeIndex = pages.findIndex((p) => p.id === active.id);
    const overIndex = pages.findIndex((p) => p.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    move(activeIndex, overIndex);
  };

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <Button onClick={handleAddNewPage} className="w-full">
          Add new page
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pages.map((p) => p.id)}>
          <ul>
            {pages.map((p, index) => (
              <PageItem
                key={p.id}
                page={p}
                onDelete={() => {
                  remove(index);
                  if (p.id === page)
                    setPage(pages[index + 1]?.id ?? pages[index - 1]?.id);
                }}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default PagesTab;

interface PageItemProps {
  page: FormFieldPage;
  onDelete: () => void;
}

function PageItem({ page, onDelete }: PageItemProps) {
  const { page: currentPage, setPage } = useSettingsStore();
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

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px` : undefined,
    position: isDragging ? 'relative' : 'static',
    transition,
  };

  return (
    <>
      <li
        style={style}
        key={page.id}
        ref={setNodeRef}
        {...attributes}
        className={cn(
          'px-1 py-2 flex items-center justify-between group hover:bg-neutral-100/50',
          isDragging ? 'cursor-grabbing relative z-50' : 'cursor-pointer',
          {
            'bg-neutral-200': isDragging,
            '!bg-neutral-100': currentPage === page.id,
          }
        )}
        onClick={() => setPage(page.id)}
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
          <span className="typography-body3 text-neutral-900">
            {page.props.name} {page.id}
          </span>
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
            >
              <FaTrash className="text-danger" size={12} />
            </button>
          )}
        </span>
      </li>
    </>
  );
}
