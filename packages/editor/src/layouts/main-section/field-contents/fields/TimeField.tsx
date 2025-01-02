import type { FormFieldTime, FormSchema } from '@efie-form/core';
import { useFormContext } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import genFieldKey from '../../../../lib/genFieldKey.ts';

interface TimeFieldProps {
  field: FormFieldTime;
  fieldKey: FieldKeyPrefix;
}

function TimeField({ fieldKey }: TimeFieldProps) {
  const { register } = useFormContext<FormSchema>();

  return (
    <div className="p-2">
      <input
        {...register(genFieldKey(fieldKey, 'props.label'))}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        type="time"
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 outline-primary w-full max-w-40"
      />
    </div>
  );
}

export default TimeField;
