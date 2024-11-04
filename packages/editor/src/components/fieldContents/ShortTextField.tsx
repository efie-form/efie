import type { FormFieldShortText } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import { Controller } from 'react-hook-form';

interface ShortTextFieldProps {
  field: FormFieldShortText;
  fieldKey: FieldKeyPrefix;
}

function ShortTextField({ field, fieldKey }: ShortTextFieldProps) {
  return (
    <div className="p-2">
      <Controller
        render={({ field: { value, onChange } }) => (
          <input
            className="mb-2 typography-body2 text-neutral-800 focus:outline-none cursor-text w-full"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
        name={`${fieldKey}.props.label`}
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
