import { type PhoneFormField, PropertyType } from '@efie-form/core';
import { PhoneInput } from '../../../../components/form';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface PhoneFieldProps {
  field: PhoneFormField;
}

export default function PhoneField({ field }: PhoneFieldProps) {
  const labelProp = useSchemaStore((s) => s.getFieldProperty(field.sys.id, PropertyType.LABEL));
  const requiredProp = useSchemaStore((s) =>
    s.getFieldProperty(field.sys.id, PropertyType.REQUIRED),
  );
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);
  const placeholderProp = useSchemaStore((s) =>
    s.getFieldProperty(field.sys.id, PropertyType.PLACEHOLDER),
  );

  const label = labelProp?.value || '';
  const required = requiredProp?.value || false;

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.sys.id, { type: PropertyType.LABEL, value: e.target.value })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-hidden"
        type="text"
      />
      <PhoneInput placeholder={placeholderProp?.value} />
      {required && <p className="typography-body4 mt-1 text-danger-600">* Required</p>}
    </div>
  );
}
