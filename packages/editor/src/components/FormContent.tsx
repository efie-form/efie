import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormFieldType, FormSchema } from '@efie-form/core';
import RenderField from './RenderField.tsx';
import { useSettingsStore } from '../lib/state/settings.state.ts';
import DndDropzone from './Dnd/DndDropzone.tsx';
import { getDefaultField } from '../lib/getDefaultField.ts';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const { watch } = useFormContext<FormSchema>();
  const { mode, page, setSelectedFieldId } = useSettingsStore();
  const selectedPage = watch('form.fields')
    .filter((field) => field.type === 'page')
    .find((field) => field.id === page);
  const pageIndex = watch('form.fields').findIndex(
    (field) => field.id === page
  );
  const { insert } = useFieldArray({
    keyName: '_id',
    name: `form.fields.${Math.max(pageIndex, 0)}.children`,
  });

  const handleAddNewField = (fieldType: FormFieldType, index: number) => {
    const fieldToAdd = getDefaultField({
      type: fieldType,
    });
    insert(index, fieldToAdd);
    setSelectedFieldId(fieldToAdd.id);
  };

  if (!selectedPage) return null;

  return (
    <DndDropzone
      className="h-full"
      id={selectedPage.id}
      items={selectedPage.children.map((child) => child.id)}
      onNewFieldDrop={handleAddNewField}
      accepts={['block']}
    >
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
              />
            ))}
          </div>
        </div>
      </div>
    </DndDropzone>
  );
}

export default FormContent;
