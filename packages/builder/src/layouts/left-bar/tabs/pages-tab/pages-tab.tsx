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
  const { schema, addField, movePage, deleteField } = useSchemaStore();
  const { setPage, page } = useSettingsStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const pages = schema?.form.fields.filter((field) => field.type === FieldType.PAGE) || [];

  const handleAddNewPage = () => {
    const newPage = getDefaultField({
      type: FieldType.PAGE,
      page: {
        name: `Page ${pages.length + 1}`,
      },
    });

    addField(newPage);
  };

  const handleMovePage = (from: number, to: number) => {
    movePage(from, to);
  };

  const handleDeletePage = (deletedPage: PageFormField) => {
    const currentPageIndex = pages.findIndex((p) => p.id === deletedPage.id);
    const newPages = pages.filter((p) => p.id !== deletedPage.id);

    deleteField(deletedPage.id);

    if (deletedPage.id === page) {
      setPage(newPages[currentPageIndex]?.id ?? newPages[currentPageIndex - 1]?.id);
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
              <li key={p.id}>
                <PageItem
                  page={p}
                  onDelete={() => handleDeletePage(p)}
                  isCurrentPage={p.id === page}
                  onSelect={() => setPage(p.id)}
                />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default PagesTab;
