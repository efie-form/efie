import type { FormFieldNumber } from '@efie-form/core';
import { Controller } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface NumberFieldProps {
  field: FormFieldNumber;
  fieldKey: FieldKeyPrefix;
}

function NumberField({ field, fieldKey }: NumberFieldProps) {
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
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
        type="number"
      />
    </div>
  );
}

export default NumberField;
