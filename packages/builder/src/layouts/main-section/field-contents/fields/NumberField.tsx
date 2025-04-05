import { PropertyType, type InputFormField } from '@efie-form/core';
import { useFieldLabel } from '../../../../lib/hooks/properties/useFieldLabel';
import { getFieldProp } from '../../../../lib/utils';

interface NumberFieldProps {
  field: InputFormField;
}

function NumberField({ field }: NumberFieldProps) {
  const { label, updateLabel } = useFieldLabel(field);
  const placeholderProp = getFieldProp(field, PropertyType.PLACEHOLDER);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) => updateLabel(e.target.value)}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
        type="number"
        placeholder={placeholderProp?.value}
      />
    </div>
  );
}

export default NumberField;
