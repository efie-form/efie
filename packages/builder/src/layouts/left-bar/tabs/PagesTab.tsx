import type { FormFieldPage } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state';
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
} from '@dnd-kit/sortable';
import Button from '../../../components/elements/Button';
import { FaPlus } from 'react-icons/fa6';
import { getDefaultField } from '../../../lib/getDefaultField';
import { useSchemaStore } from '../../../lib/state/schema.state';
import PageItem from './PagesTab/PageItem';

function PagesTab() {
  const { updatePages, schema, updateFieldProps } = useSchemaStore();
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
                name={p.props.name}
                onRename={(newName) => {
                  updateFieldProps(p.id, 'props.name', newName);
                }}
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
