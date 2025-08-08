import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface ShortTextFieldProps {
  field: ShortTextFormField;
}

function ShortTextField({ field }: ShortTextFieldProps) {
  const placeholderProp = useSchemaStore((state) =>
    state.getFieldProperty(field.id, PropertyType.PLACEHOLDER),
  );
  const fieldProperty = useSchemaStore((state) =>
    state.getFieldProperty(field.id, PropertyType.LABEL),
  );
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

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
        type="text"
        placeholder={placeholderProp?.value}
        className="typography-body3 w-full rounded-md border border-neutral-300 px-4 py-2 outline-primary"
      />
    </div>
  );
}

export default ShortTextField;
