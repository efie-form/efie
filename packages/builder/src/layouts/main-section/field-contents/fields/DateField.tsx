import type { FormFieldDate } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface DateFieldProps {
  field: FormFieldDate;
}

function DateField({ field }: DateFieldProps) {
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
        type="date"
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 outline-primary w-full max-w-40"
      />
    </div>
  );
}

export default DateField;
