import type { FormFieldNumber } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface NumberFieldProps {
  field: FormFieldNumber;
}

function NumberField({ field }: NumberFieldProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div className="p-2">
      <input
        value={field.props.label}
        onChange={(e) =>
          updateFieldProps(field.id, 'props.label', e.target.value)
        }
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
        type="number"
        placeholder={field.props.placeholder}
      />
    </div>
  );
}

export default NumberField;
