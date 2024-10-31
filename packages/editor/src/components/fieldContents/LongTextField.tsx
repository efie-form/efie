import type { FormFieldLongText } from '@efie-form/core';

interface LongTextFieldProps {
  field: FormFieldLongText;
}

function LongTextField({ field }: LongTextFieldProps) {
  return (
    <div className="p-2">
      <p className="mb-2 typography-body2 text-neutral-800">
        {field.props.label}
      </p>
      <textarea
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default LongTextField;
