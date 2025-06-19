import { PropertyType, type FormField } from '@efie-form/core';
import { useFieldLabel } from '../../../../lib/hooks/properties/use-field-label';
import { getFieldProp } from '../../../../lib/utils';

interface LongTextFieldProps {
  field: FormField;
}

function LongTextField({ field }: LongTextFieldProps) {
  const { label, updateLabel } = useFieldLabel(field);
  const placeholderProp = getFieldProp(field, PropertyType.PLACEHOLDER);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={e => updateLabel(e.target.value)}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <textarea
        placeholder={placeholderProp?.value}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default LongTextField;
