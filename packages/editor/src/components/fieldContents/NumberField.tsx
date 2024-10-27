import type { FormFieldNumber } from '../../types/formSchema.ts';

interface NumberFieldProps {
  field: FormFieldNumber;
}

function NumberField({ field }: NumberFieldProps) {
  return (
    <div className="p-2">
      <p className="mb-2 typography-body2 text-neutral-800">
        {field.props.label}
      </p>
      <input
        placeholder={field.props.placeholder}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
        type="number"
      />
    </div>
  );
}

export default NumberField;
