import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import RenderField from './RenderField.tsx';
import { useSettingsStore } from '../lib/state/settings.state.ts';
import Droppable from './dnd-kit/Droppable.tsx';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { watch } = useFormContext<FormSchema>();
  const { mode, page } = useSettingsStore();
  const selectedPage = watch('form.fields')
    .filter((field) => field.type === 'page')
    .find((field) => field.id === page);
  const pageIndex = watch('form.fields').findIndex(
    (field) => field.id === page
  );
  if (!selectedPage) return null;

  return (
    <Droppable id={selectedPage.id} type="page" className="h-full">
      <div className="min-h-full pb-64">
        <div className="p-4">
          <div
            className="flex flex-col space-y-4 mx-auto transition-all"
            style={{
              maxWidth: SCREEN_SIZES[mode],
            }}
          >
            {selectedPage.children.map((field, index) => (
              <RenderField
                field={field}
                key={field.id}
                fieldKey={`form.fields.${pageIndex}.children.${index}`}
                index={index}
                parentId={selectedPage.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Droppable>
  );
}

export default FormContent;
