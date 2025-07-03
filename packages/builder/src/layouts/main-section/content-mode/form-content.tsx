import RenderField from '../field-contents/render-field';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { useSchemaStore } from '../../../lib/state/schema.state';
import EmptyArea from '../empty-area';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { getPage } = useSchemaStore();
  const { previewDevice, page } = useSettingsStore();
  const selectedPage = getPage(page);

  if (!selectedPage) return <></>;
  const hasChildren = selectedPage.children.length > 0;

  return (
    <div id="form-zone" className="h-full">
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
            {!hasChildren && (
              <EmptyArea />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormContent;
