import type { FormFieldPage } from '@lib/types/formSchema.type.ts';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { useSettingsStore } from '@form-builder/lib/state/settings.state';
import { cn } from '@form-builder/lib/utils';
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
import Button from '@form-builder/components/elements/Button';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { FaCheck, FaPlus, FaTrash, FaXmark } from 'react-icons/fa6';
import { getDefaultField } from '@form-builder/lib/getDefaultField';
import { useSchemaStore } from '@form-builder/lib/state/schema.state';

function PagesTab() {
  const { updatePages, schema } = useSchemaStore();
  const { setPage, page } = useSettingsStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const pages = schema.form.fields.filter((field) => field.type === 'page');

  const handleAddNewPage = () => {
    const newPage = getDefaultField({
      type: 'page',
      page: {
        name: `Page ${pages.length + 1}`,
      },
    });

    const newPages = [...pages, newPage].filter((p) => p.type === 'page');

    updatePages(newPages);
  };

  const handleMovePage = (from: number, to: number) => {
    const newPages = [...pages];
    const [page] = newPages.splice(from, 1);
    newPages.splice(to, 0, page);
    updatePages(newPages);
  };

  const handleDeletePage = (deletedPage: FormFieldPage) => {
    const currentPageIndex = pages.findIndex((p) => p.id === deletedPage.id);
    const newPages = pages.filter((p) => p.id !== deletedPage.id);

    updatePages(newPages);

    if (deletedPage.id === page) {
      setPage(
        newPages[currentPageIndex + 1]?.id ?? newPages[currentPageIndex - 1]?.id
      );
    }
  };

  const handleDragEnd = (props: DragEndEvent) => {
    const { active, over } = props;
    if (!active || !over || active.id === over.id) return;

    const activeIndex = pages.findIndex((p) => p.id === active.id);
    const overIndex = pages.findIndex((p) => p.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    handleMovePage(activeIndex, overIndex);
  };

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <Button
          onClick={handleAddNewPage}
          className="w-full"
          StartIcon={FaPlus}
        >
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
            {pages.map((p) => (
              <PageItem
                key={p.id}
                page={p}
                onDelete={() => handleDeletePage(p)}
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
  const { schema } = useSchemaStore();
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
          'relative px-1 py-2 flex items-center justify-between group hover:bg-neutral-100',
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
            {page.props.name}
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
    </>
  );
}
