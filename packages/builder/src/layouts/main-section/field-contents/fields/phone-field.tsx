import { type PhoneFormField, PropertyType } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface PhoneFieldProps {
  field: PhoneFormField;
}

export default function PhoneField({ field }: PhoneFieldProps) {
  const labelProp = useSchemaStore((s) => s.getFieldProperty(field.id, PropertyType.LABEL));
  const requiredProp = useSchemaStore((s) => s.getFieldProperty(field.id, PropertyType.REQUIRED));
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);
  const placeholderProp = useSchemaStore((s) =>
    s.getFieldProperty(field.id, PropertyType.PLACEHOLDER),
  );

  const label = labelProp?.value || '';
  const required = requiredProp?.value || false;

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.id, { type: PropertyType.LABEL, value: e.target.value })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-none"
        type="text"
      />
      <input
        type="tel"
        placeholder={placeholderProp?.value}
        className="typography-body3 w-full rounded-md border border-neutral-300 px-4 py-2 outline-primary"
      />
      {required && <p className="typography-body4 mt-1 text-danger-600">* Required</p>}
    </div>
  );
}
