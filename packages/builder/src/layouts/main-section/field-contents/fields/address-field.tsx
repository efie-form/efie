import { type AddressFormField, PropertyType } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface AddressFieldProps {
  field: AddressFormField;
}

function AddressField({ field }: AddressFieldProps) {
  const labelProp = useSchemaStore((state) =>
    state.getFieldProperty(field.sys.id, PropertyType.LABEL),
  );
  const requiredProp = useSchemaStore((state) =>
    state.getFieldProperty(field.sys.id, PropertyType.REQUIRED),
  );
  const addressConfigProp = useSchemaStore((state) =>
    state.getFieldProperty(field.sys.id, PropertyType.ADDRESS_FIELD),
  );
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  const label = labelProp?.value || '';
  const required = requiredProp?.value || false;
  const addressConfig = addressConfigProp?.value;

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.sys.id, {
            type: PropertyType.LABEL,
            value: e.target.value,
          })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-hidden"
        type="text"
      />
      {addressConfig && (
        <div className="flex flex-col gap-2">
          {/* Address Lines */}
          {addressConfig.addressLine.map((line: { label: string }, idx: number) => (
            <input
              key={idx}
              placeholder={line.label}
              className="typography-body3 w-full rounded-md border border-neutral-300 px-4 py-2 outline-primary"
              disabled
            />
          ))}
          {/* Atomic fields (city, state, postal code, country) shown 2 per row if enabled */}
          {(() => {
            const parts = (['city', 'state', 'postalCode', 'country'] as const)
              .map((k) => ({ key: k, data: addressConfig[k] }))
              .filter((p) => p.data.enabled);
            if (parts.length === 0) return null;
            return (
              <div className="grid grid-cols-2 gap-2">
                {parts.map((p) => (
                  <input
                    key={p.key}
                    placeholder={p.data.label}
                    className="typography-body3 w-full rounded-md border border-neutral-300 px-4 py-2 outline-primary"
                    disabled
                  />
                ))}
              </div>
            );
          })()}
        </div>
      )}
      {required && <p className="typography-body4 mt-1 text-danger-600">* Required</p>}
    </div>
  );
}

export default AddressField;
