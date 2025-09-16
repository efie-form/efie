import type { FieldSystemConfigAddressField } from '@efie-form/core';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import Button from '../../../components/elements/button';
import { Input, Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface FieldSettingsProps {
  config: FieldSystemConfigAddressField;
  fieldId: string;
}

export default function SystemSettingsAddressField({ config, fieldId }: FieldSettingsProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  const value = fieldProperty?.value;

  if (!value) return null;

  const setValue = (next: typeof value) => {
    updateFieldProperty(fieldId, { type: config.type, value: next });
  };

  const updateAddressLineLabel = (index: number, label: string) => {
    const next = {
      ...value,
      addressLine: value.addressLine.map((l, i) => (i === index ? { ...l, label } : l)),
    };
    setValue(next);
  };

  const addAddressLine = () => {
    const nextIndex = value.addressLine.length + 1;
    setValue({
      ...value,
      addressLine: [...value.addressLine, { label: `Address Line ${nextIndex}` }],
    });
  };

  const removeAddressLine = (index: number) => {
    if (value.addressLine.length === 1) return; // keep at least one line
    const next = { ...value, addressLine: value.addressLine.filter((_, i) => i !== index) };
    setValue(next);
  };

  const toggleEnabled = (key: 'city' | 'state' | 'postalCode' | 'country', enabled: boolean) => {
    setValue({ ...value, [key]: { ...value[key], enabled } });
  };

  const updateLabel = (key: 'city' | 'state' | 'postalCode' | 'country', label: string) => {
    setValue({ ...value, [key]: { ...value[key], label } });
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2">
          <p className="typography-body3 text-neutral-800">{config.label}</p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Address Lines */}
          <div>
            <p className="typography-body4 mb-1 font-semibold text-neutral-700">Address Lines</p>
            <div className="flex flex-col gap-2">
              {value.addressLine.map((line, index) => (
                <div key={index} className="group flex items-center gap-2">
                  <div>
                    <p className="text-neutral-700 typography-body3 whitespace-nowrap">
                      Address Line {index + 1}
                    </p>
                  </div>
                  <Input value={line.label} onChange={(v) => updateAddressLineLabel(index, v)} />
                  <div className="invisible group-hover:visible">
                    {value.addressLine.length > 1 && (
                      <button type="button" onClick={() => removeAddressLine(index)}>
                        <MdOutlineClose className="cursor-pointer text-neutral-500 hover:text-neutral-700" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Button
                variant="secondary"
                className="w-full"
                startIcon={MdAdd}
                onClick={addAddressLine}
              >
                Add address line
              </Button>
            </div>
          </div>

          {/* Other Fields */}
          <div className="flex flex-col gap-2">
            <FieldRow
              label="City"
              enabled={value.city.enabled}
              onToggle={(e) => toggleEnabled('city', e)}
              fieldLabel={value.city.label}
              onLabelChange={(l) => updateLabel('city', l)}
            />
            <FieldRow
              label="State"
              enabled={value.state.enabled}
              onToggle={(e) => toggleEnabled('state', e)}
              fieldLabel={value.state.label}
              onLabelChange={(l) => updateLabel('state', l)}
            />
            <FieldRow
              label="Postal Code"
              enabled={value.postalCode.enabled}
              onToggle={(e) => toggleEnabled('postalCode', e)}
              fieldLabel={value.postalCode.label}
              onLabelChange={(l) => updateLabel('postalCode', l)}
            />
            <FieldRow
              label="Country"
              enabled={value.country.enabled}
              onToggle={(e) => toggleEnabled('country', e)}
              fieldLabel={value.country.label}
              onLabelChange={(l) => updateLabel('country', l)}
            />
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="h-px w-full border-neutral-400 border-t-[0.5px]" />
      </div>
    </>
  );
}

interface FieldRowProps {
  label: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  fieldLabel: string;
  onLabelChange: (v: string) => void;
}

function FieldRow({ label, enabled, onToggle, fieldLabel, onLabelChange }: FieldRowProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Switch checked={enabled} onChange={onToggle} />
      </div>
      <p className="typography-body3 w-20 shrink-0 text-neutral-700">{label}</p>
      <Input value={fieldLabel} onChange={onLabelChange} disabled={!enabled} />
    </div>
  );
}
