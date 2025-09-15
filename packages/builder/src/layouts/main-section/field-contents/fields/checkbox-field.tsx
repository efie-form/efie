import { type CheckboxFormField, PropertyType } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface CheckboxFieldProps {
  field: CheckboxFormField;
}

export default function CheckboxField({ field }: CheckboxFieldProps) {
  const labelProp = useSchemaStore((s) => s.getFieldProperty(field.sys.id, PropertyType.LABEL));
  const requiredProp = useSchemaStore((s) =>
    s.getFieldProperty(field.sys.id, PropertyType.REQUIRED),
  );
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);

  const label = labelProp?.value || '';
  const required = requiredProp?.value || false;

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" disabled />
        <input
          value={label}
          onChange={(e) =>
            updateFieldProperty(field.sys.id, { type: PropertyType.LABEL, value: e.target.value })
          }
          className="typography-body2 w-full cursor-text bg-white bg-opacity-0 focus:outline-none"
          type="text"
        />
      </div>
      {required && <p className="typography-body4 mt-1 text-danger-600">* Required</p>}
    </div>
  );
}
