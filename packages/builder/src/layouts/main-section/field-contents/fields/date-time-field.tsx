import { PropertyType, type DateTimeFormField } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface DateTimeFieldProps {
  field: DateTimeFormField;
}

function DateTimeField({ field }: DateTimeFieldProps) {
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
        type="datetime-local"
        className="border border-neutral-300 px-4 py-2 rounded-md typography-body3 outline-primary w-full max-w-56"
      />
    </div>
  );
}

export default DateTimeField;
