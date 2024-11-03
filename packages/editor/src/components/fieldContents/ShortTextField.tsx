import type { FormFieldShortText } from '@efie-form/core';

interface ShortTextFieldProps {
  field: FormFieldShortText;
}

function ShortTextField({ field }: ShortTextFieldProps) {
  return (
    <div className="p-2">
      <p className="mb-2 typography-body2 text-neutral-800">
        {field.props.label}
        {field.props.required && <span className="text-danger ms-1.5">*</span>}
      </p>
      <input
        type="text"
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default ShortTextField;
