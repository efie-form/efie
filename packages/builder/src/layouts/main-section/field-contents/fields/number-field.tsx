import { type NumberFormField, PropertyType } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getFieldProp } from '../../../../lib/utils';

interface NumberFieldProps {
  field: NumberFormField;
}

function NumberField({ field }: NumberFieldProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.getFieldProperty(field.id, PropertyType.LABEL),
  );
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);
  const placeholderProp = getFieldProp(field, PropertyType.PLACEHOLDER);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.id, {
            type: PropertyType.LABEL,
            value: e.target.value,
          })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-none"
        type="text"
      />
      <input
        className="typography-body3 w-full rounded-md border border-neutral-300 px-4 py-2 outline-primary"
        type="number"
        placeholder={placeholderProp?.value}
      />
    </div>
  );
}

export default NumberField;
