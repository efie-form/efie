import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { FieldType, type PageFormField } from '@efie-form/core';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../../components/elements/button';
import { getDefaultField } from '../../../../lib/get-default-field';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import PageItem from './page-item';

function PagesTab() {
  const { updatePages, schema } = useSchemaStore();
  const { setPage, page } = useSettingsStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const pages = schema.form.fields.filter((field) => field.type === FieldType.PAGE);

  const handleAddNewPage = () => {
    const newPage = getDefaultField({
      type: FieldType.PAGE,
      page: {
        name: `Page ${pages.length + 1}`,
      },
    });

    const newPages = [...pages, newPage].filter((p) => p.type === FieldType.PAGE);

    updatePages(newPages);
  };

  const handleMovePage = (from: number, to: number) => {
    const newPages = [...pages];
    const [page] = newPages.splice(from, 1);
    newPages.splice(to, 0, page);
    updatePages(newPages);
  };

  const handleDeletePage = (deletedPage: PageFormField) => {
    const currentPageIndex = pages.findIndex((p) => p.id === deletedPage.id);
    const newPages = pages.filter((p) => p.id !== deletedPage.id);

    updatePages(newPages);

    if (deletedPage.id === page) {
      setPage(newPages[currentPageIndex + 1]?.id ?? newPages[currentPageIndex - 1]?.id);
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
        <Button onClick={handleAddNewPage} className="w-full" startIcon={FaPlus}>
          Add new page
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={pages.map((p) => p.id)}>
          <ul>
            {pages.map((p) => (
              <PageItem
                key={p.id}
                page={p}
                onDelete={() => handleDeletePage(p)}
                isCurrentPage={p.id === page}
                onSelect={() => setPage(p.id)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default PagesTab;
