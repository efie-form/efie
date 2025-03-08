import { useSchemaStore } from '@form-builder/lib/state/schema.state';
import type { FormFieldDateTime } from '@lib/types/formSchema.type.ts';

interface DateTimeFieldProps {
  field: FormFieldDateTime;
}

function DateTimeField({ field }: DateTimeFieldProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div className="p-2">
      <input
        value={field.props.label}
        onChange={(e) =>
          updateFieldProps(field.id, 'props.label', e.target.value)
        }
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        type="datetime-local"
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 outline-primary w-full max-w-56"
      />
    </div>
  );
}

export default DateTimeField;
