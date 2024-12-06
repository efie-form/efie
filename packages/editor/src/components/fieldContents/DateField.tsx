import type { FormFieldDate } from '@efie-form/core';
import useFieldInfo from '../../lib/hooks/useFieldInfo.ts';
import { Controller } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface DateFieldProps {
  field: FormFieldDate;
  fieldKey: FieldKeyPrefix;
}

function DateField({ field }: DateFieldProps) {
  const fieldInfo = useFieldInfo({
    fieldId: field.id,
  });
  if (!fieldInfo) return null;

  return (
    <div className="p-2">
      <Controller
        render={({ field: { value, onChange } }) => (
          <input
            className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
        name={`${fieldInfo.key}.props.label`}
      />
      <input
        type="date"
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 outline-primary w-full max-w-40"
        onChange={(e) => {
          console.log('clicked', e.target.value);
        }}
      />
    </div>
  );
}

export default DateField;
