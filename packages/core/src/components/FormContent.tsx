import useDropZone from '../lib/hooks/useDropZone.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '../types/formSchema.ts';
import useMoveField from '../lib/hooks/useMoveField.ts';

function FormContent() {
  const dropZoneProps = useDropZone();
  const { registerProps } = useMoveField();
  const { watch } = useFormContext<FormSchema>();

  return (
    <div className="min-h-full" {...dropZoneProps}>
      <div className="p-4">
        <div className="bg-white min-h-20 rounded-lg p-4">
          {watch('form.fields').map((field) => (
            <div
              key={field.id}
              className="p-4 border border-white hover:border-neutral-100 rounded-lg cursor-grab transform bg-white"
              {...registerProps(field.id)}
            >
              {field.id} {field.type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormContent;
