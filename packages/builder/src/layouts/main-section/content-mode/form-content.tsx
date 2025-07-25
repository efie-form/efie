import { useEffect } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import BottomDropArea from '../bottom-drop-area';
import EmptyArea from '../empty-area';
import RenderField from '../field-contents/render-field';

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
  }, [clearSelectedFieldId]);

  if (!selectedPage) return <></>;
  const hasChildren = selectedPage.children.length > 0;

  return (
    <div id="form-zone" className="h-full">
      <div className="h-full min-h-full">
        <div className="flex h-full flex-col p-4">
          <div
            className="mx-auto flex w-full flex-col transition-all"
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
            {!hasChildren && <EmptyArea parentId={selectedPage.id} />}
          </div>
          {hasChildren && (
            <div
              className="mx-auto h-full w-full flex-1"
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
