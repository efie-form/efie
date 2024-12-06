import type { FormFieldLongText } from '@efie-form/core';
import { Controller } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface LongTextFieldProps {
  field: FormFieldLongText;
  fieldKey: FieldKeyPrefix;
}

function LongTextField({ field, fieldKey }: LongTextFieldProps) {
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
        name={`${fieldKey}.props.label`}
      />
      <textarea
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default LongTextField;
