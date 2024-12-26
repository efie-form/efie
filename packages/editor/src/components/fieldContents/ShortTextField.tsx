import type { FormFieldShortText, FormSchema } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { useFormContext } from 'react-hook-form';

interface ShortTextFieldProps {
  field: FormFieldShortText;
  fieldKey: FieldKeyPrefix;
}

function ShortTextField({ field, fieldKey }: ShortTextFieldProps) {
  const { register } = useFormContext<FormSchema>();

  return (
    <div className="p-2">
      <input
        {...register(genFieldKey(fieldKey, 'props.label'))}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        type="text"
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default ShortTextField;
