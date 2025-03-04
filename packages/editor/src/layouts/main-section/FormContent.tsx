import RenderField from './field-contents/RenderField.tsx';
import { useSettingsStore } from '../../lib/state/settings.state.ts';
import Droppable from '../../components/dnd-kit/Droppable.tsx';
import { useSchemaStore } from '../../lib/state/schema.state.ts';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { getPage } = useSchemaStore();
  const { mode, page } = useSettingsStore();
  const selectedPage = getPage(page);

  if (!selectedPage) return <></>;

  return (
    <Droppable id={selectedPage.id || ''} type="page" className="h-full">
      <div className="min-h-full pb-64">
        <div className="p-4">
          <div
            className="flex flex-col mx-auto transition-all"
            style={{
              maxWidth: SCREEN_SIZES[mode],
            }}
          >
            {selectedPage.children.map((field) => (
              <RenderField field={field} key={field.id} />
            ))}
          </div>
        </div>
      </div>
    </Droppable>
  );
}

export default FormContent;
