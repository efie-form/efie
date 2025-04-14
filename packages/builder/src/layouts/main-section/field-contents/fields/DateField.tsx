import type { DateFormField } from '@efie-form/core';
import { useFieldLabel } from '../../../../lib/hooks/properties/useFieldLabel';

interface DateFieldProps {
  field: DateFormField;
}

function DateField({ field }: DateFieldProps) {
  const { label, updateLabel } = useFieldLabel(field);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={e => updateLabel(e.target.value)}
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
