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
      const base: PropValueTextConstraints = lastConstraintsRef.current || {};
      setValue(base);
    } else {
      lastConstraintsRef.current = constraintsValue ? { ...constraintsValue } : undefined;
      setValue(undefined);
    }
  };

  const updateConstraint = (field: keyof PropValueTextConstraints, value?: number) => {
    if (!constraintsValue) return;
    console.log(value);

    // Start with a simple update
    let updatedConstraints = {
      ...constraintsValue,
      [field]: value,
    };

    // Apply validation only when setting a value (not when clearing)
    if (value !== undefined) {
      if (
        field === 'minChars' &&
        updatedConstraints.maxChars !== undefined &&
        value > updatedConstraints.maxChars
      ) {
        updatedConstraints = { ...updatedConstraints, maxChars: value };
      }
      if (
        field === 'maxChars' &&
        updatedConstraints.minChars !== undefined &&
        value < updatedConstraints.minChars
      ) {
        updatedConstraints = { ...updatedConstraints, minChars: value };
      }
      if (
        field === 'minWords' &&
        updatedConstraints.maxWords !== undefined &&
        value > updatedConstraints.maxWords
      ) {
        updatedConstraints = { ...updatedConstraints, maxWords: value };
      }
      if (
        field === 'maxWords' &&
        updatedConstraints.minWords !== undefined &&
        value < updatedConstraints.minWords
      ) {
        updatedConstraints = { ...updatedConstraints, minWords: value };
      }
    }

    setValue(updatedConstraints as PropValueTextConstraints);
  };

  console.log(constraintsValue);
  return (
    <SettingsFieldSwitchWithDropdown
      label={config.label}
      isOpen={enabled}
      onOpenChange={toggleEnabled}
      divider
    >
      <div className="space-y-4">
        {/* Characters Section */}
        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Characters</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Min</div>
              <NumberInput
                value={constraintsValue?.minChars}
                onChange={(v) => updateConstraint('minChars', v)}
                disabled={!enabled}
                inputProps={{ min: 0 }}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Max</div>
              <NumberInput
                value={constraintsValue?.maxChars}
                onChange={(v) => updateConstraint('maxChars', v)}
                disabled={!enabled}
                inputProps={{ min: constraintsValue?.minChars || 1 }}
              />
            </div>
          </div>
        </div>

        {/* Words Section */}
        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Words</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Min</div>
              <NumberInput
                value={constraintsValue?.minWords}
                onChange={(v) => updateConstraint('minWords', v)}
                disabled={!enabled}
                inputProps={{ min: 0 }}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Max</div>
              <NumberInput
                value={constraintsValue?.maxWords}
                onChange={(v) => updateConstraint('maxWords', v)}
                disabled={!enabled}
                inputProps={{ min: constraintsValue?.minWords || 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </SettingsFieldSwitchWithDropdown>
  );
}
