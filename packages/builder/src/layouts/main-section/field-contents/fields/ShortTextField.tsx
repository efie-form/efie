import type { FormFieldShortText } from '@efie-form/core';

interface ShortTextFieldProps {
  field: FormFieldShortText;
}

function ShortTextField({ field }: ShortTextFieldProps) {
  return (
    <div className="p-2">
      <input
        value={field.props.label}
        onChange={() => {}}
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
