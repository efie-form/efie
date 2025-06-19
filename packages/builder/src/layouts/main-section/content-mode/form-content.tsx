import RenderField from '../field-contents/render-field';
import { useSettingsStore } from '../../../lib/state/settings.state';
import Droppable from '../../../components/dnd-kit/droppable';
import { useSchemaStore } from '../../../lib/state/schema.state';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { getPage } = useSchemaStore();
  const { previewDevice, page } = useSettingsStore();
  const selectedPage = getPage(page);

  if (!selectedPage) return <></>;

  return (
    <div id="form-zone" className="h-full">
      <Droppable id={selectedPage.id || ''} type="page" className="h-full">
        <div className="min-h-full pb-64">
          <div className="p-4">
            <div
              className="flex flex-col mx-auto transition-all"
              style={{
                maxWidth: SCREEN_SIZES[previewDevice],
              }}
            >
              {selectedPage.children.map(field => (
                <RenderField field={field} key={field.id} />
              ))}
            </div>
          </div>
        </div>
      </Droppable>
    </div>
  );
}

export default FormContent;
