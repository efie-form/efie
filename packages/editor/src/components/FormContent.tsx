import useDropZone from '../lib/hooks/useDropZone.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import RenderField from './RenderField.tsx';
import { useSettingsStore } from '../lib/state/settings.state.ts';

function FormContent() {
  const dropZoneProps = useDropZone();
  const { watch } = useFormContext<FormSchema>();
  const { setSelectedFieldId } = useSettingsStore();

  return (
    <div
      className="min-h-full pb-64"
      {...dropZoneProps}
      onClick={() => {
        setSelectedFieldId(null);
      }}
    >
      <div className="p-4">
        <div className="bg-white min-h-20 rounded-lg p-4">
          {watch('form.fields').map((field) => (
            <RenderField field={field} key={field.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormContent;
