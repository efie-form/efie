import type { FieldSystemConfigWordLimit, PropValueLimit } from '@efie-form/core';
import { useRef, useState } from 'react';
import NumberInput from '../../../components/form/number';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldSwitchWithDropdown from '../property-layouts/settings-field-switch-with-dropdown';

interface SystemSettingsWordLimitProps {
  fieldId: string;
  config: FieldSystemConfigWordLimit;
}

const defaultLimit: PropValueLimit = { min: undefined, max: undefined };

export default function SystemSettingsWordLimit({ fieldId, config }: SystemSettingsWordLimitProps) {
  const fieldProperty = useSchemaStore((s) => s.getFieldProperty(fieldId, config.type));
  const fieldValue = fieldProperty?.value;
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);
  const removeFieldProperty = useSchemaStore((s) => s.removeFieldProperty);
  const [currentValue, setCurrentValue] = useState<PropValueLimit | undefined>(fieldValue);
  const enabled = currentValue !== undefined;

  const previousValuesRef = useRef<PropValueLimit | undefined>(undefined);

  const setValue = (next?: PropValueLimit) => {
    setCurrentValue(next);
    if (next === undefined) {
      removeFieldProperty(fieldId, config.type);
    } else {
      updateFieldProperty(fieldId, {
        type: config.type,
        value: next,
      });
    }
  };

  const toggleEnabled = (next: boolean) => {
    if (next) {
      // Enable: restore previous values or use sensible defaults
      const newLimit = previousValuesRef.current || defaultLimit;
      setValue(newLimit);
    } else {
      // Disable: store current values and remove from schema
      if (currentValue) {
        previousValuesRef.current = { ...currentValue };
      }
      setValue(undefined);
    }
  };

  const updateLimit = (field: keyof PropValueLimit, value?: number) => {
    if (!enabled) return;

    // Allow clearing values by setting to undefined
    let updatedLimit = { ...currentValue, [field]: value };

    // Auto-adjust to maintain logical constraints only if both values are defined
    if (
      field === 'min' &&
      value !== undefined &&
      updatedLimit.max !== undefined &&
      value > updatedLimit.max
    ) {
      updatedLimit = { ...updatedLimit, max: value };
    }
    if (
      field === 'max' &&
      value !== undefined &&
      updatedLimit.min !== undefined &&
      value < updatedLimit.min
    ) {
      updatedLimit = { ...updatedLimit, min: value };
    }

    setValue(updatedLimit);
  };

  return (
    <SettingsFieldSwitchWithDropdown
      label={config.label}
      divider
      isOpen={enabled}
      onOpenChange={toggleEnabled}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`${fieldId}-min-limit`}
            className="typography-body4 text-neutral-700 mb-1.5 block"
          >
            Minimum
          </label>
          <NumberInput
            value={currentValue?.min}
            onChange={(v) => updateLimit('min', v)}
            disabled={!enabled}
            inputProps={{
              id: `${fieldId}-min-limit`,
              min: 0,
              max: currentValue?.max,
              placeholder: '0',
            }}
          />
        </div>
        <div>
          <label
            htmlFor={`${fieldId}-max-limit`}
            className="typography-body4 text-neutral-700 mb-1.5 block"
          >
            Maximum
          </label>
          <NumberInput
            value={currentValue?.max}
            onChange={(v) => updateLimit('max', v)}
            disabled={!enabled}
            inputProps={{
              id: `${fieldId}-max-limit`,
              min: currentValue?.min || 0,
              placeholder: 'No limit',
            }}
          />
        </div>
      </div>
    </SettingsFieldSwitchWithDropdown>
  );
}
