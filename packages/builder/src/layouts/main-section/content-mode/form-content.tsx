import { FieldType } from '@efie-form/core';
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
  const { previewDevice, page, clearSelectedFieldId } = useSettingsStore();
  const selectedPage = useSchemaStore((state) => state.getFieldById(page));

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

  if (!selectedPage || selectedPage.type !== FieldType.PAGE) return null;
  const hasChildren = selectedPage.children.length > 0;

  return (
    <form className="h-full">
      <div className="h-full min-h-full">
        <div className="flex h-full flex-col py-4 px-8">
          <div
            className="mx-auto flex w-full flex-col transition-all"
            style={{
              maxWidth: SCREEN_SIZES[previewDevice],
            }}
          >
            {selectedPage.children.map((field, index) => (
              <RenderField
                key={field.id}
                childIndex={index}
                parentId={selectedPage.id}
                fieldId={field.id}
              />
            ))}
            {!hasChildren && <EmptyArea key={selectedPage.id} parentId={selectedPage.id} />}
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
    </form>
  );
}

export default FormContent;
