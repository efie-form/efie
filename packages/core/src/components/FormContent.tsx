import useDropZone from '../lib/hooks/useDropZone.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '../types/formSchema.ts';
import RenderField from './RenderField.tsx';
import Placeholder from './Placeholder.tsx';

function FormContent() {
  const dropZoneProps = useDropZone();
  const { watch } = useFormContext<FormSchema>();

  return (
    <div className="min-h-full" {...dropZoneProps}>
      <div className="p-4">
        <div className="bg-white min-h-20 rounded-lg p-4">
          {watch('form.fields').map((field) => (
            <RenderField field={field} key={field.id} />
          ))}
          <Placeholder />
        </div>
      </div>
    </div>
  );
}

export default FormContent;
