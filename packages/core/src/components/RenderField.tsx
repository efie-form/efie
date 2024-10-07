import type { FormField } from '../types/formSchema.ts';
import useMoveField from '../lib/hooks/useMoveField.ts';
import { DATASET_FORM_FIELD } from '../lib/constant.ts';

interface RenderFieldProps {
  field: FormField;
}

function RenderField({ field }: RenderFieldProps) {
  const { registerProps } = useMoveField();

  return (
    <>
      <div
        key={field.id}
        className="p-4 border border-white hover:border-neutral-100 rounded-lg cursor-grab transform bg-white"
        {...{ [DATASET_FORM_FIELD]: field.id }}
        {...registerProps(field.id)}
      >
        <FieldItem field={field} />
      </div>
    </>
  );
}

function FieldItem({ field }: RenderFieldProps) {
  switch (field.type) {
    default:
      return (
        <span>
          {field.id} {field.type}
        </span>
      );
  }
}

export default RenderField;
