import {
  PropertyType,
  type NumberFormField,
} from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getFieldProp } from '../../../../lib/utils';

interface NumberFieldProps {
  field: NumberFormField;
}

function NumberField({ field }: NumberFieldProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(field.id, PropertyType.LABEL));
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const placeholderProp = getFieldProp(field, PropertyType.PLACEHOLDER);

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
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 w-full outline-primary"
        type="number"
        placeholder={placeholderProp?.value}
      />
    </div>
  );
}

export default NumberField;
