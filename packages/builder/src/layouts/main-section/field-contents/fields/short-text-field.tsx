import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import { getFieldProp } from '../../../../lib/utils';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface ShortTextFieldProps {
  field: ShortTextFormField;
}

function ShortTextField({ field }: ShortTextFieldProps) {
  const placeholderProp = getFieldProp(field, PropertyType.PLACEHOLDER);
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(field.id, PropertyType.LABEL));
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={e => updateFieldProperty(field.id, {
          type: PropertyType.LABEL,
          value: e.target.value,
        })}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <input
        type="text"
        placeholder={placeholderProp?.value}
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
      />
    </div>
  );
}

export default ShortTextField;
