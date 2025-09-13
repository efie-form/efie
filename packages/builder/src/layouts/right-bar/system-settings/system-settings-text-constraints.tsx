import type { FieldSystemConfigTextConstraints, PropValueTextConstraints } from '@efie-form/core';
import { useRef } from 'react';
import NumberInput from '../../../components/form/number';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldSwitchWithDropdown from '../property-layouts/settings-field-switch-with-dropdown';

interface SystemSettingsTextConstraintsProps {
  fieldId: string;
  config: FieldSystemConfigTextConstraints;
}

export default function SystemSettingsTextConstraints({
  fieldId,
  config,
}: SystemSettingsTextConstraintsProps) {
  const fieldProperty = useSchemaStore((s) => s.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);

  const constraintsValue: PropValueTextConstraints | undefined = fieldProperty?.value as
    | PropValueTextConstraints
    | undefined;
  const lastConstraintsRef = useRef<PropValueTextConstraints | undefined>(undefined);
  const enabled = constraintsValue !== undefined;

  const setValue = (next: PropValueTextConstraints | undefined) => {
    updateFieldProperty(fieldId, { type: config.type, value: next as PropValueTextConstraints });
  };

  const toggleEnabled = (next: boolean) => {
    if (next) {
      const base: PropValueTextConstraints = lastConstraintsRef.current || {
        minChars: 1,
        maxChars: 500,
      };
      setValue(base);
    } else {
      lastConstraintsRef.current = constraintsValue ? { ...constraintsValue } : undefined;
      setValue(undefined);
    }
  };

  const updateConstraint = (field: keyof PropValueTextConstraints, value?: number) => {
    if (!constraintsValue) return;

    const updatedConstraints = { ...constraintsValue };

    if (value === undefined) {
      // Remove the field when value is undefined
      delete updatedConstraints[field];
    } else {
      updatedConstraints[field] = value;
    }

    setValue(updatedConstraints);
  };

  return (
    <SettingsFieldSwitchWithDropdown
      label={config.label}
      isOpen={enabled}
      onOpenChange={toggleEnabled}
      divider
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-gray-600 mb-1">Min Characters</div>
            <NumberInput
              value={constraintsValue?.minChars}
              onChange={(v) => updateConstraint('minChars', v)}
              disabled={!enabled}
              inputProps={{ min: 0 }}
            />
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Max Characters</div>
            <NumberInput
              value={constraintsValue?.maxChars}
              onChange={(v) => updateConstraint('maxChars', v)}
              disabled={!enabled}
              inputProps={{ min: 1 }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-gray-600 mb-1">Min Words</div>
            <NumberInput
              value={constraintsValue?.minWords}
              onChange={(v) => updateConstraint('minWords', v)}
              disabled={!enabled}
              inputProps={{ min: 0 }}
            />
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Max Words</div>
            <NumberInput
              value={constraintsValue?.maxWords}
              onChange={(v) => updateConstraint('maxWords', v)}
              disabled={!enabled}
              inputProps={{ min: 1 }}
            />
          </div>
        </div>
      </div>
    </SettingsFieldSwitchWithDropdown>
  );
}
