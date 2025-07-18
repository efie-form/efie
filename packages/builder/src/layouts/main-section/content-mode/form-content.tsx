import RenderField from '../field-contents/render-field';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { useSchemaStore } from '../../../lib/state/schema.state';
import EmptyArea from '../empty-area';
import { useEffect } from 'react';
import BottomDropArea from '../bottom-drop-area';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { getPage } = useSchemaStore();
  const { previewDevice, page, clearSelectedFieldId } = useSettingsStore();
  const selectedPage = getPage(page);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearSelectedFieldId();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (!selectedPage) return <></>;
  const hasChildren = selectedPage.children.length > 0;

  return (
    <div id="form-zone" className="h-full">
      <div className="min-h-full h-full">
        <div
          className="p-4 flex flex-col h-full"
        >
          <div
            className="flex flex-col w-full mx-auto transition-all"
            style={{
              maxWidth: SCREEN_SIZES[previewDevice],
            }}
          >
            {selectedPage.children.map((field, index) => (
              <RenderField
                field={field}
                key={field.id}
                childIndex={index}
                parentId={selectedPage.id}
              />
            ))}
            {!hasChildren && (
              <EmptyArea parentId={selectedPage.id} />
            )}
          </div>
          {hasChildren && (
            <div
              className="mx-auto h-full flex-1 w-full"
              style={{
                maxWidth: SCREEN_SIZES[previewDevice],
              }}
            >
              <BottomDropArea
                parentId={selectedPage.id}
                totalChildren={selectedPage.children.length}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormContent;
